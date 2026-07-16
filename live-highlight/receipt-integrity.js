export function storedReceiptMatches(receipt, stored, streamId) {
  const durable = stored?.deliveryReceipt;
  return Boolean(
    stored
    && durable
    && stored.storageKey === receipt.storageKey
    && stored.requestId === receipt.requestId
    && stored.bytes === receipt.result.bytes
    && stored.durationMs === receipt.result.durationMs
    && stored.mimeType === receipt.result.mimeType
    && durable.controlStreamId === streamId
    && durable.controlStreamId === receipt.controlStreamId
    && durable.bindingDigest === receipt.bindingDigest
    && durable.expiresAtEpochMs === receipt.expiresAtEpochMs
    && durable.clipId === receipt.result.clipId
  );
}

export function pendingReceiptFromStored(stored) {
  if (!stored?.deliveryReceipt || stored.durationMs === null) return null;
  return Object.freeze({
    controlStreamId: stored.deliveryReceipt.controlStreamId,
    requestId: stored.requestId,
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
