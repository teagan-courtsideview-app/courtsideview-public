import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LiveMedia } from "./LiveMedia";
import { configureViewerRequests } from "./viewerFetch";

const setRemoteDescription = vi.fn();
const setLocalDescription = vi.fn();
const close = vi.fn();

beforeEach(() => {
  configureViewerRequests("https://worker.example");
  setRemoteDescription.mockReset().mockResolvedValue(undefined);
  setLocalDescription.mockReset().mockResolvedValue(undefined);
  close.mockClear();
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.stubGlobal("MediaStream", class { addTrack() {} });
  vi.stubGlobal("RTCPeerConnection", class {
    connectionState = "new";
    addEventListener() {}
    setRemoteDescription = setRemoteDescription;
    setLocalDescription = setLocalDescription;
    createAnswer = vi.fn().mockResolvedValue({ type: "answer", sdp: "guest-answer" });
    close = close;
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.sessionStorage.clear();
});

const mountMedia = () => render(
  <LiveMedia
    displayMenuOpen={false}
    liveWorkerUrl="https://worker.example"
    match={{
      setNumber: 1, setTarget: 25, totalSets: 3, homeSetsWon: 0, awaySetsWon: 0,
      isComplete: false, isLive: true, updatedAt: new Date().toISOString(),
      home: { name: "Home", score: 0, color: "#1556C0" },
      away: { name: "Away", score: 0, color: "#EA2850" },
    }}
    media={{ kind: "cloudflare-realtime", alt: "Live match" }}
    onDisplayToggle={() => {}}
    scoreboardLayout="score-bar"
    scoreboardPosition="bottom-center"
    scoreboardSize="standard"
    shareId="public-match"
    viewerCount={1}
  />,
);

describe("guest live media", () => {
  it("completes guest WHEP negotiation and presence, then releases presence when unmounted", async () => {
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/")) return new Response(null, { status: 204 });
      if (init.method === "POST") return new Response("public-offer", { status: 201, headers: { location: "/play/public-match/session" } });
      return new Response(null, { status: 204 });
    });
    vi.stubGlobal("fetch", fetch);
    const view = mountMedia();
    await screen.findByText("Live now");
    expect(setRemoteDescription).toHaveBeenCalledWith({ type: "offer", sdp: "public-offer" });
    expect(setLocalDescription).toHaveBeenCalledWith({ type: "answer", sdp: "guest-answer" });
    expect(fetch).toHaveBeenCalledWith("https://worker.example/play/public-match/session", expect.objectContaining({ method: "PATCH", body: "guest-answer" }));
    view.unmount();
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("https://worker.example/presence/public-match", expect.objectContaining({ method: "DELETE", keepalive: true })));
    for (const [, options] of fetch.mock.calls) {
      expect(new Headers(options.headers).has("Authorization")).toBe(false);
      expect(options.credentials).toBe("omit");
    }
    expect(fetch).toHaveBeenCalledWith("https://worker.example/play/public-match/session", expect.objectContaining({ method: "DELETE", keepalive: true }));
    expect(close).toHaveBeenCalled();
  });

  it.each([401, 404, 503])("keeps Worker HTTP %s on the video recovery surface without requiring signup", async (status) => {
    vi.stubGlobal("fetch", vi.fn(async (input: string) => input.includes("/presence/")
      ? new Response(null, { status: 204 })
      : new Response("", { status })));
    mountMedia();
    expect(await screen.findByText("Reconnecting video")).toBeVisible();
    expect(screen.getByRole("button", { name: "Scoreboard display" })).toBeVisible();
    expect(screen.queryByText(/sign in|create account/i)).not.toBeInTheDocument();
  });
});


describe("obsolete guest media negotiation", () => {
  it("deletes a session whose POST completes after unmount without starting negotiation", async () => {
    let resolvePost!: (response: Response) => void;
    const interval = vi.spyOn(window, "setInterval");
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/") || init.method === "DELETE") return new Response(null, { status: 204 });
      return await new Promise<Response>(resolve => { resolvePost = resolve; });
    });
    vi.stubGlobal("fetch", fetch);
    const view = mountMedia();
    await waitFor(() => expect(resolvePost).toBeDefined());
    view.unmount();
    const watchdogsAfterUnmount = interval.mock.calls.filter(([,delay]) => delay === 2_000).length;
    await act(async () => resolvePost(new Response("late-offer", { status: 201, headers: { location: "/play/public-match/late-session" } })));
    await waitFor(() => expect(fetch).toHaveBeenCalledWith("https://worker.example/play/public-match/late-session", expect.objectContaining({ method: "DELETE", keepalive: true })));
    expect(setRemoteDescription).not.toHaveBeenCalled();
    expect(interval.mock.calls.filter(([,delay]) => delay === 2_000)).toHaveLength(watchdogsAfterUnmount);
    expect(fetch.mock.calls.some(([,init]) => init.method === "PATCH")).toBe(false);
  });

  it("cleans up during PATCH and never installs a watchdog after its late completion", async () => {
    let resolvePatch!: (response: Response) => void;
    const interval = vi.spyOn(window, "setInterval");
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/") || init.method === "DELETE") return new Response(null, { status: 204 });
      if (init.method === "POST") return new Response("offer", { status: 201, headers: { location: "/play/public-match/patch-session" } });
      return await new Promise<Response>(resolve => { resolvePatch = resolve; });
    });
    vi.stubGlobal("fetch", fetch);
    const view = mountMedia();
    await waitFor(() => expect(resolvePatch).toBeDefined());
    view.unmount();
    const watchdogsAfterUnmount = interval.mock.calls.filter(([,delay]) => delay === 2_000).length;
    await act(async () => resolvePatch(new Response(null, { status: 204 })));
    expect(interval.mock.calls.filter(([,delay]) => delay === 2_000)).toHaveLength(watchdogsAfterUnmount);
    expect(fetch.mock.calls.filter(([url,init]) => url.endsWith("/patch-session") && init.method === "DELETE")).toHaveLength(1);
    expect(fetch.mock.calls.find(([,init]) => init.method === "PATCH")?.[1].signal?.aborted).toBe(true);
  });

  it.each(["https://attacker.example/play/public-match/session", "/play/other-match/session", "/ingest/public-match/session"])("does not negotiate or delete an invalid server Location %s", async location => {
    const fetch = vi.fn(async (input: string, init: RequestInit) => input.includes("/presence/")
      ? new Response(null, { status: 204 })
      : new Response("offer", { status: 201, headers: { location } }));
    vi.stubGlobal("fetch", fetch);
    mountMedia();
    await screen.findByText("Reconnecting video");
    expect(fetch.mock.calls.some(([,init]) => init.method === "PATCH")).toBe(false);
    expect(fetch.mock.calls.some(([url]) => url.includes("attacker.example") || url.includes("/ingest/") || url.includes("other-match"))).toBe(false);
  });
});
