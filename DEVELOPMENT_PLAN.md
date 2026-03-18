# VeriTask V2 — Design & Development Plan
## Contractor & Worker User Flows

**Date:** 2026-03-18
**Stack:** Next.js 15 (App Router) · React 19 · Zustand · Bootstrap 5 · Mock Auth (localStorage)

---

## Table of Contents

1. [Flow Overview](#1-flow-overview)
2. [Data Architecture](#2-data-architecture)
3. [Phase 1 — Foundation Fixes](#3-phase-1--foundation-fixes)
4. [Phase 2 — Worker Flow](#4-phase-2--worker-flow)
5. [Phase 3 — Contractor Flow](#5-phase-3--contractor-flow)
6. [Phase 4 — Navigation & Cleanup](#6-phase-4--navigation--cleanup)
7. [File Change Index](#7-file-change-index)
8. [Acceptance Criteria](#8-acceptance-criteria)

---

## 1. Flow Overview

### 1.1 Contractor Flow
```
[1] Browse Projects      → /contractor-dashboard/manage-jobs
[2] View Project Details → /contractor-dashboard/task-details?taskId=
[3] Submit Proposal      → /contractor-dashboard/manage-projects?taskId=
[4] Track Applications   → /contractor-dashboard/manage-projects
[5] Build Team           → /contractor-dashboard/team
[6] Assign Project       → /contractor-dashboard/team/assign-projects
[7] Assign Milestones    → /contractor-dashboard/team/assign-milestones
[8] Monitor Progress     → /contractor-dashboard/team/monitor-milestones
[9] Approve Work         → /contractor-dashboard/team/monitor-milestones
[10] Submit to Client    → /contractor-dashboard/submit-deliverable?taskId=
[11] Distribute Payment  → /contractor-dashboard/payment-distribution
```

### 1.2 Worker Flow
```
[1] Browse Tasks         → /worker-dashboard/available-tasks
[2] View Task Details    → /worker-dashboard/available-tasks/details?taskId=
[3] Submit Proposal      → /worker-dashboard/proposal-submission?taskId=
[4] Track Applications   → /worker-dashboard/applied-tasks
[5] View Assignments     → /worker-dashboard/assigned-tasks
     (includes both: client-direct AND contractor-assigned)
[6] View Assignment      → /worker-dashboard/assigned-tasks/details?taskId=&source=
[7] Update Milestones    → (inline on detail page)
[8] Submit Work          → /worker-dashboard/work-submission?taskId=
[9] Track Completed      → /worker-dashboard/completed-tasks
[10] View Payments       → /worker-dashboard/payment-history
```

### 1.3 Cross-Role Interaction Map
```
CLIENT ──posts project──► [Available to Contractor & Worker]
                                │
            ┌───────────────────┴────────────────────┐
            ▼                                        ▼
     CONTRACTOR applies                       WORKER applies directly
     (single total bid)                      (proposal with amount)
            │                                        │
     CLIENT accepts                           CLIENT accepts
            │
     CONTRACTOR assigns project ──► WORKER "Assigned Tasks"
     CONTRACTOR assigns milestones ─► per worker
            │
     WORKER submits milestone work
            │
     CONTRACTOR reviews ──► approve / request revision
            │ (all approved)
     CONTRACTOR submits deliverable ──► CLIENT approves
            │
     ESCROW releases to CONTRACTOR
            │
     CONTRACTOR distributes to workers manually
```

---

## 2. Data Architecture

### 2.1 New localStorage Keys

#### `vt_contractor_teams`
Stores each contractor's team and all worker assignments.

```json
{
  "contractor-id-123": {
    "workers": [
      { "workerId": "w-001", "name": "Ali Hassan", "email": "ali@example.com" }
    ],
    "assignments": [
      {
        "taskId": "task-001",
        "taskTitle": "Mobile App Redesign",
        "contractorId": "contractor-id-123",
        "contractorName": "Acme Corp",
        "workerId": "w-001",
        "workerName": "Ali Hassan",
        "assignedAt": "2026-03-18T10:00:00.000Z",
        "milestones": [
          {
            "id": "m-001",
            "title": "UI Wireframes",
            "price": 300,
            "deadline": "2026-04-01",
            "status": "working",
            "progress": 0,
            "workerNote": "",
            "contractorNote": ""
          }
        ]
      }
    ]
  }
}
```

**Milestone status lifecycle:**
```
working → submitted → revision → working (loop) → completed
```

#### `vt_contractor_proposals`
Separate from worker proposals to avoid collision. Same shape as `vt_submitted_proposals` but with `role: "contractor"`.

```json
[
  {
    "id": "cp-001",
    "taskId": "task-001",
    "taskTitle": "Mobile App Redesign",
    "clientId": "client-001",
    "contractorId": "contractor-id-123",
    "contractorName": "Acme Corp",
    "totalBid": 2500,
    "timeline": "30",
    "coverLetter": "We have a team of 4 specialists...",
    "status": "pending",
    "submittedAt": "2026-03-18T10:00:00.000Z"
  }
]
```

### 2.2 New `mockAuth.js` Helpers

```js
// CONTRACTOR TEAM
getContractorTeam(contractorId)         → { workers[], assignments[] }
addWorkerToTeam(contractorId, worker)   → { ok, team }
removeWorkerFromTeam(contractorId, workerId) → { ok }

// CONTRACTOR ASSIGNMENTS
assignProjectToWorker(contractorId, taskId, taskTitle, workerId, workerName) → { ok }
assignMilestonesToWorker(contractorId, taskId, workerId, milestones[])       → { ok }
getAssignmentsForContractor(contractorId)    → assignments[]
updateMilestoneStatus(contractorId, taskId, workerId, milestoneId, { status, progress, note }) → { ok }

// WORKER ASSIGNMENTS (worker-side read)
getWorkerAssignedTasks(workerId)
  → merges: accepted proposals (client-direct) + contractor assignments
  → returns unified array with source: "client" | "contractor"

getContractorAssignmentsForWorker(workerId) → assignments[] from vt_contractor_teams

// WORKER SUBMISSION
submitWorkerWork(workerId, taskId, milestoneIds[], { note })
  → if source = contractor: sets milestones to "submitted" in vt_contractor_teams
  → if source = client: sets task status to "Work Submitted"

// CONTRACTOR PROPOSALS
submitContractorProposal(payload)        → saves to vt_contractor_proposals
getContractorProposals(contractorId)    → proposals[]
acceptContractorProposal(proposalId)    → sets task assignedContractorId, status "In Progress"

// PAYMENT DISTRIBUTION
distributePayment(contractorId, taskId, distributions[{ workerId, amount }]) → { ok }
getPaymentDistributions(workerId)       → distributions[] for worker payment history
```

### 2.3 Task Data Model Additions

When a contractor is hired, add these fields to the task:
```js
{
  assignedContractorId: "contractor-id-123",
  assignedContractorName: "Acme Corp",
  contractorProposalId: "cp-001",
  contractorBid: 2500
}
```

---

## 3. Phase 1 — Foundation Fixes

### 3.1 Auth Guard — Contractor DashboardLayout

**File:** `src/components/dashboard-contractor/DashboardLayout.jsx`

**Change:** Add the standard auth guard (already in worker layout):
```jsx
"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuthSession, getRoleFlow } from "@/utils/auth/mockAuth";

// Inside component:
const [isAuthorized, setIsAuthorized] = useState(false);

useEffect(() => {
  const session = getAuthSession();
  if (!session?.role) { router.replace("/seller/login"); return; }
  if (session.role !== "contractor") {
    router.replace(getRoleFlow(session.role)?.dashboardPath || "/seller/login");
    return;
  }
  setIsAuthorized(true);
}, [pathname, router]);

if (!isAuthorized) return null;
```

**Why:** Any user can currently navigate to `/contractor-dashboard` without authentication.

---

### 3.2 Fix TaskDiscoveryPanel Details Button Routing

**File:** `src/components/dashboard-shared/TaskDiscoveryPanel.jsx`

**Change:** Add `detailsPath` prop (defaults to `/worker-dashboard/available-tasks/details`):
```jsx
export default function TaskDiscoveryPanel({
  preferredLocation = "Karachi",
  proposalPath = "/worker-dashboard/proposal",
  detailsPath = "/worker-dashboard/available-tasks/details",  // ADD THIS
})
```

Update the Details button onClick to use `detailsPath` instead of the hardcoded string.

**Usage in contractor:**
```jsx
// TaskDiscoveryInfo.jsx (contractor)
<TaskDiscoveryPanel
  preferredLocation="United States"
  proposalPath="/contractor-dashboard/manage-projects"
  detailsPath="/contractor-dashboard/task-details"   // NEW
/>
```

**Why:** Contractor's "Details" currently redirects to worker dashboard.

---

### 3.3 Verify Milestone Persistence

**File:** `src/pages/api/tasks.js`

**Check:** Confirm that `milestones[]` array from `CreateTaskInfo` is saved when creating a task. If the API strips it, add `milestones` to the allowed fields in the POST handler.

**Why:** Contractor assigns milestones by their IDs — if milestones aren't persisted, the entire contractor milestone flow breaks.

---

## 4. Phase 2 — Worker Flow

### 4.1 Assigned Tasks Page

**Route:** `/worker-dashboard/assigned-tasks`
**File:** `src/components/dashboard-worker/section/AssignedTasksInfo.jsx`

**Current state:** Imports static `assignedTasksData` from `dashboardWorker.js`
**Target state:** Reads from `getWorkerAssignedTasks(session.id)`

#### UI Design

```
┌─────────────────────────────────────────────────────────┐
│  Assigned Tasks                          [2 Active]      │
├─────────────────────────────────────────────────────────┤
│  Filter: [All ▾]  [Client Direct ▾]  [Via Contractor ▾] │
├────────────────────────────┬──────────┬───────┬─────────┤
│  Task                      │ Source   │Status │ Action  │
├────────────────────────────┼──────────┼───────┼─────────┤
│  Mobile App Redesign       │ ● Client │ Active│[Details]│
│  E-commerce Backend        │ ◆ Acme   │Active │[Details]│
└────────────────────────────┴──────────┴───────┴─────────┘
```

**Source badge colors:**
- Client Direct → green badge (`#28a745`)
- Via Contractor → purple badge (`#5b2dff`)

**Data loading:**
```jsx
useEffect(() => {
  const session = getAuthSession();
  if (!session?.id) return;
  const tasks = getWorkerAssignedTasks(session.id);
  setAssignedTasks(tasks);
}, []);
```

**Unified task shape returned by `getWorkerAssignedTasks`:**
```js
{
  id, title, client, contractorName,
  source: "client" | "contractor",
  status, milestones[], budget, deadline
}
```

---

### 4.2 Assigned Task Detail Page

**Route:** `/worker-dashboard/assigned-tasks/details?taskId=&source=`
**File:** `src/components/dashboard-worker/section/AssignedTaskDetails.jsx`

**Current state:** Uses static mock data
**Target state:** Reads task from URL `taskId` param + source

#### UI Design

```
┌─────────────────────────────────────────────────────┐
│  ← Back to Assigned Tasks          [Status: Active] │
├─────────────────────────────────────────────────────┤
│  Mobile App Redesign                                │
│  Client: TechCorp Ltd  │  Source: Via Acme Corp     │
│  Budget: $2,500        │  Deadline: Apr 30          │
│  Category: Design & Creative                        │
├─────────────────────────────────────────────────────┤
│  YOUR MILESTONES                                    │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ UI Wireframes              [working]        │   │
│  │ Due: Apr 1  │  $300                         │   │
│  │ ████░░░░░░  30%                             │   │
│  │ [Update Progress ▾]  [Submit This Milestone]│   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │ Component Library          [submitted]      │   │
│  │ Due: Apr 10  │  $400                        │   │
│  │ ██████████  100%                            │   │
│  │ Awaiting contractor review...               │   │
│  └─────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  [Submit All Work]                                  │
└─────────────────────────────────────────────────────┘
```

**Interactions:**
- "Update Progress" dropdown → 0%, 25%, 50%, 75%, 100% → calls `updateMilestoneProgress()`
- "Submit This Milestone" → sets milestone status to `submitted` in `vt_contractor_teams`
- "Submit All Work" → bulk submit all non-submitted milestones

**Data loading:**
```jsx
const searchParams = useSearchParams();
const taskId = searchParams.get("taskId");
const source = searchParams.get("source"); // "client" | "contractor"

useEffect(() => {
  if (source === "contractor") {
    const data = getContractorAssignmentForWorker(session.id, taskId);
    setTask(data);
  } else {
    const data = getTaskById(taskId);
    setTask(data);
  }
}, [taskId, source]);
```

---

### 4.3 Work Submission Page

**Route:** `/worker-dashboard/work-submission?taskId=&source=`
**File:** `src/components/dashboard-shared/WorkSubmissionPanel.jsx`

**Current state:** Static data, not connected to session
**Target state:** Reads real task, saves submission

#### UI Design

```
┌──────────────────────────────────────────────────────┐
│  Submit Work — Mobile App Redesign                   │
├──────────────────────────────────────────────────────┤
│  Select Milestones to Submit                         │
│  ☑ UI Wireframes         ($300)                      │
│  ☑ Component Library     ($400)                      │
│  ☐ Final Handoff         ($300) — already submitted  │
├──────────────────────────────────────────────────────┤
│  Submission Note                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ Completed wireframes and full component set... │ │
│  └────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────┤
│  Attachments (optional)                              │
│  [+ Add File]                                        │
├──────────────────────────────────────────────────────┤
│  [Cancel]                        [Submit Work →]     │
└──────────────────────────────────────────────────────┘
```

**On Submit:**
- Calls `submitWorkerWork(workerId, taskId, selectedMilestoneIds, { note })`
- If `source === "contractor"` → milestones become `submitted` in `vt_contractor_teams`
  - Contractor sees these in Monitor Milestones view
- If `source === "client"` → task status → `"Work Submitted"`, appears in client's approval queue
- Show success toast → redirect back to `/worker-dashboard/assigned-tasks`

---

### 4.4 In-Progress Page

**Route:** `/worker-dashboard/in-progress`
**File:** `src/app/(dashboard)/worker-dashboard/in-progress/page.jsx` + section component

**Current state:** Static list
**Target state:** Reads tasks with `status = "In Progress"` from `getWorkerAssignedTasks()`

#### UI Design

```
┌──────────────────────────────────────────────────────┐
│  In Progress (3)                                     │
├──────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐ │
│  │ Mobile App Redesign          ◆ Via Acme Corp   │ │
│  │ 2 of 3 milestones done                         │ │
│  │ ████████░░  67%  │  Due: Apr 30                │ │
│  │ [View Details]  [Submit Work]                  │ │
│  └────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────┐ │
│  │ SEO Audit                    ● Client Direct   │ │
│  │ 0 of 1 milestones done                         │ │
│  │ ░░░░░░░░░░  0%   │  Due: Mar 25                │ │
│  │ [View Details]  [Submit Work]                  │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

---

### 4.5 Worker Dashboard Overview (Real Stats)

**File:** `src/components/dashboard-worker/section/DashboardInfo.jsx`

Replace all hardcoded numbers with computed values:

```jsx
useEffect(() => {
  const session = getAuthSession();
  if (!session?.id) return;
  const assigned = getWorkerAssignedTasks(session.id);
  setStats({
    available: getAllClientTasks().length,
    applied: getWorkerAppliedTasks(session.id).length,
    assigned: assigned.filter(t => t.status !== "Completed").length,
    completed: assigned.filter(t => t.status === "Completed").length,
  });
}, []);
```

---

## 5. Phase 3 — Contractor Flow

### 5.1 Task Details Page (New)

**Route:** `/contractor-dashboard/task-details?taskId=`
**New file:** `src/app/(dashboard)/contractor-dashboard/task-details/page.jsx`
**New component:** `src/components/dashboard-contractor/section/TaskDetailsInfo.jsx`

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  ← Back to Browse              [Apply for Project →]   │
├────────────────────────────────────────────────────────┤
│  Mobile App Redesign                                   │
│  ──────────────────────────────────────────────────── │
│  Client: TechCorp Ltd  │  Posted: Mar 15               │
│  Budget: $2,500 Fixed  │  Timeline: 30 days            │
│  Category: Design & Creative  │  Mode: Virtual         │
│  Location: United States                               │
├────────────────────────────────────────────────────────┤
│  Description                                           │
│  We need a complete redesign of our mobile app...      │
├────────────────────────────────────────────────────────┤
│  Milestones (3)                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ #1  UI Wireframes           Budget: $800          │ │
│  │     Deadline: Apr 1                               │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ #2  Component Library       Budget: $1,000        │ │
│  │     Deadline: Apr 15                              │ │
│  ├──────────────────────────────────────────────────┤ │
│  │ #3  Final Handoff           Budget: $700          │ │
│  │     Deadline: Apr 30                              │ │
│  └──────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────┤
│  Required Skills: Figma · React Native · Prototyping   │
├────────────────────────────────────────────────────────┤
│                          [Apply for Project →]         │
└────────────────────────────────────────────────────────┘
```

**"Apply for Project" button:** navigates to:
```
/contractor-dashboard/manage-projects?taskId={id}&taskTitle={title}&clientId={id}&milestones={json}
```

---

### 5.2 Contractor Proposal Submission

**Route:** `/contractor-dashboard/manage-projects?taskId=`
**File:** `src/components/dashboard-contractor/section/ProposalSubmissionInfo.jsx`

**Current state:** Renders shared `ProposalSubmissionPanel` (worker version)
**Target state:** Contractor-specific form with single total bid

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Apply for Project                                     │
├────────────────────────────────────────────────────────┤
│  Project: Mobile App Redesign                          │
│  Client Budget: $2,500  │  Milestones: 3               │
│  ──────────────────────────────────────────────────── │
│  Milestones Overview (read-only)                       │
│  • UI Wireframes — $800 — Due Apr 1                    │
│  • Component Library — $1,000 — Due Apr 15             │
│  • Final Handoff — $700 — Due Apr 30                   │
├────────────────────────────────────────────────────────┤
│  Your Bid                                              │
│  Total Bid Amount*   [$___________]                    │
│  Timeline (days)*    [$___________]                    │
├────────────────────────────────────────────────────────┤
│  Cover Letter*                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │ Our team specializes in mobile UI design...    │   │
│  └────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────┤
│  [Cancel]                   [Submit Proposal →]        │
└────────────────────────────────────────────────────────┘
```

**On Submit:** calls `submitContractorProposal({ contractorId, taskId, totalBid, timeline, coverLetter })`
**Validation:** totalBid > 0, timeline > 0, coverLetter not empty
**Success:** redirect to `/contractor-dashboard/manage-projects` (applied list view)

---

### 5.3 Applied Projects Tracking

**Route:** `/contractor-dashboard/manage-projects` (no query params = list view)
**File:** `src/components/dashboard-contractor/section/ProposalSubmissionInfo.jsx`

**Logic:** If URL has `?taskId=` → show proposal form. Otherwise → show applied projects list.

#### UI Design — Applied Projects List

```
┌────────────────────────────────────────────────────────┐
│  Applied Projects                                      │
├────────────────────────────────────────────────────────┤
│  Filter: [All ▾]  [Pending ▾]  [Accepted ▾]           │
├──────────────────┬────────┬─────────┬──────┬──────────┤
│  Project         │ Client │ My Bid  │Status│ Action   │
├──────────────────┼────────┼─────────┼──────┼──────────┤
│  Mobile App...   │TechCorp│ $2,200  │Pending│ —       │
│  E-commerce...   │Noor LLC│ $4,500  │Accepted│[Manage]│
│  SEO Campaign    │AcmeCo  │ $1,800  │Rejected│ —      │
└──────────────────┴────────┴─────────┴──────┴──────────┘
```

**Status badges:**
- Pending → yellow
- Accepted → green → shows "Manage Team" button
- Rejected → red

**"Manage Team" button** → `/contractor-dashboard/team?taskId=`

---

### 5.4 Team Management — Real Data

**Route:** `/contractor-dashboard/team`
**File:** `src/components/dashboard-contractor/section/TeamManagementInfo.jsx`

**Current state:** Hardcoded static workers array
**Target state:** Reads from `getContractorTeam(session.id)`, persists changes

#### UI Design — Team Members Tab

```
┌────────────────────────────────────────────────────────┐
│  My Team                             [+ Add Worker]    │
├────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐  │
│  │ 👤 Ali Hassan                                   │  │
│  │    ali.hassan@email.com                         │  │
│  │    2 active assignments                         │  │
│  │    [Assign Project]  [Remove ✕]                 │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │ 👤 Sara Khan                                    │  │
│  │    sara.khan@email.com                          │  │
│  │    1 active assignment                          │  │
│  │    [Assign Project]  [Remove ✕]                 │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

#### Add Worker Modal

```
┌──────────────────────────────────────┐
│  Add Worker to Team                  │
├──────────────────────────────────────┤
│  Search by name or email             │
│  [🔍 Search workers...            ]  │
│                                      │
│  Results:                            │
│  ○ James Walker  james@w.com  [Add]  │
│  ○ Olivia Carter oli@w.com   [Add]   │
└──────────────────────────────────────┘
```

**Search logic:** `getAllUsers().filter(u => u.role === "worker")` then filter by name/email query.
**On Add:** `addWorkerToTeam(contractorId, { workerId, name, email })`
**On Remove:** `removeWorkerFromTeam(contractorId, workerId)` — show confirm modal first

---

### 5.5 Assign Project to Worker

**Route:** `/contractor-dashboard/team/assign-projects`
**File:** `src/components/dashboard-contractor/section/TeamManagementInfo.jsx` (`activeTab="projects"`)

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Assign Projects                                       │
├────────────────────────────────────────────────────────┤
│  Worker: [Select Worker ▾]                             │
│  Project: [Select Accepted Project ▾]                  │
│                                    [Assign Project]    │
├────────────────────────────────────────────────────────┤
│  Current Assignments                                   │
├────────────────────────────────────────────────────────┤
│  Ali Hassan        → Mobile App Redesign     [Remove]  │
│  Sara Khan         → E-commerce Backend      [Remove]  │
└────────────────────────────────────────────────────────┘
```

**Worker dropdown:** populated from `getContractorTeam(contractorId).workers`
**Project dropdown:** populated from `getContractorProposals(contractorId).filter(p => p.status === "accepted")`
**On Assign:** `assignProjectToWorker(contractorId, taskId, workerId)`

---

### 5.6 Assign Milestones to Workers

**Route:** `/contractor-dashboard/team/assign-milestones`
**File:** `src/components/dashboard-contractor/section/TeamManagementInfo.jsx` (`activeTab="milestones"`)

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Assign Milestones                                     │
├────────────────────────────────────────────────────────┤
│  Project: [Mobile App Redesign ▾]                      │
├────────────────────────────────────────────────────────┤
│  Milestone            Assign To           Price   Due  │
│  ─────────────────────────────────────────────────── │
│  UI Wireframes        [Ali Hassan ▾]      $[300] [date]│
│  Component Library    [Sara Khan ▾]       $[400] [date]│
│  Final Handoff        [Ali Hassan ▾]      $[300] [date]│
├────────────────────────────────────────────────────────┤
│  [Save Assignments]                                    │
└────────────────────────────────────────────────────────┘
```

**Worker dropdown per milestone:** populated from `getContractorTeam(contractorId).workers`
**On Save:** `assignMilestonesToWorker(...)` for each milestone → creates entries in `vt_contractor_teams[contractorId].assignments`
**Effect:** Worker immediately sees these milestones in their "Assigned Tasks"

---

### 5.7 Monitor Milestones

**Route:** `/contractor-dashboard/team/monitor-milestones`
**File:** `src/components/dashboard-contractor/section/TeamManagementInfo.jsx` (`activeTab="monitor"`)

**Current state:** Hardcoded static data with static approve/reject buttons
**Target state:** Reads from `getAssignmentsForContractor(contractorId)`

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Monitor Milestones                                    │
│  Filter: [All ▾] [Submitted ▾] [In Progress ▾]        │
├────────────────────────────────────────────────────────┤
│  Mobile App Redesign                                   │
│  ┌──────────────────────────────────────────────────┐ │
│  │ UI Wireframes        Ali Hassan    [submitted]    │ │
│  │ Submitted Mar 18 · "Completed all wireframes..."  │ │
│  │ ████████░░  80%                                  │ │
│  │ [✓ Approve]  [↩ Request Revision]                │ │
│  └──────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Component Library    Sara Khan     [working]     │ │
│  │ Progress: 45%                                    │ │
│  │ ████░░░░░░                                       │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

**Approve:** `updateMilestoneStatus(..., { status: "completed" })` → milestone turns green
**Request Revision modal:**
```
┌─────────────────────────────────┐
│  Request Revision               │
│  Note for worker:               │
│  [Please redo the icons...]     │
│  [Send Revision Request]        │
└─────────────────────────────────┘
```
→ `updateMilestoneStatus(..., { status: "revision", contractorNote: "..." })`
→ Worker sees status change to "revision" on their detail page

**Submit Deliverable button** appears when ALL milestones across ALL workers are `completed`:
```
┌──────────────────────────────────────────────────────┐
│  ✓ All milestones approved. Ready to submit to client │
│                         [Submit Deliverable to Client]│
└──────────────────────────────────────────────────────┘
```

---

### 5.8 Submit Deliverable to Client (New)

**Route:** `/contractor-dashboard/submit-deliverable?taskId=`
**New file:** `src/app/(dashboard)/contractor-dashboard/submit-deliverable/page.jsx`
**New component:** `src/components/dashboard-contractor/section/DeliverableSubmissionInfo.jsx`

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Submit Project Deliverable                            │
│  Project: Mobile App Redesign                          │
├────────────────────────────────────────────────────────┤
│  Milestone Summary (all completed ✓)                   │
│  ✓ UI Wireframes — Ali Hassan                          │
│  ✓ Component Library — Sara Khan                       │
│  ✓ Final Handoff — Ali Hassan                          │
├────────────────────────────────────────────────────────┤
│  Delivery Note*                                        │
│  ┌────────────────────────────────────────────────┐   │
│  │ We have completed all milestones as specified. │   │
│  └────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────┤
│  [Cancel]             [Submit to Client →]             │
└────────────────────────────────────────────────────────┘
```

**On Submit:**
- Task status → `"Work Submitted"`
- Creates entry in client's `work-review-approval` queue (same as worker direct submit)
- Redirect to `/contractor-dashboard` with success toast

---

### 5.9 Payment Distribution

**Route:** `/contractor-dashboard/payment-distribution`
**File:** `src/components/dashboard-contractor/PaymentDistributionInfo.jsx`

**Current state:** UI shell with no logic
**Target state:** Shows released escrow, input per worker, validates total, saves

#### UI Design

```
┌────────────────────────────────────────────────────────┐
│  Payment Distribution                                  │
│  Project: Mobile App Redesign                          │
├────────────────────────────────────────────────────────┤
│  Released Amount:  $2,200                              │
│  Platform Fee (10%): $220                              │
│  Available to Distribute: $1,980                       │
├────────────────────────────────────────────────────────┤
│  Worker              Milestone(s)              Amount  │
│  ──────────────────────────────────────────────────── │
│  Ali Hassan          UI Wireframes,            [$700]  │
│                      Final Handoff                     │
│  Sara Khan           Component Library         [$800]  │
├────────────────────────────────────────────────────────┤
│  Total Assigned: $1,500  │  Remaining: $480 (your cut) │
│                                                        │
│  ⚠ Total cannot exceed $1,980                          │
│                          [Confirm Distribution →]      │
└────────────────────────────────────────────────────────┘
```

**Validation:** sum of worker amounts ≤ available amount
**On Confirm:** `distributePayment(contractorId, taskId, distributions[])`
- Updates each worker's payment history in `vt_contractor_teams` assignments
- Records contractor's own earnings (released - distributed)

---

### 5.10 Contractor Dashboard Overview

**File:** `src/components/dashboard-contractor/section/DashboardInfo.jsx`

**Current state:** Generic template stat cards
**Target state:** Real stats from data helpers

```jsx
useEffect(() => {
  const session = getAuthSession();
  const proposals = getContractorProposals(session.id);
  const team = getContractorTeam(session.id);
  const assignments = getAssignmentsForContractor(session.id);
  setStats({
    activeProjects: proposals.filter(p => p.status === "accepted").length,
    pendingProposals: proposals.filter(p => p.status === "pending").length,
    teamSize: team.workers.length,
    pendingMilestones: assignments.filter(a => a.milestones.some(m => m.status === "submitted")).length,
  });
}, []);
```

---

## 6. Phase 4 — Navigation & Cleanup

### 6.1 Contractor Sidebar (`src/data/dashboardContractor.js`)

| ID | Label | Path |
|---|---|---|
| 1 | Dashboard | `/contractor-dashboard` |
| 2 | Browse Projects | `/contractor-dashboard/manage-jobs` |
| 3 | Applied Projects | `/contractor-dashboard/manage-projects` |
| 4 | Teams (with sub-menu) | — |
| — | Team Members | `/contractor-dashboard/team` |
| — | Assign Projects | `/contractor-dashboard/team/assign-projects` |
| — | Assign Milestones | `/contractor-dashboard/team/assign-milestones` |
| — | Monitor Milestones | `/contractor-dashboard/team/monitor-milestones` |
| 5 | Payment Distribution | `/contractor-dashboard/payment-distribution` |
| 6 | Dispute Submission | `/contractor-dashboard/dispute-submission` |
| 7 | My Profile | `/contractor-dashboard/my-profile` |
| 8 | Logout | `/seller/login` |

*Remove: "Manage Services", "Create Projects", "Add Services", "Payroll", "Audit", "Escrow" from visible sidebar (keep routes accessible but hide from nav for V2 scope)*

### 6.2 Worker Sidebar (`src/data/dashboardWorker.js`)

Ensure these are present and in this order:

| Label | Path |
|---|---|
| Dashboard | `/worker-dashboard` |
| Available Tasks | `/worker-dashboard/available-tasks` |
| Applied Tasks | `/worker-dashboard/applied-tasks` |
| Assigned Tasks | `/worker-dashboard/assigned-tasks` |
| In Progress | `/worker-dashboard/in-progress` |
| Work Submission | `/worker-dashboard/work-submission` |
| Completed Tasks | `/worker-dashboard/completed-tasks` |
| Payment History | `/worker-dashboard/payment-history` |
| My Profile | `/worker-dashboard/my-profile` |
| Logout | `/seller/login` |

### 6.3 Metadata Title Cleanup

Replace all occurrences of `"Freeio - Freelance Marketplace React/Next Js Template"` with `"VeriTask"` across all `page.jsx` files.

---

## 7. File Change Index

### New Files to Create

| File | Purpose |
|---|---|
| `src/app/(dashboard)/contractor-dashboard/task-details/page.jsx` | Contractor task detail page |
| `src/components/dashboard-contractor/section/TaskDetailsInfo.jsx` | Task detail component |
| `src/app/(dashboard)/contractor-dashboard/submit-deliverable/page.jsx` | Submit deliverable page |
| `src/components/dashboard-contractor/section/DeliverableSubmissionInfo.jsx` | Deliverable submission component |

### Files to Modify

| File | Change |
|---|---|
| `src/utils/auth/mockAuth.js` | Add 12 new helper functions for teams, assignments, contractor proposals, distributions |
| `src/components/dashboard-contractor/DashboardLayout.jsx` | Add auth guard |
| `src/components/dashboard-shared/TaskDiscoveryPanel.jsx` | Add `detailsPath` prop |
| `src/components/dashboard-contractor/section/TaskDiscoveryInfo.jsx` | Pass `detailsPath` prop |
| `src/components/dashboard-contractor/section/ProposalSubmissionInfo.jsx` | Contractor-specific proposal form + applied list view |
| `src/components/dashboard-contractor/section/TeamManagementInfo.jsx` | Replace static data with real data, all 4 tabs |
| `src/components/dashboard-contractor/section/DashboardInfo.jsx` | Real stats |
| `src/components/dashboard-contractor/PaymentDistributionInfo.jsx` | Real distribution logic |
| `src/components/dashboard-worker/section/AssignedTasksInfo.jsx` | Real data |
| `src/components/dashboard-worker/section/AssignedTaskDetails.jsx` | Real data via URL params |
| `src/components/dashboard-shared/WorkSubmissionPanel.jsx` | Connect to real task + save submission |
| `src/components/dashboard-worker/section/DashboardInfo.jsx` | Real stats |
| `src/data/dashboardContractor.js` | Updated sidebar nav |
| `src/data/dashboardWorker.js` | Updated sidebar nav |
| `src/pages/api/tasks.js` | Verify milestones[] is persisted |

---

## 8. Acceptance Criteria

### Worker Flow ✓
- [ ] Worker can log in and is redirected to `/worker-dashboard`
- [ ] Worker sees available tasks from real client posts
- [ ] Worker can apply to a task and see it appear in Applied Tasks
- [ ] Worker sees both client-direct AND contractor-assigned tasks in Assigned Tasks
- [ ] Worker can see milestone breakdown on assigned task detail page
- [ ] Worker can update milestone progress percentage
- [ ] Worker can submit work with milestone selection and note
- [ ] After worker submits (contractor path): contractor sees it in Monitor Milestones
- [ ] After worker submits (client path): client sees it in Work Review & Approval

### Contractor Flow ✓
- [ ] Contractor cannot access dashboard without login (auth guard)
- [ ] Contractor can browse client projects and view task details with milestones
- [ ] Contractor can submit a proposal (single total bid) for a project
- [ ] Contractor can see their applied proposals and their statuses
- [ ] Contractor can add workers to their team (search from registered workers)
- [ ] Contractor can assign an accepted project to a team worker
- [ ] Contractor can assign individual milestones to specific workers
- [ ] Workers assigned by contractor see those tasks in their Assigned Tasks
- [ ] Contractor can view milestone submission from workers (Monitor Milestones)
- [ ] Contractor can approve or request revision on submitted milestones
- [ ] When all milestones are approved, contractor can submit deliverable to client
- [ ] Client sees contractor's submission in Work Review & Approval
- [ ] After client approves, contractor can distribute payment to workers
- [ ] Worker sees distributed payment in their Payment History

---

*Plan version: 1.0 — 2026-03-18*
