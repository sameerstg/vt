# Contractor → Worker Assignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable contractors to assign team workers to projects/milestones with pay and deadline, and let workers accept or decline those assignments from a dedicated page.

**Architecture:** A new independent `/api/assignments` route stores `WorkerAssignment` records in an in-memory Map. The contractor's Team Management page gains an Assignments tab and Assign modal. The worker gets a new `/worker/assignments` page modeled after Manage Jobs.

**Tech Stack:** Next.js 14 App Router, React client components, Bootstrap + custom CSS, in-memory Maps for mock data (no real DB), TypeScript data files for sidebar nav items.

---

## File Map

| File | Role |
|------|------|
| `src/app/api/assignments/route.js` | New API — GET/POST/PUT for assignments |
| `src/app/api/projects/data.ts` | Add `contractorId` field to Project interface + 3 projects |
| `src/data/dashboardContractor.ts` | Add "Team" nav item at index 10 |
| `src/app/contractor/components/header/DashboardNavigation.jsx` | Fix slice bounds after nav item insertion |
| `src/data/dashboardWorker.ts` | Add "My Assignments" nav item |
| `src/app/contractor/components/section/TeamManagementInfo.jsx` | Add Assignments tab + Assign modal |
| `src/app/worker/components/section/WorkerAssignmentsInfo.jsx` | New — Pending/Accepted/Declined tabs |
| `src/app/worker/assignments/page.jsx` | New — page wrapper |

---

## Task 1: Add `contractorId` to project mock data

**Files:**
- Modify: `src/app/api/projects/data.ts`

The contractor API filters `p.contractorId === "contractor-001"` but the Project type has no `contractorId` field. The assign modal project dropdown will be empty without this fix.

- [ ] **Step 1: Add `contractorId` to the Project interface**

In `src/app/api/projects/data.ts`, add the optional field to the interface:

```ts
export interface Project {
  id: string;
  clientId: string;
  contractorId?: string;   // ← add this line
  title: string;
  // ... rest unchanged
}
```

- [ ] **Step 2: Add `contractorId: "contractor-001"` to 3 projects**

Add to `proj-001` (MILESTONE — has milestones ms-001 to ms-004), `proj-003` (MILESTONE — has milestones ms-005+), and `proj-005` (FIXED — tests non-milestone flow):

```ts
// proj-001 — add contractorId
{
  id: "proj-001",
  clientId: "client-001",
  contractorId: "contractor-001",   // ← add
  title: "Website Redesign Project",
  // ... rest unchanged
},

// proj-003 — add contractorId
{
  id: "proj-003",
  clientId: "client-001",
  contractorId: "contractor-001",   // ← add
  title: "Mobile App for Food Delivery",
  // ... rest unchanged
},

// proj-005 — add contractorId
{
  id: "proj-005",
  clientId: "client-001",
  contractorId: "contractor-001",   // ← add
  title: "Logo Design for Startup",
  // ... rest unchanged
},
```

- [ ] **Step 3: Verify dev server compiles without errors**

Start dev server if not running: `npm run dev`
Navigate to http://localhost:3000/contractor/my-projects — should load without compile errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/projects/data.ts
git commit -m "feat: add contractorId field to project mock data for contractor-001"
```

---

## Task 2: Create `/api/assignments` route

**Files:**
- Create: `src/app/api/assignments/route.js`

- [ ] **Step 1: Create the file with in-memory store and pre-seeded data**

```js
// src/app/api/assignments/route.js
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const assignments = new Map([
  ["asgn-001", {
    id: "asgn-001",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-001",
    projectTitle: "Website Redesign Project",
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
    projectId: "proj-001",
    projectTitle: "Website Redesign Project",
    milestoneId: "ms-001",
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
    projectId: "proj-003",
    projectTitle: "Mobile App for Food Delivery",
    milestoneId: null,
    milestoneTitle: null,
    pay: 600,
    deadline: "2026-05-01",
    status: "DECLINED",
    note: "Backend API integration work",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  }],
]);

