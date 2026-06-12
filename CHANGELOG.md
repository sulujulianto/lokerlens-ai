# Changelog

All notable changes to **LokerLens AI** will be documented in this file.
Historical release entries describe the implementation and wording of their
respective release; current development status is recorded under
**Unreleased**.

## [Unreleased]

### Added
- Shared Zod request and response contracts for the normalized V2 analysis flow.
- Provider-neutral backend interface, provider resolver, Gemini adapter, prompt
  builder, response parser, and analysis service.
- Multi-field manual profile covering ten stable job-field identifiers.
- Specialized guidance for IT & Digital, Administration, Customer Service, and
  Operations/Warehouse/Logistics, with a conservative fallback for other
  supported fields.
- Normalized result dashboard with requirements, risks, four-week roadmap,
  evidence-of-competence suggestions, CV material, application message,
  interview questions, and disclaimer.
- Four deterministic offline demo scenarios that do not require an API key.
- Focused deterministic tests for schemas, backend modules, compatibility,
  API clients, forms, demos, results, accessibility, and interaction behavior.

### Changed
- Repositioned the development branch from an IT-focused challenge prototype to
  a manual-first, multi-field job-readiness assistant for Indonesian
  entry-level applicants.
- Migrated the frontend to the normalized V2 request and response contracts.
- Moved provider selection and credentials entirely behind the server API.
- Extracted backend responsibilities into configuration, provider, prompt,
  parsing, service, route, and compatibility modules.
- Improved responsive layout, semantic structure, form labeling, keyboard
  navigation, focus handling, demo/reset behavior, and long-content rendering.
- Preserved temporary V1 request and response adapters during migration.

### Fixed
- Enforced runtime consistency between match-score ranges and stable verdict
  identifiers.
- Rejected malformed or incomplete provider responses before they reach the
  frontend.
- Stabilized empty result sections, unavailable-analysis behavior, network
  errors, invalid JSON handling, duplicate submissions, and demo timers.

### Security
- Added strict request and provider-response validation with bounded field,
  list, and request-body sizes.
- Added prompt boundaries that treat candidate profiles and job postings as
  untrusted data.
- Normalized public errors so raw provider output, prompts, credentials, stack
  traces, and SDK details are not exposed to the frontend.
- Kept API keys server-side and removed provider/model selection from the
  frontend contract.

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
