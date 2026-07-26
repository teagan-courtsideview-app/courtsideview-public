#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const webRoot = path.resolve(packageRoot, "..");
const dist = path.join(packageRoot, "dist");
const stagedAssets = path.join(webRoot, "assets", "fanview-production");
const builtIndex = path.join(dist, "index.html");
const stagedIndex = path.join(webRoot, "fanview-react.html");

if (!existsSync(builtIndex)) throw new Error("Missing production SPA build.");

rmSync(stagedAssets, { recursive: true, force: true });
mkdirSync(stagedAssets, { recursive: true });

for (const entry of ["assets"]) {
  const source = path.join(dist, entry);
  if (existsSync(source)) {
    cpSync(source, path.join(stagedAssets, entry), { recursive: true });
  }
}

const html = readFileSync(builtIndex, "utf8");
writeFileSync(stagedIndex, html);
console.log("Staged FanView production SPA at fanview-react.html.");
