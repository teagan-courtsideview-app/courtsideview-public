export class ViewerAuthenticationRequired extends Error {}
const authListeners = new Set<() => void>();
export function onViewerAuthenticationRequired(listener: () => void) {
  authListeners.add(listener);
  return () => { authListeners.delete(listener); };
}
function requireSignIn(): never {
  for (const listener of authListeners) listener();
  throw new ViewerAuthenticationRequired('Sign in to watch this match');
}
/** Configured only by the authenticated production entrypoint. No token persistence. */
let tokenProvider: (() => Promise<string | null>) | undefined;
let allowedOrigin: string | undefined;
export function configureViewerRequests(provider: () => Promise<string | null>, workerUrl: string) {
  tokenProvider = provider;
  allowedOrigin = new URL(workerUrl).origin;
}
export async function viewerFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url, window.location.origin);
  if (!tokenProvider || url.origin !== allowedOrigin) throw new Error('Viewer request destination unavailable');
  const token = await tokenProvider();
  if (!token) requireSignIn();
  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(input, {...init, headers});
  if (response.status === 401) requireSignIn();
  return response;
}
