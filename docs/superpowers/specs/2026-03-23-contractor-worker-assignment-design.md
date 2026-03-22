# Contractor → Worker Assignment Feature Design
**Date:** 2026-03-23
**Status:** Approved

---

## Overview

Enable contractors to assign team members (workers) to projects or specific milestones, set a pay amount and deadline for each assignment, and allow workers to accept or decline those assignments from a new "My Assignments" page modeled after "Manage Jobs".

---

## Data Model

### `WorkerAssignment`
```js
{
  id: string,                    // "asgn-001"
  contractorId: string,          // "contractor-001"
  workerId: string,              // "worker-021" — from team member record
  workerName: string,            // copied from team member at creation time; not updated later
  projectId: string,             // "proj-003"
  projectTitle: string,          // copied from project at creation time; not updated later
  milestoneId: string | null,    // null = project-level assignment
  milestoneTitle: string | null, // null when milestoneId is null; copied at creation
  pay: number,                   // flat USD amount contractor pays this worker
  deadline: string,              // ISO 8601 date e.g. "2026-04-15"
  status: "PENDING" | "ACCEPTED" | "DECLINED",  // always "PENDING" on creation
  note: string | null,           // optional message; null if not provided
  createdAt: string,             // ISO 8601 timestamp, set server-side
}
```

---

## API — `/api/assignments`

### GET
| Query | Behavior |
|-------|----------|
| `?contractorId=x` | Returns assignments where `contractorId === x` |
| `?workerId=x` | Returns assignments where `workerId === x` |
| both or neither | Returns `[]` (no error, no 400) |

Response: `{ "success": true, "data": [ ...WorkerAssignment ] }`

### POST — Create assignment
**Required:** `action:"create"`, `contractorId`, `workerId`, `workerName`, `projectId`, `projectTitle`, `pay`, `deadline`
**Optional:** `milestoneId`, `milestoneTitle`, `note`

Created record always has `status: "PENDING"` and `createdAt` set server-side.

- Success: `{ "success": true, "data": WorkerAssignment }`
- Missing required fields: `{ "success": false, "error": "Missing required fields" }` (400)

### PUT — Respond or Cancel
**Worker respond:**
```json
{ "action": "respond", "assignmentId": "asgn-001", "status": "ACCEPTED" }
```
- Valid `status` values: `"ACCEPTED"` or `"DECLINED"` only; any other value → 400 `"Invalid status"`
- Assignment not found → 404 `"Assignment not found"`
- Already ACCEPTED or DECLINED → 400 `"Assignment already responded to"`
- No ownership check (intentional for mock/demo — workerId not verified server-side)
- Success: `{ "success": true, "data": WorkerAssignment }`

**Contractor cancel:**
```json
{ "action": "cancel", "assignmentId": "asgn-001" }
```
- Only PENDING assignments can be cancelled; others → 400 `"Cannot cancel a responded assignment"`
- Removes the assignment from the store
- Success: `{ "success": true }`

---

## Contractor Side — `/contractor/team`

Extend `TeamManagementInfo.jsx` with two tabs:

### Tab 1: Team Members (existing)
Add an **"Assign"** button to each member row alongside the existing Remove button.

### Tab 2: Assignments (new)
Fetch from `GET /api/assignments?contractorId=contractor-001`. Shows all assignments sent by this contractor.

Columns: Worker Name | Project (+ "› Milestone" suffix if `milestoneId` is set) | Pay | Deadline | Status badge | Cancel button (PENDING only — calls PUT `action:"cancel"`)

### Assign Modal
Triggered by clicking "Assign" next to a team member. The selected member's `workerId` and `workerName` are pre-filled.

Fields:
1. **Project** — dropdown from `GET /api/contractor?type=assigned` → `data.assignedProjects[]`. The project objects include `id`, `title`, and `budgetModel` (`"MILESTONE"` or `"FIXED"`).
2. **Milestone** — dropdown, rendered only when the selected project has `budgetModel === "MILESTONE"`. Populated from `GET /api/worker/milestones?projectId=x` → `data[]` each with `id`, `title`, `amount`.
3. **Pay ($)** — number input, required, min 1
4. **Deadline** — date input, required
5. **Note** — textarea, optional

On submit → POST `/api/assignments` → close modal → switch to Assignments tab → refresh.

**UI states:** loading spinner while fetching; empty-state message ("No assignments yet") in Assignments tab; inline error alert on failure.

---

## Worker Side — `/worker/assignments`

### New files
- `src/app/worker/assignments/page.jsx` — page wrapper; no props; sets metadata title "VeriTask - My Assignments"
- `src/app/worker/components/section/WorkerAssignmentsInfo.jsx` — client component; fetches its own data internally from `GET /api/assignments?workerId=worker-021` (hardcoded mock ID)

