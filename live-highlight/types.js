export const LIVE_HIGHLIGHT_LOOKBACK_SECONDS = [10, 15, 30];
export const LIVE_HIGHLIGHT_COALESCE_WINDOW_MS = 2_000;
export const LIVE_HIGHLIGHT_READY_BUFFER_MS = 30_000;
export class BroadcasterReplayPortError extends Error {
    failureCode;
    retryable;
    constructor(failureCode, retryable, message = 'Authoritative replay operation failed.') {
        super(message);
        this.failureCode = failureCode;
        this.retryable = retryable;
        this.name = 'BroadcasterReplayPortError';
    }
}
export class LiveHighlightControlError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'LiveHighlightControlError';
    }
}
//# sourceMappingURL=types.js.map