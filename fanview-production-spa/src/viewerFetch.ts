/** Public viewer requests are authorized by the match link, not an account. */
let allowedOrigin: string | undefined;

export function configureViewerRequests(workerUrl: string) {
  allowedOrigin = new URL(workerUrl).origin;
}

export async function viewerFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const url = new URL(
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url,
    window.location.origin,
  );
  if (!allowedOrigin || url.origin !== allowedOrigin || url.username || url.password) {
    throw new Error("Viewer request destination unavailable");
  }
  const headers = new Headers(
    init?.headers ?? (input instanceof Request ? input.headers : undefined),
  );
  // A stale account token must not turn a valid public link into a login error.
  headers.delete("Authorization");
  return fetch(input, {
    ...init,
    headers,
    credentials: "omit",
    redirect: "error",
  });
}
