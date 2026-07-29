import {
  ArrowClockwise,
  ArrowLeft,
  Check,
  Clock,
  DeviceMobile,
  EnvelopeSimple,
  Eye,
  House,
  SlidersHorizontal,
  UsersThree,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type {
  CommunityAdapter,
  FanViewAdapter,
  FanViewSnapshot,
} from "../../fanview-spa/src/adapters/contracts";
import { FanViewUnavailableError } from "../../fanview-spa/src/adapters/contracts";
import { CommunityErrorBoundary } from "../../fanview-spa/src/components/CommunityErrorBoundary";
import { CommunityPanel } from "../../fanview-spa/src/components/CommunityPanel";
import {
  ScoreBug,
  type ScoreboardLayout,
} from "../../fanview-spa/src/components/ScoreBug";
import { LiveMedia } from "./LiveMedia";

interface Props {
  communityAdapter: CommunityAdapter;
  communityEnabled: boolean;
  displayPreferenceAdapter?: DisplayPreferenceAdapter;
  fanViewAdapter: FanViewAdapter;
  liveWorkerUrl: string;
  shareId: string | null;
}

type ScreenState = "loading" | "ready" | "unavailable" | "error" | "expired";
export type ScoreboardSize = "small" | "standard" | "large";
export type ScoreboardPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface ViewerDisplayPreference {
  automatic: boolean;
  layout: ScoreboardLayout;
  position: ScoreboardPosition;
  size: ScoreboardSize;
}

export interface DisplayPreferenceAdapter {
  load(): Promise<ViewerDisplayPreference | null>;
  save(preference: ViewerDisplayPreference): Promise<void>;
}

const SCOREBOARD_SIZE_KEY = "courtsideview_fanview_scoreboard_size";
const SCOREBOARD_POSITION_KEY = "courtsideview_fanview_scoreboard_position";
const SCOREBOARD_LAYOUT_KEY = "courtsideview_fanview_scoreboard_layout";
const SCOREBOARD_AUTOMATIC_KEY = "courtsideview_fanview_scoreboard_automatic";
const SCOREBOARD_SIZES: ScoreboardSize[] = ["small", "standard", "large"];
const SCOREBOARD_LAYOUTS: Array<{
  label: string;
  value: ScoreboardLayout;
}> = [
  { label: "FULL SCORE", value: "full-score" },
  { label: "SCORE BAR", value: "score-bar" },
  { label: "MINIMAL", value: "minimal" },
];
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

const isScoreboardLayout = (
  value: string | null,
): value is ScoreboardLayout =>
  SCOREBOARD_LAYOUTS.some((layout) => layout.value === value);

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

const initialScoreboardLayout = (): ScoreboardLayout => {
  const params = new URLSearchParams(window.location.search);
  for (const key of ["scoreboardLayout", "scoreLayout", "layout"]) {
    const raw = params.get(key)?.toLowerCase().replace(/[_\s]+/g, "-") ?? null;
    const value =
      raw === "full" || raw === "stacked"
        ? "full-score"
        : raw === "bar" || raw === "horizontal"
          ? "score-bar"
          : raw;
    if (isScoreboardLayout(value)) return value;
  }
  try {
    const stored = window.localStorage.getItem(SCOREBOARD_LAYOUT_KEY);
    if (isScoreboardLayout(stored)) return stored;
  } catch {
    // Storage can be unavailable in privacy mode; the approved default remains.
  }
  return "score-bar";
};

const initialScoreboardAutomatic = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("scoreboardAutomatic") ?? params.get("automatic");
  if (query === "1" || query === "true") return true;
  if (query === "0" || query === "false") return false;
  try {
    return window.localStorage.getItem(SCOREBOARD_AUTOMATIC_KEY) === "true";
  } catch {
    return false;
  }
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
  return "bottom-center";
};

const revision = (snapshot: FanViewSnapshot): number =>
  Date.parse(snapshot.match.updatedAt) || 0;

