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
