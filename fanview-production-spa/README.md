# FanView production SPA

This package is the production integration shell for the approved FanView
React/TypeScript presentation. The locked visual components remain in
`../fanview-spa`; production Supabase, Cloudflare viewer, presence, expiration,
and routing code live here so the design prototype remains fixture-only.

## Safety boundary

- `/v/:shareId` continues to use `fanview.html` during controlled validation.
- `/fanview-next/v/:shareId` serves this SPA for canary testing.
- `/fanview/legacy/:shareId` always serves the proven static viewer.
- `/live` and all broadcaster-token and ingest behavior are unchanged.
- The production SPA calls only viewer Worker routes: `status`, `play`, and
  `presence`.

## Build and verification

`npm run build` creates the hashed static bundle and stages it into the parent
website as `fanview-react.html` plus `assets/fanview-production/`.

The root `npm run test:fanview-community` command runs this package's
typecheck, tests, and build alongside every existing broadcast and Team Hub
parity gate.

## Cutover

Do not make the SPA the default `/v/:shareId` renderer until a real controlled
live match passes video start, score/state events, reconnect, fullscreen,
presence, completion, exact 15-minute expiry, Team Hub return, and Community
failure-isolation checks. Rollback remains a single Vercel rewrite back to
`fanview.html`.

## Guest-viewing hotfix and presentation source drift (2026-11-07)

Shared-link viewing is public. Match RPC/realtime uses a separate, nonpersistent
Supabase client; viewer Worker requests carry neither account bearer tokens nor
cookies. Optional account preferences and Community retain the account client.
The server remains authoritative for publication and link expiry.

**Do not stage CSS from the current development sources.** The verified deployed
release `9f8ed8d92f52132ced70f3c540326e3f937057ea` contains approved typography,
materials, and Community surface styling missing from the committed style
sources. Ordinary `npm run build` intentionally stops at staging if its CSS
hash differs. The development preview therefore is not presentation parity QA.
General style changes require reconciling those source files first. The bounded
QA correction described below is maintained separately to avoid that drift.

For this guest-viewing fix, use the explicit reproducible path:

```bash
npm ci
npm run typecheck
npm test
npm run test:staging
npm run build:guest-hotfix
```

Install `../fanview-spa` dependencies with `npm ci` as well before typechecking
or building. This command builds new application JavaScript, then preserves the
exact verified deployed stylesheet and its font/icon dependencies. The
`./scripts/approved-presentation.json` manifest records source commit and SHA-256
hashes. Every baseline asset is checked before staging modifies any files;
missing/mismatched inputs cause failure. The staged `../fanview-react.html`
references the newly built application JS, approved unchanged CSS, and a separate
content-hashed `scripts/reflow-corrections.css` stylesheet. That bounded correction
fixes observed 200% reflow team-name/history clipping, timeout overflow, and
undersized Display position targets, plus Full Score clipping in compact
landscape. It does not rebuild the stale development styles or change ordinary
viewport presentation. Staging tests verify baseline bytes, exact correction
bytes and ordering, and fail before mutation when required inputs are missing.

The missing `ApprovedBrandIcon` source was restored from function `K1` in that
same release's `index-B4FcvEYS.js`; the original SVG sprite is byte-identical.
DOM and sprite-hash tests pin this recovery without redesigning the icons.
See `../docs/fanview-guest-viewing-2026-11-07.md` for scope and verification.
