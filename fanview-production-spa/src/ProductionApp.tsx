import {
  ArrowClockwise,
  ArrowLeft,
  EnvelopeSimple,
  Eye,
  House,
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

const revision = (snapshot: FanViewSnapshot): number =>
  Date.parse(snapshot.match.updatedAt) || 0;

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
            match={snapshot.match}
            media={snapshot.media}
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
        {!hasVideo ? <div className="match-stage__shade" aria-hidden="true" /> : null}
        <div className="live-pill" aria-label={snapshot.match.isLive ? "Live" : "Final"}>
          <span className="live-pill__dot" aria-hidden="true" />
          {snapshot.match.isLive ? "LIVE" : "FINAL"}
        </div>
        <div className="viewer-pill" aria-live="polite">
          <Eye aria-hidden="true" size={19} weight="bold" />
          <span>{snapshot.viewerCount}</span>
        </div>
        <ScoreBug match={snapshot.match} />
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

        {snapshot.connection === "reconnecting" ? (
          <div className="match-status" role="status">
            Live updates are reconnecting.
          </div>
        ) : snapshot.latestAction ? (
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
