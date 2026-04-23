<div align="center">
  <img src="https://raw.githubusercontent.com/UniCord-Dev/StoneOven/main/client/main/public/images/logo/logo.jpg" alt="StoneOven Logo" width="120" style="border-radius: 50%; box-shadow: 0 4px 14px rgba(232, 140, 58, 0.4);" />
  <h1>StoneOven Platform</h1>
  <p><strong>A premium, multi-outlet dining and customer engagement platform.</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

<br />

StoneOven is an end-to-end restaurant management system designed for high-end dining experiences. It combines a buttery-smooth, interactive customer-facing web app with a robust, role-aware internal Content Management System (CMS) and an automated engagement engine.

---

## ✨ Key Features

### 🏪 Public Experience (`/client/main`)
- **Dynamic Geography:** Context-aware routing for distinct branches (Boisar, Palghar, Vasai, Virar).
- **Premium Aesthetics:** Dark-themed UI with `framer-motion` micro-interactions, glassmorphism, and radial gradients.
- **QR Interaction:** Deep-linked QR flows for quick visit tracking and feedback submission.
- **Menu Gallery:** Dynamic, categorized digital menus mapped directly from the CMS.

### 📊 Management CMS (`/client/cms`)
- **Role-Based Access Control (RBAC):** Hierarchical scoping (Admin > Owner > Franchise Owner) ensuring absolute data isolation between branches.
- **Performance Dashboards:** Granular and aggregate analytics for customer footfall, revenue splits (QR vs. Payment), and review sentiment.
- **Customer Directory:** Filterable CRMs tracking visit histories, activity statuses, and birthdays/anniversaries.
- **Media Management:** Direct Cloudinary integration for menu item image replacements.

### 🤖 Automation Engine (`/worker`)
- **Cloudflare Workers:** Daily chron jobs processing re-engagement logic.
- **Smart Triggers:** Automated WhatsApp and Email dispatches for birthdays, anniversaries, and 30-day inactivity periods.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js (App Router), Vanilla CSS (Custom Tokens), Framer Motion, Recharts, Zod |
| **Backend** | Node.js, Express.js, TypeScript, Supabase Auth (JWT), Cloudinary API |
| **Database** | PostgreSQL, Prisma ORM |
| **Infrastructure** | Cloudflare Workers (Cron), Supabase (Hosting) |

---

## 📂 Repository Structure

The project is structured as a decoupled monorepo:

```text
StoneOven/
├── client/                 # Frontend Monorepo
│   ├── main/               # Customer-facing Next.js application
│   ├── cms/                # Internal management Next.js portal
│   └── package.json        # Shared workspace configs
├── server/                 # Backend Service
│   ├── src/routes/         # Domain-driven Express routes (cms, automation, etc.)
│   ├── src/middleware/     # Auth and RBAC guards
│   └── prisma/             # Schema definitions and migrations
├── worker/                 # Edge Automation Engine
│   ├── src/index.ts        # Cloudflare Worker script
│   └── wrangler.toml       # Edge deployment configuration
└── .planning/              # GSD Codebase Documentation & Architecture
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (or a Supabase project)
- [Cloudinary](https://cloudinary.com/) Account (for image uploads)

### 1. Environment Setup
Create a `.env` file in the `/server` directory based on the `.env.example`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/stoneoven"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_KEY="your-service-key"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```
Ensure the frontends also have their required `NEXT_PUBLIC_API_URL` pointing to `http://localhost:8080/api`.

### 2. Backend Initialization
```bash
cd server
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Frontend Initialization
Boot both Next.js applications concurrently:
```bash
cd client
npm install
npm run dev
```
- **Public Site**: `http://localhost:3000`
- **CMS Portal**: `http://localhost:3001`

---

## 🛡️ Architecture & Conventions

For a deep dive into the system design, RBAC implementations, and coding standards, please review the internal technical documentation located at `.planning/codebase/`.

- [ARCHITECTURE.md](./.planning/codebase/ARCHITECTURE.md)
- [CONVENTIONS.md](./.planning/codebase/CONVENTIONS.md)

---
*Developed by UniCord.*
