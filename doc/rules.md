# VeriTask Platform - Development Rules & Guidelines

**Project:** VeriTask Platform Phase 01  
**Document Version:** 1.0  
**Date:** January 27, 2026  
**Based on:** Business Requirements Document v1.0 & Codebase Analysis

---

## 1. Core Development Rules

### Rule 1: No Theme, Color, or Component Changes
- **DO NOT** modify existing theme colors, CSS variables, or component styling
- Existing design system (`--primary-color: #37047C`, `--headings-color: #051036`) remains unchanged
- All new components must respect the existing Bootstrap/custom CSS framework
- Preserve all existing `globals.css` configurations

### Rule 2: Client-Side Only (No Backend - Figma-Like Static)
- All functionality must work client-side with mock/static data
- No API calls or server-side operations
- Use existing `src/data/` pattern for all data storage
- Simulate all workflows (escrow, offers, task states) with static state
- Future: Backend integration should follow the same module structure

### Rule 3: Module-Based File Structure
- Each role (Client, Worker, Contractor, Admin) has isolated modules
- Prevent naming conflicts through namespacing
- New directories follow pattern: `src/modules/{role}/`
- Components inside modules are self-contained

### Rule 4: Tailwind CSS for New Components Only
- **USE** Tailwind for all new component development
- **DO NOT** modify existing components' styling
- Existing Bootstrap/custom CSS classes remain untouched
- New pages/components can use `className="..."` with Tailwind utilities
- Existing pages use `className="... existing-class ..."` pattern (mixing allowed)

---

## 2. Module Structure by Role

```
src/
├── modules/
│   ├── client/                    # Client role module
│   │   ├── components/
│   │   │   ├── TaskCreator.jsx
│   │   │   ├── OfferReviewer.jsx
│   │   │   ├── EscrowFunding.jsx
│   │   │   └── PaymentReleaser.jsx
│   │   ├── pages/
│   │   │   └── client-dashboard/
│   │   └── data/
│   │       └── clientTasks.js
│   │
│   ├── worker/                    # Worker role module
│   │   ├── components/
│   │   │   ├── TaskBrowser.jsx
│   │   │   ├── OfferSubmitter.jsx
│   │   │   ├── TaskAcceptor.jsx
│   │   │   └── ProfileBuilder.jsx
│   │   ├── pages/
│   │   │   └── worker-dashboard/
│   │   └── data/
│   │       └── workerProfile.js
│   │
│   ├── contractor/               # Contractor role module
│   │   ├── components/
│   │   │   ├── TeamManager.jsx
│   │   │   ├── PayrollDistributor.jsx
│   │   │   └── SubtaskAssigner.jsx
│   │   ├── pages/
│   │   │   └── contractor-dashboard/
│   │   └── data/
│   │       └── teamRoster.js
│   │
│   ├── admin/                     # Admin role module
│   │   ├── components/
│   │   │   ├── UserVerifier.jsx
│   │   │   ├── DisputeResolver.jsx
│   │   │   ├── UserManager.jsx
│   │   │   └── FinancialDashboard.jsx
│   │   ├── pages/
│   │   │   └── admin-dashboard/
│   │   └── data/
│   │       └── adminMetrics.js
│   │
│   └── shared/                   # Shared components across roles
│       ├── components/
│       │   ├── TaskCard.jsx
│       │   ├── UserAvatar.jsx
│       │   ├── EscrowStatus.jsx
│       │   └── NotificationBell.jsx
│       └── utils/
│           └── taskStates.js
```

---

## 3. Data Architecture

### 3.1 Data Location
- All mock data in `src/data/` following existing pattern
- Module-specific data in `src/modules/{role}/data/`

### 3.2 Data Models (Static/Mock)

```javascript
// Task Model
{
  id: string,
  title: string,
  description: string,
  type: "physical" | "virtual",
  location?: { lat: number, lng: number, address: string },
  budget: { model: "fixed" | "milestone", amount: number, milestones?: [] },
  urgency: "low" | "medium" | "high",
  schedule: { date: string, timeWindow: string },
  status: "posted" | "applications_received" | "offer_accepted" | "in_progress" | "completed" | "disputed",
  clientId: string,
  assignedWorkerId?: string,
  escrow: { funded: boolean, amount: number, released: boolean }
}

// User Model
{
  id: string,
  role: "client" | "worker" | "contractor" | "admin",
  name: string,
  email: string,
  phone: string,
  location: string,
  avatar: string,
  verified: boolean,
  rating: number
}

// Offer Model
{
  id: string,
  taskId: string,
  workerId: string,
  amount: number,
  terms: string,
  status: "pending" | "accepted" | "rejected"
}
```

---

## 4. Styling Guidelines

### 4.1 Tailwind Usage
```jsx
// NEW components - use Tailwind
export default function NewComponent({ data }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-secondary">{data.title}</h3>
    </div>
  );
}
```

### 4.2 Mixing Styles (New on Existing)
```jsx
// When adding new content to existing pages
<div className="existing-class-from-template another-class">
  <NewTailwindComponent />
</div>
```

