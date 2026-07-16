import { MediabunnyReplayMuxer } from './mediabunny-replay-muxer.js';
import { EncodedRingError, } from './webcodecs-ring.js';
export class PeriodicKeyFrameScheduler {
    intervalUs;
    nextKeyFrameUs = 0;
    constructor(intervalUs) {
        this.intervalUs = intervalUs;
        boundedInteger(intervalUs, 250_000, 5_000_000, 'intervalUs');
    }
    shouldRequest(timestampUs) {
        if (!Number.isSafeInteger(timestampUs) || timestampUs < 0) {
            throw new EncodedRingError('invalid_packet', 'Key-frame timestamp is invalid.');
        }
        if (timestampUs < this.nextKeyFrameUs)
            return false;
        this.nextKeyFrameUs = timestampUs + this.intervalUs;
        return true;
    }
}
export function sharedAvTimestampOriginUs(firstVideoTimestampUs, firstAudioTimestampUs) {
    if (!Number.isSafeInteger(firstVideoTimestampUs) ||
        (firstAudioTimestampUs !== null && !Number.isSafeInteger(firstAudioTimestampUs))) {
        throw new EncodedRingError('invalid_packet', 'Shared A/V source timestamps must be safe integers.');
    }
    return Math.min(firstVideoTimestampUs, firstAudioTimestampUs ?? firstVideoTimestampUs);
}
export function normalizeSharedTimestampUs(sourceTimestampUs, originUs) {
    const normalized = sourceTimestampUs - originUs;
    if (!Number.isSafeInteger(normalized) || normalized < 0) {
        throw new EncodedRingError('clock_regression', 'Media timestamp predates the shared A/V origin.');
    }
    return normalized;
}
/**
 * Reads the same MediaStream tracks used by FanView, encodes each frame once,
 * and feeds a shared encoded ring. It never stops the source tracks.
 */
