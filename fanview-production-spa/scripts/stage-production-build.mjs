#!/usr/bin/env node
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
const assetPrefix = "/assets/fanview-production/assets/";
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function stageProductionBuild({
  packageRoot = path.resolve(scriptRoot, ".."),
  preserveApprovedPresentation = false,
} = {}) {
  const webRoot = path.resolve(packageRoot, "..");
  const dist = path.join(packageRoot, "dist");
  const stagedAssets = path.join(webRoot, "assets", "fanview-production");
  const builtIndex = path.join(dist, "index.html");
  const stagedIndex = path.join(webRoot, "fanview-react.html");
  if (!existsSync(builtIndex)) throw new Error("Missing production SPA build.");

  const manifest = JSON.parse(readFileSync(path.join(packageRoot, "scripts", "approved-presentation.json"), "utf8"));
  let html = readFileSync(builtIndex, "utf8");
  const cssLinks = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)];
  if (cssLinks.length !== 1) throw new Error("Expected exactly one production stylesheet.");
  const builtCssUrl = cssLinks[0][1];
  if (!builtCssUrl.startsWith(assetPrefix)) throw new Error("Unexpected production stylesheet path.");
  const builtCssName = builtCssUrl.slice(assetPrefix.length);
  if (path.basename(builtCssName) !== builtCssName) throw new Error("Invalid production stylesheet path.");
  const approvedCss = manifest.files.find((entry) => entry.file === manifest.stylesheet);
  if (!approvedCss) throw new Error("Missing approved stylesheet manifest entry.");

  // Source styles lag the verified deployed presentation. Normal staging must
  // fail before deleting/replacing any deployed assets, rather than restyle it.
  if (!preserveApprovedPresentation && sha256(readFileSync(path.join(dist, "assets", builtCssName))) !== approvedCss.sha256) {
    throw new Error("Production CSS differs from the approved release. Reconcile style sources, or use npm run build:guest-hotfix for the explicit zero-style-change guest-viewing fix.");
  }

  const preserved = new Map();
  if (preserveApprovedPresentation) {
    for (const entry of manifest.files) {
      if (path.basename(entry.file) !== entry.file) throw new Error("Invalid approved asset filename.");
      const source = path.join(stagedAssets, "assets", entry.file);
      if (!existsSync(source)) throw new Error(`Missing approved presentation asset: ${entry.file}`);
      const bytes = readFileSync(source);
      if (sha256(bytes) !== entry.sha256) throw new Error(`Approved presentation hash mismatch: ${entry.file}`);
      preserved.set(entry.file, bytes);
    }
    const css = preserved.get(manifest.stylesheet).toString("utf8");
    for (const match of css.matchAll(/url\((?:"([^"]*)"|'([^']*)'|([^)]*))\)/g)) {
      const url = (match[1] ?? match[2] ?? match[3]).trim();
      if (url.startsWith("data:")) continue;
      if (!url.startsWith(assetPrefix) || !preserved.has(url.slice(assetPrefix.length))) {
        throw new Error(`Unverified approved stylesheet dependency: ${url}`);
      }
    }
    html = html.replace(builtCssUrl, `${assetPrefix}${manifest.stylesheet}`);
  }

  // Validate before replacing anything. Keep old application JS out of the
  // staged hotfix; only the newly built JS and the verified presentation ship.
  rmSync(stagedAssets, { recursive: true, force: true });
  const destination = path.join(stagedAssets, "assets");
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(path.join(dist, "assets"))) {
    if (preserveApprovedPresentation && entry.endsWith(".css")) continue;
    cpSync(path.join(dist, "assets", entry), path.join(destination, entry), { recursive: true });
  }
  for (const [name, bytes] of preserved) writeFileSync(path.join(destination, name), bytes);
  writeFileSync(stagedIndex, html);
  console.log(`Staged FanView production SPA${preserveApprovedPresentation ? " with verified unchanged presentation" : ""} at fanview-react.html.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== "--preserve-approved-presentation")) throw new Error("Unknown staging option.");
  stageProductionBuild({ preserveApprovedPresentation: args.includes("--preserve-approved-presentation") });
}
