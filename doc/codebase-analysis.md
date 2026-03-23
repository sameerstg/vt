# VeriTask Codebase Analysis

## Project Overview

**Framework:** Next.js 16.2.0 + React 19.2.4 | **Package Manager:** Yarn
**Type:** Worker Marketplace — roles: `client`, `worker`, `contractor`, `admin`
**Path alias:** `@/` → `src/` (jsconfig.json)
**Styling:** Bootstrap 5 + Tailwind CSS + custom SCSS | **State:** Zustand 5

---

## Project Structure

```
src/
├── app/           # Next.js App Router — role routes + API
├── components/    # Shared UI components (headers, footers, cards, sections)
├── data/          # Static mock data for navigation & UI
├── store/         # Zustand stores (listing filters, cart, UI toggles)
├── hook/          # useScreen, useStickyMenu
├── models/        # Prisma schema
└── utils/         # isActiveNavigation, wow.js init
```

---

## Role Architecture

Each role has its own top-level route with isolated components and layout:

| Role | Route | Layout |
|------|-------|--------|
| Client | `/client/*` | `src/app/client/layout.jsx` → `client/components/DashboardLayout` |
| Worker | `/worker/*` | `src/app/worker/layout.jsx` → `worker/components/DashboardLayout` |
| Contractor | `/contractor/*` | `src/app/contractor/layout.jsx` → `contractor/components/DashboardLayout` |
| Admin | `/admin/*` | `src/app/admin/layout.jsx` → `admin/components/DashboardLayout` |

Each `DashboardLayout` provides: `DashboardHeader` + `DashboardSidebar` + `DashboardFooter`.
Individual `page.jsx` files export only their content component (layout is applied once in `layout.jsx`).

**Sidebar nav data** (`src/data/dashboardWorker.ts`, `src/data/dashboardContractor.ts`): nav items support optional `children?: { name, path }[]` for nested sidebar links. Items with children render as non-link labels with indented sub-items. The **Teams** item uses this pattern for both worker and contractor.

**User dropdown** (worker, contractor, client): shows My Profile + Logout. Positioned `fixed; top: 75px; right: 30px` via `public/css/style.css`.

---

## State Machine

```
POSTED → ASSIGNED → IN_PROGRESS → SUBMITTED → COMPLETED
                              ↘ IN_DISPUTE → RESOLVED
```

| State | Description |
|-------|-------------|
| `POSTED` | Open for offers |
| `ASSIGNED` | Worker/contractor assigned |
| `IN_PROGRESS` | Work underway |
| `SUBMITTED` | Work submitted for review |
| `COMPLETED` | Payment released |
| `IN_DISPUTE` | Dispute raised |
| `CANCELLED` | Cancelled |

---

## API Architecture

### Client API (`/api/client/`)
| Route | Purpose |
|-------|---------|
| `projects` | GET/create projects |
| `offers` | GET offers, accept/reject |
| `escrow` | GET/fund escrow |
| `milestones` | GET/approve milestones |
| `reviews` | GET/add reviews |

### Worker API (`/api/worker/`)
| Route | Purpose |
|-------|---------|
| `projects` | GET `?type=available/assigned`; GET `?type=team&workerId=x` → worker's teams (array); PUT `action=submit` |
| `offers` | POST submit; PUT `action=withdraw` |
| `milestones` | GET by projectId; PUT `action=start/submit/complete` |

