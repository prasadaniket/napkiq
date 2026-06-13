<div align="center">
  <img src="https://raw.githubusercontent.com/UniCord-Dev/Napkiq/main/client/main/public/images/logo/logo.jpg" alt="Napkiq Logo" width="120" style="border-radius: 50%; box-shadow: 0 4px 14px rgba(232, 140, 58, 0.4);" />
  <h1>Napkiq Platform</h1>
  <p><strong>A premium, multi-outlet dining and customer engagement platform.</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

<br />

Napkiq is an end-to-end, ultra-premium restaurant management, dining, customer engagement, and order orchestration platform designed for high-end dining experiences. It combines a buttery-smooth, interactive customer-facing web app with a robust, role-aware internal Content Management System (CMS) and an automated engagement engine.

---

## ✨ Key Features

### 🏪 Public Experience (`/client/main`)
- **Dynamic Geography:** Context-aware routing for distinct branches (Boisar, Palghar, Vasai, Virar).
- **Premium Aesthetics:** Dark-themed UI with `framer-motion` micro-interactions, warm luxury themes, glassmorphism, and radial gradients.
- **Diet Indicators:** High-fidelity custom SVG diet types (FSSAI green circle dot for Veg, red triangle for Non-Veg).
- **Interactive Cart & Menu:** Anchored scrolling categories, local diets filtering, Zomato/Swiggy-style cart selector with spring animations, and bottom sheet drawer.
- **Table Board Number System:** QR interactions supporting both table-service (requiring table board number) and self-service.

### 📊 Management CMS (`/client/cms`)
- **Role-Based Access Control (RBAC):** Scoped access levels (Admin > Owner > Franchise Owner) securing data separation.
- **Analytics Dashboards:** Visitor stats chart splitting traffic between QR Scans and Payment, and review sentiment metrics.
- **Customer CRM:** Comprehensive filterable directories tracking visit history, birthdays, anniversaries, and activity states.
- **📅 Birthday & Anniversary Tracking:** Dedicated pages (`/birthdays` and `/anniversaries`) listing customers celebrating in the current calendar month alongside their automated messaging stages.
- **Media Management:** Direct Cloudinary integration with drag-and-drop file uploaders and preview replacements.
- **Campaign & Template Builder:** Admin panels to view, configure, and update automated templates.

### 🤖 Edge Automation Engine (`/worker`)
- **Cloudflare Workers:** Daily cron jobs triggering scheduled edge scripts (configured at `0 3 * * *` UTC).
- **Smart Triggers:** Automated templates (via Twilio WhatsApp and SendGrid/Resend Emails) for:
  - Birthdays (5-day prior and 1-day prior alerts)
  - Anniversaries (5-day prior and 1-day prior alerts)
  - Re-engagement (30-day inactivity checks)
  - Welcome & registrations
  - Promotional dispatches
  - **Bounceback campaigns** (custom WhatsApp/Email bounceback triggers)

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js (App Router), Vanilla CSS (Custom Design Tokens), Framer Motion, Recharts, Zod |
| **Backend** | Node.js, Express.js, TypeScript, Supabase Auth (JWT), Cloudinary SDK |
| **Database** | PostgreSQL, Prisma ORM |
| **Edge & Cron** | Cloudflare Workers, Wrangler CLI |

---

## 📂 Repository Structure

The project is structured as a decoupled monorepo:

```text
Napkiq/
├── client/                     # Frontend Next.js Workspace
│   ├── main/                   # Customer-facing web menu (Port 3000)
│   │   ├── src/app/[code]/     # Dynamic outlet routes (menu, review, feedback)
│   │   └── src/styles/         # Warm luxury layout & design tokens
│   ├── cms/                    # Internal management CMS portal (Port 3001)
│   │   ├── src/app/(cms)/      # Scoped pages (dashboard, birthdays, anniversaries, etc.)
│   │   └── src/components/     # Shared layout (CMSSidebar, ReviewCard)
│   └── package.json            # Shared workspace configuration
├── server/                     # Backend REST API Service (Port 8080)
│   ├── src/routes/             # Domain Express routes (cms, reviews, automation)
│   ├── src/middleware/         # Supabase Auth and RBAC guards
│   ├── src/scripts/            # Database seed, setup, and helper scripts
│   └── prisma/                 # Schema definitions and migrations
├── worker/                     # Edge Automation Engine
│   ├── src/index.ts            # Cloudflare Worker script
│   └── wrangler.toml           # Wrangler edge deployment configuration
└── .planning/                  # GSD Codebase Documentation & Architecture
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (or Supabase project)
- [Cloudinary](https://cloudinary.com/) Account (for image uploads)

### 1. Environment Setup

#### Backend (`/server/.env`)
Create a `.env` file in the `/server` directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/napkiq"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_KEY="your-service-key"
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
```

#### Frontend Client (`/client/main/.env` & `/client/cms/.env`)
Create a `.env` in both folders containing:
```env
NEXT_PUBLIC_API_URL="http://localhost:8080/api"
```

#### Automation Worker (`/worker/.env`)
Configure local variables or set secrets on wrangler:
```env
SERVER_URL="http://localhost:8080"
```

---

### 2. Backend Initialization & Utility Scripts
Open a terminal in the `/server` directory:
```bash
# Install dependencies
npm install

# Push database schema & generate Prisma Client
npx prisma generate
npx prisma db push

# (Optional) Run utility setup scripts
npx tsx src/scripts/setup_staff.ts          # Authenticate and map Supabase staff roles
npx tsx src/scripts/propagate_menu.ts       # Clone Boisar base menu to other branches with price deltas
npx tsx src/scripts/inspect_outlets.ts      # View list of current database outlets
npx tsx src/scripts/test_bounceback_direct.ts # Test run WhatsApp template dispatches manually

# Boot Express Server
npm run dev
```

---

### 3. Frontend Initialization
Boot both Next.js applications concurrently by running inside `/client`:
```bash
# Install packages
npm install

# Start Next.js apps
npm run dev
```
- **Customer Facing Menu**: `http://localhost:3000`
- **Internal CMS Portal**: `http://localhost:3001`

---

### 4. Running the Worker Locally
You can test the Cloudflare worker locally using wrangler:
```bash
cd worker
npm install
npm run dev
```

---

## 🗄️ Database Schema Summary
Napkiq uses PostgreSQL managed through Prisma. The core schema comprises:
- **`Outlet`**: Repositories representing dining locations (Boisar, Palghar, Virar, Vasai).
- **`Customer`**: Unique users indexed by device ID/phone, tracking contact details, birthdays, anniversaries, and visit frequency.
- **`CustomerVisit`**: Detailed logs capturing visit times and types (`qr_scan` or `payment`).
- **`Review`**: Feedback containing stars, text, sentiment tags, and visibility statuses.
- **`MenuCategory` & `MenuItem`**: Hierarchical dishes with pricing, custom variant JSON support, and Diet classifications.
- **`Staff`**: User profiles mapped to Supabase JWT roles (`admin`, `owner`, `franchise_owner`).
- **`AutomationLog`**: Activity tracking for automated WhatsApp/Email templates.

---

## 🛡️ Architecture & Conventions

For a deep dive into the system design, RBAC implementations, and coding standards, please review the internal technical documentation located at `.planning/codebase/`.

- [ARCHITECTURE.md](./.planning/codebase/ARCHITECTURE.md)
- [CONVENTIONS.md](./.planning/codebase/CONVENTIONS.md)

---
*Developed by UniCord.*
