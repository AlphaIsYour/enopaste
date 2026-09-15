# Curated Community Issues for EnoPaste

This directory contains pre-formulated, high-quality issues designed for new and existing open-source contributors across multiple skill tiers.

## 🎯 Issue Directory

### 🟢 Level 1 — Good First Issues (Beginner)
1. [`01_a11y_labels.md`](01_a11y_labels.md) — [A11Y] Add missing aria-labels and improve form accessibility
2. [`02_line_wrap_toggle.md`](02_line_wrap_toggle.md) — [UI/UX] Add line-wrap toggle (soft wrap vs horizontal scroll) in PasteViewer
3. [`03_docs_troubleshooting.md`](03_docs_troubleshooting.md) — [DOCS] Add Environment & Database Troubleshooting Guide
4. [`04_stats_word_count.md`](04_stats_word_count.md) — [FEAT] Add Word Count and Estimated Reading/Viewing Time Badge
5. [`15_http_caching_etag_raw.md`](15_http_caching_etag_raw.md) — [PERF] Add ETag and Cache-Control headers to raw paste endpoint
6. [`17_healthcheck_metrics_endpoint.md`](17_healthcheck_metrics_endpoint.md) — [DEVOPS/PERF] Add database health check and system metrics endpoint (/api/health)

### 🟡 Level 2 — Core Features & Fixes (Intermediate)
7. [`05_burn_after_read_interstitial.md`](05_burn_after_read_interstitial.md) — [BUG/SECURITY] Burn-after-read pastes are destroyed prematurely by link crawlers
8. [`06_secure_paste_deletion.md`](06_secure_paste_deletion.md) — [SECURITY] Protect DELETE /api/paste/:slug with an owner deletion token
9. [`07_clickable_line_numbers.md`](07_clickable_line_numbers.md) — [FEAT] Clickable line numbers and permalink line highlighting (#L12-L25)
10. [`08_setup_vitest_testing.md`](08_setup_vitest_testing.md) — [TESTING] Setup Vitest and add unit tests for utility functions
11. [`09_dashboard_search_and_filter.md`](09_dashboard_search_and_filter.md) — [FEAT] Add search bar and language filter to the public dashboard
12. [`12_terminal_curl_support.md`](12_terminal_curl_support.md) — [FEAT] CLI and cURL support for creating pastes directly from the terminal
13. [`13_api_rate_limiting.md`](13_api_rate_limiting.md) — [PERF/SECURITY] Implement sliding window rate limiting on paste creation and authentication endpoints
14. [`14_cursor_pagination_dashboard.md`](14_cursor_pagination_dashboard.md) — [PERF] Implement cursor-based pagination and infinite scroll on public dashboard

### 🔴 Level 3 — Architecture & Security (Advanced)
15. [`10_migrate_shiki_highlighter.md`](10_migrate_shiki_highlighter.md) — [REFACTOR/SECURITY] Replace custom regex syntax highlighter with Shiki
16. [`11_automated_expired_cleanup.md`](11_automated_expired_cleanup.md) — [FEAT] Automated background cleanup cron for expired database records
17. [`16_virtualized_code_rendering.md`](16_virtualized_code_rendering.md) — [PERF/UX] Add DOM virtualization for large pastes in PasteViewer
18. [`18_client_side_aes_encryption.md`](18_client_side_aes_encryption.md) — [PERF/SECURITY] Add client-side zero-knowledge AES-GCM encryption for private pastes

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
