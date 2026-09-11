# Issue 4: [GOOD FIRST ISSUE] [FEAT] Add Word Count and Estimated Reading/Viewing Time Badge

- **Difficulty:** Beginner
- **Labels:** `good first issue`, `enhancement`, `ui/ux`
- **Relevant Files:** `src/components/PasteViewer.tsx`, `src/lib/utils.ts`
- **Good First Issue:** Yes

## Problem
In `PasteViewer.tsx`, the metadata badge only shows the number of lines and total character count (`{lineCount} lines · {chars} chars`). For text, logs, and markdown pastes, word count and estimated reading time are missing.

## Why
When developers share markdown documents, meeting notes, or article drafts via EnoPaste, word count and reading time provide quick readability context.

## Current Behavior
Only `lines` and `chars` are computed and displayed.

## Expected Behavior
Display line count, word count, and file size in KB (e.g. `12 lines · 450 words · 2.4 KB`).

## Possible Approach
1. In `src/lib/utils.ts`, export helper functions:
   - `getWordCount(text: string): number`
   - `formatFileSize(bytes: number): string`
2. In `src/components/PasteViewer.tsx`, use these helpers to render an enriched badge row.

## Acceptance Criteria
- [ ] Helper functions are cleanly implemented and handle edge cases (empty strings, multiple consecutive spaces, UTF-8 strings).
- [ ] The badge row in `PasteViewer` displays formatted word count and estimated file size.
