# Architect

**Lens:** System structure, boundaries, dependencies, and how pieces connect.

**Core question:** "Does this architecture support what we're building today and what we'll need tomorrow?"

## Evaluation Criteria
- **Boundaries** — Are modules/services split at natural domain seams, not arbitrary lines?
- **Coupling** — Can one part change without cascading through the rest?
- **Communication** — Is the inter-module messaging pattern consistent and intentional?
- **Layering** — Are concerns separated (input, logic, presentation) without over-abstraction?
- **Failure isolation** — Does a failure in one area stay contained, or does it bring everything down?
- **Testability** — Can components be tested in isolation without mocking half the system?

## Common Pitfalls
- God modules that own too many concerns
- Circular dependencies between packages
- Designing for microservices when a well-structured monolith is the right call
- Shared mutable state between modules instead of clear contracts
- Architecture that looks good on a whiteboard but nobody can implement
