# EnoPaste 📋⚡

A modern, developer-first pastebin and snippet sharing platform. Share code snippets, logs, and config files with syntax highlighting, expiry timers, password protection, and burn-after-read capabilities.

[![CI](https://github.com/AlphaIsYour/enopaste/actions/workflows/ci.yml/badge.svg)](https://github.com/AlphaIsYour/enopaste/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma 7](https://img.shields.io/badge/Prisma-7.8-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

---

## ✨ Features

- 🎨 **Syntax Highlighting** — Clean display for 40+ programming languages.
- ⏳ **Expiry Timers** — Auto-expire pastes after 10m, 1h, 1d, 1w, 1mo, or keep them indefinitely.
- 🔒 **Password Protection** — Secure sensitive pastes with bcrypt-hashed passwords.
- 🔥 **Burn After Read** — Self-destructing pastes deleted after being viewed.
- 👁️ **Privacy Controls** — Choose between `public`, `unlisted`, or `private` visibility.
- 📄 **Raw View & Download** — Instant plain-text endpoint (`/api/paste/:slug/raw`) and one-click file download.
- 📊 **Real-time Dashboard** — Browse recent public pastes, top-viewed snippets, and overall stats.
- 🌙 **Modern Developer UX** — Clean dark aesthetic built with Tailwind CSS v4 and Lucide icons.

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Next.js App Router                 │
│                                                         │
│  [ Pages & UI ]                     [ API Routes ]      │
│  • / (Create Paste Form)            • /api/paste        │
│  • /dashboard (Public Pastes)       • /api/paste/:slug  │
│  • /paste/:slug (Paste Viewer)      • /api/dashboard    │
│  • /paste/:slug/raw (Raw View)                          │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
               ▼                          ▼
     [ UI Components ]           [ Prisma Client ORM ]
     Tailwind v4 + Lucide         Adapter PG + Pool
                                          │
                                          ▼
                                 [ PostgreSQL Database ]
                                  Paste Schema & Indices
```

---

## 🚀 Quickstart (Local Development)

### Prerequisites
* [Node.js](https://nodejs.org/) v20.x or later
* [Docker](https://www.docker.com/) (recommended) or a local PostgreSQL instance

### 1. Clone the repository
```bash
git clone https://github.com/AlphaIsYour/enopaste.git
cd enopaste
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

### 4. Start the database

**Option A: Using Docker (Fastest)**
```bash
docker compose up -d
```

**Option B: Using Local PostgreSQL**
Ensure PostgreSQL is active and create the database:
```bash
createdb enopaste
```

### 5. Setup database schema & sample data
```bash
# Push schema to database
npm run db:push

# (Optional) Seed with sample pastes
npm run db:seed
```

### 6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

```prisma
model Paste {
  id            String    @id @default(cuid())
  slug          String    @unique
  title         String?
  content       String
  language      String    @default("text")
  visibility    String    @default("public") // public, private, unlisted
  password      String?
  burnAfterRead Boolean   @default(false)
  expiresAt     DateTime?
  views         Int       @default(0)
  lastViewedAt  DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@index([createdAt])
  @@index([views])
  @@index([expiresAt])
}
```

---

## 📝 API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/paste` | `POST` | Create a new paste |
| `/api/paste` | `GET` | Retrieve latest public pastes |
| `/api/paste/:slug` | `GET` | Fetch paste details (query: `?password=...`) |
| `/api/paste/:slug/raw` | `GET` | Get raw plain-text content |
| `/api/dashboard` | `GET` | Fetch analytics, top pastes, and recent pastes |

---

## 🗺️ Project Roadmap

We maintain a transparent roadmap so contributors know where EnoPaste is heading:

### ✅ Completed
- [x] Next.js 16 + React 19 + Tailwind CSS v4 foundation.
- [x] Paste creation with syntax tagging and expiry calculations.
- [x] Password hashing with bcryptjs.
- [x] Basic burn-after-read behavior.
- [x] Analytics dashboard with stats aggregation.

### 🔄 In Progress
- [ ] Onboarding docs & contribution ladder (`CONTRIBUTING.md`, PR & Issue Templates).
- [ ] Multi-branch CI verification (`master` & `main`).
- [ ] Instant Docker Compose local development.

### 📋 Planned (Near-Term)
- [ ] Setup Vitest automated test suite for utility functions and endpoints.
- [ ] Interstitial warning screen for burn-after-read links (prevents premature destruction by bots).
- [ ] Secure paste deletion via owner deletion token.
- [ ] Click-to-select line numbers with URL anchors (`#L10-L25`).
- [ ] Tab key indentation inside the paste editor.

### 🤝 Help Wanted (Great for Contributors!)
- [ ] Migrate syntax highlighter from custom regex to [Shiki](https://shiki.style/).
- [ ] Dashboard search bar and language filter.
- [ ] Terminal CLI / cURL posting support (`curl -F 'paste=<-' https://enopaste.dev/api/paste`).

### 💡 Future Explorations
- [ ] Client-side Zero-Knowledge End-to-End Encryption (AES-256-GCM via URL fragment `#secret`).
- [ ] Optional user accounts for viewing personal paste history.
- [ ] Multi-file paste support.

---

## 🤝 Contributing

We love contributions! Whether you're fixing a typo, improving documentation, or implementing a new feature, you are very welcome here.

Please check out our [Contributing Guide](CONTRIBUTING.md) to get started. We also maintain a list of beginner-friendly tasks under the [`good first issue`](https://github.com/AlphaIsYour/enopaste/labels/good%20first%20issue) label.

All participants are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 👥 Contributors

Thank you to everyone helping improve EnoPaste! Every contribution — code, review, bug report, or idea — matters.

<!-- Contributions are automatically credited via GitHub Insights -->
<a href="https://github.com/AlphaIsYour/enopaste/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AlphaIsYour/enopaste" alt="Contributors" />
</a>

---

## ☕ Support

EnoPaste is an open-source project maintained with care. If this tool saves you time or is helpful to your workflow, you can optionally support its ongoing development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-enoalph-yellow?style=flat-square&logo=buy-me-a-coffee)](https://buymeacoffee.com/enoalph)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
