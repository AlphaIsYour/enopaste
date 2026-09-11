# Issue 10: [REFACTOR/SECURITY] Replace custom regex syntax highlighter with Shiki

- **Difficulty:** Advanced
- **Labels:** `refactor`, `security`, `performance`, `help wanted`
- **Relevant Files:** `src/lib/highlighter.ts`, `src/components/PasteViewer.tsx`, `package.json`
- **Good First Issue:** No

## Problem
The current syntax highlighting in `src/lib/highlighter.ts` is implemented using custom regular expressions applied sequentially over HTML-escaped strings. This creates two major issues:
1. **HTML Corruption:** Regexes for keywords like `class` or strings can match attributes inside newly generated `<span class="...">` tags, producing corrupted HTML.
2. **ReDoS Risk:** Complex nested regular expressions matching strings and comments over large (up to 1MB) payloads can cause Regular Expression Denial of Service (browser freeze).

## Why
[Shiki](https://shiki.style/) is the modern standard for code highlighting, powered by VS Code's TextMate grammar engine. It is 100% accurate, safe from ReDoS, and supports virtually every programming language with VS Code themes.

## Current Behavior
Handcrafted regex patterns in `highlighter.ts` with minimal language grammar coverage.

## Expected Behavior
Accurate, robust syntax highlighting using Shiki with dark theme support (e.g. `github-dark` or `one-dark-pro`).

## Possible Approach
1. Install `shiki`: `npm install shiki`.
2. Create a memoized or server-side highlighter utility using `createHighlighter`.
3. In `PasteViewer`, render the resulting HTML generated safely by Shiki.

## Acceptance Criteria
- [ ] Custom regex logic in `highlighter.ts` is replaced with Shiki.
- [ ] No attribute corruption or ReDoS vulnerabilities on large code inputs.
- [ ] Syntax colors remain consistent with the dark theme aesthetic.
