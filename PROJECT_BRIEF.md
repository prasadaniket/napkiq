# Napkiq Platform Project Brief & Technical Documentation

**Napkiq** is an end-to-end, ultra-premium, multi-outlet restaurant management, dining, customer engagement, and order orchestration platform developed by **UniCord**. 

It is designed to solve the complete hospitality lifecycle: offering a beautiful customer-facing web menu interface, an automated re-engagement engine, and a robust, role-aware internal Content Management System (CMS) with advanced data analytics.

---

## 🛠️ Complete Technology Stack

Napkiq is architected as a highly performant, decoupled monorepo leveraging a modern, type-safe stack:

### 1. Client Applications (Next.js Monorepo)
* **Framework**: React 19, Next.js (App Router)
* **Styling (CSS)**: Vanilla CSS with custom theme variables, custom design tokens, and glassmorphism.
* **Component Library**: Primitive Shadcn UI wrappers (Tailwind-compatible in specific main modules).
* **Animations**: Framer Motion (leveraging custom springs, ease curves, exit animations, and touch gestures).
* **State Management**: Local React State with instant parent-child synchronization.
* **Form & Validation**: React Hook Form, Zod schema resolvers.
* **Feedback Systems**: React Hot Toast (tactile triggers, dark premium themes, and error boundaries).
* **Data Visualization**: Recharts (responsive vector charts tracking visitor breakdowns and reviews).

### 2. Backend Service (Express Server)
* **Runtime**: Node.js
* **Framework**: Express.js with TypeScript (`tsx` compilation)
* **Database Client**: Prisma ORM (Prisma Schema, migrations, and seed helpers)
* **File Uploads**: Multer (buffer memory storage client)
* **Cloud Storage**: Cloudinary SDK (image transformation streams and garbage collection)
* **Authentication**: Supabase Auth integration, JWT verification middlewares.

### 3. Edge Worker (Automation Engine)
* **Platform**: Cloudflare Workers
* **Triggers**: Cloudflare Cron Triggers (Scheduled Edge triggers)
* **Services**: Dispatches WhatsApp (via Twilio/Cloud APIs) and Email (via SendGrid/Resend) templates.

### 4. Database & Infrastructure
* **Database**: PostgreSQL (hosted on Supabase)
* **Caching/CDN**: Cloudflare Edge CDN

---

## 📂 Codebase & Folder Architecture

```text
Napkiq/
├── client/                     # Frontend Workspace
│   ├── cms/                    # Next.js CMS Portal (Port 3001)
│   │   ├── public/logo/        # Brand assets (logo-circle.png)
│   │   ├── src/app/            # App Router pages (automation, menu, visits, dashboard)
│   │   ├── src/components/     # Layout shells (CMSSidebar), Login components
│   │   └── src/styles/         # globals.css (Design tokens, Custom variables)
│   ├── main/                   # Next.js Customer Web Menu (Port 3000)
│   │   ├── src/app/[code]/     # Dynamic geography/outlet code routes
│   │   └── src/components/     # Food item cards, search, and cart systems
│   └── package.json            # Shared workspace configuration
├── server/                     # Backend REST API Service (Port 8080)
│   ├── src/routes/             # Domain-driven routers (menu, visits, auth, exports)
│   ├── src/middleware/         # Authentication & RBAC guards
│   ├── prisma/                 # PostgreSQL Prisma Schema & Migrations
│   └── package.json            # Server package configurations
├── worker/                     # Edge Re-engagement Cron Worker
│   ├── src/index.ts            # Cron scheduler worker script
│   └── wrangler.toml           # wrangler wrangler.toml configurations
└── .planning/                  # Project Manifests & Technical Guidelines
```

---

## 💾 Database Schema Model (Prisma ORM)

```prisma
model Outlet {
  id            String          @id @default(uuid())
  name          String
  code          String          @unique // e.g., "boisar", "virar", "palghar", "vasai"
  slug          String
  address       String?
  googleMapsUrl String?
  isActive      Boolean         @default(true)
  categories    MenuCategory[]
  visits        Visit[]
  reviews       Review[]
}

model MenuCategory {
  id            String          @id @default(uuid())
  name          String
  displayOrder  Int?            @default(0)
  isActive      Boolean         @default(true)
  outletId      String?
  outlet        Outlet?         @relation(fields: [outletId], references: [id])
  items         MenuItem[]
}

model MenuItem {
  id            String          @id @default(uuid())
  categoryId    String
  category      MenuCategory    @relation(fields: [categoryId], references: [id])
  name          String
  description   String?
  price         Decimal?        // Standard price
  priceVariants Json?           // Multi-variant support: { "veg": 139, "nonVeg": 179 }
  isVeg         Boolean         @default(true)
  isAvailable   Boolean         @default(true)
  imageUrl      String?
  displayOrder  Int?            @default(0)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
}

model Customer {
  id            String          @id @default(uuid())
  fullName      String
  phone         String          @unique
  email         String?
  birthDate     DateTime?
  anniversaryDate DateTime?
  totalVisits   Int             @default(0)
  lastVisitDate DateTime?
  createdAt     DateTime        @default(now())
  visits        Visit[]
  reviews       Review[]
}

model Visit {
  id            String          @id @default(uuid())
  visitType     VisitType       // 'qr_scan' | 'payment'
  visitedAt     DateTime        @default(now())
  customerId    String?
  customer      Customer?       @relation(fields: [customerId], references: [id])
  outletId      String
  outlet        Outlet          @relation(fields: [outletId], references: [id])
  converted     Boolean         @default(false)
  isRepeat      Boolean         @default(false)
}

enum VisitType {
  qr_scan
  payment
}
```

---

