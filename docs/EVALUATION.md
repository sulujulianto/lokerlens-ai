# Live AI Evaluation Notes

This document separates live-provider evidence from deterministic automated
tests. The evaluation uses real Gemini requests, consumes provider quota, and
is not part of CI.

## Scope

`npm run eval:gemini` sends eight sequential requests:

- Junior Frontend Developer three times to inspect score and verdict spread;
- Junior Administrative Staff once;
- Entry-Level Customer Service once;
- Warehouse Staff once;
- Cook Helper once;
- Junior AC Maintenance Helper once using a bilingual Indonesian/English job
  posting.

The script records duration, score, verdict, and required-requirement statuses.
It flags inconsistent reader address, unsupported training claims, verdict and
application-timing disagreement, thin risk factors, and a Frontend score spread
above ten points.

## Observed runs

An expanded run on 13 August 2026 completed all eight requests without
automated warnings:

| Scenario | Score | Verdict | Duration |
| --- | ---: | --- | ---: |
| Frontend #1 | 70 | `APPLY_WITH_IMPROVEMENTS` | 36.170 s |
| Frontend #2 | 70 | `APPLY_WITH_IMPROVEMENTS` | 36.845 s |
| Frontend #3 | 70 | `APPLY_WITH_IMPROVEMENTS` | 34.835 s |
| Administration | 91 | `APPLY_NOW` | 29.206 s |
| Customer Service | 62 | `APPLY_WITH_IMPROVEMENTS` | 24.448 s |
| Warehouse | 72 | `APPLY_WITH_IMPROVEMENTS` | 28.263 s |
| Culinary | 72 | `APPLY_WITH_IMPROVEMENTS` | 26.626 s |
| AC Maintenance | 89 | `APPLY_NOW` | 26.417 s |

The three Frontend results had a zero-point spread and one verdict. The
culinary and bilingual electrical/refrigeration scenarios both completed the
structured path. All eight requests finished inside the locally configured
45-second provider timeout, with durations from 24.448 to 36.845 seconds.

### Earlier stabilization run

The first Phase 5F run produced four schema-valid responses. Two Frontend
responses were safely rejected by the quality gate rather than being shown to
the user. After the prompt boundaries and stability checks were tightened, a
repeat run on 11 August 2026 completed all six requests without automated
warnings.

| Scenario | Score | Verdict | Duration |
| --- | ---: | --- | ---: |
| Frontend #1 | 72 | `APPLY_WITH_IMPROVEMENTS` | 30.695 s |
| Frontend #2 | 70 | `APPLY_WITH_IMPROVEMENTS` | 34.093 s |
| Frontend #3 | 72 | `APPLY_WITH_IMPROVEMENTS` | 29.095 s |
| Administration | 91 | `APPLY_NOW` | 27.890 s |
| Customer Service | 62 | `APPLY_WITH_IMPROVEMENTS` | 24.501 s |
| Warehouse | 73 | `APPLY_WITH_IMPROVEMENTS` | 21.086 s |

The three Frontend results had a two-point spread, one verdict, and consistent
`PARTIAL` treatment for REST API experience. All recorded requests completed
inside the locally configured 45-second provider timeout.

## What this evidence supports

- The Gemini path can complete the current structured V2 contract end to end.
- Invalid output can be rejected safely instead of being rendered.
- The evaluated scenarios produced grounded, schema-valid results after
  stabilization.
- Repeated Frontend outputs were close in one observed session.

## What it does not prove

- Model output is deterministic. Temperature `0` and a fixed seed are
  best-effort controls, not a guarantee.
- The recorded latency generalizes to another account, region, network,
  provider version, or hosting platform.
- The recorded eight-scenario run establishes broad domain quality or absence
  of bias. The expanded evaluator remains a small, curated sample.
- OpenAI live integration has been verified.
- The system is production-ready or that its score predicts hiring outcomes.

## Reproduce the evaluation

Configure a valid Gemini key locally, review the expected eight-request quota,
then run:

```bash
npm run eval:gemini
```

Do not commit or share `.env`. Review provider quota and cost before running the
script. The automated flags are only a first pass; a human reviewer should
still check:

1. whether each requirement status follows the supplied profile evidence;
2. whether must-have scoring follows those statuses;
3. whether recommendations invent experience, results, certificates, or
   employer policy;
4. whether risk factors name concrete uncertainty;
5. whether Indonesian address remains consistent and application copy uses the
   candidate's point of view.
