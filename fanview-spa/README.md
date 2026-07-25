# FanView React + TypeScript SPA slice

This directory is an isolated, fixture-backed first implementation of the
approved FanView viewing screen. It does not import or change the current
`web/fanview.html`, Team Hub, mobile app, live-broadcast Worker, or Supabase
project.

## Safety boundary

- Community is disabled by default.
- `npm run dev` and the default production build do not mount community.
- `npm run dev:community` explicitly enables the approved community fixture for
  local design and interaction QA.
- The FanView and community surfaces communicate only through typed adapter
  interfaces in `src/adapters/contracts.ts`.
- Checked-in adapters use local fixtures and contain no production URLs,
  credentials, database clients, WebRTC sessions, or network requests.
- Community loading, transport, send, and render failures are isolated from the
  video, viewer, and score surface.

## Run locally

```bash
npm install
npm run dev:community
```

Open `http://localhost:5173/v/local-fixture`.

Use the production-safe default without community:

```bash
npm run dev
```

## Verify

```bash
npm run typecheck
npm test
npm run build
npm run test:sites
```

The first three commands are independent. `npm run test:sites` must run after
`npm run build` because it verifies generated build output.

## Integration blockers and gates

This slice is intentionally not connected to production. Integration requires:

1. A production `FanViewAdapter` that preserves the currently published score,
   timeout/activity, viewer presence, video reconnection, fullscreen, stable
   share ID, and 15-minute expiration contracts.
2. A separately load-tested `CommunityAdapter` backed by approved room
   admission, private Realtime, moderation, reporting, blocking, retention,
   rate limits, and kill-switch services.
3. Confirmation that the production Supabase project reference is
   `gnzhdhagvahylcjmyeeh` before any backend migrations.
4. Cloudflare Pages staging and routing for `/v/:shareId`, with the current
   website route retained as a rollback path until full regression QA passes.
5. End-to-end regression coverage for existing broadcaster links and token
   capture, camera pairing, live start/stop, reconnect, portrait/landscape
   fullscreen, score events, and expiration.
6. Team Hub regression coverage for schedules, multiple live FanView choices,
   final results, follow/alerts, owner controls, coach access, and legacy links.
7. UGC policy, privacy, support, moderation operations, Apple, and Google release
   gates before verified free text can be enabled.

Until every gate passes, keep the production community flag off and do not
redirect current broadcasters or viewers to this SPA.
