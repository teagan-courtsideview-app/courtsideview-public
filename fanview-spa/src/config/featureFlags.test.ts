import { describe, expect, it } from "vitest";
import { resolveFeatureFlags } from "./featureFlags";

describe("FanView feature flags", () => {
  it("keeps community disabled when the flag is absent", () => {
    expect(resolveFeatureFlags({})).toEqual({ communityEnabled: false });
  });

  it("requires the exact explicit true value", () => {
    expect(
      resolveFeatureFlags({ VITE_FANVIEW_COMMUNITY_ENABLED: "TRUE" }),
    ).toEqual({ communityEnabled: false });
    expect(
      resolveFeatureFlags({ VITE_FANVIEW_COMMUNITY_ENABLED: "true" }),
    ).toEqual({ communityEnabled: true });
  });
});
