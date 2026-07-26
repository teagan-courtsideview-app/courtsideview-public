#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.courtsideviewapp.com";

const HOME_TITLE = "CourtsideView | Volleyball Match Day in One App";
const HOME_DESCRIPTION = "CourtsideView is a volleyball score keeper and player stats app for live scores, rotations, rosters, and FanView updates on iPhone, iPad, and Android.";
const SOCIAL_DESCRIPTION = "Score the match, track rotations and player stats, and share live FanView updates with the whole volleyball family.";
const SOCIAL_IMAGE = `${ORIGIN}/assets/og-image-20260617.png`;
const APPLE_BANNER = `app-id=6766532771, app-argument=${ORIGIN}/`;
const APP_STORE_URL = "https://apps.apple.com/us/app/courtsideview/id6766532771";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=app.courtsideview.android&pli=1";

const ROUTES = [
  "/",
  "/courtsideview-app",
  "/volleyball-score-keeper",
  "/volleyball-player-stats",
  "/volleyball-apps",
  "/best-volleyball-scorekeeping-apps-2026",
  "/best-volleyball-stat-tracking-apps-2026",
  "/best-apps-for-volleyball-clubs",
  "/best-apps-for-volleyball-parents",
  "/volleyball-app-comparison-study",
  "/vs/gamechanger",
  "/download",
  "/press",
  "/press-release-courtsideview-volleyball-app-launch",
  "/privacy",
  "/support",
];

const ROUTE_FILES = new Map([
  ["/", "index.html"],
  ["/courtsideview-app", "courtsideview-app.html"],
  ["/volleyball-score-keeper", "volleyball-scorekeeper.html"],
  ["/volleyball-player-stats", "volleyball-player-stats.html"],
  ["/volleyball-apps", "volleyball-apps.html"],
  ["/best-volleyball-scorekeeping-apps-2026", "best-volleyball-scorekeeping-apps-2026.html"],
  ["/best-volleyball-stat-tracking-apps-2026", "best-volleyball-stat-tracking-apps-2026.html"],
  ["/best-apps-for-volleyball-clubs", "best-apps-for-volleyball-clubs.html"],
  ["/best-apps-for-volleyball-parents", "best-apps-for-volleyball-parents.html"],
  ["/volleyball-app-comparison-study", "volleyball-app-comparison-study.html"],
  ["/vs/gamechanger", "vs-gamechanger.html"],
  ["/download", "download.html"],
  ["/press", "press.html"],
  ["/press-release-courtsideview-volleyball-app-launch", "press-release-courtsideview-volleyball-app-launch.html"],
  ["/privacy", "privacy.html"],
  ["/support", "support.html"],
]);

const FAQ_QUESTIONS = [
  "What is the CourtsideView app?",
  "Can CourtsideView be used as a volleyball score keeper?",
  "What volleyball player stats can I track?",
  "Can family and fans follow live volleyball scores?",
];

const EXPECTED_REWRITES = [
  ["/scout/(.*)", "/scout.html"],
  ["/live/(.*)", "/live.html"],
  ["/v/(.*)", "/fanview-react.html"],
  ["/p/(.*)", "/player.html"],
  ["/t/(.*)", "/team.html"],
  ["/c/(.*)", "/club.html"],
  ["/courtsideview-app", "/courtsideview-app.html"],
  ["/volleyball-apps", "/volleyball-apps.html"],
  ["/best-volleyball-scorekeeping-apps-2026", "/best-volleyball-scorekeeping-apps-2026.html"],
  ["/best-volleyball-stat-tracking-apps-2026", "/best-volleyball-stat-tracking-apps-2026.html"],
  ["/best-apps-for-volleyball-clubs", "/best-apps-for-volleyball-clubs.html"],
  ["/best-apps-for-volleyball-parents", "/best-apps-for-volleyball-parents.html"],
  ["/volleyball-app-comparison-study", "/volleyball-app-comparison-study.html"],
  ["/vs/gamechanger", "/vs-gamechanger.html"],
  ["/volleyball-score-keeper", "/volleyball-scorekeeper.html"],
  ["/volleyball-player-stats", "/volleyball-player-stats.html"],
  ["/press", "/press.html"],
  ["/press-release-courtsideview-volleyball-app-launch", "/press-release-courtsideview-volleyball-app-launch.html"],
  ["/download", "/download.html"],
  ["/privacy", "/privacy.html"],
  ["/support", "/support.html"],
];