export class SharedWebCodecsCapture {
    ring;
    keyFrameIntervalUs;
    maximumEncodeQueueSize;
    firstFrameTimeoutMs;
    clock;
    idFactory;
    active = null;
    startInFlight = null;
    startAbort = null;
    sequence = 0;
    constructor(ring, options = {}) {
        this.ring = ring;
        this.keyFrameIntervalUs = boundedInteger(options.keyFrameIntervalMs ?? 2_000, 250, 5_000, 'keyFrameIntervalMs') * 1_000;
        this.maximumEncodeQueueSize = boundedInteger(options.maximumEncodeQueueSize ?? 6, 1, 30, 'maximumEncodeQueueSize');
        this.firstFrameTimeoutMs = boundedInteger(options.firstFrameTimeoutMs ?? 5_000, 250, 30_000, 'firstFrameTimeoutMs');
        this.clock = options.clock ?? (() => ({
            monotonicMs: performance.now(),
            wallClockEpochMs: performance.timeOrigin + performance.now(),
        }));
        this.idFactory = options.idFactory ?? (() => `wc_epoch_${crypto.randomUUID()}`);
    }
    get activeEpochId() {
        return this.active?.epochId ?? null;
    }
    get health() {
        const active = this.active;
        if (!active)
            return Object.freeze({ status: 'inactive', failure: null });
        if (active.failure || (!active.stopped && active.controller.signal.aborted)) {
            return Object.freeze({ status: 'failed', failure: active.failure });
        }
        return Object.freeze({ status: 'capturing', failure: null });
    }
    start(stream, profile, options = {}) {
        if (this.active || this.startInFlight) {
            return Promise.reject(new EncodedRingError('invalid_epoch', 'WebCodecs capture is already active.'));
        }
        const controller = new AbortController();
        const abort = () => controller.abort();
        if (options.signal?.aborted)
            controller.abort();
        else
            options.signal?.addEventListener('abort', abort, { once: true });
        this.startAbort = controller;
        const operation = this.startCapture(stream, profile, controller)
            .finally(() => {
            options.signal?.removeEventListener('abort', abort);
            if (this.startInFlight === operation)
                this.startInFlight = null;
            if (this.startAbort === controller)
                this.startAbort = null;
        });
        this.startInFlight = operation;
        return operation;
    }
    async startCapture(stream, profile, controller) {
        if (controller.signal.aborted) {
            throw new EncodedRingError('aborted', 'WebCodecs capture start was cancelled.');
        }
        if (typeof MediaStreamTrackProcessor !== 'function') {
            throw new EncodedRingError('invalid_config', 'MediaStreamTrackProcessor is unavailable.');
        }
        if (typeof VideoEncoder !== 'function') {
            throw new EncodedRingError('invalid_config', 'VideoEncoder is unavailable.');
        }
        const videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack)
            throw new EncodedRingError('no_video', 'A video MediaStreamTrack is required.');
        const audioTrack = stream.getAudioTracks()[0] ?? null;
        if (audioTrack && typeof AudioEncoder !== 'function') {
            throw new EncodedRingError('invalid_config', 'The source has audio but AudioEncoder is unavailable; audio is not silently dropped.');
        }
        const videoReader = new MediaStreamTrackProcessor({
            track: videoTrack,
            maxBufferSize: 2,
        }).readable.getReader();
        const audioReader = audioTrack
            ? new MediaStreamTrackProcessor({ track: audioTrack, maxBufferSize: 4 }).readable.getReader()
            : null;
        const cancelStartupReaders = () => {
            void videoReader.cancel().catch(() => { });
            void audioReader?.cancel().catch(() => { });
        };
        controller.signal.addEventListener('abort', cancelStartupReaders, { once: true });
        let firstVideo = null;
        let firstAudio = null;
        let openedEpoch = null;
        let createdVideoEncoder = null;
        let createdAudioEncoder = null;
        try {
            const firstVideoResult = await withTimeout(videoReader.read(), this.firstFrameTimeoutMs, 'Timed out waiting for the first video frame.');
            if (firstVideoResult.done || !firstVideoResult.value) {
                throw new EncodedRingError(controller.signal.aborted ? 'aborted' : 'no_video', controller.signal.aborted
                    ? 'WebCodecs capture start was cancelled.'
                    : 'Video track ended before its first frame.');
            }
            firstVideo = firstVideoResult.value;
            if (audioReader) {
                const firstAudioResult = await withTimeout(audioReader.read(), this.firstFrameTimeoutMs, 'Timed out waiting for the first audio sample.');
                if (firstAudioResult.done || !firstAudioResult.value) {
                    throw new EncodedRingError(controller.signal.aborted ? 'aborted' : 'invalid_config', controller.signal.aborted
                        ? 'WebCodecs capture start was cancelled.'
                        : 'Audio track ended before its first sample; audio is not silently dropped.');
                }
                firstAudio = firstAudioResult.value;
            }
            validateFirstMedia(firstVideo, firstAudio, profile);
            const originSourceTimestampUs = sharedAvTimestampOriginUs(firstVideo.timestamp, firstAudio?.timestamp ?? null);
            const started = this.clock();
            validateClock(started);
            const epochId = this.idFactory();
            const epoch = this.ring.beginEpoch({
                id: epochId,
                startedMonotonicMs: started.monotonicMs,
                startedWallClockEpochMs: started.wallClockEpochMs,
                container: profile.container,
                videoCodec: profile.videoCodec,
                audioCodec: firstAudio ? profile.audioCodec : null,
                frameRate: profile.videoEncoderConfig.framerate ?? 30,
            });
            openedEpoch = { id: epoch.id, startedMonotonicMs: epoch.startedMonotonicMs };
            if (controller.signal.aborted) {
                throw new EncodedRingError('aborted', 'WebCodecs capture start was cancelled.');
            }
            const pendingVideoDurations = new Map();
            const pendingAudioDurations = new Map();
            const defaultAudioDurationUs = firstAudio?.duration ?? 20_000;
            const defaultVideoDurationUs = Math.round(1_000_000 / (profile.videoEncoderConfig.framerate ?? 30));
            let activeReference = null;
            const captureFailure = (error) => {
                if (activeReference)
                    this.failActiveCapture(activeReference, error);
                else
                    controller.abort();
            };
            const videoEncoder = new VideoEncoder({
                output: (chunk, metadata) => {
                    try {
                        if (metadata?.decoderConfig) {
                            this.ring.setDecoderConfig(epochId, 'video', metadata.decoderConfig);
                        }
                        this.appendChunk(epochId, 'video', chunk, originSourceTimestampUs, pendingVideoDurations.get(chunk.timestamp) ?? defaultVideoDurationUs);
                        pendingVideoDurations.delete(chunk.timestamp);
                    }
                    catch (error) {
                        captureFailure(error);
                    }
                },
                error: captureFailure,
            });
            createdVideoEncoder = videoEncoder;
            const audioEncoder = firstAudio
                ? new AudioEncoder({
                    output: (chunk, metadata) => {
                        try {
                            if (metadata?.decoderConfig) {
                                this.ring.setDecoderConfig(epochId, 'audio', metadata.decoderConfig);
                            }
                            this.appendChunk(epochId, 'audio', chunk, originSourceTimestampUs, pendingAudioDurations.get(chunk.timestamp) ?? defaultAudioDurationUs);
                            pendingAudioDurations.delete(chunk.timestamp);
                        }
                        catch (error) {
                            captureFailure(error);
                        }
                    },
                    error: captureFailure,
                })
                : null;
            createdAudioEncoder = audioEncoder;
            videoEncoder.configure(profile.videoEncoderConfig);
            if (audioEncoder)
                audioEncoder.configure(profile.audioEncoderConfig);
            const active = {
                epochId,
                startedMonotonicMs: started.monotonicMs,
                videoReader,
                audioReader,
                videoEncoder,
                audioEncoder,
                controller,
                loops: [],
                originSourceTimestampUs,
                stopped: false,
                failure: null,
            };
            activeReference = active;
            this.active = active;
            const videoLoop = this.runVideoLoop(active, firstVideo, pendingVideoDurations, defaultVideoDurationUs);
            firstVideo = null;
            active.loops.push(videoLoop);
            if (firstAudio && audioReader && audioEncoder) {
                const audioLoop = this.runAudioLoop(active, firstAudio, pendingAudioDurations);
                firstAudio = null;
                active.loops.push(audioLoop);
            }
            return epoch;
        }
        catch (error) {
            firstVideo?.close();
            firstAudio?.close();
            await videoReader.cancel().catch(() => { });
            await audioReader?.cancel().catch(() => { });
            if (createdVideoEncoder && createdVideoEncoder.state !== 'closed') {
                createdVideoEncoder.close();
            }
            if (createdAudioEncoder && createdAudioEncoder.state !== 'closed') {
                createdAudioEncoder.close();
            }
            if (openedEpoch && this.ring.getEpoch(openedEpoch.id)?.endedMonotonicMs === null) {
                try {
                    const failedAt = this.clock();
                    validateClock(failedAt);
                    this.ring.endEpoch(openedEpoch.id, Math.max(openedEpoch.startedMonotonicMs, failedAt.monotonicMs), 'start_failed');
                }
                catch {
                    // Preserve the original startup failure; the epoch remains unusable without decoder config.
                }
            }
            throw error;
        }
        finally {
            controller.signal.removeEventListener('abort', cancelStartupReaders);
        }
    }
    async stop(reason = 'manual_stop') {
        const pendingStart = this.startInFlight;
        if (pendingStart) {
            this.startAbort?.abort();
            await pendingStart.catch(() => { });
        }
        const active = this.active;
        if (!active)
            return null;
        if (active.stopped)
            return this.ring.getEpoch(active.epochId);
        active.stopped = true;
        active.controller.abort();
        await Promise.allSettled([
            active.videoReader.cancel(),
            active.audioReader?.cancel() ?? Promise.resolve(),
        ]);
        await Promise.allSettled(active.loops);
        try {
            if (active.videoEncoder.state === 'configured')
                await active.videoEncoder.flush();
            if (active.audioEncoder?.state === 'configured')
                await active.audioEncoder.flush();
        }
        catch (error) {
            if (!active.failure)
                active.failure = error;
        }
        finally {
            if (active.videoEncoder.state !== 'closed')
                active.videoEncoder.close();
            if (active.audioEncoder && active.audioEncoder.state !== 'closed')
                active.audioEncoder.close();
        }
        const ended = this.clock();
        validateClock(ended);
        const existingEpoch = this.ring.getEpoch(active.epochId);
        const epoch = existingEpoch?.endedMonotonicMs === null
            ? this.ring.endEpoch(active.epochId, ended.monotonicMs, reason)
            : existingEpoch;
        this.active = null;
        if (active.failure)
            throw active.failure;
        return epoch;
    }
    async replaceStream(stream, profile) {
        await this.stop('stream_replaced');
        return this.start(stream, profile);
    }
    async runVideoLoop(active, firstFrame, pendingDurations, defaultDurationUs) {
        const keyFrameScheduler = new PeriodicKeyFrameScheduler(this.keyFrameIntervalUs);
        let current = firstFrame;
        try {
            while (current) {
                if (active.controller.signal.aborted)
                    break;
                await waitForEncoderCapacity(active.videoEncoder, this.maximumEncodeQueueSize, active.controller.signal);
                const relativeTimestampUs = normalizeSharedTimestampUs(current.timestamp, active.originSourceTimestampUs);
                const durationUs = current.duration ?? defaultDurationUs;
                pendingDurations.set(current.timestamp, durationUs);
                const keyFrame = keyFrameScheduler.shouldRequest(relativeTimestampUs);
                active.videoEncoder.encode(current, { keyFrame });
                current.close();
                current = null;
                const next = await active.videoReader.read();
                if (next.done) {
                    if (!active.stopped) {
                        this.failActiveCapture(active, new EncodedRingError('capture_interrupted', 'Video capture ended unexpectedly.'));
                    }
                    break;
                }
                current = next.value;
            }
        }
        catch (error) {
            if (!active.stopped && !active.controller.signal.aborted)
                this.failActiveCapture(active, error);
        }
        finally {
            current?.close();
        }
    }
    async runAudioLoop(active, firstSample, pendingDurations) {
        let current = firstSample;
        try {
            while (current && active.audioEncoder) {
                if (active.controller.signal.aborted)
                    break;
                await waitForEncoderCapacity(active.audioEncoder, this.maximumEncodeQueueSize, active.controller.signal);
                normalizeSharedTimestampUs(current.timestamp, active.originSourceTimestampUs);
                pendingDurations.set(current.timestamp, current.duration);
                active.audioEncoder.encode(current);
                current.close();
                current = null;
                const next = await active.audioReader.read();
                if (next.done) {
                    if (!active.stopped) {
                        this.failActiveCapture(active, new EncodedRingError('capture_interrupted', 'Audio capture ended unexpectedly.'));
                    }
                    break;
                }
                current = next.value;
            }
        }
        catch (error) {
            if (!active.stopped && !active.controller.signal.aborted)
                this.failActiveCapture(active, error);
        }
        finally {
            current?.close();
        }
    }
    appendChunk(epochId, track, chunk, originSourceTimestampUs, fallbackDurationUs) {
        const timestampUs = chunk.timestamp - originSourceTimestampUs;
        const durationUs = chunk.duration ?? fallbackDurationUs;
        if (!Number.isSafeInteger(timestampUs) || timestampUs < 0 || !Number.isSafeInteger(durationUs)) {
            throw new EncodedRingError('invalid_packet', 'WebCodecs emitted invalid normalized timing.');
        }
        const data = new Uint8Array(chunk.byteLength);
        chunk.copyTo(data);
        this.ring.append({
            epochId,
            track,
            sequence: this.sequence++,
            type: track === 'audio' ? 'key' : chunk.type,
            timestampUs,
            durationUs,
            data,
        });
    }
    failActiveCapture(active, error) {
        if (!active.failure)
            active.failure = error;
        const epoch = this.ring.getEpoch(active.epochId);
        if (epoch?.endedMonotonicMs === null) {
            try {
                const failedAt = this.clock();
                validateClock(failedAt);
                this.ring.endEpoch(active.epochId, Math.max(active.startedMonotonicMs, failedAt.monotonicMs), 'capture_failed');
            }
            catch {
                // Preserve the originating capture failure.
            }
        }
        active.controller.abort();
        // Encoder and track failures are terminal for this continuity epoch. Drain
        // readers and close codecs even if the UI never calls stop explicitly.
        void Promise.resolve()
            .then(() => this.stop('capture_failed'))
            .catch(() => { });
    }
}
export class SharedWebCodecsReplayExporter {
    ring;
    muxer;
    constructor(ring, muxer = new MediabunnyReplayMuxer()) {
        this.ring = ring;
        this.muxer = muxer;
    }
    async exportLookback(input) {
        if (!Number.isFinite(input.anchorMonotonicMs)) {
            throw new EncodedRingError('invalid_packet', 'Replay anchor is invalid.');
        }
        if (![10_000, 15_000, 30_000].includes(input.preRollMs)) {
            throw new EncodedRingError('invalid_config', 'Replay pre-roll must be 10, 15, or 30 seconds.');
        }
        if (!Number.isSafeInteger(input.postRollMs) || input.postRollMs < 0 || input.postRollMs > 8_000) {
            throw new EncodedRingError('invalid_config', 'Replay post-roll must be 0-8 seconds.');
        }
        const requestedStartMonotonicMs = input.anchorMonotonicMs - input.preRollMs;
        const requestedEndMonotonicMs = input.anchorMonotonicMs + input.postRollMs;
        await this.ring.waitForCoverage(input.epochId, requestedEndMonotonicMs, {
            ...(input.signal ? { signal: input.signal } : {}),
            ...(input.coverageTimeoutMs ? { timeoutMs: input.coverageTimeoutMs } : {}),
        });
        const snapshot = this.ring.snapshotWindow({
            epochId: input.epochId,
            requestedStartMonotonicMs,
            requestedEndMonotonicMs,
        });
        return this.muxer.mux(snapshot, input.signal ? { signal: input.signal } : {});
    }
}
function validateFirstMedia(video, audio, profile) {
    if (!Number.isSafeInteger(video.timestamp)) {
        throw new EncodedRingError('invalid_packet', 'First video frame has no safe timestamp.');
    }
    if (audio &&
        (audio.sampleRate !== profile.audioEncoderConfig.sampleRate ||
            audio.numberOfChannels !== profile.audioEncoderConfig.numberOfChannels)) {
        throw new EncodedRingError('invalid_config', 'Audio encoder configuration must match the source sample rate and channels.');
    }
}
async function waitForEncoderCapacity(encoder, maximumQueueSize, signal) {
    while (encoder.encodeQueueSize >= maximumQueueSize) {
        if (signal.aborted)
            throw new EncodedRingError('aborted', 'WebCodecs capture was canceled.');
        await new Promise((resolve, reject) => {
            const abort = () => {
                cleanup();
                reject(new EncodedRingError('aborted', 'WebCodecs capture was canceled.'));
            };
            const dequeue = () => {
                cleanup();
                resolve();
            };
            const cleanup = () => {
                signal.removeEventListener('abort', abort);
                encoder.removeEventListener('dequeue', dequeue);
            };
            signal.addEventListener('abort', abort, { once: true });
            encoder.addEventListener('dequeue', dequeue, { once: true });
        });
    }
}
async function withTimeout(promise, timeoutMs, message) {
    let timeoutId = null;
    try {
        return await Promise.race([
            promise,
            new Promise((_, reject) => {
                timeoutId = setTimeout(() => reject(new EncodedRingError('coverage_timeout', message)), timeoutMs);
            }),
        ]);
    }
    finally {
        if (timeoutId !== null)
            clearTimeout(timeoutId);
    }
}
function validateClock(clock) {
    if (!Number.isFinite(clock.monotonicMs) ||
        !Number.isFinite(clock.wallClockEpochMs) ||
        clock.wallClockEpochMs <= 0) {
        throw new EncodedRingError('clock_regression', 'Capture clock is invalid.');
    }
}
function boundedInteger(value, minimum, maximum, field) {
    if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
        throw new TypeError(`${field} must be an integer between ${minimum} and ${maximum}.`);
    }
    return value;
}
//# sourceMappingURL=webcodecs-capture.js.map