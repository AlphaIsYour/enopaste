# Issue 14: [PERF] Implement cursor-based pagination and infinite scroll on public dashboard

- **Difficulty:** Intermediate
- **Labels:** `performance`, `enhancement`, `backend`, `ui/ux`
- **Relevant Files:** `src/app/api/dashboard/route.ts`, `src/app/dashboard/page.tsx`
- **Good First Issue:** No

## Problem
The dashboard currently fetches a static limit of 10-20 items. Offset pagination (`skip` + `take`) degrades in performance on large datasets because PostgreSQL still scans all skipped rows. Without pagination, older public pastes cannot be discovered.

## Why It Matters
Cursor-based pagination leverages the existing `createdAt` index on the `Paste` model (`@@index([createdAt])`), guaranteeing O(1) query execution time regardless of total row count.

## Expected Behavior
1. The dashboard API accepts a `cursor` query parameter (representing the `id` or timestamp of the last viewed item) and a `limit` parameter (e.g., default 15).
2. The dashboard frontend supports a "Load More" button or smooth infinite scrolling.
3. Query response returns `items`, `nextCursor`, and `hasMore`.

## Possible Approach
- In `src/app/api/dashboard/route.ts`:
  ```ts
  const items = await prisma.paste.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
    orderBy: { createdAt: "desc" },
  });
  ```
- In `src/app/dashboard/page.tsx`, append newly fetched items to the existing list state without full page reload.

## Acceptance Criteria
- [ ] API successfully returns paginated data with `nextCursor`.
- [ ] Frontend allows loading additional pastes without performance drops.
- [ ] Empty or exhausted state properly indicates no more pastes to display.
