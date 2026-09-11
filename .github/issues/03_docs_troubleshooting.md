# Issue 3: [GOOD FIRST ISSUE] [DOCS] Add Environment & Database Troubleshooting Guide

- **Difficulty:** Beginner
- **Labels:** `good first issue`, `documentation`, `developer-experience`
- **Relevant Files:** `CONTRIBUTING.md`, `README.md`
- **Good First Issue:** Yes

## Problem
New contributors working on different environments (Windows native vs WSL2 vs macOS vs Linux) often face subtle setup friction, such as:
1. PostgreSQL port 5432 already being taken by a host Postgres service when starting Docker Compose.
2. Prisma client generation needing to be re-run after pulling schema changes.
3. Windows PowerShell execution policy blocking scripts.

## Why
Clear troubleshooting steps prevent new contributors from getting discouraged before they even start writing code.

## Current Behavior
Setup instructions cover the happy path only. If `docker compose up` fails with "port 5432 already allocated", there is no FAQ or troubleshooting tip.

## Expected Behavior
A dedicated "Troubleshooting & FAQ" section in `CONTRIBUTING.md` that guides contributors through common setup hiccups.

## Possible Approach
Add a section `## ❓ Troubleshooting & FAQs` in `CONTRIBUTING.md` covering:
- Port 5432 conflict: changing host port to `5433:5432` in `docker-compose.yml` and updating `DATABASE_URL`.
- Prisma client out of sync: running `npm run db:generate`.
- Permission errors on Docker on Linux: running without rootless docker setup.

## Acceptance Criteria
- [ ] A clean, well-formatted Troubleshooting section is added to `CONTRIBUTING.md`.
- [ ] At least 3 common real-world developer setup issues are addressed with clear terminal commands.
