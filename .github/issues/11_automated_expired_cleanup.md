# Issue 11: [FEAT] Automated background cleanup cron for expired database records

- **Difficulty:** Advanced
- **Labels:** `enhancement`, `backend`, `performance`
- **Relevant Files:** `src/app/api/cron/cleanup/route.ts` (new)
- **Good First Issue:** No

## Problem
Currently, expired pastes are only deleted lazily when someone attempts to access their specific URL:
```ts
if (isExpired(paste.expiresAt)) {
  await prisma.paste.delete({ where: { slug: id } });
  return NextResponse.json({ error: "Paste has expired" }, { status: 410 });
}
```
Expired pastes that are never visited again remain stored in the PostgreSQL database forever, wasting database storage over time.

## Why
Self-cleaning expired records maintains database hygiene and ensures user privacy expectations (when someone chooses "Expire in 10 minutes", they expect the data to be purged even if nobody visits it).

## Current Behavior
Expired pastes accumulate in PostgreSQL indefinitely unless individually requested.

## Expected Behavior
A secure cron endpoint (e.g. `POST /api/cron/cleanup` or `GET /api/cron/cleanup`) protected by a `CRON_SECRET` bearer token that executes:
```ts
const { count } = await prisma.paste.deleteMany({
  where: {
    expiresAt: {
      lt: new Date()
    }
  }
});
```

## Possible Approach
1. Create `src/app/api/cron/cleanup/route.ts`.
2. Validate incoming `Authorization: Bearer ${process.env.CRON_SECRET}` header.
3. Perform batch deletion of expired pastes.
4. Document how to schedule this with Vercel Cron (`vercel.json`), GitHub Actions scheduled workflow, or standard crontab.

## Acceptance Criteria
- [ ] Endpoint deletes all pastes where `expiresAt < now()`.
- [ ] Endpoint is protected and rejects unauthorized requests with HTTP 401.
- [ ] Returns a JSON response with the count of deleted records and timestamp.
