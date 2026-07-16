import { LIVE_HIGHLIGHT_READY_BUFFER_MS, BroadcasterReplayPortError, LiveHighlightControlError, } from './types.js';
const TRANSIENT_REPLAY_FAILURES = new Set([
    'capture_interrupted',
    'capture_stopped',
    'mux_failed',
    'save_failed',
    'storage_unavailable',
    'replay_save_failed',
    'server_unavailable',
    'timeout',
]);
const PERMANENT_REPLAY_FAILURES = new Set([
    'authorization_expired',
    'window_evicted',
    'no_media',
    'unvalidated_media',
    'invalid_authorization',
    'invalid_command_binding',
    'identity_mismatch',
    'authorization_denied',
    'stale_command',
    'stale_context',
    'mismatched_game',
    'request_conflict',
    'invalid_gateway_response',
    'invalid_input',
]);
/**
 * FanView-camera presentation controller around an authoritative replay port.
 * Every delivered command, including a duplicate, is authorized before any
 * presentation-level coalescing or terminal-result reuse.
 */
export class BroadcasterLiveHighlightController {
    clock;
    replay;
    crypto;
    listeners = new Set();
    requestBindings = new Map();
    inFlight = new Map();
    activeOperations = new Set();
    lifecycleEpoch = 0;
    bufferOperationSequence = 0;
    lifecycleAbort = null;
    startInFlight = null;
    refreshInFlight = null;
    drainInFlight = null;
    recoveryInFlight = null;
    quarantined = false;
    state = freezeBroadcasterState({
        role: 'broadcaster',
        connection: 'unpaired',
        binding: null,
        buffer: emptyBuffer(),
        requests: [],
    });
    constructor(options) {
        this.clock = options.clock;
        this.replay = options.replay;
        const crypto = options.crypto ?? globalThis.crypto;
        if (!crypto?.subtle) {
            throw new Error('Web Crypto is required to verify immutable command binding bytes.');
        }
        this.crypto = crypto;
    }
    get snapshot() {
        return this.state;
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.state);
        return () => this.listeners.delete(listener);
    }
    beginPairing() {
        if (this.drainInFlight || this.quarantined) {
            throw new LiveHighlightControlError('request_conflict', 'The previous FanView session is still draining.');
        }
        this.patch({ connection: 'pairing' });
    }
    pair(bindingInput) {
        if (this.drainInFlight || this.quarantined) {
            throw new LiveHighlightControlError('request_conflict', 'Wait for the previous FanView session to stop before pairing again.');
        }
        const binding = validateBinding(bindingInput);
        if (this.state.binding) {
            if (!sameIdentity(this.state.binding, binding)) {
                throw new LiveHighlightControlError('mismatched_game', 'Unpair the current FanView session before pairing another game.');
            }
            this.patch({ connection: 'paired', binding });
            return;
        }
        this.lifecycleEpoch += 1;
        this.bufferOperationSequence += 1;
        this.lifecycleAbort = new AbortController();
        this.requestBindings.clear();
        this.inFlight.clear();
        this.startInFlight = null;
        this.refreshInFlight = null;
        this.patch({ connection: 'paired', binding, buffer: emptyBuffer(), requests: [] });
    }
    updateSet(setNumberInput) {
        const binding = this.requireBinding();
        const setNumber = safeInteger(setNumberInput, 1, 99, 'setNumber');
        this.patch({ binding: Object.freeze({ ...binding, setNumber }) });
    }
    unpair() {
        if (this.drainInFlight)
            return this.drainInFlight;
        this.lifecycleAbort?.abort();
        this.lifecycleAbort = null;
        this.lifecycleEpoch += 1;
        this.bufferOperationSequence += 1;
        this.startInFlight = null;
        this.refreshInFlight = null;
        this.requestBindings.clear();
        this.inFlight.clear();
        this.patch({
            connection: 'unpaired',
            binding: null,
            buffer: emptyBuffer(),
            requests: [],
        });
        const pending = [...this.activeOperations];
        const stop = Promise.resolve().then(() => this.replay.stop());
        let drain;
        drain = Promise.allSettled([stop, ...pending]).then((results) => {
            const stopResult = results[0];
            if (stopResult?.status === 'rejected') {
                this.quarantined = true;
                throw new LiveHighlightControlError('buffer_unavailable', 'FanView replay buffer could not be stopped cleanly.');
            }
        });
        this.drainInFlight = drain;
        void drain.then(() => {
            if (this.drainInFlight === drain)
                this.drainInFlight = null;
        }, () => undefined);
        return drain;
    }
    /** Explicitly retries native stop after a quarantined lifecycle. */
    recoverQuarantinedLifecycle() {
        if (this.recoveryInFlight)
            return this.recoveryInFlight;
        if (!this.quarantined) {
            return this.drainInFlight ?? Promise.resolve();
        }
        let recovery;
        recovery = Promise.resolve()
            .then(() => this.replay.stop())
            .then(() => {
            this.quarantined = false;
            this.drainInFlight = null;
        })
            .catch(() => {
            this.quarantined = true;
            throw new LiveHighlightControlError('buffer_unavailable', 'FanView replay lifecycle remains quarantined because stop failed again.');
        });
        this.recoveryInFlight = recovery;
        void recovery.then(() => {
            if (this.recoveryInFlight === recovery)
                this.recoveryInFlight = null;
        }, () => {
            if (this.recoveryInFlight === recovery)
                this.recoveryInFlight = null;
        });
        return recovery;
    }
    markOffline() {
        if (this.state.binding)
            this.patch({ connection: 'offline' });
    }
    recoverOnline() {
        if (this.state.binding)
            this.patch({ connection: 'paired' });
    }
    startBuffering() {
        const lifecycle = this.currentLifecycle();
        if (this.startInFlight?.epoch === lifecycle.epoch)
            return this.startInFlight.promise;
        if (this.state.buffer.phase === 'buffering' || this.state.buffer.phase === 'ready') {
            return Promise.resolve(this.state);
        }
        this.patchForLifecycle(lifecycle, {
            buffer: Object.freeze({
                phase: 'buffering',
                bufferedDurationMs: 0,
                targetDurationMs: LIVE_HIGHLIGHT_READY_BUFFER_MS,
                continuityEpoch: 0,
                continuous: true,
                failureCode: null,
            }),
        });
        const sequence = ++this.bufferOperationSequence;
        const operation = this.track(this.runStart(lifecycle, sequence));
        this.startInFlight = { epoch: lifecycle.epoch, promise: operation };
        void operation.then(() => this.clearStart(operation), () => this.clearStart(operation));
        return operation;
    }
    refreshBuffer() {
        const lifecycle = this.currentLifecycle();
        if (this.startInFlight?.epoch === lifecycle.epoch)
            return this.startInFlight.promise;
        if (this.refreshInFlight?.epoch === lifecycle.epoch)
            return this.refreshInFlight.promise;
        const sequence = ++this.bufferOperationSequence;
        const operation = this.track(this.runRefresh(lifecycle, sequence));
        this.refreshInFlight = { epoch: lifecycle.epoch, promise: operation };
        void operation.then(() => this.clearRefresh(operation), () => this.clearRefresh(operation));
        return operation;
    }
    async receiveCommand(commandInput) {
        const command = validateCommand(commandInput);
        const lifecycle = this.currentLifecycle();
        if (this.state.connection === 'offline') {
            throw new LiveHighlightControlError('offline', 'FanView control transport is offline.');
        }
        assertCommandRoute(command, lifecycle.binding, this.clock.nowEpochMs());
        if (this.state.buffer.phase === 'inactive' ||
            this.state.buffer.phase === 'interrupted' ||
            this.state.buffer.phase === 'failed') {
            throw new LiveHighlightControlError('buffer_unavailable', 'FanView replay buffer is not available.');
        }
        return this.track(this.authorizeThenSave(command, lifecycle));
    }
    async runStart(lifecycle, sequence) {
        try {
            const reading = await this.replay.start(lifecycle.binding, { signal: lifecycle.signal });
            this.assertLifecycle(lifecycle);
            if (sequence !== this.bufferOperationSequence)
                return this.state;
            this.patchForLifecycle(lifecycle, { buffer: normalizeReading(reading) });
        }
        catch (error) {
            this.assertLifecycle(lifecycle);
            if (sequence !== this.bufferOperationSequence)
                return this.state;
            this.patchForLifecycle(lifecycle, {
                buffer: Object.freeze({
                    ...emptyBuffer(),
                    phase: 'failed',
                    failureCode: failureCodeFromError(error, 'buffer_start_failed'),
                }),
            });
        }
        return this.state;
    }
    async runRefresh(lifecycle, sequence) {
        try {
            const reading = await this.replay.readStatus({ signal: lifecycle.signal });
            this.assertLifecycle(lifecycle);
            if (sequence !== this.bufferOperationSequence)
                return this.state;
            this.patchForLifecycle(lifecycle, { buffer: normalizeReading(reading) });
        }
        catch (error) {
            this.assertLifecycle(lifecycle);
            if (sequence !== this.bufferOperationSequence)
                return this.state;
            this.patchForLifecycle(lifecycle, {
                buffer: Object.freeze({
                    ...this.state.buffer,
                    phase: 'failed',
                    continuous: false,
                    failureCode: failureCodeFromError(error, 'buffer_status_failed'),
                }),
            });
        }
        return this.state;
    }
    async authorizeThenSave(command, lifecycle) {
        await assertImmutableCommandDigest(command, this.crypto);
        this.assertLifecycle(lifecycle);
        // This call intentionally precedes every duplicate/in-flight/terminal check.
        const authorized = await this.replay.authorize(command, { signal: lifecycle.signal });
        this.assertLifecycle(lifecycle);
        assertAuthorizedCommand(authorized, command);
        const bindingDigest = authorized.authoritativeBindingDigest;
        const priorBinding = this.requestBindings.get(command.requestId);
        if (priorBinding && priorBinding !== bindingDigest) {
            throw new LiveHighlightControlError('request_conflict', 'Request ID is authoritatively bound to a different canonical command.');
        }
        this.requestBindings.set(command.requestId, bindingDigest);
        const existingOperation = this.inFlight.get(command.requestId);
        if (existingOperation?.epoch === lifecycle.epoch)
            return existingOperation.promise;
        const existing = this.state.requests.find((request) => request.canonicalRequestId === command.requestId);
        if (existing && (existing.phase === 'saved' || (existing.phase === 'failed' && !existing.canRetry))) {
            return existing;
        }
        const operation = this.saveAuthorized(authorized, lifecycle, existing ?? null);
        this.inFlight.set(command.requestId, { epoch: lifecycle.epoch, promise: operation });
        try {
            return await operation;
        }
        finally {
            const current = this.inFlight.get(command.requestId);
            if (current?.promise === operation)
                this.inFlight.delete(command.requestId);
        }
    }
    async saveAuthorized(authorized, lifecycle, existing) {
        const command = authorized.command;
        if (existing) {
            this.replaceRequestForLifecycle(lifecycle, command.requestId, {
                phase: 'saving',
                failureCode: null,
                canRetry: false,
                attemptCount: existing.attemptCount + 1,
            });
        }
        else {
            const request = requestFromCommand(command);
            this.patchForLifecycle(lifecycle, { requests: [request, ...this.state.requests] });
        }
        try {
            const result = await this.replay.save(authorized, { signal: lifecycle.signal });
            this.assertLifecycle(lifecycle);
            assertResultRoute(result, command);
            if (result.status === 'saved') {
                this.replaceRequestForLifecycle(lifecycle, command.requestId, {
                    phase: 'saved',
                    clipId: identifier(result.clipId, 'clipId'),
                    failureCode: null,
                    canRetry: false,
                });
            }
            else {
                const code = failureCode(result.failureCode);
                this.replaceRequestForLifecycle(lifecycle, command.requestId, {
                    phase: 'failed',
                    failureCode: code,
                    canRetry: isTransientReplayFailure(code),
                });
            }
        }
        catch (error) {
            this.assertLifecycle(lifecycle);
            const classification = classifyReplayError(error);
            this.replaceRequestForLifecycle(lifecycle, command.requestId, {
                phase: 'failed',
                failureCode: classification.failureCode,
                canRetry: classification.retryable,
            });
        }
        return this.requireRequest(command.requestId);
    }
    currentLifecycle() {
        const binding = this.requireBinding();
        const signal = this.lifecycleAbort?.signal;
        if (!signal || signal.aborted || this.drainInFlight) {
            throw new LiveHighlightControlError('request_conflict', 'FanView replay lifecycle is not accepting new work.');
        }
        return Object.freeze({ epoch: this.lifecycleEpoch, binding, signal });
    }
    assertLifecycle(lifecycle) {
        if (lifecycle.signal.aborted ||
            lifecycle.epoch !== this.lifecycleEpoch ||
            !this.state.binding ||
            !sameIdentity(lifecycle.binding, this.state.binding)) {
            throw new LiveHighlightControlError('stale_context', 'A completed replay operation belongs to an inactive FanView session.');
        }
    }
    patchForLifecycle(lifecycle, patch) {
        this.assertLifecycle(lifecycle);
        this.patch(patch);
    }
    requireBinding() {
        if (!this.state.binding || this.state.connection === 'unpaired' || this.state.connection === 'pairing') {
            throw new LiveHighlightControlError('unpaired', 'Pair the FanView camera first.');
        }
        return this.state.binding;
    }
    requireRequest(canonicalRequestId) {
        const request = this.state.requests.find((candidate) => candidate.canonicalRequestId === canonicalRequestId);
        if (!request)
            throw new LiveHighlightControlError('invalid_input', 'Request state is missing.');
        return request;
    }
    replaceRequestForLifecycle(lifecycle, canonicalRequestId, patch) {
        this.patchForLifecycle(lifecycle, {
            requests: this.state.requests.map((request) => request.canonicalRequestId === canonicalRequestId
                ? Object.freeze({ ...request, ...patch })
                : request),
        });
    }
    clearStart(promise) {
        if (this.startInFlight?.promise === promise)
            this.startInFlight = null;
    }
    clearRefresh(promise) {
        if (this.refreshInFlight?.promise === promise)
            this.refreshInFlight = null;
    }
    track(operation) {
        this.activeOperations.add(operation);
        void operation.then(() => this.activeOperations.delete(operation), () => this.activeOperations.delete(operation));
        return operation;
    }
    patch(patch) {
        this.state = freezeBroadcasterState({ ...this.state, ...patch, role: 'broadcaster' });
        for (const listener of this.listeners)
            listener(this.state);
    }
}
export function isTransientReplayFailure(code) {
    return !isPermanentReplayFailure(code) && TRANSIENT_REPLAY_FAILURES.has(code);
}
export function isPermanentReplayFailure(code) {
    return PERMANENT_REPLAY_FAILURES.has(code);
}
function requestFromCommand(command) {
    const attribution = attributionFromCommand(command);
    return Object.freeze({
        localRequestId: `remote-${command.requestId}`,
        canonicalRequestId: command.requestId,
        idempotencyKey: `canonical-${command.requestId}`,
        phase: 'saving',
        tappedAtEpochMs: command.issuedAtEpochMs,
        occurredAtEpochMs: attribution.event.kind === 'scorer_entered'
            ? attribution.event.occurredAtEpochMs
            : null,
        lookbackSeconds: (command.requestedWindow.preRollMs / 1_000),
        setNumber: command.context.setNumber,
        score: command.context.score,
        attribution,
        clipId: null,
        failureCode: null,
        canRetry: false,
        attemptCount: 1,
    });
}
export function attributionFromCommand(command) {
    const label = command.context.statLabel;
    if (!label) {
        return Object.freeze({
            athlete: Object.freeze({ kind: 'unknown' }),
            event: Object.freeze({ kind: 'unknown', occurredAtEpochMs: null }),
        });
    }
    return Object.freeze({
        athlete: label.playerProfileId
            ? Object.freeze({
                kind: 'known_profile',
                playerProfileId: label.playerProfileId,
                displayName: null,
            })
            : Object.freeze({ kind: 'unknown' }),
        event: Object.freeze({
            kind: 'scorer_entered',
            eventId: label.eventId,
            eventType: label.eventType,
            outcomeSemantics: label.outcomeSemantics,
            occurredAtEpochMs: label.eventTimestampEpochMs,
        }),
    });
}
function validateCommand(input) {
    if (input.contractVersion !== 'courtsideview-live-highlight/1.0.0' ||
        input.kind !== 'save_live_highlight' ||
        input.requestedWindow.anchor !== 'command_received' ||
        ![10_000, 15_000, 30_000].includes(input.requestedWindow.preRollMs) ||
        input.context.scorePerspective !== 'scoring_device_us_them') {
        throw new LiveHighlightControlError('invalid_input', 'Canonical highlight command is invalid.');
    }
    identifier(input.requestId, 'requestId');
    identifier(input.matchId, 'matchId');
    identifier(input.broadcastSessionId, 'broadcastSessionId');
    identifier(input.broadcasterId, 'broadcasterId');
    identifier(input.authorization.grantId, 'grantId');
    if (!/^[0-9a-f]{64}$/.test(input.authorization.bindingDigest)) {
        throw new LiveHighlightControlError('invalid_input', 'Command binding digest is invalid.');
    }
    validEpoch(input.issuedAtEpochMs, 'issuedAtEpochMs');
    validEpoch(input.expiresAtEpochMs, 'expiresAtEpochMs');
    safeInteger(input.requestedWindow.postRollMs, 0, 8_000, 'postRollMs');
    safeInteger(input.context.setNumber, 1, 99, 'setNumber');
    safeInteger(input.context.score.us, 0, 999, 'score.us');
    safeInteger(input.context.score.them, 0, 999, 'score.them');
    const label = input.context.statLabel;
    if (label) {
        identifier(label.eventId, 'eventId');
        if (!['kill', 'dumpKill', 'ace', 'block'].includes(label.eventType)) {
            throw new LiveHighlightControlError('invalid_input', 'Stat event type is invalid.');
        }
        if (label.playerProfileId !== null)
            identifier(label.playerProfileId, 'playerProfileId');
        validEpoch(label.eventTimestampEpochMs, 'eventTimestampEpochMs');
        if (label.source !== 'scorer_entered_live_event') {
            throw new LiveHighlightControlError('invalid_input', 'Stat source is not trusted.');
        }
        if ((label.eventType === 'block' && label.outcomeSemantics !== 'credit_only') ||
            (label.eventType !== 'block' && label.outcomeSemantics !== 'scoring')) {
            throw new LiveHighlightControlError('invalid_input', 'Stat outcome semantics are invalid.');
        }
    }
    const statLabel = input.context.statLabel
        ? Object.freeze({
            eventId: input.context.statLabel.eventId,
            eventType: input.context.statLabel.eventType,
            playerProfileId: input.context.statLabel.playerProfileId,
            eventTimestampEpochMs: input.context.statLabel.eventTimestampEpochMs,
            source: input.context.statLabel.source,
            outcomeSemantics: input.context.statLabel.outcomeSemantics,
        })
        : null;
    return Object.freeze({
        contractVersion: input.contractVersion,
        kind: input.kind,
        requestId: input.requestId,
        matchId: input.matchId,
        broadcastSessionId: input.broadcastSessionId,
        broadcasterId: input.broadcasterId,
        issuedAtEpochMs: input.issuedAtEpochMs,
        expiresAtEpochMs: input.expiresAtEpochMs,
        requestedWindow: Object.freeze({
            preRollMs: input.requestedWindow.preRollMs,
            postRollMs: input.requestedWindow.postRollMs,
            anchor: input.requestedWindow.anchor,
        }),
        context: Object.freeze({
            setNumber: input.context.setNumber,
            scorePerspective: input.context.scorePerspective,
            score: Object.freeze({
                us: input.context.score.us,
                them: input.context.score.them,
            }),
            statLabel,
        }),
        authorization: Object.freeze({
            grantId: input.authorization.grantId,
            bindingDigest: input.authorization.bindingDigest,
        }),
    });
}
async function assertImmutableCommandDigest(command, crypto) {
    const bindingValue = {
        contractVersion: command.contractVersion,
        kind: command.kind,
        requestId: command.requestId,
        matchId: command.matchId,
        broadcastSessionId: command.broadcastSessionId,
        broadcasterId: command.broadcasterId,
        issuedAtEpochMs: command.issuedAtEpochMs,
        expiresAtEpochMs: command.expiresAtEpochMs,
        requestedWindow: command.requestedWindow,
        context: command.context,
        authorization: { grantId: command.authorization.grantId },
    };
    const encoded = new TextEncoder().encode(canonicalJson(bindingValue));
    const bytes = new Uint8Array(encoded.byteLength);
    bytes.set(encoded);
    const digest = await crypto.subtle.digest('SHA-256', bytes.buffer);
    const actual = [...new Uint8Array(digest)]
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
    if (!constantTimeEqualHex(actual, command.authorization.bindingDigest)) {
        throw new LiveHighlightControlError('invalid_input', 'Immutable command bytes do not match the canonical binding digest.');
    }
}
function canonicalJson(value) {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') {
        return JSON.stringify(value);
    }
    if (typeof value === 'number') {
        if (!Number.isSafeInteger(value))
            throw new TypeError('Canonical numbers must be safe integers.');
        return String(value);
    }
    if (Array.isArray(value))
        return `[${value.map(canonicalJson).join(',')}]`;
    if (typeof value === 'object') {
        const record = value;
        return `{${Object.keys(record)
            .sort()
            .map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`)
            .join(',')}}`;
    }
    throw new TypeError('Unsupported canonical value.');
}
function constantTimeEqualHex(left, right) {
    if (left.length !== right.length)
        return false;
    let mismatch = 0;
    for (let index = 0; index < left.length; index += 1) {
        mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
    }
    return mismatch === 0;
}
function assertAuthorizedCommand(authorized, delivered) {
    if (!authorized || authorized.authorityHandle === null || authorized.authorityHandle === undefined) {
        throw new LiveHighlightControlError('invalid_gateway_response', 'Replay authority did not return an opaque authorization handle.');
    }
    const canonical = validateCommand(authorized.command);
    if (authorized.authoritativeBindingDigest !== delivered.authorization.bindingDigest ||
        canonical.authorization.bindingDigest !== delivered.authorization.bindingDigest ||
        presentationBinding(canonical) !== presentationBinding(delivered)) {
        throw new LiveHighlightControlError('invalid_gateway_response', 'Replay authority response does not bind the exact delivered command.');
    }
}
function presentationBinding(command) {
    return JSON.stringify({
        contractVersion: command.contractVersion,
        kind: command.kind,
        requestId: command.requestId,
        matchId: command.matchId,
        broadcastSessionId: command.broadcastSessionId,
        broadcasterId: command.broadcasterId,
        issuedAtEpochMs: command.issuedAtEpochMs,
        expiresAtEpochMs: command.expiresAtEpochMs,
        requestedWindow: command.requestedWindow,
        context: command.context,
        authorization: command.authorization,
    });
}
function assertCommandRoute(command, binding, nowEpochMsInput) {
    if (command.matchId !== binding.matchId ||
        command.broadcastSessionId !== binding.broadcastSessionId ||
        command.broadcasterId !== binding.broadcasterId) {
        throw new LiveHighlightControlError('mismatched_game', 'Command does not target this paired FanView session.');
    }
    if (command.context.setNumber !== binding.setNumber) {
        throw new LiveHighlightControlError('stale_context', 'Command set is stale.');
    }
    const nowEpochMs = validEpoch(nowEpochMsInput, 'nowEpochMs');
    if (command.expiresAtEpochMs <= nowEpochMs ||
        command.issuedAtEpochMs > nowEpochMs + 2_000 ||
        command.expiresAtEpochMs <= command.issuedAtEpochMs ||
        command.expiresAtEpochMs - command.issuedAtEpochMs > 15_000) {
        throw new LiveHighlightControlError('stale_command', 'Command is stale or outside its TTL.');
    }
}
function assertResultRoute(result, command) {
    if (result.requestId !== command.requestId ||
        result.matchId !== command.matchId ||
        result.broadcastSessionId !== command.broadcastSessionId ||
        result.broadcasterId !== command.broadcasterId) {
        throw new LiveHighlightControlError('invalid_gateway_response', 'Replay receipt does not match the canonical command.');
    }
    validEpoch(result.occurredAtEpochMs, 'receipt occurredAtEpochMs');
}
function normalizeReading(input) {
    const bufferedDurationMs = safeInteger(input.bufferedDurationMs, 0, 120_000, 'bufferedDurationMs');
    const continuityEpoch = safeInteger(input.continuityEpoch, 0, 1_000_000, 'continuityEpoch');
    let phase = input.phase;
    if (phase === 'ready' && (!input.continuous || bufferedDurationMs < LIVE_HIGHLIGHT_READY_BUFFER_MS)) {
        phase = 'buffering';
    }
    return Object.freeze({
        phase,
        bufferedDurationMs,
        targetDurationMs: LIVE_HIGHLIGHT_READY_BUFFER_MS,
        continuityEpoch,
        continuous: input.continuous,
        failureCode: input.failureCode === null ? null : failureCode(input.failureCode),
    });
}
function classifyReplayError(error) {
    if (error instanceof BroadcasterReplayPortError) {
        const code = failureCode(error.failureCode);
        return Object.freeze({
            failureCode: code,
            retryable: !isPermanentReplayFailure(code) && error.retryable,
        });
    }
    if (error instanceof LiveHighlightControlError) {
        return Object.freeze({ failureCode: error.code, retryable: false });
    }
    return Object.freeze({ failureCode: 'replay_save_failed', retryable: true });
}
function failureCodeFromError(error, fallback) {
    if (error instanceof BroadcasterReplayPortError)
        return failureCode(error.failureCode);
    if (error instanceof LiveHighlightControlError)
        return error.code;
    return fallback;
}
function emptyBuffer() {
    return Object.freeze({
        phase: 'inactive',
        bufferedDurationMs: 0,
        targetDurationMs: LIVE_HIGHLIGHT_READY_BUFFER_MS,
        continuityEpoch: 0,
        continuous: false,
        failureCode: null,
    });
}
function freezeBroadcasterState(input) {
    return Object.freeze({ ...input, requests: Object.freeze([...input.requests]) });
}
function validateBinding(input) {
    return Object.freeze({
        matchId: identifier(input.matchId, 'matchId'),
        broadcastSessionId: identifier(input.broadcastSessionId, 'broadcastSessionId'),
        broadcasterId: identifier(input.broadcasterId, 'broadcasterId'),
        setNumber: safeInteger(input.setNumber, 1, 99, 'setNumber'),
        pairedAtEpochMs: validEpoch(input.pairedAtEpochMs, 'pairedAtEpochMs'),
    });
}
function sameIdentity(left, right) {
    return (left.matchId === right.matchId &&
        left.broadcastSessionId === right.broadcastSessionId &&
        left.broadcasterId === right.broadcasterId);
}
function identifier(value, name) {
    if (typeof value !== 'string' || !/^[A-Za-z0-9._:-]{8,256}$/.test(value)) {
        throw new LiveHighlightControlError('invalid_input', `${name} is invalid.`);
    }
    return value;
}
function validEpoch(value, name) {
    return safeInteger(value, 1, Number.MAX_SAFE_INTEGER, name);
}
function safeInteger(value, min, max, name) {
    if (!Number.isSafeInteger(value) || value < min || value > max) {
        throw new LiveHighlightControlError('invalid_input', `${name} is invalid.`);
    }
    return value;
}
function failureCode(value) {
    if (typeof value !== 'string' || !/^[a-z0-9_:-]{2,80}$/.test(value))
        return 'unknown';
    return value;
}
//# sourceMappingURL=broadcaster-controller.js.map