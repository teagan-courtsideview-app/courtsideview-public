import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import {
  createSupabaseFanViewAdapter,
  FANVIEW_SCORE_FALLBACK_POLL_MS,
  FANVIEW_STATUS_TIMEOUT_MS,
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
  it("keeps the durable score fallback inside a live-match window", () => {
    expect(FANVIEW_SCORE_FALLBACK_POLL_MS).toBe(5_000);
    expect(FANVIEW_STATUS_TIMEOUT_MS).toBe(2_500);
  });

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

  it("does not replace the final-set score with a higher earlier-set score", () => {
    const snapshot = fanViewSnapshotFromRow(
      row({
        is_complete: true,
        state: {
          currentSet: 2,
          homeScore: 1,
          awayScore: 0,
          homeSetsWon: 2,
          awaySetsWon: 0,
          feed: [
            {
              id: "set-two-score",
              type: "SCORE",
              setNumber: 2,
              myTeamScore: 1,
              opponentScore: 0,
            },
            {
              id: "set-one-score",
              type: "SCORE",
              setNumber: 1,
              myTeamScore: 25,
              opponentScore: 21,
            },
          ],
        },
      }),
    );

    expect(snapshot.match.setNumber).toBe(2);
    expect(snapshot.match.home.score).toBe(1);
    expect(snapshot.match.away.score).toBe(0);
  });

  it("delivers a realtime score immediately without waiting on video status", async () => {
    const handlers = new Map<
      string,
      (message: { payload: Record<string, unknown> }) => void
    >();
    const channel = {
      on: vi.fn(
        (
          _type: string,
          filter: { event: string },
          handler: (message: { payload: Record<string, unknown> }) => void,
        ) => {
          handlers.set(filter.event, handler);
          return channel;
        },
      ),
      subscribe: vi.fn((callback: (status: string) => void) => {
        callback("SUBSCRIBED");
        return channel;
      }),
    } as unknown as RealtimeChannel;
    const client = {
      auth: {
        getSession: vi.fn(async () => ({
          data: { session: { access_token: "test" } },
          error: null,
        })),
        signInAnonymously: vi.fn(),
      },
      rpc: vi.fn(() => ({
        maybeSingle: vi.fn(async () => ({ data: row(), error: null })),
      })),
      channel: vi.fn(() => channel),
      removeChannel: vi.fn(),
    } as unknown as SupabaseClient;
    const fetchStatus = vi.fn(async () => ({
      ok: true,
      json: async () => ({ isLive: true, viewerCount: 3 }),
    })) as unknown as typeof globalThis.fetch;
    const adapter = createSupabaseFanViewAdapter({
      client,
      fetch: fetchStatus,
      liveWorkerUrl: "https://live.example.test",
    });

    await adapter.loadSnapshot("match-123", new AbortController().signal);
    const snapshots: number[] = [];
    const stop = adapter.subscribe!(
      "match-123",
      (snapshot) => snapshots.push(snapshot.match.home.score),
      () => undefined,
    );

    handlers.get("score")?.({
      payload: {
        homeScore: 19,
        awayScore: 16,
        currentSet: 2,
      },
    });

    expect(snapshots.at(-1)).toBe(19);
    expect(fetchStatus).toHaveBeenCalledTimes(1);
    stop();
  });

  it("loads the scoreboard when the optional video status request stalls", async () => {
    const client = {
      auth: {
        getSession: vi.fn(async () => ({
          data: { session: { access_token: "test" } },
          error: null,
        })),
        signInAnonymously: vi.fn(),
      },
      rpc: vi.fn(() => ({
        maybeSingle: vi.fn(async () => ({ data: row(), error: null })),
      })),
    } as unknown as SupabaseClient;
    const stalledFetch = vi.fn(
      () => new Promise<Response>(() => undefined),
    ) as unknown as typeof globalThis.fetch;
    const adapter = createSupabaseFanViewAdapter({
      client,
      fetch: stalledFetch,
      liveWorkerUrl: "https://live.example.test",
      statusTimeoutMs: 5,
    });

    const snapshot = await adapter.loadSnapshot(
      "match-123",
      new AbortController().signal,
    );

    expect(snapshot.match.home.score).toBe(18);
    expect(snapshot.media.kind).toBe("none");
  });
});
