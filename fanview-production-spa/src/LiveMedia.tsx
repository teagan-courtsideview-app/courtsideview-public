import {
  ArrowsIn,
  ArrowsOut,
  PictureInPicture,
  SpeakerHigh,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FanViewMedia } from "../../fanview-spa/src/adapters/contracts";

interface Props {
  liveWorkerUrl: string;
  media: FanViewMedia;
  shareId: string;
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

async function enterFullscreen(
  element: HTMLElement,
  video: SafariVideoElement,
): Promise<"document" | "video" | "css"> {
  if (element.requestFullscreen) {
    try {
      await element.requestFullscreen();
      return "document";
    } catch {
      // Mobile Safari can expose this API while rejecting non-video elements.
    }
  }
  if (
    video.webkitEnterFullscreen &&
    video.webkitSupportsFullscreen !== false
  ) {
    try {
      video.webkitEnterFullscreen();
      return "video";
    } catch {
      // Continue to the older prefixed element API.
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
      // Fall through to the CSS fullscreen mode.
    }
  }
  element.classList.add("is-web-fullscreen");
  document.body.classList.add("fanview-fullscreen");
  return "css";
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
  liveWorkerUrl,
  rotation,
  shareId,
}: Omit<Props, "media"> & { rotation?: FanViewMedia["rotation"] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [status, setStatus] = useState("Waiting for broadcaster");
  const [fullscreenMode, setFullscreenMode] = useState<
    "none" | "document" | "video" | "css"
  >("none");
  const [pictureInPictureAvailable, setPictureInPictureAvailable] =
    useState(false);
  const [floating, setFloating] = useState(false);
  const fullscreen = fullscreenMode !== "none";

  useViewerPresence(true, liveWorkerUrl, shareId);

  const resumeVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !video.srcObject) return;
    try {
      await video.play();
    } catch {
      video.muted = true;
      setMuted(true);
      await video.play().catch(() => undefined);
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

  useEffect(() => {
    const video = videoRef.current as SafariVideoElement | null;
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
        !video?.webkitDisplayingFullscreen &&
        !frameRef.current?.classList.contains("is-web-fullscreen")
      ) {
        setFullscreenMode("none");
      }
    };
    const beganVideoFullscreen = () => setFullscreenMode("video");
    const endedVideoFullscreen = () => {
      setFullscreenMode("none");
      void resumeVideo();
    };
    const enteredPictureInPicture = () => setFloating(true);
    const leftPictureInPicture = () => setFloating(false);
    const presentationModeChanged = () =>
      setFloating(video?.webkitPresentationMode === "picture-in-picture");
    const updatePictureInPictureAvailability = () =>
      setPictureInPictureAvailable(
        Boolean(video && supportsPictureInPicture(video)),
      );
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (frameRef.current?.classList.contains("is-web-fullscreen")) {
        frameRef.current.classList.remove("is-web-fullscreen");
        document.body.classList.remove("fanview-fullscreen");
        setFullscreenMode("none");
      }
    };
    document.addEventListener("fullscreenchange", changed);
    document.addEventListener("webkitfullscreenchange", changed);
    document.addEventListener("keydown", escape);
    video?.addEventListener("loadedmetadata", updatePictureInPictureAvailability);
    video?.addEventListener("webkitbeginfullscreen", beganVideoFullscreen);
    video?.addEventListener("webkitendfullscreen", endedVideoFullscreen);
    video?.addEventListener("enterpictureinpicture", enteredPictureInPicture);
    video?.addEventListener("leavepictureinpicture", leftPictureInPicture);
    video?.addEventListener(
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
      video?.removeEventListener("webkitbeginfullscreen", beganVideoFullscreen);
      video?.removeEventListener("webkitendfullscreen", endedVideoFullscreen);
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
      frameRef.current?.classList.remove("is-web-fullscreen");
      document.body.classList.remove("fanview-fullscreen");
    };
  }, [resumeVideo]);

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
    const video = videoRef.current as SafariVideoElement | null;
    if (!frame || !video) return;
    if (fullscreen) {
      if (frame.classList.contains("is-web-fullscreen")) {
        frame.classList.remove("is-web-fullscreen");
        document.body.classList.remove("fanview-fullscreen");
      } else if (
        video.webkitDisplayingFullscreen &&
        video.webkitExitFullscreen
      ) {
        video.webkitExitFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen().catch(() => undefined);
      } else {
        const webkitExit = (
          document as Document & { webkitExitFullscreen?: () => void }
        ).webkitExitFullscreen;
        webkitExit?.call(document);
      }
      setFullscreenMode("none");
      void resumeVideo();
      return;
    }
    setFullscreenMode(await enterFullscreen(frame, video));
  };

  const toggleFloatingVideo = async () => {
    const video = videoRef.current as SafariVideoElement | null;
    if (!video) return;
    try {
      setFloating(await togglePictureInPicture(video));
    } catch {
      setFloating(false);
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
        data-rotation={rotation}
        muted={muted}
        playsInline
        ref={videoRef}
      />
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

export function LiveMedia({ liveWorkerUrl, media, shareId }: Props) {
  const id = useMemo(() => youtubeId(media.url), [media.url]);
  if (media.kind === "cloudflare-realtime") {
    return (
      <CloudflareVideo
        liveWorkerUrl={liveWorkerUrl}
        rotation={media.rotation}
        shareId={shareId}
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
