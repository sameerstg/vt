# VeriTask Frontend — CLAUDE.md

Project context and conventions for AI-assisted development.

---

## Project Overview

VeriTask is a multi-role task marketplace. Clients post projects with milestones, contractors bid on projects and manage a team of workers, workers execute milestones, and admins oversee the platform.

**Current stage:** Prototype / demo. No real backend — all persistence is localStorage + file-based mock API.

---

## Tech Stack

- **Framework:** Next.js 15.3.2 (App Router only — no Pages Router except `/pages/api/`)
- **React:** 19.1.0
- **State:** Zustand 5 (sidebar toggle only — no global app state)
- **Styling:** Bootstrap 5.3 + SASS + inline `<style jsx>` for component-specific styles
- **Charts:** Chart.js + react-chartjs-2
- **Icons:** Flaticon + Font Awesome (`fal fa-*`)
- **Auth:** Mock auth backed by localStorage + JSON file (no real backend auth)

---

## User Roles

| Role | Dashboard Path | Description |
|---|---|---|
| `client` | `/dashboard` | Posts tasks/projects with milestones, funds escrow, reviews proposals, approves deliverables |
| `worker` | `/worker-dashboard` | Applies directly to client tasks OR gets assigned milestones by a contractor |
| `contractor` | `/contractor-dashboard` | Bids on client projects, builds a team, assigns project+milestones to workers, submits deliverables to client, distributes payment |
| `admin` | `/admin-dashboard` | Platform oversight — user management, task monitoring, financial overview, dispute resolution |

Registration allows only `client`, `worker`, `contractor`. Admin must be seeded in `mockUsers.json`.

---

## Folder Structure

```
src/
  app/
    (auth)/          # login, register (register just redirects to /seller/register)
    (dashboard)/     # ALL role dashboards — no shared layout.js
      dashboard/               # client dashboard pages
      worker-dashboard/        # worker dashboard pages
      contractor-dashboard/    # contractor dashboard pages
      admin-dashboard/         # admin dashboard pages
    seller/login     # canonical login URL
    seller/register  # canonical register URL (?role=client|worker|contractor)
    pages/api/       # only real server-side code
  components/
    dashboard/               # client components
    dashboard-worker/        # worker components
    dashboard-contractor/    # contractor components
    dashboard-admin/         # admin components
    dashboard-shared/        # shared panels reused across roles
    layout/AppClientShell.jsx
  data/
    dashboard.js             # client sidebar nav
    dashboardWorker.js       # worker sidebar nav + mock data
    dashboardContractor.js   # contractor sidebar nav
    dashboardAdmin.js        # admin sidebar nav + all static mock data
    auth/mockUsers.json      # seeded demo users (~500KB — do not grow this further)
    auth/roleFlows.json      # role → dashboardPath mapping
  store/
    toggleStore.js           # Zustand: isDasboardSidebarActive, isListingActive
  utils/
    auth/mockAuth.js         # ENTIRE service layer — all CRUD, session, proposals
    auth/filterNavigationByRole.js
```

---

## Data Layer

### Auth Session
Stored in `localStorage` under key `vt_auth_session`. Read/write via `mockAuth.js` helpers only — never access `localStorage` directly in components.

```js
import { getAuthSession, setAuthSession, updateAuthSession, clearAuthSession } from "@/utils/auth/mockAuth";
```

Session fields: `id, name, email, role, phone, tagline, bio, hourlyRate, gender, country, city, language, skills[], education[], workExperience[], awards[], profileImage, loggedInAt`

### User Storage (three-tier merge)
1. `src/data/auth/mockUsers.json` — seeded users, read at build time and via API
2. `localStorage: vt_registered_mock_users` — dynamically registered users
3. `getAllUsers()` in `mockAuth.js` merges both, deduplicates by email

### Task Storage
- Tasks belong to users via `user.createdTasks[]`
- Task shape: `{ id, title, description, category, taskType, workMode, location, budgetModel, budget, milestones[], skills[], deadline, status, projectLevel, clientId, assignedWorkerId, acceptedProposalId, ... }`
- Status lifecycle: `Draft → Ongoing → In Progress → Completed / Disputed`
- Persisted via POST `/api/tasks` → writes to `mockUsers.json`

### Proposal Storage
- `localStorage: vt_submitted_proposals` — flat global list of all proposals
- Also duplicated in user records: `user.submittedProposals[]`, `user.receivedProposals[]`
- Proposal shape: `{ id, taskId, taskTitle, clientId, workerId, offerType, offerAmount, timeline, coverLetter, status, submittedAt }`
- Persisted via POST `/api/proposals`

### Contractor Team Storage (to be built)
New localStorage key: `vt_contractor_teams`
```json
{
  "[contractorId]": {
    "workers": [{ "workerId": "", "name": "", "email": "" }],
    "assignments": [{
      "taskId": "", "taskTitle": "", "workerId": "", "workerName": "",
      "milestones": [{ "id": "", "title": "", "price": 0, "deadline": "", "status": "working", "progress": 0 }]
    }]
  }
}
```

### API Routes (Pages Router)
| Route | Methods | Purpose |
|---|---|---|
| `/api/tasks` | POST, DELETE | Create/delete task in mockUsers.json |
| `/api/proposals` | POST | Save proposal to mockUsers.json |
| `/api/mock-users` | POST, PATCH | Register user / update profile |

These write to `mockUsers.json` directly via `fs`. Will not work on read-only hosts (Vercel). A real DB is needed before production.

---

## Auth Guard Pattern

Every `DashboardLayout` must implement this exact pattern (worker and admin already have it; contractor is missing it — see Known Issues):

