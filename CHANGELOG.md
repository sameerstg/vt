# VeriTask Frontend — Changelog

---

## [Unreleased] — 2026-03-18

### Auth & Routing

- **Renamed `/seller/*` URLs to `/client/*`** — `/seller/login` → `/client/login`, `/seller/register` → `/client/register`. Updated all auth guards, logout handlers, sidebar nav, header components, and breadcrumbs across the entire codebase. Created `src/app/client/` route directory.
- **Auth guard on Contractor DashboardLayout** — Contractor pages were previously accessible without login. Added the standard role-check guard (already present on worker/admin layouts). Unauthenticated users redirect to `/client/login`; wrong-role users redirect to their own dashboard.

### Worker Flow

- **TaskDiscoveryPanel — `detailsPath` prop** — Fixed hardcoded `/worker-dashboard/available-tasks/details` in the Details button. Added `detailsPath` prop (defaults to worker path). Contractor's `TaskDiscoveryInfo` now passes `/contractor-dashboard/task-details`.
- **Assigned Tasks — real data** — `TasksInfo.jsx` (assigned filter) now merges `getWorkerAssignedTasks()` alongside static data. Displays a Source column: green "Client Direct" badge or purple "Via Contractor" badge.
- **Assigned Task Details — real data** — `AssignedTaskDetails.jsx` fully rewritten. Reads `?taskId=&source=` from URL, loads real task or contractor assignment, supports inline milestone progress update (0/25/50/75/100%) and per-milestone submit. Shows revision notes from contractor.
- **Work Submission — real data** — `WorkSubmissionInfo.jsx` fully rewritten. Reads `?taskId=&source=`, loads real milestones, checkbox selection, calls `submitWorkerWork()`, redirects to Assigned Tasks on success.
- **In-Progress routing fixed** — "Submit Work" button in task list now routes to `/worker-dashboard/work-submission?taskId=&source=` (was pointing to old manage-projects path).
- **Worker Dashboard stats** — `DashboardInfo.jsx` now shows real "Available Tasks" count from `getAllClientTasks()`.

### Contractor Flow

- **Task Details page (new)** — `/contractor-dashboard/task-details?taskId=` shows full task info, milestone list, skills, and "Apply for Project" button that pre-fills the proposal form.
- **Proposal Submission — contractor-specific** — `ProposalSubmissionInfo.jsx` fully rewritten. Dual-view: when `?taskId=` present shows contractor proposal form (total bid, timeline, cover letter, milestones preview); otherwise shows Applied Projects list with status filter (all/pending/accepted/rejected) and "Manage Team" button for accepted proposals.
- **Team Management — real data** — `TeamManagementInfo.jsx` fully rewritten with 4 live data tabs:
  - *Team Members*: add workers via search modal (`getAllUsers()` filtered to `role=worker`), remove with confirm, shortcut to Assign Projects.
  - *Assign Projects*: dropdown of accepted proposals + team workers, persists via `assignProjectToWorker()`.
  - *Assign Milestones*: per-milestone worker assignment table, persists via `assignMilestonesToWorker()`.
  - *Monitor Milestones*: filterable view, Approve (→ `completed`) or Request Revision (modal with note → `revision`) actions. Shows "Submit Deliverable to Client" banner when all milestones are approved.
- **Submit Deliverable (new)** — `/contractor-dashboard/submit-deliverable?taskId=` shows milestone summary, delivery note form, calls `updateMockTaskStatus("Work Submitted")` and redirects to dashboard.
- **Contractor Dashboard stats** — `DashboardInfo.jsx` now shows real stats: Active Projects, Pending Proposals, Team Size, Milestones to Review.
- **Payment Distribution — real data** — `PaymentDistributionInfo.jsx` now loads real team workers and completed milestones dynamically. On confirm, calls `distributePayment()` to persist to `localStorage`.

### Data Layer (`src/utils/auth/mockAuth.js`)

Added 18 new exported helper functions:

**Contractor Teams (`vt_contractor_teams`)**
- `getContractorTeam(contractorId)`
- `addWorkerToTeam(contractorId, worker)`
- `removeWorkerFromTeam(contractorId, workerId)`
- `assignProjectToWorker(contractorId, taskId, taskTitle, workerId, workerName)`
- `assignMilestonesToWorker(contractorId, taskId, workerId, milestones[])`
- `getAssignmentsForContractor(contractorId)`
- `updateMilestoneStatus(contractorId, taskId, workerId, milestoneId, updates)`
- `updateMilestoneProgress(contractorId, taskId, workerId, milestoneId, progress)`
- `getContractorAssignmentForWorker(workerId, taskId)`
- `getWorkerAssignedTasks(workerId)` — merges client-direct (accepted proposals) + contractor assignments
- `submitWorkerWork(workerId, taskId, milestoneIds[], { note })` — routes to contractor or client path

**Contractor Proposals (`vt_contractor_proposals`)**
- `submitContractorProposal(payload)`
- `getContractorProposals(contractorId)`
- `acceptContractorProposal(proposalId)`

**Payment Distribution (`vt_payment_distributions`)**
- `distributePayment(contractorId, taskId, distributions[])`
- `getPaymentDistributions(workerId)`

### Navigation

- **Worker sidebar** — Corrected labels and paths: Available Tasks, Applied Tasks, Assigned Tasks, In Progress, Work Submission, Completed Tasks, Payment History, My Profile, Logout (`/client/login`). Removed stale "Proposal Submission" and "Projects" entries.
- **Contractor sidebar** — Removed "Manage Services". Added Browse Projects, Applied Projects, Teams (with 4 sub-items), Payment Distribution, Dispute Submission, My Profile, Logout.

### New Pages

| Route | Component |
|---|---|
| `/contractor-dashboard/task-details` | `TaskDetailsInfo.jsx` |
| `/contractor-dashboard/submit-deliverable` | `DeliverableSubmissionInfo.jsx` |

### Cleanup

- **Metadata titles** — Replaced all 116 occurrences of `"Freeio - Freelance Marketplace React/Next Js Template"` with `"VeriTask"` across all `page.jsx` files.

---

## Prior to 2026-03-18

- Initial prototype with static mock data across worker, contractor, client, and admin dashboards.
- Mock auth backed by `localStorage` + `mockUsers.json`.
- Client dashboard: task creation, proposal review, work approval, escrow flow.
- Worker dashboard: task discovery, proposal submission, applied tasks.
- Admin dashboard: user management, task monitoring, financial overview, dispute resolution.
