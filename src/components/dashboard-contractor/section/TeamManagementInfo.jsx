"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  getContractorTeam,
  getContractorProposals,
  addWorkerToTeam,
  removeWorkerFromTeam,
  assignProjectToWorker,
  assignMilestonesToWorker,
  getAssignmentsForContractor,
  updateMilestoneStatus,
  getAllUsers,
  getTaskById,
} from "@/utils/auth/mockAuth";

const TABS = [
  { key: "members", label: "Team Members" },
  { key: "assign-projects", label: "Assign Projects" },
  { key: "assign-milestones", label: "Assign Milestones" },
  { key: "monitor", label: "Monitor Milestones" },
];

const statusClass = (s = "") => {
  const v = s.toLowerCase();
  if (v === "completed") return "style4";
  if (v === "submitted") return "style1";
  if (v === "revision") return "style5";
  return "style6";
};

export default function TeamManagementInfo({ activeTab: propTab }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskIdParam = searchParams.get("taskId");

  const [session, setSession] = useState(null);
  const [team, setTeam] = useState({ workers: [], assignments: [] });
  const [proposals, setProposals] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState(propTab || "members");
  const [toasts, setToasts] = useState([]);

  // Add worker modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [workerSearch, setWorkerSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Assign project state
  const [assignForm, setAssignForm] = useState({ workerId: "", taskId: "" });

  // Assign milestones state
  const [milestoneTaskId, setMilestoneTaskId] = useState(taskIdParam || "");
  const [milestoneAssignments, setMilestoneAssignments] = useState([]);

  // Monitor state
  const [monitorFilter, setMonitorFilter] = useState("all");
  const [revisionModal, setRevisionModal] = useState(null);
  const [revisionNote, setRevisionNote] = useState("");

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const reload = () => {
    const s = getAuthSession();
    if (!s?.id) return;
    setSession(s);
    const t = getContractorTeam(s.id);
    setTeam(t);
    const p = getContractorProposals(s.id);
    setProposals(p);
    const a = getAssignmentsForContractor(s.id);
    setAssignments(a);
  };

  useEffect(() => { reload(); }, []);

  // Populate milestone form when task selected
  useEffect(() => {
    if (!milestoneTaskId || !session?.id) return;
    const task = getTaskById(milestoneTaskId);
    if (!task?.milestones) return;
    setMilestoneAssignments(
      task.milestones.map(m => ({
        milestoneId: m.id || m.title,
        milestoneTitle: m.title,
        price: m.price || 0,
        deadline: m.deadline || "",
        workerId: "",
      }))
    );
  }, [milestoneTaskId, session?.id]);

  // --- Workers search ---
  const handleWorkerSearch = (query) => {
    setWorkerSearch(query);
    if (!query.trim()) { setSearchResults([]); return; }
    const allUsers = getAllUsers();
    const q = query.toLowerCase();
    const results = allUsers
      .filter(u => u.role === "worker")
      .filter(u =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      )
      .filter(u => !team.workers.some(w => w.workerId === u.id))
      .slice(0, 6);
    setSearchResults(results);
  };

  const handleAddWorker = (user) => {
    if (!session?.id) return;
    const result = addWorkerToTeam(session.id, { workerId: user.id, name: user.name, email: user.email });
    if (result.ok) {
      showToast("success", `${user.name} added to team.`);
      reload();
      setWorkerSearch("");
      setSearchResults([]);
    } else {
      showToast("error", result.message);
    }
  };

  const handleRemoveWorker = (workerId, name) => {
    if (!confirm(`Remove ${name} from your team?`)) return;
    removeWorkerFromTeam(session.id, workerId);
    showToast("success", `${name} removed from team.`);
    reload();
  };

  // --- Assign project ---
  const handleAssignProject = () => {
    if (!assignForm.workerId || !assignForm.taskId) {
      showToast("error", "Select both a worker and a project.");
      return;
    }
    const worker = team.workers.find(w => w.workerId === assignForm.workerId);
    const proposal = proposals.find(p => p.taskId === assignForm.taskId);
    if (!worker || !proposal) return;
    const result = assignProjectToWorker(
      session.id, assignForm.taskId, proposal.taskTitle, assignForm.workerId, worker.name
    );
    if (result.ok) {
      showToast("success", "Project assigned to worker.");
      reload();
      setAssignForm({ workerId: "", taskId: "" });
    } else {
      showToast("error", result.message);
    }
  };

  // --- Assign milestones ---
  const handleSaveMilestones = () => {
    if (!milestoneTaskId) return;
    const grouped = {};
    milestoneAssignments.forEach(m => {
      if (!m.workerId) return;
      if (!grouped[m.workerId]) grouped[m.workerId] = [];
      grouped[m.workerId].push({ id: m.milestoneId, title: m.milestoneTitle, price: m.price, deadline: m.deadline });
    });

    let anyFailed = false;
    Object.entries(grouped).forEach(([workerId, milestones]) => {
      // Ensure assignment exists
      const worker = team.workers.find(w => w.workerId === workerId);
      const proposal = proposals.find(p => p.taskId === milestoneTaskId);
      if (!worker || !proposal) return;
      assignProjectToWorker(session.id, milestoneTaskId, proposal.taskTitle, workerId, worker.name);
      const result = assignMilestonesToWorker(session.id, milestoneTaskId, workerId, milestones);
      if (!result.ok) anyFailed = true;
    });

    if (anyFailed) {
      showToast("error", "Some assignments failed. Check worker is in team.");
    } else {
      showToast("success", "Milestones assigned successfully.");
      reload();
    }
  };

  // --- Monitor ---
  const handleApprove = (assignment, milestone) => {
    updateMilestoneStatus(session.id, assignment.taskId, assignment.workerId, milestone.id, { status: "completed" });
    showToast("success", `"${milestone.title}" approved.`);
    reload();
  };

  const handleRevisionSubmit = () => {
    if (!revisionModal || !revisionNote.trim()) return;
    const { assignment, milestone } = revisionModal;
    updateMilestoneStatus(session.id, assignment.taskId, assignment.workerId, milestone.id, {
      status: "revision",
      contractorNote: revisionNote,
    });
    showToast("info", "Revision requested.");
    setRevisionModal(null);
    setRevisionNote("");
    reload();
  };

  const acceptedProposals = proposals.filter(p => p.status === "accepted");
  const allMilestonesCompleted = assignments.length > 0 &&
    assignments.every(a => a.milestones.every(m => m.status === "completed"));

  const filteredAssignments = assignments.map(a => ({
    ...a,
    milestones: a.milestones.filter(m =>
      monitorFilter === "all" ? true : m.status === monitorFilter
    ),
  })).filter(a => a.milestones.length > 0 || monitorFilter === "all");

  const workerAssignmentCount = (workerId) =>
    assignments.filter(a => a.workerId === workerId).length;

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`vt-toast vt-toast--${t.type}`}>{t.message}</div>
        ))}
      </div>

      {/* Revision Modal */}
      {revisionModal && (
        <div className="vt-modal-backdrop">
          <div className="vt-modal">
            <h5 className="mb15">Request Revision</h5>
            <p className="text fz13 mb10">Milestone: <strong>{revisionModal.milestone.title}</strong></p>
            <textarea
              rows={4}
              className="form-control mb15"
              placeholder="Explain what needs to be revised..."
              value={revisionNote}
              onChange={e => setRevisionNote(e.target.value)}
            />
            <div className="d-flex gap-2 justify-content-end">
              <button className="ud-btn btn-light-default" onClick={() => { setRevisionModal(null); setRevisionNote(""); }}>Cancel</button>
              <button className="ud-btn btn-thm" onClick={handleRevisionSubmit}>Send Revision Request</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Worker Modal */}
      {showAddModal && (
        <div className="vt-modal-backdrop">
          <div className="vt-modal">
            <h5 className="mb15">Add Worker to Team</h5>
            <input
              type="text"
              className="form-control mb10"
              placeholder="Search by name or email..."
              value={workerSearch}
              onChange={e => handleWorkerSearch(e.target.value)}
              autoFocus
            />
            {searchResults.length > 0 && (
              <div className="worker-search-results">
                {searchResults.map(u => (
                  <div key={u.id} className="worker-result-row">
                    <div>
                      <p className="mb0 fw500">{u.name}</p>
                      <p className="mb0 fz12 text-muted">{u.email}</p>
                    </div>
                    <button className="ud-btn btn-thm" style={{ padding: "4px 14px", fontSize: "12px" }} onClick={() => handleAddWorker(u)}>
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
            {workerSearch && searchResults.length === 0 && (
              <p className="text fz13 text-muted mt10">No workers found.</p>
            )}
            <div className="d-flex justify-content-end mt20">
              <button className="ud-btn btn-light-default" onClick={() => { setShowAddModal(false); setWorkerSearch(""); setSearchResults([]); }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Team Management</h2>
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="row mb20">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p20 mb0">
            <div className="tm-tab-nav">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tm-tab-btn${activeTab === tab.key ? " active" : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TAB: Team Members */}
      {activeTab === "members" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb25">
                <h5 className="list-title mb-0">My Team ({team.workers.length})</h5>
                <button className="ud-btn btn-thm" style={{ padding: "7px 18px", fontSize: "13px" }} onClick={() => setShowAddModal(true)}>
                  + Add Worker
                </button>
              </div>

              {team.workers.length === 0 && (
                <div className="text-center py-4">
                  <p className="text mb15">No workers in your team yet.</p>
                  <button className="ud-btn btn-thm" onClick={() => setShowAddModal(true)}>+ Add Worker</button>
                </div>
              )}

              <div className="row g-3">
                {team.workers.map(w => (
                  <div key={w.workerId} className="col-xl-6 col-md-6">
                    <div className="worker-card">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb5">{w.name}</h6>
                          <p className="text fz13 mb5 text-muted">{w.email}</p>
                          <p className="text fz12 mb0">{workerAssignmentCount(w.workerId)} active assignment{workerAssignmentCount(w.workerId) !== 1 ? "s" : ""}</p>
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="ud-btn btn-light-default"
                            style={{ padding: "4px 12px", fontSize: "12px" }}
                            onClick={() => { setAssignForm(f => ({ ...f, workerId: w.workerId })); setActiveTab("assign-projects"); }}
                          >
                            Assign Project
                          </button>
                          <button
                            className="ud-btn"
                            style={{ padding: "4px 12px", fontSize: "12px", background: "#fff0f0", color: "#dc3545", border: "1px solid #f5c6cb" }}
                            onClick={() => handleRemoveWorker(w.workerId, w.name)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Assign Projects */}
      {activeTab === "assign-projects" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="list-title bdrb1 pb15 mb25">Assign Projects</h5>

              {acceptedProposals.length === 0 ? (
                <p className="text">No accepted projects yet. Wait for a client to accept your proposal.</p>
              ) : (
                <div className="row g-3 mb25">
                  <div className="col-md-4">
                    <label className="heading-color ff-heading fw500 mb10">Worker</label>
                    <select className="form-select" value={assignForm.workerId} onChange={e => setAssignForm(f => ({ ...f, workerId: e.target.value }))}>
                      <option value="">Select Worker</option>
                      {team.workers.map(w => <option key={w.workerId} value={w.workerId}>{w.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-5">
                    <label className="heading-color ff-heading fw500 mb10">Accepted Project</label>
                    <select className="form-select" value={assignForm.taskId} onChange={e => setAssignForm(f => ({ ...f, taskId: e.target.value }))}>
                      <option value="">Select Project</option>
                      {acceptedProposals.map(p => <option key={p.taskId} value={p.taskId}>{p.taskTitle}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <button className="ud-btn btn-thm w-100" onClick={handleAssignProject}>Assign Project</button>
                  </div>
                </div>
              )}

              {assignments.length > 0 && (
                <>
                  <h6 className="mb15">Current Assignments</h6>
                  {assignments.map((a, i) => (
                    <div key={i} className="assignment-row">
                      <span className="fw500">{a.workerName}</span>
                      <span className="mx-3 text-muted">→</span>
                      <span>{a.taskTitle}</span>
                      <span className="ms-auto fz12 text-muted">{a.milestones.length} milestone{a.milestones.length !== 1 ? "s" : ""}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Assign Milestones */}
      {activeTab === "assign-milestones" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="list-title bdrb1 pb15 mb25">Assign Milestones</h5>

              <div className="mb20">
                <label className="heading-color ff-heading fw500 mb10">Select Project</label>
                <select className="form-select" style={{ maxWidth: 360 }} value={milestoneTaskId} onChange={e => setMilestoneTaskId(e.target.value)}>
                  <option value="">Choose accepted project...</option>
                  {acceptedProposals.map(p => <option key={p.taskId} value={p.taskId}>{p.taskTitle}</option>)}
                </select>
              </div>

              {milestoneTaskId && milestoneAssignments.length === 0 && (
                <p className="text text-muted">No milestones found for this task.</p>
              )}

              {milestoneAssignments.length > 0 && (
                <>
                  <div className="packages_table table-responsive mb20">
                    <table className="table-style3 table">
                      <thead className="t-head">
                        <tr>
                          <th>Milestone</th>
                          <th>Due</th>
                          <th>Price</th>
                          <th>Assign To</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {milestoneAssignments.map((m, i) => (
                          <tr key={i}>
                            <td className="fw500">{m.milestoneTitle}</td>
                            <td>{m.deadline || "—"}</td>
                            <td>${m.price}</td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                style={{ minWidth: 140 }}
                                value={m.workerId}
                                onChange={e => setMilestoneAssignments(prev => prev.map((x, j) => j === i ? { ...x, workerId: e.target.value } : x))}
                              >
                                <option value="">Select worker</option>
                                {team.workers.map(w => <option key={w.workerId} value={w.workerId}>{w.name}</option>)}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="ud-btn btn-thm" onClick={handleSaveMilestones}>Save Assignments</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB: Monitor Milestones */}
      {activeTab === "monitor" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb25">
                <h5 className="list-title mb-0">Monitor Milestones</h5>
                <div className="d-flex gap-2">
                  {["all", "working", "submitted", "revision", "completed"].map(f => (
                    <button key={f} className={`filter-btn${monitorFilter === f ? " active" : ""}`} onClick={() => setMonitorFilter(f)}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {assignments.length === 0 && (
                <p className="text text-muted">No assignments yet. Assign projects and milestones to workers first.</p>
              )}

              {filteredAssignments.map((a, ai) => (
                <div key={ai} className="mb25">
                  <p className="fw600 mb10">{a.taskTitle} — <span className="text-muted fz13">{a.workerName}</span></p>
                  <div className="row g-3">
                    {a.milestones.map(m => (
                      <div key={m.id} className="col-xl-6">
                        <div className="milestone-monitor-card">
                          <div className="d-flex justify-content-between align-items-start mb10">
                            <h6 className="mb0">{m.title}</h6>
                            <span className={`pending-style ${statusClass(m.status)}`}>{m.status}</span>
                          </div>
                          <div className="progress-track mb5">
                            <div className="progress-fill" style={{ width: `${m.progress || 0}%` }} />
                          </div>
                          <small className="text d-block mb10">{m.progress || 0}%</small>
                          {m.workerNote && <p className="fz12 text-muted mb10">Note: {m.workerNote}</p>}

                          {m.status === "submitted" && (
                            <div className="d-flex gap-2">
                              <button
                                className="ud-btn btn-thm"
                                style={{ padding: "5px 14px", fontSize: "12px" }}
                                onClick={() => handleApprove(a, m)}
                              >
                                ✓ Approve
                              </button>
                              <button
                                className="ud-btn btn-light-default"
                                style={{ padding: "5px 14px", fontSize: "12px" }}
                                onClick={() => setRevisionModal({ assignment: a, milestone: m })}
                              >
                                ↩ Request Revision
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {allMilestonesCompleted && (
                <div className="all-done-banner">
                  <span>✓ All milestones approved. Ready to submit to client.</span>
                  <button
                    className="ud-btn btn-thm ms-3"
                    style={{ padding: "7px 18px", fontSize: "13px" }}
                    onClick={() => {
                      const taskId = assignments[0]?.taskId;
                      if (taskId) router.push(`/contractor-dashboard/submit-deliverable?taskId=${taskId}`);
                    }}
                  >
                    Submit Deliverable to Client
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .vt-toast--error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .vt-toast--info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
        .vt-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 9998; display: flex; align-items: center; justify-content: center; }
        .vt-modal { background: #fff; border-radius: 12px; padding: 28px; width: 100%; max-width: 480px; box-shadow: 0 8px 40px rgba(0,0,0,0.18); }
        .tm-tab-nav { display: flex; flex-wrap: wrap; gap: 8px; }
        .tm-tab-btn { border: 1px solid #dbe1ee; background: #fff; border-radius: 4px; padding: 8px 16px; font-weight: 600; font-size: 13px; color: #334155; cursor: pointer; }
        .tm-tab-btn.active { border-color: #5b2dff; color: #5b2dff; background: #f4f0ff; }
        .worker-card { border: 1px solid #e7ebf5; border-radius: 10px; padding: 18px; }
        .worker-search-results { border: 1px solid #e7ebf5; border-radius: 8px; overflow: hidden; }
        .worker-result-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid #f0f0f0; }
        .worker-result-row:last-child { border-bottom: none; }
        .assignment-row { display: flex; align-items: center; padding: 10px 14px; background: #f7f7f7; border-radius: 6px; margin-bottom: 8px; font-size: 13px; }
        .milestone-monitor-card { border: 1px solid #e7ebf5; border-radius: 10px; padding: 16px; }
        .progress-track { width: 100%; height: 8px; border-radius: 999px; background: #eef1f7; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 999px; background: #5b2dff; }
        .filter-btn { border: 1px solid #dbe1ee; background: #fff; border-radius: 4px; padding: 5px 12px; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; }
        .filter-btn.active { border-color: #5b2dff; color: #5b2dff; background: #f4f0ff; }
        .all-done-banner { display: flex; align-items: center; padding: 16px 20px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; font-weight: 600; color: #155724; margin-top: 20px; }
      `}</style>
    </div>
  );
}
