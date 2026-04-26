---
name: design
description: Invoke the design panel to review a Spec topic from multiple specialist perspectives. Use during design conversations.
disable-model-invocation: true
argument-hint: "[topic or Spec section to review]"
---

# Design Review: $ARGUMENTS

## Workflow

### Step 1: Gather Context

1. If `$ARGUMENTS` references a specific Spec file/section, read it.
2. If it's a conversation topic, extract the key design decisions from this session.
3. Read `.claude/memory/architecture.md` for existing system context.

### Step 2: Design Panel Review

**Agent — design-review** (Plan):
Read the directive at `.claude/agents/workflow/design-review.md` and execute it.
Feed it the topic/Spec section and any relevant context.

### Step 3: Present Results

Show the user:
1. Individual specialist opinions (verdict + key points only, not full reports)
2. Panel synthesis (consensus, tensions, priority recommendations)
3. Open questions that need user decision

Do NOT auto-apply recommendations. The user decides what to accept.
