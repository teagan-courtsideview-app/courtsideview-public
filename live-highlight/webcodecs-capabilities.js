export async function detectWebCodecsReplayCapabilities(input) {
    const width = evenDimension(input.width, 'width');
    const height = evenDimension(input.height, 'height');
    const frameRate = boundedNumber(input.frameRate ?? 30, 1, 60, 'frameRate');
    const videoBitrate = boundedInteger(input.videoBitrate ?? defaultVideoBitrate(width, height, frameRate), 250_000, 20_000_000, 'videoBitrate');
    const sampleRate = boundedInteger(input.sampleRate ?? 48_000, 8_000, 96_000, 'sampleRate');
    const numberOfChannels = boundedInteger(input.numberOfChannels ?? 1, 1, 2, 'numberOfChannels');
    const audioBitrate = boundedInteger(input.audioBitrate ?? 96_000, 32_000, 320_000, 'audioBitrate');
    const environment = input.environment ?? browserEnvironment();
    const browserFamily = classifyBrowser(environment.userAgent);
    const profiles = createProfiles({
        width,
        height,
        frameRate,
        videoBitrate,
        sampleRate,
        numberOfChannels,
        audioBitrate,
    });
    const checks = [];
    let selected = null;
    for (const profile of profiles) {
        const [videoEncode, videoDecode, audioEncode, audioDecode] = await Promise.all([
            supported(environment.videoEncoder, profile.videoEncoderConfig),
            supported(environment.videoDecoder, decoderConfigFor(profile.videoEncoderConfig)),
            supported(environment.audioEncoder, profile.audioEncoderConfig),
            supported(environment.audioDecoder, profile.audioEncoderConfig),
        ]);
        const browserPlayback = environment.canPlayType(profile.mimeType) !== '';
        checks.push(Object.freeze({
            id: profile.id,
            videoEncode,
            videoDecode,
            audioEncode,
            audioDecode,
            browserPlayback,
        }));
        const audioReady = !input.requestedAudio || (audioEncode && audioDecode);
        if (!selected &&
            environment.secureContext &&
            environment.mediaStreamTrackProcessor &&
            videoEncode &&
            videoDecode &&
            audioReady &&
            browserPlayback) {
            selected = profile;
        }
    }
    const limitations = [];
    if (!environment.secureContext)
        limitations.push('A secure context is required for camera capture.');
    if (!environment.mediaStreamTrackProcessor) {
        limitations.push('MediaStreamTrackProcessor is unavailable; coherent shared-source capture is unsupported.');
    }
    if (!environment.videoEncoder || !environment.videoDecoder) {
        limitations.push('VideoEncoder and VideoDecoder are both required.');
    }
    if (input.requestedAudio && (!environment.audioEncoder || !environment.audioDecoder)) {
        limitations.push('The source has audio, but AudioEncoder/AudioDecoder is unavailable; audio is not silently dropped.');
    }
    if (!selected)
        limitations.push('No encode, decode, container, and playback profile passed runtime probing.');
    if (browserFamily === 'safari' && input.requestedAudio && !environment.audioEncoder) {
        limitations.push('This Safari runtime lacks WebCodecs audio encoding; video-only fallback requires explicit consent.');
    }
    const anyVideoOnly = checks.some((check) => environment.secureContext &&
        environment.mediaStreamTrackProcessor &&
        check.videoEncode &&
        check.videoDecode &&
        check.browserPlayback);
    const status = selected
        ? 'ready'
        : input.requestedAudio && anyVideoOnly
            ? 'video_only'
            : 'unsupported';
    return Object.freeze({
        status,
        browserFamily,
        secureContext: environment.secureContext,
        api: Object.freeze({
            mediaStreamTrackProcessor: environment.mediaStreamTrackProcessor,
            videoEncoder: Boolean(environment.videoEncoder),
            videoDecoder: Boolean(environment.videoDecoder),
            audioEncoder: Boolean(environment.audioEncoder),
            audioDecoder: Boolean(environment.audioDecoder),
        }),
        requestedAudio: input.requestedAudio,
        selectedProfile: selected ? freezeProfile(selected) : null,
        profileChecks: Object.freeze(checks),
        limitations: Object.freeze(limitations),
    });
}
function createProfiles(input) {
    const sharedVideo = {
        width: input.width,
        height: input.height,
        bitrate: input.videoBitrate,
        framerate: input.frameRate,
        latencyMode: 'realtime',
        hardwareAcceleration: 'no-preference',
    };
    const sharedAudio = {
        sampleRate: input.sampleRate,
        numberOfChannels: input.numberOfChannels,
        bitrate: input.audioBitrate,
        bitrateMode: 'variable',
    };
    return [
        {
            id: 'mp4-avc-aac',
            container: 'mp4',
            mimeType: 'video/mp4; codecs="avc1.42001f, mp4a.40.2"',
            videoCodec: 'avc',
            audioCodec: 'aac',
            videoEncoderConfig: {
                ...sharedVideo,
                codec: 'avc1.42001f',
                avc: { format: 'avc' },
            },
            audioEncoderConfig: { ...sharedAudio, codec: 'mp4a.40.2' },
        },
        {
            id: 'webm-vp9-opus',
            container: 'webm',
            mimeType: 'video/webm; codecs="vp09.00.31.08, opus"',
            videoCodec: 'vp9',
            audioCodec: 'opus',
            videoEncoderConfig: { ...sharedVideo, codec: 'vp09.00.31.08' },
            audioEncoderConfig: { ...sharedAudio, codec: 'opus' },
        },
        {
            id: 'webm-vp8-opus',
            container: 'webm',
            mimeType: 'video/webm; codecs="vp8, opus"',
            videoCodec: 'vp8',
            audioCodec: 'opus',
            videoEncoderConfig: { ...sharedVideo, codec: 'vp8' },
            audioEncoderConfig: { ...sharedAudio, codec: 'opus' },
        },
    ];
}
function browserEnvironment() {
    const video = typeof document !== 'undefined' ? document.createElement('video') : null;
    return {
        secureContext: globalThis.isSecureContext === true,
        userAgent: globalThis.navigator?.userAgent ?? '',
        mediaStreamTrackProcessor: typeof globalThis.MediaStreamTrackProcessor === 'function',
        videoEncoder: typeof globalThis.VideoEncoder === 'function' ? globalThis.VideoEncoder : null,
        videoDecoder: typeof globalThis.VideoDecoder === 'function' ? globalThis.VideoDecoder : null,
        audioEncoder: typeof globalThis.AudioEncoder === 'function' ? globalThis.AudioEncoder : null,
        audioDecoder: typeof globalThis.AudioDecoder === 'function' ? globalThis.AudioDecoder : null,
        canPlayType: (mimeType) => video?.canPlayType(mimeType) ?? '',
    };
}
async function supported(constructor, config) {
    if (!constructor)
        return false;
    try {
        return (await constructor.isConfigSupported(config)).supported === true;
    }
    catch {
        return false;
    }
}
function decoderConfigFor(config) {
    return {
        codec: config.codec,
        codedWidth: config.width,
        codedHeight: config.height,
        ...(config.hardwareAcceleration ? { hardwareAcceleration: config.hardwareAcceleration } : {}),
    };
}
function classifyBrowser(userAgent) {
    if (/Android/i.test(userAgent) && /(Chrome|CriOS)/i.test(userAgent))
        return 'chrome_android';
    if (/(Chrome|Chromium)/i.test(userAgent) && !/(Edg|OPR)/i.test(userAgent))
        return 'chrome_desktop';
    if (/Safari/i.test(userAgent) && !/(Chrome|Chromium|CriOS|Edg|OPR)/i.test(userAgent))
        return 'safari';
    return 'other';
}
function freezeProfile(profile) {
    return Object.freeze({
        ...profile,
        videoEncoderConfig: Object.freeze({ ...profile.videoEncoderConfig }),
        audioEncoderConfig: Object.freeze({ ...profile.audioEncoderConfig }),
    });
}
function evenDimension(value, field) {
    const bounded = boundedInteger(value, 16, 4_096, field);
    return bounded % 2 === 0 ? bounded : bounded - 1;
}
function boundedInteger(value, minimum, maximum, field) {
    if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
        throw new TypeError(`${field} must be an integer between ${minimum} and ${maximum}.`);
    }
    return value;
}
function boundedNumber(value, minimum, maximum, field) {
    if (!Number.isFinite(value) || value < minimum || value > maximum) {
        throw new TypeError(`${field} must be between ${minimum} and ${maximum}.`);
    }
    return value;
}
function defaultVideoBitrate(width, height, frameRate) {
    return Math.min(12_000_000, Math.max(1_000_000, Math.round(width * height * frameRate * 0.12)));
}
//# sourceMappingURL=webcodecs-capabilities.js.map