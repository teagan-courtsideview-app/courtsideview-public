import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stageProductionBuild } from "../scripts/stage-production-build.mjs";

const actualPackage = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(path.join(actualPackage, "scripts/approved-presentation.json"), "utf8"));
const temporary = [];
afterEach(() => { for (const root of temporary.splice(0)) rmSync(root, { recursive: true, force: true }); });

function fixture() {
  const root = mkdtempSync(path.join(os.tmpdir(), "fanview-staging-")); temporary.push(root);
  const packageRoot = path.join(root, "fanview-production-spa");
  const assets = path.join(root, "assets/fanview-production/assets");
  mkdirSync(assets, { recursive: true });
  mkdirSync(path.join(packageRoot, "dist/assets"), { recursive: true });
  mkdirSync(path.join(packageRoot, "scripts"), { recursive: true });
  for (const { file } of manifest.files) cpSync(path.resolve(actualPackage, "../assets/fanview-production/assets", file), path.join(assets, file));
  cpSync(path.join(actualPackage, "scripts/reflow-corrections.css"), path.join(packageRoot, "scripts/reflow-corrections.css"));
  writeFileSync(path.join(assets, "old-app.js"), "old gate");
  writeFileSync(path.join(packageRoot, "scripts/approved-presentation.json"), JSON.stringify(manifest));
  writeFileSync(path.join(packageRoot, "dist/index.html"), '<html><script type="module" src="/assets/fanview-production/assets/new-guest.js"></script><link rel="stylesheet" href="/assets/fanview-production/assets/drifted.css"></html>');
  writeFileSync(path.join(packageRoot, "dist/assets/new-guest.js"), "guest viewer");
  writeFileSync(path.join(packageRoot, "dist/assets/drifted.css"), "body { font-family: incorrect; }");
  return { root, packageRoot, assets };
}

test("stages rebuilt JS, exact approved assets, and bounded correction", () => {
  const f = fixture();
  stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true });
  const html = readFileSync(path.join(f.root, "fanview-react.html"), "utf8");
  assert.match(html, /new-guest\.js/);
  assert.ok(html.includes(manifest.stylesheet));
  assert.ok(!html.includes("drifted.css"));
  assert.deepEqual(readdirSync(f.assets).sort(), [...manifest.files.map(({ file }) => file), "new-guest.js", `reflow-${createHash("sha256").update(readFileSync(path.join(actualPackage, "scripts/reflow-corrections.css"))).digest("hex").slice(0, 16)}.css`].sort());
  for (const { file, sha256 } of manifest.files) assert.equal(createHash("sha256").update(readFileSync(path.join(f.assets, file))).digest("hex"), sha256);
});

test("ordinary staging refuses source CSS drift before changing assets", () => {
  const f = fixture();
  assert.throws(() => stageProductionBuild({ packageRoot: f.packageRoot }), /CSS differs from the approved release/);
  assert.ok(existsSync(path.join(f.assets, "old-app.js")));
});

test("missing approved asset blocks hotfix staging without deleting existing files", () => {
  const f = fixture();
  rmSync(path.join(f.assets, manifest.files[1].file));
  assert.throws(() => stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true }), /Missing approved presentation asset/);
  assert.ok(existsSync(path.join(f.assets, "old-app.js")));
});

test("mismatched approved stylesheet blocks hotfix staging without deleting existing files", () => {
  const f = fixture();
  writeFileSync(path.join(f.assets, manifest.stylesheet), "unexpected style change");
  assert.throws(() => stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true }), /Approved presentation hash mismatch/);
  assert.ok(existsSync(path.join(f.assets, "old-app.js")));
});

test("missing bounded correction fails before modifying staged assets", () => {
  const f = fixture();
  rmSync(path.join(f.packageRoot, "scripts/reflow-corrections.css"));
  assert.throws(() => stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true }), /ENOENT/);
  assert.ok(existsSync(path.join(f.assets, "old-app.js")));
});
test("stages exact bounded correction after baseline stylesheet", () => {
  const f = fixture();
  stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true });
  const name = readdirSync(f.assets).find((name) => name.startsWith("reflow-"));
  assert.deepEqual(readFileSync(path.join(f.assets, name)), readFileSync(path.join(actualPackage, "scripts/reflow-corrections.css")));
  const html = readFileSync(path.join(f.root, "fanview-react.html"), "utf8");
  assert.ok(html.indexOf(name) > html.indexOf(manifest.stylesheet));
});

test("large Minimal scales inward at every corner without changing center or scale", () => {
  const css = readFileSync(path.join(actualPackage, "scripts/reflow-corrections.css"), "utf8");
  for (const corner of ["top-left", "top-right", "bottom-left", "bottom-right"]) {
    const selector = `.fanview-app[data-scoreboard-layout="minimal"][data-scoreboard-size="large"][data-scoreboard-position="${corner}"] .score-bug`;
    assert.ok(css.includes(`${selector} { transform-origin: ${corner.replace("-", " ")}; }`));
  }
  assert.ok(!css.includes('data-scoreboard-position="bottom-center"'));
  assert.ok(!css.includes("scale("));
});

test("LIVE and Chat opaque label backgrounds retain white-text contrast margin", () => {
  const css = readFileSync(path.join(actualPackage, "scripts/reflow-corrections.css"), "utf8");
  const contrast = (hex) => {
    const rgb = hex.match(/../g).map((value) => parseInt(value, 16) / 255);
    const linear = rgb.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 1.05 / (linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722 + 0.05);
  };
  for (const selector of [".fanview-app .viewer-header .live-pill", ".fanview-app .community-launcher"]) {
    const rule = css.split(`${selector} { background-color: #`)[1];
    assert.ok(rule, `Missing bounded contrast rule: ${selector}`);
    const hex = rule.slice(0, 6);
    assert.match(hex, /^[a-f\d]{6}$/);
    assert.ok(contrast(hex) >= 4.7, `${selector} contrast ${contrast(hex)} must leave margin above 4.5:1`);
  }
  assert.ok(!css.includes("--fanview-live-red:"));
  assert.ok(!css.includes("--fanview-pink-500:"));
});
