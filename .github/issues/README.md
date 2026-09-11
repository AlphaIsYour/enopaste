# Curated Community Issues for EnoPaste

This directory contains pre-formulated, high-quality issues designed for new and existing open-source contributors across multiple skill tiers.

## 🎯 Issue Directory

### 🟢 Level 1 — Good First Issues (Beginner)
1. [`01_a11y_labels.md`](01_a11y_labels.md) — [A11Y] Add missing aria-labels and improve form accessibility
2. [`02_line_wrap_toggle.md`](02_line_wrap_toggle.md) — [UI/UX] Add line-wrap toggle (soft wrap vs horizontal scroll) in PasteViewer
3. [`03_docs_troubleshooting.md`](03_docs_troubleshooting.md) — [DOCS] Add Environment & Database Troubleshooting Guide
4. [`04_stats_word_count.md`](04_stats_word_count.md) — [FEAT] Add Word Count and Estimated Reading/Viewing Time Badge

### 🟡 Level 2 — Core Features & Fixes (Intermediate)
5. [`05_burn_after_read_interstitial.md`](05_burn_after_read_interstitial.md) — [BUG/SECURITY] Burn-after-read pastes are destroyed prematurely by link crawlers
6. [`06_secure_paste_deletion.md`](06_secure_paste_deletion.md) — [SECURITY] Protect DELETE /api/paste/:slug with an owner deletion token
7. [`07_clickable_line_numbers.md`](07_clickable_line_numbers.md) — [FEAT] Clickable line numbers and permalink line highlighting (#L12-L25)
8. [`08_setup_vitest_testing.md`](08_setup_vitest_testing.md) — [TESTING] Setup Vitest and add unit tests for utility functions
9. [`09_dashboard_search_and_filter.md`](09_dashboard_search_and_filter.md) — [FEAT] Add search bar and language filter to the public dashboard
10. [`12_terminal_curl_support.md`](12_terminal_curl_support.md) — [FEAT] CLI and cURL support for creating pastes directly from the terminal

### 🔴 Level 3 — Architecture & Security (Advanced)
11. [`10_migrate_shiki_highlighter.md`](10_migrate_shiki_highlighter.md) — [REFACTOR/SECURITY] Replace custom regex syntax highlighter with Shiki
12. [`11_automated_expired_cleanup.md`](11_automated_expired_cleanup.md) — [FEAT] Automated background cleanup cron for expired database records

---

## 🚀 How to Publish to GitHub

You can publish all issues at once using the PowerShell script:
```powershell
pwsh .github/issues/publish_issues.ps1
```
Or publish an individual issue:
```bash
gh issue create --title "[GOOD FIRST ISSUE] [A11Y] Add missing aria-labels" --body-file .github/issues/01_a11y_labels.md --label "good first issue,accessibility"
```
