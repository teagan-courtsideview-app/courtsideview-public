export interface FanViewFeatureFlags {
  communityEnabled: boolean;
}

export function resolveFeatureFlags(env: {
  VITE_FANVIEW_COMMUNITY_ENABLED?: string;
}): FanViewFeatureFlags {
  return {
    communityEnabled: env.VITE_FANVIEW_COMMUNITY_ENABLED === "true",
  };
}

/**
 * Production-safe default: an absent flag always hides and disconnects
 * community. The local `community` Vite mode is the only checked-in opt-in.
 */
export const featureFlags = resolveFeatureFlags(
  import.meta.env as unknown as {
    VITE_FANVIEW_COMMUNITY_ENABLED?: string;
  },
);
