import { useEffect, useState } from "react";
import { CommunityErrorBoundary } from "./components/CommunityErrorBoundary";
import { CommunityPanel } from "./components/CommunityPanel";
import { FanViewStage } from "./components/FanViewStage";
import { fixtureCommunityAdapter } from "./adapters/fixtureCommunityAdapter";
import { fixtureFanViewAdapter } from "./adapters/fixtureFanViewAdapter";
import type {
  CommunityAdapter,
  FanViewAdapter,
  FanViewSnapshot,
} from "./adapters/contracts";
import { featureFlags, type FanViewFeatureFlags } from "./config/featureFlags";
import { getShareId } from "./routing";

export interface AppProps {
  communityAdapter?: CommunityAdapter;
  fanViewAdapter?: FanViewAdapter;
  flags?: FanViewFeatureFlags;
  shareId?: string;
}

export function App({
  communityAdapter = fixtureCommunityAdapter,
  fanViewAdapter = fixtureFanViewAdapter,
  flags = featureFlags,
  shareId = getShareId(window.location.pathname),
}: AppProps) {
  const [snapshot, setSnapshot] = useState<FanViewSnapshot | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    let unsubscribe = () => {};

    setSnapshot(null);
    setLoadError(false);

    void fanViewAdapter
      .loadSnapshot(shareId, abortController.signal)
      .then((nextSnapshot) => {
        if (!abortController.signal.aborted) setSnapshot(nextSnapshot);
      })
      .catch(() => {
        if (!abortController.signal.aborted) setLoadError(true);
      });

    if (fanViewAdapter.subscribe) {
      unsubscribe = fanViewAdapter.subscribe(
        shareId,
        setSnapshot,
        () => setLoadError(true),
      );
    }

    return () => {
      abortController.abort();
      unsubscribe();
    };
  }, [fanViewAdapter, shareId]);

  return (
    <main
      className="fanview-app"
      data-community-enabled={flags.communityEnabled}
      data-testid="fanview-app"
    >
      <FanViewStage snapshot={snapshot} unavailable={loadError} />

      {flags.communityEnabled ? (
        <CommunityErrorBoundary>
          <CommunityPanel
            adapter={communityAdapter}
            matchComplete={snapshot?.match.isComplete ?? false}
            shareId={shareId}
            teamName={snapshot?.match.home.name ?? "14s Blue"}
          />
        </CommunityErrorBoundary>
      ) : null}
    </main>
  );
}