## 💎 Customer Web Portal Features (`/client/main`)

Designed with inspiration from top-tier food delivery giants but heavily optimized for direct, local table-side transactions:

1. **Brand Identity & Warm Luxury Theme**:
   * Base background styled in a gorgeous warm luxury alabaster background (`#faf9f6`).
   * Subtle ambient `radial-gradient` glow orbs (brand red and gold) slowly drift in the background using CSS keys, creating a premium dine-in mood.
   * Top branding card features a centered, wiggling circular brand logo and polished typography.
2. **Indian FSSAI Food Badges**:
   * Uses high-fidelity custom SVG indicators for Diet Types instead of simple text:
     * **Green Veg Badge**: Solid green circle dot enclosed in a green square outline border.
     * **Red Non-Veg Badge**: Solid red triangle enclosed in a red square outline border.
3. **Advanced Food Item Cards**:
   * Arranged in a beautiful grid of cards housing descriptions, variant selections, FSSAI badges, and dedicated rounded food photo frames.
   * If a dish doesn't have an image, it dynamically displays a clean, minimal dashed camera icon fallback.
4. **Scrolling Category Scrollbar**:
   * An anchored, scrollable horizontal navigation bar sticks to the top of the screen as users scroll.
   * Clicking a category smooth-scrolls the page directly to that section's header using an anchored JS scroll trigger offset by a `scroll-mt-24` margin.
5. **Segmented Diet Filter**:
   * Segmented selector pills (All, Veg, Non-Veg) at the top of the header dynamically sort, filter, and collapse empty categories locally with zero loading lag.
6. **Zomato/Swiggy-Style Cart System**:
   * **Interactive ADD button overlay**: Placed overlapping the bottom of the photo. Tapping `Add +` dynamically turns the button into a premium white-and-emerald selector **`[- quantity +]`** with spring animations.
   * **Floating Cart Status Bar**: Slides up from the bottom when total items > 0. Displays quantities and grand total prices (e.g. `2 Items | ₹298`) with a call-to-action button.
   * **Bottom Sheet Drawer**: Clicking the bar pulls up a gorgeous bottom sheet drawer summarizing their order. It features live quantity selectors inside the drawer, clear-cart buttons, grand totals, and promotional banners.
7. **White-Labeled Table Board Number System**:
   * Integrated segmented controls for **Table Service `🛎️`** and **Self Service `🥡`**.
   * Selecting Table Service triggers a smooth slide-down animation revealing the **Table Board System** card: prompts the customer to input the number of their physical board from the counter.
   * Enforces checkout validation (demanding a Board Number to proceed) and dispatches highly detailed custom toast confirmations reflecting their dining selections.

---

## 📊 Internal CMS Portal Features (`/client/cms`)

A role-aware management gateway built to track restaurant logistics and campaign builders:

1. **Dynamic Light Theme Login Portal**:
   * Centered brand logo ring wiggles and scales playfully on hover.
   * Card slides and scales into place using custom elastic cubic-bezier easing.
   * Dynamic welcomes load depending on local hours (e.g., "Good morning", "Good afternoon", "Good evening").
   * Interactive input borders glow and highlight label text in primary red on focus.
   * Tapping invalid fields triggers an instant **tactile shake animation (`shake`)** powered by CSS keyframes.
2. **Role-Based Access Control (RBAC)**:
   * **Admin (UniCord)**: Complete global view of all branch outlets, configurations, and raw data tables (CSV exporter tools).
   * **Owner**: Comprehensive dashboards for their assigned restaurant outlet chains.
   * **Franchise Owner**: View boundaries locked tightly to their local store.
3. **Visit Summary Analytics**:
   * Interactive visitor stats chart splits active visitors between **QR Scans** and **Payments**.
   * Swapped the active Payment breakdown row with an elegant **"Soon" teaser badge** (dimmed to `65%` opacity with a help question tooltip and locked "Payment (Soon)" select filters) to represent upcoming table integrations.
4. **Dynamic Menu Builder**:
   * Accordion-style Category Cards support inline title editing, item count bubbles, and delete safety gates.
   * Adds food cards showing photo frames, diet tags, name/description inline edit triggers, iOS toggles, and price chips.
   * Segmented filters (All, Veg, Non-Veg) filter items on-the-fly and collapse empty category sections.
5. **Drag-and-Drop Cloudinary Uploader**:
   * Empty cards render a dashed photo frame camera indicator (`Add Photo`).
   * Clicking it launches local device file selectors.
   * Features a loading spinner overlay while uploads are in progress.
   * Hovering existing photos displays an overlay with **Replace** (chooses new file, purges old image) and **Remove** (deletes from Cloudinary, resets to placeholder) actions.
6. **Lively Campaigns & Automation templates**:
   * Redesigned visual templates allowing admins to easily view, configure, and re-arrange automatic WhatsApp and email campaign parameters.

---

## 🚀 Running the Project Locally

### 1. Backend Server Setup (`/server`)
1. Create a `.env` file in `/server`:
   ```env
   DATABASE_URL="postgresql://supabase-postgres-url:5432/postgres"
   SUPABASE_URL="https://your-supabase-project.supabase.co"
   SUPABASE_SERVICE_KEY="service-role-key"
   CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"
   ```
2. Open terminal in `/server` and execute:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

### 2. Frontend Applications Setup (`/client`)
1. Create a `.env` in `/client/main` and `/client/cms` containing:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8080/api"
   ```
2. Open terminal in `/client` and execute workspace scripts:
   ```bash
   npm install
   npm run dev
   ```
   * **Customer Facing Website**: `http://localhost:3000`
   * **Internal CMS Portal**: `http://localhost:3001`
