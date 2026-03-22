# VeriTask Codebase Analysis

## Project Overview

**Project Name:** VeriTask  
**Type:** Worker Marketplace / Job Board Template (originally based on Freeio)  
**Framework:** Next.js 16.2.0 with React 19.2.4  
**Package Manager:** Yarn

---

## Technology Stack

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.0 | React framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM rendering |
| zustand | 5.0.5 | State management |
| bootstrap | 5.3.6 | CSS framework |
| sass | 1.89.0 | SCSS compilation |

### Styling
| Package | Purpose |
|---------|---------|
| tailwindcss | Utility-first CSS framework |
| @tailwindcss/postcss | PostCSS plugin for Tailwind |
| postcss | 8.4.31 (pinned) | CSS transformation |
| autoprefixer | Vendor prefix automation |

### UI/UX Libraries
| Package | Purpose |
|---------|---------|
| swiper | Carousel/slider components |
| react-pro-sidebar | Dashboard sidebar navigation |
| react-stickynode | Sticky positioning |
| react-tooltip | Tooltip components |
| rc-slider | Range sliders |
| chart.js + react-chartjs-2 | Data visualization |
| react-countup | Animated counters |
| fslightbox-react | Lightbox gallery |
| wowjs | Scroll animations |
| @react-google-maps/api | Google Maps integration |

### Path Alias Configuration
```json
// jsconfig.json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```
All imports use `@/` prefix for src directory.

---

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components (shared/layout)
├── data/          # Static data (mock data)
├── hook/          # Custom React hooks
├── models/        # Database schema (Prisma models)
├── store/         # Zustand state stores
└── utils/         # Utility functions
```

---

## Directory Architecture

### 1. App Router Structure (`src/app/`)

**Route Groups ( parentheses notation):**
| Route Group | Purpose |
|-------------|---------|
| `(home)` | 20 homepage variants |
| `(job)` | Job listing & single pages |
| `(service)` | Service marketplace pages |
| `(project)` | Project listing pages |
| `(shop)` | E-commerce functionality |
| `(dashboard)` | User dashboard pages |
| `(auth)` | Login/Register pages |
| `(blog)` | Blog pages |
| `(freelancer)` | Freelancer profiles |
| `(employee)` | Employee pages |

**Top-level Routes:**
- `/about` - About page
- `/contact` - Contact page
- `/faq` - FAQ page
- `/help` - Help center
- `/pricing` - Pricing page
- `/terms` - Terms & conditions
- `/seller` - Seller page
- `/submit-proposal` - Submit proposal
- `/invoices` - Invoice listing
- `/become-seller` - Registration
- `/ui-elements` - UI component showcase

### 2. Components Structure (`src/components/`)

| Directory | Count | Description |
|-----------|-------|-------------|
| header/ | 31 | Header variants (Header1-21, Mega, Mobile navs) |
| footer/ | 14 | Footer variants + ui/ subfolder |
| card/ | 42 | Card components for jobs, services, projects |
| section/ | 183 | Section components (CTA, listings, testimonials) |
| dashboard/ | - | Default dashboard components |
| dashboard-client/ | - | Client dashboard components (header, sidebar, footer, navigation) |
| dashboard-contractor/ | - | Contractor dashboard components |
| dashboard-worker/ | - | Worker dashboard components |
| button/ | - | Button components (BottomToTop, etc.) |
| sidebar/ | 10 | Sidebar components for listings |
| modal/ | - | Modal components |
| element/ | - | Reusable elements |
| auth/ | 2 | Authentication forms |
| dropdown/ | - | Dropdown components |
| ui-elements/ | - | UI element components |
| breadcumb/ | - | Breadcrumb components |
| hero/ | - | Hero section components |
| option/ | - | Option/filter components |

### 3. Data Layer (`src/data/`)

Static mock data organized by feature:

```javascript
blog.js           // Blog post data
dashboard.js      // Default dashboard navigation & sample data
dashboardClient.js      // Client-specific dashboard navigation
dashboardContractor.js  // Contractor-specific dashboard data
dashboardWorker.js      // Worker-specific dashboard data
fanfact.js        // Fun fact/counter data
features.js       // Feature sections data
footer.js         // Footer links & data
header.js         // Header configuration
job.js            // Job listings (16 sample jobs)
listing.js        // Service/project listings
message.js        // Message/conversation data
navigation.js     // Main navigation structure
partners.js       // Partner/client logos
product.js        // Shop products
project.js        // Project listings
steps.js          // Step-by-step guides
testimonials.js   // Customer testimonials
```

### 4. State Management (`src/store/`)

**Zustand stores:**

| Store | Purpose |
|-------|---------|
| `listingStore.js` | Job/service filters (category, location, job type, etc.) |
| `toggleStore.js` | UI toggles |
| `shopStore.js` | E-commerce cart/state |
| `priceStore.js` | Price filtering |

**Listing Store Pattern:**
```javascript
// Filter fields managed:
- deliveryTime, level, location, bestSeller
- designTools, spokenLanguages, search
- category, serviceMode, projectType
- englishLevel, jobType, noOfEmployee

