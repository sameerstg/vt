# Freeio Next.js Codebase Analysis

## Project Overview

**Project Name:** freeio-nextjs (v1.6.0)  
**Type:** Freelancer Marketplace / Job Board Template  
**Framework:** Next.js 15.3.2 with React 19.1.0  
**Package Manager:** Yarn

---

## Technology Stack

### Core Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.3.2 | React framework |
| react | 19.1.0 | UI library |
| react-dom | 19.1.0 | DOM rendering |
| zustand | 5.0.5 | State management |
| bootstrap | 5.3.6 | CSS framework |
| sass | 1.89.0 | SCSS compilation |

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
| dashboard/ | - | Dashboard-specific components |
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
dashboard.js      // Dashboard navigation & sample data
dashboardContractor.js  // Contractor-specific data
dashboardWorker.js      // Worker-specific data
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
@import "./../../public/css/bootstrap.min.css";
@import "./../../public/css/animate.css";
/* ... additional CSS imports */
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
(home)/         → Homepage variants
(job)/job-1/    → /job-1
(job)/job-2/    → /job-2
(dashboard)/dashboard/  → /dashboard
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
```javascript
export const dasboardNavigation = [
  { name: "Dashboard", icon: "flaticon-home", path: "/dashboard" },
  { name: "My Proposals", icon: "flaticon-document", path: "/proposal" },
  // ... 15 total items
];
```

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
- Primary color easily customized via CSS variable

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

### Replacing Mock Data
1. Replace data exports in `src/data/` with API calls
2. Wrap components with data fetching logic
3. Use Zustand stores for client-side filtering

### Customizing Styling
1. Override CSS variables in `globals.css`
2. Add custom SCSS in `public/css/`
3. Use Bootstrap utility classes

---

## File Count Summary

| Directory | Files |
|-----------|-------|
| components/ | ~300+ |
| app/ | ~100+ |
| data/ | 17 |
| store/ | 4 |
| hook/ | 2 |
| utils/ | 2 |

---

## Conclusion

This is a comprehensive freelancer marketplace template with:
- Multi-variant design system (20+ homepages, 30+ headers, etc.)
- Full feature set for job/service/project listings
- Separate dashboards for workers and contractors
- E-commerce functionality (shop, cart, checkout)
- Rich component library ready for customization

The codebase prioritizes template flexibility over backend integration, making it ideal for:
- Quick deployment as a freelancer marketplace
- Customization for specific niche platforms
- Learning Next.js 15 patterns and practices
