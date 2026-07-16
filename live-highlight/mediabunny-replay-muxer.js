import { ALL_FORMATS, AudioSampleSink, BlobSource, BufferTarget, EncodedAudioPacketSource, EncodedPacket, EncodedPacketSink, EncodedVideoPacketSource, Input, Mp4OutputFormat, Output, VideoSampleSink, WebMOutputFormat, } from 'mediabunny';
import { EncodedRingError, } from './webcodecs-ring.js';
export class MediabunnyReplayMuxer {
    async mux(snapshot, options = {}) {
        if (snapshot.videoPacketCount <= 0 || snapshot.packets.length === 0) {
            throw new EncodedRingError('no_video', 'A mux export requires encoded video packets.');
        }
        const signal = options.signal;
        throwIfAborted(signal);
        const format = snapshot.epoch.container === 'mp4'
            ? new Mp4OutputFormat({ fastStart: 'in-memory' })
            : new WebMOutputFormat({ appendOnly: false });
        const target = new BufferTarget();
        const output = new Output({ format, target });
        const videoSource = new EncodedVideoPacketSource(snapshot.epoch.videoCodec);
        const hasAudio = snapshot.audioPacketCount > 0 && snapshot.epoch.audioCodec !== null;
        const audioSource = hasAudio
            ? new EncodedAudioPacketSource(snapshot.epoch.audioCodec)
            : null;
        output.addVideoTrack(videoSource, { frameRate: snapshot.epoch.frameRate });
        if (audioSource)
            output.addAudioTrack(audioSource);
        let canceled = false;
        let cancelPromise = null;
        const abort = () => {
            canceled = true;
            if (output.state === 'started' || output.state === 'pending') {
                cancelPromise ??= output.cancel().catch(() => { });
            }
        };
        signal?.addEventListener('abort', abort, { once: true });
        try {
            await abortable(output.start(), signal);
            let sentVideoConfig = false;
            let sentAudioConfig = false;
            for (const packet of snapshot.packets) {
                throwIfAborted(signal);
                const normalized = normalizedPacket(packet, snapshot);
                if (packet.track === 'video') {
                    const metadata = !sentVideoConfig
                        ? { decoderConfig: snapshot.epoch.videoDecoderConfig }
                        : undefined;
                    await abortable(videoSource.add(normalized, metadata), signal);
                    sentVideoConfig = true;
                }
                else if (audioSource) {
                    const metadata = !sentAudioConfig
                        ? { decoderConfig: snapshot.epoch.audioDecoderConfig }
                        : undefined;
                    await abortable(audioSource.add(normalized, metadata), signal);
                    sentAudioConfig = true;
                }
            }
            videoSource.close();
            audioSource?.close();
            await abortable(output.finalize(), signal);
            const buffer = target.buffer;
            if (!buffer || buffer.byteLength <= 0) {
                throw new EncodedRingError('no_video', 'Muxer finalized without media bytes.');
            }
            const mimeType = await output.getMimeType();
            const data = new Blob([buffer], { type: mimeType });
            const expectedDurationMs = snapshot.actualEndMonotonicMs - snapshot.actualStartMonotonicMs;
            const validation = await validatePlayableReplay(data, expectedDurationMs, signal);
            return Object.freeze({
                data,
                mimeType,
                actualStartMonotonicMs: snapshot.actualStartMonotonicMs,
                actualEndMonotonicMs: snapshot.actualEndMonotonicMs,
                playability: 'validated',
                warnings: Object.freeze([
                    'Export starts at the retained key frame at or before the requested lookback.',
                    'Playability was validated by reopening, seeking, and decoding first and last frames.',
                ]),
                validation,
            });
        }
        catch (error) {
            if (cancelPromise) {
                await cancelPromise;
            }
            else if (!canceled && output.state !== 'canceled' && output.state !== 'finalized') {
                await output.cancel().catch(() => { });
            }
            if (signal?.aborted)
                throw new EncodedRingError('aborted', 'Replay mux was canceled.');
            throw error;
        }
        finally {
            signal?.removeEventListener('abort', abort);
        }
    }
}
export async function validatePlayableReplay(blob, expectedDurationMs, signal) {
    throwIfAborted(signal);
    const input = new Input({ source: new BlobSource(blob), formats: ALL_FORMATS });
    try {
        if (!(await abortable(input.canRead(), signal))) {
            throw new Error('Muxed replay container could not be read back.');
        }
        const videoTrack = await abortable(input.getPrimaryVideoTrack(), signal);
        if (!videoTrack)
            throw new Error('Muxed replay has no primary video track.');
        if (!(await abortable(videoTrack.canDecode(), signal))) {
            throw new Error('Muxed replay video track cannot be decoded in this runtime.');
        }
        const durationSeconds = await abortable(input.computeDuration(), signal);
        if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
            throw new Error('Muxed replay duration is invalid.');
        }
        const durationMs = durationSeconds * 1_000;
        const frameRateToleranceMs = Math.max(250, expectedDurationMs * 0.03);
        const durationDeltaMs = Math.abs(durationMs - expectedDurationMs);
        if (durationDeltaMs > frameRateToleranceMs) {
            throw new Error('Muxed replay duration did not match the selected encoded window.');
        }
        const packetSink = new EncodedPacketSink(videoTrack);
        const firstPacket = await abortable(packetSink.getFirstPacket({ verifyKeyPackets: true }), signal);
        if (!firstPacket || firstPacket.type !== 'key') {
            throw new Error('Muxed replay does not begin with a verified video key frame.');
        }
        const sampleSink = new VideoSampleSink(videoTrack, { optimizeForLatency: true });
        const firstSample = await abortable(sampleSink.getSample(firstPacket.timestamp), signal);
        const lastSample = await abortable(sampleSink.getSample(Math.max(firstPacket.timestamp, durationSeconds - 0.000_001)), signal);
        if (!firstSample || !lastSample) {
            firstSample?.close();
            lastSample?.close();
            throw new Error('Muxed replay first or last frame could not be decoded.');
        }
        try {
            const firstFrame = await frameEvidence(firstSample, signal);
            const lastFrame = await frameEvidence(lastSample, signal);
            if (lastFrame.timestampMs + lastFrame.durationMs < durationMs - frameRateToleranceMs) {
                throw new Error('Decoded last frame does not reach the validated replay duration.');
            }
            const audioTrack = await abortable(input.getPrimaryAudioTrack(), signal);
            let audioFirstSampleTimestampMs = null;
            let audioLastSampleEndMs = null;
            let avStartDeltaMs = null;
            let avEndDeltaMs = null;
            if (audioTrack) {
                if (!(await abortable(audioTrack.canDecode(), signal))) {
                    throw new Error('Muxed replay audio track cannot be decoded in this runtime.');
                }
                const audioFirstTimestamp = await abortable(audioTrack.getFirstTimestamp(), signal);
                const audioDuration = await abortable(audioTrack.computeDuration(), signal);
                const audioSink = new AudioSampleSink(audioTrack);
                const firstAudioSample = await abortable(audioSink.getSample(audioFirstTimestamp), signal);
                const lastAudioSample = await abortable(audioSink.getSample(Math.max(audioFirstTimestamp, audioDuration - 0.000_001)), signal);
                if (!firstAudioSample || !lastAudioSample) {
                    firstAudioSample?.close();
                    lastAudioSample?.close();
                    throw new Error('Muxed replay first or last audio sample could not be decoded.');
                }
                try {
                    audioFirstSampleTimestampMs = firstAudioSample.timestamp * 1_000;
                    audioLastSampleEndMs = (lastAudioSample.timestamp + lastAudioSample.duration) * 1_000;
                    avStartDeltaMs = Math.abs(audioFirstSampleTimestampMs - firstFrame.timestampMs);
                    avEndDeltaMs = Math.abs(audioLastSampleEndMs - (lastFrame.timestampMs + lastFrame.durationMs));
                    const avToleranceMs = Math.max(80, expectedDurationMs * 0.02);
                    if (avStartDeltaMs > avToleranceMs || avEndDeltaMs > avToleranceMs) {
                        throw new Error('Muxed replay audio and video timelines are not normalized together.');
                    }
                }
                finally {
                    firstAudioSample.close();
                    if (lastAudioSample !== firstAudioSample)
                        lastAudioSample.close();
                }
            }
            return Object.freeze({
                validator: 'mediabunny-demux-plus-webcodecs-decode',
                containerReadable: true,
                videoDecodable: true,
                durationMs,
                expectedDurationMs,
                durationDeltaMs,
                firstPacketVerifiedKey: true,
                firstFrame,
                lastFrame,
                audioTrackPresent: audioTrack !== null,
                audioDecodable: audioTrack ? true : null,
                audioFirstSampleTimestampMs,
                audioLastSampleEndMs,
                avStartDeltaMs,
                avEndDeltaMs,
            });
        }
        finally {
            firstSample.close();
            if (lastSample !== firstSample)
                lastSample.close();
        }
    }
    finally {
        input.dispose();
    }
}
function normalizedPacket(packet, snapshot) {
    const originUs = Math.round((snapshot.actualStartMonotonicMs - snapshot.epoch.startedMonotonicMs) * 1_000);
    return new EncodedPacket(packet.data.slice(), packet.type, (packet.timestampUs - originUs) / 1_000_000, packet.durationUs / 1_000_000, packet.sequence);
}
async function frameEvidence(sample, signal) {
    throwIfAborted(signal);
    const bytes = new Uint8Array(sample.allocationSize());
    await abortable(sample.copyTo(bytes), signal);
    const sampled = sampleBytes(bytes, 65_536);
    const digestInput = new Uint8Array(sampled.byteLength);
    digestInput.set(sampled);
    const digest = await crypto.subtle.digest('SHA-256', digestInput.buffer);
    return Object.freeze({
        timestampMs: sample.timestamp * 1_000,
        durationMs: sample.duration * 1_000,
        displayWidth: sample.displayWidth,
        displayHeight: sample.displayHeight,
        pixelSha256: [...new Uint8Array(digest)]
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join(''),
    });
}
function sampleBytes(input, maximum) {
    if (input.byteLength <= maximum)
        return input;
    const output = new Uint8Array(maximum);
    const step = input.byteLength / maximum;
    for (let index = 0; index < maximum; index += 1) {
        output[index] = input[Math.floor(index * step)];
    }
    return output;
}
function throwIfAborted(signal) {
    if (signal?.aborted)
        throw new EncodedRingError('aborted', 'Replay operation was canceled.');
}
async function abortable(promise, signal) {
    if (!signal)
        return promise;
    throwIfAborted(signal);
    return new Promise((resolve, reject) => {
        const abort = () => reject(new EncodedRingError('aborted', 'Replay operation was canceled.'));
        signal.addEventListener('abort', abort, { once: true });
        promise.then((value) => {
            signal.removeEventListener('abort', abort);
            resolve(value);
        }, (error) => {
            signal.removeEventListener('abort', abort);
            reject(error);
        });
    });
}
//# sourceMappingURL=mediabunny-replay-muxer.js.map