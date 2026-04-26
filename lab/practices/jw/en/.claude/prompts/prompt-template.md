# Phase [N]: [Single-Word Name]

## Spec Source
- **Sections:** [list of `Documents/Spec/` files and section numbers driving this phase]
- **Spec version:** v[X]

## Overview
[1-2 sentences: what this phase achieves and why]

---

## Steps

### Step 0: Checkpoint
- Create a pre-phase snapshot: zip the project's key directories (see CLAUDE.md `Checkpoint Directories`) into `.claude/checkpoints/checkpoint-phase[N].zip`.
- If a checkpoint for this phase already exists, overwrite it.
- Report the file size. Proceed without waiting for approval.

### Step 1: [Title]
- **[MODIFY/NEW] [FileName]**:
    - [Requirement 1]
    - [Requirement 2]
- **Tests:** [What tests to add or update]
- **Verify:** [How to confirm it works]

### Step 2: [Title]
- ...

### Step N-1: Run Tests
- Run the project's test suite (see CLAUDE.md `Testing` section for command).
- If tests fail, fix the failing tests or the code causing the failure.
- Do not proceed to code review until all tests pass.

### Step N (Final): Code Review
- Run the code-review agent (`.claude/agents/workflow/code-review.md`) on all files changed during this phase.
- Fix any HIGH/MED issues.
- Report the review result to the user.

---

## Notes to Spec
[Deviations from the Spec, implementation decisions not covered by the spec, or open questions. These are synced back to the Spec automatically after phase completion. Remove this section if there are none.]

---

## Workflow
Execute steps sequentially. Proceed to the next step without waiting for user approval.
