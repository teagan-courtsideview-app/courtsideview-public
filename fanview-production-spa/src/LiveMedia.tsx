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
  scoreboardLayout: ScoreboardLayout;
  scoreboardPosition: ScoreboardPosition;
  scoreboardSize: ScoreboardSize;
  shareId: string;
  viewerCount: number;
}

const VIDEO_STALL_CHECK_MS = 2_000;
const VIDEO_STALL_RECONNECT_MS = 6_000;
const VIDEO_RECONNECT_DELAY_MS = 1_500;
const VIDEO_NEGOTIATION_TIMEOUT_MS = 12_000;

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

async function enterStageFullscreen(
  element: HTMLElement,
): Promise<"document" | null> {
  if (element.requestFullscreen) {
    try {
      await element.requestFullscreen();
      return "document";
    } catch {
      // iPhone browsers can expose this API while rejecting non-video elements.
    }
  }
  const request = (
    element as HTMLElement & { webkitRequestFullscreen?: () => void }
  ).webkitRequestFullscreen;
  if (request) {
    try {
      request.call(element);
      return "document";
    } catch {
      // The presentation-video or CSS fallback handles this browser.
    }
  }
  return null;
}

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
    return false;
  }
  if (video.webkitPresentationMode === "picture-in-picture") {
    video.webkitSetPresentationMode?.("inline");
    return false;
  }
  if (
    document.pictureInPictureEnabled &&
    typeof video.requestPictureInPicture === "function"
  ) {
    await video.requestPictureInPicture();
    return true;
  }
  if (
    video.webkitSupportsPresentationMode?.("picture-in-picture") &&
    video.webkitSetPresentationMode
  ) {
    video.webkitSetPresentationMode("picture-in-picture");
    return true;
  }
  return false;
}


