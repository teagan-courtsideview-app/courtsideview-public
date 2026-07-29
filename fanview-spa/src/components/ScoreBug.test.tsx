import { describe, expect, it } from "vitest";

import {
  scoreBugReadableTeamColor,
  scoreBugTextColor,
} from "./ScoreBug";

describe("ScoreBug contrast", () => {
  it("keeps dark team colors readable on the dark scoreboard", () => {
    expect(scoreBugReadableTeamColor("#000000")).toBe("#FFFFFF");
    expect(scoreBugReadableTeamColor("#07101B")).toBe("#FFFFFF");
  });

  it("preserves team colors that meet the text contrast target", () => {
    expect(scoreBugReadableTeamColor("#EF4444")).toBe("#EF4444");
  });

  it("keeps existing team-color chip text contrast behavior", () => {
    expect(scoreBugTextColor("#000000")).toBe("#FFFFFF");
    expect(scoreBugTextColor("#FFB800")).toBe("#101827");
  });
});
