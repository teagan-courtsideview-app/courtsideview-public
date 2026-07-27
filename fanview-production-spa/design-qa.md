# FanView Production Viewer Design QA

Date: 2026-07-27
Candidate: local release candidate for the approved 21-change FanView scope
Result: rendered viewer checks passed; production release remains blocked by
the project-wide physical-device and soak gate.

## Approved visual source

- `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/historical-sets-equal-rows-v4.png`
- `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/scoreboard-display-restoration-before-after.png`

## Exact-candidate captures

- iPhone portrait, 390x844:
  `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/production-candidate-390x844-v2.png`
- Android landscape, 915x412:
  `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/production-candidate-915x412-v2.png`
- 200%-equivalent reflow, 320x640:
  `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/production-candidate-320x640-reflow.png`
- Approved-reference comparison:
  `/Users/user/.codex/visualizations/2026/07/27/019fa388-b0b1-76a3-a5ce-2ca1c38813de/fanview-qa/approved-reference-vs-candidate.png`

## Design review

- Chat is closed on first load, so the score and court remain visible.
- The persistent timeout treatment communicates the paused match without a
  duplicate floating timeout message.
- Historical and live scores share one grid. Both team rows have identical
  heights and score centerlines.
- Set winners use a fixed-corner `W` badge and cell treatment; winner markers
  do not displace the score.
- Future sets do not reserve empty columns.
- Small, Standard, Large, and the approved position choices remain behind the
  explicit Display control and persist across reloads.
- Team Hub, LIVE, viewer count, scoreboard, Display, and Chat remain visually
  separated in portrait, landscape, and narrow reflow.
- The long `Regression Checks` label remains complete at reflow width. Team
  marks are removed below 341 CSS pixels to preserve the full team name and
  score alignment.
- No visible control in the checked states is below 44x44. There is no
  horizontal document overflow and no unexpected browser console error.
- Display and Chat restore focus after closing. Closed Community remains
  `display:none`, `aria-hidden`, and inert.

## Defects automatically corrected during rendered QA

1. Display overlapped Chat at 390x844.
2. Display overlapped Chat at 915x412 landscape.
3. `Regression Checks` clipped at narrow/reflow width.
4. Timeout appeared both in the persistent scoreboard banner and a temporary
   activity pill.

Each defect was corrected in source and the affected viewport was rerun.

## Remaining release evidence

Browser rendering is not physical-device evidence. The complete release still
requires the exact-candidate Android and iPhone runs, 20 consecutive lifecycle
cycles, and the 90-minute broadcaster soak defined by
`docs/fanview-ui-ux-release-gate.md`.
