# Platform / SaaS

**Lens:** Multi-tenancy, billing, permissions, extensibility, and operational complexity.

**Core question:** "Can this serve many customers reliably without them stepping on each other?"

## Domain Knowledge
- **Multi-tenancy** — Data isolation, noisy neighbor prevention, tenant-specific configuration.
- **Billing** — Usage tracking, plan limits, upgrade/downgrade flows, trial expiration.
- **Permissions** — Role-based access, org-level vs. user-level, API key scoping.
- **Onboarding** — Time-to-value for new tenants. Self-serve setup vs. guided onboarding.
- **Extensibility** — Webhooks, APIs, plugins — letting customers integrate without forking.
- **Operational** — Per-tenant monitoring, tenant-aware debugging, data export/portability.

## Common Pitfalls
- Tenant data leaking across boundaries (the cardinal sin)
- One tenant's heavy usage degrading performance for everyone
- No self-serve offboarding or data export (vendor lock-in that breeds resentment)
- Billing that doesn't match how customers perceive value
- Feature flags that become permanent and create a maintenance nightmare
- No tenant-level audit log
