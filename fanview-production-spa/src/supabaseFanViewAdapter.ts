import type { RealtimeChannel, SupabaseClient } from "@supabase/supabase-js";
import {
  FanViewUnavailableError,
  type CompletedSetScore,
  type FanViewActivity,
  type FanViewAdapter,
  type FanViewMedia,
  type FanViewSnapshot,
} from "../../fanview-spa/src/adapters/contracts";

type JsonRecord = Record<string, unknown>;

export interface PublicFanViewMatchRow {
  share_id: string;
  format: string | null;
  home_name: string | null;
  home_color: string | null;
  away_name: string | null;
  away_color: string | null;
  state: JsonRecord | null;
  is_published: boolean;
  is_complete: boolean;
  video_url: string | null;
  video_type: string | null;
  created_at: string | null;
  updated_at: string | null;
  ended_at?: string | null;
  team_slug: string | null;
  team_name: string | null;
}

interface LiveStatus {
  isLive?: boolean;
  state?: string;
  viewerCount?: number;
}

interface AdapterOptions {
  client: SupabaseClient;
  fetch?: typeof globalThis.fetch;
  liveWorkerUrl: string;
  pollIntervalMs?: number;
  statusIntervalMs?: number;
  statusTimeoutMs?: number;
}

const PLACEHOLDER_VIDEO_URL = "cloudflare://fanview-live";
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
export const FANVIEW_SCORE_FALLBACK_POLL_MS = 5_000;
export const FANVIEW_STATUS_TIMEOUT_MS = 2_500;

const asRecord = (value: unknown): JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
const numberValue = (value: unknown, fallback = 0): number =>
  typeof value === "number" && Number.isFinite(value) ? value : fallback;
const stringValue = (value: unknown, fallback = ""): string =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const defaultSetTarget = (format: string | null, setNumber: number): number =>
  (format === "bo5" && setNumber === 5) ||
  (format !== "bo5" && setNumber === 3)
    ? 15
    : 25;

const scoreFromState = (state: JsonRecord) => {
  const home = numberValue(state.homeScore, numberValue(state.myTeamScore));
  const away = numberValue(state.awayScore, numberValue(state.opponentScore));
  const currentSet = numberValue(state.currentSet, 1);
  const feed = Array.isArray(state.feed) ? state.feed : [];
  for (const candidate of feed) {
    const item = asRecord(candidate);
    if (item.type !== "SCORE") continue;
    const feedSet = numberValue(item.setNumber, currentSet);
    if (feedSet !== currentSet) continue;
    const feedHome = numberValue(item.myTeamScore, Number.NaN);
    const feedAway = numberValue(item.opponentScore, Number.NaN);
    if (
      Number.isFinite(feedHome) &&
      Number.isFinite(feedAway) &&
      feedHome + feedAway > home + away
    ) {
      return { home: feedHome, away: feedAway };
    }
  }
  return { home, away };
};

const activityFromState = (state: JsonRecord): FanViewActivity[] => {
  const feed = Array.isArray(state.feed) ? state.feed : [];
  return feed
    .map((candidate, index): FanViewActivity | null => {
      const item = asRecord(candidate);
      const message = stringValue(item.message);
      if (!message || /^Score corrected\b/i.test(message)) return null;
      return {
        id:
          stringValue(item.id) ||
          `${stringValue(item.timestamp, "activity")}-${index}`,
        message,
        team:
          item.team === "myTeam"
            ? "home"
            : item.team === "opponent"
              ? "away"
              : "neutral",
        timestamp: stringValue(item.timestamp) || undefined,
      };
    })
    .filter((item): item is FanViewActivity => item !== null)
    .slice(0, 40);
};

const completedSetsFromState = (
  state: JsonRecord,
): CompletedSetScore[] => {
  const candidates = Array.isArray(state.completedSets)
    ? state.completedSets
    : Array.isArray(state.sets)
      ? state.sets
      : [];
  return candidates
    .map((candidate, index) => {
      const set = asRecord(candidate);
      const homeScore = numberValue(
        set.homeScore,
        numberValue(set.myTeamScore, numberValue(set.us, Number.NaN)),
      );
      const awayScore = numberValue(
        set.awayScore,
        numberValue(set.opponentScore, numberValue(set.them, Number.NaN)),
      );
      if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) {
        return null;
      }
      return {
        setNumber: numberValue(set.setNumber, index + 1),
        homeScore,
        awayScore,
      };
    })
    .filter((set): set is CompletedSetScore => set !== null);
};

