# Guest FanView viewing fix

## Scope

Valid published, unexpired shared links mount the viewer without signup or
sign-in. Account sessions are not used for public match RPC/realtime or Worker
status, presence, and playback negotiation. A stale account cannot block public
watching. Optional Community/account preference services retain their existing
account client. Team Hub pages, broadcaster/owner controls, and legacy route
behavior are unchanged.

A definitive unavailable RPC response stops a playing viewer, unsubscribes,
and ignores late snapshots. The 15-minute completion expiry is enforced on
initial and later snapshots and at the timer boundary. Optional preference
load/save failures are isolated from viewing.

## Source recovery and zero-style-change packaging

Baseline: `9f8ed8d92f52132ced70f3c540326e3f937057ea`, with HTML referencing
`index-B4FcvEYS.js` and `index-C5YhFcMd.css`.

The imported `ApprovedBrandIcon` source was absent. Its exact SVG/use behavior
was recovered from deployed function `K1`. The sprite is copied byte for byte
from `approved-icons-B8z14ALv.svg`; SHA-256:
`4b41ad43fb11a8acddfeb968284f9b0ca068bee34f71ee4a264a6066329a0b4e`.
A pinned `@types/node` development dependency was missing in both packages and
is added to make their existing Node-based config/tests typecheck cleanly.

The committed style source does not reproduce the deployed presentation:
- Font and home-material imports are missing.
- The three FanView font variables and several weights differ.
- The Community panel background and inset rim shadows differ.
- Account-gate styles would naturally disappear with its entrypoint import.

Production CSS itself is unchanged. Instead of guessing or broadening the
styling fix, `npm run build:guest-hotfix` explicitly stages rebuilt JS against
the exact approved CSS and its dependencies. The manifest in
`fanview-production-spa/scripts/approved-presentation.json` pins all baseline
bytes, and staging refuses missing/mismatched assets before touching output.
Ordinary staging refuses drifted CSS. Future presentation changes remain
blocked on reconciling these pre-existing source differences.

## Verification

- Production: typecheck and 75 Vitest tests passed, including direct guest
  mounting, session isolation, credential-free WHEP/presence, safe Worker error
  recovery, missing/unavailable/expired links, post-load revocation, late events,
  account preference failure isolation, and exact icon DOM/hash parity.
- Packaging: tests cover new JS plus exact baseline presentation, refusal of
  ordinary CSS drift, missing baseline files, and incorrect hashes.
- Fixture SPA: typecheck, 18 Vitest tests, production build, and 4 Sites packaging
  tests passed. Protected account component and Community adapter tests remain.
- No changes to broadcaster/owner routes, account pages, Community authorization,
  or Team Hub authorization are included.
- No real live playback has been verified by this frontend work. Coordinated
  backend deployment and a valid real match are required for that check.
- No commits, pushes, or deployments performed by the frontend task.


## Integrated cleanup verification

The Mac candidate also closes credential-free WHEP viewer sessions on unmount/reconnect and obsolete negotiation, validates returned session paths, and checks connection liveness after each asynchronous step. Deferred POST/PATCH and unsafe-session-Location regressions pass. Final production TypeScript and 80 Vitest tests pass; four staging tests pass; the rebuilt JS is `index-CBgsGtPf.js` (SHA-256 `c16927bee51fea6f5213b448ab12bd6deeeb2f9d4f0900f24f5e4f8b52f53604`). All six pinned presentation assets retain their original hashes. Fixture TypeScript, 18 tests, build and four Sites packaging tests pass. Browser launch was blocked by a macOS crashpad bootstrap permission error, so these results do not establish rendered/device/live-playback acceptance. Not deployed.
