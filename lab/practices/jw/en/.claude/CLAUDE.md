# Claude AI Project Rules
**Project:** PROJECT_NAME | **Stack:** <!-- FILL --> | **Spec:** v1.0

---

## Behavioral Rules

1. **Think Before Coding** — State assumptions. If uncertain, ask. If a simpler approach exists, say so.
2. **Simplicity First** — Minimum code. No speculative features, abstractions for single use, or error handling for impossible scenarios.
3. **Surgical Changes** — Don't "improve" adjacent code. Match existing style. Only remove what YOUR changes made unused.
4. **Goal-Driven Execution** — Define success criteria, loop until verified.
5. **Auto-Commit** — Commit when a logical unit is done. Do NOT push.
6. **Plan Mode** — Enter plan mode for 3+ step tasks. Self-review + critic sub-agent before confirming. Save plans to `docs/plans/`.
7. **Sub-agents** — Delegate research/exploration. One task per agent. Don't duplicate their work.
8. **Self-improvement** — On correction, update `memory/lessons-learned.md`. Repeated lesson (3+) → promote to CLAUDE.md.
9. **Autonomous Bug Fixing** — Investigate and fix. Only escalate if unclear after investigation.
10. **Verify Before Done** — Prove it works before declaring done.

## Workflow Rules
- Execute phase steps sequentially without waiting for user approval. Only stop if blocked.
- All memory files belong in project `.claude/memory/`, never in global `~/.claude/`.

---

## Session Start
Read `.claude/MEMORY.md`. Drill into `memory/` topic files only when the task touches that area.

## Spec
Claude owns `Documents/Spec/`. Required: `Spec.md` (index), `00_Changelog.md`, `00_IssueLog.md`.
**Writing rules:** Read before writing. Preserve structure. Be precise (numbers, APIs, data types, enums). Version every change (`1.N`).

## Architecture
1. **Separation of Concerns:** Input → Logic → Presentation.
2. **System Ownership:** No system owned by two managers/services.
3. **Communication:** <!-- FILL: messaging pattern (e.g., event bus, REST, gRPC, signals) -->
4. **Performance:** <!-- FILL: stack-specific perf rules (e.g., avoid N+1 queries, cache lookups, lazy loading) -->

## Coding Conventions
<!-- FILL: naming, file organization, linting rules -->

## Testing
- **Test command:** <!-- FILL: e.g., `npm test`, `pytest`, `cargo test` -->
- **Strategy:** <!-- FILL: unit, integration, e2e — which layers get tested and how -->
- **Rule:** Every phase step that adds or changes behavior must include or update tests. No step is verified without a passing test suite.

## Memory Update Rule
After every phase, update before stopping:
- **Always:** `memory/logs/phaseN-log.md` + `MEMORY.md` Current State.
- **If Notes to Spec:** Update Spec files, bump version.
- **If applicable:** `memory/architecture.md`, `memory/lessons-learned.md`, `memory/spec-tracking.md`.

Skipping is a workflow violation.

## Phases
Prompt template: `prompts/prompt-template.md`. Names: `phase[N]-[word].md`.

| Phase | Prompt file | Status |
|-------|-------------|--------|

## Project Config
<!-- FILL: ports, env vars, external services, build commands -->

## Agents & Skills

| Agent | Purpose |
|-------|---------|
| `agents/workflow/codebase-scan.md` | Find existing code related to Spec changes |
| `agents/workflow/phase-planner.md` | Synthesize Spec changes + scan into phase prompt |
| `agents/workflow/code-review.md` | Code integrity, conventions, Spec alignment |
| `agents/workflow/design-review.md` | Multi-perspective software design review |

**Specialist agents by role:**
- `agents/panel/` — Core advisors (architect, skeptic, simplifier, user-advocate, operator, economist, historian)
- `agents/product/` — Strategy layer (product-thinker, growth-mind, storyteller, competitor-scout)
- `agents/craft/` — Execution quality (dx-advocate, guardian, perfectionist, scaler)
- `agents/domains/` — Context specialists (web, mobile, cli, api, desktop, library, pipeline, platform)

**How to use:** Panel agents join every discussion. Product agents join when shaping direction. Craft agents join when reviewing execution. Activate one Domain agent to ground the conversation in the right software type.

**Discovery rule:** Glob the relevant subfolder and read agent descriptions to find the right specialist. Don't guess from memory — check the files.

| Skill | Purpose |
|-------|---------|
| `/new-phase [N] [name]` | Extract session decisions → phase prompt |
| `/review [files]` | Code review |
| `/design [topic]` | Design panel review |
| `/update [scope]` | Sync stale Spec references |
| `/audit [focus]` | Full project health check — Spec sync, architecture, memory, pending work |

**Subagent rules:** Use for parallel/complex work only. Never for small edits or memory writes.

## Team Collaboration
