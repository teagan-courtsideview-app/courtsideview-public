import {
  ArrowClockwise,
  ArrowLeft,
  EnvelopeSimple,
  Eye,
  House,
  SlidersHorizontal,
  UsersThree,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type {
  CommunityAdapter,
  FanViewAdapter,
  FanViewSnapshot,
} from "../../fanview-spa/src/adapters/contracts";
import { FanViewUnavailableError } from "../../fanview-spa/src/adapters/contracts";
import { CommunityErrorBoundary } from "../../fanview-spa/src/components/CommunityErrorBoundary";
import { CommunityPanel } from "../../fanview-spa/src/components/CommunityPanel";
import { ScoreBug } from "../../fanview-spa/src/components/ScoreBug";
import { LiveMedia } from "./LiveMedia";

interface Props {
  communityAdapter: CommunityAdapter;
  communityEnabled: boolean;
  fanViewAdapter: FanViewAdapter;
  liveWorkerUrl: string;
  shareId: string | null;
}

type ScreenState = "loading" | "ready" | "unavailable" | "error" | "expired";
type ScoreboardSize = "small" | "standard" | "large";
type ScoreboardPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

const SCOREBOARD_SIZE_KEY = "courtsideview_fanview_scoreboard_size";
const SCOREBOARD_POSITION_KEY = "courtsideview_fanview_scoreboard_position";
const SCOREBOARD_SIZES: ScoreboardSize[] = ["small", "standard", "large"];
const SCOREBOARD_POSITIONS: Array<{
  label: string;
  value: ScoreboardPosition;
}> = [
  { label: "Top left", value: "top-left" },
  { label: "Top right", value: "top-right" },
  { label: "Bottom left", value: "bottom-left" },
  { label: "Bottom right", value: "bottom-right" },
  { label: "Bottom center", value: "bottom-center" },
];

const isScoreboardSize = (value: string | null): value is ScoreboardSize =>
  SCOREBOARD_SIZES.includes(value as ScoreboardSize);

const isScoreboardPosition = (
  value: string | null,
): value is ScoreboardPosition =>
  SCOREBOARD_POSITIONS.some((position) => position.value === value);

const initialScoreboardSize = (): ScoreboardSize => {
  const params = new URLSearchParams(window.location.search);
  for (const key of ["scoreboard", "scoreboardSize", "display", "scoreSize"]) {
    const value = params.get(key)?.toLowerCase() ?? null;
    if (isScoreboardSize(value)) return value;
  }
  try {
    const stored = window.localStorage.getItem(SCOREBOARD_SIZE_KEY);
    if (isScoreboardSize(stored)) return stored;
  } catch {
    // Storage can be unavailable in privacy mode; the approved default remains.
  }
  return "standard";
};

const initialScoreboardPosition = (): ScoreboardPosition => {
  const params = new URLSearchParams(window.location.search);
  for (const key of [
    "scoreboardPosition",
    "scorePosition",
    "displayPosition",
    "position",
  ]) {
    const value = params.get(key)?.toLowerCase().replace(/[_\s]+/g, "-") ?? null;
    if (isScoreboardPosition(value)) return value;
  }
  try {
    const stored = window.localStorage.getItem(SCOREBOARD_POSITION_KEY);
    if (isScoreboardPosition(stored)) return stored;
  } catch {
    // Storage can be unavailable in privacy mode; the approved default remains.
  }
  return "bottom-left";
};

const revision = (snapshot: FanViewSnapshot): number =>
  Date.parse(snapshot.match.updatedAt) || 0;

export const formatViewerCount = (viewerCount: number): string =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(Math.max(0, viewerCount));

function focusDisplayTrigger() {
  window
    .document
    .querySelector<HTMLElement>("[data-scoreboard-display-trigger]")
    ?.focus();
}

function ScoreboardDisplayMenu({
  onClose,
  onPositionChange,
  onReset,
  onSizeChange,
  position,
  size,
}: {
  onClose: () => void;
  onPositionChange: (position: ScoreboardPosition) => void;
  onReset: () => void;
  onSizeChange: (size: ScoreboardSize) => void;
  position: ScoreboardPosition;
  size: ScoreboardSize;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      focusDisplayTrigger();
    };
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        document
          .querySelector("[data-scoreboard-display-trigger]")
          ?.contains(target)
      ) {
        return;
      }
      onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [onClose]);

  return (
    <div
      aria-label="Scoreboard display"
      className="scoreboard-display-menu"
      ref={menuRef}
      role="dialog"
    >
      <strong>Scoreboard display</strong>
      <span className="scoreboard-display-menu__label">Size</span>
      <div className="scoreboard-display-menu__options">
        {SCOREBOARD_SIZES.map((option) => (
          <button
            aria-pressed={size === option}
            key={option}
            onClick={() => onSizeChange(option)}
            type="button"
          >
            {option[0].toUpperCase()}
            {option.slice(1)}
          </button>
        ))}
      </div>
      <span className="scoreboard-display-menu__label">Position</span>
      <div className="scoreboard-display-menu__options scoreboard-display-menu__positions">
        {SCOREBOARD_POSITIONS.map((option) => (
          <button
            aria-pressed={position === option.value}
            key={option.value}
            onClick={() => onPositionChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
      <button
        className="scoreboard-display-menu__reset"
        onClick={onReset}
        type="button"
      >
        Reset
      </button>
    </div>
  );
}

function RecoveryPage({
  copy,
  shareId,
  teamHub,
  title,
}: {
  copy: string;
  shareId: string | null;
  teamHub?: FanViewSnapshot["match"]["teamHub"];
  title: string;
}) {
  return (
    <main className="fanview-state-page">
      <section className="fanview-state-camera" aria-label={title}>
        <div className="fanview-state-camera__court" aria-hidden="true">
          <span />
        </div>
        <div className="fanview-state-card">
          <strong>{title}</strong>
          <span>{copy}</span>
          <div className="fanview-state-actions">
            <a className="fanview-state-action fanview-state-action--primary" href="/">
              <House aria-hidden="true" size={20} weight="bold" />
              Return Home
            </a>
            <a
              className="fanview-state-action"
              href={teamHub ? `/t/${encodeURIComponent(teamHub.slug)}` : "/"}
            >
              <UsersThree aria-hidden="true" size={20} weight="bold" />
              Open Team Hub
            </a>
            <button
              className="fanview-state-action"
              disabled={!shareId}
              onClick={() => window.location.reload()}
              type="button"
            >
              <ArrowClockwise aria-hidden="true" size={20} weight="bold" />
              Try again
            </button>
            <a
              className="fanview-state-action fanview-state-action--support"
              href="mailto:teagan@courtsideviewapp.com?subject=CourtsideView%20Support"
            >
              <EnvelopeSimple aria-hidden="true" size={20} weight="bold" />
              Email support
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ProductionApp({
  communityAdapter,
  communityEnabled,
  fanViewAdapter,
  liveWorkerUrl,
  shareId,
}: Props) {
  const [snapshot, setSnapshot] = useState<FanViewSnapshot | null>(null);
  const [screen, setScreen] = useState<ScreenState>(
    shareId ? "loading" : "unavailable",
  );
  const [scoreboardSize, setScoreboardSize] = useState<ScoreboardSize>(
    initialScoreboardSize,
  );
  const [scoreboardPosition, setScoreboardPosition] =
    useState<ScoreboardPosition>(initialScoreboardPosition);
  const [displayMenuOpen, setDisplayMenuOpen] = useState(false);
  const newestRevision = useRef(0);
  const hasReadySnapshot = useRef(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOREBOARD_SIZE_KEY, scoreboardSize);
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardSize]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOREBOARD_POSITION_KEY, scoreboardPosition);
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardPosition]);

  useEffect(() => {
    if (!shareId) {
      setScreen("unavailable");
      return;
    }
    const abortController = new AbortController();
    let unsubscribe = () => {};
    newestRevision.current = 0;
    hasReadySnapshot.current = false;
    setSnapshot(null);
    setScreen("loading");

    const accept = (next: FanViewSnapshot) => {
      if (abortController.signal.aborted) return;
      const nextRevision = revision(next);
      if (nextRevision < newestRevision.current) return;
      newestRevision.current = nextRevision;
      hasReadySnapshot.current = true;
      setSnapshot(next);
      setScreen("ready");
    };
    const handleError = (error: unknown) => {
      if (abortController.signal.aborted) return;
      if (error instanceof FanViewUnavailableError && !hasReadySnapshot.current) {
        setScreen("unavailable");
      } else if (!hasReadySnapshot.current) {
        setScreen("error");
      }
    };

    if (fanViewAdapter.subscribe) {
      unsubscribe = fanViewAdapter.subscribe(shareId, accept, handleError);
    }
    void fanViewAdapter
      .loadSnapshot(shareId, abortController.signal)
      .then(accept)
      .catch(handleError);

    return () => {
      abortController.abort();
      unsubscribe();
    };
  }, [fanViewAdapter, shareId]);

  useEffect(() => {
    if (!snapshot?.expiresAt) return;
    const check = () => {
      if (Date.now() >= Date.parse(snapshot.expiresAt ?? "")) {
        setScreen("expired");
      }
    };
    check();
    const timer = window.setInterval(check, 30_000);
    return () => window.clearInterval(timer);
  }, [snapshot?.expiresAt]);

  if (!shareId || screen === "unavailable") {
    return (
      <RecoveryPage
        copy="This link is invalid, expired, or no longer published."
        shareId={shareId}
        title="FanView unavailable"
      />
    );
  }

  if (screen === "expired") {
    return (
      <RecoveryPage
        copy="FanView links close 15 minutes after the match ends."
        shareId={shareId}
        teamHub={snapshot?.match.teamHub}
        title="This FanView has ended"
      />
    );
  }

  if (screen === "error") {
    return (
      <RecoveryPage
        copy="Live updates should return automatically. You can also try again now."
        shareId={shareId}
        title="FanView is reconnecting"
      />
    );
  }

  if (!snapshot) {
    return (
      <main className="fanview-state-page" aria-busy="true">
        <div className="fanview-state-card">Loading FanView…</div>
      </main>
    );
  }

  const hasVideo =
    snapshot.media.kind === "cloudflare-realtime" ||
    snapshot.media.kind === "youtube";
  const compactViewerCount = formatViewerCount(snapshot.viewerCount);

  return (
    <main
      className="fanview-app"
      data-community-enabled={communityEnabled}
      data-scoreboard-position={scoreboardPosition}
      data-scoreboard-size={scoreboardSize}
      data-testid="fanview-production-app"
    >
      <section className="match-stage" aria-label="FanView live match">
        {hasVideo ? (
          <LiveMedia
            liveWorkerUrl={liveWorkerUrl}
            match={snapshot.match}
            media={snapshot.media}
            displayMenuOpen={displayMenuOpen}
            onDisplayToggle={() => setDisplayMenuOpen((open) => !open)}
            shareId={shareId}
            viewerCount={snapshot.viewerCount}
          />
        ) : (
          <div className="match-stage__empty" aria-hidden="true">
            <div className="court-outline">
              <span className="court-outline__net" />
            </div>
          </div>
        )}
        {snapshot.media.kind !== "cloudflare-realtime" ? (
          <button
            aria-expanded={displayMenuOpen}
            aria-label="Scoreboard display"
            className="scoreboard-display-trigger scoreboard-display-trigger--standalone"
            data-scoreboard-display-trigger
            onClick={() => setDisplayMenuOpen((open) => !open)}
            type="button"
          >
            <SlidersHorizontal aria-hidden="true" size={19} weight="bold" />
            <span>Display</span>
          </button>
        ) : null}
        {!hasVideo ? <div className="match-stage__shade" aria-hidden="true" /> : null}
        <div
          className={`viewer-header${
            snapshot.match.teamHub ? "" : " viewer-header--without-team-hub"
          }`}
        >
          {snapshot.match.teamHub ? (
            <a
              aria-label={`Back to ${snapshot.match.teamHub.name} Team Hub`}
              className="team-hub-back"
              href={`/t/${encodeURIComponent(snapshot.match.teamHub.slug)}`}
            >
              <ArrowLeft aria-hidden="true" size={18} weight="bold" />
              <span>Team Hub</span>
            </a>
          ) : null}
          <div className="viewer-header__status">
            <div
              className="live-pill"
              aria-label={snapshot.match.isLive ? "Live" : "Final"}
            >
              <span className="live-pill__dot" aria-hidden="true" />
              {snapshot.match.isLive ? "LIVE" : "FINAL"}
            </div>
            <div
              aria-label={`${snapshot.viewerCount.toLocaleString("en-US")} ${
                snapshot.viewerCount === 1 ? "viewer" : "viewers"
              }`}
              aria-live="polite"
              className="viewer-pill"
            >
              <Eye aria-hidden="true" size={19} weight="bold" />
              <span>{compactViewerCount}</span>
            </div>
          </div>
        </div>
        <ScoreBug match={snapshot.match} />
        {displayMenuOpen ? (
          <ScoreboardDisplayMenu
            onClose={() => setDisplayMenuOpen(false)}
            onPositionChange={setScoreboardPosition}
            onReset={() => {
              setScoreboardSize("standard");
              setScoreboardPosition("bottom-left");
            }}
            onSizeChange={setScoreboardSize}
            position={scoreboardPosition}
            size={scoreboardSize}
          />
        ) : null}
        {snapshot.connection === "reconnecting" ? (
          <div className="match-status" role="status">
            Live updates are reconnecting.
          </div>
        ) : snapshot.latestAction && !snapshot.match.timeoutTeamName ? (
          <div className="match-status match-status--action" role="status">
            {snapshot.latestAction}
          </div>
        ) : null}

      </section>

      {communityEnabled ? (
        <CommunityErrorBoundary>
          <CommunityPanel
            adapter={communityAdapter}
            matchComplete={snapshot.match.isComplete}
            shareId={shareId}
            startOpen={false}
            teamName={snapshot.match.home.name}
          />
        </CommunityErrorBoundary>
      ) : null}
    </main>
  );
}
