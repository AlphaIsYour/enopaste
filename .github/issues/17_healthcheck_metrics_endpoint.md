# Issue 17: [DEVOPS/PERF] Add database health check and system metrics endpoint (/api/health)

- **Difficulty:** Easy
- **Labels:** `devops`, `backend`, `performance`, `good first issue`
- **Relevant Files:** `src/app/api/health/route.ts`
- **Good First Issue:** Yes

## Problem
Currently, there is no standardized healthcheck endpoint to monitor the application status, database connectivity, or pool responsiveness. In Docker, Kubernetes, or cloud deployment environments, container orchestrators have no way to verify readiness or liveness.

## Why It Matters
A lightweight healthcheck endpoint enables automated monitoring (e.g. UptimeRobot, BetterStack, Docker healthchecks), detects silent database disconnections, and allows measuring round-trip query latency.

## Expected Behavior
1. Create a `GET /api/health` endpoint.
2. Execute a fast database ping query (`SELECT 1` via Prisma).
3. Return HTTP 200 with JSON payload containing:
   - `status`: `"ok"`
   - `database`: `"connected"`
   - `dbLatencyMs`: number (round-trip ping duration)
   - `uptime`: process uptime in seconds
   - `timestamp`: ISO timestamp
4. If database connection fails or times out, return HTTP 503 Service Unavailable with `status: "error"`.

## Acceptance Criteria
- [ ] `GET /api/health` returns HTTP 200 with latency metrics when database is healthy.
- [ ] Returns HTTP 503 if the database is unreachable.
- [ ] Endpoint is excluded from heavy logging/rate-limiting to allow frequent health probes.
