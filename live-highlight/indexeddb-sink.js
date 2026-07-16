const DEFAULT_DATABASE_NAME = 'courtsideview-fanview-replay';
const DEFAULT_STORE_NAME = 'saved-clips';
const DEFAULT_DATABASE_VERSION = 1;
export const BROWSER_TOURNAMENT_RETENTION_POLICY = Object.freeze({
    maxBytes: 1024 * 1024 * 1024,
    maxClipCount: 96,
    maxAgeMs: 72 * 60 * 60 * 1_000,
});
export class BrowserReplayRetentionError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.name = 'BrowserReplayRetentionError';
    }
}
export class IndexedDbReplayClipStore {
    indexedDB;
    databaseName;
    storeName;
    databaseVersion;
    databasePromise = null;
    constructor(options = {}) {
        const indexedDB = options.indexedDB ?? globalThis.indexedDB;
        if (!indexedDB)
            throw new Error('IndexedDB is unavailable in this browser.');
        this.indexedDB = indexedDB;
        this.databaseName = options.databaseName ?? DEFAULT_DATABASE_NAME;
        this.storeName = options.storeName ?? DEFAULT_STORE_NAME;
        this.databaseVersion = options.databaseVersion ?? DEFAULT_DATABASE_VERSION;
        if (!this.databaseName.trim() || !this.storeName.trim()) {
            throw new Error('IndexedDB database and store names must be non-empty.');
        }
        if (!Number.isSafeInteger(this.databaseVersion) || this.databaseVersion <= 0) {
            throw new Error('IndexedDB databaseVersion must be a positive integer.');
        }
    }
    async put(record) {
        const database = await this.open();
        const transaction = database.transaction(this.storeName, 'readwrite');
        const complete = transactionToPromise(transaction);
        const request = transaction.objectStore(this.storeName).put(record);
        await Promise.all([requestToPromise(request), complete]);
    }
    async get(storageKey) {
        const database = await this.open();
        const transaction = database.transaction(this.storeName, 'readonly');
        const complete = transactionToPromise(transaction);
        const request = transaction.objectStore(this.storeName).get(storageKey);
        const [result] = await Promise.all([requestToPromise(request), complete]);
        return result ? normalizeStoredClip(result) : null;
    }
    async delete(storageKey) {
        const database = await this.open();
        const transaction = database.transaction(this.storeName, 'readwrite');
        const complete = transactionToPromise(transaction);
        const request = transaction.objectStore(this.storeName).delete(storageKey);
        await Promise.all([requestToPromise(request), complete]);
    }
    async listByMatch(matchId) {
        const database = await this.open();
        const transaction = database.transaction(this.storeName, 'readonly');
        const complete = transactionToPromise(transaction);
        const request = transaction.objectStore(this.storeName).index('matchId').getAll(matchId);
        const [result] = await Promise.all([requestToPromise(request), complete]);
        return Object.freeze([...result].map(normalizeStoredClip).sort((left, right) => left.createdAtEpochMs - right.createdAtEpochMs));
    }
    async listAll() {
        const database = await this.open();
        const transaction = database.transaction(this.storeName, 'readonly');
        const complete = transactionToPromise(transaction);
        const request = transaction.objectStore(this.storeName).index('createdAtEpochMs').getAll();
        const [result] = await Promise.all([requestToPromise(request), complete]);
        return Object.freeze([...result].map(normalizeStoredClip));
    }
    async updateRetention(storageKey, patch) {
        validateRetentionPatch(patch);
        const existing = await this.get(storageKey);
        if (!existing) {
            throw new Error('Replay clip was not found for retention update.');
        }
        await this.put(Object.freeze({ ...existing, ...patch }));
    }
    async close() {
        const promise = this.databasePromise;
        this.databasePromise = null;
        if (promise)
            (await promise).close();
    }
    open() {
        if (this.databasePromise)
            return this.databasePromise;
        this.databasePromise = new Promise((resolve, reject) => {
            const request = this.indexedDB.open(this.databaseName, this.databaseVersion);
            request.addEventListener('upgradeneeded', () => {
                const database = request.result;
                if (database.objectStoreNames.contains(this.storeName))
                    return;
                const store = database.createObjectStore(this.storeName, { keyPath: 'storageKey' });
                store.createIndex('matchId', 'matchId', { unique: false });
                store.createIndex('createdAtEpochMs', 'createdAtEpochMs', { unique: false });
            });
            request.addEventListener('success', () => {
                const database = request.result;
                database.addEventListener('versionchange', () => {
                    database.close();
                    this.databasePromise = null;
                });
                resolve(database);
            });
            request.addEventListener('error', () => {
                this.databasePromise = null;
                reject(request.error ?? new Error('Unable to open the replay IndexedDB database.'));
            });
            request.addEventListener('blocked', () => {
                this.databasePromise = null;
                reject(new Error('Replay IndexedDB upgrade is blocked by another open tab.'));
            });
        });
        return this.databasePromise;
    }
}
/**
 * Commits a validated replay Blob to browser-origin storage and reads its
 * metadata back before returning `durable: true`. Here, durable means the data
 * survived beyond the current JavaScript heap and transaction. The associated
 * record separately states whether the browser granted non-evictable origin
 * persistence; real device storage pressure behavior still requires testing.
 */
