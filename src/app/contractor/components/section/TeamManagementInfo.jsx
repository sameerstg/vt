"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  ACCEPTED: { label: "Accepted", class: "badge-completed" },
  DECLINED: { label: "Declined", class: "badge-cancelled" },
};

export default function TeamManagementInfo() {
  const [activeTab, setActiveTab] = useState("members");
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", rate: "" });
  const [assignments, setAssignments] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [assignError, setAssignError] = useState("");

  const [assignTarget, setAssignTarget] = useState(null);
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
                    {assignLoading
                      ? <><span className="spinner-border spinner-border-sm me-2" />Assigning...</>
                      : "Assign Worker"
                    }
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
