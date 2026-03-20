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
├── components/    # Reusable UI components
├── data/          # Static data (mock data)
├── hook/          # Custom React hooks
├── modules/       # VeriTask feature modules (client, contractor, worker, shared)
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

### 7. VeriTask Feature Modules (`src/modules/`)

Modular feature architecture organized by role, each with its own components, pages, and store:

```
modules/
├── client/         # Client role (job poster, task creator)
├── contractor/     # Contractor role (team manager, payroll)
├── worker/         # Worker role (task executor, offer submitter)
└── shared/         # Shared utilities (auth, layout, utils)
```

**Client Module (`src/modules/client/`):**
| File | Purpose |
|------|---------|
| `pages/ClientDashboard.jsx` | Client dashboard page |
| `components/TaskCreator.jsx` | Create new tasks |
| `components/OfferReviewer.jsx` | Review worker offers |
| `components/EscrowFunding.jsx` | Fund escrow for tasks |
| `components/PaymentReleaser.jsx` | Release payment on completion |
| `store/clientStore.js` | Client-side state (tasks, offers) |

**Contractor Module (`src/modules/contractor/`):**
| File | Purpose |
|------|---------|
| `pages/ContractorDashboard.jsx` | Contractor dashboard page |
| `components/TeamManager.jsx` | Manage worker teams |
| `components/SubtaskAssigner.jsx` | Assign subtasks to workers |
| `components/PayrollDistributor.jsx` | Distribute payroll to team |
| `store/contractorStore.js` | Contractor state (teams, subtasks) |

**Worker Module (`src/modules/worker/`):**
| File | Purpose |
|------|---------|
| `pages/WorkerDashboard.jsx` | Worker dashboard page |
| `components/ProfileBuilder.jsx` | Build worker profile |
| `components/TaskBrowser.jsx` | Browse available tasks |
| `components/TaskAcceptor.jsx` | Accept assigned tasks |
| `components/OfferSubmitter.jsx` | Submit offers on tasks |
| `store/workerStore.js` | Worker state (tasks, offers) |

**Shared Module (`src/modules/shared/`):**
| File | Purpose |
|------|---------|
| `store/authStore.js` | Authentication state (role, user) |
| `utils/api.js` | Shared API utilities |
| `utils/taskStates.js` | Task state machine definitions |

**VeriTask Data (`src/data/veritask/`):**
| File | Purpose |
|------|---------|
| `tasks.js` | VeriTask task listings |
| `offers.js` | Worker offers on tasks |
| `users.js` | User profiles (client, contractor, worker) |
| `escrow.js` | Escrow fund tracking |
| `disputes.js` | Dispute resolution records |

**VeriTask Task State Machine:**
```
POSTED → ACCEPTED → IN_PROGRESS → SUBMITTED → APPROVED → COMPLETED
                            ↘ DISPUTED → RESOLVED
         ↓
      CANCELLED
```

**VeriTask Roles:**
| Role | Description |
|------|-------------|
| `client` | Posts tasks, funds escrow, releases payment |
| `contractor` | Manages teams, assigns subtasks, distributes payroll |
| `worker` | Browses tasks, submits offers, completes work |

---

**Dashboard Pages (in `src/app/(dashboard)/`):**
- `client/dashboard/page.jsx` - Client role dashboard (VeriTask)
- `worker/dashboard/page.jsx` - Worker role dashboard (VeriTask)
- `contractor/dashboard/page.jsx` - Contractor role dashboard (VeriTask)

Each role also has role-specific sub-pages for proposal, invoice, saved, reviews, message, payouts, statements, my-profile, manage-jobs, manage-projects, manage-services, add-services, create-projects.

---

**VeriTask Dashboard Layout Pattern:**
Each role dashboard uses a role-specific `DashboardLayout` wrapper (`src/components/dashboard-{role}/DashboardLayout.jsx`) that provides:
- `DashboardHeader` — top bar with logo, search, notifications, user menu
- `DashboardSidebar` — side navigation using `dashboard_sidebar_list` / `sidebar_list_item` CSS
- `DashboardFooter` — copyright footer