### Tabs
- **Pending** — Accept + Decline buttons per row
- **Accepted** — read-only
- **Declined** — read-only

### Each row
- Project title (+ `› Milestone: X` if `milestoneId` is set)
- Contractor: "contractor-001"
- Pay: "$800"
- Deadline: formatted as locale date string
- Note (muted text, only shown if `note !== null`)
- Accept / Decline buttons (Pending tab only)

### Accept/Decline flow
Click → PUT `{ action: "respond", assignmentId, status }` → re-fetch list (all tabs) → row appears in correct tab.

**UI states:** loading spinner; per-tab empty state ("No pending assignments", etc.) styled to match Manage Jobs; inline error alert on failure.

---

## Sidebar Navigation Changes

Nav items live in TypeScript data files; the `.jsx` components render from these arrays using `slice()` index ranges.

### Worker — `src/data/dashboardWorker.ts`
Add one new item to `dasboardNavigation`:
```ts
{ id: 16, name: "My Assignments", icon: "flaticon-work", path: "/worker/assignments" }
```
Append after id:7 (Payouts). No slice changes needed (worker nav renders the whole array).

### Contractor — `src/data/dashboardContractor.ts`
Add "Team" nav item in the "Organize and Manage" section:
```ts
{ id: 16, name: "Team", icon: "flaticon-team", path: "/contractor/team" }
```
Insert at array index 10 (after "Manage Jobs", before "Manage Project"). Then update `DashboardNavigation.jsx` slice bounds: `slice(8,13)` → `slice(8,14)` and `slice(13,15)` → `slice(14,16)`.

Note: "Manage Project" (id:11, `/contractor/manage-projects`) already exists in the contractor nav — no change needed for it.

---

## Mock Data — Pre-seeded Assignments

All 3 assignments use `workerId: "worker-021"` so the worker assignments page shows all three statuses on first load. The contractor `contractor-001` sends all of them.

```js
const assignments = new Map([
  ["asgn-001", {
    id: "asgn-001",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-003",           // resolve to actual ID from allProjects at impl time
    projectTitle: "E-commerce Platform",
    milestoneId: null,
    milestoneTitle: null,
    pay: 800,
    deadline: "2026-04-30",
    status: "PENDING",
    note: "Please handle the frontend implementation",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }],
  ["asgn-002", {
    id: "asgn-002",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-003",
    projectTitle: "E-commerce Platform",
    milestoneId: "ms-001",           // resolve to actual milestoneId at impl time
    milestoneTitle: "Design Phase",
    pay: 400,
    deadline: "2026-04-15",
    status: "ACCEPTED",
    note: null,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  }],
  ["asgn-003", {
    id: "asgn-003",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-005",           // resolve to actual ID from allProjects at impl time
    projectTitle: "Mobile App Redesign",
    milestoneId: null,
    milestoneTitle: null,
    pay: 600,
    deadline: "2026-05-01",
    status: "DECLINED",
    note: "Backend API integration work",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  }],
]);
```

At implementation time, replace placeholder `projectId`/`projectTitle`/`milestoneId` with real IDs from `allProjects` that have `contractorId === "contractor-001"`.

---

## Mock Data Prerequisite — Projects need `contractorId`

The contractor API at `/api/contractor` filters projects by `p.contractorId === "contractor-001"`, but the current mock projects in `src/app/api/projects/` have no `contractorId` field. The assign modal project dropdown will be empty without this.

**Fix:** At implementation time, add `contractorId: "contractor-001"` to at least 3 projects in the mock projects array. Pick projects with `budgetModel: "MILESTONE"` for at least 1 of them so the milestone dropdown can be tested. Confirm the first project's milestones are accessible via `/api/worker/milestones?projectId=x`.

---

## Files to Create / Modify

| File | Change |
|------|--------|
| `src/app/api/assignments/route.js` | **New** — GET + POST + PUT, in-memory Map, pre-seeded data |
| `src/app/api/projects/` *(mock data)* | **Modify** — add `contractorId: "contractor-001"` to 3+ projects |
| `src/app/contractor/components/section/TeamManagementInfo.jsx` | **Extend** — Assignments tab + Assign modal |
| `src/data/dashboardContractor.ts` | **Modify** — add "Team" nav item at index 10 |
| `src/app/contractor/components/header/DashboardNavigation.jsx` | **Modify** — update slice bounds after adding nav item |
| `src/app/worker/components/section/WorkerAssignmentsInfo.jsx` | **New** — Pending/Accepted/Declined tabs |
| `src/app/worker/assignments/page.jsx` | **New** — page wrapper |
| `src/data/dashboardWorker.ts` | **Modify** — add "My Assignments" nav item |

---

## Out of Scope

- Real notifications / emails
- Payment processing
- Worker browsing contractor projects independently
- Multi-worker assignment to the same project/milestone
- Ownership/auth validation (intentional omission for mock)
