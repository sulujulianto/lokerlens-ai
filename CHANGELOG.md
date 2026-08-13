# Changelog

All notable changes to **LokerLens AI** will be documented in this file.
Historical release entries describe the implementation and wording of their
respective release; current development status is recorded under
**Unreleased**.

## [Unreleased]

### Added
- MIT License and recruiter-facing application screenshots captured from the
  real offline demo flow.
- A dedicated live-evaluation document that separates observed evidence from
  deterministic CI and states explicit non-claims.
- Shared Zod request and response contracts for the normalized V2 analysis flow.
- Provider-neutral backend interface, provider resolver, Gemini and OpenAI adapters, prompt
  builder, response parser, and analysis service.
- Shared catalog covering 29 stable job-field identifiers in seven UI groups,
  with optional training-source, provider, and program context.
- Specialized guidance for IT & Digital, Administration, Customer Service, and
  Operations/Warehouse/Logistics, with a conservative fallback for other
  supported fields.
- Normalized result dashboard with requirements, risks, four-week roadmap,
  evidence-of-competence suggestions, a reusable CV-improvement prompt,
  application message, interview questions, and disclaimer.
- Evidence-grounded score breakdown across five fixed dimensions, requirement
  matching with explicit status and next steps, ordered priorities, and
  interview preparation with answer outlines.
- Four deterministic offline demo scenarios that do not require an API key.
- Focused deterministic tests for schemas, backend modules, compatibility,
  API clients, forms, demos, results, accessibility, and interaction behavior.
- Provider timeout and end-to-end request cancellation support.
- Per-client analysis rate limiting, request IDs, Helmet security headers,
  strict production CSP, Permissions Policy, and immutable asset caching.
- GitHub Actions CI for typecheck, lint, tests, production build, and dependency
  audit.
- ESLint flat configuration for TypeScript, React Hooks, and Vite Fast Refresh,
  with an explicit CI lint gate and declared React type packages.
- V8 coverage reporting for all application code with a 75% global threshold
  for statements, branches, functions, and lines enforced in CI.
- HTTP integration tests for health, analysis, validation, provider failures,
  API 404s, body limits, rate limiting, security headers, and production CSP.
- Playwright Chromium E2E coverage for the production bundle, provider-
  unavailable startup, offline demo isolation, focus and reset behavior, and a
  mobile-width overflow check, enforced in CI.
- Automated axe-core checks for WCAG A/AA violations on the initial form and
  offline result, plus a browser-level keyboard reset test, enforced in CI.
- Cross-browser Playwright coverage on Chromium and Firefox, including a
  reduced-motion check that verifies the loading spinner stops animating when
  the operating-system preference requests less motion.
- jsdom interaction tests for demo selection, reset, live submit, and result
  rendering.
- OpenAI Responses API structured-output tests with disabled response storage,
  normalized failures, and no provider identity exposed to the frontend.
- A repeatable Gemini live-evaluation script covering three Frontend runs plus
  Administration, Customer Service, and Warehouse scenarios.

### Changed
- Reorganized the repository landing page around global-facing product
  positioning, engineering evidence, architecture, verification, release
  status, and direct technical-document navigation.
- Replaced the text-only architecture overview with rendered system and request
  lifecycle diagrams plus explicit trust, data, and failure boundaries.
- Repositioned the project from an IT-focused challenge prototype to
  a manual-first, multi-field job-readiness assistant for Indonesian
  entry-level applicants.
- Migrated the frontend to the normalized V2 request and response contracts.
- Moved provider selection and credentials entirely behind the server API.
- Extracted backend responsibilities into configuration, provider, prompt,
  parsing, service, route, and compatibility modules.
- Replaced the split hero/form layout with one ordered reading flow, while
  retaining compact paired fields only where desktop width permits.
- Changed the visual system to a calm white–slate palette with restrained
  indigo accents, neutral form borders, and stronger mobile spacing.
- Changed training-provider and training-program fields to unrestricted plain
  text inputs without browser suggestion lists.
- Completed every offline demo profile so selecting a scenario fills the full
  form and provides a concrete end-to-end example.
- Expanded every offline demo result to mirror the complete live-analysis
  contract, including score rationales, requirement evidence, measurable
  weekly outputs, a CV-improvement prompt, and interview guidance.
- Refined result copy to use a more natural adviser voice, expanded application
  messages into professional ready-to-edit examples, and standardized interview
  preparation at exactly four questions.
- Calibrated requirement statuses and must-have scoring, aligned application
  timing with verdicts, and required concrete vacancy-specific uncertainties.
- Reorganized the README around product behavior, local setup, Gemini live
  evaluation, privacy boundaries, and the remaining release gates.
- Improved responsive layout, semantic structure, form labeling, keyboard
  navigation, focus handling, demo/reset behavior, and long-content rendering.
- Reworked the visual system into a warmer vocational-career interface with
  clearer hierarchy, grouped examples, and less developer-facing language.
- Expanded field-specific evidence guidance from fourteen to twenty-seven career
  families, with conservative fallbacks for open categories.