function CloudflareVideo({
  displayMenuOpen,
  liveWorkerUrl,
  match,
  onDisplayToggle,
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
  const fullscreenModeRef = useRef<
    "none" | "document" | "presentation" | "css"
  >("none");
  const matchRef = useRef(match);
  const rotationRef = useRef(rotation);
  const viewerCountRef = useRef(viewerCount);
  const scoreboardLayoutRef = useRef(scoreboardLayout);
  const scoreboardPositionRef = useRef(scoreboardPosition);
  const scoreboardSizeRef = useRef(scoreboardSize);
  const [muted, setMuted] = useState(true);
  const [playbackPaused, setPlaybackPaused] = useState(true);
  const [needsPlaybackGesture, setNeedsPlaybackGesture] = useState(false);
  const playbackGestureRef = useRef(false);
  const playbackAttemptRef = useRef(0);
  const [status, setStatus] = useState("Waiting for broadcaster");
  const [fullscreenMode, setFullscreenMode] = useState<
    "none" | "document" | "presentation" | "css"
  >("none");
  const [pictureInPictureAvailable, setPictureInPictureAvailable] =
    useState(false);
  const [floating, setFloating] = useState(false);
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
            if (Date.now() - lastProgressAt >= VIDEO_STALL_RECONNECT_MS) reconnect();
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
  }, []);

  const startPresentation = useCallback((): PresentationStream | null => {
    const source = videoRef.current;
    const canvas = presentationCanvasRef.current;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    const stage = frameRef.current?.closest<HTMLElement>(".match-stage");
    if (!source || !canvas || !presentation || !stage) return null;
    if (typeof canvas.captureStream !== "function") return null;

    stopPresentation();
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

    let active = true;
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
    draw();
    drawNextVideoFrame();
    const safetyDraw = window.setInterval(() => {
      if (performance.now() - lastDrawAt >= 220) draw();
    }, 250);
    const stream = canvas.captureStream(30);
    const sourceStream =
      source.srcObject instanceof MediaStream ? source.srcObject : null;
    sourceStream?.getAudioTracks().forEach((track) => {
      stream.addTrack(track.clone());
    });
    const sourceWasMuted = source.muted;
    presentation.srcObject = stream;
    presentation.muted = stream.getAudioTracks().length === 0;
    presentation.volume = 1;
    source.muted = true;
    void presentation.play().catch(() => undefined);

    const cleanup = () => {
      if (!active) return;
      active = false;
      window.clearInterval(safetyDraw);
      if (
        frameRequest !== null &&
        frameSource.cancelVideoFrameCallback
      ) {
        frameSource.cancelVideoFrameCallback(frameRequest);
      }
      stream.getTracks().forEach((track) => track.stop());
      source.muted = sourceWasMuted;
      setMuted(sourceWasMuted);
      if (presentation.srcObject === stream) {
        presentation.pause();
        presentation.srcObject = null;
      }
    };
    presentationCleanupRef.current = cleanup;
    return { cleanup, video: presentation };
  }, [stopPresentation]);

  useEffect(() => {
    const video = videoRef.current as SafariVideoElement | null;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    const stage = frameRef.current?.closest<HTMLElement>(".match-stage");
    const changed = () => {
      const active =
        document.fullscreenElement ||
        (
          document as Document & {
            webkitFullscreenElement?: Element | null;
          }
        ).webkitFullscreenElement;
      if (
        !active &&
        !presentation?.webkitDisplayingFullscreen &&
        !stage?.classList.contains("is-web-fullscreen")
      ) {
        setFullscreenMode("none");
      }
    };
    const beganVideoFullscreen = () => setFullscreenMode("presentation");
    const endedVideoFullscreen = () => {
      setFullscreenMode("none");
      stopPresentation();
      void resumeVideo();
    };
    const enteredPictureInPicture = () => setFloating(true);
    const leftPictureInPicture = () => {
      setFloating(false);
      stopPresentation();
      void resumeVideo();
    };
    const presentationModeChanged = () =>
      setFloating(
        video?.webkitPresentationMode === "picture-in-picture" ||
          presentation?.webkitPresentationMode === "picture-in-picture",
      );
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
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (stage?.classList.contains("is-web-fullscreen")) {
        stage.classList.remove("is-web-fullscreen");
        document.body.classList.remove("fanview-fullscreen");
        setFullscreenMode("none");
      }
    };
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("webkitfullscreenchange", changed);
    document.addEventListener("keydown", escape);
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
      document.removeEventListener("fullscreenchange", changed);
      document.removeEventListener("webkitfullscreenchange", changed);
      document.removeEventListener("keydown", escape);
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
      stage?.classList.remove("is-web-fullscreen");
      document.body.classList.remove("fanview-fullscreen");
      stopPresentation();
    };
  }, [resumeVideo, stopPresentation]);

  const toggleMute = async () => {
    const video = videoRef.current;
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    if (!video) return;
    const source = video.srcObject;
    const attempt = ++playbackAttemptRef.current;
    const isCurrent = () => videoRef.current === video && video.srcObject === source && playbackAttemptRef.current === attempt;
    const nextMuted = !muted;
    video.muted = nextMuted;
    video.volume = 1;
    if (presentation?.srcObject) {
      presentation.muted = nextMuted;
      presentation.volume = 1;
    }
    setMuted(nextMuted);
    if (nextMuted) return;
    try {
      await video.play();
      if (!isCurrent()) return;
      setMuted(false);
    } catch {
      if (!isCurrent()) return;
      video.muted = true;
      setMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const frame = frameRef.current;
    const stage = frame?.closest<HTMLElement>(".match-stage");
    const presentation =
      presentationVideoRef.current as SafariVideoElement | null;
    if (!frame || !stage || !presentation) return;
    if (fullscreen) {
      if (stage.classList.contains("is-web-fullscreen")) {
        stage.classList.remove("is-web-fullscreen");
        document.body.classList.remove("fanview-fullscreen");
      } else if (
        presentation.webkitDisplayingFullscreen &&
        presentation.webkitExitFullscreen
      ) {
        presentation.webkitExitFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen().catch(() => undefined);
      } else {
        const webkitExit = (
          document as Document & { webkitExitFullscreen?: () => void }
        ).webkitExitFullscreen;
        webkitExit?.call(document);
      }
      setFullscreenMode("none");
      stopPresentation();
      void resumeVideo();
      return;
    }
    const stageMode = await enterStageFullscreen(stage);
    if (stageMode) {
      setFullscreenMode(stageMode);
      return;
    }
    const stream = startPresentation();
    if (
      stream &&
      stream.video.webkitEnterFullscreen &&
      stream.video.webkitSupportsFullscreen !== false
    ) {
      try {
        stream.video.webkitEnterFullscreen();
        window.setTimeout(() => {
          if (stream.video.webkitDisplayingFullscreen) {
            setFullscreenMode("presentation");
            return;
          }
          if (fullscreenModeRef.current !== "none") return;
          stream.cleanup();
          stage.classList.add("is-web-fullscreen");
          document.body.classList.add("fanview-fullscreen");
          setFullscreenMode("css");
        }, 300);
        return;
      } catch {
        stream.cleanup();
      }
    }
    stage.classList.add("is-web-fullscreen");
    document.body.classList.add("fanview-fullscreen");
    setFullscreenMode("css");
  };

  const toggleFloatingVideo = async () => {
    const source = videoRef.current as SafariVideoElement | null;
    if (!source) return;
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
        setFloating(await togglePictureInPicture(target));
        stopPresentation();
        return;
      }
      const target = rotation ? startPresentation()?.video : source;
      if (!target) return;
      if (target === source && source.srcObject instanceof MediaStream) {
        source.muted = source.srcObject.getAudioTracks().length === 0;
        source.volume = 1;
        setMuted(source.muted);
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
        muted={muted}
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
          className="media-control media-control--pip"
          disabled={!pictureInPictureAvailable}
          onClick={() => void toggleFloatingVideo()}
          type="button"
        >
          <PictureInPicture aria-hidden="true" size={18} weight="bold" />
          <span className="media-control__label">
            {floating ? "Return" : "Float"}
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
          onClick={() => void toggleFullscreen()}
          type="button"
        >
          {fullscreen ? (
            <ArrowsIn aria-hidden="true" size={19} weight="bold" />
          ) : (
            <ArrowsOut aria-hidden="true" size={19} weight="bold" />
          )}
          <span className="media-control__label">
            {fullscreen ? "Exit" : "Full screen"}
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
