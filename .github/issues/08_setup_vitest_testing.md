# Issue 8: [TESTING] Setup Vitest and add unit tests for utility functions

- **Difficulty:** Intermediate
- **Labels:** `testing`, `developer-experience`, `help wanted`
- **Relevant Files:** `package.json`, `src/lib/utils.ts`, `vitest.config.ts`, `.github/workflows/ci.yml`
- **Good First Issue:** Yes

## Problem
EnoPaste currently has zero automated tests. There is no `npm test` script, no test runner installed, and no regression safety net for future contributors.

## Why
Automated testing is foundational for a sustainable open-source project. Without tests, maintainers must manually test every pull request, and contributors are unsure if their changes accidentally break existing logic.

## Current Behavior
No test framework is present in `package.json`.

## Expected Behavior
1. Vitest is configured for the project.
2. `npm test` runs all unit tests quickly.
3. Unit tests cover all functions in `src/lib/utils.ts`:
   - `formatDate` (relative date formatting: seconds, minutes, hours, days, calendar)
   - `formatViews` (K/M formatting)
   - `isExpired` (boundary conditions: null, past, future)
   - `generateSlug` (format, length, uniqueness)
4. A test step is added to `.github/workflows/ci.yml`.

## Possible Approach
1. Install `vitest`: `npm install -D vitest`.
2. Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json`.
3. Create `src/lib/__tests__/utils.test.ts` testing each utility function with edge cases.
4. Add `- run: npm run test` to the CI workflow.

## Acceptance Criteria
- [ ] `npm test` executes cleanly without errors.
- [ ] Comprehensive test cases for `formatDate`, `formatViews`, and `isExpired`.
- [ ] CI workflow runs and passes the test suite.