const EXPECTED_REDIRECTS = [
  ["/privacy.html", "/privacy"],
  ["/support.html", "/support"],
  ["/download.html", "/download"],
  ["/courtsideview-app.html", "/courtsideview-app"],
  ["/courtsideviewapp", "/courtsideview-app"],
  ["/courtsideviewapp.html", "/courtsideview-app"],
  ["/courtside-view-app", "/courtsideview-app"],
  ["/courtside-view-app.html", "/courtsideview-app"],
  ["/what-is-courtsideview", "/courtsideview-app"],
  ["/what-is-courtsideview.html", "/courtsideview-app"],
  ["/press-release-courtsideview-volleyball-app-launch.html", "/press-release-courtsideview-volleyball-app-launch"],
  ["/press.html", "/press"],
  ["/vs-gamechanger.html", "/vs/gamechanger"],
  ["/volleyball-scorekeeper", "/volleyball-score-keeper"],
  ["/volleyball-scorekeeper.html", "/volleyball-score-keeper"],
  ["/volleyball-player-stats.html", "/volleyball-player-stats"],
  ["/volleyball-apps.html", "/volleyball-apps"],
  ["/best-volleyball-scorekeeping-apps-2026.html", "/best-volleyball-scorekeeping-apps-2026"],
  ["/best-volleyball-stat-tracking-apps-2026.html", "/best-volleyball-stat-tracking-apps-2026"],
  ["/best-apps-for-volleyball-clubs.html", "/best-apps-for-volleyball-clubs"],
  ["/best-apps-for-volleyball-parents.html", "/best-apps-for-volleyball-parents"],
  ["/volleyball-app-comparison-study.html", "/volleyball-app-comparison-study"],
  ["/index.html", "/"],
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function readRequired(relativePath) {
  try {
    return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  } catch (error) {
    fail(`${relativePath} cannot be read: ${error.message}`);
    return "";
  }
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, digits) => String.fromCodePoint(Number.parseInt(digits, 16)))
    .replace(/&#([0-9]+);/g, (_, digits) => String.fromCodePoint(Number.parseInt(digits, 10)))
    .replace(/&quot;/gi, "\"")
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&");
}

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of tag.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  }
  return attributes;
}

function openingTags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => ({
    raw: match[0],
    attributes: parseAttributes(match[0]),
  }));
}

function expectExact(actual, expected, label) {
  if (actual !== expected) fail(`${label} changed (expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)})`);
}

function expectSingleMeta(metaTags, attribute, key, expected) {
  const matches = metaTags.filter(({ attributes }) => attributes[attribute]?.toLowerCase() === key.toLowerCase());
  if (matches.length !== 1) {
    fail(`${attribute}=${JSON.stringify(key)} must appear exactly once (found ${matches.length})`);
    return;
  }
  expectExact(matches[0].attributes.content, expected, `${attribute}=${JSON.stringify(key)}`);
}

function visibleBody(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (body === undefined) {
    fail("index.html must contain one complete <body> element");
    return "";
  }
  return body
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
}

