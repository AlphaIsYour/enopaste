# Issue 2: [GOOD FIRST ISSUE] [UI/UX] Add line-wrap toggle (soft wrap vs horizontal scroll) in PasteViewer

- **Difficulty:** Beginner
- **Labels:** `good first issue`, `enhancement`, `ui/ux`
- **Relevant Files:** `src/components/PasteViewer.tsx`, `src/app/globals.css`
- **Good First Issue:** Yes

## Problem
When reading code snippets with long lines (such as minified JSON, logs, or long SQL queries), `PasteViewer` currently forces horizontal scrolling. There is no option for users to toggle soft line-wrapping.

## Why
Different developers prefer different reading modes: horizontal scrolling is better for preserving column alignment in programming languages, whereas soft wrap is much better for prose, logs, and markdown snippets, especially on smaller laptop or tablet screens.

## Current Behavior
The `<pre>` container in `PasteViewer.tsx` has `overflow-x-auto` with fixed non-wrapping code.

## Expected Behavior
Provide a toggle button in the code viewer header (e.g. labeled "Wrap" with an icon like `WrapText` from `lucide-react`) that toggles between `whitespace-pre` (horizontal scroll) and `whitespace-pre-wrap break-words` (soft line wrapping). The user's preference can also be saved in `localStorage`.

## Possible Approach
1. In `src/components/PasteViewer.tsx`, add a local state `const [isWrapped, setIsWrapped] = useState(false);`.
2. Add a toggle button in the top toolbar using `<WrapText className="h-4 w-4" />`.
3. Conditionally apply `whitespace-pre-wrap break-words` vs `whitespace-pre` to the `<pre>` element.
4. Optionally persist the state in `localStorage.getItem('enopaste-line-wrap')`.

## Acceptance Criteria
- [ ] A line-wrap toggle button is added to the `PasteViewer` header.
- [ ] Clicking the button toggles between soft wrapping and horizontal scrolling without breaking line numbers.
- [ ] The button visually indicates its active state (e.g., active highlight).
