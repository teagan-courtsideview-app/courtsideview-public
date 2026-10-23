# Marketing text QA follow-up — October 23, 2026

## Defect and scope
The prior heading-focused audit missed the Growth rail's b/span display labels. The user reported EVERYONE overflowing its card. Prior full-page screenshot review also missed the defect. The audit now visits every rendered text node and checks word ranges against all applicable ancestor content boxes, subtracting borders/padding. Page-level overflow alone is insufficient evidence.

Static marketing-only correction from live web cb4cd5b2c792a2aa25899d8c5a8cf9e16bfd95cc. No app, viewer, broadcaster, Team/Club/Community, API, routing, deployed media, or executable page script changes. Approved Jakarta typeface and release screenshots retained. The separate static-marketing QA scope in AGENTS.md applies.

## Changes
- Growth display labels use their card content width, capped type size and 1.12 line height. Whole words remain intact.
- Demo-tab labels use a bounded size and 1.15 line height.
- Desktop navigation gaps tighten near tablet width; brand cannot shrink into adjacent navigation.
- QR caption fits its column without breaking the brand name.
- Hero command words remain intact and wrap as complete labels, with readable leading.
- Press email links offer a natural wrap after @ on narrow phones.
- Narrow marketing-preview CTA grows with its two-line label and has vertical padding.
- All 16 static pages and their generator load versioned brand-v3.css; functional public pages do not.

## Actual QA evidence
- 16 pages at 19 widths: 320,375,390,620,621,768,899,900,901,1024,1100,1101,1180,1181,1280,1440,1520,1600,1920. 304 rendered text cases, zero ordinary word splits or text outside component content boxes after fixes.
- 3 demo states, 4 feature states and 6 gallery states at 320/901/1440/1920: 52 text checks.
- All Home FAQ rows expanded and marketing preview open at 320/901/1440; mobile navigation open at320. Escape restores preview trigger focus. This is a static marketing preview, not a product FanView journey.
- Narrow-width line-height diagnostic across16pages found no text line-height below font size. Screen-reader-only clipped table headers are explicitly excluded; scrollable tables are measured within cells rather than against the scrolling viewport.
- Independent design review of Growth at320/901/1440/1920 confirms intact words, padding and spacing; eight additional390px viewport captures reviewed. A cramped320px preview CTA found in critique was corrected.
- Reusable read-only DOM check: scripts/marketing-text-geometry.js. Execute auditMarketingText after document/fonts load at the required viewport, then exercise each interactive state and rerun. A nonempty issues array or documentOverflow is a failure to investigate. Hidden accessibility headers and intentional table scrolling are narrowly handled, not blanket overflow exclusions.
- Static metadata/schema/link/crawlability checks, generator reproduction and live verification recorded in the external evidence bundle. Browser reflow does not claim native-device or independent browser-zoom certification.

Evidence: /Users/user/.codex/visualizations/2026/10/19/01a154c7-d5a6-7450-822d-0efc728c1d75/marketing-text-qa-20261023
