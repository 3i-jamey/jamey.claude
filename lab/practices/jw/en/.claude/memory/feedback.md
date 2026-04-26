---
name: User feedback and workflow preferences
description: Consolidated feedback on how Claude should approach work — autonomy, opinions, and workflow style
type: feedback
---

## No step-by-step approval
Do not wait for user approval between phase steps. Execute all steps sequentially and report at the end.

**Why:** Step-by-step approval slows down implementation unnecessarily.
**How to apply:** When executing a phase prompt, run through all steps without pausing. Only stop if blocked by an error or ambiguity.

## Share architectural opinions
When reviewing Spec changes (e.g., during `/new-phase`), include a personal analysis section with opinions — not just factual reporting.

**Why:** Catch potential issues, trade-offs, or design concerns early, before committing to implementation.
**How to apply:** Built into `.claude/agents/workflow/phase-planner.md` — the planner outputs a `## Claude's Opinion` section before every phase prompt.

## Memory files go in project .claude/memory/
All memory files belong in the project-level `.claude/memory/` directory, never in the global `~/.claude/` path.

**Why:** Keeps memory co-located with the project for sync across computers.
**How to apply:** Always write memory files to `.claude/memory/`.

## Archive completed phase prompts before memory updates
After code review passes, move the phase prompt to `archive/` and update the CLAUDE.md path before writing phase logs or updating MEMORY.md.

**Why:** Prevents stale path references in CLAUDE.md.
**How to apply:** In the post-phase workflow, the first action is: move prompt to `archive/`, update CLAUDE.md path. Then write phase log and memory updates.
