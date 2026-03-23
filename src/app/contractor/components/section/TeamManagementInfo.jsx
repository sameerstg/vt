"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/contractor/components/header/DashboardNavigation";

const CONTRACTOR_ID = "contractor-001";

function AddMemberModal({ team, onClose, onAdd }) {
  const [form, setForm] = useState({ memberId: "", name: "", type: "worker", role: "", rate: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.memberId || !form.name || !form.role || !form.rate) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addTeamMember", contractorId: CONTRACTOR_ID, teamId: team.id, ...form }),
      });
      const data = await res.json();
      if (data.success) { onAdd(); onClose(); }
      else setError(data.error || "Failed to add member.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p30">
          <div className="d-flex justify-content-between align-items-center mb20">
            <h5 className="mb0">Add to {team.name}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          {error && <div className="alert alert-danger fz13">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Member ID</label>
                <input className="form-control" placeholder="e.g. worker-030" value={form.memberId} onChange={e => set("memberId", e.target.value)} required />
              </div>
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Full Name</label>
                <input className="form-control" placeholder="Name" value={form.name} onChange={e => set("name", e.target.value)} required />
              </div>
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Type</label>
                <select className="form-select" value={form.type} onChange={e => set("type", e.target.value)}>
                  <option value="worker">Worker</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Role</label>
                <input className="form-control" placeholder="e.g. Frontend Developer" value={form.role} onChange={e => set("role", e.target.value)} required />
              </div>
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Hourly Rate ($)</label>
                <input className="form-control" type="number" min="1" placeholder="50" value={form.rate} onChange={e => set("rate", e.target.value)} required />
              </div>
            </div>
            <div className="d-flex gap-2 mt10">
              <button type="submit" className="ud-btn btn-thm bdrs4" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" /> : "Add Member"}
              </button>
              <button type="button" className="ud-btn btn-light bdrs4" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function AssignModal({ member, projects, onClose }) {
  const [form, setForm] = useState({ projectId: "", milestoneTitle: "", pay: "", deadline: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const selectedProject = projects.find(p => p.id === form.projectId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectId || !form.pay || !form.deadline) {
      setError("Project, pay, and deadline are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          contractorId: CONTRACTOR_ID,
          workerId: member.memberId,
          workerName: member.name,
          projectId: form.projectId,
          projectTitle: selectedProject?.title || "",
          milestoneTitle: form.milestoneTitle || null,
          pay: parseFloat(form.pay),
          deadline: form.deadline,
          note: form.note || null,
        }),
      });
      const data = await res.json();
      if (data.success) onClose();
      else setError(data.error || "Failed to create assignment.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p30">
          <div className="d-flex justify-content-between align-items-center mb20">
            <h5 className="mb0">Assign Task — {member.name}</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          {error && <div className="alert alert-danger fz13">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb15">
              <label className="form-label fw500 fz14">Project</label>
              <select className="form-select" value={form.projectId} onChange={e => set("projectId", e.target.value)} required>
                <option value="">Select project…</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
              </select>
            </div>
            <div className="mb15">
              <label className="form-label fw500 fz14">Milestone <span className="text-muted fz12">(optional)</span></label>
              <input className="form-control" placeholder="e.g. Design Phase" value={form.milestoneTitle} onChange={e => set("milestoneTitle", e.target.value)} />
            </div>
            <div className="row">
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Pay ($)</label>
                <input className="form-control" type="number" min="1" placeholder="500" value={form.pay} onChange={e => set("pay", e.target.value)} required />
              </div>
              <div className="col-md-6 mb15">
                <label className="form-label fw500 fz14">Deadline</label>
                <input className="form-control" type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)} required />
              </div>
            </div>
            <div className="mb15">
              <label className="form-label fw500 fz14">Note <span className="text-muted fz12">(optional)</span></label>
              <textarea className="form-control" rows={2} placeholder="Additional instructions…" value={form.note} onChange={e => set("note", e.target.value)} />
            </div>
            <div className="d-flex gap-2 mt10">
              <button type="submit" className="ud-btn btn-thm bdrs4" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" /> : "Send Assignment"}
              </button>
              <button type="button" className="ud-btn btn-light bdrs4" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function TeamManagementInfo() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});
  const [addTarget, setAddTarget] = useState(null);
  const [assignTarget, setAssignTarget] = useState(null);
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(null);

  const fetchTeams = async () => {
    try {
      const res = await fetch(`/api/contractor?type=team&contractorId=${CONTRACTOR_ID}`);
      const data = await res.json();
      if (data.success) {
        setTeams(data.data.teams || []);
        if (data.data.teams?.length > 0) {
          setExpanded({ [data.data.teams[0].id]: true });
        }
      } else {
        setError("Failed to load teams.");
      }
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    fetchTeams();
    fetch(`/api/contractor?type=assigned&contractorId=${CONTRACTOR_ID}`)
      .then(r => r.json())
      .then(data => { if (data.success) setProjects(data.data.assignedProjects || []); })
      .catch(() => {});
  }, []);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const handleRemove = async (memberId, teamId) => {
    if (!confirm("Remove this member?")) return;
    setRemoveLoading(memberId);
    try {
      const res = await fetch("/api/contractor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "removeTeamMember", contractorId: CONTRACTOR_ID, teamId, memberId }),
      });
      const data = await res.json();
      if (data.success) await fetchTeams();
      else setError(data.error || "Failed to remove member.");
    } catch { setError("Network error."); }
    finally { setRemoveLoading(null); }
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      {addTarget && (
        <AddMemberModal team={addTarget} onClose={() => setAddTarget(null)} onAdd={fetchTeams} />
      )}
      {assignTarget && (
        <AssignModal member={assignTarget} projects={projects} onClose={() => setAssignTarget(null)} />
      )}

      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Team Management</h2>
            <p className="text">Manage your teams — add members and assign tasks</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          {error && <div className="alert alert-danger mb20">{error}</div>}

          {loading ? (
            <div className="ps-widget bgc-white bdrs4 p30 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <div className="ps-widget bgc-white bdrs4 p30 text-center">
              <i className="flaticon-team fz60 text-muted mb20 d-block" />
              <h5 className="text-muted">No teams found.</h5>
            </div>
          ) : (
            teams.map(team => (
              <div key={team.id} className="ps-widget bgc-white bdrs4 p30 mb20 overflow-hidden position-relative">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="d-flex align-items-center gap-3 flex-grow-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggle(team.id)}
                  >
                    <i className={`flaticon-${expanded[team.id] ? "up" : "down"}-arrow fz14 text-muted`} />
                    <div>
                      <h5 className="mb2">{team.name}</h5>
                      <p className="fz13 text-muted mb0">
                        {team.members.length} member{team.members.length !== 1 ? "s" : ""}
                        {team.description && <> &middot; {team.description}</>}
                      </p>
                    </div>
                  </div>
                  <button
                    className="ud-btn btn-thm bdrs4 btn-sm"
                    onClick={() => setAddTarget(team)}
                  >
                    <i className="flaticon-plus mr5" /> Add Member
                  </button>
                </div>

                {expanded[team.id] && (
                  team.members.length === 0 ? (
                    <p className="text-muted fz14 mt20 mb0">No members yet.</p>
                  ) : (
                    <div className="packages_table table-responsive mt20">
                      <table className="table-style3 table at-savesearch">
                        <thead className="t-head">
                          <tr>
                            <th scope="col">Member</th>
                            <th scope="col">Type</th>
                            <th scope="col">Role</th>
                            <th scope="col">Rate / hr</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="t-body">
                          {team.members.map(m => (
                            <tr key={m.id}>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div
                                    className="d-flex align-items-center justify-content-center rounded-circle bgc-thm4 fw600 text-thm fz14"
                                    style={{ width: 36, height: 36, flexShrink: 0 }}
                                  >
                                    {m.name.charAt(0)}
                                  </div>
                                  <div>
                                    <span className="fw500 d-block">{m.name}</span>
                                    <span className="fz12 text-muted">{m.memberId}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="vam">
                                <span className={`badge fz12 ${m.type === "contractor" ? "badge-assigned" : "badge-in-progress"}`}>
                                  {m.type === "contractor" ? "Contractor" : "Worker"}
                                </span>
                              </td>
                              <td className="vam fz14">{m.role}</td>
                              <td className="vam">
                                <span className="text-thm fw500">${m.rate}/hr</span>
                              </td>
                              <td className="vam">
                                <div className="d-flex gap-2">
                                  <button
                                    className="ud-btn btn-thm bdrs4 btn-sm"
                                    onClick={() => setAssignTarget(m)}
                                  >
                                    Assign
                                  </button>
                                  <button
                                    className="ud-btn btn-light bdrs4 btn-sm"
                                    disabled={removeLoading === m.id}
                                    onClick={() => handleRemove(m.id, team.id)}
                                  >
                                    {removeLoading === m.id
                                      ? <span className="spinner-border spinner-border-sm" />
                                      : "Remove"
                                    }
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
