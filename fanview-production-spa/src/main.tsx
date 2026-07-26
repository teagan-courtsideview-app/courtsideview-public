import { createClient } from "@supabase/supabase-js";
import React from "react";
import { createRoot } from "react-dom/client";
import { createFixtureCommunityAdapter } from "../../fanview-spa/src/adapters/fixtureCommunityAdapter";
import { createSupabaseCommunityAdapter } from "../../fanview-spa/src/adapters/supabaseCommunityAdapter";
import "../../fanview-spa/src/styles.css";
import {
  communityMode,
  configuredLiveWorkerUrl,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./config";
import { ProductionApp } from "./ProductionApp";
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
const fanViewAdapter = createSupabaseFanViewAdapter({
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

createRoot(root).render(
  <React.StrictMode>
    <ProductionApp
      communityAdapter={communityAdapter}
      communityEnabled={mode !== "off"}
      fanViewAdapter={fanViewAdapter}
      liveWorkerUrl={liveWorkerUrl}
      shareId={productionShareId(window.location.pathname)}
    />
  </React.StrictMode>,
);
