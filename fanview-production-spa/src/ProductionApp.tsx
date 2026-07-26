import { Eye } from "@phosphor-icons/react";
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
import { legacyFanViewUrl } from "./routing";
import { LiveMedia } from "./LiveMedia";

interface Props {
  communityAdapter: CommunityAdapter;
  communityEnabled: boolean;
  fanViewAdapter: FanViewAdapter;
  liveWorkerUrl: string;
  shareId: string | null;
}

type ScreenState = "loading" | "ready" | "unavailable" | "expired";

const revision = (snapshot: FanViewSnapshot): number =>
  Date.parse(snapshot.match.updatedAt) || 0;

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
  const newestRevision = useRef(0);
  const hasReadySnapshot = useRef(false);

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
      <main className="fanview-state-page">
        <div className="fanview-state-card">
          <strong>FanView unavailable</strong>
          <span>This link is invalid, expired, or no longer published.</span>
        </div>
      </main>
    );
  }

  if (screen === "expired") {
    return (
      <main className="fanview-state-page">
        <div className="fanview-state-card">
          <strong>This FanView has ended</strong>
          <span>FanView links close 15 minutes after the match ends.</span>
        </div>
      </main>
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

  return (
    <main
      className="fanview-app"
      data-community-enabled={communityEnabled}
      data-testid="fanview-production-app"
    >
      <section className="match-stage" aria-label="FanView live match">
        {hasVideo ? (
          <LiveMedia
            liveWorkerUrl={liveWorkerUrl}
            media={snapshot.media}
            shareId={shareId}
          />
        ) : (
          <div className="match-stage__empty" aria-hidden="true">
            <div className="court-outline">
              <span className="court-outline__net" />
            </div>
          </div>
        )}
        <div className="match-stage__shade" aria-hidden="true" />
        <div className="live-pill" aria-label={snapshot.match.isLive ? "Live" : "Final"}>
          <span className="live-pill__dot" aria-hidden="true" />
          {snapshot.match.isLive ? "LIVE" : "FINAL"}
        </div>
        <div className="viewer-pill" aria-live="polite">
          <Eye aria-hidden="true" size={19} weight="bold" />
          <span>{snapshot.viewerCount}</span>
        </div>
        <ScoreBug match={snapshot.match} />

        {snapshot.connection === "reconnecting" ? (
          <div className="match-status" role="status">
            Live updates are reconnecting.
          </div>
        ) : snapshot.latestAction ? (
          <div className="match-status match-status--action" role="status">
            {snapshot.latestAction}
          </div>
        ) : null}

        <div className="match-stage__links">
          {snapshot.match.teamHub ? (
            <a href={`/t/${encodeURIComponent(snapshot.match.teamHub.slug)}`}>
              Open {snapshot.match.teamHub.name}
            </a>
          ) : null}
          <a href={legacyFanViewUrl(shareId)}>Use classic FanView</a>
        </div>
      </section>

      {communityEnabled ? (
        <CommunityErrorBoundary>
          <CommunityPanel
            adapter={communityAdapter}
            hideWhenUnavailable
            matchComplete={snapshot.match.isComplete}
            shareId={shareId}
            startOpen
            teamName={snapshot.match.home.name}
          />
        </CommunityErrorBoundary>
      ) : null}
    </main>
  );
}