// Each has corresponding setX/setter action
```

### 5. Hooks (`src/hook/`)

| Hook | Purpose |
|------|---------|
| `useScreen.js` | Screen size detection |
| `useStickyMenu.js` | Sticky header logic |

### 6. Utilities (`src/utils/`)

| File | Purpose |
|------|---------|
| `isActiveNavigation.js` | Active route detection |
| `wow.js` | WOW.js animation initialization |

### 7. VeriTask Feature Modules

Modular feature architecture with dual organization:
1. Role-based modules in role-specific folders for business logic and state management
2. Role-scoped UI components in role-specific folders

**Client (top-level route `src/app/client/`):**
```
src/app/client/
├── components/         # Client-specific UI components (cards, sections, etc.)
│   ├── card/          # ProjectCard, OfferCard, MilestoneCard, etc.
│   ├── element/       # MilestoneForm, ReviewComment, etc.
│   ├── header/        # DashboardHeader, DashboardNavigation
│   ├── sidebar/       # DashboardSidebar
│   ├── footer/        # DashboardFooter
│   ├── chart/         # LineChart, DoughnutChart
│   ├── modal/          # ProposalModal, DeleteModal
│   ├── option/         # SelectInput
│   └── section/       # CreateProjectForm, ManageProjectInfo, ReviewsInfo, etc.
├── modules/            # Client business logic (TaskCreator, OfferReviewer, etc.)
├── dashboard/          # Dashboard page
├── create-projects/    # Create project page
├── manage-projects/    # Manage projects page
├── project/[id]/       # Project detail page
├── reviews/            # Reviews page
└── ...                 # Other client pages (invoice, message, etc.)
```

**Worker & Contractor (inside `(dashboard)` route group):**
```
src/app/(dashboard)/worker/
├── components/         # Worker-specific UI components
├── modules/            # Worker business logic (ProjectBrowser, OfferSubmitter, etc.)
├── dashboard/          # Dashboard page
└── ...                 # Other worker pages

