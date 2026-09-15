# Issue 15: [PERF] Add ETag and Cache-Control headers to raw paste endpoint

- **Difficulty:** Easy
- **Labels:** `performance`, `backend`, `good first issue`, `help wanted`
- **Relevant Files:** `src/app/api/paste/[id]/raw/route.ts`
- **Good First Issue:** Yes

## Problem
The `/api/paste/:slug/raw` endpoint is frequently fetched by automated scripts, curl commands, and external tooling. Currently, every single fetch re-reads the full content from the database and returns an uncached HTTP 200 payload.

## Why It Matters
Pastes are typically immutable after creation. Serving cached responses with conditional `304 Not Modified` headers saves database bandwidth, reduces database CPU usage, and gives sub-millisecond response times to repeated curl or script fetches.

## Expected Behavior
1. Generate an `ETag` based on a hash of the paste `id` and `updatedAt` (or SHA-256 of the content).
2. Check the incoming request header `If-None-Match`.
3. If the ETag matches, immediately return `304 Not Modified` with an empty body.
4. Set an appropriate `Cache-Control` header (e.g. `public, max-age=60, stale-while-revalidate=600`) for non-burn-after-read pastes.

## Acceptance Criteria
- [ ] `ETag` and `Cache-Control` response headers present on `/api/paste/:slug/raw`.
- [ ] Requests providing matching `If-None-Match` header receive `304 Not Modified`.
- [ ] Burn-after-read pastes explicitly set `Cache-Control: no-store` to avoid browser caching.
