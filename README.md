<div align="center">
  <img src="https://raw.githubusercontent.com/prasadaniket/napkiq/main/client/main/public/images/logo/logo-circle.png" alt="Napkiq Logo" width="120" style="border-radius: 50%; box-shadow: 0 4px 14px rgba(214, 66, 56, 0.4);" />
  <h1>Napkiq Platform</h1>
  <p><strong>Powered by UniCord Tech</strong></p>
  <p><em>Enterprise multi-outlet dining, digital vault security, and automated customer engagement engine.</em></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

<br />

Napkiq is an end-to-end, ultra-premium restaurant management, dining, customer engagement, digital legal vault, and order orchestration platform designed for high-end dining experiences. Built by **UniCord Tech**, it combines a buttery-smooth customer web app with a role-aware Content Management System (CMS) and an automated engagement engine.

---

## ✨ Key Features

### 🏪 Public Experience (`/client/main`)
- **Dynamic Geography:** Context-aware routing for distinct branches (Mumbai, Pune, Bangalore, Delhi).
- **Premium Aesthetics:** Dark-themed UI with `framer-motion` micro-interactions, luxury styling, glassmorphism, and radial gradients.
- **Diet Indicators:** High-fidelity SVG diet classification (Veg dot, Non-Veg triangle).
- **Interactive Cart & Menu:** Anchored category scrolling, diet filters, Zomato/Swiggy-style cart selector, and bottom drawer.
- **Table Board Number System:** QR interactions supporting both table-service and self-service counters.

### 📊 Management CMS & Security Portal (`/client/cms`)
- **Categorized Sidebar Navigation:** Grouped into clear section headers (`OVERVIEW & MANAGEMENT`, `RESTAURANT OPERATIONS`, `SECURITY & AUTOMATION`, `ACCOUNT & SYSTEM`).
- **Account & Staff Profile (`/profile`):** Real-time synced staff profile management, contact details (Email, Phone, Name), role badge assignment, assigned outlet info, and Supabase Auth credentials.
- **Restaurant Vault (`/vault`):** Zero-knowledge encrypted repository for legal licenses, FSSAI certificates, GST filings, and trade agreements.
  - **MeitY DigiLocker Integration:** Official OAuth2 consent flow (`/public/oauth2/1/authorize`) and live REST API document pull.
  - **Master Entry PIN Lock & OTP Recovery:** Isolated 4-digit PIN access protection with OTP verification.
- **Analytics Dashboards:** Visitor stats chart splitting traffic between QR Scans and Payment, and review sentiment metrics.
- **Customer CRM:** Comprehensive filterable directories tracking visit history, birthdays, anniversaries, and activity states.
- **Kitchen Display System (KDS):** Live line-item order tracking and preparation workflows.

### 🤖 Edge Automation Engine (`/worker`)
- **Cloudflare Workers:** Daily cron jobs triggering scheduled edge scripts (configured at `0 3 * * *` UTC).
- **Smart Triggers:** Automated templates (via Twilio WhatsApp and SendGrid/Resend Emails) for:
  - Birthdays (5-day prior and 1-day prior alerts)
  - Anniversaries (5-day prior and 1-day prior alerts)
  - Re-engagement (30-day inactivity checks)
  - Welcome & registrations
  - Promotional dispatches & Bounceback campaigns

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Next.js (App Router), Vanilla CSS (Custom Design Tokens), Framer Motion, Recharts, Zod, Lucide Icons |
| **Backend** | Node.js, Express.js, TypeScript, Supabase Auth (JWT), Cloudinary SDK, MeitY DigiLocker REST API |
| **Database** | PostgreSQL, Prisma ORM |
| **Edge & Cron** | Cloudflare Workers, Wrangler CLI |

---

## 📂 Repository Structure

```text
Napkiq/
├── client/                     # Frontend Next.js Workspace
│   ├── main/                   # Customer-facing web menu (Port 3000)
│   │   ├── src/app/[code]/     # Dynamic outlet routes (menu, review, feedback)
│   │   └── src/styles/         # Warm luxury layout & design tokens
│   ├── cms/                    # Internal management CMS portal (Port 3001)
│   │   ├── src/app/(cms)/      # Scoped pages (analytics, profile, vault, kds, etc.)
│   │   └── src/components/     # Categorized CMSSidebar layout & components
│   └── package.json            # Shared workspace configuration
├── server/                     # Backend REST API Service (Port 8080)
│   ├── src/routes/             # Domain Express routes (cms, vault, profile, automation)
│   ├── src/middleware/         # Supabase Auth and RBAC guards
│   ├── src/scripts/            # Database seed, setup, and helper scripts
│   └── prisma/                 # Schema definitions and migrations
├── worker/                     # Edge Automation Engine
│   ├── src/index.ts            # Cloudflare Worker script
│   └── wrangler.toml           # Wrangler edge deployment configuration
└── .planning/                  # GSD Codebase Documentation & Architecture
```

---

## 🛡️ Architecture & License

*Napkiq is powered by UniCord Tech.* All rights reserved.
