# Project Setup Checklist

Work through this with Claude in your first session. Delete this file when done.

---

## 1. Project Identity
Open `.claude/CLAUDE.md` and fill in:
- [ ] `PROJECT_NAME` — your project name
- [ ] `Stack` field — e.g., `Node.js + Express`, `Python + FastAPI`, `Vite + React`, `Rust + Axum`

## 2. Spec Structure
Create `Documents/Spec/` and decide your topic split:
- [ ] Create `Documents/Spec/Spec.md` — master index, core concept, version number (start at `v1.0`)
- [ ] Create `Documents/Spec/00_Changelog.md` — empty, with header
- [ ] Create `Documents/Spec/00_IssueLog.md` — empty, with header
- [ ] Create your conventions file (e.g., `06_Conventions.md`) — engineering rules for this project
- [ ] Add topic files as needed (API, data model, auth, integrations, etc.)
- [ ] Update the Spec Reference list in `CLAUDE.md` — uncomment and edit the topic file entries

## 3. Architecture & Testing
Fill in the `<!-- FILL -->` placeholders in `CLAUDE.md`:
- [ ] **Inter-System Communication** — what messaging/integration pattern?
- [ ] **Performance** — stack-specific performance rules
- [ ] **Coding Conventions** — add project-specific patterns (naming, linting)
- [ ] **Testing** — test command, strategy (unit/integration/e2e), and which layers get tested
- [ ] **Project Config** — ports, env vars, external services, build commands
- [ ] **Read-Only Directories** — any third-party folders Claude should never touch?
- [ ] **Checkpoint Directories** — which folders to include in pre-phase snapshots?

## 4. Code Review Checklist
Open `.claude/agents/workflow/code-review.md` and fill in:
- [ ] **Coding Conventions** section — add checks matching your conventions from step 3
- [ ] **Read-Only Boundaries** section — match your read-only directories

## 5. Verify Memory
- [ ] Confirm `.claude/MEMORY.md` links are correct
- [ ] Review `.claude/memory/feedback.md` — keep preferences that apply, remove any that don't

## 6. First Design Session
- [ ] Have a design conversation with Claude about your program's core concept
- [ ] Run `/design [topic]` to get multi-perspective review from the design panel (optional)
- [ ] Run `/new-phase 1 [name]` to generate your first phase prompt
- [ ] Review the prompt, approve, and start building

---

## Team Setup (if applicable)
- [ ] Fill in the `Team Collaboration` section in `CLAUDE.md`
- [ ] Configure hooks in `.claude/settings.json` (linter on Edit/Write, .env block)
- [ ] Fill in `Port Allocation` table if running multiple projects
- [ ] Commit `.claude/` to version control

## Optional
- [ ] Update `.claude/memory/decisions.md` with foundational decisions from setup
- [ ] If using a framework, create `.claude/memory/framework.md` documenting its patterns
- [ ] If no UI needed, delete `.claude/agents/design/` — the panel agents cover software architecture
- [ ] If no brand/marketing needed, delete `.claude/agents/design/brand-marketing.md`
