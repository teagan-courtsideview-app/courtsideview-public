# Functional public-page typography candidate

Requested: use the app-selected Plus Jakarta Sans throughout remaining public website pages. Seven HTML entrypoints add one isolated stylesheet: Team, Club, Player, Scout, legacy FanView, live broadcaster, Community preview. Existing source scripts, embedded geometry, route/config files, shared runtime and score-font declarations are unchanged. Existing font files provide 400/500/600; synthetic bold is disabled. Production React FanView/account pages already use Jakarta and are unchanged.

Bounded validation: local missing-ID/unavailable/default states rendered at 390x844 and1280x720; all load Jakarta and no horizontal overflow. This does not validate real data, complete live scoring/broadcasting, rotation, accessibility states or physical devices. Full FANVIEW_UI_UX_GATE_V1 is required before preview/production deployment, or an explicit new owner exception naming this candidate. No prior release exception is reused.

Prepared patch/source review and local matrix retained outside repo in CourtsideView-research/website-brand-rollout-2026-10-23. Status: implemented locally, not released.
