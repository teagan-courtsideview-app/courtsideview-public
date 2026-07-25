# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

The locked visual source for this prototype is
`../../docs/design/fanview-community-chat-mockup-v1.png`, governed by
`../../docs/fanview-community-approved-design-handoff-2026-07-25.md`.
Do not alter the approved FanView presentation. This directory is an isolated
fixture-backed SPA slice: do not add production URLs, Supabase clients,
Cloudflare Worker calls, broadcasting code, or imports from the mobile app.
Community must remain disabled by default and must fail independently from
video, score, viewer presence, fullscreen, and expiration behavior.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
