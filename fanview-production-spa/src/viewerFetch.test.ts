import { afterEach, describe, expect, it, vi } from "vitest";
import { configureViewerRequests, viewerFetch } from "./viewerFetch";

afterEach(() => vi.unstubAllGlobals());

describe("public viewer requests", () => {
  it.each([
    ["/status/match", "GET"],
    ["/presence/match", "POST"],
    ["/presence/match", "DELETE"],
    ["/play/match", "POST"],
    ["/play/match/session", "PATCH"],
  ])("sends guest %s %s without an account", async (path, method) => {
    const fetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", fetch);
    configureViewerRequests("https://worker.example");
    await viewerFetch(`https://worker.example${path}`, { method });
    expect(fetch).toHaveBeenCalledOnce();
    const options = fetch.mock.calls[0][1];
    expect(options.headers.has("Authorization")).toBe(false);
    expect(options.credentials).toBe("omit");
    expect(options.redirect).toBe("error");
  });

  it("strips stale account tokens while retaining SDP and cancellation", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", fetch);
    configureViewerRequests("https://worker.example");
    const controller = new AbortController();
    await viewerFetch("https://worker.example/play/match", {
      method: "PATCH",
      headers: { Authorization: "Bearer expired-account", "content-type": "application/sdp" },
      body: "sdp",
      signal: controller.signal,
      credentials: "include",
      redirect: "follow",
    });
    const options = fetch.mock.calls[0][1];
    expect(options.headers.has("Authorization")).toBe(false);
    expect(options.headers.get("content-type")).toBe("application/sdp");
    expect(options.body).toBe("sdp");
    expect(options.signal).toBe(controller.signal);
    expect(options.credentials).toBe("omit");
    expect(options.redirect).toBe("error");
  });

  it("also strips credentials from Request objects without losing their other headers", async () => {
    const fetch = vi.fn().mockResolvedValue(new Response("ok"));
    vi.stubGlobal("fetch", fetch);
    configureViewerRequests("https://worker.example");
    const request = new Request("https://worker.example/play/match", {
      method: "PATCH",
      headers: { Authorization: "Bearer invalid-account", "content-type": "application/sdp" },
      body: "sdp",
    });
    await viewerFetch(request);
    const options = fetch.mock.calls[0][1];
    expect(options.headers.has("Authorization")).toBe(false);
    expect(options.headers.get("content-type")).toBe("application/sdp");
  });

  it.each([
    "https://other.example/play/match",
    "https://worker.example.evil.test/play/match",
    "http://worker.example/play/match",
    "https://account:secret@worker.example/play/match",
  ])("rejects untrusted destination %s before fetching", async (url) => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    configureViewerRequests("https://worker.example");
    await expect(viewerFetch(url)).rejects.toThrow("Viewer request destination unavailable");
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([401, 403, 404, 410, 503])("leaves HTTP %s to the viewer's safe recovery path, not account signup", async (status) => {
    const response = new Response("", { status });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    configureViewerRequests("https://worker.example");
    await expect(viewerFetch("https://worker.example/play/match")).resolves.toBe(response);
  });
});