function textContent(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function pathSetDifference(expected, actual) {
  return [...expected].filter((entry) => !actual.has(entry));
}

function localPathFromReference(reference, sourceFile = "index.html") {
  if (!reference) return null;
  let value = decodeHtml(reference).trim();
  if (!value || value.startsWith("#") || value.startsWith("data:") || value.startsWith("blob:")) return null;

  if (/^https?:\/\//i.test(value)) {
    let url;
    try {
      url = new URL(value);
    } catch {
      return null;
    }
    if (url.origin !== ORIGIN) return null;
    value = url.pathname;
  } else if (/^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith("//")) {
    return null;
  }

  value = value.split(/[?#]/, 1)[0];
  try {
    value = decodeURIComponent(value);
  } catch {
    fail(`invalid URL encoding in ${sourceFile}: ${reference}`);
    return null;
  }

  const absolute = value.startsWith("/")
    ? path.resolve(ROOT, `.${value}`)
    : path.resolve(ROOT, path.dirname(sourceFile), value);
  const relative = path.relative(ROOT, absolute);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    if (relative.startsWith("..") || path.isAbsolute(relative)) fail(`local reference escapes the site root in ${sourceFile}: ${reference}`);
    return null;
  }
  return relative.split(path.sep).join("/");
}

function isFile(relativePath) {
  try {
    const stat = fs.statSync(path.join(ROOT, relativePath));
    return stat.isFile() && stat.size > 0;
  } catch {
    return false;
  }
}

function hasAssetExtension(reference) {
  return /\.(?:avif|css|gif|ico|jpe?g|js|mjs|mp4|ogg|png|svg|webm|webp|woff2?|ttf|otf)$/i.test(reference.split(/[?#]/, 1)[0]);
}

const html = readRequired("index.html");
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
if (!head) fail("index.html must contain one complete <head> element");

const titleMatches = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
if (titleMatches.length !== 1) {
  fail(`homepage must contain exactly one title element (found ${titleMatches.length})`);
} else {
  expectExact(textContent(titleMatches[0][1]), HOME_TITLE, "homepage title");
}

const metaTags = openingTags(head, "meta");
expectSingleMeta(metaTags, "name", "description", HOME_DESCRIPTION);
expectSingleMeta(metaTags, "name", "apple-itunes-app", APPLE_BANNER);
expectSingleMeta(metaTags, "property", "og:type", "website");
expectSingleMeta(metaTags, "property", "og:url", `${ORIGIN}/`);
expectSingleMeta(metaTags, "property", "og:title", HOME_TITLE);
expectSingleMeta(metaTags, "property", "og:description", SOCIAL_DESCRIPTION);
expectSingleMeta(metaTags, "property", "og:image", SOCIAL_IMAGE);
expectSingleMeta(metaTags, "name", "twitter:card", "summary_large_image");
expectSingleMeta(metaTags, "name", "twitter:title", HOME_TITLE);
expectSingleMeta(metaTags, "name", "twitter:description", SOCIAL_DESCRIPTION);
expectSingleMeta(metaTags, "name", "twitter:image", SOCIAL_IMAGE);

const linkTags = openingTags(head, "link");
const canonicalLinks = linkTags.filter(({ attributes }) => attributes.rel?.toLowerCase().split(/\s+/).includes("canonical"));
if (canonicalLinks.length !== 1) {
  fail(`homepage must contain exactly one canonical link (found ${canonicalLinks.length})`);
} else {
  expectExact(canonicalLinks[0].attributes.href, `${ORIGIN}/`, "homepage canonical");
}

const bodyHtml = visibleBody(html);
const h1Count = openingTags(bodyHtml, "h1").length;
if (h1Count !== 1) fail(`homepage must contain exactly one visible-source H1 (found ${h1Count})`);

const bodyText = textContent(bodyHtml);
for (const question of FAQ_QUESTIONS) {
  if (!bodyText.includes(question)) fail(`visible homepage FAQ is missing exact question: ${question}`);
}

const jsonLdMatches = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter((match) => parseAttributes(match[1]).type?.toLowerCase() === "application/ld+json");
if (jsonLdMatches.length !== 4) fail(`homepage must contain exactly four JSON-LD blocks (found ${jsonLdMatches.length})`);

const schemas = [];
for (const [index, match] of jsonLdMatches.entries()) {
  try {
    schemas.push(JSON.parse(match[2].trim()));
  } catch (error) {
    fail(`JSON-LD block ${index + 1} does not parse: ${error.message}`);
  }
}

for (const type of ["MobileApplication", "WebSite", "Organization", "FAQPage"]) {
  const count = schemas.filter((schema) => {
    const types = Array.isArray(schema?.["@type"]) ? schema["@type"] : [schema?.["@type"]];
    return types.includes(type);
  }).length;
  if (count !== 1) fail(`JSON-LD must contain exactly one ${type} schema (found ${count})`);
}

const faqSchema = schemas.find((schema) => schema?.["@type"] === "FAQPage");
if (faqSchema) {
  const schemaQuestions = Array.isArray(faqSchema.mainEntity)
    ? faqSchema.mainEntity.map((entity) => entity?.name).filter(Boolean)
    : [];
  const missingQuestions = FAQ_QUESTIONS.filter((question) => !schemaQuestions.includes(question));
  const unexpectedQuestions = schemaQuestions.filter((question) => !FAQ_QUESTIONS.includes(question));
  if (schemaQuestions.length !== FAQ_QUESTIONS.length || missingQuestions.length || unexpectedQuestions.length) {
    fail(`FAQPage questions changed (missing: ${missingQuestions.join(", ") || "none"}; unexpected: ${unexpectedQuestions.join(", ") || "none"})`);
  }
}

const anchorHrefs = openingTags(bodyHtml, "a").map(({ attributes }) => attributes.href).filter(Boolean);
const linkedInternalPaths = new Set();
for (const href of anchorHrefs) {
  try {
    const url = new URL(href, `${ORIGIN}/`);
    if (url.origin === ORIGIN) linkedInternalPaths.add(url.pathname.replace(/\/$/, "") || "/");
  } catch {
    fail(`homepage contains an invalid anchor href: ${href}`);
  }
}
for (const route of ROUTES.slice(1)) {
  if (!linkedInternalPaths.has(route)) fail(`homepage is missing a crawlable link to ${route}`);
}

const externalAnchorHrefs = new Set(anchorHrefs.map((href) => decodeHtml(href)));
if (!externalAnchorHrefs.has(APP_STORE_URL)) fail("homepage is missing the exact App Store link");
if (!externalAnchorHrefs.has(GOOGLE_PLAY_URL)) fail("homepage is missing the exact Google Play link");

const localFiles = new Set();
const stylesheetFiles = new Set();
const scriptFiles = new Set();

function registerReference(reference, sourceFile, collection = null) {
  const localPath = localPathFromReference(reference, sourceFile);
  if (!localPath) return;
  localFiles.add(localPath);
  collection?.add(localPath);
}

for (const { attributes } of linkTags) {
  const relationships = attributes.rel?.toLowerCase().split(/\s+/) ?? [];
  if (relationships.includes("stylesheet")) registerReference(attributes.href, "index.html", stylesheetFiles);
  if (relationships.some((rel) => ["icon", "apple-touch-icon", "preload", "modulepreload"].includes(rel))) {
    registerReference(attributes.href, "index.html");
  }
}

const allOpeningTags = [...html.matchAll(/<([a-z][a-z0-9:-]*)\b[^>]*>/gi)].map((match) => ({
  name: match[1].toLowerCase(),
  attributes: parseAttributes(match[0]),
}));
for (const { name, attributes } of allOpeningTags) {
  if (["img", "video", "audio", "source", "track", "embed", "iframe", "input"].includes(name)) {
    registerReference(attributes.src, "index.html");
    registerReference(attributes["data-src"], "index.html");
  }
  if (name === "video") {
    registerReference(attributes.poster, "index.html");
    registerReference(attributes["data-poster"], "index.html");
  }
  if (name === "object") registerReference(attributes.data, "index.html");
  if (name === "script" && attributes.src) registerReference(attributes.src, "index.html", scriptFiles);
  for (const candidate of (attributes.srcset ?? "").split(",")) {
    registerReference(candidate.trim().split(/\s+/, 1)[0], "index.html");
  }
}

for (const match of html.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
  registerReference(match[2], "index.html");
}
for (const match of html.matchAll(/https:\/\/www\.courtsideviewapp\.com\/[^"'\s<>]+/gi)) {
  const reference = decodeHtml(match[0]);
  if (hasAssetExtension(reference)) registerReference(reference, "index.html");
}

if (stylesheetFiles.size === 0) fail("homepage must reference at least one local stylesheet");
if (scriptFiles.size === 0) fail("homepage must reference at least one local JavaScript file");

const scannedCodeFiles = new Set();
const pendingCodeFiles = [...stylesheetFiles, ...scriptFiles];
while (pendingCodeFiles.length) {
  const relativePath = pendingCodeFiles.shift();
  if (scannedCodeFiles.has(relativePath)) continue;
  scannedCodeFiles.add(relativePath);
  if (!isFile(relativePath)) continue;

  const source = fs.readFileSync(path.join(ROOT, relativePath), "utf8");
  const extension = path.extname(relativePath).toLowerCase();
  if (extension === ".css") {
    for (const match of source.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
      const child = localPathFromReference(match[2], relativePath);
      if (!child) continue;
      localFiles.add(child);
      if (child.endsWith(".css") && !scannedCodeFiles.has(child)) pendingCodeFiles.push(child);
    }
    for (const match of source.matchAll(/@import\s+["']([^"']+)["']/gi)) {
      const child = localPathFromReference(match[1], relativePath);
      if (!child) continue;
      localFiles.add(child);
      if (child.endsWith(".css") && !scannedCodeFiles.has(child)) pendingCodeFiles.push(child);
    }
  }

  if ([".js", ".mjs"].includes(extension)) {
    const constants = new Map();
    for (const match of source.matchAll(/\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*(["'])(.*?)\2\s*;/gs)) {
      constants.set(match[1], match[3]);
    }

    for (const match of source.matchAll(/["'](\/assets\/[^"'\s?#)]+(?:\?[^"']*)?)["']/g)) {
      if (hasAssetExtension(match[1])) registerReference(match[1], relativePath);
    }

    for (const match of source.matchAll(/`([^`]*)`/gs)) {
      const expanded = match[1].replace(/\$\{([A-Za-z_$][\w$]*)\}/g, (token, name) => constants.get(name) ?? token);
      if (!expanded.includes("${") && hasAssetExtension(expanded)) registerReference(expanded, relativePath);
    }
  }
}

for (const relativePath of [...localFiles].sort()) {
  if (!isFile(relativePath)) fail(`referenced local asset is missing or empty: ${relativePath}`);
}

const runtimeSources = [html];
for (const relativePath of scannedCodeFiles) {
  if (isFile(relativePath)) runtimeSources.push(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}
const runtimeText = runtimeSources.join("\n");
const forbiddenRuntimePatterns = [
  ["Supabase", /\bsupabase(?:-js)?\b|@supabase|\bcreateClient\s*\(/i],
  ["Vinext", /\bvinext\b/i],
  ["React/Next", /\bReactDOM\b|\bReact\.(?:createElement|Fragment|Component|use[A-Z])|\b(?:hydrateRoot|createRoot)\s*\(|\bfrom\s*["']react(?:-dom)?(?:\/[^"']*)?["']|\bimport\s*\(\s*["']react(?:-dom)?|jsx-runtime|__NEXT_DATA__|\/_next\//i],
];
for (const [label, pattern] of forbiddenRuntimePatterns) {
  if (pattern.test(runtimeText)) fail(`${label} runtime signature is present in the homepage release`);
}

const robots = readRequired("robots.txt");
expectExact(robots, `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, "robots.txt");

const sitemap = readRequired("sitemap.xml");
const sitemapEntries = [...sitemap.matchAll(/<url>\s*([\s\S]*?)<\/url>/gi)].map((match) => ({
  loc: decodeHtml(match[1].match(/<loc>\s*([\s\S]*?)\s*<\/loc>/i)?.[1]?.trim() ?? ""),
  lastmod: match[1].match(/<lastmod>\s*([\s\S]*?)\s*<\/lastmod>/i)?.[1]?.trim() ?? "",
}));
const expectedCanonicalUrls = new Set(ROUTES.map((route) => route === "/" ? `${ORIGIN}/` : `${ORIGIN}${route}`));
const actualCanonicalUrls = new Set(sitemapEntries.map(({ loc }) => loc));
if (sitemapEntries.length !== 16) fail(`sitemap.xml must contain exactly 16 URL entries (found ${sitemapEntries.length})`);
const missingSitemapUrls = pathSetDifference(expectedCanonicalUrls, actualCanonicalUrls);
const unexpectedSitemapUrls = pathSetDifference(actualCanonicalUrls, expectedCanonicalUrls);
if (missingSitemapUrls.length || unexpectedSitemapUrls.length) {
  fail(`sitemap URL set changed (missing: ${missingSitemapUrls.join(", ") || "none"}; unexpected: ${unexpectedSitemapUrls.join(", ") || "none"})`);
}
const rootSitemapEntries = sitemapEntries.filter(({ loc }) => loc === `${ORIGIN}/`);
if (rootSitemapEntries.length !== 1) {
  fail(`sitemap must contain the homepage exactly once (found ${rootSitemapEntries.length})`);
} else {
  expectExact(rootSitemapEntries[0].lastmod, "2026-07-14", "homepage sitemap lastmod");
}

for (const [route, sourceFile] of ROUTE_FILES) {
  if (!isFile(sourceFile)) fail(`source HTML for ${route} is missing or empty: ${sourceFile}`);
}

let vercel = null;
try {
  vercel = JSON.parse(readRequired("vercel.json"));
} catch (error) {
  fail(`vercel.json does not parse: ${error.message}`);
}

if (vercel) {
  expectExact(vercel.cleanUrls, false, "vercel cleanUrls");
  expectExact(vercel.trailingSlash, false, "vercel trailingSlash");

  for (const [source, destination] of EXPECTED_REWRITES) {
    const found = vercel.rewrites?.some((entry) => entry.source === source && entry.destination === destination);
    if (!found) fail(`vercel rewrite is missing: ${source} -> ${destination}`);
  }

  const requiredSecurityHeaders = new Map([
    ["X-Content-Type-Options", "nosniff"],
    ["X-Frame-Options", "SAMEORIGIN"],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
    ["Permissions-Policy", "camera=(self), microphone=(self), geolocation=()"],
  ]);
  const globalHeaders = vercel.headers?.find((entry) => entry.source === "/(.*)")?.headers ?? [];
  for (const [key, value] of requiredSecurityHeaders) {
    if (!globalHeaders.some((header) => header.key === key && header.value === value)) {
      fail(`vercel global security header is missing or changed: ${key}: ${value}`);
    }
  }
  const assetHeaders = vercel.headers?.find((entry) => entry.source === "/assets/(.*)")?.headers ?? [];
  if (!assetHeaders.some((header) => header.key === "Cache-Control" && header.value === "public, max-age=31536000, immutable")) {
    fail("vercel immutable asset Cache-Control header is missing or changed");
  }

  for (const [source, destination] of EXPECTED_REDIRECTS) {
    const found = vercel.redirects?.some((entry) => entry.source === source && entry.destination === destination && entry.permanent === true);
    if (!found) fail(`vercel permanent redirect is missing: ${source} -> ${destination}`);
  }
}

if (failures.length) {
  console.error(`FAIL homepage release gate (${failures.length} issue${failures.length === 1 ? "" : "s"})`);
  for (const message of [...new Set(failures)]) console.error(`- ${message}`);
  process.exitCode = 1;
} else {
  console.log(`PASS homepage release gate: metadata, 1 H1, 4 schemas/FAQs, 15 internal routes, ${localFiles.size} local assets, 16 sitemap URLs/source files, robots, and Vercel routing.`);
}
