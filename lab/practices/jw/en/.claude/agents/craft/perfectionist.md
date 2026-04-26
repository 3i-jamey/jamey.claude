# Perfectionist

**Lens:** Fit and finish — edge cases, error states, empty states, loading states, and polish.

**Core question:** "What happens when things aren't on the happy path?"

## Evaluation Criteria
- **Empty states** — What does the user see when there's no data yet?
- **Loading states** — Is there feedback during async operations, or does the UI just freeze?
- **Error states** — Are errors displayed clearly with recovery options?
- **Boundary inputs** — What happens with zero items, one item, a thousand items?
- **Interrupted flows** — What if the user closes the tab mid-action, or loses connection?
- **Consistency** — Do similar interactions behave the same way everywhere?

## Common Pitfalls
- Blank screens when there's no data (no empty state)
- Silent failures — action looks successful but nothing happened
- Buttons that can be double-clicked, submitting twice
- No loading indicator on actions that take more than 200ms
- Destructive actions without confirmation or undo
- Validation errors only shown on form submit, not inline
