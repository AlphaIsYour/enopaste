# EnoPaste

A modern pastebin and snippet sharing platform built for developers. Share code with syntax highlighting, expiry timers, password protection, and burn-after-read functionality.

![EnoPaste](https://img.shields.io/badge/EnoPaste-v1.0.0-6366f1?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06b6d4?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-7.0-2d3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1?style=flat-square&logo=postgresql)

## ✨ Features

### Core Functionality
- **Syntax Highlighting** — Support for 40+ programming languages with beautiful code display
- **Expiry Timers** — Set pastes to auto-delete after 10 minutes, 1 hour, 1 day, 1 week, 1 month, or never
- **Password Protection** — Optional password to keep sensitive pastes secure
- **Burn After Read** — Self-destructing pastes that delete after first view
- **Privacy Controls** — Public, unlisted, or private visibility modes
- **Raw View** — Clean text view for copying and API consumption
- **Copy to Clipboard** — One-click copy for code content and raw URLs
- **Views Counter** — Track how many times a paste has been viewed

### Dashboard
- **Recent Pastes** — Latest public pastes with metadata
- **Top Viewed** — Most popular pastes ranked by views
- **Statistics** — Total pastes and views overview

### Developer Experience
- **Clean UI** — Minimal, dark-themed interface designed for developers
- **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **Fast Performance** — Server-side rendering with Next.js App Router
- **Type Safety** — Full TypeScript support throughout the codebase

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Prisma 7** | Type-safe ORM for PostgreSQL |
| **PostgreSQL 16** | Relational database |
| **Lucide React** | Beautiful icons |
| **bcryptjs** | Password hashing |

## 📦 Installation

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/enopaste.git
cd enopaste
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and configure your database connection:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/enopaste"
```

### 4. Set up the database
```bash
# Create the database (if it doesn't exist)
createdb enopaste

# Push the schema to the database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
enopaste/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── paste/     # Paste CRUD operations
│   │   │   └── dashboard/ # Dashboard data
│   │   ├── dashboard/     # Dashboard page
│   │   ├── paste/[id]/    # Paste view pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── CreatePasteForm.tsx
│   │   ├── PasteViewer.tsx
│   │   ├── PasswordPrompt.tsx
│   │   ├── PasteCard.tsx
│   │   ├── StatsCard.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/
│       ├── prisma.ts      # Prisma client
│       ├── utils.ts       # Utility functions
│       └── highlighter.ts # Syntax highlighting
├── .env.example           # Environment template
├── package.json           # Dependencies
└── README.md              # This file
```

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
}
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` — Your PostgreSQL connection string
4. Deploy!

### Docker

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `NEXT_PUBLIC_APP_URL` | Application URL | `http://localhost:3000` |

## 📝 API Reference

### Create Paste
```http
POST /api/paste
Content-Type: application/json

{
  "title": "My Paste",
  "content": "console.log('Hello, World!');",
  "language": "javascript",
  "visibility": "public",
  "password": "optional-password",
  "burnAfterRead": false,
  "expiresIn": 3600
}
```

### Get Paste
```http
GET /api/paste/:slug
GET /api/paste/:slug?password=your-password
```

### Get Raw Paste
```http
GET /api/paste/:slug/raw
```

### Dashboard Data
```http
GET /api/dashboard
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by popular pastebin services
- Built with modern web technologies
- Designed for developer productivity

---

**Built with ❤️ for developers**
