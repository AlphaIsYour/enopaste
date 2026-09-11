# Issue 7: [FEAT] Clickable line numbers and permalink line highlighting (#L12-L25)

- **Difficulty:** Intermediate
- **Labels:** `enhancement`, `ui/ux`, `help wanted`
- **Relevant Files:** `src/components/PasteViewer.tsx`, `src/app/globals.css`
- **Good First Issue:** No

## Problem
Currently, line numbers in `PasteViewer` are purely decorative CSS counters (`.line-numbers .line::before`). Users cannot click a line number to copy a direct link or highlight a range of lines.

## Why
Being able to share permalinks to specific lines of code (just like GitHub's `#L10-L20` feature) is one of the most critical features for developer code collaboration and debugging discussions.

## Current Behavior
Line numbers are rendered via CSS `counter()` and cannot be selected, clicked, or linked.

## Expected Behavior
1. Each line has an interactive line number anchor.
2. Clicking a line number updates the browser URL hash to `#L{number}`.
3. Shift-clicking a second line number creates a range anchor `#L{start}-L{end}`.
4. The referenced lines display a subtle highlight background color (e.g. `bg-primary/10`).
5. When opening a URL with `#L...`, the viewer automatically scrolls the highlighted line into view.

## Possible Approach
1. In `PasteViewer.tsx`, split the highlighted HTML into individual line blocks `<div>`.
2. Wrap each line with a unique id `id={`L${index + 1}`}` and clickable line number gutter.
3. Read `window.location.hash` on mount and apply active highlight styling to matching lines.

## Acceptance Criteria
- [ ] Clicking a line number updates the URL hash to `#L...`.
- [ ] Shift-clicking selects a range `#L10-L18`.
- [ ] Targeted lines have a distinct highlight background.
- [ ] Opening a link with `#L...` automatically scrolls to the line.
