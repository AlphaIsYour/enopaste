# Contributing to EnoPaste

First off, thank you for considering contributing to **EnoPaste**! 🎉

We want to make contributing to this project as easy, transparent, and rewarding as possible. Whether you are fixing a typo in documentation, reporting a bug, improving UI accessibility, or building a brand new feature, your help is warmly welcomed.

---

## 🧭 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Local Development Setup](#local-development-setup)
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
