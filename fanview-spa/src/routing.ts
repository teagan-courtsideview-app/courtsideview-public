const FIXTURE_SHARE_ID = "fanview-spa-fixture";

export function getShareId(pathname: string): string {
  const match = pathname.match(/^\/v\/([^/?#]+)/);
  if (!match) return FIXTURE_SHARE_ID;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return FIXTURE_SHARE_ID;
  }
}
