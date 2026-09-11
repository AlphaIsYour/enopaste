# Issue 1: [GOOD FIRST ISSUE] [A11Y] Add missing aria-labels and improve form accessibility

- **Difficulty:** Beginner
- **Labels:** `good first issue`, `accessibility`, `ui/ux`
- **Relevant Files:** `src/components/CreatePasteForm.tsx`, `src/components/PasteViewer.tsx`, `src/components/PasswordPrompt.tsx`
- **Good First Issue:** Yes

## Problem
Several interactive buttons and inputs currently lack explicit `aria-label` or accessible names for screen readers. For example, the theme toggles, copy icons, visibility selector buttons, and password visibility toggles do not announce their state or purpose clearly to assistive technologies.

## Why
Ensuring accessibility (WCAG 2.1 AA compliance) makes EnoPaste usable by everyone, including developers using screen readers or keyboard navigation.

## Current Behavior
Buttons with only icons (like the copy button `<Copy className="h-4 w-4" />` and eye icon) have no text or `aria-label`, so screen readers only announce them as "button".

## Expected Behavior
All icon-only buttons have descriptive `aria-label`s (e.g. `aria-label="Copy code content"`, `aria-label="Toggle password visibility"`). Form inputs have associated `<label>` tags or `aria-labelledby`.

## Possible Approach
1. In `src/components/CreatePasteForm.tsx`, add `aria-label="Copy paste content"` to the copy button.
2. In `src/components/PasswordPrompt.tsx`, add `aria-label="Toggle password visibility"` to the eye button.
3. In `src/components/PasteViewer.tsx`, add `aria-label="Copy raw link"` and `aria-label="Download paste"` to action buttons.
4. Add `aria-live="polite"` to error alert containers so errors are announced when they appear.

## Acceptance Criteria
- [ ] All icon-only buttons across `CreatePasteForm`, `PasteViewer`, and `PasswordPrompt` have descriptive `aria-label` attributes.
- [ ] Error alert divs include `role="alert"` and `aria-live="polite"`.
- [ ] Lighthouse accessibility score increases or remains 100%.
