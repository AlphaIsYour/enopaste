# Issue 16: [PERF/UX] Add DOM virtualization for large pastes in PasteViewer

- **Difficulty:** Advanced
- **Labels:** `performance`, `ui/ux`, `frontend`, `help wanted`
- **Relevant Files:** `src/components/PasteViewer.tsx`
- **Good First Issue:** No

## Problem
EnoPaste supports paste sizes up to 1MB, which can easily contain 10,000+ lines of code or log output. In `PasteViewer.tsx`, every line number and highlighted line container is currently rendered simultaneously in the DOM tree, causing major UI freezes, input lag, and high RAM consumption on the user's browser.

## Why It Matters
Virtualization ensures that only the lines currently visible in the user's browser viewport (plus a small overscan buffer) are rendered in the DOM, keeping rendering speed constant at 60 FPS regardless of whether the file has 50 lines or 50,000 lines.

## Expected Behavior
1. Viewing large pastes (e.g. >1,000 lines) does not freeze the browser tab or drop framerates during scrolling.
2. Line numbers and highlight styling remain properly aligned during scrolling.
3. Permalinks (`#L100`) and line selection continue working smoothly when jumping directly to a line.

## Possible Approach
- Integrate a lightweight virtualization library such as `@tanstack/react-virtual` or implement an `IntersectionObserver` / virtual windowing mechanism.
- Keep the line container height fixed or dynamically measured.

## Acceptance Criteria
- [ ] Large pastes (>2,000 lines) load and scroll smoothly with negligible main-thread blocking.
- [ ] Clickable line selection and URL permalink jumping still work accurately.
- [ ] Soft wrap toggle works harmoniously with the virtualizer.
