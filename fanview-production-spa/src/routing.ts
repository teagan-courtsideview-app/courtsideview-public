export function productionShareId(pathname: string): string | null {
  const match = pathname.match(
    /^\/(?:(?:fanview-next|assets\/fanview-production)\/)?v\/([^/?#]+)/,
  );
  if (!match) return null;
  try {
    const decoded = decodeURIComponent(match[1]).trim();
    return decoded || null;
  } catch {
    return null;
  }
}

export function legacyFanViewUrl(shareId: string): string {
  return `/fanview/legacy/${encodeURIComponent(shareId)}`;
}
