# Issue 12: [FEAT] CLI and cURL support for creating pastes directly from the terminal

- **Difficulty:** Intermediate
- **Labels:** `enhancement`, `developer-experience`, `help wanted`
- **Relevant Files:** `src/app/api/paste/route.ts`, `README.md`
- **Good First Issue:** No

## Problem
Currently, creating a paste requires opening the web browser and using the web UI, or writing a custom JSON HTTP POST request with `content-type: application/json`. Many terminal developers prefer piping terminal output directly to pastebins (e.g. `cat log.txt | curl -F 'paste=<-' ...`).

## Why
CLI / cURL friendliness is a signature developer-first feature that encourages adoption and utility scripting (e.g. CI failure log sharing).

## Current Behavior
`POST /api/paste` only accepts `application/json` payload bodies.

## Expected Behavior
Allow developers to pipe text directly using standard cURL commands:
```bash
# Upload a file or pipe stdout:
cat error.log | curl -X POST --data-binary @- https://enopaste.dev/api/paste
# Output: https://enopaste.dev/paste/abc12345

# Or via form-data:
curl -F 'content=@file.txt' -F 'title=debug.log' https://enopaste.dev/api/paste
```
If the request includes `Accept: text/plain` or `User-Agent: curl/...`, return the raw paste URL as plain text rather than JSON.

## Possible Approach
1. In `src/app/api/paste/route.ts`, inspect `request.headers.get("content-type")`.
2. Support `text/plain`, `multipart/form-data`, and raw body streams.
3. If `User-Agent` starts with `curl` or `Accept` is `text/plain`, return `NextResponse(url + '\n', { headers: { 'Content-Type': 'text/plain' } })`.

## Acceptance Criteria
- [ ] Developers can create pastes via standard `curl` commands without writing JSON envelopes.
- [ ] Returns a clean plain-text URL when requested by CLI tools.
- [ ] Documentation with cURL examples is added to `README.md`.
