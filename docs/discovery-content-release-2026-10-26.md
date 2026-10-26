# Static discovery content implementation — October 26, 2026

Status: reviewed static release candidate; publication receipt is recorded in the canonical project execution ledger. Base `1de83c697cc19c9865d1db32b10e6f3087fb51ba`, branch `codex/discovery-growth-20261026`. User approved the discovery-plan priorities. Main agent owns rendered QA, commit, live-baseline verification and publication.

## Change manifest

Seven existing static pages, including the resource report `resources/volleyball-match-day-workflows.html`: `volleyball-scorekeeper.html`, `volleyball-player-stats.html`, `courtsideview-app.html`, `vs-gamechanger.html`, `best-apps-for-volleyball-parents.html`, `best-volleyball-scorekeeping-apps-2026.html`.

- Clarified Scorekeeper versus Courtside mode, score-only setup, registration, optional video, internet, FanView expiry and official-event boundaries. Synchronized changed visible FAQ answers with their existing JSON-LD.
- One build-time `scripts/discovery-product-facts.json` generates the product facts block and consistent requirements panels through `scripts/discovery-content.mjs`, called from the existing guide generator. Editorial team is the maintenance owner; no individual reviewer credentials invented.
- Three written walkthroughs: `/volleyball-score-keeper#scorekeeper-walkthrough`, `/volleyball-player-stats#player-tracking-walkthrough`, `/best-apps-for-volleyball-parents#follow-a-match`.
- Reused and visually inspected existing `scorekeeper.png`, `home.png`, `fanview-landscape.png` in `/assets/website-20261023/`. Captions explain the specific visible controls/roles and distinguish illustration from an executed flow. Images were not edited or copied. No filmed demo, live connection or physical-device evidence is claimed.
- Added a brief sport-definition dictionary and conspicuously fictional rally/correction examples. No actual athlete records, report screenshot, research result, calculated hitting percentage or automatic recognition claim.
- Added two sourced comparison categories: Volleyball Score Simple and Varsity Score. No predetermined winner, inferred missing capability, new rating or precise price/OS claim. Retained old source dates for older vendors; new source notes dated October26. Changed only genuinely updated sitemap dates.
- Isolated `assets/website-20261026/discovery.css` applies to the six marketing pages, with container-responsive layouts, accessible text/link treatment and no executable behavior.
- Extended `scripts/qa-marketing.py` exact allowlist for these build-time files and CSS. Added explicit WORKTREE pre-commit mode; exact commit mode remains release evidence. Extended CSS-leak check to the new stylesheet. No check removed or weakened.

No app code, deployed executable JavaScript, event handlers, API, routing, configuration, authentication behavior, protected product assets, or marketing/ folder changed. No native runtime/OTA change.

## Primary evidence

- https://apps.apple.com/us/app/courtsideview/id6766532771 — read October26: score-only/no-roster, named action categories and FanView link lifetime. Existing baseline supports guest Scorekeeper and registration elsewhere. Do not reuse the listing's categorical no-recording statement; separately flagged for owner reconciliation.
- Canonical `docs/design-brain/BRAIN.md`, October21 account-conversion authority — registered account for FanView viewing and broadcasting; guest access limited to Scorekeeper.
- Existing scorekeeper image visibly shows team point controls, team Timeout controls, Undo, End Set and FANVIEW. The previously reviewed eight-step guide establishes immediate wrong-point correction wording. No broader Undo guarantee.
- https://sdhsaa.com/volleyball-stats/ — read October26: sport definitions for kill, dig, assist, ace and block. Summarized under 200 words, with link and edge-case boundary. These definitions do not certify the app's formulas or official eligibility.
- https://apps.apple.com/us/app/volleyball-score-simple/id1448289374 — selected developer-listed scoring, Undo, serving, timeout, side-change and sync features read October26. Cache/version differences mean no exact OS or rating claim included.
- https://www.varsityscoreapp.com/features — selected published overlay, score-only and iPhone/iPad local-recording positioning read October26; not hands-on verification or quality benchmarking.

## Actual checks

Before handoff: existing static checker in WORKTREE mode passed 17 pages, 47 JSON-LD blocks and 689 local references. It confirmed changed FAQ text is visible, local targets/anchors resolve, metadata/schema consistency, no executable-script/event-handler changes, and marketing CSS isolation. `git diff --check` passed. Two consecutive generator runs produced identical top-level HTML hashes. A small subsequent Scorekeeper text clarification does not change executable scope; coordinator reruns all source checks after combining team edits.

Rendered/mobile/200%-reflow, contrast, keyboard and route checks remain coordinator work. This record does not claim them passed. Protected product/native journey acceptance is not inferred from static checks. Public workflow-report research-section revisions belong to the coordinator following the user's later replacement of human research with agent evaluations; this module does not change that section.

## Storage and handoff

Only small HTML/CSS/JSON/source/document files added or changed. Zero new media artifacts. Three existing published images reused in place. Disposable authoring/hash files under `/tmp` are removed after handoff. Review every changed file before commit; keep unrelated app/root work untouched.

## Coordinator release validation

October 26: source review confirmed the complete diff contains static marketing content, isolated marketing CSS, build-time generators/facts and the bounded static checker only. `scripts/matchday-resources.mjs` now renders an actual two-agent guide review; its retained anchor is compatible with existing links. The public report states no human participants or native execution and preserves the initially unanswered formula question. Parent reviewed evaluator B; a separate agent reviewed evaluator A. The three evaluated guide hashes remain unchanged.

Rendered DOM audits passed the six changed marketing pages at widths 320, 390, 768, 1024 and 1440, plus the changed report at those widths: no document overflow, split words or text outside its content box. Inspected corrected mobile/desktop screenshots of all three walkthroughs, product facts and report; a separate agent inspected the six walkthrough screenshots with no blocking findings. The narrow captures show viewport portions, not the entire page. New links meet the 44px height check; keyboard focus is visible and Enter opens the player-tracking anchor. Agent checks exercised the other internal guide links. Text colors checked against the dark surfaces have at least 8.46:1 contrast. No console warnings/errors were observed in the local QA session. No new interactive controls or executable browser code are introduced.

Viewport reflow is verified; native device behavior and browser 200% zoom were not tested or represented as passed. The user's October21 static-marketing scope applies; app/FanView release approval is not inferred. Evidence is retained outside this publishing checkout in the current task's discovery-release-qa folder. Earlier stale screenshot captures were superseded by correctly rendered captures; only final named walkthrough/product/report captures constitute visual evidence.

Before publication run exact-commit `qa-marketing.py`, generator reproducibility and whitespace checks; use the canonical deployment receipt for their result and production byte verification.
