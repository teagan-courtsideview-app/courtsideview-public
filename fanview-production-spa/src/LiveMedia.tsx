import { drawPresentationFrame } from "./presentationFrame";
import { viewerFetch } from "./viewerFetch";
import {
  ArrowsIn,
  ArrowsOut,
  PictureInPicture,
  Play,
  SlidersHorizontal,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  FanViewMatch,
  FanViewMedia,
} from "../../fanview-spa/src/adapters/contracts";
import {
  type ScoreboardLayout,
} from "../../fanview-spa/src/components/ScoreBug";
import type {
  ScoreboardPosition,
  ScoreboardSize,
} from "./ProductionApp";

interface Props {
  displayMenuOpen: boolean;
  liveWorkerUrl: string;
  match: FanViewMatch;
  media: FanViewMedia;
  onDisplayToggle: () => void;
  onVideoConfirmed?: (confirmed: boolean) => void;
  scoreboardLayout: ScoreboardLayout;
  scoreboardPosition: ScoreboardPosition;
  scoreboardSize: ScoreboardSize;
  shareId: string;
  viewerCount: number;
}

const VIDEO_STALL_CHECK_MS = 2_000;
// Initial ICE/media establishment needs its own window; a six-second stall
// deadline is appropriate only after this session has actually delivered video.
const VIDEO_FIRST_FRAME_TIMEOUT_MS = 12_000;
const VIDEO_STALL_RECONNECT_MS = 6_000;
const VIDEO_RECONNECT_DELAY_MS = 1_500;
const VIDEO_NEGOTIATION_TIMEOUT_MS = 12_000;
const FULLSCREEN_PREPARATION_TIMEOUT_MS = 2_000;
const FULLSCREEN_PREPARATION_FRAME_MS = 100;

type SafariVideoElement = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean;
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitPresentationMode?: "inline" | "fullscreen" | "picture-in-picture";
  webkitSetPresentationMode?: (
    mode: "inline" | "fullscreen" | "picture-in-picture",
  ) => void;
  webkitSupportsFullscreen?: boolean;
  webkitSupportsPresentationMode?: (
    mode: "inline" | "fullscreen" | "picture-in-picture",
  ) => boolean;
};

type PresentationStream = {
  cleanup: () => void;
  video: SafariVideoElement;
  source: MediaProvider | null;
  refreshFrame: () => void;
  activate: () => void;
  isActive: () => boolean;
};

const viewerId = (): string => {
  const key = "courtsideview_fanview_viewer_id";
  try {
    const existing = sessionStorage.getItem(key);
    if (existing) return existing;
    const created =
      crypto.randomUUID?.().replace(/-/g, "") ??
      `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    sessionStorage.setItem(key, created);
    return created;
  } catch {
    return `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
  }
};

const youtubeId = (input?: string): string | null => {
  const value = input?.trim() ?? "";
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  return (
    value.match(
      /(?:youtube\.com\/(?:watch\?v=|live\/|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
    )?.[1] ?? null
  );
};

function useViewerPresence(
  enabled: boolean,
  liveWorkerUrl: string,
  shareId: string,
) {
  useEffect(() => {
    if (!enabled) return;
    const id = viewerId();
    let active = true;
    const endpoint = `${liveWorkerUrl}/presence/${encodeURIComponent(shareId)}`;
    const send = (method: "POST" | "DELETE", keepalive = false) => {
      if (!active && method === "POST") return;
      void viewerFetch(endpoint, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ viewerId: id }),
        cache: "no-store",
        keepalive,
      }).catch(() => undefined);
    };
    send("POST");
    const timer = window.setInterval(() => send("POST"), 30_000);
    const pageHide = () => send("DELETE", true);
    window.addEventListener("pagehide", pageHide);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("pagehide", pageHide);
      send("DELETE", true);
    };
  }, [enabled, liveWorkerUrl, shareId]);
}

const documentFullscreenElement = (): Element | null =>
  document.fullscreenElement ||
  (document as Document & { webkitFullscreenElement?: Element | null }).webkitFullscreenElement || null;

const supportsPictureInPicture = (video: SafariVideoElement): boolean =>
  Boolean(
    (document.pictureInPictureEnabled &&
      typeof video.requestPictureInPicture === "function") ||
      (video.webkitSupportsPresentationMode?.("picture-in-picture") &&
        video.webkitSetPresentationMode),
  );

async function togglePictureInPicture(
  video: SafariVideoElement,
): Promise<boolean> {
  if (document.pictureInPictureElement === video) {
    await document.exitPictureInPicture();
    return document.pictureInPictureElement === video;
  }
  if (video.webkitPresentationMode === "picture-in-picture") {
    video.webkitSetPresentationMode?.("inline");
    return (video as SafariVideoElement).webkitPresentationMode === "picture-in-picture";
  }
  if (
    document.pictureInPictureEnabled &&
    typeof video.requestPictureInPicture === "function"
  ) {
    await video.requestPictureInPicture();
    return document.pictureInPictureElement === video;
  }
  if (
    video.webkitSupportsPresentationMode?.("picture-in-picture") &&
    video.webkitSetPresentationMode
  ) {
    video.webkitSetPresentationMode("picture-in-picture");
    return (video as SafariVideoElement).webkitPresentationMode === "picture-in-picture";
  }
  return false;
}


