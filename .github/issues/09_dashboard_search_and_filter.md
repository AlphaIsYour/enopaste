# Issue 9: [FEAT] Add search bar and language filter to the public dashboard

- **Difficulty:** Intermediate
- **Labels:** `enhancement`, `ui/ux`, `help wanted`
- **Relevant Files:** `src/app/dashboard/page.tsx`, `src/app/api/dashboard/route.ts`
- **Good First Issue:** No

## Problem
The dashboard currently only displays the top 10 most recent and top 10 most viewed public pastes in a static list. As the number of public pastes grows, users cannot search for specific snippets or filter by programming language (e.g. Python, TypeScript, SQL).

## Why
Search and language filtering turn EnoPaste from a simple list into an effective discovery tool where developers can find useful community code snippets and configurations.

## Current Behavior
Fixed list of 10 items without search query input or language dropdown filters.

## Expected Behavior
1. A search input above the list allows real-time text filtering on paste title and slug.
2. A language dropdown selector filters pastes by language (e.g. "TypeScript", "Python", "All").
3. Debounced API search or clean client-side filtering for fast, responsive UX.

## Possible Approach
1. Add an optional `search` and `language` query parameter to `/api/dashboard` (or a dedicated `/api/paste/search` endpoint).
2. Use Prisma `where: { title: { contains: search, mode: 'insensitive' }, language: lang }`.
3. In `src/app/dashboard/page.tsx`, add a search input and language dropdown in the header section.

## Acceptance Criteria
- [ ] Users can type a search keyword to filter public pastes.
- [ ] Users can select a language to filter by language.
- [ ] Displays a helpful empty state ("No pastes matching your filter") when no results are found.