This ensures all three role dashboards share the same header/sidebar/footer styling as the template's original dashboards.

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
(dashboard)/dashboard/ → /dashboard
(dashboard)/client/dashboard/     → /client/dashboard
(dashboard)/worker/dashboard/     → /worker/dashboard
(dashboard)/contractor/dashboard/ → /contractor/dashboard
```

### Navigation Structure (`data/navigation.js`)
```javascript
const menus = [
  { id: 1, name: "Home", children: [...] },
  { id: 2, name: "Browse Jobs", children: [...] },
  { id: 3, name: "Users", children: [...] },
  // ...
];
```

### Dashboard Navigation
Each role has its own navigation defined in `src/data/`:

**Client (`dashboardClient.js`):** 13 items — Dashboard, My Tasks, Review Offers, Escrow, Payments, Saved, Message, Reviews, Manage Projects, Create Project, Statements, My Profile, Logout

**Worker (`dashboardWorker.js`):** 15 items — Dashboard, My Proposals, Saved, Message, Reviews, Invoice, Payouts, Statements, Manage Services, Manage Jobs, Manage Project, Add Services, Create Project, My Profile, Logout

**Contractor (`dashboardContractor.js`):** 15 items — same structure as worker, prefixed with `/contractor/`

---

## Key Architectural Decisions

### 1. Multiple Homepage Variants
- 20 different homepage layouts (`(home)/home-1` through `home-20`)
- Each uses different section combinations
- Supports various business models (jobs, services, projects)

### 2. Component Variant Pattern
- Heavy use of numbered variants (Card1, Card2, Section1, Section2)
- Facilitates template customization
- Makes swapping designs straightforward

### 3. Client-Side State
- All client components marked with `"use client"`
- Root layout initializes Bootstrap dynamically
- WOW.js animations triggered on route change

### 4. Static Mock Data
- No API integration (static template)
- All data in `src/data/` as JS exports
- Easy to replace with real API calls

### 5. Modular CSS
- Bootstrap base + custom CSS imports
- Component-scoped styles via classes
- Primary color easily customizable via CSS variable

### 6. Dual Styling Strategy (Tailwind + Existing CSS)
- **Coexistence approach**: Tailwind added alongside existing Bootstrap/custom CSS
- **Migration-ready**: New components can use Tailwind; existing components unchanged
- **Brand colors**: Available as Tailwind utilities (`bg-primary`, `text-primary`, etc.)
- **Build verified**: All 121 static pages compile successfully

---

## Data Models

### Job Data Structure
```javascript
{
  id: number,
  img: string,          // Client avatar
  title: string,
  server: string,       // Company name
  benefits: string[],   // ["$125k-$135k Hourly", "1-5 Days", ...]
  category: string,
  salary: number,
  jobType: "Freelance" | "Full Time" | "Part Time" | "Internship",
  level: "top-rated" | "lavel-2" | "lavel-1" | "new",
  sort: "best-seller" | "recommended" | "new-arrivals"
}
```

### Dashboard Navigation Item
```javascript
{
  id: number,
  name: string,
  icon: string,    // flaticon class name
  path: string
}
```

### Invoice/Payout Structure
```javascript
{
  id: number,
  amount: number,
  date: string,
  method?: string,    // For payouts
  status: number      // 1, 2, or 3 (paid/pending/etc.)
}
```

---

## Development Commands

```bash
yarn dev      # Start development server
yarn build    # Production build
yarn start    # Start production server
yarn lint     # ESLint check
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

### Adding New Pages
1. Create route in appropriate group or top-level
2. Compose using existing section/card components
3. Add navigation entry in `data/navigation.js`

### Adding VeriTask Role Features
1. Choose the appropriate role module (`client`, `contractor`, `worker`)
2. Add components in the role's `components/` folder
3. Manage state in the role's `store/` (Zustand)
4. Add page in `src/app/(dashboard)/<role>-dashboard/`
5. Add shared utilities to `modules/shared/` (auth, layout, API)
6. For dashboard UI, wrap pages with the role's `DashboardLayout` component (`src/components/dashboard-{role}/`)

### Replacing Mock Data
1. Replace data exports in `src/data/` with API calls
2. Wrap components with data fetching logic
3. Use Zustand stores for client-side filtering

### Customizing Styling
1. Override CSS variables in `globals.css`
2. Add custom SCSS in `public/css/`
3. Use Bootstrap utility classes
4. Use Tailwind utility classes for new components (e.g., `className="flex items-center bg-primary"`)

---

## File Count Summary

| Directory | Files |
|-----------|-------|
| components/ | ~310+ (incl. dashboard-client) |
| app/ | ~100+ |
| data/ | 23 (18 base + 5 veritask) |
| modules/ | ~30 (client, contractor, worker, shared) |
| store/ | 7 (4 + 3 role-specific) |
| hook/ | 2 |
| utils/ | 2 |

---

## Conclusion

VeriTask is a comprehensive worker marketplace template with:
- Multi-variant design system (20+ homepages, 30+ headers, etc.)
- Full feature set for job/service/project listings
- Separate role-based dashboards for clients, contractors, and workers
- VeriTask complete flow: task creation → offer submission → escrow funding → task execution → payment release
- E-commerce functionality (shop, cart, checkout)
- Rich component library ready for customization

The codebase prioritizes template flexibility over backend integration, while the new VeriTask modules provide a structured pattern for implementing the full task marketplace lifecycle. It is ideal for:
- Quick deployment as a worker marketplace
- Customization for specific niche platforms
- Learning Next.js 16 patterns and practices

### Additional Documentation
- `doc/rules.md` — VeriTask platform rules and workflows
