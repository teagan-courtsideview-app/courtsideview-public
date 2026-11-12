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

// Chat is paused for this release. A shared URL or account session cannot
// enable an unavailable product surface. Local design fixtures remain usable.
export const communityMode = (location: Pick<Location, "hostname" | "search"> = window.location): "off" | "preview" | "live" => {
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  const requested = new URLSearchParams(location.search).get("community");
  return local && requested === "preview" ? "preview" : "off";
};