function CloudflareVideo({
  displayMenuOpen,
  liveWorkerUrl,
  match,
  onDisplayToggle,
  onVideoConfirmed,
  rotation,
  scoreboardLayout,
  scoreboardPosition,
  scoreboardSize,
  shareId,
  viewerCount,
}: Omit<Props, "media"> & { rotation?: FanViewMedia["rotation"] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const presentationCanvasRef = useRef<HTMLCanvasElement>(null);
  const presentationVideoRef = useRef<HTMLVideoElement>(null);
  const presentationCleanupRef = useRef<(() => void) | null>(null);
  const presentationStreamRef = useRef<PresentationStream | null>(null);
  const [presentationActive, setPresentationActive] = useState(false);
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const fullscreenPendingRef = useRef(false);
  const fullscreenTimeoutRef = useRef<number | undefined>(undefined);
  const cancelFullscreenPreparationRef = useRef<(() => void) | null>(null);
  const [fullscreenPending, setFullscreenPending] = useState(false);
  const [fullscreenNotice, setFullscreenNotice] = useState("");
  const fullscreenModeRef = useRef<
    "none" | "document" | "presentation"
  >("none");
  const matchRef = useRef(match);
  const rotationRef = useRef(rotation);
  const viewerCountRef = useRef(viewerCount);
  const scoreboardLayoutRef = useRef(scoreboardLayout);
  const scoreboardPositionRef = useRef(scoreboardPosition);
  const scoreboardSizeRef = useRef(scoreboardSize);
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(true);
  mutedRef.current = muted;
  const [playbackPaused, setPlaybackPaused] = useState(true);
  const [needsPlaybackGesture, setNeedsPlaybackGesture] = useState(false);
  const playbackGestureRef = useRef(false);
  const playbackAttemptRef = useRef(0);
  const [status, setStatus] = useState("Waiting for broadcaster");
  useEffect(() => {
    onVideoConfirmed?.(!status && !playbackPaused);
    return () => onVideoConfirmed?.(false);
  }, [status, playbackPaused, onVideoConfirmed]);
  const [fullscreenMode, setFullscreenMode] = useState<
    "none" | "document" | "presentation"
  >("none");
  const [pictureInPictureAvailable, setPictureInPictureAvailable] =
    useState(false);
  const [floating, setFloating] = useState(false);
  const floatingRef = useRef(false);
  floatingRef.current = floating;
  const fullscreen = fullscreenMode !== "none";
  const visualQa =
    shareId === "fanview-spa-fixture" &&
    (window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost");
  fullscreenModeRef.current = fullscreenMode;
  matchRef.current = match;
  rotationRef.current = rotation;
  viewerCountRef.current = viewerCount;
  scoreboardLayoutRef.current = scoreboardLayout;
  scoreboardPositionRef.current = scoreboardPosition;
  scoreboardSizeRef.current = scoreboardSize;

  useViewerPresence(!visualQa, liveWorkerUrl, shareId);

  const resumeVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !video.srcObject) return;
    const source = video.srcObject;
    const attempt = ++playbackAttemptRef.current;
    const isCurrent = () => videoRef.current === video && video.srcObject === source && playbackAttemptRef.current === attempt;
    const playing = () => {
      if (!isCurrent()) return;
      playbackGestureRef.current = false;
      setNeedsPlaybackGesture(false);
      setPlaybackPaused(false);
    };
    try {
      await video.play();
      playing();
    } catch {
      if (!isCurrent()) return;
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
        playing();
      } catch {
        if (!isCurrent()) return;
        playbackGestureRef.current = true;
        setNeedsPlaybackGesture(true);
        setPlaybackPaused(true);
      }
    }
  }, []);

  useEffect(() => {
    if (visualQa) {
      setStatus("");
      setPlaybackPaused(false);
      setPictureInPictureAvailable(true);
      return;
    }
    let active = true;
    let peer: RTCPeerConnection | null = null;
    let retry: number | undefined;
    let watchdog: number | undefined;
    let disposeCurrent: (() => void) | undefined;

    const connect = async () => {
      if (!active || !videoRef.current) return;
      window.clearTimeout(retry);
      window.clearInterval(watchdog);
      disposeCurrent?.();
      const candidate = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.cloudflare.com:3478" }],
        bundlePolicy: "max-bundle",
      });
      peer = candidate;
      const controller = new AbortController();
      let disposed = false;
      let sessionUrl: string | null = null;
      let sessionReleased = false;
      let negotiationTimeout: number | undefined;
      let frameCallback: number | undefined;
      let renderedFrames = 0;
      let frameCallbackSupported = typeof videoRef.current.requestVideoFrameCallback === "function";
      let lastRenderedFrames = 0;
      let decodedFrameSample = new Map<string, number>();
      let frameCheckPending = false;
      let frameStatsTimeout: number | undefined;
      let cancelFrameStats: (() => void) | undefined;
      let hasVideoProgress = false;
      let negotiatedReady = false;
      const video = videoRef.current;
      const isCurrent = () => active && !disposed && peer === candidate;
      const dispose = () => {
        disposed = true;
        window.clearTimeout(negotiationTimeout);
        cancelFrameStats?.();
        if (frameCallback !== undefined) video.cancelVideoFrameCallback?.(frameCallback);
        controller.abort();
        candidate.close();
        if (sessionUrl && !sessionReleased) {
          sessionReleased = true;
          void viewerFetch(sessionUrl, { method: "DELETE", keepalive: true }).catch(() => {});
        }
      };
      disposeCurrent = dispose;
      const stream = new MediaStream();
      video.srcObject = stream;
      setStatus("Waiting for broadcaster");
      let lastProgressAt = Date.now();

      const reconnect = () => {
        if (!isCurrent()) return;
        window.clearInterval(watchdog);
        dispose();
        setStatus("Reconnecting video");
        window.clearTimeout(retry);
        retry = window.setTimeout(
          () => void connect(),
          VIDEO_RECONNECT_DELAY_MS,
        );
      };
      // A connected transport, audio track, or advancing media clock can all
      // coexist with a black video. Keep the recovery surface until real video
      // frames arrive, then keep checking them across camera replacements.
      const confirmVideoProgress = () => {
        if (!isCurrent() || !negotiatedReady || candidate.connectionState !== "connected" || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;
        lastProgressAt = Date.now();
        hasVideoProgress = true;
        setStatus("");
      };
      const presentedFrames = (): number | null => {
        try {
          const quality = video.getVideoPlaybackQuality?.();
          if (quality && Number.isFinite(quality.totalVideoFrames) && Number.isFinite(quality.droppedVideoFrames)) {
            return Math.max(0, quality.totalVideoFrames - quality.droppedVideoFrames);
          }
        } catch { /* Fall through to bounded decoded-video stats. */ }
        return null;
      };
      const decodedVideoAdvanced = async (): Promise<boolean> => {
        if (typeof candidate.getStats !== "function") return false;
        let stats: RTCStatsReport;
        try {
          stats = await Promise.race([
            candidate.getStats(),
            new Promise<never>((_, reject) => {
              cancelFrameStats = () => reject(new Error("Video session changed"));
              frameStatsTimeout = window.setTimeout(() => reject(new Error("Video stats timed out")), 2_000);
            }),
          ]);
        } finally { window.clearTimeout(frameStatsTimeout); cancelFrameStats = undefined; }
        if (!isCurrent()) return false;
        const next = new Map<string, number>();
        stats.forEach((item) => {
          if (item.type !== "inbound-rtp" || (item.kind !== "video" && item.mediaType !== "video") || !Number.isFinite(item.framesDecoded) || item.framesDecoded < 0) return;
          next.set(`${item.id}:${item.ssrc ?? ""}`, item.framesDecoded);
        });
        const advanced = [...next].some(([id, frames]) => decodedFrameSample.has(id) && frames > decodedFrameSample.get(id)!);
        decodedFrameSample = next;
        return advanced;
      };
      const onVideoFrame = () => {
        if (!isCurrent()) return;
        renderedFrames += 1;
        confirmVideoProgress();
        try { frameCallback = video.requestVideoFrameCallback(onVideoFrame); }
        catch { frameCallbackSupported = false; }
      };
      if (frameCallbackSupported) {
        try { frameCallback = video.requestVideoFrameCallback(onVideoFrame); }
        catch { frameCallbackSupported = false; }
      }
      lastRenderedFrames = frameCallbackSupported ? 0 : presentedFrames() ?? 0;
      negotiationTimeout = window.setTimeout(reconnect, VIDEO_NEGOTIATION_TIMEOUT_MS);
      candidate.addEventListener("track", ({ track }) => {
        if (!isCurrent()) return;
        stream.addTrack(track);
        void resumeVideo();
        track.addEventListener("ended", reconnect, { once: true });
      });
      candidate.addEventListener("connectionstatechange", () => {
        if (!isCurrent()) return;
        if (
          candidate.connectionState === "failed" ||
          candidate.connectionState === "disconnected"
        ) {
          reconnect();
        }
      });

      try {
        const response = await viewerFetch(
          `${liveWorkerUrl}/play/${encodeURIComponent(shareId)}`,
          { method: "POST", headers: { "content-type": "application/sdp" }, signal: controller.signal },
        );
        if (!response.ok) throw new Error("viewer unavailable");
        const location = response.headers.get("location");
        if (!location) throw new Error("viewer session unavailable");
        const locationUrl = new URL(location, liveWorkerUrl);
        const expectedPath = `/play/${encodeURIComponent(shareId)}/`;
        if (locationUrl.origin !== new URL(liveWorkerUrl).origin ||
            !locationUrl.pathname.startsWith(expectedPath) ||
            !/^[A-Za-z0-9_-]+$/.test(locationUrl.pathname.slice(expectedPath.length)) ||
            locationUrl.search || locationUrl.hash) throw new Error("invalid viewer session");
        sessionUrl = locationUrl.href;
        if (!isCurrent()) { dispose(); return; }
        const offer = await response.text();
        if (!isCurrent()) { dispose(); return; }
        await candidate.setRemoteDescription({ type: "offer", sdp: offer });
        if (!isCurrent()) { dispose(); return; }
        const answer = await candidate.createAnswer();
        if (!isCurrent()) { dispose(); return; }
        await candidate.setLocalDescription(answer);
        if (!isCurrent()) { dispose(); return; }
        const negotiated = await viewerFetch(sessionUrl, {
          method: "PATCH",
          headers: { "content-type": "application/sdp" },
          body: answer.sdp ?? "",
          signal: controller.signal,
        });
        if (!isCurrent()) { dispose(); return; }
        if (!negotiated.ok) throw new Error("viewer negotiation failed");
        negotiatedReady = true;
        lastProgressAt = Date.now();
        window.clearTimeout(negotiationTimeout);
        if (!hasVideoProgress) setStatus("Connecting video");
        void resumeVideo();
        watchdog = window.setInterval(() => {
          if (!isCurrent() || frameCheckPending) return;
          // A blocked autoplay needs a tap, not a new session. Background tabs
          // may stop presenting frames and must not cause reconnection churn.
          if (document.visibilityState === "hidden" || playbackGestureRef.current) { lastProgressAt = Date.now(); return; }
          frameCheckPending = true;
          void (async () => {
            try {
              const frames = frameCallbackSupported ? renderedFrames : presentedFrames();
              if (frames !== null) {
                if (frames > lastRenderedFrames) confirmVideoProgress();
                lastRenderedFrames = frames;
              } else if (await decodedVideoAdvanced()) {
                confirmVideoProgress();
              }
            } catch { /* Missing video evidence stays on the recovery surface. */ }
            finally { frameCheckPending = false; }
            if (!isCurrent() || document.visibilityState === "hidden" || playbackGestureRef.current) return;
            const frameDeadline = hasVideoProgress ? VIDEO_STALL_RECONNECT_MS : VIDEO_FIRST_FRAME_TIMEOUT_MS;
            if (Date.now() - lastProgressAt >= frameDeadline) reconnect();
          })();
        }, VIDEO_STALL_CHECK_MS);
      } catch {
        if (isCurrent()) reconnect();
        else dispose();
      }
    };

    void connect();
    return () => {
      active = false;
      window.clearTimeout(retry);
      window.clearInterval(watchdog);
      disposeCurrent?.();
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [liveWorkerUrl, resumeVideo, shareId, visualQa]);

  useEffect(() => {
    const resumeWhenVisible = () => {
      if (document.visibilityState === "hidden") return;
      void resumeVideo();
    };
    window.addEventListener("pageshow", resumeWhenVisible);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    return () => {
      window.removeEventListener("pageshow", resumeWhenVisible);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, [resumeVideo]);

  const stopPresentation = useCallback(() => {
    presentationCleanupRef.current?.();
    presentationCleanupRef.current = null;
    presentationStreamRef.current = null;
  }, []);

  const startPresentation = useCallback((prepareOnly = false): PresentationStream | null => {
    const source = videoRef.current;
    const canvas = presentationCanvasRef.current;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    const stage = frameRef.current?.closest<HTMLElement>(".match-stage");
    if (!source || !canvas || !presentation || !stage) return null;
    if (typeof canvas.captureStream !== "function") return null;
    const prepared = presentationStreamRef.current;
    if (prepared && prepared.source === source.srcObject && presentation.srcObject) {
      if (!prepareOnly) prepared.activate();
      return prepared;
    }
    stopPresentation();
    const resizeCanvas = () => {
      const bounds = stage.getBoundingClientRect();
      const stageWidth = Math.max(1, bounds.width || window.innerWidth);
      const stageHeight = Math.max(1, bounds.height || window.innerHeight);
      if (stageWidth >= stageHeight) {
        canvas.width = 1280;
        canvas.height = Math.max(
          360,
          Math.round((1280 * stageHeight) / stageWidth),
        );
      } else {
        canvas.height = 1280;
        canvas.width = Math.max(
          360,
          Math.round((1280 * stageWidth) / stageHeight),
        );
      }

    };
    resizeCanvas();
    let active = true;
    let activated = false;
    let safetyDraw: number | undefined;
    let frameRequest: number | null = null;
    let lastDrawAt = 0;
    const frameSource = source as HTMLVideoElement & {
      cancelVideoFrameCallback?: (request: number) => void;
      requestVideoFrameCallback?: (
        callback: (now: DOMHighResTimeStamp) => void,
      ) => number;
    };
    const draw = () => {
      if (!active) return;
      if (activated) syncAudioTracks();
      drawPresentationFrame(
        canvas,
        source,
        rotationRef.current,
        matchRef.current,
        viewerCountRef.current,
        scoreboardLayoutRef.current,
        scoreboardPositionRef.current,
        scoreboardSizeRef.current,
      );
      lastDrawAt = performance.now();
    };
    const drawNextVideoFrame = () => {
      if (!active || !frameSource.requestVideoFrameCallback) return;
      frameRequest = frameSource.requestVideoFrameCallback(() => {
        draw();
        drawNextVideoFrame();
      });
    };
    // One muted frame primes Safari metadata. Continuous drawing and audio
    // begin only when the viewer asks for fullscreen or Float.
    const stream = canvas.captureStream(30);
    const captureTrack = stream.getVideoTracks?.()[0] as CanvasCaptureMediaStreamTrack | undefined;
    const refreshFrame = () => {
      // Engines without a usable manual request still capture regular paints.
      try { captureTrack?.requestFrame?.(); } catch { /* Draw below. */ }
      draw();
    };
    let sourceAudioTracks: MediaStreamTrack[] = [];
    let clonedAudioTracks: MediaStreamTrack[] = [];
    const syncAudioTracks = () => {
      const sourceStream = source.srcObject instanceof MediaStream ? source.srcObject : null;
      const tracks = sourceStream?.getAudioTracks() ?? [];
      if (tracks.length === sourceAudioTracks.length && tracks.every((track, index) => track === sourceAudioTracks[index])) return;
      clonedAudioTracks.forEach(track => { stream.removeTrack(track); track.stop(); });
      sourceAudioTracks = tracks;
      clonedAudioTracks = tracks.map(track => track.clone());
      clonedAudioTracks.forEach(track => stream.addTrack(track));
      presentation.muted = mutedRef.current || clonedAudioTracks.length === 0;
    };
    presentation.srcObject = stream;
    presentation.muted = true;
    presentation.volume = 1;
    // Capture must exist before the priming paint. Safari does not have to
    // deliver a canvas frame that was drawn before captureStream was created.
    const activate = () => {
      if (!active || activated) return;
      activated = true;
      setPresentationActive(true);
      syncAudioTracks();
      presentation.muted = mutedRef.current || stream.getAudioTracks().length === 0;
      source.muted = true;
      resizeCanvas();
      draw();
      drawNextVideoFrame();
      safetyDraw = window.setInterval(() => {
        if (performance.now() - lastDrawAt >= 220) draw();
      }, 250);
      window.addEventListener("resize", resizeCanvas);
      void presentation.play().catch(() => undefined);
    };

    const cleanup = () => {
      if (!active) return;
      active = false;
      if (activated) setPresentationActive(false);
      window.clearInterval(safetyDraw);
      window.removeEventListener("resize", resizeCanvas);
      if (
        frameRequest !== null &&
        frameSource.cancelVideoFrameCallback
      ) {
        frameSource.cancelVideoFrameCallback(frameRequest);
      }
      stream.getTracks().forEach((track) => track.stop());
      if (activated) source.muted = mutedRef.current;
      if (presentation.srcObject === stream) {
        presentation.pause();
        presentation.srcObject = null;
      }
    };
    presentationCleanupRef.current = cleanup;
    const result = { cleanup, video: presentation, source: source.srcObject, refreshFrame, activate, isActive: () => activated };
    presentationStreamRef.current = result;
    try {
      refreshFrame();
      void presentation.play().catch(() => undefined);
    } catch (error) {
      stopPresentation();
      throw error;
    }
    if (!prepareOnly) activate();
    return result;
  }, [stopPresentation]);

  useEffect(() => {
    const source = videoRef.current;
    const presentation = presentationVideoRef.current as SafariVideoElement | null;
    const documentApi = document.fullscreenEnabled || (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled;
    const needsNativeFullscreen = !documentApi && presentation?.webkitEnterFullscreen;
    const needsRotatedFloat = Boolean(rotation && presentation && supportsPictureInPicture(presentation));
    if (!source || !presentation || (!needsNativeFullscreen && !needsRotatedFloat)) return;
    const prepare = () => {
      if (document.visibilityState === "hidden" || source.readyState < 2 || !source.videoWidth || !source.srcObject) return;
      if (presentationStreamRef.current?.isActive()) return;
      if (fullscreenModeRef.current === "none") {
        try { startPresentation(true); } catch { /* Fullscreen keeps a retry path. */ }
      }
    };
    source.addEventListener("loadeddata", prepare);
    source.addEventListener("playing", prepare);
    document.addEventListener("visibilitychange", prepare);
    prepare();
    return () => {
      source.removeEventListener("loadeddata", prepare);
      source.removeEventListener("playing", prepare);
      document.removeEventListener("visibilitychange", prepare);
    };
  }, [rotation, startPresentation]);

  useEffect(() => {
    const video = videoRef.current as SafariVideoElement | null;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    const stage = frameRef.current?.closest<HTMLElement>(".match-stage");
    const finishRequest = () => {
      cancelFullscreenPreparationRef.current?.();
      window.clearTimeout(fullscreenTimeoutRef.current);
      fullscreenPendingRef.current = false;
      setFullscreenPending(false);
      setFullscreenNotice("");
    };
    const changed = () => {
      if (documentFullscreenElement() === stage) {
        finishRequest();
        setFullscreenMode("document");
      } else if (!presentation?.webkitDisplayingFullscreen) {
        const wasFullscreen = fullscreenModeRef.current !== "none";
        setFullscreenMode("none");
        if (wasFullscreen) { finishRequest(); fullscreenButtonRef.current?.focus({ preventScroll: true }); }
      }
    };
    const beganVideoFullscreen = () => { finishRequest(); setFullscreenMode("presentation"); };
    const presentationIsFloating = () =>
      document.pictureInPictureElement === presentation ||
      presentation?.webkitPresentationMode === "picture-in-picture";
    const presentationIsFullscreen = () => Boolean(
      presentation?.webkitDisplayingFullscreen ||
      presentation?.webkitPresentationMode === "fullscreen",
    );
    const releaseInlinePresentation = () => {
      if (presentationIsFloating() || presentationIsFullscreen()) return;
      stopPresentation();
      void resumeVideo();
    };
    const endedVideoFullscreen = () => {
      finishRequest();
      setFullscreenMode("none");
      // Safari can leave fullscreen by moving the same video into PiP. Do
      // not stop the captured track while the OS player still owns it.
      if (presentationIsFloating()) {
        floatingRef.current = true;
        setFloating(true);
        return;
      }
      releaseInlinePresentation();
      fullscreenButtonRef.current?.focus({ preventScroll: true });
      // Re-prime a single frame for the next explicit fullscreen tap.
      try { startPresentation(true); } catch { /* Retry is still available. */ }
    };
    const enteredPictureInPicture = () => setFloating(true);
    const leftPictureInPicture = () => {
      floatingRef.current = false;
      setFloating(false);
      if (presentationIsFullscreen()) {
        finishRequest();
        setFullscreenMode("presentation");
        return;
      }
      releaseInlinePresentation();
    };
    const presentationModeChanged = () => {
      const floatingNow = video?.webkitPresentationMode === "picture-in-picture" || presentation?.webkitPresentationMode === "picture-in-picture";
      const wasFloating = floatingRef.current;
      floatingRef.current = floatingNow;
      setFloating(floatingNow);
      if (presentationIsFullscreen()) {
        finishRequest();
        setFullscreenMode("presentation");
      } else if (wasFloating && !floatingNow) {
        releaseInlinePresentation();
      }
    };
    const updatePictureInPictureAvailability = () =>
      setPictureInPictureAvailable(
        Boolean(
          video &&
            (rotation
              ? typeof presentationCanvasRef.current?.captureStream ===
                  "function" &&
                Boolean(
                  presentation && supportsPictureInPicture(presentation),
                )
              : supportsPictureInPicture(video)),
        ),
      );
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("webkitfullscreenchange", changed);
    video?.addEventListener("loadedmetadata", updatePictureInPictureAvailability);
    presentation?.addEventListener(
      "webkitbeginfullscreen",
      beganVideoFullscreen,
    );
    presentation?.addEventListener(
      "webkitendfullscreen",
      endedVideoFullscreen,
    );
    video?.addEventListener("enterpictureinpicture", enteredPictureInPicture);
    video?.addEventListener("leavepictureinpicture", leftPictureInPicture);
    video?.addEventListener(
      "webkitpresentationmodechanged",
      presentationModeChanged,
    );
    presentation?.addEventListener(
      "enterpictureinpicture",
      enteredPictureInPicture,
    );
    presentation?.addEventListener(
      "leavepictureinpicture",
      leftPictureInPicture,
    );
    presentation?.addEventListener(
      "webkitpresentationmodechanged",
      presentationModeChanged,
    );
    updatePictureInPictureAvailability();
    return () => {
      cancelFullscreenPreparationRef.current?.();
      document.removeEventListener("fullscreenchange", changed);
      document.removeEventListener("webkitfullscreenchange", changed);
      video?.removeEventListener(
        "loadedmetadata",
        updatePictureInPictureAvailability,
      );
      presentation?.removeEventListener(
        "webkitbeginfullscreen",
        beganVideoFullscreen,
      );
      presentation?.removeEventListener(
        "webkitendfullscreen",
        endedVideoFullscreen,
      );
      video?.removeEventListener(
        "enterpictureinpicture",
        enteredPictureInPicture,
      );
      video?.removeEventListener(
        "leavepictureinpicture",
        leftPictureInPicture,
      );
      video?.removeEventListener(
        "webkitpresentationmodechanged",
        presentationModeChanged,
      );
      presentation?.removeEventListener(
        "enterpictureinpicture",
        enteredPictureInPicture,
      );
      presentation?.removeEventListener(
        "leavepictureinpicture",
        leftPictureInPicture,
      );
      presentation?.removeEventListener(
        "webkitpresentationmodechanged",
        presentationModeChanged,
      );
      window.clearTimeout(fullscreenTimeoutRef.current);
      stopPresentation();
    };
  }, [resumeVideo, startPresentation, stopPresentation]);

  const toggleMute = async () => {
    const video = videoRef.current;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    if (!video) return;
    const source = video.srcObject;
    const attempt = ++playbackAttemptRef.current;
    const isCurrent = () => videoRef.current === video && video.srcObject === source && playbackAttemptRef.current === attempt;
    const nextMuted = !muted;
    const presenting = presentationStreamRef.current?.isActive() === true;
    video.muted = presenting ? true : nextMuted;
    video.volume = 1;
    if (presenting && presentation?.srcObject) {
      presentation.muted = nextMuted;
      presentation.volume = 1;
    }
    setMuted(nextMuted);
    if (nextMuted) return;
    try {
      await (presenting && presentation ? presentation : video).play();
      if (!isCurrent()) return;
      setMuted(false);
    } catch {
      if (!isCurrent()) return;
      video.muted = true;
      if (presentation) presentation.muted = true;
      setMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const stage = frameRef.current?.closest<HTMLElement>(".match-stage");
    const presentation = presentationVideoRef.current as SafariVideoElement | null;
    if (!stage || !presentation || fullscreenPendingRef.current) return;
    setFullscreenNotice("");
    const fail = (message = "Full screen couldn’t open. Try again.", keepPreparation = false) => {
      window.clearTimeout(fullscreenTimeoutRef.current);
      fullscreenPendingRef.current = false;
      setFullscreenPending(false);
      setFullscreenNotice(message);
      if (!keepPreparation && fullscreenModeRef.current === "none" && !presentation.webkitDisplayingFullscreen) {
        stopPresentation();
        // A rejected request must not leave a compositor or a muted source running.
        if (presentation.webkitEnterFullscreen && videoRef.current?.srcObject) {
          try { startPresentation(true); } catch { /* The next tap can retry. */ }
        }
      }
    };
    const pending = () => {
      fullscreenPendingRef.current = true;
      setFullscreenPending(true);
      fullscreenTimeoutRef.current = window.setTimeout(() => {
        const active = documentFullscreenElement() === stage || Boolean(presentation.webkitDisplayingFullscreen);
        if (active !== fullscreen) {
          fullscreenPendingRef.current = false; setFullscreenPending(false);
          setFullscreenMode(active ? (documentFullscreenElement() === stage ? "document" : "presentation") : "none");
          if (!active) {
            stopPresentation();
            void resumeVideo();
            fullscreenButtonRef.current?.focus({ preventScroll: true });
          }
          return;
        }
        fail(fullscreen ? "Full screen couldn’t close. Try again." : undefined);
      }, 1_500);
    };
    if (fullscreen) {
      pending();
      try {
        if (presentation.webkitDisplayingFullscreen && presentation.webkitExitFullscreen) {
          presentation.webkitExitFullscreen();
        } else if (document.fullscreenElement === stage && document.exitFullscreen) {
          void document.exitFullscreen().catch(() => fail("Full screen couldn’t close. Try again."));
        } else {
          const exit = (document as Document & { webkitExitFullscreen?: () => void }).webkitExitFullscreen;
          if (exit) exit.call(document); else fail("Full screen couldn’t close. Try again.");
        }
      } catch { fail("Full screen couldn’t close. Try again."); }
      return;
    }
    // iPhone requires a metadata-ready video and a direct user gesture. Do not
    // await a rejected element request before invoking its native video API.
    const elementFullscreenEnabled = document.fullscreenEnabled ||
      (document as Document & { webkitFullscreenEnabled?: boolean }).webkitFullscreenEnabled;
    if (!elementFullscreenEnabled && presentation.webkitEnterFullscreen) {
      const source = videoRef.current;
      if (!source?.srcObject || source.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !source.videoWidth) {
        fail("Wait for live video to start, then tap Full screen.", true);
        return;
      }
      let stream: PresentationStream | null = null;
      try { stream = startPresentation(true); } catch { fail(); return; }
      if (!stream) {
        fail("Full screen isn’t supported in this browser.", true); return;
      }
      if (stream.video.readyState < HTMLMediaElement.HAVE_METADATA) {
        const preparing = stream;
        fullscreenPendingRef.current = true;
        setFullscreenPending(true);
        setFullscreenNotice("Preparing full screen…");
        let frameTimer: number | undefined;
        let deadline: number | undefined;
        const isCurrent = () =>
          presentationStreamRef.current === preparing && source.srcObject === preparing.source;
        const cleanup = () => {
          window.clearInterval(frameTimer);
          window.clearTimeout(deadline);
          preparing.video.removeEventListener("loadedmetadata", ready);
          document.removeEventListener("visibilitychange", visibilityChanged);
          window.removeEventListener("pagehide", interrupted);
          cancelFullscreenPreparationRef.current = null;
          fullscreenPendingRef.current = false;
        };
        const finish = (message: string, keepStream = false) => {
          if (cancelFullscreenPreparationRef.current !== cleanup) return;
          cleanup();
          if (!keepStream && presentationStreamRef.current === preparing) stopPresentation();
          setFullscreenPending(false);
          setFullscreenNotice(message);
        };
        const interrupted = () => finish("");
        const visibilityChanged = () => {
          if (document.visibilityState === "hidden") interrupted();
        };
        const ready = () => {
          if (!isCurrent()) { interrupted(); return; }
          if (preparing.video.readyState < HTMLMediaElement.HAVE_METADATA) return;
          const supported = preparing.video.webkitSupportsFullscreen !== false;
          finish(supported ? "Full screen is ready. Tap Full screen." : "Full screen isn’t supported in this browser.", supported);
        };
        const refresh = () => {
          if (!isCurrent()) { interrupted(); return; }
          if (preparing.video.readyState >= HTMLMediaElement.HAVE_METADATA) { ready(); return; }
          try { preparing.refreshFrame(); } catch { finish("Full screen couldn’t open. Keep watching here or try again."); }
        };
        cancelFullscreenPreparationRef.current = cleanup;
        preparing.video.addEventListener("loadedmetadata", ready);
        document.addEventListener("visibilitychange", visibilityChanged);
        window.addEventListener("pagehide", interrupted);
        frameTimer = window.setInterval(refresh, FULLSCREEN_PREPARATION_FRAME_MS);
        deadline = window.setTimeout(() => {
          finish("Full screen couldn’t open. Keep watching here or try again.");
        }, FULLSCREEN_PREPARATION_TIMEOUT_MS);
        // Retry playback in the gesture and keep producing fresh muted frames
        // until this video reports metadata. Opening fullscreen needs a new tap.
        void preparing.video.play().catch(() => undefined);
        refresh();
        return;
      }
      if (stream.video.webkitSupportsFullscreen === false) {
        fail("Full screen isn’t supported in this browser.", true); return;
      }
      pending();
      try {
        stream.activate();
        stream.video.webkitEnterFullscreen?.();
      } catch { fail(); stopPresentation(); }
      return;
    }
    pending();
    try {
      if (stage.requestFullscreen) {
        void stage.requestFullscreen().catch(() => fail());
      } else {
        const request = (stage as HTMLElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen;
        if (request) request.call(stage); else fail("Full screen isn’t supported in this browser.");
      }
    } catch { fail(); }
  };

  const toggleFloatingVideo = async () => {
    const source = videoRef.current as SafariVideoElement | null;
    if (!source) return;
    // Float can take ownership of the same prepared video. Its stream must
    // not be stopped later by an abandoned fullscreen preparation timeout.
    if (cancelFullscreenPreparationRef.current) {
      cancelFullscreenPreparationRef.current();
      setFullscreenPending(false);
      setFullscreenNotice("");
    }
    try {
      if (floating) {
        const active =
          document.pictureInPictureElement === presentationVideoRef.current ||
          (
            presentationVideoRef.current as SafariVideoElement | null
          )?.webkitPresentationMode === "picture-in-picture";
        const target = active
          ? (presentationVideoRef.current as SafariVideoElement)
          : source;
        const remainsFloating = await togglePictureInPicture(target);
        setFloating(remainsFloating);
        if (!remainsFloating) stopPresentation();
        return;
      }
      const prepared = rotation ? startPresentation(true) : null;
      const target = rotation ? prepared?.video : source;
      if (!target) return;
      if (target.readyState < 2) {
        setFullscreenNotice("Video is getting ready. Try Float again.");
        return;
      }
      prepared?.activate();
      if (target === source && source.srcObject instanceof MediaStream) {
        // Moving video into PiP must not opt a muted viewer into audio.
        source.muted = mutedRef.current;
        source.volume = 1;
        void source.play().catch(() => undefined);
      }
      setFloating(await togglePictureInPicture(target));
    } catch {
      setFloating(false);
      stopPresentation();
    }
  };

  return (
    <div
      className="live-media"
      data-fullscreen-mode={fullscreenMode}
      ref={frameRef}
    >
      <video
        autoPlay
        className="live-media__video"
        controls={false}
        data-rotation={rotation}
        muted={muted || presentationActive}
        onPause={() => setPlaybackPaused(true)}
        onPlaying={() => setPlaybackPaused(false)}
        playsInline
        ref={videoRef}
      />
      <canvas
        aria-hidden="true"
        className="live-media__presentation-canvas"
        ref={presentationCanvasRef}
      />
      <video
        aria-hidden="true"
        className="live-media__presentation-video"
        muted
        playsInline
        ref={presentationVideoRef}
      />
      {playbackPaused && (!status || needsPlaybackGesture) ? (
        <button
          aria-label="Play live video"
          className="live-media__play"
          onClick={() => void resumeVideo()}
          type="button"
        >
          <Play aria-hidden="true" size={25} weight="fill" />
        </button>
      ) : null}
      {status && !(playbackPaused && needsPlaybackGesture) ? <div className="live-media__status">{status}</div> : null}
      {fullscreenNotice ? <div className="live-media__fullscreen-notice" role="status">{fullscreenNotice}</div> : null}
      <div className="media-controls" aria-label="Video controls">
        <button
          aria-label={muted ? "Turn on live audio" : "Mute live audio"}
          aria-pressed={!muted}
          className="media-control media-control--sound"
          onClick={() => void toggleMute()}
          type="button"
        >
          {muted ? (
            <SpeakerSlash aria-hidden="true" size={18} weight="bold" />
          ) : (
            <SpeakerHigh aria-hidden="true" size={18} weight="bold" />
          )}
          <span className="media-control__label">{muted ? "Muted" : "Sound on"}</span>
        </button>
        <button
          aria-label={floating ? "Return floating video" : "Float live video"}
          aria-pressed={floating}
          className="media-control media-control--pip"
          disabled={!pictureInPictureAvailable}
          onClick={() => void toggleFloatingVideo()}
          type="button"
        >
          <PictureInPicture aria-hidden="true" size={18} weight="bold" />
          <span className="media-control__label">
            {"Float"}
          </span>
        </button>
        <button
          aria-expanded={displayMenuOpen}
          aria-label="Scoreboard display"
          className="media-control media-control--display"
          data-scoreboard-display-trigger
          onClick={onDisplayToggle}
          type="button"
        >
          <SlidersHorizontal aria-hidden="true" size={19} weight="bold" />
          <span className="media-control__label">Display</span>
        </button>
        <button
          aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
          aria-pressed={fullscreen}
          className="media-control media-control--fullscreen"
          aria-busy={fullscreenPending}
          ref={fullscreenButtonRef}
          onClick={() => void toggleFullscreen()}
          type="button"
        >
          {fullscreen ? (
            <ArrowsIn aria-hidden="true" size={19} weight="bold" />
          ) : (
            <ArrowsOut aria-hidden="true" size={19} weight="bold" />
          )}
          <span className="media-control__label">
            {"Full screen"}
          </span>
        </button>
      </div>
    </div>
  );
}

export function LiveMedia({
  displayMenuOpen,
  liveWorkerUrl,
  match,
  media,
  onDisplayToggle,
  onVideoConfirmed,
  scoreboardLayout,
  scoreboardPosition,
  scoreboardSize,
  shareId,
  viewerCount,
}: Props) {
  const id = useMemo(() => youtubeId(media.url), [media.url]);
  if (media.kind === "cloudflare-realtime") {
    return (
      <CloudflareVideo
        displayMenuOpen={displayMenuOpen}
        liveWorkerUrl={liveWorkerUrl}
        match={match}
        onDisplayToggle={onDisplayToggle}
        onVideoConfirmed={onVideoConfirmed}
        rotation={media.rotation}
        scoreboardLayout={scoreboardLayout}
        scoreboardPosition={scoreboardPosition}
        scoreboardSize={scoreboardSize}
        shareId={shareId}
        viewerCount={viewerCount}
      />
    );
  }
  if (media.kind === "youtube" && id) {
    return (
      <iframe
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        aria-label={media.alt}
        className="live-media__iframe"
        src={`https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
        title="CourtsideView live video"
      />
    );
  }
  return null;
}
