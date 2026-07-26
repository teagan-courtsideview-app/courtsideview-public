import {
  ArrowsIn,
  ArrowsOut,
  PictureInPicture,
  Play,
  SpeakerHigh,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  FanViewMatch,
  FanViewMedia,
} from "../../fanview-spa/src/adapters/contracts";
import { scoreBugTextColor } from "../../fanview-spa/src/components/ScoreBug";

interface Props {
  liveWorkerUrl: string;
  match: FanViewMatch;
  media: FanViewMedia;
  shareId: string;
  viewerCount: number;
}

const VIDEO_STALL_CHECK_MS = 2_000;
const VIDEO_STALL_RECONNECT_MS = 6_000;
const VIDEO_RECONNECT_DELAY_MS = 1_500;

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
      void fetch(endpoint, {
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

const roundedRect = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(
    x + width,
    y + height,
    x,
    y + height,
    safeRadius,
  );
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
};

const fitCanvasText = (
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
): string => {
  if (context.measureText(value).width <= maxWidth) return value;
  let fitted = value;
  while (
    fitted.length > 1 &&
    context.measureText(`${fitted}…`).width > maxWidth
  ) {
    fitted = fitted.slice(0, -1);
  }
  return `${fitted}…`;
};

const drawPresentationFrame = (
  canvas: HTMLCanvasElement,
  source: HTMLVideoElement,
  rotation: FanViewMedia["rotation"],
  match: FanViewMatch,
  viewerCount: number,
) => {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context || source.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
    return;
  }
  const width = canvas.width;
  const height = canvas.height;
  const rawWidth = source.videoWidth || 1280;
  const rawHeight = source.videoHeight || 720;
  const quarterTurn = rotation === -90 || rotation === 90;
  const visibleWidth = quarterTurn ? rawHeight : rawWidth;
  const visibleHeight = quarterTurn ? rawWidth : rawHeight;
  const scale = Math.max(width / visibleWidth, height / visibleHeight);

  context.save();
  context.fillStyle = "#000000";
  context.fillRect(0, 0, width, height);
  context.translate(width / 2, height / 2);
  context.rotate(((rotation ?? 0) * Math.PI) / 180);
  context.drawImage(
    source,
    (-rawWidth * scale) / 2,
    (-rawHeight * scale) / 2,
    rawWidth * scale,
    rawHeight * scale,
  );
  context.restore();

  const portrait = height > width;
  const uiScale = Math.max(
    0.82,
    Math.min(1.08, Math.min(width, height) / 720),
  );
  const edge = Math.max(14, Math.round(18 * uiScale));
  const pillHeight = Math.round(36 * uiScale);

  context.save();
  context.textBaseline = "middle";
  context.font = `900 ${Math.round(14 * uiScale)}px system-ui, sans-serif`;
  roundedRect(context, edge, edge, 72 * uiScale, pillHeight, 8 * uiScale);
  context.fillStyle = "#e53935";
  context.fill();
  context.fillStyle = "#ffffff";
  context.beginPath();
  context.arc(
    edge + 14 * uiScale,
    edge + pillHeight / 2,
    4 * uiScale,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.fillText("LIVE", edge + 25 * uiScale, edge + pillHeight / 2);

  const viewerWidth = 62 * uiScale;
  roundedRect(
    context,
    width - edge - viewerWidth,
    edge,
    viewerWidth,
    pillHeight,
    8 * uiScale,
  );
  context.fillStyle = "rgba(3, 8, 15, 0.78)";
  context.fill();
  context.strokeStyle = "rgba(255, 255, 255, 0.65)";
  context.lineWidth = Math.max(1, uiScale);
  context.stroke();
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.fillText(
    `◉ ${Math.max(0, viewerCount)}`,
    width - edge - viewerWidth / 2,
    edge + pillHeight / 2,
  );

  const cardWidth = Math.min(
    width - edge * 2,
    (portrait ? 228 : 284) * uiScale,
  );
  const cardPadding = 7 * uiScale;
  const headerHeight = 20 * uiScale;
  const rowHeight = (portrait ? 33 : 39) * uiScale;
  const rowGap = 4 * uiScale;
  const cardHeight =
    cardPadding * 2 + headerHeight + rowHeight * 2 + rowGap * 2;
  const cardX = edge;
  const cardY = height - edge - cardHeight;
  roundedRect(
    context,
    cardX,
    cardY,
    cardWidth,
    cardHeight,
    10 * uiScale,
  );
  context.fillStyle = "rgba(7, 18, 34, 0.96)";
  context.fill();

  context.textAlign = "left";
  context.fillStyle = "#ffffff";
  context.font = `900 ${Math.round(10 * uiScale)}px system-ui, sans-serif`;
  context.fillText(
    `SET ${match.setNumber}`,
    cardX + cardPadding,
    cardY + cardPadding + headerHeight / 2,
  );
  context.textAlign = "right";
  context.fillText(
    `BEST OF ${match.totalSets}`,
    cardX + cardWidth - cardPadding,
    cardY + cardPadding + headerHeight / 2,
  );

  const teams = [
    { ...match.home, setsWon: match.homeSetsWon },
    { ...match.away, setsWon: match.awaySetsWon },
  ];
  teams.forEach((team, index) => {
    const rowY =
      cardY +
      cardPadding +
      headerHeight +
      rowGap +
      index * (rowHeight + rowGap);
    const scoreWidth = 42 * uiScale;
    const setsWidth = 38 * uiScale;
    const teamWidth =
      cardWidth - cardPadding * 2 - scoreWidth - setsWidth;
    const teamColor = /^#[\da-f]{3,6}$/i.test(team.color)
      ? team.color
      : "#1556c0";

    context.fillStyle = teamColor;
    context.fillRect(cardX + cardPadding, rowY, teamWidth, rowHeight);
    context.fillStyle = scoreBugTextColor(teamColor);
    context.textAlign = "left";
    context.font = `900 ${Math.round(12 * uiScale)}px system-ui, sans-serif`;
    const teamName = fitCanvasText(
      context,
      team.name.toUpperCase(),
      teamWidth - 16 * uiScale,
    );
    context.fillText(
      teamName,
      cardX + cardPadding + 8 * uiScale,
      rowY + rowHeight / 2,
    );

    const setsX = cardX + cardPadding + teamWidth;
    context.fillStyle = "#162338";
    context.fillRect(setsX, rowY, setsWidth, rowHeight);
    context.textAlign = "center";
    context.fillStyle = "#ffffff";
    context.font = `800 ${Math.round(6 * uiScale)}px system-ui, sans-serif`;
    context.fillText(
      "SETS",
      setsX + setsWidth / 2,
      rowY + rowHeight * 0.29,
    );
    context.font = `900 ${Math.round(14 * uiScale)}px system-ui, sans-serif`;
    context.fillText(
      String(team.setsWon),
      setsX + setsWidth / 2,
      rowY + rowHeight * 0.67,
    );

    const scoreX = setsX + setsWidth;
    context.fillStyle = "#101b2b";
    context.fillRect(scoreX, rowY, scoreWidth, rowHeight);
    context.font = `900 ${Math.round(19 * uiScale)}px system-ui, sans-serif`;
    context.fillText(
      String(team.score),
      scoreX + scoreWidth / 2,
      rowY + rowHeight / 2,
    );
  });
  context.restore();
};

function CloudflareVideo({
  liveWorkerUrl,
  match,
  rotation,
  shareId,
  viewerCount,
}: Omit<Props, "media"> & { rotation?: FanViewMedia["rotation"] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const presentationCanvasRef = useRef<HTMLCanvasElement>(null);
  const presentationVideoRef = useRef<HTMLVideoElement>(null);
  const presentationCleanupRef = useRef<(() => void) | null>(null);
  const matchRef = useRef(match);
  const rotationRef = useRef(rotation);
  const viewerCountRef = useRef(viewerCount);
  const [muted, setMuted] = useState(true);
  const [playbackPaused, setPlaybackPaused] = useState(true);
  const [status, setStatus] = useState("Waiting for broadcaster");
  const [fullscreenMode, setFullscreenMode] = useState<
    "none" | "document" | "presentation" | "css"
  >("none");
  const [pictureInPictureAvailable, setPictureInPictureAvailable] =
    useState(false);
  const [floating, setFloating] = useState(false);
  const fullscreen = fullscreenMode !== "none";
  matchRef.current = match;
  rotationRef.current = rotation;
  viewerCountRef.current = viewerCount;

  useViewerPresence(true, liveWorkerUrl, shareId);

  const resumeVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !video.srcObject) return;
    try {
      await video.play();
      setPlaybackPaused(false);
    } catch {
      video.muted = true;
      setMuted(true);
      try {
        await video.play();
        setPlaybackPaused(false);
      } catch {
        setPlaybackPaused(true);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;
    let peer: RTCPeerConnection | null = null;
    let retry: number | undefined;
    let watchdog: number | undefined;

    const connect = async () => {
      if (!active || !videoRef.current) return;
      window.clearTimeout(retry);
      window.clearInterval(watchdog);
      peer?.close();
      const candidate = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.cloudflare.com:3478" }],
        bundlePolicy: "max-bundle",
      });
      peer = candidate;
      const stream = new MediaStream();
      videoRef.current.srcObject = stream;
      setStatus("Waiting for broadcaster");
      let lastCurrentTime = videoRef.current.currentTime;
      let lastProgressAt = Date.now();

      const reconnect = () => {
        if (!active || peer !== candidate) return;
        window.clearInterval(watchdog);
        candidate.close();
        setStatus("Reconnecting video");
        window.clearTimeout(retry);
        retry = window.setTimeout(
          () => void connect(),
          VIDEO_RECONNECT_DELAY_MS,
        );
      };
      candidate.addEventListener("track", ({ track }) => {
        stream.addTrack(track);
        setStatus("");
        lastProgressAt = Date.now();
        void resumeVideo();
        track.addEventListener("ended", reconnect, { once: true });
      });
      candidate.addEventListener("connectionstatechange", () => {
        if (candidate.connectionState === "connected") setStatus("");
        if (
          candidate.connectionState === "failed" ||
          candidate.connectionState === "disconnected"
        ) {
          reconnect();
        }
      });

      try {
        const response = await fetch(
          `${liveWorkerUrl}/play/${encodeURIComponent(shareId)}`,
          { method: "POST", headers: { "content-type": "application/sdp" } },
        );
        if (!response.ok) throw new Error("viewer unavailable");
        const location = response.headers.get("location");
        if (!location) throw new Error("viewer session unavailable");
        await candidate.setRemoteDescription({
          type: "offer",
          sdp: await response.text(),
        });
        const answer = await candidate.createAnswer();
        await candidate.setLocalDescription(answer);
        const negotiated = await fetch(`${liveWorkerUrl}${location}`, {
          method: "PATCH",
          headers: { "content-type": "application/sdp" },
          body: answer.sdp ?? "",
        });
        if (!negotiated.ok) throw new Error("viewer negotiation failed");
        setStatus("Live now");
        void resumeVideo();
        watchdog = window.setInterval(() => {
          const video = videoRef.current;
          if (!active || !video || peer !== candidate) return;
          if (video.currentTime > lastCurrentTime + 0.05) {
            lastCurrentTime = video.currentTime;
            lastProgressAt = Date.now();
            return;
          }
          if (Date.now() - lastProgressAt >= VIDEO_STALL_RECONNECT_MS) {
            reconnect();
          }
        }, VIDEO_STALL_CHECK_MS);
      } catch {
        candidate.close();
        reconnect();
      }
    };

    void connect();
    return () => {
      active = false;
      window.clearTimeout(retry);
      window.clearInterval(watchdog);
      peer?.close();
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [liveWorkerUrl, resumeVideo, shareId]);

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

  const unmute = async () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.volume = 1;
    try {
      await videoRef.current.play();
      setMuted(false);
    } catch {
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
        setFullscreenMode("presentation");
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
      {playbackPaused && !status ? (
        <button
          aria-label="Play live video"
          className="live-media__play"
          onClick={() => void resumeVideo()}
          type="button"
        >
          <Play aria-hidden="true" size={25} weight="fill" />
        </button>
      ) : null}
      {status ? <div className="live-media__status">{status}</div> : null}
      {muted ? (
        <button
          aria-label="Turn on live audio"
          className="media-control media-control--sound"
          onClick={() => void unmute()}
          type="button"
        >
          <SpeakerHigh aria-hidden="true" size={18} weight="bold" />
          <span className="media-control__sound-label">Sound</span>
        </button>
      ) : null}
      {pictureInPictureAvailable ? (
        <button
          aria-label={floating ? "Return floating video" : "Float live video"}
          className="media-control media-control--pip"
          onClick={() => void toggleFloatingVideo()}
          type="button"
        >
          <PictureInPicture aria-hidden="true" size={18} weight="bold" />
        </button>
      ) : null}
      <button
        aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
        className="media-control media-control--fullscreen"
        onClick={() => void toggleFullscreen()}
        type="button"
      >
        {fullscreen ? (
          <ArrowsIn aria-hidden="true" size={19} weight="bold" />
        ) : (
          <ArrowsOut aria-hidden="true" size={19} weight="bold" />
        )}
      </button>
    </div>
  );
}

export function LiveMedia({
  liveWorkerUrl,
  match,
  media,
  shareId,
  viewerCount,
}: Props) {
  const id = useMemo(() => youtubeId(media.url), [media.url]);
  if (media.kind === "cloudflare-realtime") {
    return (
      <CloudflareVideo
        liveWorkerUrl={liveWorkerUrl}
        match={match}
        rotation={media.rotation}
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
