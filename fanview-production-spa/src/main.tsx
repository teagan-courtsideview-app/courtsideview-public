import { createClient } from "@supabase/supabase-js";
import React from "react";
import { createRoot } from "react-dom/client";
import { createFixtureCommunityAdapter } from "../../fanview-spa/src/adapters/fixtureCommunityAdapter";
import type { FanViewSnapshot } from "../../fanview-spa/src/adapters/contracts";
import { createSupabaseCommunityAdapter } from "../../fanview-spa/src/adapters/supabaseCommunityAdapter";
import "../../fanview-spa/src/styles.css";
import {
  communityMode,
  configuredLiveWorkerUrl,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./config";
import { ProductionApp } from "./ProductionApp";
import type {
  DisplayPreferenceAdapter,
  ViewerDisplayPreference,
} from "./ProductionApp";
import { productionShareId } from "./routing";
import { createSupabaseFanViewAdapter } from "./supabaseFanViewAdapter";
import "./production.css";

const root = document.getElementById("root");
if (!root) throw new Error("FanView root element was not found.");

const client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { autoRefreshToken: true, persistSession: true },
});
const liveWorkerUrl = configuredLiveWorkerUrl();
const mode = communityMode();
const visualQaMode =
  (import.meta.env.DEV ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost") &&
  new URLSearchParams(window.location.search).get("fixture") === "qa";
const visualQaFanViewAdapter = {
  async loadSnapshot(_shareId: string, signal: AbortSignal) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    const snapshot: FanViewSnapshot = {
      shareId: "fanview-spa-fixture",
      viewerCount: 1200,
      latestAction: "Timeout called by QA Canaries",
      match: {
        setNumber: 3,
        setTarget: 25,
        totalSets: 5,
        homeSetsWon: 1,
        awaySetsWon: 1,
        completedSets: [
          { setNumber: 1, homeScore: 25, awayScore: 21 },
          { setNumber: 2, homeScore: 21, awayScore: 25 },
        ],
        timeoutTeamName: "QA Canaries",
        isComplete: false,
        isLive: true,
        updatedAt: new Date(0).toISOString(),
        teamHub: { name: "QA Canaries", slug: "qa-canaries" },
        home: { name: "QA Canaries", score: 12, color: "#F6A700" },
        away: { name: "Regression Checks", score: 9, color: "#FF496C" },
      },
      media: {
        kind: "cloudflare-realtime",
        alt: "Local FanView visual QA stream.",
      },
      activity: [],
      connection: "connected",
    };
    return snapshot;
  },
};
const fanViewAdapter = visualQaMode
  ? visualQaFanViewAdapter
  : createSupabaseFanViewAdapter({
      client,
      liveWorkerUrl,
    });
const communityAdapter =
  mode === "preview"
    ? createFixtureCommunityAdapter()
    : createSupabaseCommunityAdapter({
        client,
        gatewayUrl: `${SUPABASE_URL}/functions/v1/fanview-community`,
        publishableKey: SUPABASE_PUBLISHABLE_KEY,
      });

const isViewerDisplayPreference = (
  value: unknown,
): value is ViewerDisplayPreference => {
  if (value === null || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    ["full-score", "score-bar", "minimal"].includes(String(record.layout)) &&
    ["small", "standard", "large"].includes(String(record.size)) &&
    [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "bottom-center",
    ].includes(String(record.position)) &&
    typeof record.automatic === "boolean"
  );
};

const displayPreferenceAdapter: DisplayPreferenceAdapter = {
  async load() {
    const { data } = await client.auth.getUser();
    if (!data.user || data.user.is_anonymous) return null;
    const preference = data.user.user_metadata.fanview_viewer_display_v1;
    return isViewerDisplayPreference(preference) ? preference : null;
  },
  async save(preference) {
    const { data } = await client.auth.getUser();
    if (!data.user || data.user.is_anonymous) return;
    await client.auth.updateUser({
      data: { fanview_viewer_display_v1: preference },
    });
  },
};

createRoot(root).render(
  <React.StrictMode>
    <ProductionApp
      communityAdapter={communityAdapter}
      communityEnabled={mode !== "off"}
      displayPreferenceAdapter={displayPreferenceAdapter}
      fanViewAdapter={fanViewAdapter}
      liveWorkerUrl={liveWorkerUrl}
      shareId={
        visualQaMode
          ? "fanview-spa-fixture"
          : productionShareId(window.location.pathname)
      }
    />
  </React.StrictMode>,
);