export async function GET(request) {
  await delay(200);
  const { searchParams } = new URL(request.url);
  const contractorId = searchParams.get("contractorId");
  const workerId = searchParams.get("workerId");

  if (!contractorId && !workerId) {
    return Response.json({ success: true, data: [] });
  }

  const all = Array.from(assignments.values());
  let result = all;

  if (contractorId) result = result.filter(a => a.contractorId === contractorId);
  if (workerId) result = result.filter(a => a.workerId === workerId);

  return Response.json({ success: true, data: result });
}

export async function POST(request) {
  await delay(300);
  const body = await request.json();

  if (body.action !== "create") {
    return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
  }

  const { contractorId, workerId, workerName, projectId, projectTitle, pay, deadline } = body;
  if (!contractorId || !workerId || !workerName || !projectId || !projectTitle || !pay || !deadline) {
    return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const id = `asgn-${Date.now()}`;
  const record = {
    id,
    contractorId,
    workerId,
    workerName,
    projectId,
    projectTitle,
    milestoneId: body.milestoneId || null,
    milestoneTitle: body.milestoneTitle || null,
    pay: parseFloat(pay),
    deadline,
    status: "PENDING",
    note: body.note || null,
    createdAt: new Date().toISOString(),
  };

  assignments.set(id, record);
  return Response.json({ success: true, data: record });
}

export async function PUT(request) {
  await delay(200);
  const body = await request.json();

  if (body.action === "respond") {
    const { assignmentId, status } = body;
    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return Response.json({ success: false, error: "Invalid status" }, { status: 400 });
    }
    const record = assignments.get(assignmentId);
    if (!record) {
      return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }
    if (record.status !== "PENDING") {
      return Response.json({ success: false, error: "Assignment already responded to" }, { status: 400 });
    }
    record.status = status;
    assignments.set(assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "cancel") {
    const { assignmentId } = body;
    const record = assignments.get(assignmentId);
    if (!record) {
      return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }
    if (record.status !== "PENDING") {
      return Response.json({ success: false, error: "Cannot cancel a responded assignment" }, { status: 400 });
    }
    assignments.delete(assignmentId);
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
```

- [ ] **Step 2: Verify API responds**

With dev server running, open: http://localhost:3000/api/assignments?workerId=worker-021

Expected response:
```json
{
  "success": true,
  "data": [
    { "id": "asgn-001", "status": "PENDING", ... },
    { "id": "asgn-002", "status": "ACCEPTED", ... },
    { "id": "asgn-003", "status": "DECLINED", ... }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/assignments/route.js
git commit -m "feat: add assignments API with in-memory store and mock seed data"
```

---

## Task 3: Update sidebar nav data files

**Files:**
- Modify: `src/data/dashboardWorker.ts`
- Modify: `src/data/dashboardContractor.ts`
- Modify: `src/app/contractor/components/header/DashboardNavigation.jsx`

### Worker nav — add "My Assignments"

- [ ] **Step 1: Append item to worker nav array**

In `src/data/dashboardWorker.ts`, add after the `id: 7` Payouts entry:

```ts
{
    id: 16,
    name: "My Assignments",
    icon: "flaticon-work",
    path: "/worker/assignments",
},
```

Worker `DashboardNavigation.jsx` uses `slice(0, 8)` for the first section, which currently has only 4 active items (indices 0–3). The new item at index 4 still falls within `slice(0, 8)` — **no slice bound changes needed** for the worker nav.

### Contractor nav — add "Team"

- [ ] **Step 2: Insert "Team" at index 10 in contractor nav array**

In `src/data/dashboardContractor.ts`, insert after the `id: 10` (Manage Jobs) entry and before the `id: 11` (Manage Project) entry. The new item's `path` is `/contractor/team` (page already exists):

```ts
{
    id: 16,
    name: "Team",
    icon: "flaticon-team",
    path: "/contractor/team",
},
```

After insertion the array has 16 items (indices 0–15). Indices shift: Manage Project moves from 10 → 11, Add Services 11 → 12, Create Project 12 → 13, My Profile 13 → 14, Logout 14 → 15.

- [ ] **Step 3: Fix contractor DashboardNavigation slice bounds**

In `src/app/contractor/components/header/DashboardNavigation.jsx`, only the "Organize and Manage" and "Account" slices change. The first slice `slice(0, 8)` is **unchanged**:

```jsx
// "Start" section — leave as-is:
{dasboardNavigation.slice(0, 8).map(...)}

// "Organize and Manage" — change slice(8, 13) → slice(8, 14):
{dasboardNavigation.slice(8, 14).map((item,i) => (

// "Account" — change slice(13, 15) → slice(14, 16):
{dasboardNavigation.slice(14, 16).map((item,i) => (
```

- [ ] **Step 4: Verify nav renders correctly**

Open http://localhost:3000/contractor/team — "Team" should appear in the mobile dropdown under "Organize and Manage". Open http://localhost:3000/worker/dashboard — "My Assignments" should appear in the worker mobile dropdown.

- [ ] **Step 5: Commit**

```bash
git add src/data/dashboardWorker.ts src/data/dashboardContractor.ts src/app/contractor/components/header/DashboardNavigation.jsx
git commit -m "feat: add My Assignments (worker) and Team (contractor) nav items"
```

---

## Task 4: Extend TeamManagementInfo.jsx — Assignments tab + Assign modal

**Files:**
- Modify: `src/app/contractor/components/section/TeamManagementInfo.jsx`

This is the largest task. We're adding:
1. A second "Assignments" tab to the existing Team Management page
2. An "Assign" button per team member row that opens a modal
3. The modal with project/milestone/pay/deadline fields

- [ ] **Step 0: Confirm the only importer of TeamManagementInfo.jsx**

Run: `grep -r "TeamManagementInfo" src/ --include="*.jsx" --include="*.tsx" -l`
Expected output: only `src/app/contractor/team/page.jsx` — the default export name stays the same so no import changes needed.

- [ ] **Step 1: Confirm `/api/worker/milestones` exists**

The assign modal fetches milestones from this endpoint. Verify `src/app/api/worker/milestones/route.js` exists (it does — confirmed in codebase). No action needed, just awareness.

- [ ] **Step 2: Replace TeamManagementInfo.jsx with the extended version**

```jsx
"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  ACCEPTED: { label: "Accepted", class: "badge-completed" },
  DECLINED: { label: "Declined", class: "badge-cancelled" },
};

export default function TeamManagementInfo() {
  const [activeTab, setActiveTab] = useState("members"); // "members" | "assignments"
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", rate: "" });
  const [assignments, setAssignments] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");

  // Assign modal state
  const [assignTarget, setAssignTarget] = useState(null); // { workerId, workerName }
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [assignForm, setAssignForm] = useState({
    projectId: "",
    projectTitle: "",
    budgetModel: "",
    milestoneId: "",
    milestoneTitle: "",
    pay: "",
    deadline: "",
    note: "",
  });

  useEffect(() => {
    fetchTeam();
    fetchAssignments();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contractor?type=team");
      const data = await res.json();
      if (data.success) setTeam(data.data.team);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await fetch("/api/assignments?contractorId=contractor-001");
      const data = await res.json();
      if (data.success) setAssignments(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/contractor?type=assigned");
      const data = await res.json();
      if (data.success) setProjects(data.data.assignedProjects || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMilestones = async (projectId) => {
    setMilestones([]);
    setAssignForm(f => ({ ...f, milestoneId: "", milestoneTitle: "" }));
    if (!projectId) return;
    try {
      const res = await fetch(`/api/worker/milestones?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) setMilestones(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const openAssignModal = async (member) => {
    setAssignTarget({ workerId: member.workerId, workerName: member.name });
    setAssignForm({ projectId: "", projectTitle: "", budgetModel: "", milestoneId: "", milestoneTitle: "", pay: "", deadline: "", note: "" });
    setMilestones([]);
    setAssignError("");
    await fetchProjects();
    setShowAssignModal(true);
  };

  const handleProjectChange = (e) => {
    const selected = projects.find(p => p.id === e.target.value);
    if (!selected) return;
    setAssignForm(f => ({
      ...f,
      projectId: selected.id,
      projectTitle: selected.title,
      budgetModel: selected.budgetModel,
      milestoneId: "",
      milestoneTitle: "",
    }));
    if (selected.budgetModel === "MILESTONE") {
      fetchMilestones(selected.id);
    } else {
      setMilestones([]);
    }
  };

  const handleMilestoneChange = (e) => {
    const selected = milestones.find(m => m.id === e.target.value);
    setAssignForm(f => ({
      ...f,
      milestoneId: selected ? selected.id : "",
      milestoneTitle: selected ? selected.title : "",
    }));
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    setAssignError("");
    setAssignLoading(true);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          contractorId: "contractor-001",
          workerId: assignTarget.workerId,
          workerName: assignTarget.workerName,
          projectId: assignForm.projectId,
          projectTitle: assignForm.projectTitle,
          milestoneId: assignForm.milestoneId || null,
          milestoneTitle: assignForm.milestoneTitle || null,
          pay: parseFloat(assignForm.pay),
          deadline: assignForm.deadline,
          note: assignForm.note || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAssignModal(false);
        setActiveTab("assignments");
        fetchAssignments();
      } else {
        setAssignError(data.error || "Failed to create assignment.");
      }
    } catch (e) {
      setAssignError("Network error. Please try again.");
    } finally {
      setAssignLoading(false);
    }
  };

  const handleCancelAssignment = async (assignmentId) => {
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", assignmentId }),
      });
      const data = await res.json();
      if (data.success) fetchAssignments();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addTeamMember", ...newMember }),
      });
      const data = await res.json();
      if (data.success) {
        setTeam(data.data);
        setShowAddModal(false);
        setNewMember({ name: "", role: "", rate: "" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const res = await fetch("/api/contractor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "removeTeamMember", memberId }),
      });
      const data = await res.json();
      if (data.success) setTeam(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Team Management</h2>
              <p className="text">Manage your team members and assignments</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button onClick={() => setShowAddModal(true)} className="ud-btn btn-dark default-box-shadow2">
                Add Member <i className="fal fa-plus" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    <button
                      className={`nav-link fw500 ps-0 ${activeTab === "members" ? "active" : ""}`}
                      onClick={() => setActiveTab("members")}
                    >
                      Team Members
                    </button>
                    <button
                      className={`nav-link fw500 ${activeTab === "assignments" ? "active" : ""}`}
                      onClick={() => { setActiveTab("assignments"); fetchAssignments(); }}
                    >
                      Assignments
                    </button>
                  </div>
                </nav>

                {/* Team Members Tab */}
                {activeTab === "members" && (
                  loading ? (
                    <div className="text-center p50">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : !team ? (
                    <div className="text-center p50">
                      <i className="flaticon-team fz60 text-muted mb20 d-block" />
                      <h5 className="text-muted">No team created yet</h5>
                      <p className="text-muted">Create your team to manage subcontractors</p>
                      <button onClick={() => setShowAddModal(true)} className="ud-btn btn-thm mt20">
                        Create Team
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="team-header mb30">
                        <h4 className="mb10">{team.name}</h4>
                        <p className="text-muted">{team.description || "Your professional team"}</p>
                        <span className="badge badge-new">{team.members?.length || 0} Members</span>
                      </div>
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <thead className="t-head">
                            <tr>
                              <th scope="col">Worker</th>
                              <th scope="col">Role</th>
                              <th scope="col">Hourly Rate</th>
                              <th scope="col">Status</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="t-body">
                            {team.members?.length === 0 ? (
                              <tr>
                                <td colSpan="5" className="text-center p30">
                                  <p className="text-muted mb0">No team members yet</p>
                                </td>
                              </tr>
                            ) : (
                              team.members?.map((member) => (
                                <tr key={member.id}>
                                  <td>
                                    <div className="d-flex align-items-center gap10">
                                      <div>
                                        <h5 className="title mb0">{member.name}</h5>
                                        <span className="fz13 text-muted">{member.workerId}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="vam"><span className="fz15">{member.role}</span></td>
                                  <td className="vam"><span className="text-thm fw500">${member.rate}/hr</span></td>
                                  <td className="vam">
                                    <span className={`badge ${member.isActive ? "badge-completed" : "badge-cancelled"}`}>
                                      {member.isActive ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                  <td className="vam">
                                    <div className="d-flex gap-2">
                                      <button
                                        onClick={() => openAssignModal(member)}
                                        className="ud-btn btn-thm2 btn-sm bdrs4"
                                      >
                                        Assign
                                      </button>
                                      <button
                                        onClick={() => handleRemoveMember(member.id)}
                                        className="ud-btn btn-light btn-sm"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )
                )}

                {/* Assignments Tab */}
                {activeTab === "assignments" && (
                  assignments.length === 0 ? (
                    <div className="text-center p50">
                      <i className="flaticon-document fz60 text-muted mb20 d-block" />
                      <h5 className="text-muted">No assignments yet</h5>
                      <p className="text-muted">Assign team members to projects from the Team Members tab</p>
                    </div>
                  ) : (
                    <div className="packages_table table-responsive">
                      <table className="table-style3 table at-savesearch">
                        <thead className="t-head">
                          <tr>
                            <th scope="col">Worker</th>
                            <th scope="col">Project / Milestone</th>
                            <th scope="col">Pay</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="t-body">
                          {assignments.map((a) => {
                            const sc = statusConfig[a.status] || statusConfig.PENDING;
                            return (
                              <tr key={a.id}>
                                <td>
                                  <h5 className="title mb0">{a.workerName}</h5>
                                  <span className="fz13 text-muted">{a.workerId}</span>
                                </td>
                                <td className="vam">
                                  <span className="fw500">{a.projectTitle}</span>
                                  {a.milestoneId && (
                                    <span className="fz13 text-muted d-block">› {a.milestoneTitle}</span>
                                  )}
                                </td>
                                <td className="vam">
                                  <span className="text-thm fw500">${a.pay.toLocaleString()}</span>
                                </td>
                                <td className="vam">
                                  <span className="fz14">{new Date(a.deadline).toLocaleDateString()}</span>
                                </td>
                                <td className="vam">
                                  <span className={`badge ${sc.class}`}>{sc.label}</span>
                                </td>
                                <td className="vam">
                                  {a.status === "PENDING" && (
                                    <button
                                      onClick={() => handleCancelAssignment(a.id)}
                                      className="ud-btn btn-light btn-sm"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
              </div>
              <form onSubmit={handleAddMember}>
                <div className="modal-body">
                  <div className="mb20">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="Worker name" required />
                  </div>
                  <div className="mb20">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      placeholder="e.g., Developer, Designer" required />
                  </div>
                  <div className="mb20">
                    <label className="form-label">Hourly Rate ($)</label>
                    <input type="number" className="form-control" value={newMember.rate}
                      onChange={(e) => setNewMember({ ...newMember, rate: e.target.value })}
                      placeholder="25" min="1" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="ud-btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="ud-btn btn-thm">Add Member</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Worker: {assignTarget?.workerName}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)} />
              </div>
              <form onSubmit={handleAssignSubmit}>
                <div className="modal-body">
                  {assignError && <div className="alert alert-danger mb20">{assignError}</div>}

                  <div className="mb20">
                    <label className="form-label fw500">Project <span className="text-danger">*</span></label>
                    <select className="form-control" value={assignForm.projectId}
                      onChange={handleProjectChange} required>
                      <option value="">Select a project...</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                    {projects.length === 0 && (
                      <small className="text-muted">No assigned projects found.</small>
                    )}
                  </div>

                  {assignForm.budgetModel === "MILESTONE" && (
                    <div className="mb20">
                      <label className="form-label fw500">Milestone (optional)</label>
                      <select className="form-control" value={assignForm.milestoneId}
                        onChange={handleMilestoneChange}>
                        <option value="">Entire project (no specific milestone)</option>
                        {milestones.map(m => (
                          <option key={m.id} value={m.id}>{m.title} — ${m.amount.toLocaleString()}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb20">
                    <label className="form-label fw500">Pay Amount ($) <span className="text-danger">*</span></label>
                    <input type="number" className="form-control" value={assignForm.pay}
                      onChange={(e) => setAssignForm(f => ({ ...f, pay: e.target.value }))}
                      placeholder="500" min="1" required />
                  </div>

                  <div className="mb20">
                    <label className="form-label fw500">Deadline <span className="text-danger">*</span></label>
                    <input type="date" className="form-control" value={assignForm.deadline}
                      onChange={(e) => setAssignForm(f => ({ ...f, deadline: e.target.value }))}
                      required />
                  </div>

                  <div className="mb20">
                    <label className="form-label fw500">Note (optional)</label>
                    <textarea className="form-control" rows={3} value={assignForm.note}
                      onChange={(e) => setAssignForm(f => ({ ...f, note: e.target.value }))}
                      placeholder="Any instructions for the worker..." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="ud-btn btn-light" onClick={() => setShowAssignModal(false)}>Cancel</button>
                  <button type="submit" className="ud-btn btn-thm" disabled={assignLoading}>
                    {assignLoading ? <><span className="spinner-border spinner-border-sm me-2" />Assigning...</> : "Assign Worker"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Verify contractor team page**

Navigate to http://localhost:3000/contractor/team
- "Team Members" tab should show existing members with "Assign" button per row
- "Assignments" tab should show the 3 pre-seeded assignments
- Clicking "Assign" on a member should open the modal with a project dropdown

- [ ] **Step 3: Test assign flow end-to-end**

1. Click "Assign" next to any team member
2. Select "Website Redesign Project" (MILESTONE) — milestone dropdown should appear
3. Select a milestone OR leave it empty for project-level
4. Enter pay amount and deadline
5. Click "Assign Worker" — modal should close, switch to Assignments tab, new row appears
6. Click "Cancel" on a PENDING assignment — row disappears

- [ ] **Step 4: Commit**

```bash
git add src/app/contractor/components/section/TeamManagementInfo.jsx
git commit -m "feat: extend team management with Assignments tab and Assign worker modal"
```

---

## Task 5: Create WorkerAssignmentsInfo.jsx

**Files:**
- Create: `src/app/worker/components/section/WorkerAssignmentsInfo.jsx`

- [ ] **Step 1: Create the component**

```jsx
"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

const tabs = [
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "DECLINED", label: "Declined" },
];

const emptyMessages = {
  PENDING: "No pending assignments",
  ACCEPTED: "No accepted assignments",
  DECLINED: "No declined assignments",
};

export default function WorkerAssignmentsInfo() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null); // assignmentId being acted on

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assignments?workerId=worker-021");
      const data = await res.json();
      if (data.success) {
        setAllAssignments(data.data);
      } else {
        setError("Failed to load assignments.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (assignmentId, status) => {
    setActionLoading(assignmentId);
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "respond", assignmentId, status }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAssignments();
        if (status === "ACCEPTED") setActiveTab("ACCEPTED");
        else setActiveTab("DECLINED");
      } else {
        setError(data.error || "Failed to update assignment.");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = allAssignments.filter(a => a.status === activeTab);

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Assignments</h2>
            <p className="text">Assignments from contractors — accept or decline below</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            {error && <div className="alert alert-danger mb20">{error}</div>}

            <div className="navtab-style1">
              <nav>
                <div className="nav nav-tabs mb30">
                  {tabs.map(tab => (
                    <button
                      key={tab.key}
                      className={`nav-link fw500 ps-0 ${activeTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                    >
                      {tab.label}
                      {tab.key === "PENDING" && allAssignments.filter(a => a.status === "PENDING").length > 0 && (
                        <span className="badge badge-new ms-2">
                          {allAssignments.filter(a => a.status === "PENDING").length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </nav>

              {loading ? (
                <div className="text-center p50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center p50">
                  <i className="flaticon-document fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">{emptyMessages[activeTab]}</h5>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Project / Milestone</th>
                        <th scope="col">Contractor</th>
                        <th scope="col">Pay</th>
                        <th scope="col">Deadline</th>
                        {activeTab === "PENDING" && <th scope="col">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {filtered.map(a => (
                        <tr key={a.id}>
                          <td>
                            <h5 className="title mb5">{a.projectTitle}</h5>
                            {a.milestoneId && (
                              <span className="fz13 text-muted d-block">› Milestone: {a.milestoneTitle}</span>
                            )}
                            {a.note && (
                              <p className="fz13 text-muted mb0 mt5">
                                <i className="flaticon-chat fz13 me-1" />
                                {a.note}
                              </p>
                            )}
                          </td>
                          <td className="vam">
                            <span className="fz15">Contractor #{a.contractorId}</span>
                          </td>
                          <td className="vam">
                            <span className="text-thm fw500 fz16">${a.pay.toLocaleString()}</span>
                          </td>
                          <td className="vam">
                            <span className="fz14">{new Date(a.deadline).toLocaleDateString()}</span>
                          </td>
                          {activeTab === "PENDING" && (
                            <td className="vam">
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleRespond(a.id, "ACCEPTED")}
                                  className="ud-btn btn-thm bdrs4 btn-sm"
                                  disabled={actionLoading === a.id}
                                >
                                  {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Accept"}
                                </button>
                                <button
                                  onClick={() => handleRespond(a.id, "DECLINED")}
                                  className="ud-btn btn-light bdrs4 btn-sm"
                                  disabled={actionLoading === a.id}
                                >
                                  Decline
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/worker/components/section/WorkerAssignmentsInfo.jsx
git commit -m "feat: add WorkerAssignmentsInfo component with Pending/Accepted/Declined tabs"
```

---

## Task 6: Create worker assignments page

**Files:**
- Create: `src/app/worker/assignments/page.jsx`

- [ ] **Step 1: Create page wrapper**

```jsx
import WorkerAssignmentsInfo from "@/app/worker/components/section/WorkerAssignmentsInfo";

export const metadata = {
  title: "VeriTask - My Assignments",
};

export default function page() {
  return <WorkerAssignmentsInfo />;
}
```

- [ ] **Step 2: Verify worker assignments page**

Navigate to http://localhost:3000/worker/assignments
- Should show three tabs: Pending (badge count 1), Accepted, Declined
- Pending tab: asgn-001 row with Accept + Decline buttons
- Accepted tab: asgn-002 row with milestone label
- Declined tab: asgn-003 row with note text
- Click Accept on the pending assignment → row moves to Accepted tab

- [ ] **Step 3: Commit**

```bash
git add src/app/worker/assignments/page.jsx
git commit -m "feat: add worker assignments page"
```

---

## Task 7: Final verification and wrap-up commit

- [ ] **Step 1: Full end-to-end test**

**Contractor flow:**
1. http://localhost:3000/contractor/team → "Team Members" tab shows members
2. Click "Assign" on Alex Thompson → modal opens with project dropdown populated (3 projects)
3. Select "Website Redesign Project" → milestone dropdown appears
4. Fill pay + deadline → click "Assign Worker" → success, Assignments tab shows new row
5. Switch to "Assignments" tab → 4 rows visible (3 seed + 1 new)
6. Cancel the new PENDING assignment → row removed

**Worker flow:**
7. http://localhost:3000/worker/assignments → 3 seeded rows across tabs
8. Click "Accept" on pending asgn-001 → row moves to Accepted tab
9. Create another assignment from contractor side → worker sees it as Pending

**Nav check:**
10. Worker sidebar/mobile nav shows "My Assignments"
11. Contractor mobile nav shows "Team" under Organize and Manage

- [ ] **Step 2: Update doc/codebase-analysis.md**

Add a brief section documenting:
- New `/api/assignments` route
- `WorkerAssignmentsInfo` component
- TeamManagementInfo extended with assignment flow
- Nav additions

- [ ] **Step 3: Final commit and push**

```bash
git add doc/codebase-analysis.md
git commit -m "docs: update codebase analysis for assignment feature"
git push origin stg
```