src/app/(dashboard)/contractor/
├── components/         # Contractor-specific UI components
├── modules/            # Contractor business logic
├── dashboard/          # Dashboard page
└── ...                 # Other contractor pages
```

**Shared Module (`src/modules/shared/`):**
| File | Purpose |
|------|---------|
| `store/authStore.js` | Authentication state (role, user) |
| `utils/api.js` | Shared API utilities |
| `utils/taskStates.js` | Task state machine definitions |
| `agents/ruleEnforcementAgent.js` | Ensures development follows rules from doc/rules.md |
| `agents/codebaseAnalysisAgent.js` | Maintains and updates codebase analysis documentation |
| `agents/businessRequirementAgent.js` | Ensures development follows business requirements from doc/business-requirement.md |

---

## API Architecture (`src/app/api/`)

### Client API Routes (`src/app/api/client/`)

| Route | File | Purpose |
|-------|------|---------|
| `/api/client/projects` | `projects/route.js` | Get/create projects |
| `/api/client/offers` | `offers/route.js` | Get offers, accept/reject offers |
| `/api/client/escrow` | `escrow/route.js` | Get/fund escrow |
| `/api/client/milestones` | `milestones/route.js` | Get/approve milestones |
| `/api/client/reviews` | `reviews/route.js` | Get/add reviews |

### Centralized Data Layer (`src/app/api/projects/`)

```
src/app/api/projects/
├── index.ts       # Exports all data and functions
├── data.ts        # 30 projects (10 posted, 10 ongoing, 10 completed)
├── offers.ts      # 25 offers with worker details
├── milestones.ts # 42 milestones across projects
├── escrow.ts     # 20 escrow accounts (ongoing + completed)
└── reviews.ts    # 10 reviews for completed projects
```

### UI State Management (`src/app/api/uiState.js`)

In-memory state storage for UI changes:
- Tracks temporary changes (accept/reject offers, create projects, etc.)
- State persists during dev server session
- Original data remains unchanged

---

## Client Module (`src/app/client/modules/`)

| File | Purpose |
|------|---------|
| `pages/ClientDashboard.jsx` | Client dashboard page |
| `components/TaskCreator.jsx` | Create new tasks |
| `components/OfferReviewer.jsx` | Review worker offers |
| `components/EscrowFunding.jsx` | Fund escrow for tasks |
| `components/PaymentReleaser.jsx` | Release payment on completion |
| `store/clientStore.js` | Client-side state (projects, offers) |

**Client UI Components (`src/app/client/components/`):**

| Component | Purpose |
|-----------|---------|
| `card/ProjectCard.jsx` | Project listing card with status badges |
| `card/OfferCard.jsx` | Worker offer card with accept/reject |
| `card/MilestoneCard.jsx` | Milestone with approve button |
| `card/ManageProjectCard.jsx` | Manage project table row |
| `card/ProposalCard1.jsx` | Proposal card for listings |
| `section/CreateProjectForm.jsx` | Full project creation form with milestones |
| `section/ProjectDetail.jsx` | Project detail view (inline) |
| `section/ProjectDetailPage.jsx` | Project detail page component |
| `section/ManageProjectInfo.jsx` | Tabbed project management view |
| `section/ReviewsInfo.jsx` | Reviews listing with tabs |
| `section/ReviewForm.jsx` | Write review form |
| `element/MilestoneForm.jsx` | Add milestone modal |
| `element/ReviewComment.jsx` | Review comment display |

**Client Pages (`src/app/client/`):**

| Page | Route | Purpose |
|------|-------|---------|
| Dashboard | `/client/dashboard` | Overview dashboard |
| Create Projects | `/client/create-projects` | Create new project |
| Manage Projects | `/client/manage-projects` | List/manage all projects |
| Project Detail | `/client/project/[id]` | Single project with offers/milestones |
| Reviews | `/client/reviews` | View/write reviews |
| Proposal | `/client/proposal` | View proposals |
| Message | `/client/message` | Messages |
| Invoice | `/client/invoice` | Invoices |
| Statements | `/client/statements` | Financial statements |
| Payouts | `/client/payouts` | Payout history |
| My Profile | `/client/my-profile` | User profile |

---

## Worker Module (`src/app/(dashboard)/worker/modules/`)

| File | Purpose |
|------|---------|
| `pages/WorkerDashboard.jsx` | Worker dashboard page |
| `components/ProfileBuilder.jsx` | Build worker profile |
| `components/ProjectBrowser.jsx` | Browse available projects |
| `components/ProjectAcceptor.jsx` | Accept assigned projects |
| `components/OfferSubmitter.jsx` | Submit offers on tasks |
| `store/workerStore.js` | Worker state (projects, offers) |

---

## Contractor Module (`src/app/(dashboard)/contractor/modules/`)

| File | Purpose |
|------|---------|
| `pages/ContractorDashboard.jsx` | Contractor dashboard page |
| `components/TeamManager.jsx` | Manage worker teams |
| `components/SubprojectAssigner.jsx` | Assign subprojects to workers |
| `components/PayrollDistributor.jsx` | Distribute payroll to team |
| `store/contractorStore.js` | Contractor state (teams, subprojects) |

---

## Admin Module (`src/app/admin/`)

| File | Purpose |
|------|---------|
| `pages/AdminDashboard.jsx` | Admin dashboard page |
| `components/DisputeManager.jsx` | Manage dispute resolution |
| `components/UserManager.jsx` | Manage user accounts |
| `components/FinancialOversight.jsx` | Monitor platform finances |
| `store/adminStore.js` | Admin-side state (users, disputes, transactions) |

---

## VeriTask Project State Machine

```
POSTED → ASSIGNED → IN_PROGRESS → SUBMITTED → COMPLETED
                            ↘ IN_DISPUTE → RESOLVED
