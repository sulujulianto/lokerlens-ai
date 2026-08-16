# Manual Release QA Runbook

This runbook covers the human checks that automated browser tests cannot prove
on their own. It is intentionally separate from public deployment validation.
Run it against the production bundle with provider credentials removed so the
four fictional offline demos remain the only analysis path.

Completing the automated command below does **not** complete the manual release
gate. A person must perform each applicable check, record the environment, and
keep failed or blocked items open in [`RELEASE_CHECKLIST.md`](RELEASE_CHECKLIST.md).

## Scope and non-claims

This runbook verifies:

- Chrome and Firefox desktop presentation;
- reflow on 360–430 px mobile widths and a portrait tablet;
- keyboard-only navigation and focus restoration;
- reduced-motion behavior beyond the loading spinner;
- browser zoom at 200%;
- horizontal overflow, clipped controls, and unreadable content.

It does not verify a public host, provider latency, production logging, shared
rate limiting, or deployment-specific privacy behavior.

## Prepare the local production build

Use a clean checkout and do not expose provider credentials:

```bash
npm ci
npm run build
npx playwright install chromium firefox
npm run test:e2e:release-qa
```

The focused Playwright command provides repeatable support for the manual pass.
It checks the initial form and complete offline result at 360, 390, 430, 640,
and 768 CSS pixels on Chromium and Firefox. The 640 px case is a reflow proxy
for a 1280 px desktop viewed at 200%; it is not a substitute for actual browser
zoom testing.

Start the production server for manual review:

```bash
NODE_ENV=production \
AI_PROVIDER=gemini \
GEMINI_API_KEY= \
OPENAI_API_KEY= \
npm start
```

Open `http://localhost:3000`. Confirm that the header reports that live
analysis is not configured and that all four offline demos remain usable.

## Record the environment

Record this information with the final QA evidence:

| Field | Value |
| --- | --- |
| Commit SHA | |
| Date and timezone | |
| Operating system | |
| Chrome version | |
| Firefox version | |
| Screen resolution | |
| Keyboard layout | |

Use `PASS`, `FAIL`, or `BLOCKED` for every row. A blank row is not evidence.

## Desktop browser matrix

Run the initial form and one complete offline result in both browsers. Use at
least 1280×720 and, when the display permits, 1440×900.

| Check | Chrome | Firefox | Notes/evidence |
| --- | --- | --- | --- |
| Header, hero, demo selector, and form remain readable | | | |
| All fields, labels, counters, and buttons remain visible | | | |
| Selected demo state is visually distinct without relying on color alone | | | |
| Offline loading state and complete result render correctly | | | |
| Result cards, long text, and copy buttons do not overlap | | | |
| Returning to the form restores focus to the demo action | | | |

## Mobile and tablet matrix

Use each browser's responsive design mode. Do not count vertical scrolling as a
failure; horizontal scrolling or clipped content is a failure.

| Viewport | Initial form | Offline result | Overflow/clipping | Notes/evidence |
| --- | --- | --- | --- | --- |
| 360×800 | | | | |
| 390×844 | | | | |
| 430×932 | | | | |
| 768×1024 | | | | |

At every viewport, inspect the longest form labels, the demo selector, the job
posting counter, score denominators, requirement evidence, four-week roadmap,
CV prompt, application message, and interview-preparation cards.

## Keyboard-only flow

Set the mouse aside before starting.

1. Reload the page and press `Tab`. Focus must first reach **Form baru**.
2. Continue with `Tab` through all four demo choices and every enabled form
   control. Focus must remain visible and follow the visual reading order.
3. Use `Enter` or `Space` to choose another demo. Its pressed state must update.
4. Continue to **Tampilkan hasil demo terpilih** and activate it without a
   pointer.
5. Confirm that focus moves to **Hasil analisis kesiapan kerja**.
6. Use `Shift+Tab` to reach **Kembali ke formulir**, activate it, and confirm
   focus returns to the offline-demo action.
7. Reset to a blank form and verify that focus moves to **Bidang pekerjaan**.
8. Traverse the blank form once more. Confirm there is no focus trap, skipped
   enabled control, invisible focus indicator, or unexpected page jump.

The live-analysis button is expected to remain disabled in this credential-free
QA environment. This pass therefore proves the offline UI path, not a live
provider submission.

## Reduced motion

Enable the operating system preference or browser emulation for
`prefers-reduced-motion: reduce`, then reload.

| Check | Result | Notes/evidence |
| --- | --- | --- |
| Loading spinner is static | | |
| Focus and hover state changes are effectively immediate | | |
| No automatic smooth scrolling occurs | | |
| Result loading and focus restoration remain understandable | | |

## Browser zoom at 200%

Use the browser's actual zoom control, not CSS zoom or operating-system display
scaling. Start from a desktop window at least 1280 px wide.

| Check | Chrome | Firefox | Notes/evidence |
| --- | --- | --- | --- |
| Initial page reflows without horizontal scrolling | | | |
| Form controls and required labels remain fully available | | | |
| Offline result reflows without clipped cards or text | | | |
| Focused controls remain visible when tabbing | | | |

## Recorded candidate evidence — 2026-08-17

The following manual pass was completed against the uncommitted candidate on
branch `test/add-manual-release-qa`, based on commit
`d57a1c0fb7bdf3831b9454788e07ea9bb6f28094`. The candidate commit SHA will be
recorded by Git after these reviewed changes are committed.

| Field | Recorded value |
| --- | --- |
| Date and timezone | 2026-08-17 01:50:15 UTC+07:00 |
| Operating system | Linux Mint 22.2 |
| Chrome version | Google Chrome 151.0.7922.137 |
| Firefox version | Playwright Firefox 153.0 |
| Screen resolution | 1280×720 |
| Keyboard layout | US, PC105 |

| Manual check | Result | Evidence summary |
| --- | --- | --- |
| Chrome desktop form and offline result | PASS | Complete form and result remained readable without overlap or clipping. |
| Firefox desktop form and offline result | PASS | Playwright Firefox was opened interactively against the local production server. |
| Keyboard-only flow in Chrome and Firefox | PASS | Demo selection, result entry, return action, reset, visible focus, and focus restoration completed without a trap. |
| 360×800, 390×844, 430×932, and 768×1024 reflow | PASS | Initial form and offline result remained usable without horizontal scrolling. |
| Actual browser zoom at 200% | PASS | Chrome and Firefox reflowed without unreachable controls, clipped text, or horizontal scrolling. |
| Reduced-motion manual pass | PASS | Playwright Firefox with `reducedMotion: "reduce"` kept navigation, focus, and the offline-result flow understandable. |
| Horizontal overflow and clipped content | PASS | None found in the reviewed desktop, mobile, tablet, result, keyboard, or zoom paths. |

The required full Playwright run completed all 18 Chromium and Firefox project
runs successfully. Repeated Firefox-only stress commands intermittently
encountered local browser or web-server startup readiness failures before the
product assertions ran. The final branch CI remains the authoritative clean-
environment gate; this evidence does not reinterpret those startup failures as
passing product assertions.

## Failure handling and evidence

- Capture only fictional offline-demo data; never include an API key or real
  applicant information in screenshots or reports.
- Record the exact browser, viewport, zoom, action, expected result, and actual
  result for every failure.
- Keep a failed release-checklist item unchecked until a focused fix, regression
  test, and repeat of the affected manual case all pass.
- Do not suppress overflow with clipping when content remains unreachable.

When every applicable row has evidence, update the release checklist in a
separate focused commit. Deployment, privacy, and release-version gates remain
open until a real platform is selected.