const arenaPresentationRequested = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("presentation")?.toLowerCase() === "arena" ||
    params.get("scoreboardOnly") === "1"
  );
};

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
  automatic,
  layout,
  onAutomaticChange,
  onClose,
  onLayoutChange,
  onPositionChange,
  onReset,
  onSizeChange,
  position,
  size,
}: {
  automatic: boolean;
  layout: ScoreboardLayout;
  onAutomaticChange: (automatic: boolean) => void;
  onClose: () => void;
  onLayoutChange: (layout: ScoreboardLayout) => void;
  onPositionChange: (position: ScoreboardPosition) => void;
  onReset: () => void;
  onSizeChange: (size: ScoreboardSize) => void;
  position: ScoreboardPosition;
  size: ScoreboardSize;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const closeAndRestoreFocus = () => {
      onClose();
      window.requestAnimationFrame(focusDisplayTrigger);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAndRestoreFocus();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      closeAndRestoreFocus();
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
      aria-modal="true"
      className="scoreboard-display-menu"
      ref={menuRef}
      role="dialog"
    >
      <span aria-hidden="true" className="scoreboard-display-menu__handle" />
      <strong>SCOREBOARD DISPLAY</strong>
      <p>This changes only your display.</p>
      <span className="scoreboard-display-menu__label">LAYOUT</span>
      <div className="scoreboard-display-menu__layouts">
        {SCOREBOARD_LAYOUTS.map((option) => (
          <button
            aria-label={`Use ${option.label.toLowerCase()} layout`}
            aria-pressed={layout === option.value}
            className="scoreboard-display-menu__layout"
            key={option.value}
            onClick={() => onLayoutChange(option.value)}
            type="button"
          >
            {layout === option.value ? (
              <span className="scoreboard-display-menu__check">
                <Check aria-hidden="true" size={16} strokeWidth={3} />
              </span>
            ) : null}
            <span
              aria-hidden="true"
              className={`scoreboard-layout-preview scoreboard-layout-preview--${option.value}`}
            >
              <i />
              <i />
              <i />
            </span>
            {option.value === "score-bar" ? (
              <small>COURTSIDEVIEW DEFAULT</small>
            ) : null}
            <b>{option.label}</b>
          </button>
        ))}
      </div>
      <span className="scoreboard-display-menu__label">SIZE</span>
      <div className="scoreboard-display-menu__options">
        {SCOREBOARD_SIZES.map((option) => (
          <button
            aria-pressed={size === option}
            key={option}
            onClick={() => onSizeChange(option)}
            type="button"
          >
            {option.toUpperCase()}
            {size === option ? (
              <span className="scoreboard-display-menu__option-check">
                <Check aria-hidden="true" size={13} strokeWidth={3} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <span className="scoreboard-display-menu__label">POSITION</span>
      <div className="scoreboard-display-menu__options scoreboard-display-menu__positions">
        {SCOREBOARD_POSITIONS.map((option) => (
          <button
            aria-pressed={position === option.value}
            key={option.value}
            onClick={() => onPositionChange(option.value)}
            type="button"
          >
            <span
              aria-hidden="true"
              className={`scoreboard-position-icon scoreboard-position-icon--${option.value}`}
            >
              <i />
            </span>
            <span className="scoreboard-sr-only">{option.label}</span>
            {position === option.value ? (
              <span className="scoreboard-display-menu__position-check">
                <Check aria-hidden="true" size={12} strokeWidth={3} />
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <button
        aria-checked={automatic}
        className="scoreboard-display-menu__automatic"
        onClick={() => onAutomaticChange(!automatic)}
        role="switch"
        type="button"
      >
        <span>
          <b>AUTOMATIC</b>
          <small>Adjust by screen orientation</small>
        </span>
        <i className="scoreboard-display-menu__switch" data-on={automatic}>
          <span />
        </i>
      </button>
      <button
        className="scoreboard-display-menu__reset"
        onClick={onReset}
        type="button"
      >
        Use CourtsideView default
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

function ArenaScoreboard({ snapshot }: { snapshot: FanViewSnapshot }) {
  const { match } = snapshot;
  const arenaStyle = {
    "--arena-home": match.home.color,
    "--arena-away": match.away.color,
  } as CSSProperties;

  return (
    <main
      aria-label="CourtsideView arena scoreboard"
      className="arena-scoreboard"
      data-testid="arena-scoreboard"
      style={arenaStyle}
    >
      <header className="arena-scoreboard__header">
        <strong>COURTSIDEVIEW</strong>
        <span>
          {match.isComplete ? "FINAL" : "LIVE"} · BEST OF {match.totalSets} ·
          SET {match.setNumber}
        </span>
      </header>
      <section className="arena-scoreboard__board">
        <div className="arena-scoreboard__team arena-scoreboard__team--home">
          <i aria-hidden="true" />
          <span>
            <b>{match.home.name.toUpperCase()}</b>
            <small>SETS {match.homeSetsWon}</small>
          </span>
          <strong>{match.home.score}</strong>
        </div>
        <div className="arena-scoreboard__set">SET {match.setNumber}</div>
        <div className="arena-scoreboard__team arena-scoreboard__team--away">
          <strong>{match.away.score}</strong>
          <span>
            <b>{match.away.name.toUpperCase()}</b>
            <small>SETS {match.awaySetsWon}</small>
          </span>
          <i aria-hidden="true" />
        </div>
        <div className="arena-scoreboard__history">
          {(match.completedSets ?? [])
            .filter(
              (set) => match.isComplete || set.setNumber < match.setNumber,
            )
            .map((set) => {
              const homeWon = set.homeScore > set.awayScore;
              return (
                <div key={set.setNumber}>
                  <b>S{set.setNumber}</b>
                  <span className={homeWon ? "is-winner" : ""}>
                    {set.homeScore}
                  </span>
                  <span className={!homeWon ? "is-winner" : ""}>
                    {set.awayScore}
                  </span>
                </div>
              );
            })}
        </div>
      </section>
      {match.timeoutTeamName !== undefined ? (
        <div className="arena-scoreboard__timeout" role="status">
          <Clock aria-hidden="true" size={42} weight="bold" />
          TIMEOUT — {match.timeoutTeamName || "MATCH PAUSED"}
        </div>
      ) : null}
      <footer>
        <span>Scan or open FanView to follow the match</span>
        <div aria-hidden="true">
          <DeviceMobile size={62} weight="regular" />
          <b>FANVIEW</b>
        </div>
      </footer>
    </main>
  );
}

export function ProductionApp({
  communityAdapter,
  communityEnabled,
  displayPreferenceAdapter,
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
  const [scoreboardLayout, setScoreboardLayout] = useState<ScoreboardLayout>(
    initialScoreboardLayout,
  );
  const [scoreboardAutomatic, setScoreboardAutomatic] = useState(
    initialScoreboardAutomatic,
  );
  const [scoreboardPosition, setScoreboardPosition] =
    useState<ScoreboardPosition>(initialScoreboardPosition);
  const [portraitViewport, setPortraitViewport] = useState(
    () => window.innerHeight >= window.innerWidth,
  );
  const [displayMenuOpen, setDisplayMenuOpen] = useState(false);
  const [arenaPresentation] = useState(arenaPresentationRequested);
  const [accountPreferenceHydrated, setAccountPreferenceHydrated] = useState(
    displayPreferenceAdapter === undefined,
  );
  const localPreferenceChanged = useRef(false);
  const newestRevision = useRef(0);
  const hasReadySnapshot = useRef(false);

  useEffect(() => {
    if (!displayPreferenceAdapter) return;
    let active = true;
    void displayPreferenceAdapter
      .load()
      .then((preference) => {
        if (!active || !preference || localPreferenceChanged.current) return;
        setScoreboardLayout(preference.layout);
        setScoreboardSize(preference.size);
        setScoreboardPosition(preference.position);
        setScoreboardAutomatic(preference.automatic);
      })
      .finally(() => {
        if (active) setAccountPreferenceHydrated(true);
      });
    return () => {
      active = false;
    };
  }, [displayPreferenceAdapter]);

  useEffect(() => {
    if (!displayPreferenceAdapter || !accountPreferenceHydrated) {
      return () => {};
    }
    const timer = window.setTimeout(() => {
      void displayPreferenceAdapter.save({
        automatic: scoreboardAutomatic,
        layout: scoreboardLayout,
        position: scoreboardPosition,
        size: scoreboardSize,
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, [
    accountPreferenceHydrated,
    displayPreferenceAdapter,
    scoreboardAutomatic,
    scoreboardLayout,
    scoreboardPosition,
    scoreboardSize,
  ]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOREBOARD_SIZE_KEY, scoreboardSize);
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardSize]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOREBOARD_LAYOUT_KEY, scoreboardLayout);
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardLayout]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SCOREBOARD_AUTOMATIC_KEY,
        String(scoreboardAutomatic),
      );
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardAutomatic]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SCOREBOARD_POSITION_KEY, scoreboardPosition);
    } catch {
      // Display controls still work for this session when storage is unavailable.
    }
  }, [scoreboardPosition]);

  useEffect(() => {
    const syncViewport = () =>
      setPortraitViewport(window.innerHeight >= window.innerWidth);
    window.addEventListener("resize", syncViewport);
    window.addEventListener("orientationchange", syncViewport);
    return () => {
      window.removeEventListener("resize", syncViewport);
      window.removeEventListener("orientationchange", syncViewport);
    };
  }, []);

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
  const renderedScoreboardLayout: ScoreboardLayout = scoreboardAutomatic
    ? portraitViewport
      ? "full-score"
      : "score-bar"
    : scoreboardLayout;

  if (arenaPresentation) {
    return <ArenaScoreboard snapshot={snapshot} />;
  }

  return (
    <main
      className="fanview-app"
      data-community-enabled={communityEnabled}
      data-scoreboard-automatic={scoreboardAutomatic}
      data-scoreboard-layout={renderedScoreboardLayout}
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
            scoreboardLayout={renderedScoreboardLayout}
            scoreboardPosition={scoreboardPosition}
            scoreboardSize={scoreboardSize}
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
        <ScoreBug layout={renderedScoreboardLayout} match={snapshot.match} />
        {displayMenuOpen ? (
          <ScoreboardDisplayMenu
            automatic={scoreboardAutomatic}
            layout={scoreboardLayout}
            onAutomaticChange={(automatic) => {
              localPreferenceChanged.current = true;
              setScoreboardAutomatic(automatic);
            }}
            onClose={() => setDisplayMenuOpen(false)}
            onLayoutChange={(layout) => {
              localPreferenceChanged.current = true;
              setScoreboardLayout(layout);
              setScoreboardAutomatic(false);
            }}
            onPositionChange={(position) => {
              localPreferenceChanged.current = true;
              setScoreboardPosition(position);
            }}
            onReset={() => {
              localPreferenceChanged.current = true;
              setScoreboardLayout("score-bar");
              setScoreboardSize("standard");
              setScoreboardPosition("bottom-center");
              setScoreboardAutomatic(false);
            }}
            onSizeChange={(size) => {
              localPreferenceChanged.current = true;
              setScoreboardSize(size);
            }}
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
