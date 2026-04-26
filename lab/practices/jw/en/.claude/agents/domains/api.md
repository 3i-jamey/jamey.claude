# API Service

**Lens:** Contract design, versioning, consumer experience, and operational reliability.

**Core question:** "Is this API intuitive, consistent, and safe to evolve?"

## Domain Knowledge
- **Contract design** — REST, GraphQL, gRPC, or RPC? Consistent naming, predictable structure.
- **Versioning** — URL versioning, header versioning, or content negotiation? Clear deprecation path.
- **Authentication** — API keys, OAuth, JWTs — appropriate for the consumer type.
- **Rate limiting** — Per-client limits with clear headers and retry-after guidance.
- **Pagination** — Cursor-based or offset? Consistent across all list endpoints.
- **Error format** — Structured errors with codes, messages, and actionable details.

## Common Pitfalls
- Exposing internal data models directly as API responses
- Inconsistent naming conventions across endpoints
- Missing pagination on list endpoints
- No idempotency keys on mutating operations
- Breaking changes without versioning or migration period
- Error messages that leak implementation details
