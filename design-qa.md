# FanView production design QA — July 27, 2026 remediation

Scope: the actual production viewer (`/v/:shareId`) and web broadcaster
(`/live/:shareId`), including the Scorekeeper return handoff.

## Approved-baseline comparison

The approved reference and the rendered candidate were inspected together in
one comparison image, not as separate screenshots:

- comparison SHA-256:
  `d8f113f57470a62a62846283c1cee5d2bc2ceb9398e88c597866bef66eb79ec8`;
- private evidence directory:
  `fanview-qa-remediation`;
- accepted viewer image SHA-256:
  `928ae466050504dd6af7775e2840997e790170217f590f02f624a28114e44acb`;
- accepted setup image SHA-256:
  `3a7731a7e5c4f330d02a0a11b3b5c345b06a8cbf95fef12bedd39c1141d066f6`;
- accepted live-landscape image SHA-256:
  `37ca4c0cda5f42ddc47638c50300646998daf78e136949481f21dab5d0fe0ddb`;
- accepted 200%-reflow image SHA-256:
  `c220811bbd315a684aefa2ebca7fe223fb1ad606b21a1f91a3652039656e04b1`.

## Design verdict

Passed for the rendered web candidate:

1. Community starts closed and does not cover the score or video.
2. Viewer historical-set columns share fixed centerlines. Both team rows are
   equal height, winning cells use a fixed corner `W`, and score figures are
   not displaced.
3. The timeout banner remains attached to the scoreboard and names the team.
4. Team Hub, LIVE, and viewer count controls do not intersect the scoreboard.
5. Display remains closed until selected and preserves Small, Standard, Large,
   and approved position choices.
6. Muted, Float, Display, Full screen, and Chat are all visible in the video
   state and keep at least `44x44` targets.
7. Broadcaster setup gives the camera the majority of the viewport. Start
   Camera is primary; Return and Share are secondary; View Fan Page is
   tertiary; recording is last and off.
8. The live broadcaster keeps Return, Share, Float, Chat, Unmute, and End in
   one visible row. End is separated by its red treatment.
9. The live broadcaster has no Strong connection or Update not sent banners.
10. Portrait, landscape, compact landscape, and 200%-reflow renders have no
    horizontal overflow or off-screen critical controls.
11. Safari text-size adjustment is fixed at 100% on viewer and broadcaster
    surfaces so browser inflation cannot recreate the oversized iPhone layout.
12. No unapproved default, modal, guard, or background recording behavior was
    introduced.

## Measured geometry

- Viewer 390x844: all five visible controls are inside the viewport; each is
  at least `44x44`; `scrollWidth=390`.
- Viewer 206x457 reflow: all five controls remain inside; each is `44px` high;
  `scrollWidth=206`.
- Broadcaster 390x844 live: all six controls are `48px` high and visible.
- Broadcaster 844x390 live: all six controls are `44px` high and visible.
- Broadcaster 667x320 live: all six controls are `44px` high and visible.
- Broadcaster 360x800 setup: Start Camera, Return, Share, and View Fan Page are
  all at least `44px` high and visible.

## Evidence limit

This rendered evidence proves layout, active-route source, responsive geometry,
and control availability. Camera permission, real WebRTC media, iOS/Android
orientation APIs, and native OTA uptake still require the exact physical
devices; browser emulation cannot prove those APIs.

## Viewer navigation-label follow-up — July 27, 2026

The two Adam-supplied approved references and the exact rendered 390x844
candidate were placed together in one comparison input and inspected:

- approved-direction comparison SHA-256:
  `47adf028109d3d716aa6057800f53021e4c6af22433d939281172639fd3ed566`;
- iPhone 390x844 SHA-256:
  `067d281a04a4335c842eb01cdcd0ca0299a092f7394fab9f5ee115767f7ed8e0`;
- Android 360x800 SHA-256:
  `3a57ff9c169c07e85cd712541f85538ec3ff10b3000976163e2d0f0520ca927a`;
- 200%-reflow 206x457 SHA-256:
  `5cbe146e5422f1d0923e3e08438fa8dfae95803038670ad04bbea390cf90115e`;
- landscape 844x390 SHA-256:
  `57689bd02e3b27f87c83c0c0c0399284d63ff314e11da4ea1366b02e96304619`;
- private evidence directory:
  `fanview-viewer-label-followup`.

The approved header hierarchy is present verbatim: `Team Hub` is left aligned,
while `LIVE` and `1.2K` are grouped on the right in the same row. The compact
visible count retains an accessible `1,200 viewers` label.

`Muted`, `Float`, `Display`, and `Full screen` remain visible and unclipped in
portrait, landscape, and 200%-reflow. Geometry assertions confirmed:

- every viewer-control target is at least `44x58`;
- every label has `scrollWidth <= clientWidth`;
- Team Hub, LIVE, and viewer-count targets are at least `44px` high;
- `scrollWidth` equals the protected viewport width at 390, 360, 206, and 844;
- the scoreboard has at least a 7px gap from the control dock;
- the dock and Chat control stay fully inside the usable viewport.

Final result: passed