```

### Project States

| State | Description |
|-------|-------------|
| `POSTED` | Project created, waiting for offers |
| `ASSIGNED` | Offer accepted, worker assigned |
| `IN_PROGRESS` | Work is being done |
| `SUBMITTED` | Work submitted for review |
| `COMPLETED` | Project finished, payment released |
| `IN_DISPUTE` | Dispute raised |
| `CANCELLED` | Project cancelled |

### VeriTask Roles

| Role | Description |
|------|-------------|
| `client` | Posts projects, funds escrow, releases payment |
| `contractor` | Manages teams, assigns subprojects, distributes payroll |
| `worker` | Browses projects, submits offers, completes work |
| `ADMIN` | Verifies users, resolves disputes, manages platform |

---

## Dashboard Layout Pattern

Each role dashboard uses a role-specific `DashboardLayout` wrapper:
- **Client:** `src/app/client/components/DashboardLayout.jsx`
- **Worker:** `src/app/(dashboard)/worker/components/DashboardLayout.jsx`
- **Contractor:** `src/app/(dashboard)/contractor/components/DashboardLayout.jsx`
- **Admin:** `src/app/admin/components/DashboardLayout.jsx`

Each DashboardLayout provides:
- `DashboardHeader` — top bar with logo, search, notifications, user menu
- `DashboardSidebar` — side navigation using `dashboard_sidebar_list` / `sidebar_list_item` CSS
- `DashboardFooter` — copyright footer

---

## Component Patterns

### Card Components
All card components follow a consistent pattern:
```jsx
// Example: JobCard1
export default function JobCard1({ data }) {
  return (
    <div className="job-list-style1 default-box-shadow1 bdrs8 bdr1">
      {/* Card content using data prop */}
    </div>
  );
}
```

### Section Components
Sections are self-contained page sections (183 total):
- Naming: `<SectionName><Variant>.jsx` (e.g., `PopularService1.jsx`)
- Pattern: Combines header + card grid + CTA

### Header/Footer Components
- 31 header variants with corresponding mobile navigation
- 14 footer variants
- Support multiple color themes via CSS variables

---

## CSS Architecture

### Global Styles (`src/app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "./../../public/css/bootstrap.min.css";
@import "./../../public/css/animate.css";
/* ... additional CSS imports */
```

### Custom Badge Styles
```css
.badge-new { background: #22c55e; }      /* Posted/Open */
.badge-applications { background: #3b82f6; } /* Applications */
.badge-assigned { background: #8b5cf6; }    /* Assigned */
.badge-in-progress { background: #f59e0b; } /* In Progress */
.badge-submitted { background: #f97316; }   /* Submitted */
.badge-completed { background: #10b981; }   /* Completed */
.badge-dispute { background: #dc2626; }     /* In Dispute */
.badge-cancelled { background: #6b7280; }   /* Cancelled */
```

### Tailwind Configuration (`tailwind.config.js`)
```js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#37047C',      // Brand purple
        secondary: '#051036',    // Headings dark blue
      },
      fontFamily: {
        dm: ['DM Sans', 'sans-serif'],
      },
      maxWidth: {
        'container': '1430px',
      },
    },
  },
  plugins: [],
}
```

### CSS Variables
```css
:root {
  --primary-color: #37047C;  /* Purple brand color */
  --headings-color: /* ... */;
}
```

### Responsive Breakpoints
Uses Bootstrap 5 breakpoints with custom container max-width:
```css
@media (min-width: 1400px) {
  .container-xxl { max-width: 1430px; }
}
```

---

## Routing Architecture

### Route Groups
```
(home)/              → Homepage variants
(job)/job-1/         → /job-1
(job)/job-2/         → /job-2
(dashboard)/worker/dashboard/     → /worker/dashboard
(dashboard)/worker/my-profile/    → /worker/my-profile
(dashboard)/worker/...            → /worker/* (all worker sub-pages)
(dashboard)/contractor/dashboard/ → /contractor/dashboard
(dashboard)/contractor/...         → /contractor/* (all contractor sub-pages)
```

### Top-level Routes (outside route groups)
```
client/              → /client/* (client dashboard pages - not in route group)
admin/               → /admin/* (admin dashboard pages)
add-services/        → /add-services
```

### Client Routes (`/client/`)
```
client/dashboard           → Overview
client/create-projects     → Create new project
client/manage-projects      → Manage all projects
client/project/[id]        → Project detail page
client/reviews             → Reviews
client/proposal            → Proposals
client/message             → Messages
client/invoice             → Invoices
client/statements          → Statements
client/payouts             → Payouts
client/my-profile         → Profile
```

---

## Development Commands

```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

---

## Design System

### Color Palette
- **Primary:** `#37047C` (Purple)
- **Headings:** `#051036` (Dark blue)
- **Background:** White with various shades
- **Accent colors:** Themed via Bootstrap utilities

### Typography
- **Font:** DM Sans (Google Fonts)
- **Weights:** 400 (regular), 500 (medium), 700 (bold)
- **Fallback:** System sans-serif

### Icon System
- **Flaticon:** Primary icon library
- **Font Awesome:** Supplementary icons
- **Custom SVG:** Logo and special graphics

---

## Extensibility Points

### Adding New Features
1. Create route in appropriate folder (client pages in `src/app/client/`)
2. Create components in `src/app/client/components/`
3. Add API routes in `src/app/api/client/`
4. Update navigation in `src/data/dashboardClient.js`

### Client Journey Implementation
1. **Create Project** → `create-projects/page.jsx` with `CreateProjectForm`
2. **Manage Projects** → `manage-projects/page.jsx` with tabs (Posted/Ongoing/Completed) and pagination (5 items per page)
3. **Project Detail** → `project/[id]/page.jsx` with offers, milestones, escrow
   - Page component (`page.jsx`) handles async params resolution
   - Component receives `projectId` prop for dynamic data loading
   - "Edit Project" button removed
   - "Message Worker" button only visible for ASSIGNED/IN_PROGRESS/SUBMITTED projects
4. **Accept Offer** → API updates state, UI reflects change
5. **Review Project** → `reviews/page.jsx` with `ReviewForm`

### Pagination Component (`Pagination1.jsx`)
- Functional pagination with props: `currentPage`, `totalItems`, `itemsPerPage`, `onPageChange`
- Dynamic page number generation with ellipsis for large datasets
- Shows "X – Y of Z projects" count
- Disabled state for first/last page navigation

### API Integration Pattern
1. Original data in `src/app/api/projects/*.ts` (static)
2. UI changes in `src/app/api/uiState.js` (in-memory)
3. GET requests merge original + state data
4. State resets on server restart

---

## File Count Summary

| Directory | Files |
|-----------|-------|
| components/ | ~310+ (incl. dashboard-client) |
| app/ | ~110+ |
| api/ | 16+ (client routes + data files) |
| data/ | 23 (18 base + 5 veritask) |
| modules/ | ~35 (client, contractor, worker, admin, shared) |
| modules/shared/agents/ | 3 (ruleEnforcementAgent.js, codebaseAnalysisAgent.js, businessRequirementAgent.js) |
| store/ | 8 (4 + 4 role-specific) |
| hook/ | 2 |
| utils/ | 2 |

---

## Conclusion

VeriTask is a comprehensive worker marketplace platform with:

- **Complete Client Journey:** Create project → Manage → View offers → Accept → Track milestones → Review
- **Multi-variant Design System:** 20+ homepages, 30+ headers, extensive component library
- **Role-Based Dashboards:** Separate workflows for clients, contractors, workers, and admins
- **Escrow System:** Project funding, milestone tracking, payment release
- **API Architecture:** RESTful API routes with centralized data layer
- **UI State Management:** In-memory state for demo/development without database

The codebase is structured for:
- Quick deployment as a worker marketplace
- Customization for specific niche platforms
- Learning Next.js 16 patterns and practices

### Additional Documentation
- `doc/rules.md` — VeriTask platform rules and workflows
- `doc/business-requirement.md` — VeriTask business requirements
- `doc/schema.md` — VeriTask database schema
- `src/models/schema.prisma` — Prisma database schema
