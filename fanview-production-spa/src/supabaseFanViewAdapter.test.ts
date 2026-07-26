import { describe, expect, it } from "vitest";
import {
  fanViewSnapshotFromRow,
  type PublicFanViewMatchRow,
} from "./supabaseFanViewAdapter";

const row = (overrides: Partial<PublicFanViewMatchRow> = {}) => ({
  share_id: "match-123",
  format: "bo3",
  home_name: "14s Blue",
  home_color: "#1556C0",
  away_name: "Metro Red",
  away_color: "#EA2850",
  state: {
    mode: "scorekeeper",
    currentSet: 2,
    homeScore: 17,
    awayScore: 16,
    homeSetsWon: 1,
    awaySetsWon: 0,
    feed: [
      {
        id: "latest",
        type: "SCORE",
        team: "myTeam",
        message: "14s Blue scores",
        myTeamScore: 18,
        opponentScore: 16,
      },
    ],
  },
  is_published: true,
  is_complete: false,
  video_url: null,
  video_type: null,
  created_at: "2026-07-25T20:00:00.000Z",
  updated_at: "2026-07-25T20:01:00.000Z",
  ended_at: null,
  team_slug: "14s-blue",
  team_name: "14s Blue",
  ...overrides,
});

describe("FanView production row normalization", () => {
  it("reconciles a newer feed score and keeps Team Hub identity", () => {
    const snapshot = fanViewSnapshotFromRow(row());
    expect(snapshot.match.home.score).toBe(18);
    expect(snapshot.match.away.score).toBe(16);
    expect(snapshot.match.setNumber).toBe(2);
    expect(snapshot.match.setTarget).toBe(25);
    expect(snapshot.match.teamHub).toEqual({
      name: "14s Blue",
      slug: "14s-blue",
    });
    expect(snapshot.activity[0]?.message).toBe("14s Blue scores");
  });

  it("discovers a Cloudflare broadcast from Worker status", () => {
    const snapshot = fanViewSnapshotFromRow(row(), {
      isLive: true,
      state: "live",
      viewerCount: 24,
    });
    expect(snapshot.media).toMatchObject({
      kind: "cloudflare-realtime",
      streamId: "match-123",
    });
    expect(snapshot.viewerCount).toBe(24);
  });

  it("uses immutable ended_at for the exact 15-minute deadline", () => {
    const snapshot = fanViewSnapshotFromRow(
      row({
        is_complete: true,
        ended_at: "2026-07-25T20:00:00.000Z",
        updated_at: "2026-07-25T20:05:00.000Z",
      }),
    );
    expect(snapshot.expiresAt).toBe("2026-07-25T20:15:00.000Z");
  });
});
