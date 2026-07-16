import { BroadcasterLiveHighlightController } from './broadcaster-controller.js';
import { BroadcasterReplayPortError } from './types.js';
import { detectWebCodecsReplayCapabilities } from './webcodecs-capabilities.js';
import {
  SharedWebCodecsCapture,
  SharedWebCodecsReplayExporter,
} from './webcodecs-capture.js';
import { EncodedMediaRing } from './webcodecs-ring.js';
import {
  BrowserReplayRetentionError,
  IndexedDbReplaySink,
} from './indexeddb-sink.js';
import { pendingReceiptFromStored, storedReceiptMatches } from './receipt-integrity.js';
import {
  BUFFER_RESTART_BACKOFF_MS,
  bufferRecoveryDecision,
  runWithConcurrency,
} from './runtime-scheduling.js';

const POLL_MS = 1_200;
const BUFFER_PUBLISH_MS = 3_000;
const RECEIPT_GRACE_MS = 120_000;
const COMMAND_SAVE_CONCURRENCY = 2;

export async function flushFanViewHighlightReceiptOutbox(input) {
  if (!input?.workerUrl || !input.streamId) return Object.freeze({ attempted: 0, delivered: 0 });
  const credential = safeSessionGet(`courtsideview.highlightCredential.${input.streamId}`);
  if (!credential) return Object.freeze({ attempted: 0, delivered: 0 });
  const sink = new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
  const now = Date.now();
  const pending = (await sink.listAll()).filter((stored) => (
    stored.deliveryReceipt
    && stored.deliveryReceipt.controlStreamId === input.streamId
    && stored.durationMs !== null
    && now <= stored.deliveryReceipt.expiresAtEpochMs + RECEIPT_GRACE_MS
  ));
  let delivered = 0;
  for (const stored of pending) {
    const receipt = pendingReceiptFromStored(stored);
    if (!receipt) continue;
    const current = await sink.get(stored.storageKey);
    if (!storedReceiptMatches(receipt, current, input.streamId)) continue;
    const response = await fetch(
      `${input.workerUrl}/highlight/${encodeURIComponent(input.streamId)}/results/${encodeURIComponent(stored.requestId)}`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${credential}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          bindingDigest: receipt.bindingDigest,
          result: {
            status: 'saved',
            clipId: receipt.result.clipId,
            bytes: receipt.result.bytes,
            durationMs: receipt.result.durationMs,
            mimeType: receipt.result.mimeType,
          },
        }),
        cache: 'no-store',
      },
    ).catch(() => null);
    if (response?.ok) delivered += 1;
  }
  return Object.freeze({ attempted: pending.length, delivered });
}

function localHighlightSummary(stored) {
  return Object.freeze({
    storageKey: stored.storageKey,
    filename: stored.suggestedFilename,
    bytes: stored.bytes,
    createdAtEpochMs: stored.createdAtEpochMs,
  });
}

export async function listFanViewSavedHighlights() {
  const sink = new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
  return Object.freeze((await sink.listAll())
    .filter((stored) => stored.syncState === 'local_only')
    .map(localHighlightSummary)
    .sort((left, right) => right.createdAtEpochMs - left.createdAtEpochMs));
}

export async function readFanViewSavedHighlight(storageKey) {
  const sink = new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
  const stored = await sink.get(storageKey);
  if (!stored || stored.syncState !== 'local_only') {
    throw new Error('Saved highlight is unavailable or is not protected local media.');
  }
  return Object.freeze({
    ...localHighlightSummary(stored),
    data: stored.data,
    mimeType: stored.mimeType,
  });
}

export async function deleteFanViewSavedHighlight(storageKey) {
  const sink = new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
  const stored = await sink.get(storageKey);
  if (!stored || stored.syncState !== 'local_only') {
    throw new Error('Saved highlight is unavailable or is not protected local media.');
  }
  await sink.delete(storageKey);
  forgetReceiptStorageKey(storageKey);
}

