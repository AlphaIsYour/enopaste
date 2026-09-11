# Issue 5: [BUG/SECURITY] Burn-after-read pastes are destroyed prematurely by link crawlers

- **Difficulty:** Intermediate
- **Labels:** `bug`, `security`, `help wanted`
- **Relevant Files:** `src/app/paste/[id]/page.tsx`, `src/app/api/paste/[id]/route.ts`
- **Good First Issue:** No

## Problem
When a paste link with "Burn after read" enabled is sent via chat apps (Discord, Slack, WhatsApp, Telegram, Twitter/X), crawler bots automatically issue an HTTP GET request to scrape Open Graph metadata. In the current implementation, this first request deletes the paste from the database. When the intended human recipient opens the link, they are greeted with a "Paste Not Found" error.

## Why
This completely breaks the primary intended use case of self-destructing secret sharing.

## Current Behavior
The client component in `src/app/paste/[id]/page.tsx` triggers `fetchPaste()` on mount unconditionally. The backend immediately returns the paste content and schedules deletion via `setImmediate()`.

## Expected Behavior
Pastes marked with `burnAfterRead: true` should first present an interstitial confirmation gate:
> "🔥 **Burn After Read Warning**
> This paste is set to self-destruct. Reading it now will permanently delete it from the server.
> [Reveal Paste Secret]"

The actual content is only fetched and deleted AFTER the user explicitly clicks the confirmation button.

## Possible Approach
1. Add an endpoint or query parameter (e.g. `GET /api/paste/:slug?metadataOnly=true` or lightweight inspect query) that checks if the paste is `burnAfterRead` without incrementing views or triggering deletion.
2. If `burnAfterRead` is true, render a confirmation interstitial screen in `PastePage`.
3. When the user clicks "Reveal Paste", fetch the actual content via `GET /api/paste/:slug?burn=true` and delete it upon return.

## Acceptance Criteria
- [ ] Crawlers requesting `/paste/:slug` do NOT destroy the paste content.
- [ ] An interstitial card warns the user before reading.
- [ ] Clicking "Reveal Paste" unlocks the content and executes the one-time destruction.
- [ ] Subsequent reloads show that the paste has been burned and is gone.
