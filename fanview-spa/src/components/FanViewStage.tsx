import { Eye } from "@phosphor-icons/react";
import type { FanViewSnapshot } from "../adapters/contracts";
import { ScoreBug } from "./ScoreBug";

interface Props {
  snapshot: FanViewSnapshot | null;
  unavailable: boolean;
}

export function FanViewStage({ snapshot, unavailable }: Props) {
  const match = snapshot?.match;

  return (
    <section className="match-stage" aria-label="FanView live match">
      {snapshot?.media.posterUrl ? (
        <img
          alt={snapshot.media.alt}
          className="match-stage__media"
          src={snapshot.media.posterUrl}
        />
      ) : (
        <div className="match-stage__empty" aria-hidden="true">
          <div className="court-outline">
            <span className="court-outline__net" />
          </div>
        </div>
      )}
      <div className="match-stage__shade" aria-hidden="true" />

      {match?.isLive ? (
        <div className="live-pill" aria-label="Live">
          <span className="live-pill__dot" aria-hidden="true" />
          LIVE
        </div>
      ) : null}

      <div className="viewer-pill" aria-live="polite">
        <Eye aria-hidden="true" size={19} weight="bold" />
        <span>{snapshot?.viewerCount ?? 0}</span>
      </div>

      {match ? <ScoreBug match={match} /> : null}

      {unavailable ? (
        <div className="match-status" role="status">
          Live updates are reconnecting.
        </div>
      ) : null}
    </section>
  );
}