### Contractor API (`/api/contractor/`)
| Route | Purpose |
|-------|---------|
| `route.js` | GET `?type=available` (contractorOnly POSTED); `?type=assigned` (contractor's projects); `?type=team` → teams array (10 teams for contractor-001); POST `addTeamMember`; PUT `removeTeamMember` |
| `milestones/` | GET/PUT milestones for contractor projects |

### Shared API
| Route | Purpose |
|-------|---------|
| `/api/assignments` | Contractor→worker assignments (GET/POST/PUT) |
| `/api/projects/` | Centralized data layer (data.ts, offers.ts, milestones.ts, escrow.ts, reviews.ts) |

### Data Layer (`src/app/api/projects/`)
- `data.ts` — 100+ worker projects + 15 contractor-only (`proj-C01`–`proj-C15`, `contractorOnly: true`)
  - `proj-C01`–`proj-C08`: POSTED (enterprise-scale: ERP, construction, SaaS, IT infra)
  - `proj-C09`–`proj-C10`: ASSIGNED to contractor-001
  - `proj-C11`–`proj-C12`: IN_PROGRESS for contractor-001
  - `proj-C13`–`proj-C14`: COMPLETED by contractor-001
  - `proj-C15`: IN_DISPUTE for contractor-001
- `offers.ts` — 25 offers | `milestones.ts` — 42 milestones | `escrow.ts` — 20 accounts | `reviews.ts` — 10 reviews

### UI State (`src/app/api/uiState.js`)
In-memory Maps for `offersState`, `projectsState`, `milestonesState`, `reviewsState`.
GET requests merge base data + state. Resets on server restart.

### Assignments API (`/api/assignments`)
- `GET ?contractorId=x` / `GET ?workerId=x`
- `POST {action:"create"}` — required: contractorId, workerId, workerName, projectId, projectTitle, pay, deadline
- `PUT {action:"respond", status}` — worker accepts/declines (PENDING only) → ACCEPTED | DECLINED
- `PUT {action:"start"}` — worker starts work (ACCEPTED only) → IN_PROGRESS
- `PUT {action:"submit"}` — worker submits work (IN_PROGRESS only) → IN_REVIEW
- `PUT {action:"approve"}` — contractor approves submission (IN_REVIEW only)
- `PUT {action:"cancel"}` — contractor cancels (PENDING only) → deleted
- Assignment status flow: `PENDING → ACCEPTED → IN_PROGRESS → IN_REVIEW`; or `PENDING → DECLINED`
- Pre-seeded: 25 assignments (5 per status × 5 statuses) for contractor-001; worker-021 has 5 assignments per status tab

---

## Client Journey

Pages at `src/app/client/` | Components at `src/app/client/components/` | API: `/api/client/*`

1. **Dashboard** `/client/dashboard` — overview stats
2. **Create Project** `/client/create-projects` — `CreateProjectForm` with milestones
3. **Manage Projects** `/client/manage-projects` — tabs (Posted/Ongoing/Completed), 5/page
4. **Project Detail** `/client/project/[id]` — offers, milestones, escrow; "Message Worker" only for ASSIGNED/IN_PROGRESS/SUBMITTED
5. **Reviews** `/client/reviews` — `ReviewForm`

---

## Worker Journey

Pages at `src/app/worker/` | Components at `src/app/worker/components/` | API: `/api/worker/*`

1. **Dashboard** `/worker/dashboard` — active projects, pending offers, earnings
2. **Browse Projects** `/worker/browse-projects` — `Listing8.jsx`, 100+ projects from `/api/worker/projects?type=available`; filters: search, category, type, budget; 8/page
3. **Manage Projects** `/worker/manage-projects` — `ManageProjectInfo`; tabs: In Progress / In Review / Completed / In Dispute
   - IN_DISPUTE mocks: proj-031, proj-032, proj-033 (worker-021)
4. **My Projects** `/worker/my-projects` — `AssignedProjectsInfo`; milestone tracking (start/submit)
5. **Project Detail** `/worker/project/[id]` — milestone actions; FIXED+IN_PROGRESS shows "Ready to submit?" bar
6. **Submit Work** `/worker/project/[id]/submit` — description + file upload; `PUT /api/worker/projects {action:"submit"}` → SUBMITTED
7. **My Proposals** `/worker/proposals` — submitted offers, withdraw pending
8. **Teams** `/worker/assignments` + `/worker/team` — nested sidebar item with two sub-pages:
   - **My Teams** `/worker/team` — `WorkerTeamInfo`; collapsible team cards showing all teams worker belongs to; member table with role, rate, "You" badge on own row
   - **Assigned Tasks** `/worker/assignments` — `WorkerAssignmentsInfo`; tabs: PENDING / ACCEPTED / IN_PROGRESS / IN_REVIEW / DECLINED; count badge on every tab
     - PENDING: Accept / Decline buttons → `PUT {action:"respond"}`
     - ACCEPTED: Start button → `PUT {action:"start"}` → IN_PROGRESS
     - IN_PROGRESS: Submit button → `PUT {action:"submit"}` → IN_REVIEW

---

## Contractor Journey

Pages at `src/app/contractor/` | Components at `src/app/contractor/components/` | API: `/api/contractor/*`
All contractor pages use **contractor's own component copies** (not worker's). All API calls go to `/api/contractor/*`.

1. **Dashboard** `/contractor/dashboard` — `WorkerDashboardInfo`; fetches `/api/contractor?type=assigned`
2. **Browse Projects** `/contractor/browse-projects` — `Listing8`; fetches `/api/contractor?type=available` (contractor-only POSTED projects)
3. **My Projects** `/contractor/my-projects` — `AssignedProjectsInfo`; fetches `/api/contractor?type=assigned`; milestones from `/api/contractor/milestones`
4. **Manage Projects** `/contractor/manage-projects` — `ManageProjectInfo`; fetches `/api/contractor?type=assigned`; tabs: In Progress / In Review / Completed / In Dispute
5. **Teams** `/contractor/team` + `/contractor/assignments` — nested sidebar item with two sub-pages:
   - **Team Management** `/contractor/team` — `TeamManagementInfo`; 10 collapsible team cards; Add Member modal (memberId, name, type worker|contractor, role, rate); Assign modal per member (project dropdown, optional milestone, pay, deadline, note → `POST /api/assignments`); Remove button per member
   - **Task Assigned** `/contractor/assignments` — `ContractorAssignmentsInfo`; tabs: PENDING / ACCEPTED / IN_PROGRESS / FOR_REVIEW / DECLINED; count badge on every tab
     - PENDING: Cancel button → `PUT {action:"cancel"}` (deletes assignment)
     - FOR_REVIEW (IN_REVIEW): Approve button → `PUT {action:"approve"}`

---

## Shared Module (`src/modules/shared/`)

| File | Purpose |
|------|---------|
| `store/authStore.js` | Auth state (role, user) |
| `utils/taskStates.js` | State machine definitions |
| `agents/ruleEnforcementAgent.js` | Enforces doc/rules.md |
| `agents/codebaseAnalysisAgent.js` | Maintains this doc |
| `agents/businessRequirementAgent.js` | Enforces doc/business-requirement.md |

---

## Design System

- **Colors:** Primary `#37047C` (purple), Headings `#051036` (dark blue)
- **Font:** DM Sans | **Icons:** Flaticon (primary), Font Awesome
- **Badges:** `.badge-new` (green) · `.badge-assigned` (purple) · `.badge-in-progress` (amber) · `.badge-submitted` (orange) · `.badge-completed` (emerald) · `.badge-dispute` (red) · `.badge-cancelled` (gray)

---

## Additional Documentation

- `doc/rules.md` — platform rules and workflows
- `doc/business-requirement.md` — business requirements
- `doc/schema.md` — database schema overview
- `src/models/schema.prisma` — Prisma schema
