export class EncodedRingError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'EncodedRingError';
    }
}
/**
 * Encoded A/V packets are copied into this bounded ring once, then immutable
 * snapshots feed any number of overlapping exports without re-encoding.
 */
export class EncodedMediaRing {
    retentionUs;
    maxBytes;
    epochs = new Map();
    packets = [];
    totalBytes = 0;
    waiters = new Set();
    constructor(options = {}) {
        const retentionMs = options.retentionMs ?? 40_000;
        const maxBytes = options.maxBytes ?? 96 * 1024 * 1024;
        if (!Number.isSafeInteger(retentionMs) || retentionMs < 35_000 || retentionMs > 45_000) {
            throw new EncodedRingError('invalid_config', 'Encoded retention must be 35-45 seconds.');
        }
        if (!Number.isSafeInteger(maxBytes) || maxBytes < 1_048_576) {
            throw new EncodedRingError('invalid_config', 'Encoded byte budget must be at least 1 MiB.');
        }
        this.retentionUs = retentionMs * 1_000;
        this.maxBytes = maxBytes;
    }
    beginEpoch(descriptor) {
        validateEpochDescriptor(descriptor);
        if (this.epochs.has(descriptor.id)) {
            throw new EncodedRingError('invalid_epoch', 'Encoded epoch identity is already in use.');
        }
        const epoch = {
            ...descriptor,
            endedMonotonicMs: null,
            endReason: null,
            videoDecoderConfig: null,
            audioDecoderConfig: null,
            lastSequence: -1,
            lastTrackTimestampUs: { video: -1, audio: -1 },
        };
        this.epochs.set(epoch.id, epoch);
        return copyEpoch(epoch);
    }
    setDecoderConfig(epochId, track, config) {
        const epoch = this.mutableActiveEpoch(epochId);
        if (track === 'video') {
            epoch.videoDecoderConfig = cloneVideoDecoderConfig(config);
        }
        else {
            epoch.audioDecoderConfig = cloneAudioDecoderConfig(config);
        }
    }
    append(input) {
        const epoch = this.mutableActiveEpoch(input.epochId);
        validatePacket(input, epoch);
        const data = input.data.slice();
        const packet = Object.freeze({
            ...input,
            data,
            byteLength: data.byteLength,
        });
        this.packets.push(packet);
        this.totalBytes += packet.byteLength;
        epoch.lastSequence = packet.sequence;
        epoch.lastTrackTimestampUs[packet.track] = packet.timestampUs;
        try {
            this.pruneTime(epoch);
            this.pruneBytes();
        }
        catch (error) {
            const index = this.packets.indexOf(packet);
            if (index >= 0)
                this.removePacketAt(index);
            throw error;
        }
        this.settleCoverageWaiters();
        return clonePacket(packet);
    }
    endEpoch(epochId, endedMonotonicMs, reason) {
        const epoch = this.mutableActiveEpoch(epochId);
        if (!Number.isFinite(endedMonotonicMs) || endedMonotonicMs < epoch.startedMonotonicMs) {
            throw new EncodedRingError('clock_regression', 'Encoded epoch end clock is invalid.');
        }
        epoch.endedMonotonicMs = endedMonotonicMs;
        epoch.endReason = reason || 'unknown';
        this.settleCoverageWaiters();
        return copyEpoch(epoch);
    }
    getEpoch(epochId) {
        const epoch = this.epochs.get(epochId);
        return epoch ? copyEpoch(epoch) : null;
    }
    snapshotWindow(input) {
        const epoch = this.epochs.get(input.epochId);
        if (!epoch)
            throw new EncodedRingError('invalid_epoch', 'Encoded epoch was not found.');
        if (!Number.isFinite(input.requestedStartMonotonicMs) ||
            !Number.isFinite(input.requestedEndMonotonicMs) ||
            input.requestedEndMonotonicMs <= input.requestedStartMonotonicMs) {
            throw new EncodedRingError('invalid_packet', 'Requested encoded window is invalid.');
        }
        if (epoch.endedMonotonicMs !== null &&
            input.requestedEndMonotonicMs > epoch.endedMonotonicMs) {
            throw new EncodedRingError('capture_interrupted', 'Requested encoded window crosses a continuity boundary.');
        }
        if (!epoch.videoDecoderConfig || (epoch.audioCodec && !epoch.audioDecoderConfig)) {
            throw new EncodedRingError('decoder_config_missing', 'Encoded decoder configuration is not available.');
        }
        const epochPackets = this.packets.filter((packet) => packet.epochId === epoch.id);
        const video = epochPackets.filter((packet) => packet.track === 'video');
        if (video.length === 0)
            throw new EncodedRingError('no_video', 'No encoded video is available.');
        const requestedStartUs = Math.max(0, Math.round((input.requestedStartMonotonicMs - epoch.startedMonotonicMs) * 1_000));
        const requestedEndUs = Math.round((input.requestedEndMonotonicMs - epoch.startedMonotonicMs) * 1_000);
        const firstKey = video.find((packet) => packet.type === 'key');
        if (!firstKey)
            throw new EncodedRingError('no_video', 'No independently decodable key frame is retained.');
        const priorKeys = video.filter((packet) => packet.type === 'key' && packet.timestampUs <= requestedStartUs);
        let startKey = priorKeys.at(-1) ?? null;
        const captureClamped = input.requestedStartMonotonicMs < epoch.startedMonotonicMs;
        if (!startKey && captureClamped && firstKey.timestampUs === 0)
            startKey = firstKey;
        if (!startKey) {
            throw new EncodedRingError('window_evicted', 'Requested lookback no longer has a retained key frame.');
        }
        const selectedVideo = video.filter((packet) => packet.sequence >= startKey.sequence && packet.timestampUs < requestedEndUs);
        const videoEndUs = selectedVideo.reduce((maximum, packet) => Math.max(maximum, packet.timestampUs + packet.durationUs), 0);
        if (videoEndUs < requestedEndUs) {
            throw new EncodedRingError('postroll_pending', 'Encoded video has not reached the requested end.');
        }
        const selectedAudio = epochPackets.filter((packet) => packet.track === 'audio' &&
            packet.timestampUs >= startKey.timestampUs &&
            packet.timestampUs < videoEndUs);
        const selected = [...selectedVideo, ...selectedAudio]
            .sort((left, right) => left.sequence - right.sequence)
            .map(clonePacket);
        const actualStartMonotonicMs = epoch.startedMonotonicMs + startKey.timestampUs / 1_000;
        const actualEndMonotonicMs = epoch.startedMonotonicMs + videoEndUs / 1_000;
        return Object.freeze({
            epoch: copyEpoch(epoch),
            requestedStartMonotonicMs: input.requestedStartMonotonicMs,
            requestedEndMonotonicMs: input.requestedEndMonotonicMs,
            actualStartMonotonicMs,
            actualEndMonotonicMs,
            clampedToCaptureStart: captureClamped,
            packets: Object.freeze(selected),
            videoPacketCount: selectedVideo.length,
            audioPacketCount: selectedAudio.length,
            bytes: selected.reduce((sum, packet) => sum + packet.byteLength, 0),
        });
    }
    async waitForCoverage(epochId, targetMonotonicMs, options = {}) {
        const epoch = this.epochs.get(epochId);
        if (!epoch)
            throw new EncodedRingError('invalid_epoch', 'Encoded epoch was not found.');
        if (this.hasCoverage(epochId, targetMonotonicMs))
            return;
        if (epoch.endedMonotonicMs !== null) {
            throw new EncodedRingError('capture_interrupted', 'Capture ended before encoded coverage arrived.');
        }
        const signal = options.signal ?? null;
        if (signal?.aborted)
            throw new EncodedRingError('aborted', 'Encoded coverage wait was canceled.');
        const timeoutMs = options.timeoutMs ?? 12_000;
        await new Promise((resolve, reject) => {
            const waiter = {
                epochId,
                targetMonotonicMs,
                resolve,
                reject,
                signal,
                timeoutId: null,
                abortListener: null,
            };
            waiter.timeoutId = setTimeout(() => {
                this.removeWaiter(waiter);
                reject(new EncodedRingError('coverage_timeout', 'Timed out waiting for encoded post-roll.'));
            }, timeoutMs);
            if (signal) {
                waiter.abortListener = () => {
                    this.removeWaiter(waiter);
                    reject(new EncodedRingError('aborted', 'Encoded coverage wait was canceled.'));
                };
                signal.addEventListener('abort', waiter.abortListener, { once: true });
            }
            this.waiters.add(waiter);
        });
    }
    snapshot() {
        return Object.freeze({
            packetCount: this.packets.length,
            totalBytes: this.totalBytes,
            epochCount: this.epochs.size,
        });
    }
    mutableActiveEpoch(epochId) {
        const epoch = this.epochs.get(epochId);
        if (!epoch)
            throw new EncodedRingError('invalid_epoch', 'Encoded epoch was not found.');
        if (epoch.endedMonotonicMs !== null) {
            throw new EncodedRingError('epoch_closed', 'Encoded epoch is already closed.');
        }
        return epoch;
    }
    hasCoverage(epochId, targetMonotonicMs) {
        const epoch = this.epochs.get(epochId);
        if (!epoch)
            return false;
        const targetUs = Math.round((targetMonotonicMs - epoch.startedMonotonicMs) * 1_000);
        return this.packets.some((packet) => packet.epochId === epochId &&
            packet.track === 'video' &&
            packet.timestampUs + packet.durationUs >= targetUs);
    }
    settleCoverageWaiters() {
        for (const waiter of [...this.waiters]) {
            const epoch = this.epochs.get(waiter.epochId);
            if (this.hasCoverage(waiter.epochId, waiter.targetMonotonicMs)) {
                this.removeWaiter(waiter);
                waiter.resolve();
            }
            else if (epoch?.endedMonotonicMs !== null) {
                this.removeWaiter(waiter);
                waiter.reject(new EncodedRingError('capture_interrupted', 'Capture ended before encoded coverage arrived.'));
            }
        }
    }
    removeWaiter(waiter) {
        this.waiters.delete(waiter);
        if (waiter.timeoutId !== null)
            clearTimeout(waiter.timeoutId);
        if (waiter.signal && waiter.abortListener) {
            waiter.signal.removeEventListener('abort', waiter.abortListener);
        }
    }
    pruneTime(activeEpoch) {
        const video = this.packets.filter((packet) => packet.epochId === activeEpoch.id && packet.track === 'video');
        const newestEndUs = video.reduce((maximum, packet) => Math.max(maximum, packet.timestampUs + packet.durationUs), 0);
        const cutoffUs = newestEndUs - this.retentionUs;
        if (cutoffUs <= 0)
            return;
        const safeKey = video.filter((packet) => packet.type === 'key' && packet.timestampUs <= cutoffUs).at(-1);
        if (!safeKey)
            return;
        this.removeWhere((packet) => packet.epochId === activeEpoch.id &&
            packet.timestampUs + packet.durationUs <= safeKey.timestampUs);
        this.removeExpiredClosedEpochs(activeEpoch.startedMonotonicMs + newestEndUs / 1_000);
    }
    removeExpiredClosedEpochs(newestMonotonicMs) {
        for (const epoch of this.epochs.values()) {
            if (epoch.endedMonotonicMs !== null &&
                epoch.endedMonotonicMs < newestMonotonicMs - this.retentionUs / 1_000) {
                this.removeWhere((packet) => packet.epochId === epoch.id);
            }
        }
    }
    pruneBytes() {
        while (this.totalBytes > this.maxBytes) {
            const keys = this.packets.filter((packet) => packet.track === 'video' && packet.type === 'key');
            const nextKey = keys[1];
            if (!nextKey) {
                throw new EncodedRingError('memory_limit', 'Encoded byte budget was exhausted before another safe key-frame boundary.');
            }
            const nextEpoch = this.epochs.get(nextKey.epochId);
            if (!nextEpoch)
                throw new EncodedRingError('invalid_epoch', 'Encoded epoch metadata is missing.');
            const boundary = nextEpoch.startedMonotonicMs + nextKey.timestampUs / 1_000;
            this.removeWhere((packet) => {
                const epoch = this.epochs.get(packet.epochId);
                if (!epoch)
                    return true;
                const packetEnd = epoch.startedMonotonicMs + (packet.timestampUs + packet.durationUs) / 1_000;
                return packetEnd <= boundary;
            });
        }
    }
    removeWhere(predicate) {
        for (let index = this.packets.length - 1; index >= 0; index -= 1) {
            if (predicate(this.packets[index]))
                this.removePacketAt(index);
        }
    }
    removePacketAt(index) {
        const [removed] = this.packets.splice(index, 1);
        if (removed)
            this.totalBytes -= removed.byteLength;
    }
}
function validateEpochDescriptor(value) {
    if (!/^[A-Za-z0-9._:-]{8,128}$/.test(value.id)) {
        throw new EncodedRingError('invalid_epoch', 'Encoded epoch ID is invalid.');
    }
    if (!Number.isFinite(value.startedMonotonicMs) ||
        !Number.isFinite(value.startedWallClockEpochMs) ||
        value.startedWallClockEpochMs <= 0 ||
        !Number.isFinite(value.frameRate) ||
        value.frameRate <= 0 ||
        value.frameRate > 120) {
        throw new EncodedRingError('invalid_epoch', 'Encoded epoch timing is invalid.');
    }
    if (value.container === 'mp4' && value.videoCodec !== 'avc') {
        throw new EncodedRingError('invalid_epoch', 'This MP4 path requires AVC video.');
    }
    if (value.container === 'mp4' && value.audioCodec !== null && value.audioCodec !== 'aac') {
        throw new EncodedRingError('invalid_epoch', 'This MP4 path requires AAC audio.');
    }
    if (value.container === 'webm' && !['vp8', 'vp9'].includes(value.videoCodec)) {
        throw new EncodedRingError('invalid_epoch', 'This WebM path requires VP8 or VP9 video.');
    }
    if (value.container === 'webm' && value.audioCodec !== null && value.audioCodec !== 'opus') {
        throw new EncodedRingError('invalid_epoch', 'This WebM path requires Opus audio.');
    }
}
function validatePacket(input, epoch) {
    if (input.sequence <= epoch.lastSequence ||
        !Number.isSafeInteger(input.sequence) ||
        input.sequence < 0 ||
        !Number.isSafeInteger(input.timestampUs) ||
        input.timestampUs < 0 ||
        !Number.isSafeInteger(input.durationUs) ||
        input.durationUs <= 0 ||
        !(input.data instanceof Uint8Array) ||
        input.data.byteLength <= 0) {
        throw new EncodedRingError('invalid_packet', 'Encoded packet metadata is invalid.');
    }
    if (input.timestampUs < epoch.lastTrackTimestampUs[input.track]) {
        throw new EncodedRingError('clock_regression', 'Realtime encoded packet timestamps must not regress within a track.');
    }
    if (input.track === 'audio' && input.type !== 'key') {
        throw new EncodedRingError('invalid_packet', 'Encoded audio packets must be independent key packets.');
    }
}
function clonePacket(packet) {
    const data = packet.data.slice();
    return Object.freeze({ ...packet, data, byteLength: data.byteLength });
}
function copyEpoch(epoch) {
    return Object.freeze({
        id: epoch.id,
        startedMonotonicMs: epoch.startedMonotonicMs,
        startedWallClockEpochMs: epoch.startedWallClockEpochMs,
        container: epoch.container,
        videoCodec: epoch.videoCodec,
        audioCodec: epoch.audioCodec,
        frameRate: epoch.frameRate,
        endedMonotonicMs: epoch.endedMonotonicMs,
        endReason: epoch.endReason,
        videoDecoderConfig: epoch.videoDecoderConfig
            ? cloneVideoDecoderConfig(epoch.videoDecoderConfig)
            : null,
        audioDecoderConfig: epoch.audioDecoderConfig
            ? cloneAudioDecoderConfig(epoch.audioDecoderConfig)
            : null,
    });
}
function cloneVideoDecoderConfig(config) {
    if (!config || typeof config.codec !== 'string' || !config.codec) {
        throw new EncodedRingError('decoder_config_missing', 'Video decoder configuration is invalid.');
    }
    return Object.freeze({
        ...config,
        ...(config.description ? { description: cloneBufferSource(config.description) } : {}),
        ...(config.colorSpace ? { colorSpace: { ...config.colorSpace } } : {}),
    });
}
function cloneAudioDecoderConfig(config) {
    if (!config || typeof config.codec !== 'string' || !config.codec) {
        throw new EncodedRingError('decoder_config_missing', 'Audio decoder configuration is invalid.');
    }
    return Object.freeze({
        ...config,
        ...(config.description ? { description: cloneBufferSource(config.description) } : {}),
    });
}
function cloneBufferSource(value) {
    if (ArrayBuffer.isView(value)) {
        return new Uint8Array(value.buffer, value.byteOffset, value.byteLength).slice();
    }
    return new Uint8Array(value).slice();
}
//# sourceMappingURL=webcodecs-ring.js.map