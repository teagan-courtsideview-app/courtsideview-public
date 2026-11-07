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
  writeFileSync(path.join(assets, "old-app.js"), "old gate");
  writeFileSync(path.join(packageRoot, "scripts/approved-presentation.json"), JSON.stringify(manifest));
  writeFileSync(path.join(packageRoot, "dist/index.html"), '<html><script type="module" src="/assets/fanview-production/assets/new-guest.js"></script><link rel="stylesheet" href="/assets/fanview-production/assets/drifted.css"></html>');
  writeFileSync(path.join(packageRoot, "dist/assets/new-guest.js"), "guest viewer");
  writeFileSync(path.join(packageRoot, "dist/assets/drifted.css"), "body { font-family: incorrect; }");
  return { root, packageRoot, assets };
}

test("stages only rebuilt JS plus exact approved CSS and dependencies", () => {
  const f = fixture();
  stageProductionBuild({ packageRoot: f.packageRoot, preserveApprovedPresentation: true });
  const html = readFileSync(path.join(f.root, "fanview-react.html"), "utf8");
  assert.match(html, /new-guest\.js/);
  assert.ok(html.includes(manifest.stylesheet));
  assert.ok(!html.includes("drifted.css"));
  assert.deepEqual(readdirSync(f.assets).sort(), [...manifest.files.map(({ file }) => file), "new-guest.js"].sort());
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
