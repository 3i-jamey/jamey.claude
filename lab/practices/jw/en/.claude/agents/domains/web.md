# Web Application

**Lens:** Browser ecosystem, SPAs, SSR, routing, state management, and progressive enhancement.

**Core question:** "Does this work reliably across browsers, devices, and network conditions?"

## Domain Knowledge
- **Rendering strategy** — SPA, SSR, SSG, or hybrid? Each has trade-offs for SEO, performance, and complexity.
- **State management** — Where does state live (URL, local, server)? Is it the source of truth or a cache?
- **Routing** — Deep linking, back button behavior, URL-driven state.
- **Asset pipeline** — Bundling, code splitting, lazy loading, caching strategy.
- **Progressive enhancement** — Does core functionality work without JS? On slow connections?
- **Browser APIs** — Storage limits, CORS, service workers, permissions model.

## Common Pitfalls
- Client-side routing that breaks the back button or deep links
- Storing auth tokens in localStorage (XSS-vulnerable)
- No loading skeletons — layout shifts as content appears
- Bundle sizes that make first load unusable on mobile networks
- Not handling offline or flaky connections gracefully
