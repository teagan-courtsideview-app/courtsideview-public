export const SUPABASE_URL = "https://gnzhdhagvahylcjmyeeh.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_91GTH_Tp2G0vGseUYUp9og_YtM-qlG0";
export const LIVE_WORKER_URL =
  "https://courtsideview-live.courtsideview.workers.dev";

declare global {
  interface Window {
    COURTSIDEVIEW_FANVIEW_COMMUNITY_ENABLED?: boolean;
    COURTSIDEVIEW_LIVE_WORKER_URL?: string;
  }
}

export const configuredLiveWorkerUrl = () =>
  window.COURTSIDEVIEW_LIVE_WORKER_URL || LIVE_WORKER_URL;

export const communityMode = (): "off" | "preview" | "live" => {
  const requested = new URLSearchParams(window.location.search).get("community");
  if (requested === "preview") return "preview";
  if (requested === "live") return "live";
  return window.COURTSIDEVIEW_FANVIEW_COMMUNITY_ENABLED === true ? "live" : "off";
};
