import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LiveMedia } from "./LiveMedia";
import { drawPresentationFrame } from "./presentationFrame";
vi.mock("./presentationFrame", () => ({ drawPresentationFrame: vi.fn() }));
import { configureViewerRequests } from "./viewerFetch";

const setRemoteDescription = vi.fn();
const setLocalDescription = vi.fn();
const close = vi.fn();
const peers: Array<{ connectionState: string; events: Record<string, (event?: any) => void>; getStats: ReturnType<typeof vi.fn> }> = [];
const realSetInterval = window.setInterval;
let videoFrames = 0;
let droppedFrames = 0;

beforeEach(() => {
  window.setInterval = realSetInterval;
  configureViewerRequests("https://worker.example");
  setRemoteDescription.mockReset().mockResolvedValue(undefined);
  setLocalDescription.mockReset().mockResolvedValue(undefined);
  close.mockClear();
  peers.length = 0;
  Object.defineProperty(document, "fullscreenElement", { configurable: true, writable: true, value: null });
  Object.defineProperty(document, "fullscreenEnabled", { configurable: true, value: true });
  Object.defineProperty(HTMLVideoElement.prototype, "webkitEnterFullscreen", { configurable: true, value: undefined });
  vi.mocked(drawPresentationFrame).mockClear();
  videoFrames = 0; droppedFrames = 0;
  Object.defineProperty(HTMLVideoElement.prototype, "requestVideoFrameCallback", { configurable: true, value: undefined });
  Object.defineProperty(HTMLVideoElement.prototype, "cancelVideoFrameCallback", { configurable: true, value: vi.fn() });
  Object.defineProperty(HTMLVideoElement.prototype, "getVideoPlaybackQuality", { configurable: true, value: () => ({ totalVideoFrames: videoFrames, droppedVideoFrames: droppedFrames }) });
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.stubGlobal("MediaStream", class { addTrack() {} });
  vi.stubGlobal("RTCPeerConnection", class {
    connectionState = "new";
    events: Record<string, (event?: any) => void> = {};
    constructor() { peers.push(this); }
    addEventListener(name: string, callback: (event?: any) => void) { this.events[name] = callback; }
    setRemoteDescription = setRemoteDescription;
    setLocalDescription = setLocalDescription;
    createAnswer = vi.fn().mockResolvedValue({ type: "answer", sdp: "guest-answer" });
    getStats = vi.fn(async () => new Map());
    close = close;
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.sessionStorage.clear();
  vi.useRealTimers();
});

const mountMedia = (onVideoConfirmed?: (confirmed: boolean) => void) => render(
  <section className="match-stage"><LiveMedia
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
    onVideoConfirmed={onVideoConfirmed}
    scoreboardLayout="score-bar"
    scoreboardPosition="bottom-center"
    scoreboardSize="standard"
    shareId="public-match"
    viewerCount={1}
  /></section>,
);

describe("guest live media", () => {
  it("keeps persistent Full screen and Float labels while confirmed API states change", () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
    const view = mountMedia();
    const videos = view.container.querySelectorAll("video");
    act(() => videos[1].dispatchEvent(new Event("webkitbeginfullscreen")));
    const fullScreen = screen.getByRole("button", { name: "Exit full screen" });
    expect(fullScreen).toHaveTextContent("Full screen");
    expect(fullScreen).toHaveAttribute("aria-pressed", "true");
    act(() => videos[0].dispatchEvent(new Event("enterpictureinpicture")));
    expect(screen.getByRole("button", { name: "Return floating video" })).toHaveTextContent("Float");
    expect(screen.getByRole("button", { name: "Return floating video" })).toHaveAttribute("aria-pressed", "true");
    act(() => videos[1].dispatchEvent(new Event("webkitendfullscreen")));
    expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveTextContent("Full screen");
    act(() => videos[0].dispatchEvent(new Event("leavepictureinpicture")));
    expect(screen.getByRole("button", { name: "Float live video" })).toHaveTextContent("Float");
  });
  it("completes guest WHEP negotiation and presence, then releases presence when unmounted", async () => {
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/")) return new Response(null, { status: 204 });
      if (init.method === "POST") return new Response("public-offer", { status: 201, headers: { location: "/play/public-match/session" } });
      return new Response(null, { status: 204 });
    });
    vi.stubGlobal("fetch", fetch);
    const view = mountMedia();
    await screen.findByText("Connecting video");
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

describe("viewer frame recovery on the original link", () => {
  const ready = async (onVideoConfirmed?: (confirmed: boolean) => void) => {
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/") || init.method !== "POST") return new Response(null, { status: 204 });
      return new Response("offer", { status: 201, headers: { location: `/play/public-match/session-${peers.length}` } });
    });
    vi.stubGlobal("fetch", fetch);
    const view = mountMedia(onVideoConfirmed);
    await act(async () => { await vi.advanceTimersByTimeAsync(0); });
    return { fetch, view, video: view.container.querySelector("video")! };
  };
  it("reports confirmed video only after frames and clears it on pause, recovery and unmount", async () => {
    vi.useFakeTimers();
    const confirmed = vi.fn();
    const { video, view } = await ready(confirmed);
    expect(confirmed).toHaveBeenLastCalledWith(false);
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    peers[0].connectionState = "connected";
    fireEvent.playing(video); videoFrames = 1;
    await act(async () => { await vi.advanceTimersByTimeAsync(2_000); });
    expect(confirmed).toHaveBeenLastCalledWith(true);
    fireEvent.pause(video);
    expect(confirmed).toHaveBeenLastCalledWith(false);
    fireEvent.playing(video);
    expect(confirmed).toHaveBeenLastCalledWith(true);
    await act(async () => { await vi.advanceTimersByTimeAsync(6_000); });
    expect(confirmed).toHaveBeenLastCalledWith(false);
    view.unmount(); expect(confirmed).toHaveBeenLastCalledWith(false);
  });
  it("allows slow initial ICE and first video without discarding the healthy pending session", async () => {
    vi.useFakeTimers();
    const { video, fetch } = await ready();
    peers[0].connectionState = "connecting";
    await act(async () => { await vi.advanceTimersByTimeAsync(8_000); });
    expect(peers).toHaveLength(1);
    expect(fetch.mock.calls.filter(([, init]) => init.method === "DELETE")).toHaveLength(0);
    expect(screen.getByText("Connecting video")).toBeVisible();
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    peers[0].connectionState = "connected";
    videoFrames = 1;
    await act(async () => { await vi.advanceTimersByTimeAsync(2_000); });
    expect(screen.queryByText("Connecting video")).not.toBeInTheDocument();
    expect(peers).toHaveLength(1);
    // Once real video exists, the shorter stalled-video deadline still applies.
    await act(async () => { await vi.advanceTimersByTimeAsync(6_000); });
    expect(screen.getByText("Reconnecting video")).toBeVisible();
  });
  it("does not hide recovery for audio, a connected peer, or an advancing audio clock", async () => {
    vi.useFakeTimers();
    const { video } = await ready();
    await act(async () => {
      peers[0].connectionState = "connected";
      peers[0].events.connectionstatechange();
      peers[0].events.track({ track: { kind: "audio", addEventListener() {} } });
      Object.defineProperty(video, "currentTime", { configurable: true, value: 30 });
      await vi.advanceTimersByTimeAsync(2_000);
    });
    expect(screen.getByText("Connecting video")).toBeVisible();
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000); });
    expect(screen.getByText("Reconnecting video")).toBeVisible();
  });
  it("recovers 20 frozen-video sessions on the same URL while preserving scores and controls", async () => {
    vi.useFakeTimers();
    const { fetch, video } = await ready();
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    for (let cycle = 0; cycle < 20; cycle += 1) {
      await act(async () => {
        peers.at(-1)!.connectionState = "connected";
        videoFrames += 30;
        await vi.advanceTimersByTimeAsync(2_000);
      });
      expect(screen.queryByText("Connecting video")).not.toBeInTheDocument();
      expect(screen.queryByText("Reconnecting video")).not.toBeInTheDocument();
      await act(async () => { await vi.advanceTimersByTimeAsync(6_000); });
      expect(screen.getByText("Reconnecting video")).toBeVisible();
      expect(screen.getByRole("button", { name: "Scoreboard display" })).toBeVisible();
      await act(async () => { await vi.advanceTimersByTimeAsync(1_500); });
      expect(screen.getByText("Connecting video")).toBeVisible();
    }
    const posts = fetch.mock.calls.filter(([url, init]) => url.includes("/play/") && init.method === "POST");
    expect(posts).toHaveLength(21);
    expect(new Set(posts.map(([url]) => url))).toEqual(new Set(["https://worker.example/play/public-match"]));
    expect(screen.queryByText(/sign in|create account/i)).not.toBeInTheDocument();
  });
  it("abandons hung signaling and ignores late results from that attempt", async () => {
    vi.useFakeTimers();
    let complete!: (response: Response) => void;
    const fetch = vi.fn(async (input: string, init: RequestInit) => {
      if (input.includes("/presence/") || init.method === "DELETE") return new Response(null, { status: 204 });
      return new Promise<Response>(resolve => { complete = resolve; });
    });
    vi.stubGlobal("fetch", fetch);
    mountMedia();
    await act(async () => { await vi.advanceTimersByTimeAsync(12_000); });
    expect(screen.getByText("Reconnecting video")).toBeVisible();
    expect(fetch.mock.calls.find(([url, init]) => url.includes("/play/") && init.method === "POST")?.[1].signal?.aborted).toBe(true);
    await act(async () => complete(new Response("late", { status: 201, headers: { location: "/play/public-match/late" } })));
    expect(setRemoteDescription).not.toHaveBeenCalled();
    expect(fetch.mock.calls.some(([url, init]) => url.endsWith("/late") && init.method === "DELETE")).toBe(true);
  });
  it("does not count dropped frames as presented video", async () => {
    vi.useFakeTimers(); const { video } = await ready();
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    peers[0].connectionState = "connected"; videoFrames = 30; droppedFrames = 30;
    await act(async () => { await vi.advanceTimersByTimeAsync(2_000); });
    expect(screen.getByText("Connecting video")).toBeVisible();
    await act(async () => { await vi.advanceTimersByTimeAsync(10_000); });
    expect(screen.getByText("Reconnecting video")).toBeVisible();
  });
  it("prefers actual frame callbacks over quality counters that advance without rendering", async () => {
    vi.useFakeTimers();
    Object.defineProperty(HTMLVideoElement.prototype, "requestVideoFrameCallback", { configurable: true, value: vi.fn(() => 1) });
    const { video } = await ready();
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    peers[0].connectionState = "connected"; videoFrames = 100;
    await act(async () => { await vi.advanceTimersByTimeAsync(12_000); });
    expect(screen.getByText("Reconnecting video")).toBeVisible();
  });
  it("gives a slow successful negotiation a fresh bounded twelve-second first-frame window", async () => {
    vi.useFakeTimers(); let release!: (response: Response) => void;
    vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
      if(url.includes("/presence/") || init.method === "DELETE") return new Response(null,{status:204});
      if(init.method === "POST") return new Response("offer",{status:201,headers:{location:"/play/public-match/slow"}});
      return new Promise<Response>(resolve=>{release=resolve;});
    }));
    mountMedia(); await act(async()=>{await vi.advanceTimersByTimeAsync(10_000);});
    await act(async()=>release(new Response(null,{status:204})));
    await act(async()=>{await vi.advanceTimersByTimeAsync(10_000);});
    expect(screen.getByText("Connecting video")).toBeVisible();
    await act(async()=>{await vi.advanceTimersByTimeAsync(2_000);});
    expect(screen.getByText("Reconnecting video")).toBeVisible();
  });
  it("uses decoded video frames on older browsers without frame presentation APIs, not audio or bytes", async () => {
    vi.useFakeTimers(); Object.defineProperty(HTMLVideoElement.prototype,"getVideoPlaybackQuality",{configurable:true,value:undefined});
    const { video } = await ready();
    Object.defineProperties(video, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    peers[0].connectionState="connected";let decoded=1;
    peers[0].getStats.mockImplementation(async()=>new Map([['v',{id:'v',ssrc:1,type:'inbound-rtp',kind:'video',framesDecoded:decoded,bytesReceived:10000}]]));
    await act(async()=>{await vi.advanceTimersByTimeAsync(2_000);});expect(screen.getByText('Connecting video')).toBeVisible();
    decoded=2;await act(async()=>{await vi.advanceTimersByTimeAsync(2_000);});expect(screen.queryByText('Connecting video')).not.toBeInTheDocument();
    await act(async()=>{await vi.advanceTimersByTimeAsync(6_000);});expect(screen.getByText('Reconnecting video')).toBeVisible();
  });
  it("bounds hung decoded-frame stats and prevents overlapping reads", async () => {
    vi.useFakeTimers(); Object.defineProperty(HTMLVideoElement.prototype,"getVideoPlaybackQuality",{configurable:true,value:undefined});
    await ready();peers[0].getStats.mockImplementation(()=>new Promise(()=>{}));
    await act(async()=>{await vi.advanceTimersByTimeAsync(2_500);});expect(peers[0].getStats).toHaveBeenCalledTimes(1);
    await act(async()=>{await vi.advanceTimersByTimeAsync(9_500);});expect(screen.getByText('Reconnecting video')).toBeVisible();
  });
  it("shows a usable Play action when autoplay is rejected while connecting", async () => {
    vi.useFakeTimers();vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValue(new Error('gesture required'));
    const { video, fetch } = await ready();expect(screen.getByRole('button',{name:'Play live video'})).toBeVisible();
    await act(async()=>{await vi.advanceTimersByTimeAsync(20_000);});
    expect(fetch.mock.calls.filter(([url,init])=>url.includes('/play/')&&init.method==='POST')).toHaveLength(1);
    vi.mocked(HTMLMediaElement.prototype.play).mockResolvedValue();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Play live video'})));
    Object.defineProperties(video,{readyState:{configurable:true,value:2},videoWidth:{configurable:true,value:1280},videoHeight:{configurable:true,value:720}});
    peers[0].connectionState='connected';videoFrames+=1;
    await act(async()=>{await vi.advanceTimersByTimeAsync(2_000);});
    expect(screen.queryByRole('button',{name:'Play live video'})).not.toBeInTheDocument();
    expect(screen.queryByText('Connecting video')).not.toBeInTheDocument();
  });
  it.each(['resolve','reject'])("ignores an old play promise's %s after a new stream has replaced it", async outcome => {
    vi.useFakeTimers();let resolve!:()=>void;let reject!:(error:Error)=>void;
    vi.mocked(HTMLMediaElement.prototype.play).mockImplementationOnce(()=>new Promise<void>((yes,no)=>{resolve=yes;reject=no;}));
    const { video }=await ready();const old=video.srcObject;
    await act(async()=>{await vi.advanceTimersByTimeAsync(13_500);});expect(video.srcObject).not.toBe(old);
    vi.mocked(HTMLMediaElement.prototype.play).mockResolvedValue();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Turn on live audio'})));
    expect(screen.getByRole('button',{name:'Mute live audio'})).toBeVisible();
    await act(async()=>{if(outcome==='resolve')resolve();else reject(new Error('old stream gone'));});
    expect(screen.getByRole('button',{name:'Mute live audio'})).toBeVisible();expect(video.muted).toBe(false);
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


describe("fullscreen must change the browser, not just hide Chat", () => {
  it("does not claim full screen when a browser resolves the request without entering", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
    Object.defineProperty(document, "fullscreenElement", { configurable: true, value: null });
    const view = mountMedia();
    const stage = view.container.querySelector(".match-stage") as HTMLElement;
    stage.requestFullscreen = vi.fn().mockResolvedValue(undefined);
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    await act(async () => { await vi.advanceTimersByTimeAsync(2_000); });
    expect(stage.requestFullscreen).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveAttribute("aria-pressed", "false");
    expect(stage).not.toHaveClass("is-web-fullscreen");
    expect(screen.getByText(/Full screen couldn.t open/)).toBeVisible();
  });
});


describe("confirmed fullscreen transitions", () => {
  const prepare = () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
    const view = mountMedia();
    const stage = view.container.querySelector(".match-stage") as HTMLElement;
    const setFullscreen = (element: Element | null) => {
      Object.defineProperty(document, "fullscreenElement", { configurable: true, value: element });
      document.dispatchEvent(new Event("fullscreenchange"));
    };
    stage.requestFullscreen = vi.fn(async () => setFullscreen(stage));
    document.exitFullscreen = vi.fn(async () => setFullscreen(null));
    return { view, stage, setFullscreen };
  };
  it("enters and exits repeatedly only on API confirmation and restores the trigger focus", () => {
    const { stage } = prepare();
    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
      expect(document.fullscreenElement).toBe(stage);
      expect(screen.getByRole("button", { name: "Exit full screen" })).toHaveAttribute("aria-pressed", "true");
      fireEvent.click(screen.getByRole("button", { name: "Exit full screen" }));
      expect(document.fullscreenElement).toBeNull();
      expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveFocus();
    }
    expect(stage.requestFullscreen).toHaveBeenCalledTimes(20);
    expect(document.exitFullscreen).toHaveBeenCalledTimes(20);
  });
  it("does not claim an exit when the browser rejects it", async () => {
    prepare();
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    document.exitFullscreen = vi.fn().mockRejectedValue(new Error("busy"));
    fireEvent.click(screen.getByRole("button", { name: "Exit full screen" }));
    await screen.findByText(/Full screen couldn.t close/);
    expect(screen.getByRole("button", { name: "Exit full screen" })).toHaveAttribute("aria-pressed", "true");
  });
  it("retains the page and offers retry after rejected entry", async () => {
    const { stage } = prepare();
    stage.requestFullscreen = vi.fn().mockRejectedValue(new Error("denied"));
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    await screen.findByText(/Full screen couldn.t open/);
    expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveAttribute("aria-pressed", "false");
    expect(stage).not.toHaveClass("is-web-fullscreen");
    expect(screen.getByRole("button", { name: "Scoreboard display" })).toBeVisible();
  });
  it("does not issue duplicate requests while the browser is deciding", () => {
    const { stage } = prepare();
    stage.requestFullscreen = vi.fn(() => new Promise<void>(() => {}));
    const button = screen.getByRole("button", { name: "Enter full screen" });
    fireEvent.click(button); fireEvent.click(button);
    expect(stage.requestFullscreen).toHaveBeenCalledOnce();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});

describe("Float preserves the viewer’s sound choice", () => {
  const setupFloat = () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
    Object.defineProperty(document, "pictureInPictureEnabled", { configurable: true, value: true });
    Object.defineProperty(document, "pictureInPictureElement", { configurable: true, value: null });
    const view = mountMedia();
    const source = view.container.querySelector("video")!;
    const stream = new MediaStream();
    stream.getAudioTracks = () => [{ kind: "audio" }] as MediaStreamTrack[];
    source.srcObject = stream;
    Object.defineProperty(source, "readyState", { configurable: true, value: 2 });
    source.requestPictureInPicture = vi.fn(async () => {
      Object.defineProperty(document, "pictureInPictureElement", { configurable: true, value: source });
      source.dispatchEvent(new Event("enterpictureinpicture"));
      return {} as PictureInPictureWindow;
    });
    document.exitPictureInPicture = vi.fn(async () => {
      Object.defineProperty(document, "pictureInPictureElement", { configurable: true, value: null });
      source.dispatchEvent(new Event("leavepictureinpicture"));
    });
    fireEvent.loadedMetadata(source);
    return source;
  };

  it.each([false, true])("retains sound-on=%s through repeated Float and return", async (soundOn) => {
    const source = setupFloat();
    if (soundOn) await act(async () => fireEvent.click(screen.getByRole("button", { name: "Turn on live audio" })));
    for (let repeat = 0; repeat < 3; repeat++) {
      await act(async () => fireEvent.click(screen.getByRole("button", { name: "Float live video" })));
      expect(source.muted).toBe(!soundOn);
      expect(screen.getByRole("button", { name: soundOn ? "Mute live audio" : "Turn on live audio" })).toHaveAttribute("aria-pressed", String(soundOn));
      await act(async () => fireEvent.click(screen.getByRole("button", { name: "Return floating video" })));
      expect(source.muted).toBe(!soundOn);
    }
  });

  it("keeps a muted viewer muted when the browser rejects Float", async () => {
    const source = setupFloat();
    source.requestPictureInPicture = vi.fn().mockRejectedValue(new Error("denied"));
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Float live video" })));
    expect(source.muted).toBe(true);
    expect(screen.getByRole("button", { name: "Turn on live audio" })).toHaveAttribute("aria-pressed", "false");
  });
});

describe("Safari native video preparation", () => {
  const setupSafari = () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 503 })));
    Object.defineProperty(document, "fullscreenEnabled", { configurable: true, value: false });
    const nativeEnter = vi.fn();
    Object.defineProperty(HTMLVideoElement.prototype, "webkitEnterFullscreen", { configurable: true, value: nativeEnter });
    const stop = vi.fn();
    const clone = vi.fn(() => ({ kind: "audio", stop }));
    const tracks = [{ kind: "video", stop }] as Array<{ kind: string; stop: () => void }>;
    const capture = { removeTrack: (t: any) => { const index = tracks.indexOf(t); if(index >= 0) tracks.splice(index, 1); }, getTracks: () => tracks, getAudioTracks: () => tracks.filter(t => t.kind === "audio"), addTrack: (t: any) => tracks.push(t) };
    Object.defineProperty(HTMLCanvasElement.prototype, "captureStream", { configurable: true, value: vi.fn(() => capture) });
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const view = mountMedia();
    const [source, presentation] = Array.from(view.container.querySelectorAll("video"));
    const stream = new MediaStream();
    const audioTrack = { kind: "audio", clone };
    stream.getAudioTracks = () => [audioTrack] as any;
    source.srcObject = stream;
    Object.defineProperties(source, { readyState: { configurable: true, value: 2 }, videoWidth: { configurable: true, value: 1280 }, videoHeight: { configurable: true, value: 720 } });
    return { source, presentation, nativeEnter, stop, clone, capture, view };
  };
  it("primes one muted frame without cloning audio or continuously drawing before the tap", async () => {
    const { source, presentation, clone } = setupSafari();
    fireEvent.playing(source);
    expect(presentation.srcObject).toBeTruthy();
    expect(presentation.muted).toBe(true);
    expect(drawPresentationFrame).toHaveBeenCalledOnce();
    await act(async () => { await vi.advanceTimersByTimeAsync(500); });
    expect(drawPresentationFrame).toHaveBeenCalledOnce();
    expect(clone).not.toHaveBeenCalled();
  });
  it("requests native fullscreen synchronously from the tap after metadata, retains mute, and cleans up on exit", async () => {
    const { source, presentation, nativeEnter, clone, stop } = setupSafari();
    fireEvent.playing(source);
    Object.defineProperty(presentation, "readyState", { configurable: true, value: 2 });
    nativeEnter.mockImplementation(() => {
      Object.defineProperty(presentation, "webkitDisplayingFullscreen", { configurable: true, value: true });
      presentation.dispatchEvent(new Event("webkitbeginfullscreen"));
    });
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    expect(nativeEnter).toHaveBeenCalledOnce();
    expect(clone).toHaveBeenCalledOnce();
    expect(presentation.muted).toBe(true);
    expect(screen.getByRole("button", { name: "Exit full screen" })).toHaveAttribute("aria-pressed", "true");
    act(() => {
      Object.defineProperty(presentation, "webkitDisplayingFullscreen", { configurable: true, value: false });
      presentation.dispatchEvent(new Event("webkitendfullscreen"));
    });
    expect(stop).toHaveBeenCalled();
    expect(source.muted).toBe(true);
    expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    expect(nativeEnter).toHaveBeenCalledTimes(2);
  });
  it("keeps its label truthful while Safari metadata is not ready", () => {
    const { source, nativeEnter } = setupSafari();
    fireEvent.playing(source);
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    expect(nativeEnter).not.toHaveBeenCalled();
    expect(screen.getByText("Video is getting ready. Try Full screen again.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Enter full screen" })).toHaveAttribute("aria-pressed", "false");
  });
  it("keeps metadata preparation across early repeated taps", () => {
    const { source, presentation } = setupSafari();
    fireEvent.playing(source);
    const prepared = presentation.srcObject;
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    expect(presentation.srcObject).toBe(prepared);
    expect(HTMLCanvasElement.prototype.captureStream).toHaveBeenCalledOnce();
  });
  it("plays audio only through the active presentation and restores the latest mute choice", async () => {
    const { source, presentation, nativeEnter } = setupSafari();
    fireEvent.playing(source);
    Object.defineProperty(presentation, "readyState", { configurable: true, value: 2 });
    nativeEnter.mockImplementation(() => {
      Object.defineProperty(presentation, "webkitDisplayingFullscreen", { configurable: true, value: true });
      presentation.dispatchEvent(new Event("webkitbeginfullscreen"));
    });
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Turn on live audio" })));
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    expect(source.muted).toBe(true); expect(presentation.muted).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: "Mute live audio" }));
    expect(source.muted).toBe(true); expect(presentation.muted).toBe(true);
    await act(async () => fireEvent.click(screen.getByRole("button", { name: "Turn on live audio" })));
    expect(source.muted).toBe(true); expect(presentation.muted).toBe(false);
    act(() => { Object.defineProperty(presentation, "webkitDisplayingFullscreen", { configurable: true, value: false }); presentation.dispatchEvent(new Event("webkitendfullscreen")); });
    expect(source.muted).toBe(false);
  });
  it("replaces cloned audio after a new source stream reconnects", async () => {
    const { source, presentation, stop, capture } = setupSafari();
    fireEvent.playing(source);
    Object.defineProperty(presentation, "readyState", { configurable: true, value: 2 });
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    const nextClone = vi.fn(() => ({kind: "audio", stop: vi.fn()}));
    const nextTrack = {kind: "audio", clone: nextClone};
    const replacement = new MediaStream(); replacement.getAudioTracks = () => [nextTrack] as any;
    source.srcObject = replacement;
    await act(async () => { await vi.advanceTimersByTimeAsync(260); });
    expect(nextClone).toHaveBeenCalledOnce();
    expect(stop).toHaveBeenCalled();
    expect(capture.getAudioTracks()).toHaveLength(1);
  });
  it("cleans the compositor when Safari leaves PiP through its native controls", () => {
    const { source, presentation, stop } = setupSafari();
    fireEvent.playing(source);
    Object.defineProperty(presentation, "readyState", { configurable: true, value: 2 });
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    act(() => { Object.defineProperty(presentation, "webkitPresentationMode", { configurable: true, value: "picture-in-picture" }); presentation.dispatchEvent(new Event("webkitpresentationmodechanged")); });
    expect(screen.getByRole("button", { name: "Return floating video" })).toHaveAttribute("aria-pressed", "true");
    act(() => { Object.defineProperty(presentation, "webkitPresentationMode", { configurable: true, value: "inline" }); presentation.dispatchEvent(new Event("webkitpresentationmodechanged")); });
    expect(stop).toHaveBeenCalled(); expect(presentation.srcObject).toBeNull();
    expect(screen.getByRole("button", { name: "Float live video" })).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps the presentation stream when Safari moves from fullscreen into PiP and back", () => {
    const { source, presentation, nativeEnter, stop } = setupSafari();
    fireEvent.playing(source);
    Object.defineProperty(presentation, "readyState", { configurable: true, value: 2 });
    nativeEnter.mockImplementation(() => {
      Object.defineProperties(presentation, {
        webkitDisplayingFullscreen: { configurable: true, value: true },
        webkitPresentationMode: { configurable: true, value: "fullscreen" },
      });
      presentation.dispatchEvent(new Event("webkitbeginfullscreen"));
    });
    fireEvent.click(screen.getByRole("button", { name: "Enter full screen" }));
    const prepared = presentation.srcObject;
    act(() => {
      Object.defineProperties(presentation, {
        webkitDisplayingFullscreen: { configurable: true, value: false },
        webkitPresentationMode: { configurable: true, value: "picture-in-picture" },
      });
      presentation.dispatchEvent(new Event("webkitendfullscreen"));
      presentation.dispatchEvent(new Event("webkitpresentationmodechanged"));
    });
    expect(presentation.srcObject).toBe(prepared);
    expect(stop).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Return floating video" })).toHaveAttribute("aria-pressed", "true");
    act(() => {
      Object.defineProperties(presentation, {
        webkitDisplayingFullscreen: { configurable: true, value: true },
        webkitPresentationMode: { configurable: true, value: "fullscreen" },
      });
      presentation.dispatchEvent(new Event("leavepictureinpicture"));
      presentation.dispatchEvent(new Event("webkitbeginfullscreen"));
      presentation.dispatchEvent(new Event("webkitpresentationmodechanged"));
    });
    expect(presentation.srcObject).toBe(prepared);
    expect(stop).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Exit full screen" })).toHaveAttribute("aria-pressed", "true");
  });

});
