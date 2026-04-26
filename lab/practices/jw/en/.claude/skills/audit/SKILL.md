---
name: audit
description: Full project health audit — Spec sync, code alignment, memory freshness, architecture violations, and pending work.
disable-model-invocation: true
argument-hint: "[optional: focus area, e.g. 'auth' or 'database']"
---

# Project Audit: $ARGUMENTS

Run a comprehensive health check across all project layers. If `$ARGUMENTS` is provided, focus on that area. Otherwise, audit everything.

## Workflow

Run the following checks in parallel where possible, then compile results.

### 1. State Check
Read these files and extract current state:
- `.claude/MEMORY.md` — current phase, Spec version
- `.claude/memory/spec-tracking.md` — last reviewed Spec version
- `Documents/Spec/00_Changelog.md` — latest Spec version
- `Documents/Spec/00_IssueLog.md` — active issues

### 2. Spec ↔ Code Sync
Spawn an **Explore** agent:
- Compare Spec specifications against actual code implementation
- Flag: features specced but not implemented, implemented but not specced, values that diverge
- Check naming: do code class/method names match Spec terminology?

### 3. Architecture Review
Spawn an **Explore** agent:
- Check CLAUDE.md architecture rules against codebase
- Separation of concerns violations (Input/Logic/Presentation crossing)
- Systems owned by multiple services
- N+1 queries, unbounded fetches, missing error handling at boundaries
- Inter-system communication bypassing the designated pattern

### 4. Memory Freshness
- Is `MEMORY.md` Current State line accurate vs actual phase table?
- Does `memory/architecture.md` reflect systems that exist in code?
- Are there items in `memory/deferred.md` older than 30 days?
- Does `memory/lessons-learned.md` have lessons that should be promoted to CLAUDE.md (3+ occurrences)?

### 5. Pending Work
- Deferred items ready to be picked up (dependencies now met)
- Spec sections changed since last reviewed version
- Open issues in `00_IssueLog.md` that haven't been addressed
- TODOs/FIXMEs in the codebase

## Output Format

```
# Project Audit Report

## Summary
Phase: [N] — [status]
Spec: v[current] (last reviewed: v[X]) [UP TO DATE / BEHIND BY N VERSIONS]
Active issues: [count]
Health: [GOOD / NEEDS ATTENTION / ACTION REQUIRED]

## Spec ↔ Code Sync
| Status | Item | Detail |
|--------|------|--------|
| DRIFT | [feature] | Spec says X, code does Y |
| UNIMPL | [feature] | Specced in Spec, not in code |
| UNDOC | [feature] | In code, not in Spec |

## Architecture Violations
- [SEVERITY] [file:line] — [violation description]

## Memory Health
- [STALE/OK] MEMORY.md — [detail]
- [STALE/OK] architecture.md — [detail]
- [ACTION] deferred.md — [N items older than 30 days]
- [ACTION] lessons-learned.md — [N candidates for promotion]

## Pending Work
- [N] deferred items ready for pickup
- [N] Spec versions behind
- [N] open issues
- [N] TODOs/FIXMEs in code

## Recommended Next Actions
1. [Most urgent action]
2. [Second priority]
3. [Third priority]
```

Keep the report concise. Flag problems, don't explain obvious fixes.
