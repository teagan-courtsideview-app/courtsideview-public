import approvedVolleyballStage from "../assets/approved-volleyball-stage.png";
import type { FanViewAdapter, FanViewSnapshot } from "./contracts";

export const fixtureSnapshot: FanViewSnapshot = {
  match: {
    setNumber: 2,
    isComplete: false,
    isLive: true,
    home: { name: "14s Blue", score: 18, color: "#1556C0" },
    away: { name: "Metro Red", score: 16, color: "#EA2850" },
  },
  media: {
    kind: "fixture-poster",
    posterUrl: approvedVolleyballStage,
    alt: "A live indoor volleyball rally between navy and red teams.",
  },
  viewerCount: 352,
};

export const fixtureFanViewAdapter: FanViewAdapter = {
  async loadSnapshot(_shareId, signal) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return fixtureSnapshot;
  },
};
