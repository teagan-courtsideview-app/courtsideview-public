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

const POLL_MS = 1_200;
const BUFFER_PUBLISH_MS = 3_000;

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

  const tick = async () => {
    if (stopped || tickInFlight) return;
    tickInFlight = true;
    try {
      const state = await controller.refreshBuffer();
      const now = Date.now();
      if (now - lastBufferPublish >= BUFFER_PUBLISH_MS) {
        lastBufferPublish = now;
        await publishBuffer(state);
      }
      const commands = await port.pollCommands();
      for (const command of commands) {
        if (command.context?.setNumber !== controller.snapshot.binding?.setNumber) {
          controller.updateSet(command.context.setNumber);
        }
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
      }
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
    async stop() {
      if (stopped) return;
      stopped = true;
      if (pollTimer) clearTimeout(pollTimer);
      await controller.unpair().catch(() => {});
    },
  });
}

class FanViewWebCodecsReplayPort {
  constructor(input) {
    this.workerUrl = input.workerUrl;
    this.streamId = input.streamId;
    this.credential = input.credential;
    this.stream = input.stream;
    this.onClip = input.onClip;
    this.ring = new EncodedMediaRing({ retentionMs: 42_000, maxBytes: 96 * 1024 * 1024 });
    this.capture = new SharedWebCodecsCapture(this.ring);
    this.exporter = new SharedWebCodecsReplayExporter(this.ring);
    this.sink = new IndexedDbReplaySink({ persistencePolicy: 'request_if_available', integrity: 'sha256' });
    this.epoch = null;
    this.anchorByRequest = new Map();
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
    this.epoch = await this.capture.start(this.stream, report.selectedProfile);
    return this.readStatus(options);
  }

  async readStatus(options) {
    if (options.signal.aborted) throw new BroadcasterReplayPortError('capture_stopped', false);
    if (!this.epoch || this.capture.activeEpochId !== this.epoch.id) {
      throw new BroadcasterReplayPortError('capture_interrupted', true);
    }
    const bufferedDurationMs = Math.max(
      0,
      Math.min(42_000, Math.floor(performance.now() - this.epoch.startedMonotonicMs)),
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
    this.anchorByRequest.set(command.requestId, performance.now());
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

  async save(authorized, options) {
    const command = authorized.command;
    const occurredAtEpochMs = Date.now();
    const anchorMonotonicMs = this.anchorByRequest.get(command.requestId);
    try {
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
      await this.sink.save({
        suggestedFilename: filename,
        data: replay.data,
        mimeType: replay.mimeType,
        identity: {
          matchId: command.matchId,
          broadcastSessionId: command.broadcastSessionId,
          broadcasterId: command.broadcasterId,
        },
        requestId: command.requestId,
        epochId: this.epoch.id,
        retention: { syncState: 'local_only', pinned: false, recruiting: false },
      });
      this.onClip?.(Object.freeze({
        clipId,
        filename,
        data: replay.data,
        mimeType: replay.mimeType,
      }));
      const durationMs = Math.max(1, Math.round(replay.actualEndMonotonicMs - replay.actualStartMonotonicMs));
      await this.submitResult(command, {
        status: 'saved',
        clipId,
        bytes: replay.data.size,
        durationMs,
        mimeType: replay.mimeType,
      }, options.signal);
      return Object.freeze({
        status: 'saved',
        requestId: command.requestId,
        matchId: command.matchId,
        broadcastSessionId: command.broadcastSessionId,
        broadcasterId: command.broadcasterId,
        occurredAtEpochMs,
        clipId,
      });
    } catch (error) {
      const failureCode = replayFailureCode(error);
      const retryable = ['capture_interrupted', 'mux_failed', 'save_failed', 'replay_save_failed'].includes(failureCode);
      await this.submitResult(command, { status: 'failed', failureCode, retryable }, options.signal).catch(() => {});
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
      this.anchorByRequest.delete(command.requestId);
    }
  }

  async stop() {
    await this.capture.stop('fanview_highlight_stopped').catch(() => {});
    this.epoch = null;
    this.anchorByRequest.clear();
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

  async submitResult(command, result, signal) {
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await this.authorizedFetch(
          `/results/${encodeURIComponent(command.requestId)}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              bindingDigest: command.authorization.bindingDigest,
              result,
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

  authorizedFetch(path, init) {
    return fetch(
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

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
