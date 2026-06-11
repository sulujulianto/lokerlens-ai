# LokerLens AI — Product Roadmap

This document outlines the strategic path of **LokerLens AI** from its original challenge edition toward broader public coverage.

## 🎯 Current Status: v1.0.0 (Juara Vibe Coding Edition)
The current v1.0.0 is our **official challenge submission version**. It handles:
- Core IT/Software development roles (Frontend, Backend, Fullstack, Python).
- Clean, structured manual profile input + job posting evaluation.
- High-performance, server-side Gemini 3.5 integrations under stringent security boundaries.
- No database storage, keeping user profiles completely private and sandboxed.

---

## 🚀 Future Vision: v2.0.0 & Beyond

The next generation of LokerLens AI will improve usability, scope of careers, and shareability while maintaining our signature robust manual-first design pattern.

### 🌟 1. Expansion Beyond IT & Software Roles
* **Multi-Field Job Categories**: Adapt prompt instructions to support design, marketing, content writing, visual arts, accounting, administrative, and hospitality job roles.
* **Academic & Vokasi Localization**: Include specialized templates and grading metrics tuned for multiple SMK disciplines (TKJ, Multimedia, Akuntansi, Perhotelan) and local vocational bootcamps.

### ✍️ 2. Preserving the Manual-First Philosophy
* **No File Parsing (By Design)**: We will continue to avoid automated PDF resume uploads. Manual modular inputs are far superior:
  - Eliminates parser failures due to bad design/layout blocks.
  - Forces candidate mindfulness—putting down skills and achievements on the form requires active thought and refinement, yielding higher quality inputs for the AI.
  - Keeps credentials and PII (Personally Identifiable Information) perfectly secure since candidates only submit what they wish to diagnose.

### 🔒 3. Server-Agnostic & Zero-Backend Databases
* **No Server database / login**: We will explicitly avoid requiring accounts, registrations, or database storage on cloud servers to:
  - Eliminate security breaches and minimize operational overhead costs.
  - Maintain absolute privacy of personal information.
* **Local Web Storage**: Instead, we will store candidates' history of analyses and profile details directly on their client-side device using `localStorage` or browser IndexedDB.

### ⚙️ 4. Local Utilities & Export Features
* **Export PDF Report**: Allow users to download their 30-Day Action Roadmap and recommended ATS bullets cleanly in a single, well-styled PDF card.
* **Markdown Copying**: Streamline direct copies of various layout sections for easy note-taking in Notion, Obsidian, or text editors.

### 🧠 5. Provider-Agnostic AI Backend
* **Decoupled AI Engine**: Maintain system instructions such that developers can configure other model backends (DeepSeek, Claude, local Ollama) by simply updating the environment variables.

---
Development contributions and feedback on v1.0.0 are highly welcomed! Feel free to raise GitHub issues on bug traces or localized vocabulary feedback.