export class IndexedDbReplaySink {
    name = 'indexeddb-replay-sink';
    store;
    persistence;
    persistencePolicy;
    integrity;
    nowEpochMs;
    crypto;
    retentionPolicy;
    durabilityPromise = null;
    constructor(options = {}) {
        this.store = options.store ?? new IndexedDbReplayClipStore();
        this.persistence =
            options.persistence === undefined ? browserStoragePersistence() : options.persistence;
        this.persistencePolicy = options.persistencePolicy ?? 'request_if_available';
        this.integrity = options.integrity ?? 'size';
        this.nowEpochMs = options.nowEpochMs ?? Date.now;
        const crypto = options.crypto ?? globalThis.crypto;
        if (!crypto?.subtle)
            throw new Error('Web Crypto is required for opaque replay storage keys.');
        this.crypto = crypto;
        this.retentionPolicy = Object.freeze({
            ...(options.retentionPolicy ?? BROWSER_TOURNAMENT_RETENTION_POLICY),
        });
        validateRetentionPolicy(this.retentionPolicy);
    }
    async save(input) {
        validateSaveInput(input);
        const originDurability = await this.resolveDurability();
        const storageKey = await this.createStorageKey(input);
        const sha256 = this.integrity === 'sha256' ? await digestBlob(this.crypto.subtle, input.data) : null;
        const createdAtEpochMs = this.nowEpochMs();
        const record = Object.freeze({
            storageKey,
            data: input.data,
            bytes: input.data.size,
            sha256,
            mimeType: input.mimeType,
            suggestedFilename: input.suggestedFilename,
            identity: Object.freeze({ ...input.identity }),
            matchId: input.identity.matchId,
            requestId: input.requestId,
            epochId: input.epochId,
            durationMs: input.durationMs ?? null,
            deliveryReceipt: input.deliveryReceipt ? Object.freeze({ ...input.deliveryReceipt }) : null,
            createdAtEpochMs,
            lastAccessedAtEpochMs: createdAtEpochMs,
            syncState: input.retention?.syncState ?? 'local_only',
            pinned: input.retention?.pinned ?? false,
            recruiting: input.retention?.recruiting ?? false,
            originDurability,
        });
        await this.store.put(record);
        const committed = await this.store.get(storageKey);
        if (!committed)
            throw new Error('Replay storage commit could not be read back.');
        if (committed.bytes !== input.data.size ||
            committed.data.size !== input.data.size ||
            committed.mimeType !== input.mimeType ||
            committed.requestId !== input.requestId ||
            committed.epochId !== input.epochId ||
            committed.durationMs !== (input.durationMs ?? null) ||
            JSON.stringify(committed.deliveryReceipt) !== JSON.stringify(input.deliveryReceipt ?? null)) {
            throw new Error('Replay storage read-back metadata did not match the saved clip.');
        }
        if (sha256 && committed.sha256 !== sha256) {
            throw new Error('Replay storage read-back digest did not match the saved clip.');
        }
        const retention = await this.enforceRetention(storageKey, createdAtEpochMs);
        return Object.freeze({
            durable: true,
            storageKey,
            bytes: committed.bytes,
            ...(sha256 ? { sha256 } : {}),
            retention,
        });
    }
    get(storageKey) {
        return this.store.get(storageKey);
    }
    listByMatch(matchId) {
        return this.store.listByMatch(matchId);
    }
    listAll() {
        return this.store.listAll();
    }
    delete(storageKey) {
        return this.store.delete(storageKey);
    }
    async updateRetention(storageKey, patch) {
        await this.store.updateRetention(storageKey, patch);
        return this.enforceRetentionPlan(this.nowEpochMs());
    }
    getOriginDurability() {
        return this.resolveDurability();
    }
    async createStorageKey(input) {
        const binding = [
            input.identity.matchId,
            input.identity.broadcastSessionId,
            input.identity.broadcasterId,
            input.requestId,
            input.epochId,
        ].join('\u0000');
        const digest = await digestBytes(this.crypto.subtle, new TextEncoder().encode(binding));
        return `idb://${DEFAULT_DATABASE_NAME}/${digest}`;
    }
    async enforceRetention(justSavedStorageKey, nowEpochMs) {
        const plan = await this.enforceRetentionPlan(nowEpochMs);
        if (!plan.budgetSatisfied || plan.evictStorageKeys.includes(justSavedStorageKey)) {
            await this.store.delete(justSavedStorageKey).catch(() => { });
            throw new BrowserReplayRetentionError(plan.evictStorageKeys.includes(justSavedStorageKey)
                ? 'clip_exceeds_budget'
                : 'protected_budget_exhausted', plan.evictStorageKeys.includes(justSavedStorageKey)
                ? 'This highlight is larger than the browser saved-highlight budget.'
                : 'Protected local highlights fill the browser budget. Sync, pin selectively, or remove a clip before saving another.');
        }
        return Object.freeze({
            evictedStorageKeys: plan.evictStorageKeys,
            retainedBytes: plan.retainedBytes,
            retainedClipCount: plan.retainedClipCount,
        });
    }
    async enforceRetentionPlan(nowEpochMs) {
        const plan = planBrowserSavedHighlightRetention(await this.store.listAll(), this.retentionPolicy, nowEpochMs);
        for (const storageKey of plan.evictStorageKeys)
            await this.store.delete(storageKey);
        return plan;
    }
    resolveDurability() {
        if (this.durabilityPromise)
            return this.durabilityPromise;
        this.durabilityPromise = this.resolveDurabilityUncached().catch((error) => {
            this.durabilityPromise = null;
            throw error;
        });
        return this.durabilityPromise;
    }
    async resolveDurabilityUncached() {
        if (this.persistencePolicy === 'best_effort')
            return 'origin_best_effort';
        if (!this.persistence) {
            if (this.persistencePolicy === 'require_persistent') {
                throw new Error('Persistent browser storage is required but unavailable.');
            }
            return 'origin_best_effort';
        }
        try {
            if ((await this.persistence.persisted()) || (await this.persistence.persist())) {
                return 'origin_persistent';
            }
        }
        catch (error) {
            if (this.persistencePolicy === 'require_persistent')
                throw error;
            return 'origin_best_effort';
        }
        if (this.persistencePolicy === 'require_persistent') {
            throw new Error('The browser declined persistent storage for replay clips.');
        }
        return 'origin_best_effort';
    }
}
export function planBrowserSavedHighlightRetention(recordsInput, policy, nowEpochMs) {
    validateRetentionPolicy(policy);
    nonNegativeSafeInteger(nowEpochMs, 'nowEpochMs');
    const records = recordsInput.map(normalizeStoredClip);
    const ids = new Set();
    let inventoryBytes = 0;
    const candidates = [];
    const protectedStorageKeys = [];
    for (const record of records) {
        if (!record.storageKey || ids.has(record.storageKey)) {
            throw new TypeError('Stored replay inventory requires unique storage keys.');
        }
        ids.add(record.storageKey);
        nonNegativeSafeInteger(record.bytes, 'record.bytes');
        nonNegativeSafeInteger(record.lastAccessedAtEpochMs, 'record.lastAccessedAtEpochMs');
        inventoryBytes = safeSum(inventoryBytes, record.bytes);
        if (record.syncState !== 'synced' || record.pinned || record.recruiting) {
            protectedStorageKeys.push(record.storageKey);
        }
        else {
            candidates.push(record);
        }
    }
    candidates.sort((left, right) => left.lastAccessedAtEpochMs - right.lastAccessedAtEpochMs ||
        left.storageKey.localeCompare(right.storageKey));
    const evicted = new Set();
    let retainedBytes = inventoryBytes;
    let retainedClipCount = records.length;
    const cutoff = Math.max(0, nowEpochMs - policy.maxAgeMs);
    for (const candidate of candidates) {
        if (candidate.lastAccessedAtEpochMs >= cutoff)
            continue;
        evicted.add(candidate.storageKey);
        retainedBytes -= candidate.bytes;
        retainedClipCount -= 1;
    }
    for (const candidate of candidates) {
        if (retainedBytes <= policy.maxBytes && retainedClipCount <= policy.maxClipCount)
            break;
        if (evicted.has(candidate.storageKey))
            continue;
        evicted.add(candidate.storageKey);
        retainedBytes -= candidate.bytes;
        retainedClipCount -= 1;
    }
    return Object.freeze({
        inventoryBytes,
        inventoryClipCount: records.length,
        retainedBytes,
        retainedClipCount,
        evictStorageKeys: Object.freeze([...evicted]),
        protectedStorageKeys: Object.freeze(protectedStorageKeys),
        budgetSatisfied: retainedBytes <= policy.maxBytes && retainedClipCount <= policy.maxClipCount,
    });
}
function browserStoragePersistence() {
    const storage = globalThis.navigator?.storage;
    if (!storage?.persist || !storage.persisted)
        return null;
    return {
        persisted: () => storage.persisted(),
        persist: () => storage.persist(),
    };
}
function validateSaveInput(input) {
    if (!input.suggestedFilename.trim() || input.suggestedFilename.length > 255) {
        throw new Error('Replay filename must contain 1-255 characters.');
    }
    if (!input.requestId.trim() || !input.epochId.trim()) {
        throw new Error('Replay request and epoch IDs are required.');
    }
    if (!input.mimeType.startsWith('video/'))
        throw new Error('Replay MIME type must be video media.');
    if (input.data.size <= 0)
        throw new Error('Replay clip cannot be empty.');
    if (input.data.type && input.data.type !== input.mimeType) {
        throw new Error('Replay Blob type does not match the declared MIME type.');
    }
    if (input.durationMs !== undefined &&
        (!Number.isSafeInteger(input.durationMs) || input.durationMs <= 0 || input.durationMs > 120_000)) {
        throw new Error('Replay duration must be a positive safe integer no greater than 120 seconds.');
    }
    if (input.deliveryReceipt) {
        const receipt = input.deliveryReceipt;
        if (!/^[A-Za-z0-9_-]{6,80}$/.test(receipt.controlStreamId)) {
            throw new Error('Replay delivery control stream is invalid.');
        }
        if (!/^[0-9a-f]{64}$/.test(receipt.bindingDigest)) {
            throw new Error('Replay delivery binding digest is invalid.');
        }
        if (!Number.isSafeInteger(receipt.expiresAtEpochMs) || receipt.expiresAtEpochMs <= 0) {
            throw new Error('Replay delivery expiry is invalid.');
        }
        if (!/^[A-Za-z0-9._:-]{8,128}$/.test(receipt.clipId)) {
            throw new Error('Replay delivery clip ID is invalid.');
        }
        if (input.durationMs === undefined) {
            throw new Error('Replay delivery receipts require an exact duration.');
        }
    }
    if (input.retention)
        validateRetentionPatch(input.retention);
}
function normalizeStoredClip(record) {
    const candidate = record;
    const lastAccessedAtEpochMs = Number.isSafeInteger(candidate.lastAccessedAtEpochMs)
        ? candidate.lastAccessedAtEpochMs
        : record.createdAtEpochMs;
    const syncState = candidate.syncState === 'synced' ? 'synced' : 'local_only';
    return Object.freeze({
        ...record,
        durationMs: Number.isSafeInteger(candidate.durationMs) && candidate.durationMs > 0
            ? candidate.durationMs
            : null,
        deliveryReceipt: normalizeDeliveryReceipt(candidate.deliveryReceipt),
        lastAccessedAtEpochMs,
        syncState,
        pinned: candidate.pinned === true,
        recruiting: candidate.recruiting === true,
    });
}
function normalizeDeliveryReceipt(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    const receipt = value;
    if (typeof receipt.controlStreamId !== 'string' ||
        !/^[A-Za-z0-9_-]{6,80}$/.test(receipt.controlStreamId) ||
        typeof receipt.bindingDigest !== 'string' ||
        !/^[0-9a-f]{64}$/.test(receipt.bindingDigest) ||
        !Number.isSafeInteger(receipt.expiresAtEpochMs) ||
        typeof receipt.clipId !== 'string' ||
        !/^[A-Za-z0-9._:-]{8,128}$/.test(receipt.clipId))
        return null;
    return Object.freeze({
        controlStreamId: receipt.controlStreamId,
        bindingDigest: receipt.bindingDigest,
        expiresAtEpochMs: receipt.expiresAtEpochMs,
        clipId: receipt.clipId,
    });
}
function validateRetentionPatch(patch) {
    if (patch.lastAccessedAtEpochMs !== undefined &&
        (!Number.isSafeInteger(patch.lastAccessedAtEpochMs) || patch.lastAccessedAtEpochMs < 0)) {
        throw new TypeError('lastAccessedAtEpochMs must be a non-negative safe integer.');
    }
    if (patch.syncState !== undefined &&
        patch.syncState !== 'local_only' &&
        patch.syncState !== 'synced') {
        throw new TypeError('syncState must be local_only or synced.');
    }
    if (patch.pinned !== undefined && typeof patch.pinned !== 'boolean') {
        throw new TypeError('pinned must be boolean.');
    }
    if (patch.recruiting !== undefined && typeof patch.recruiting !== 'boolean') {
        throw new TypeError('recruiting must be boolean.');
    }
}
function validateRetentionPolicy(policy) {
    nonNegativeSafeInteger(policy.maxBytes, 'policy.maxBytes');
    nonNegativeSafeInteger(policy.maxClipCount, 'policy.maxClipCount');
    nonNegativeSafeInteger(policy.maxAgeMs, 'policy.maxAgeMs');
    if (policy.maxBytes === 0 || policy.maxClipCount === 0 || policy.maxAgeMs === 0) {
        throw new TypeError('Saved-highlight retention limits must be positive.');
    }
}
function nonNegativeSafeInteger(value, field) {
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new TypeError(`${field} must be a non-negative safe integer.`);
    }
}
function safeSum(left, right) {
    const result = left + right;
    if (!Number.isSafeInteger(result))
        throw new TypeError('Saved-highlight byte total overflowed.');
    return result;
}
async function digestBlob(subtle, blob) {
    // Optional because Web Crypto has no streaming digest API and therefore
    // duplicates clip memory. Size-only verification is the default.
    return digestBytes(subtle, new Uint8Array(await blob.arrayBuffer()));
}
async function digestBytes(subtle, bytes) {
    const digestInput = new Uint8Array(bytes.byteLength);
    digestInput.set(bytes);
    const digest = await subtle.digest('SHA-256', digestInput.buffer);
    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
function requestToPromise(request) {
    return new Promise((resolve, reject) => {
        request.addEventListener('success', () => resolve(request.result));
        request.addEventListener('error', () => reject(request.error ?? new Error('IndexedDB request failed.')));
    });
}
function transactionToPromise(transaction) {
    return new Promise((resolve, reject) => {
        transaction.addEventListener('complete', () => resolve());
        transaction.addEventListener('abort', () => reject(transaction.error ?? new Error('IndexedDB transaction was aborted.')));
        transaction.addEventListener('error', () => reject(transaction.error ?? new Error('IndexedDB transaction failed.')));
    });
}
//# sourceMappingURL=indexeddb-sink.js.map