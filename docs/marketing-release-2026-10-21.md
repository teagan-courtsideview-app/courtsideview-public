# Marketing SEO candidate — October 21, 2026

## Authority and scope

The user explicitly requested separation of website checks from the app release gate and preparation of SEO updates for publishing. This release changes static marketing content only: ten HTML pages, guide generation, sitemap dates, a marketing-only CSS file, and website QA documentation/scripts. It does not change app code, viewer/broadcaster/scoring behavior, shared runtime scripts, assets, API calls, routes, headers, authentication, or deployment configuration. The separate pre-existing privacy.html edit is excluded.

The FanView physical-device gate is not applicable to this bounded content candidate. This is a scope classification, not a waived or fabricated FanView pass. Any expansion into app/FanView behavior, shared runtime code, routing, or a different deployment baseline requires reclassification and the applicable full release gate.

## Changes

Concrete homepage explanation, practical visible FAQs with matching JSON-LD, verified product facts, an existing-image walkthrough, balanced sourced GameChanger comparison, six refreshed guides, honest modification dates, and removal of stale version metadata. Existing design is retained with measured mobile wrapping, table readability, and contrast repairs. No claim of guaranteed LLM visibility, independent competitor testing, or fabricated reviews.

## Verification

Base web commit: fde7a43df9417e7abecd88bac0692ed8109bac18.

Run from this repository:

```sh
python3 scripts/qa-marketing.py fde7a43df9417e7abecd88bac0692ed8109bac18 HEAD
node scripts/verify-homepage-release.mjs
node scripts/build-geo-guides.mjs
git diff --exit-code -- '*volleyball*.html'
```

The marketing checker validates the committed candidate, its exact changed-file allowlist, unchanged executable page scripts/event handlers, isolated CSS use, HTML metadata, JSON-LD/FAQ visibility, and internal references. The homepage check additionally verifies crawler, sitemap and existing routing/security contracts. Its expected FAQ text/date were updated for the authorized content revision; no checks were removed.

Rendered evidence was captured from these exact HTML/CSS contents on October 21: 81 page/viewport checks without horizontal overflow or out-of-bounds main text; eight FAQ keyboard/repeat interactions; Compare disclosure operation; selected text contrast checks; desktop design comparisons and independent review of mobile sections. These are website checks, not native app certification. No HTML/CSS changed after that visual review.

External evidence: /Users/user/Documents/Claude/Projects/CourtsideView-research/llm-website-qa-2026-10-21. Small manifest and factual source register: parent project's docs/llm-optimization-brain/. Source hashes bind the prior visual evidence to this candidate. No new media or dependencies.

## Publish handoff

Publish only the verified Git commit, not the dirty local directory, which contains unrelated privacy edits. This task prepares the candidate; it does not claim a deployment occurred. Before production deployment, verify the target's currently deployed source is the base above (or reconcile newer live changes); then deploy the reviewed commit through the existing website pipeline. Check changed public routes, canonical/robots/sitemap, assets, and FAQs after deployment. Roll back with the previous website deployment if verification fails. No EAS or app publish is involved.
