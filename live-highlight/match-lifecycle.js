export function shouldClearFinalRallyTimer(matchState) {
  return matchState?.is_complete !== true;
}

export function canUseFinalRallyTokenGrace(state, nowEpochMs, graceMs) {
  const lifecycleRevocation = state?.revokedReason === 'match_complete'
    || state?.revokedReason === 'match_closed';
  return Boolean(
    state?.isComplete === true
    && state?.isPublished === true
    && state?.tokenStatus !== 'active'
    && lifecycleRevocation
    && Number.isSafeInteger(state?.endedAtEpochMs)
    && Number.isSafeInteger(nowEpochMs)
    && Number.isSafeInteger(graceMs)
    && graceMs > 0
    && nowEpochMs >= state.endedAtEpochMs
    && nowEpochMs < state.endedAtEpochMs + graceMs,
  );
}
