export const BUFFER_RESTART_BACKOFF_MS = Object.freeze([1_000, 3_000, 8_000]);

const RETRYABLE_BUFFER_FAILURES = new Set([
  'capture_interrupted',
  'capture_stopped',
  'buffer_status_failed',
  'storage_unavailable',
  'server_unavailable',
  'timeout',
]);

export async function runWithConcurrency(items, limit, task) {
  const boundedLimit = Math.max(1, Math.floor(limit));
  let nextIndex = 0;
  const workers = Array.from(
    { length: Math.min(boundedLimit, items.length) },
    async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        await task(items[index], index);
      }
    },
  );
  await Promise.all(workers);
}

export function bufferRecoveryDecision(failureCode, restartAttempts) {
  const retryable = RETRYABLE_BUFFER_FAILURES.has(failureCode);
  const canRestart = retryable && restartAttempts < BUFFER_RESTART_BACKOFF_MS.length;
  return Object.freeze({
    canRestart,
    message: canRestart
      ? 'Highlight replay paused. Restarting the camera buffer.'
      : 'Highlight replay is unavailable. Reconnect the FanView camera setup.',
  });
}
