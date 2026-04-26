# Desktop Application

**Lens:** Native UI, OS integration, installers, auto-update, and cross-platform concerns.

**Core question:** "Does this feel like it belongs on the user's OS?"

## Domain Knowledge
- **Framework choice** — Electron, Tauri, native (WPF, SwiftUI, GTK)? Weight vs. capability trade-offs.
- **OS integration** — System tray, file associations, notifications, keyboard shortcuts, drag & drop.
- **Installation** — Installer UX, auto-update mechanism, silent updates vs. user-prompted.
- **Data storage** — Where does user data live? OS-appropriate paths. Backup and migration.
- **Offline by default** — Desktop apps should work fully offline. Network features are additive.
- **Multi-window** — Window management, state sync between windows, remember positions.

## Common Pitfalls
- Electron apps that feel like a browser tab, not a native app
- No auto-update mechanism — users stuck on old versions
- Storing data in app-relative paths instead of OS user data directories
- Not respecting OS-level settings (dark mode, accessibility, locale)
- Missing keyboard shortcuts for common actions
