# Contributing to EnoPaste

First off, thank you for considering contributing to **EnoPaste**! 🎉

We want to make contributing to this project as easy, transparent, and rewarding as possible. Whether you are fixing a typo in documentation, reporting a bug, improving UI accessibility, or building a brand new feature, your help is warmly welcomed.

---

## 🧭 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Local Development Setup](#local-development-setup)
- [Troubleshooting & FAQs](#troubleshooting--faqs)
- [Development Workflow](#development-workflow)
- [Coding Conventions](#coding-conventions)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Need Help?](#need-help)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior following the guidelines in the document.

---

## How Can I Contribute?

### 1. The Contributor Ladder

You don't need to be an expert in the entire codebase to make meaningful contributions. We maintain tasks suited for every stage of your journey:

* 🟢 **Level 1 — Good First Issues (Beginner):**
  * Perfect for your first pull request!
  * Examples: fixing documentation, improving accessibility attributes, adding keyboard shortcuts, tweaking CSS, or handling UI edge cases.
  * Look for issues labeled [`good first issue`](https://github.com/AlphaIsYour/enopaste/labels/good%20first%20issue).

* 🟡 **Level 2 — Core Features & Fixes (Intermediate):**
  * Requires familiarity with Next.js App Router and Prisma.
  * Examples: writing unit tests, improving paste deletion security, line-number click-to-highlight, or enhancing dashboard search.
  * Look for issues labeled [`help wanted`](https://github.com/AlphaIsYour/enopaste/labels/help%20wanted).

* 🔴 **Level 3 — Architecture & Integrations (Advanced):**
  * Involves deeper architectural changes or external libraries.
  * Examples: migrating syntax highlighting to Shiki, client-side zero-knowledge encryption, or automated background cleanup cron jobs.

### 2. Reporting Bugs

Before creating a bug report, please check existing [GitHub Issues](https://github.com/AlphaIsYour/enopaste/issues) to avoid duplicates. When submitting a report, use the **Bug Report** template and include:
* Clear, descriptive title
* Steps to reproduce
* Expected vs. actual behavior
* Screenshots or error logs if applicable

### 3. Suggesting Enhancements

Have an idea to make EnoPaste better? Open a **Feature Request** issue! Clearly explain:
* The problem or missing capability
* Your proposed solution
* Any alternative ideas you considered

---

## Local Development Setup

### Prerequisites
* **Node.js**: v20.x or later
* **Package Manager**: `npm` (v10+)
* **Database**: PostgreSQL (v14+) or Docker

### Step 1: Fork & Clone
```bash
# Clone your fork
git clone https://github.com/<your-username>/enopaste.git
cd enopaste
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Default `.env` content:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/enopaste?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Start the Database

**Option A: Using Docker (Recommended for quick start)**
```bash
docker compose up -d
```
This will start a PostgreSQL instance with the credentials matching `.env`.

**Option B: Using Local PostgreSQL**
Ensure PostgreSQL is running locally, then create the database:
```bash
createdb enopaste
```

### Step 5: Push Database Schema & Seed
```bash
# Push schema to the database
npm run db:push

# (Optional) Seed with sample pastes for testing
npm run db:seed
```

### Step 6: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Troubleshooting & FAQs

### PostgreSQL port 5432 is already allocated

Keep an existing database running and give this project's container a different **host** port. In `docker-compose.yml`, change only the `ports` mapping:

```yaml
ports:
  - "5433:5432"
```

Update `.env` to use the same host port:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5433/enopaste?schema=public"
```

Then recreate this project's database container and check readiness:

```bash
docker compose up -d postgres
docker compose exec postgres pg_isready -U postgres -d enopaste
npm run db:push
```

The container still listens on 5432; only connections from the host use 5433. Restart the development server after changing `.env`. Do not run `docker compose down -v` to fix a port conflict: it removes the database volume.

### Prisma Client is out of sync after pulling changes

Regenerate the client after a schema change or when an import reports a missing Prisma model:

```bash
npm run db:generate
npx tsc --noEmit
```

Client generation does not update your database. For your local development database, apply the schema separately after reviewing the changes:

```bash
npm run db:push
```

If generation reports missing dependencies, run `npm install` first. If `db:push` cannot connect, check that `.env` exists, `DATABASE_URL` matches your database credentials/host port, and PostgreSQL is ready. Use a local development database, not a production connection, for this setup flow.

### PowerShell says npm.ps1 cannot be loaded

Use the Windows command shim from PowerShell; changing the machine's execution policy is not required:

```powershell
npm.cmd install
npm.cmd run db:generate
npm.cmd run dev
```

Use `npx.cmd tsc --noEmit` for the TypeScript check. Alternatively, run the documented npm commands in Command Prompt. When working in WSL2, use Node and npm installed inside that WSL distribution rather than mixing Windows and Linux `node_modules`.

### Docker is unavailable or reports permission denied on Linux

Check which daemon/context the CLI is targeting:

```bash
docker context show
docker info
```

Start Docker Desktop if that is your installation. For rootless Docker, start the user service and select its context if those were created during setup:

```bash
systemctl --user start docker
docker context use rootless
docker info
```

If the rootless service/context does not exist, complete the [official rootless setup](https://docs.docker.com/engine/security/rootless/) first, or use the local PostgreSQL option above. Do not make the Docker socket world-writable to work around permissions.

---

## Development Workflow

1. **Create a branch:**
   Always create a descriptive branch for your work:
   ```bash
   git checkout -b feat/add-tab-indentation
   # or
   git checkout -b fix/burn-after-read-preview
   ```

2. **Run verification scripts locally before committing:**
   ```bash
   # Check code formatting & linting
   npm run lint

   # Run utility regression tests (no database required)
   npm test

   # Check TypeScript compilation
   npx tsc --noEmit

   # Verify production build
   npm run build
   ```

3. **Commit your changes:**
   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   * `feat: add tab key indentation in editor`
   * `fix: prevent premature paste deletion from crawler requests`
   * `docs: update local docker setup instructions`
   * `refactor: clean up highlighter utility functions`
   * `test: add unit tests for date formatting`

---

## Coding Conventions

* **Framework:** Next.js 16 (App Router) + React 19.
* **Styling:** Tailwind CSS v4 using semantic CSS variables defined in `src/app/globals.css`.
* **Icons:** Use icons from `lucide-react`.
* **Database:** Prisma ORM. Do not execute raw SQL queries unless strictly necessary.
* **Typing:** Write strict TypeScript types. Avoid using `any`.
* **Components:** Keep components focused and placed in `src/components/`. Use kebab-case for files or PascalCase for React component files.

---

## Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `master` branch of the upstream repository.
3. Fill out the provided **Pull Request Template**:
   * Reference any related issues (`Closes #12`).
   * Provide a concise description of what was changed and why.
   * Include before/after screenshots for any UI changes.
4. Ensure CI checks pass on GitHub. If a check fails, inspect the log and make adjustments.
5. The maintainer will review your PR, offer constructive feedback, and merge once approved!

---

## Need Help?

Stuck or have a question?
* Open a discussion or question issue.
* Comment directly on the relevant issue you are working on.
* Feel free to ask questions even if you're not sure your solution is 100% complete — open-source is a collaborative learning journey!
