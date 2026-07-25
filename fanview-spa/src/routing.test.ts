import { describe, expect, it } from "vitest";
import { getShareId } from "./routing";

describe("FanView SPA routing", () => {
  it("extracts and decodes the stable share ID without changing it", () => {
    expect(getShareId("/v/match%20123")).toBe("match 123");
  });

  it("uses a non-production fixture ID outside a FanView route", () => {
    expect(getShareId("/")).toBe("fanview-spa-fixture");
  });
});
