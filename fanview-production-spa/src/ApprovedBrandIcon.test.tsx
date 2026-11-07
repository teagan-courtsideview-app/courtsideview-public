import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ApprovedBrandIcon } from "../../fanview-spa/src/components/ApprovedBrandIcon";

afterEach(cleanup);

it.each(["team", "fanview"] as const)("preserves deployed K1 SVG DOM for %s", (name) => {
  const { container } = render(<ApprovedBrandIcon name={name} size={19} />);
  const icon = container.querySelector("svg")!;
  expect(Object.fromEntries(Array.from(icon.attributes).map(({ name, value }) => [name, value]))).toEqual({
    "aria-hidden": "true", focusable: "false", width: "19", height: "19",
    viewBox: "0 0 100 100", fill: "currentColor", "data-approved-icon": name,
  });
  expect(icon.children).toHaveLength(1);
  expect(icon.firstElementChild?.tagName).toBe("use");
  expect(icon.firstElementChild?.getAttribute("href")).toMatch(new RegExp(`#${name === "team" ? "team-section" : "fanview-navigation"}$`));
});

it("preserves the exact deployed icon sprite bytes", () => {
  const bytes = readFileSync(resolve(__dirname, "../../fanview-spa/src/assets/approved-icons.svg"));
  // SHA-256 of 9f8ed8d's assets/fanview-production/assets/approved-icons-B8z14ALv.svg.
  expect(createHash("sha256").update(bytes).digest("hex")).toBe("4b41ad43fb11a8acddfeb968284f9b0ca068bee34f71ee4a264a6066329a0b4e");
});
