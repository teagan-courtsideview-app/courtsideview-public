import { afterEach, describe, expect, it } from "vitest";
import { communityMode } from "./config";

afterEach(() => { delete window.COURTSIDEVIEW_FANVIEW_COMMUNITY_ENABLED; });
describe("paused public Chat rollout", () => {
  it.each(["courtsideviewapp.com", "courtsideview-guest-qa-20261109.courtsideview.workers.dev"])("does not enable Chat on %s through a flag or shared-link query", hostname => {
    window.COURTSIDEVIEW_FANVIEW_COMMUNITY_ENABLED = true;
    for (const search of ["", "?community=live", "?community=preview"]) {
      expect(communityMode({ hostname, search })).toBe("off");
    }
  });
  it("retains only local preview fixtures, never a live Chat override", () => {
    expect(communityMode({hostname: "localhost", search: "?community=preview"})).toBe("preview");
    expect(communityMode({hostname: "127.0.0.1", search: "?community=preview"})).toBe("preview");
    expect(communityMode({hostname: "localhost", search: "?community=live"})).toBe("off");
  });
});
