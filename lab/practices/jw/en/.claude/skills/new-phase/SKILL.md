---
name: new-phase
description: Distill this session's design decisions into a focused phase prompt. Use after a design conversation.
disable-model-invocation: true
argument-hint: "[phase-number] [single-word-name]"
---

# New Phase: Phase $ARGUMENTS

Generate a phase implementation prompt from the current session's design decisions.

## Workflow

### Step 1: Extract & Categorize (inline)

Review the full conversation and extract every design decision, agreement, or specification discussed. Then:

1. **Group** decisions into categories by topic/system (e.g., "Auth," "API," "Database," "UI").
2. **Rank** categories by scope — which has the most decisions, the deepest impact, or the most interconnected changes.
3. **Pick the main theme** — the single largest category becomes the phase focus.
4. **Defer the rest** — all other categories go to the deferred list with a one-line reason (e.g., "unrelated to main theme," "only one minor decision," "depends on systems not yet built").
5. **Re-evaluate prior deferrals:**
   - Read `.claude/memory/deferred.md` — check if any previously deferred items match the current main theme. If matches are found, explicitly flag them to the user and pull them in. Note their tag:
     - `[FEATURE]` items are already in the Spec — they skip the Spec write step and go straight into phase planning.
     - `[DECISION]` items are not in the Spec — they need to be written to the Spec in Step 2 alongside new session decisions.

Present the categorization to the user:
- Main theme and the decisions included
- **Recovered from backlog** — any prior deferred items that match the theme, showing their tag and when they were originally deferred
- Deferred items (new) and why
- Ask for confirmation before proceeding

### Step 2: Update Spec (inline, after user confirms)

Write in-scope items that are **not yet in the Spec** (new session decisions + any recovered `[DECISION]` items) to the appropriate `Documents/Spec/` files. Skip recovered `[FEATURE]` items — they're already specced.

1. Read the conventions file listed in `.claude/CLAUDE.md` Spec Reference first.
2. Read each target Spec file before editing.
3. Follow all Spec Writing Rules from `.claude/CLAUDE.md`.
4. Bump version in `Documents/Spec/Spec.md` and add changelog entry to `Documents/Spec/00_Changelog.md`.

### Step 3: Design Review (optional, parallel with Step 4)

If the in-scope decisions involve significant new systems or architecture:

**Agent — design-review** (Plan):
Read the directive at `.claude/agents/workflow/design-review.md` and execute it.
Feed it the in-scope Spec sections. Present the panel's synthesis to the user alongside the phase prompt draft.

Skip this step for small, incremental changes or pure refactors.

### Step 4: Scan codebase (agent)

**Agent — codebase-scan** (Explore):
Read the directive at `.claude/agents/workflow/codebase-scan.md` and execute it.
Use the in-scope decisions as search targets.

### Step 5: Plan (after Steps 2-4 complete)

**Agent — phase-planner** (Plan):
Read the directive at `.claude/agents/workflow/phase-planner.md` and execute it.
Feed it the in-scope decisions (now in the Spec), the codebase scan from Step 4, and the design review output from Step 3 (if available).
The phase number and name are: $ARGUMENTS

### Step 6: Archive Previous Phase

Before saving the new prompt, archive any completed phase:
1. Check the phase table in `.claude/CLAUDE.md` for phases with status `Done`
2. For each, move the prompt file from `.claude/prompts/` to `.claude/prompts/archive/` (create the folder if needed)
3. Update the prompt file path in the CLAUDE.md phase table to `prompts/archive/phase[N]-[name].md`

### Step 7: Output

1. Save the generated prompt to `.claude/prompts/phase[N]-[name].md`
2. Add the phase to the table in `.claude/CLAUDE.md` with status `Pending`
3. Update `.claude/memory/spec-tracking.md` with the new Spec version
4. Update `.claude/memory/deferred.md` — remove recovered items, add newly deferred items with the appropriate tag (`[DECISION]` for ideas not written to Spec, `[FEATURE]` for items now specced in Spec), date, and one-line reason
5. Show the user the draft prompt (including Claude's Opinion, Design Panel feedback if available, and Deferred Changes) and ask for approval before implementation