### 4.3 Existing Classes Reference
- Layout: `container`, `row`, `col-`
- Spacing: `mb20`, `pt50`, `pl30`
- Typography: `fw500`, `text-thirty2`, `font-heading`
- Cards: `default-box-shadow1`, `bdrs8`, `bdr1`
- Buttons: `theme-btn-one`, `btn-md`

---

## 5. Task Lifecycle States

| State | Description | UI Indicator |
|-------|-------------|--------------|
| `posted` | Task visible to workers | Badge: "Open" |
| `applications_received` | Workers have applied | Badge: "Applications" |
| `offer_accepted` | Worker selected, awaiting start | Badge: "Assigned" |
| `in_progress` | Work started | Badge: "In Progress" |
| `completed` | Work submitted for review | Badge: "Completed" |
| `disputed` | Under admin review | Badge: "Disputed" |

---

## 6. Routing Structure

```
src/app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── role-selection/
│
├── modules/
│   ├── client/
│   │   └── (client)/             → /client/dashboard
│   │       └── client-tasks/
│   │
│   ├── worker/
│   │   └── (worker)/              → /worker/dashboard
│   │       └── browse-tasks/
│   │
│   ├── contractor/
│   │   └── (contractor)/          → /contractor/dashboard
│   │       └── team-management/
│   │
│   └── admin/
│       └── (admin)/               → /admin/dashboard
│           └── disputes/
│
├── (job)/                         # Existing - unchanges
├── (service)/                     # Existing - unchanged
├── (dashboard)/                   # Existing - unchanged
└── (home)/                        # Existing - unchanged
```

---

## 7. Component Naming Conventions

### 7.1 New Components
- PascalCase: `TaskCreator.jsx`, `OfferReviewer.jsx`
- Prefixed by role when ambiguous: `ClientTaskCreator.jsx`, `WorkerTaskBrowser.jsx`

### 7.2 Module Organization
```
modules/{role}/components/{ContextualName}.jsx
modules/{role}/hooks/use{Action}.js
modules/{role}/store/{role}Store.js
```

---

## 8. State Management

### 8.1 Role-Specific Stores
```javascript
// src/modules/client/store/clientStore.js
import { create } from 'zustand';

const useClientStore = create((set) => ({
  tasks: [],
  selectedTask: null,
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  // ...
}));
```

### 8.2 Shared State
- Task states in `src/modules/shared/utils/taskStates.js`
- Cross-role data in main `src/store/` directory

---

## 9. What NOT to Change

| Area | Status | Reason |
|------|--------|--------|
| `globals.css` theme colors | **LOCKED** | Brand consistency |
| Existing component styling | **LOCKED** | Template integrity |
| Bootstrap overrides | **LOCKED** | Layout stability |
| Header/Footer variants | **LOCKED** | Navigation consistency |
| Icon library (Flaticon) | **LOCKED** | Visual language |
| Typography (DM Sans) | **LOCKED** | Brand font |

---

## 10. What TO Create

### Priority Order (Phase 01)

1. **Authentication Flow**
   - Registration with role selection
   - Login page
   - Profile creation

2. **Client Module**
   - Task creation form
   - Escrow funding UI
   - Offer review dashboard
   - Payment release interface

3. **Worker Module**
   - Task browsing & filtering
   - Offer submission form
   - Task completion workflow
   - Profile builder

4. **Contractor Module**
   - Team roster management
   - Subtask assignment
   - Payroll distribution UI

5. **Admin Module**
   - User verification dashboard
   - Dispute resolution interface
   - User management controls
   - Financial overview

---

## 11. Mock Data Guidelines

### 11.1 File Naming
```
src/data/
├── veritask/
│   ├── tasks.js           # All task mock data
│   ├── users.js            # All user mock data
│   ├── offers.js           # Offer mock data
│   ├── escrow.js           # Escrow mock data
│   └── disputes.js         # Dispute mock data
```

### 11.2 Data Population
- Include realistic sample data
- Cover all task lifecycle states
- Include all user roles
- Test edge cases (disputes, milestones)

---

## 12. Testing Checklist

- [ ] New pages compile without errors
- [ ] Tailwind classes render correctly
- [ ] Existing pages unaffected
- [ ] Module imports work correctly
- [ ] No theme/color bleed into existing components
- [ ] Build passes: `yarn build`

---

## 13. Implementation Notes

### Tailwind + Existing CSS Coexistence
```jsx
// CORRECT - Both systems work together
<div className="container custom-existing-class tailwind-utility">
  <div className="row">
    <div className="col-lg-6 existing-styled-component">
      <NewTailwindComponent />
    </div>
  </div>
</div>
```

### Module Isolation
```javascript
// Each module manages its own state and components
// Cross-module communication via shared utilities
import { TASK_STATES } from '@/modules/shared/utils/taskStates';
import { useClientStore } from '@/modules/client/store/clientStore';
```

---

## 14. Future Backend Integration Points

When backend is added:
1. Replace mock data files with API calls
2. Keep module structure identical
3. Replace Zustand stores with React Query/SWR
4. Add API routes in `src/app/api/`

---

**Document Owner:** Development Team  
**Last Updated:** January 27, 2026
