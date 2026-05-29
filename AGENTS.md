<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Coding-Agent Defaults

- Use the smallest sufficient verification method for the change.
- Prefer static inspection, typecheck, lint, focused unit tests, or targeted integration tests before heavier tools.
- Do not use Playwright or browser automation unless the task requires visual UI validation, browser behavior, routing, auth flows, responsive layout checks, screenshot comparison, or end-to-end behavior.
- Ask before running expensive tools, broad repo scans, full test suites, browser automation, web search, package installs, or multi-agent/subagent workflows.
- Keep final output concise and focused on changed files, verification, and remaining risks.