function forgetReceiptStorageKey(storageKey) {
  try {
    const prefix = 'courtsideview.highlightReceiptOutbox.';
    const keys = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key?.startsWith(prefix)) keys.push(key);
    }
    for (const key of keys) {
      const parsed = safeLocalJson(key);
      if (!Array.isArray(parsed)) continue;
      safeLocalSet(key, JSON.stringify(parsed.filter((receipt) => receipt?.storageKey !== storageKey)));
    }
  } catch {
    // IndexedDB is authoritative; stale convenience outbox data cannot recreate deleted media.
  }
}

export async function createFanViewHighlightRuntime(input) {
  assertRuntimeInput(input);
  const storageKey = `courtsideview.highlightCredential.${input.streamId}`;
  const resumeCredential = safeSessionGet(storageKey);
  const pairResponse = await fetch(
    `${input.workerUrl}/highlight/${encodeURIComponent(input.streamId)}/pair`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${input.broadcastToken}`,
        'x-broadcast-token': input.broadcastToken,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ resumeCredential: resumeCredential || null }),
      cache: 'no-store',
    },
  );
  const pair = await readJson(pairResponse);
  if (!pairResponse.ok || pair.ok !== true || !pair.binding || !pair.broadcasterCredential) {
    throw new Error(`FanView highlight pairing failed (${pair.reason || pairResponse.status}).`);
  }
  safeSessionSet(storageKey, pair.broadcasterCredential);

  const port = new FanViewWebCodecsReplayPort({
    workerUrl: input.workerUrl,
    streamId: input.streamId,
    credential: pair.broadcasterCredential,
    binding: pair.binding,
    stream: input.stream,
    onClip: input.onClip,
  });
  const controller = new BroadcasterLiveHighlightController({
    clock: { nowEpochMs: Date.now },
    replay: port,
    crypto: globalThis.crypto,
  });
  let stopped = false;
  let pollTimer = null;
  let lastBufferPublish = 0;
  let tickInFlight = false;
  let bufferRestartAttempts = 0;
  let nextBufferRestartAtEpochMs = 0;

  controller.beginPairing();
  controller.pair(pair.binding);
  input.onStatus?.({ kind: 'buffering', message: 'Highlight replay is warming up.' });
  const started = await controller.startBuffering();
  if (started.buffer.phase === 'failed') {
    throw new Error(`Highlight replay unavailable (${started.buffer.failureCode || 'unsupported'}).`);
  }

  const publishBuffer = async (state) => {
    const binding = controller.snapshot.binding;
    if (!binding) return;
    await port.publishBuffer({ ...state.buffer, setNumber: binding.setNumber });
  };

  const recoverBuffer = async (state) => {
    if (state.buffer.phase === 'ready') {
      bufferRestartAttempts = 0;
      nextBufferRestartAtEpochMs = 0;
      return state;
    }
    if (state.buffer.phase !== 'failed' && state.buffer.phase !== 'interrupted') return state;
    const failureCode = state.buffer.failureCode || 'buffer_status_failed';
    const recovery = bufferRecoveryDecision(failureCode, bufferRestartAttempts);
    input.onStatus?.({
      kind: 'failed',
      message: recovery.message,
    });
    if (
      !recovery.canRestart
      || Date.now() < nextBufferRestartAtEpochMs
    ) return state;

    const delayMs = BUFFER_RESTART_BACKOFF_MS[bufferRestartAttempts];
    bufferRestartAttempts += 1;
    nextBufferRestartAtEpochMs = Date.now() + delayMs;
    await port.restartCapture();
    input.onStatus?.({ kind: 'buffering', message: 'Highlight replay is warming up again.' });
    const restarted = await controller.startBuffering();
    await publishBuffer(restarted).catch(() => {});
    return restarted;
  };

  const tick = async () => {
    if (stopped || tickInFlight) return;
    tickInFlight = true;
    try {
      let state = await controller.refreshBuffer();
      state = await recoverBuffer(state);
      const now = Date.now();
      if (now - lastBufferPublish >= BUFFER_PUBLISH_MS) {
        lastBufferPublish = now;
        await publishBuffer(state);
      }
      await port.flushPendingReceipts();
      const commands = await port.pollCommands();
      port.anchorCommands(commands);
      await runWithConcurrency(commands, COMMAND_SAVE_CONCURRENCY, async (command) => {
        try {
          const result = await controller.receiveCommand(command);
          if (result.phase === 'saved') {
            input.onStatus?.({ kind: 'saved', message: 'Highlight saved on this camera.' });
          } else if (result.phase === 'failed') {
            input.onStatus?.({
              kind: result.failureCode === 'protected_budget_exhausted' ? 'storage_full' : 'failed',
              message: result.failureCode === 'protected_budget_exhausted'
                ? 'Highlight storage is full. Keep protected clips, then clear space before saving more.'
                : 'Highlight could not be saved on this camera.',
            });
          }
        } catch {
          input.onStatus?.({
            kind: 'failed',
            message: 'A highlight request could not be completed. Camera replay is still active.',
          });
        }
      });
      if (state.buffer.phase === 'ready') {
        input.onStatus?.({ kind: 'ready', message: 'Highlight replay ready.' });
      }
    } catch (error) {
      if (!stopped) {
        input.onStatus?.({ kind: 'offline', message: 'Highlight control is reconnecting.' });
      }
    } finally {
      tickInFlight = false;
      if (!stopped) pollTimer = setTimeout(() => void tick(), POLL_MS);
    }
  };
  await publishBuffer(started).catch(() => {});
  pollTimer = setTimeout(() => void tick(), POLL_MS);

  return Object.freeze({
    updateSet(setNumber) {
      if (stopped || !Number.isSafeInteger(setNumber) || setNumber < 1) return;
      controller.updateSet(setNumber);
      void controller.refreshBuffer().then(publishBuffer).catch(() => {});
    },
    confirmDownloadedHighlight(storageKey) {
      return port.confirmDownloadedHighlight(storageKey);
    },
    listProtectedHighlights() {
      return port.listProtectedHighlights();
    },
    deleteSavedHighlight(storageKey) {
      return port.deleteSavedHighlight(storageKey);
    },
    async stop() {
      if (stopped) return;
      stopped = true;
      if (pollTimer) clearTimeout(pollTimer);
      await controller.unpair().catch(() => {});
    },
  });
}

export class FanViewWebCodecsReplayPort {
  constructor(input) {
    this.workerUrl = input.workerUrl;
    this.streamId = input.streamId;
    this.credential = input.credential;
    this.binding = input.binding;
    this.stream = input.stream;
    this.onClip = input.onClip;
    this.ring = new EncodedMediaRing({ retentionMs: 42_000, maxBytes: 96 * 1024 * 1024 });
    this.capture = new SharedWebCodecsCapture(this.ring);
    this.exporter = new SharedWebCodecsReplayExporter(this.ring);
    this.sink = input.sink ?? new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
    this.fetchImpl = input.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.epoch = null;
    this.anchorByRequest = new Map();
    this.pendingReceipts = new Map();
    this.presentedRequests = new Set();
    this.didHydrateReceiptsFromStore = false;
    this.receiptGraceTimer = null;
    this.receiptOutboxKey = `courtsideview.highlightReceiptOutbox.${input.streamId}`;
    this.hydrateReceiptOutbox();
  }

  async start(_binding, options) {
    if (options.signal.aborted) throw new BroadcasterReplayPortError('capture_stopped', false);
    const videoTrack = this.stream.getVideoTracks()[0];
    if (!videoTrack) throw new BroadcasterReplayPortError('no_media', false, 'Camera video is unavailable.');
    const video = videoTrack.getSettings();
    const audioTrack = this.stream.getAudioTracks()[0] || null;
    const audio = audioTrack?.getSettings?.() || {};
    const width = even(video.width || 1280);
    const height = even(video.height || 720);
    const report = await detectWebCodecsReplayCapabilities({
      width,
      height,
      frameRate: bounded(video.frameRate || 30, 1, 60),
      requestedAudio: Boolean(audioTrack),
      sampleRate: bounded(audio.sampleRate || 48_000, 8_000, 96_000),
      numberOfChannels: bounded(audio.channelCount || 1, 1, 2),
    });
    if (report.status !== 'ready' || !report.selectedProfile) {
      throw new BroadcasterReplayPortError(
        'buffer_start_failed',
        false,
        report.limitations[0] || 'This browser cannot create validated replay clips.',
      );
    }
    this.epoch = await this.capture.start(this.stream, report.selectedProfile, { signal: options.signal });
    return this.readStatus(options);
  }

  async readStatus(options) {
    if (options.signal.aborted) throw new BroadcasterReplayPortError('capture_stopped', false);
    if (!this.epoch || this.capture.activeEpochId !== this.epoch.id) {
      throw new BroadcasterReplayPortError('capture_interrupted', true);
    }
    const health = this.capture.health;
    if (health.status === 'failed') {
      throw new BroadcasterReplayPortError('capture_interrupted', true, 'Camera capture was interrupted.');
    }
    const nowMonotonicMs = performance.now();
    const coverage = this.ring.coverage(this.epoch.id);
    if (coverage.endedMonotonicMs !== null) {
      throw new BroadcasterReplayPortError('capture_interrupted', true, 'Camera capture ended.');
    }
    if (
      coverage.newestVideoMonotonicMs === null
      && nowMonotonicMs - this.epoch.startedMonotonicMs > 5_000
    ) {
      throw new BroadcasterReplayPortError('capture_interrupted', true, 'Camera frames did not reach the replay buffer.');
    }
    if (
      coverage.newestVideoMonotonicMs !== null
      && nowMonotonicMs - coverage.newestVideoMonotonicMs > 3_000
    ) {
      throw new BroadcasterReplayPortError('capture_interrupted', true, 'Camera replay coverage stopped advancing.');
    }
    const bufferedDurationMs = Math.max(
      0,
      Math.min(42_000, Math.floor(
        (coverage.newestVideoMonotonicMs ?? this.epoch.startedMonotonicMs)
        - this.epoch.startedMonotonicMs,
      )),
    );
    return Object.freeze({
      phase: bufferedDurationMs >= 30_000 ? 'ready' : 'buffering',
      bufferedDurationMs,
      continuityEpoch: continuityNumber(this.epoch.id),
      continuous: true,
      failureCode: null,
    });
  }

  async authorize(command, options) {
    if (options.signal.aborted) throw new BroadcasterReplayPortError('authorization_expired', false);
    if (!this.pendingReceipts.has(command.requestId) && !this.anchorByRequest.has(command.requestId)) {
      this.anchorByRequest.set(command.requestId, performance.now());
    }
    const response = await this.authorizedFetch(
      `/authorize/${encodeURIComponent(command.requestId)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ command }),
        signal: options.signal,
      },
    );
    const payload = await readJson(response);
    if (!response.ok || payload.ok !== true || !payload.authorityHandle) {
      throw new BroadcasterReplayPortError(payload.reason || 'invalid_authorization', false);
    }
    return Object.freeze({
      command,
      authoritativeBindingDigest: payload.authoritativeBindingDigest,
      authorityHandle: payload.authorityHandle,
    });
  }

  anchorCommands(commands) {
    const receivedAtMonotonicMs = performance.now();
    for (const command of commands) {
      if (
        !this.pendingReceipts.has(command.requestId)
        && !this.anchorByRequest.has(command.requestId)
      ) this.anchorByRequest.set(command.requestId, receivedAtMonotonicMs);
    }
  }

  async save(authorized, options) {
    const command = authorized.command;
    const cameraAttemptId = `attempt-${crypto.randomUUID()}`;
    const occurredAtEpochMs = Date.now();
    const anchorMonotonicMs = this.anchorByRequest.get(command.requestId);
    let durableReceipt = this.pendingReceipts.get(command.requestId) || null;
    if (durableReceipt && durableReceipt.bindingDigest !== command.authorization.bindingDigest) {
      this.forgetReceipt(command.requestId);
      durableReceipt = null;
    }
    let preserveAnchorForRetry = false;
    try {
      if (!durableReceipt) {
        const recovered = (await this.sink.listByMatch(command.matchId)).find((clip) => (
          clip.requestId === command.requestId
          && clip.identity.broadcastSessionId === command.broadcastSessionId
          && clip.identity.broadcasterId === command.broadcasterId
          && clip.durationMs !== null
          && clip.deliveryReceipt?.bindingDigest === command.authorization.bindingDigest
        ));
        if (recovered) {
          durableReceipt = this.savedReceiptFromStored(command, recovered);
          this.rememberReceipt(durableReceipt);
        }
      }
      if (durableReceipt) {
        const stored = await this.sink.get(durableReceipt.storageKey);
        if (
          !stored
          || stored.requestId !== command.requestId
          || stored.identity.matchId !== command.matchId
          || stored.identity.broadcastSessionId !== command.broadcastSessionId
          || stored.identity.broadcasterId !== command.broadcasterId
          || stored.bytes !== durableReceipt.result.bytes
          || stored.mimeType !== durableReceipt.result.mimeType
        ) {
          this.forgetReceipt(command.requestId);
          durableReceipt = null;
          throw new BroadcasterReplayPortError('save_failed', true, 'Previously saved replay media is unavailable.');
        }
        this.presentStoredClip(durableReceipt, stored);
        await this.deliverReceipt(durableReceipt, options.signal).catch(() => {});
        return this.savedControllerResult(command, durableReceipt.result.clipId, occurredAtEpochMs);
      }
      if (!this.epoch || !Number.isFinite(anchorMonotonicMs)) {
        throw new BroadcasterReplayPortError('capture_interrupted', false);
      }
      const replay = await this.exporter.exportLookback({
        epochId: this.epoch.id,
        anchorMonotonicMs,
        preRollMs: command.requestedWindow.preRollMs,
        postRollMs: command.requestedWindow.postRollMs,
        signal: options.signal,
        coverageTimeoutMs: 12_000,
      });
      if (replay.playability !== 'validated') {
        throw new BroadcasterReplayPortError('unvalidated_media', false);
      }
      const extension = replay.mimeType.includes('webm') ? 'webm' : 'mp4';
      const clipId = `highlight-${command.requestId}`;
      const filename = `courtsideview-set-${command.context.setNumber}-${command.requestId}.${extension}`;
      const durationMs = Math.max(1, Math.round(replay.actualEndMonotonicMs - replay.actualStartMonotonicMs));
      const saved = await this.sink.save({
        suggestedFilename: filename,
        data: replay.data,
        mimeType: replay.mimeType,
        identity: {
          matchId: command.matchId,
          broadcastSessionId: command.broadcastSessionId,
          broadcasterId: command.broadcasterId,
          setNumber: command.context.setNumber,
        },
        requestId: command.requestId,
        epochId: this.epoch.id,
        durationMs,
        deliveryReceipt: {
          controlStreamId: this.streamId,
          bindingDigest: command.authorization.bindingDigest,
          expiresAtEpochMs: command.expiresAtEpochMs,
          clipId,
        },
        retention: { syncState: 'local_only', pinned: false, recruiting: false },
      });
      durableReceipt = Object.freeze({
        controlStreamId: this.streamId,
        requestId: command.requestId,
        bindingDigest: command.authorization.bindingDigest,
        expiresAtEpochMs: command.expiresAtEpochMs,
        storageKey: saved.storageKey,
        filename,
        result: Object.freeze({
          status: 'saved',
          clipId,
          bytes: replay.data.size,
          durationMs,
          mimeType: replay.mimeType,
        }),
      });
      this.rememberReceipt(durableReceipt);
      this.presentStoredClip(durableReceipt, { data: replay.data });
      await this.deliverReceipt(durableReceipt, options.signal).catch(() => {});
      this.anchorByRequest.delete(command.requestId);
      return this.savedControllerResult(command, clipId, occurredAtEpochMs);
    } catch (error) {
      if (durableReceipt) {
        this.anchorByRequest.delete(command.requestId);
        return this.savedControllerResult(command, durableReceipt.result.clipId, occurredAtEpochMs);
      }
      const failureCode = replayFailureCode(error);
      const retryable = ['capture_interrupted', 'mux_failed', 'save_failed', 'replay_save_failed'].includes(failureCode);
      preserveAnchorForRetry = retryable;
      await this.submitResult({
        requestId: command.requestId,
        bindingDigest: command.authorization.bindingDigest,
        result: { status: 'failed', failureCode, retryable, cameraAttemptId },
      }, options.signal).catch(() => {});
      return Object.freeze({
        status: 'failed',
        requestId: command.requestId,
        matchId: command.matchId,
        broadcastSessionId: command.broadcastSessionId,
        broadcasterId: command.broadcasterId,
        occurredAtEpochMs,
        failureCode,
      });
    } finally {
      if (!preserveAnchorForRetry) this.anchorByRequest.delete(command.requestId);
    }
  }

  async stop() {
    await this.flushPendingReceipts().catch(() => {});
    this.scheduleReceiptGraceFlush();
    await this.capture.stop('fanview_highlight_stopped').catch(() => {});
    this.epoch = null;
    this.anchorByRequest.clear();
  }

  async restartCapture() {
    await this.capture.stop('fanview_highlight_restarting').catch(() => {});
    this.epoch = null;
    this.anchorByRequest.clear();
  }

  async confirmDownloadedHighlight(storageKey) {
    const stored = await this.sink.get(storageKey);
    if (
      !stored
      || stored.identity.matchId !== this.binding.matchId
      || stored.identity.broadcastSessionId !== this.binding.broadcastSessionId
      || stored.identity.broadcasterId !== this.binding.broadcasterId
    ) {
      throw new Error('Saved highlight does not belong to this FanView camera session.');
    }
    await this.sink.updateRetention(storageKey, {
      syncState: 'synced',
      lastAccessedAtEpochMs: Date.now(),
    });
  }

  async listProtectedHighlights() {
    // Retention budget is origin-wide, so recovery must also be origin-wide.
    // Return only human-safe file metadata; never expose match/session IDs.
    const clips = await this.sink.listAll();
    return Object.freeze(clips
      .filter((stored) => stored.syncState === 'local_only')
      .map(localHighlightSummary)
      .sort((left, right) => left.createdAtEpochMs - right.createdAtEpochMs));
  }

  async deleteSavedHighlight(storageKey) {
    const stored = await this.sink.get(storageKey);
    if (!stored || stored.syncState !== 'local_only') {
      throw new Error('Saved highlight is unavailable or is not protected local media.');
    }
    await this.sink.delete(storageKey);
    this.forgetReceipt(stored.requestId);
  }

  async pollCommands() {
    const response = await this.authorizedFetch('/commands', { method: 'GET', cache: 'no-store' });
    const payload = await readJson(response);
    if (!response.ok || payload.ok !== true || !Array.isArray(payload.commands)) {
      throw new Error(`Highlight poll failed (${payload.reason || response.status}).`);
    }
    return payload.commands;
  }

  async publishBuffer(reading) {
    const response = await this.authorizedFetch('/buffer', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(reading),
    });
    if (!response.ok) throw new Error('Highlight buffer status could not be published.');
  }

  async flushPendingReceipts() {
    await this.hydratePendingReceiptsFromStore();
    const now = Date.now();
    for (const receipt of [...this.pendingReceipts.values()]) {
      if (now > receipt.expiresAtEpochMs + RECEIPT_GRACE_MS) {
        this.forgetReceipt(receipt.requestId);
        continue;
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5_000);
      try {
        await this.deliverReceipt(receipt, controller.signal);
      } catch {
        // Keep the durable receipt for the next bounded control-plane retry.
      } finally {
        clearTimeout(timeout);
      }
    }
  }

  async deliverReceipt(receipt, signal) {
    const stored = await this.sink.get(receipt.storageKey);
    if (!storedReceiptMatches(receipt, stored, this.streamId)) {
      this.forgetReceipt(receipt.requestId);
      return false;
    }
    await this.submitResult(receipt, signal);
    this.forgetReceipt(receipt.requestId);
    return true;
  }

  async submitResult(receipt, signal) {
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await this.authorizedFetch(
          `/results/${encodeURIComponent(receipt.requestId)}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              bindingDigest: receipt.bindingDigest,
              result: receipt.result,
            }),
            signal,
          },
        );
        if (response.ok) return;
        const payload = await readJson(response);
        throw new Error(payload.reason || `receipt_${response.status}`);
      } catch (error) {
        lastError = error;
        if (signal.aborted) break;
        await delay(250 * (attempt + 1));
      }
    }
    throw lastError || new Error('Highlight receipt could not be submitted.');
  }

  savedReceiptFromStored(command, stored) {
    if (!stored.deliveryReceipt) {
      throw new BroadcasterReplayPortError('save_failed', false, 'Saved replay receipt metadata is unavailable.');
    }
    return Object.freeze({
      controlStreamId: stored.deliveryReceipt.controlStreamId,
      requestId: command.requestId,
      bindingDigest: stored.deliveryReceipt.bindingDigest,
      expiresAtEpochMs: stored.deliveryReceipt.expiresAtEpochMs,
      storageKey: stored.storageKey,
      filename: stored.suggestedFilename,
      result: Object.freeze({
        status: 'saved',
        clipId: stored.deliveryReceipt.clipId,
        bytes: stored.bytes,
        durationMs: stored.durationMs,
        mimeType: stored.mimeType,
      }),
    });
  }

  savedControllerResult(command, clipId, occurredAtEpochMs) {
    return Object.freeze({
      status: 'saved',
      requestId: command.requestId,
      matchId: command.matchId,
      broadcastSessionId: command.broadcastSessionId,
      broadcasterId: command.broadcasterId,
      occurredAtEpochMs,
      clipId,
    });
  }

  presentStoredClip(receipt, stored) {
    if (this.presentedRequests.has(receipt.requestId)) return;
    this.presentedRequests.add(receipt.requestId);
    try {
      this.onClip?.(Object.freeze({
        clipId: receipt.result.clipId,
        filename: receipt.filename,
        data: stored.data,
        mimeType: receipt.result.mimeType,
        storageKey: receipt.storageKey,
      }));
    } catch {
      // A download prompt failure must never downgrade an already durable clip.
    }
  }

  rememberReceipt(receipt) {
    this.pendingReceipts.set(receipt.requestId, receipt);
    this.persistReceiptOutbox();
  }

  forgetReceipt(requestId) {
    this.pendingReceipts.delete(requestId);
    this.persistReceiptOutbox();
    if (this.pendingReceipts.size === 0 && this.receiptGraceTimer) {
      clearTimeout(this.receiptGraceTimer);
      this.receiptGraceTimer = null;
    }
  }

  scheduleReceiptGraceFlush() {
    if (this.receiptGraceTimer || this.pendingReceipts.size === 0) return;
    const latestDeadline = Math.max(
      ...[...this.pendingReceipts.values()]
        .map((receipt) => receipt.expiresAtEpochMs + RECEIPT_GRACE_MS),
    );
    const run = async () => {
      this.receiptGraceTimer = null;
      await this.flushPendingReceipts().catch(() => {});
      if (this.pendingReceipts.size > 0 && Date.now() <= latestDeadline) {
        this.receiptGraceTimer = setTimeout(() => void run(), 5_000);
      }
    };
    this.receiptGraceTimer = setTimeout(() => void run(), 1_000);
  }

  hydrateReceiptOutbox() {
    const parsed = safeLocalJson(this.receiptOutboxKey);
    if (!Array.isArray(parsed)) return;
    for (const receipt of parsed) {
      if (validPendingReceipt(receipt)) this.pendingReceipts.set(receipt.requestId, receipt);
    }
  }

  async hydratePendingReceiptsFromStore() {
    if (this.didHydrateReceiptsFromStore) return;
    const now = Date.now();
    const storedClips = await this.sink.listAll();
    for (const stored of storedClips) {
      const receipt = stored.deliveryReceipt;
      if (
        !receipt
        || receipt.controlStreamId !== this.streamId
        || stored.durationMs === null
        || now > receipt.expiresAtEpochMs + RECEIPT_GRACE_MS
      ) continue;
      this.rememberReceipt(Object.freeze({
        controlStreamId: receipt.controlStreamId,
        requestId: stored.requestId,
        bindingDigest: receipt.bindingDigest,
        expiresAtEpochMs: receipt.expiresAtEpochMs,
        storageKey: stored.storageKey,
        filename: stored.suggestedFilename,
        result: Object.freeze({
          status: 'saved',
          clipId: receipt.clipId,
          bytes: stored.bytes,
          durationMs: stored.durationMs,
          mimeType: stored.mimeType,
        }),
      }));
    }
    this.didHydrateReceiptsFromStore = true;
  }

  persistReceiptOutbox() {
    safeLocalSet(this.receiptOutboxKey, JSON.stringify([...this.pendingReceipts.values()]));
  }

  authorizedFetch(path, init) {
    return this.fetchImpl(
      `${this.workerUrl}/highlight/${encodeURIComponent(this.streamId)}${path}`,
      {
        ...init,
        headers: {
          ...(init.headers || {}),
          authorization: `Bearer ${this.credential}`,
        },
      },
    );
  }
}

function assertRuntimeInput(input) {
  if (!input?.workerUrl || !input.streamId || !input.broadcastToken || !input.stream) {
    throw new TypeError('FanView highlight runtime requires worker, stream, token, and media.');
  }
  if (!globalThis.crypto?.subtle) throw new Error('Web Crypto is required for FanView highlights.');
}

async function readJson(response) {
  const value = await response.json().catch(() => null);
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function replayFailureCode(error) {
  if (error instanceof BrowserReplayRetentionError) return error.code;
  if (error instanceof BroadcasterReplayPortError) return error.failureCode;
  if (typeof error?.code === 'string' && /^[a-z][a-z0-9_]{2,63}$/.test(error.code)) {
    if (error.code === 'coverage_timeout' || error.code === 'postroll_pending') return 'capture_interrupted';
    return error.code;
  }
  return 'replay_save_failed';
}

function continuityNumber(epochId) {
  let hash = 0;
  for (let index = 0; index < epochId.length; index += 1) hash = (hash * 31 + epochId.charCodeAt(index)) >>> 0;
  return hash % 1_000_000;
}

function even(value) {
  const integer = Math.max(2, Math.floor(value));
  return integer % 2 === 0 ? integer : integer - 1;
}

function bounded(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, Number(value) || minimum));
}

function safeSessionGet(key) {
  try { return (sessionStorage.getItem(key) || '').trim(); } catch { return ''; }
}

function safeSessionSet(key, value) {
  try { sessionStorage.setItem(key, value); } catch { /* Memory still holds the scoped credential. */ }
}

function safeLocalJson(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function safeLocalSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* IndexedDB recovery remains authoritative. */ }
}

function validPendingReceipt(value) {
  return Boolean(
    value
    && typeof value === 'object'
    && typeof value.controlStreamId === 'string'
    && /^[A-Za-z0-9_-]{6,80}$/.test(value.controlStreamId)
    && /^[A-Za-z0-9._:-]{8,128}$/.test(value.requestId)
    && /^[0-9a-f]{64}$/.test(value.bindingDigest)
    && Number.isSafeInteger(value.expiresAtEpochMs)
    && typeof value.storageKey === 'string'
    && value.storageKey.startsWith('idb://courtsideview-fanview-replay/')
    && typeof value.filename === 'string'
    && value.filename.length > 0
    && value.filename.length <= 255
    && value.result?.status === 'saved'
    && typeof value.result.clipId === 'string'
    && Number.isSafeInteger(value.result.bytes)
    && value.result.bytes > 0
    && Number.isSafeInteger(value.result.durationMs)
    && value.result.durationMs > 0
    && value.result.durationMs <= 120_000
    && typeof value.result.mimeType === 'string'
    && value.result.mimeType.startsWith('video/')
  );
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