const mediaFromRow = (
  row: PublicFanViewMatchRow,
  status: LiveStatus | null,
): FanViewMedia => {
  const videoType = stringValue(asRecord(row.state).videoType).toLowerCase();
  const rotation: FanViewMedia["rotation"] =
    videoType === "fanview-live-landscape-left"
      ? -90
      : videoType === "fanview-live-landscape-right"
        ? 90
        : videoType === "fanview-live-portrait-down"
          ? 180
          : undefined;
  if (
    (row.video_type === "cloudflare_realtime" &&
      row.video_url &&
      row.video_url !== PLACEHOLDER_VIDEO_URL) ||
    status?.isLive === true
  ) {
    return {
      kind: "cloudflare-realtime",
      streamId: row.share_id,
      rotation,
      alt: "Live volleyball broadcast.",
    };
  }
  if (
    (row.video_type === "youtube" || row.video_type === "youtube_live") &&
    row.video_url
  ) {
    return {
      kind: "youtube",
      url: row.video_url,
      alt: "Live volleyball broadcast.",
    };
  }
  return { kind: "none", alt: "No live video is currently available." };
};

export function fanViewSnapshotFromRow(
  row: PublicFanViewMatchRow,
  status: LiveStatus | null = null,
): FanViewSnapshot {
  const state = asRecord(row.state);
  const score = scoreFromState(state);
  const setNumber = numberValue(state.currentSet, 1);
  const updatedAt = row.updated_at || row.created_at || new Date().toISOString();
  const latestFeed = asRecord(state.latestFeed);
  const currentActivity = asRecord(state.currentActivity);
  const completedAt = row.is_complete
    ? Date.parse(row.ended_at || updatedAt)
    : Number.NaN;

  return {
    shareId: row.share_id,
    match: {
      setNumber,
      setTarget: numberValue(
        state.setTarget,
        defaultSetTarget(row.format, setNumber),
      ),
      totalSets: numberValue(state.totalSets, row.format === "bo5" ? 5 : 3),
      homeSetsWon: numberValue(
        state.homeSetsWon,
        numberValue(state.myTeamSetsWon),
      ),
      awaySetsWon: numberValue(
        state.awaySetsWon,
        numberValue(state.opponentSetsWon),
      ),
      completedSets: completedSetsFromState(state),
      isComplete: row.is_complete,
      isLive: !row.is_complete,
      updatedAt,
      teamHub:
        row.team_slug && row.team_name
          ? { slug: row.team_slug, name: row.team_name }
          : undefined,
      home: {
        name: stringValue(row.home_name, "Home"),
        score: score.home,
        color: stringValue(row.home_color, "#1556C0"),
      },
      away: {
        name: stringValue(row.away_name, "Away"),
        score: score.away,
        color: stringValue(row.away_color, "#EA2850"),
      },
    },
    media: mediaFromRow(row, status),
    viewerCount: Math.max(0, numberValue(status?.viewerCount)),
    activity: activityFromState(state),
    latestAction:
      stringValue(latestFeed.text) ||
      stringValue(currentActivity.message) ||
      undefined,
    connection: "connected",
    expiresAt: Number.isFinite(completedAt)
      ? new Date(completedAt + FIFTEEN_MINUTES_MS).toISOString()
      : undefined,
  };
}

function patchRow(
  current: PublicFanViewMatchRow,
  payload: unknown,
  event: "score" | "state",
): PublicFanViewMatchRow {
  const body = asRecord(payload);
  const patch = event === "score" ? asRecord(body.statePatch) : body;
  const state = {
    ...asRecord(current.state),
    ...patch,
    ...(body.homeScore !== undefined ? { homeScore: body.homeScore } : {}),
    ...(body.awayScore !== undefined ? { awayScore: body.awayScore } : {}),
    ...(body.currentSet !== undefined ? { currentSet: body.currentSet } : {}),
  };
  const complete =
    typeof patch.isComplete === "boolean"
      ? patch.isComplete
      : current.is_complete;
  return {
    ...current,
    state,
    is_complete: complete,
    ended_at:
      complete && !current.is_complete
        ? new Date().toISOString()
        : current.ended_at,
    // Keep the last server revision. A browser clock can be ahead of the
    // database clock; stamping a local time here can otherwise cause
    // fetchRow() to reject newer durable score rows as "older" forever.
    updated_at: current.updated_at,
  };
}