- Updated compatible dependencies within existing major-version boundaries and
  aligned the package version with `v2.0.0-dev`.
- Preserved temporary V1 request and response adapters during migration.
- Separated TypeScript typechecking from ESLint so each CI gate reports its
  actual responsibility.
- Extracted Express application assembly from the process entrypoint so the
  complete HTTP middleware and route boundary can be tested without starting
  Vite or binding to the production port.

### Fixed
- Raised contrast for demo metadata, scenario numbers, section separators, and
  score denominators so the tested form and result states meet axe-core's
  WCAG 2 AA color-contrast checks.
- Enforced runtime consistency between match-score ranges and stable verdict
  identifiers.
- Enforced that five score components total the final score, each roadmap week
  contains multiple actions, and detailed requirement/interview structures are
  complete before results reach the frontend.
- Replaced ambiguous CV draft bullets with one fact-preserving prompt intended
  to be used alongside the user's existing CV in a separate AI tool.
- Rejected malformed or incomplete provider responses before they reach the
  frontend.
- Stabilized empty result sections, unavailable-analysis behavior, network
  errors, invalid JSON handling, duplicate submissions, and demo timers.
- Localized normalized API failure codes into consistent Indonesian messages.
- Aligned paired personal-strength and evidence text areas by moving guidance
  into their placeholders and giving both controls the same initial height.
- Rejected Indonesian provider output that returns to informal reader pronouns,
  speaks as the assistant using `kami`, or asserts unsupported training
  graduation or certification.
- Reduced Gemini output variation and added a candidate-specific training-status
  boundary plus a final compliance pass to improve repeated live-analysis
  stability without weakening response validation.
- Verified the stabilized Gemini path with six successful live evaluations,
  including three Frontend runs with one verdict and a two-point score spread.
- Removed a synchronous loading-state update from a React effect and separated
  verdict presentation helpers from the component module for reliable Fast
  Refresh behavior.

### Security
- Added strict request and provider-response validation with bounded field,
  list, and request-body sizes.
- Added prompt boundaries that treat candidate profiles and job postings as
  untrusted data.
- Normalized public errors so raw provider output, prompts, credentials, stack
  traces, and SDK details are not exposed to the frontend.
- Kept API keys server-side and removed provider/model selection from the
  frontend contract.
- Removed the Express identity header and restricted framing, script, style,
  connection, image, font, camera, location, and microphone capabilities.
- Reduced the verified npm audit result to zero known vulnerabilities.

## [1.0.0] - 2026-06-11
### Juara Vibe Coding Edition

This is the official v1.0.0 release submitted as the challenge edition of LokerLens AI for the **Juara Vibe Coding** challenge or equivalent. It focuses on elevating candidate career-readiness by providing quick, robust analysis of entry-level candidates against a target job specification.

### Added Features
- **Manual Candidate Profile Input**: Allows users to enter their profile fields (Target Role, Latar Belakang Pendidikan, Keahlian/Skills, Detail Proyek & Studi Kasus Unggulan, Pengalaman Kerja Praktik/Magang) separately rather than parsing static un-parseable files, reducing error margins.
- **Job Posting Input**: Accepts raw job advertisements (copy-pasted texts) to align candidate skills dynamically with recruiter requirements.
- **Gemini-Powered Analysis**: Uses server-side implementation of Gemini 3.5 Flash through Google's `@google/genai` modern SDK for fast, structured career evaluations.
- **Prompt-Injection Guard**: Hardened system instructions in `server.ts` to block internal prompts from candidate or job description text injections, keeping the model securely on-task.
- **Request Size Limits**: Enhanced server performance and safety by filtering out payload sizes over 1MB and limits job descriptions to a maximum of 12,000 characters.
- **Match Score**: Renders a dynamic, visual score meter illustrating alignment with the targeted vacancy.
- **Skill Gap**: Discovers missing/gap skills by comparing user-provided features with requested job highlights.
- **Requirement Breakdown**: Clearly separates requirements into "Mesti Dimiliki (Must-Have)" and "Nilai Tambah (Nice-to-Have)".
- **30-Day Action Roadmap**: Provides highly structured, step-by-step weekly guides for learning or modifying materials to close crucial skill gaps.
- **CV Bullet Suggestions**: Suggests specific ATS-friendly impact bullets in English/Indonesian to be pasted straight into the candidate's CV/Resume.
- **Application Message / Cover Pitch**: Drafts customized introduction messages for recruitment reach-outs via LinkedIn, email, or WhatsApp.
- **Demo Scenarios / Quick Preview Sandbox Mode**:
  - *Scenario 1*: SMK Graduate & Career Switcher (Junior Web Developer)
  - *Scenario 2*: SMK RPL Graduate (Junior Backend Developer)
  - *Scenario 3*: Self-Taught Career Switcher (Junior Python Backend - English)
  - Full capability to utilize custom simulations via the "Coba Demo Cepat" fallback mode when `GEMINI_API_KEY` is not present in sever configuration.

---
*Note: This repository does not implement authentication layers, payment interfaces, unrequested job scrapers, or persistent server database modules to remain compliant with the original minimalist project scope boundaries.*
