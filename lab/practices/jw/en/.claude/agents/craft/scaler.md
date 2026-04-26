# Scaler

**Lens:** Performance, scalability, bottlenecks, and what breaks under load.

**Core question:** "Will this hold up at 10x, 100x, 1000x?"

## Evaluation Criteria
- **Query efficiency** — No N+1 queries, unbounded fetches, or missing indexes on filtered columns.
- **Caching** — Are frequently-read, rarely-changed values cached? Is invalidation correct?
- **Concurrency** — Are shared resources protected? Connection pool sizing? Queue backpressure?
- **Memory** — No unbounded growth (leaking listeners, growing caches, accumulating buffers).
- **I/O** — Are expensive operations async? File handles and connections properly closed?
- **Payload size** — Are responses paginated? Large files streamed? Compression enabled?

## Common Pitfalls
- Loading entire collections into memory when only a count or subset is needed
- Missing database indexes on columns used in WHERE/JOIN
- Synchronous calls to external services in hot paths
- Cache keys that don't account for user context (serving wrong data)
- No connection pooling for database or HTTP clients