```jsx
useEffect(() => {
  const session = getAuthSession();
  if (!session?.role) {
    router.replace("/seller/login");
    return;
  }
  if (session.role !== "ROLE_NAME") {
    const roleFlow = getRoleFlow(session.role);
    router.replace(roleFlow?.dashboardPath || "/seller/login");
    return;
  }
  setIsAuthorized(true);
}, [pathname, router]);

if (!isAuthorized) return null;
```

---

## Coding Conventions

### Forms
- All forms use local `useState` — no form library (no React Hook Form, Formik, etc.)
- Validation runs inline in `handleSubmit`
- Show errors only after first submit attempt using a `submitAttempted` boolean flag
- Show errors as inline `<p>` or `<small>` below the field, not in a toast

### Toast Notifications
Used in `CreateTaskInfo.jsx` — copy this pattern for success/error feedback:
```jsx
const [toasts, setToasts] = useState([]);
const showToast = (type, message) => {
  const id = Date.now();
  setToasts(prev => [...prev, { id, type, message }]);
  setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
};
```

### Component File Naming
- Pages: `page.jsx` (lowercase)
- Section components: `PascalCaseInfo.jsx` (e.g., `DashboardInfo.jsx`, `AssignedTasksInfo.jsx`)
- Shared panels: `PascalCasePanel.jsx` (e.g., `ProposalSubmissionPanel.jsx`)
- Cards: `PascalCaseCard.jsx`

### Page Structure Pattern
```jsx
// page.jsx
import DashboardLayout from "@/components/dashboard-{role}/DashboardLayout";
import FooInfo from "@/components/dashboard-{role}/section/FooInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = { title: "Page Title | VeriTask" };

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <FooInfo />
      </DashboardLayout>
    </>
  );
}
```

### Section Component Structure
```jsx
// FooInfo.jsx
"use client";
import DashboardNavigation from "../header/DashboardNavigation";

export default function FooInfo() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Page Title</h2>
          </div>
        </div>
      </div>
      {/* content */}
    </div>
  );
}
```

### Styling
- Use Bootstrap utility classes for layout (`d-flex`, `col-lg-*`, `mb30`, etc.)
- Use project CSS classes for widgets: `ps-widget bgc-white bdrs4 p30 mb30`
- Component-specific styles go in `<style jsx>` at the bottom of the component
- Status badges use: `pending-style style1` (submitted), `style4` (completed), `style5` (pending), `style6` (in-progress)

---

## Current Development Priorities

### Priority 1 — Worker Flow
1. Auth guard on contractor `DashboardLayout` *(foundation fix)*
2. Fix `TaskDiscoveryPanel` Details button routing bug *(foundation fix)*
3. `mockAuth.js` — add `vt_contractor_teams` helpers *(data layer)*
4. Assigned Tasks — replace static data with real data
5. Assigned Task Detail — connect to real task via `?taskId=` param
6. Work Submission — connect to real task + milestone data
7. In-Progress page — connect to real data
8. Worker Dashboard overview — real stats

### Priority 2 — Contractor Flow
1. Task Details page (`/contractor-dashboard/task-details`) — new page showing milestones
2. Proposal Submission — contractor-specific (single total bid, shows milestones)
3. Applied Projects tracking — repurpose `manage-projects` page
4. Team Management — real worker data (add/remove workers)
5. Assign Project to Worker — persistence
6. Assign Milestones to Workers — persistence + creates worker assignment
7. Monitor Milestones — real data + approve/request revision
8. Submit Deliverable to Client
9. Payment Distribution — real logic
10. Contractor Dashboard overview — real stats

### Priority 3 — Cleanup
- Sidebar nav labels and paths aligned to new pages
- Remove leftover "Freeio" branding from metadata titles
- Consolidate triplicated card/chart components into `dashboard-shared/`

---

## Known Issues / Bugs

1. **Contractor `DashboardLayout` has no auth guard** — any user can access contractor pages
2. **`TaskDiscoveryPanel` Details button** hardcodes `/worker-dashboard/available-tasks/details` — contractor gets routed to wrong dashboard
3. **`TeamManagementInfo`** uses hardcoded static workers — not connected to real data
4. **`AssignedTaskInfo`** imports static mock data from `dashboardWorker.js` — not dynamic
5. **`WorkSubmissionPanel`** not connected to real task data
6. **`mockUsers.json` is 500KB+** — included in server bundle, will cause performance issues at scale
7. **No Next.js middleware** — auth guards run in `useEffect` causing flash of null before redirect
8. **API routes write to `mockUsers.json`** — breaks on any read-only deployment host

---

## Key Flows (for reference)

### Full Contractor → Worker Flow
```
CLIENT creates project (with milestones)
  ↓
CONTRACTOR browses projects → applies (single total bid)
  ↓
CLIENT accepts contractor proposal
  ↓
CONTRACTOR adds workers to team → assigns project → assigns milestones to workers
  ↓
WORKER sees assignment in "Assigned Tasks" (merged view — direct + contractor-assigned)
WORKER works on milestones → submits work
  ↓
CONTRACTOR monitors → approves or requests revision
  ↓  (all milestones approved)
CONTRACTOR submits deliverable to CLIENT
  ↓
CLIENT approves → escrow releases to CONTRACTOR
  ↓
CONTRACTOR manually distributes payment to workers
```

### Worker Self-Apply Flow
```
WORKER browses available tasks → applies with proposal
CLIENT accepts → task appears in WORKER "Assigned Tasks"
WORKER submits work → CLIENT approves directly → payment
```
