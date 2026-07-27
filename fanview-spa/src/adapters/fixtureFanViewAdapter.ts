import approvedVolleyballStage from "../assets/approved-volleyball-stage.png";
import type { FanViewAdapter, FanViewSnapshot } from "./contracts";

export const fixtureSnapshot: FanViewSnapshot = {
  shareId: "fanview-spa-fixture",
  match: {
    setNumber: 2,
    setTarget: 25,
    totalSets: 3,
    homeSetsWon: 1,
    awaySetsWon: 0,
    completedSets: [{ setNumber: 1, homeScore: 25, awayScore: 21 }],
    isComplete: false,
    isLive: true,
    updatedAt: new Date(0).toISOString(),
    home: { name: "14s Blue", score: 18, color: "#1556C0" },
    away: { name: "Metro Red", score: 16, color: "#EA2850" },
  },
  media: {
    kind: "fixture-poster",
    posterUrl: approvedVolleyballStage,
    alt: "A live indoor volleyball rally between navy and red teams.",
  },
  viewerCount: 352,
  activity: [],
  latestAction: "14s Blue scores",
  connection: "connected",
};

export const fixtureFanViewAdapter: FanViewAdapter = {
  async loadSnapshot(_shareId, signal) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    return fixtureSnapshot;
  },
};
