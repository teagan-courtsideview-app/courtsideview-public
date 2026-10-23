# Marketing typography correction — October 23, 2026

The first Jakarta rollout passed document-overflow checks but missed words broken inside narrow sections and oversized headings inherited from the old condensed font. User screenshots exposed this gap. This correction audits text ranges inside components as well as page bounds.

## Changes
- Marketing-only versioned stylesheet used by all 16 marketing/SEO/editorial pages.
- Component-sized heading hierarchy, full-row Challenger introduction, balanced whole-word headings, earlier demo/gallery stacking and stacked feature captions.
- Footer wrapping at tablet widths, readable mobile download heading, higher-contrast primary actions and links on cream backgrounds.
- Guest wording explicitly distinguishes free local Scorekeeper from account-required FanView/other account features, including matching visible FAQ and structured data.
- No new runtime behavior, routes, API changes, app binaries, or screenshot changes in this correction. Existing approved release screenshots retained.

## Actual validation
- Browser DOM Range checks: 16 pages × 9 widths (320, 375, 390, 620, 768, 900, 1024, 1100, 1440). No ordinary midword splits, text outside its component, clipped checked text, or document horizontal overflow after fixes. Intentional hyphen boundaries and a contact URL can wrap.
- All three demo states, six gallery states and four feature states checked at 390 and 1440; no detected text overflow.
- Full-page captures at 390/1440 independently inspected by two design/source-review agents. Captures were repeated after scrolling to reveal lazy imagery; original blank-image concerns resolved.
- Mobile menu open/close, FanView marketing preview open/Escape and focus return inspected; actual FanView product journey is not claimed here.
- Static metadata, canonical/FAQ/schema parity, links/assets, crawlability, generator reproduction and candidate diff checked separately.
- Narrow-width reflow exercised. This record does not claim a separate native-device or browser-zoom certification.

Evidence is outside the publishing checkout:
`/Users/user/Documents/Claude/Projects/CourtsideView-research/website-brand-rollout-2026-10-23`.

## Coordinated approved font-only product payload
Parent commit `38099f31ce1651ab7d3ec9902a413586b6a37ad8` contains the seven public product-page font-only changes approved by Adam in this chat. Those files are unchanged by this marketing correction. The recorded one-time exception covers that identical payload; it expires after its deployment or 24 hours. Static marketing changes use the separate marketing QA scope. Full device/FanView journey evidence remains incomplete and is not reported as passed.
