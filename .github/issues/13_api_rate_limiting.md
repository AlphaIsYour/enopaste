# Issue 13: [PERF/SECURITY] Implement sliding window rate limiting on paste creation and authentication endpoints

- **Difficulty:** Intermediate
- **Labels:** `security`, `performance`, `backend`, `help wanted`
- **Relevant Files:** `src/middleware.ts`, `src/app/api/paste/route.ts`, `src/app/api/paste/[id]/route.ts`
- **Good First Issue:** No

## Problem
Currently, `POST /api/paste` (creating pastes) and `GET /api/paste/:slug?password=...` (unlocking protected pastes) have no rate limiting. Malicious actors or misconfigured scripts can flood the database with spam pastes (exhausting storage and connection pools) or brute-force passwords of protected pastes.

## Why It Matters
Rate limiting protects database performance, prevents denial of service (DoS), and hardens the security of password-protected pastes against automated dictionary attacks.

## Expected Behavior
1. Paste creation is limited to a reasonable threshold per IP address (e.g., max 10 requests per minute).
2. Password verification attempts are limited to max 5 failed attempts per IP / per paste within a 15-minute window.
3. Exceeding limits returns HTTP `429 Too Many Requests` with a descriptive error message and `Retry-After` header.

## Possible Approach
- Implement an in-memory sliding window or token bucket limiter using an LRU cache (e.g., `lru-cache`), or support Upstash Redis via optional environment variables (`UPSTASH_REDIS_REST_URL`).
- Apply rate check directly inside Next.js API route handlers or via Next.js middleware.
- Return standardized headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.

## Acceptance Criteria
- [ ] Paste creation returns HTTP 429 when rate limit is exceeded.
- [ ] Password brute-force attempts are throttled after repeated failures.
- [ ] Includes automated test verifying the rate limit triggers correctly.
