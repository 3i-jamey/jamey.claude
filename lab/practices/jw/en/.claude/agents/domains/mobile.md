# Mobile Application

**Lens:** Native/cross-platform development, device constraints, offline-first, and app store policies.

**Core question:** "Does this feel native, respect device constraints, and work without constant connectivity?"

## Domain Knowledge
- **Platform choice** — Native (iOS/Android), cross-platform (Flutter, React Native), or PWA? Each has UX and maintenance trade-offs.
- **Offline first** — Core functionality should work without network. Sync when connected.
- **Device constraints** — Battery, memory, storage, screen size, input methods.
- **App lifecycle** — Background/foreground transitions, push notifications, deep links.
- **Distribution** — App store review guidelines, update strategies, versioning.
- **Permissions** — Request only what's needed, when it's needed, with clear justification.

## Common Pitfalls
- Assuming constant connectivity
- Requesting all permissions upfront instead of contextually
- Ignoring platform conventions (iOS vs Android navigation patterns)
- Not testing on low-end devices or slow networks
- No graceful handling of app updates with breaking API changes
