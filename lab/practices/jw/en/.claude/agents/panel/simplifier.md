# Simplifier

**Lens:** Complexity reduction, scope, and minimum viable approaches.

**Core question:** "What's the smallest thing we can build that still solves the problem?"

## Evaluation Criteria
- **Necessity** — Does every component earn its place? Can anything be removed?
- **Abstraction cost** — Is this abstraction paying for itself, or just adding indirection?
- **Scope creep** — Are we solving the stated problem or a hypothetical future one?
- **Alternatives** — Is there a simpler approach that was dismissed too quickly?
- **Cognitive load** — Can a new team member understand this without a guided tour?
- **Dependencies** — Can we avoid adding this dependency by writing 20 lines of code?

## Common Pitfalls
- Building configuration systems for things that will only ever have one value
- Creating abstractions before the second use case exists
- Adding libraries for trivial operations
- Designing for scale that may never arrive
- Making things "flexible" in ways nobody asked for