export function createSupabaseFanViewAdapter({
  client,
  fetch: fetchImpl = globalThis.fetch,
  liveWorkerUrl,
  pollIntervalMs = FANVIEW_SCORE_FALLBACK_POLL_MS,
  statusIntervalMs = 30_000,
  statusTimeoutMs = FANVIEW_STATUS_TIMEOUT_MS,
}: AdapterOptions): FanViewAdapter {
  const rows = new Map<string, PublicFanViewMatchRow>();
  const statuses = new Map<string, LiveStatus>();

  const bestEffortAnonymousSession = async () => {
    try {
      const { data } = await client.auth.getSession();
      if (!data.session) await client.auth.signInAnonymously();
    } catch {
      // The public match RPC remains usable when anonymous auth is unavailable.
    }
  };

  const fetchRow = async (
    shareId: string,
    signal?: AbortSignal,
  ): Promise<PublicFanViewMatchRow> => {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    await bestEffortAnonymousSession();
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

    let result = await client
      .rpc("fanview_public_match_v2", { match_share_id: shareId })
      .maybeSingle();
    if (result.error?.code === "PGRST202" || result.error?.code === "42883") {
      result = await client
        .rpc("fanview_public_match", { match_share_id: shareId })
        .maybeSingle();
    }
    if (result.error) throw result.error;
    if (!result.data) {
      throw new FanViewUnavailableError(
        "This match is unavailable, expired, or no longer published.",
      );
    }
    const row = result.data as PublicFanViewMatchRow;
    const current = rows.get(shareId);
    const currentRevision = Date.parse(current?.updated_at || "") || 0;
    const nextRevision = Date.parse(row.updated_at || "") || 0;
    if (current && nextRevision < currentRevision) return current;
    rows.set(shareId, row);
    return row;
  };

  const fetchStatus = async (shareId: string): Promise<LiveStatus | null> => {
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const request = fetchImpl(
        `${liveWorkerUrl}/status/${encodeURIComponent(shareId)}`,
        { cache: "no-store", signal: controller.signal },
      );
      const response = await Promise.race([
        request,
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => {
            controller.abort();
            reject(new DOMException("Timed out", "TimeoutError"));
          }, statusTimeoutMs);
        }),
      ]);
      if (!response.ok) return null;
      const status = (await response.json()) as LiveStatus;
      statuses.set(shareId, status);
      return status;
    } catch {
      return null;
    } finally {
      if (timeout !== undefined) clearTimeout(timeout);
    }
  };

  const makeSnapshot = async (
    shareId: string,
    row: PublicFanViewMatchRow,
  ) => {
    const freshStatus = await fetchStatus(shareId);
    return fanViewSnapshotFromRow(
      row,
      freshStatus ?? statuses.get(shareId) ?? null,
    );
  };

  return {
    async loadSnapshot(shareId, signal) {
      return makeSnapshot(shareId, await fetchRow(shareId, signal));
    },
    subscribe(shareId, onSnapshot, onError) {
      let active = true;
      let channel: RealtimeChannel | null = null;
      let pollTimer: number | undefined;
      let statusTimer: number | undefined;

      const deliver = (row = rows.get(shareId)) => {
        if (!active || !row) return;
        onSnapshot(
          fanViewSnapshotFromRow(row, statuses.get(shareId) ?? null),
        );
      };
      const refresh = async () => {
        if (!active || document.hidden) return;
        try {
          deliver(await fetchRow(shareId));
        } catch (error) {
          if (active) onError(error);
        }
      };
      const refreshStatus = async () => {
        if (!active || document.hidden) return;
        const status = await fetchStatus(shareId);
        if (active && status) deliver();
      };
      const refreshWhenVisible = () => {
        if (!document.hidden) void refresh();
      };

      channel = client
        .channel(`game:${shareId}`)
        .on("broadcast", { event: "score" }, ({ payload }) => {
          const current = rows.get(shareId);
          if (!current) return void refresh();
          const next = patchRow(current, payload, "score");
          rows.set(shareId, next);
          deliver(next);
        })
        .on("broadcast", { event: "state" }, ({ payload }) => {
          const current = rows.get(shareId);
          if (!current) return void refresh();
          const next = patchRow(current, payload, "state");
          rows.set(shareId, next);
          deliver(next);
        })
        .subscribe((status) => {
          if (!active) return;
          if (status === "SUBSCRIBED") {
            deliver();
          } else if (
            status === "CHANNEL_ERROR" ||
            status === "TIMED_OUT" ||
            status === "CLOSED"
          ) {
            const current = rows.get(shareId);
            if (current) {
              onSnapshot({
                ...fanViewSnapshotFromRow(
                  current,
                  statuses.get(shareId) ?? null,
                ),
                connection: "reconnecting",
              });
            }
          }
        });

      pollTimer = window.setInterval(() => void refresh(), pollIntervalMs);
      statusTimer = window.setInterval(
        () => void refreshStatus(),
        statusIntervalMs,
      );
      document.addEventListener("visibilitychange", refreshWhenVisible);
      window.addEventListener("online", refreshWhenVisible);
      return () => {
        active = false;
        if (pollTimer !== undefined) window.clearInterval(pollTimer);
        if (statusTimer !== undefined) window.clearInterval(statusTimer);
        document.removeEventListener("visibilitychange", refreshWhenVisible);
        window.removeEventListener("online", refreshWhenVisible);
        if (channel) void client.removeChannel(channel);
      };
    },
  };
}
