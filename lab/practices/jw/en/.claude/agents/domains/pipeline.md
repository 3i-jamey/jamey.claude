# Data Pipeline

**Lens:** ETL/ELT, data flow, idempotency, schema evolution, and observability.

**Core question:** "Can this process data correctly, repeatedly, and recoverably?"

## Domain Knowledge
- **Idempotency** — Running the same job twice must produce the same result. No duplicates, no corruption.
- **Schema evolution** — How do you handle new fields, removed fields, type changes? Forward/backward compatible?
- **Backfill** — Can historical data be reprocessed without affecting live data?
- **Partitioning** — Data partitioned by time, tenant, or key for efficient processing and querying.
- **Observability** — Row counts, processing time, error rates, data freshness — all visible.
- **Failure handling** — Dead letter queues, retry policies, alerting on stuck or failed jobs.

## Common Pitfalls
- No idempotency — reruns create duplicates
- Schema changes that break downstream consumers
- No monitoring on data freshness — stale data goes unnoticed
- Processing entire datasets when only incremental changes are needed
- No way to replay or backfill without custom scripts
- Silent data loss when records fail validation
