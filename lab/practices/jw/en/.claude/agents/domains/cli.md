# CLI Tool

**Lens:** Terminal UX, composability, scripting, and Unix philosophy.

**Core question:** "Can this be used interactively AND piped into other tools?"

## Domain Knowledge
- **Argument design** — Flags, subcommands, positional args. Consistent, predictable, discoverable.
- **Output design** — Human-friendly by default, machine-parseable with a flag (--json, --quiet).
- **Exit codes** — 0 for success, non-zero for failure. Meaningful codes for different failure types.
- **Composability** — Reads from stdin, writes to stdout, errors to stderr. Plays well with pipes.
- **Help text** — Built-in --help with examples, not just flag descriptions.
- **Configuration** — Config files, env vars, flags — with clear precedence order.

## Common Pitfalls
- Interactive prompts that break when piped or scripted
- Output that mixes data and status messages on stdout
- No --quiet or --verbose flags for controlling output
- Missing shell completions
- Colored output sent to non-TTY destinations (breaks pipes)
- No progress indication for long-running operations
