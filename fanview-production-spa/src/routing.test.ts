import { describe, expect, it } from "vitest";
import { legacyFanViewUrl, productionShareId } from "./routing";

describe("production FanView routing", () => {
  it("preserves the share ID on the canary and final routes", () => {
    expect(productionShareId("/v/match-123")).toBe("match-123");
    expect(productionShareId("/fanview-next/v/match%20123")).toBe("match 123");
  });

  it("fails closed for missing and malformed routes", () => {
    expect(productionShareId("/")).toBeNull();
    expect(productionShareId("/v/%E0%A4%A")).toBeNull();
  });

  it("creates a reversible legacy route without changing identity", () => {
    expect(legacyFanViewUrl("match 123")).toBe(
      "/fanview/legacy/match%20123",
    );
  });
});
