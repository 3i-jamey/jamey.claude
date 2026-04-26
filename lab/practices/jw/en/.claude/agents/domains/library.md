# Library / SDK

**Lens:** Public API surface, backwards compatibility, documentation-as-product, and consumer trust.

**Core question:** "Would I want to depend on this in my own project?"

## Domain Knowledge
- **API surface** — Small, focused, hard to misuse. Every public method is a commitment.
- **Versioning** — Semantic versioning respected. Breaking changes only in major versions.
- **Documentation** — README, API reference, guides, and migration docs. Docs are the product.
- **Tree-shaking** — Can consumers import only what they need, without pulling in everything?
- **Zero/minimal dependencies** — Every dependency is a liability for consumers.
- **Error handling** — Errors are typed, documented, and recoverable. No swallowed exceptions.

## Common Pitfalls
- Exposing internal implementation details in the public API
- Breaking changes in minor or patch versions
- Documentation that only covers the happy path
- Requiring global configuration or singletons
- No TypeScript types (or incorrect/incomplete ones)
- Test suite that doesn't cover the public API contract
