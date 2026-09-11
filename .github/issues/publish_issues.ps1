# PowerShell script to publish all curated issues to GitHub
# Requires GitHub CLI (gh) logged in: gh auth login

Write-Host "🚀 Publishing curated issues to GitHub repository..." -ForegroundColor Cyan

$issues = @(
    @{
        Title = "[GOOD FIRST ISSUE] [A11Y] Add missing aria-labels and improve form accessibility"
        File = "01_a11y_labels.md"
        Labels = "good first issue,accessibility,ui/ux"
    },
    @{
        Title = "[GOOD FIRST ISSUE] [UI/UX] Add line-wrap toggle (soft wrap vs horizontal scroll) in PasteViewer"
        File = "02_line_wrap_toggle.md"
        Labels = "good first issue,enhancement,ui/ux"
    },
    @{
        Title = "[GOOD FIRST ISSUE] [DOCS] Add Environment & Database Troubleshooting Guide"
        File = "03_docs_troubleshooting.md"
        Labels = "good first issue,documentation,developer-experience"
    },
    @{
        Title = "[GOOD FIRST ISSUE] [FEAT] Add Word Count and Estimated Reading/Viewing Time Badge"
        File = "04_stats_word_count.md"
        Labels = "good first issue,enhancement,ui/ux"
    },
    @{
        Title = "[BUG/SECURITY] Burn-after-read pastes are destroyed prematurely by link crawlers"
        File = "05_burn_after_read_interstitial.md"
        Labels = "bug,security,help wanted"
    },
    @{
        Title = "[SECURITY] Protect DELETE /api/paste/:slug with an owner deletion token"
        File = "06_secure_paste_deletion.md"
        Labels = "security,backend,help wanted"
    },
    @{
        Title = "[FEAT] Clickable line numbers and permalink line highlighting (#L12-L25)"
        File = "07_clickable_line_numbers.md"
        Labels = "enhancement,ui/ux,help wanted"
    },
    @{
        Title = "[TESTING] Setup Vitest and add unit tests for utility functions"
        File = "08_setup_vitest_testing.md"
        Labels = "testing,developer-experience,good first issue"
    },
    @{
        Title = "[FEAT] Add search bar and language filter to the public dashboard"
        File = "09_dashboard_search_and_filter.md"
        Labels = "enhancement,ui/ux,help wanted"
    },
    @{
        Title = "[REFACTOR/SECURITY] Replace custom regex syntax highlighter with Shiki"
        File = "10_migrate_shiki_highlighter.md"
        Labels = "refactor,security,performance,help wanted"
    },
    @{
        Title = "[FEAT] Automated background cleanup cron for expired database records"
        File = "11_automated_expired_cleanup.md"
        Labels = "enhancement,backend,performance"
    },
    @{
        Title = "[FEAT] CLI and cURL support for creating pastes directly from the terminal"
        File = "12_terminal_curl_support.md"
        Labels = "enhancement,developer-experience,help wanted"
    }
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

foreach ($issue in $issues) {
    $filePath = Join-Path $scriptDir $issue.File
    if (Test-Path $filePath) {
        $body = Get-Content $filePath -Raw
        Write-Host "Creating: $($issue.Title)..." -ForegroundColor Yellow
        gh issue create --title $issue.Title --body-file $filePath --label $issue.Labels
    } else {
        Write-Warning "File not found: $filePath"
    }
}

Write-Host "✅ All issues successfully submitted!" -ForegroundColor Green
