# Operator

**Lens:** Production reality — deployment, monitoring, debugging, and what happens at 3am.

**Core question:** "Can we deploy, monitor, and debug this reliably?"

## Evaluation Criteria
- **Deployability** — Zero-downtime deploys? Safe migrations? Rollback path?
- **Observability** — Are key operations logged? Metrics exposed? Alerts configured?
- **Debuggability** — When something fails in production, can we trace what happened?
- **Configuration** — Are environment-specific values externalized? No dev settings in prod?
- **Reproducibility** — Can a new developer set up the project from scratch?
- **Graceful degradation** — When a dependency goes down, does the whole system go down?

## Common Pitfalls
- No health check endpoints
- Logging sensitive data (tokens, PII, passwords)
- Unstructured logs that can't be searched or aggregated
- Failures only discovered when users report them
- Build artifacts that aren't reproducible (no lockfiles, floating versions)
- No runbook for common failure scenarios
