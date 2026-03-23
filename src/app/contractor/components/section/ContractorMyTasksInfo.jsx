"use client";
import { useState, useEffect, useRef } from "react";
import DashboardNavigation from "@/app/contractor/components/header/DashboardNavigation";

const CONTRACTOR_WORKER_ID = "contractor-001";

const tabs = [
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "IN_REVIEW", label: "In Review" },
  { key: "DECLINED", label: "Declined" },
];

const emptyMessages = {
  PENDING: "No pending tasks",
  ACCEPTED: "No accepted tasks",
  IN_PROGRESS: "No tasks in progress",
  IN_REVIEW: "No tasks in review",
  DECLINED: "No declined tasks",
};

const statusBadge = {
  PENDING: "badge-new", ACCEPTED: "badge-assigned", IN_PROGRESS: "badge-in-progress",
  IN_REVIEW: "badge-submitted", DECLINED: "badge-cancelled",
};
const statusLabel = {
  PENDING: "Pending", ACCEPTED: "Accepted", IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review", DECLINED: "Declined",
};

function TaskDetailModal({ assignment: a, onClose }) {
  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p30">
          <div className="d-flex justify-content-between align-items-start mb20">
            <div>
              <h5 className="mb5">{a.projectTitle}</h5>
              {a.milestoneTitle && <p className="fz13 text-muted mb0">› {a.milestoneTitle}</p>}
            </div>
            <button className="btn-close ms-3" onClick={onClose} />
          </div>

          <div className="d-flex align-items-center gap-2 mb20">
            <span className={`badge fz12 ${statusBadge[a.status] || "badge-new"}`}>{statusLabel[a.status] || a.status}</span>
            {a.teamName && <span className="fz13 text-muted">{a.teamName}</span>}
          </div>

          <div className="row mb20">
            <div className="col-6">
              <p className="fz12 text-muted mb4">Pay</p>
              <p className="fw600 fz18 text-thm mb0">${a.pay.toLocaleString()}</p>
            </div>
            <div className="col-6">
              <p className="fz12 text-muted mb4">Deadline</p>
              <p className="fw500 fz14 mb0">{new Date(a.deadline).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>

          {a.note && (
            <div className="mb20">
              <p className="fz12 text-muted mb8 fw600">Instructions</p>
              <p className="fz14 mb0" style={{ lineHeight: 1.7 }}>{a.note}</p>
            </div>
          )}

          {a.submissionDescription && (
            <div className="mb20 p15 bdrs4" style={{ background: "#f5f7ff", border: "1px solid #e0e7ff" }}>
              <p className="fz12 text-muted mb8 fw600">Submitted Work</p>
              {a.submittedAt && <p className="fz12 text-muted mb8">Submitted {new Date(a.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>}
              <p className="fz14 mb0" style={{ lineHeight: 1.7 }}>{a.submissionDescription}</p>
            </div>
          )}

          {a.submissionFileName && (
            <div className="mb20">
              <p className="fz12 text-muted mb8 fw600">Attachment</p>
              <div className="d-flex align-items-center gap-2 bdrs4 p10" style={{ background: "#f5f7ff", border: "1px solid #e0e7ff" }}>
                <i className="flaticon-file-1 fz20 text-thm" />
                <span className="fz14 fw500">{a.submissionFileName}</span>
              </div>
            </div>
          )}

          <button className="ud-btn btn-light bdrs4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function SubmitModal({ assignment, onClose, onSubmitted }) {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) { setError("Please add a description."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", assignmentId: assignment.id, description, fileName: file?.name || null }),
      });
      const data = await res.json();
      if (data.success) { onSubmitted(); onClose(); }
      else setError(data.error || "Submission failed.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p30">
          <div className="d-flex justify-content-between align-items-center mb20">
            <h5 className="mb0">Submit Work</h5>
            <button className="btn-close" onClick={onClose} />
          </div>
          <p className="fz13 text-muted mb20">
            <strong>{assignment.projectTitle}</strong>
            {assignment.milestoneTitle && <> &middot; {assignment.milestoneTitle}</>}
          </p>
          {error && <div className="alert alert-danger fz13">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb15">
              <label className="form-label fw500 fz14">Description</label>
              <textarea
                className="form-control"
                rows={4}
                placeholder="Describe what you've completed…"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb20">
              <label className="form-label fw500 fz14">
                Attachment <span className="text-muted fz12">(optional)</span>
              </label>
              <div
                className="bdrs4 p20 text-center"
                style={{ border: "2px dashed #ddd", cursor: "pointer" }}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" className="d-none" onChange={e => setFile(e.target.files[0] || null)} />
                {file ? (
                  <p className="mb0 fz14">
                    <i className="flaticon-file-1 me-2 text-thm" />{file.name}
                    <button type="button" className="btn-close ms-3 fz10" onClick={e => { e.stopPropagation(); setFile(null); }} />
                  </p>
                ) : (
                  <>
                    <i className="flaticon-upload fz30 text-muted d-block mb10" />
                    <p className="fz13 text-muted mb0">Click to attach a file</p>
                  </>
                )}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="ud-btn btn-thm bdrs4" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" /> : "Submit Work"}
              </button>
              <button type="button" className="ud-btn btn-light bdrs4" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ContractorMyTasksInfo() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [submitTarget, setSubmitTarget] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);

  useEffect(() => { fetchAssignments(); }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/assignments?workerId=${CONTRACTOR_WORKER_ID}`);
      const data = await res.json();
      if (data.success) setAllAssignments(data.data);
      else setError("Failed to load tasks.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleAction = async (assignmentId, action, nextTab) => {
    setActionLoading(assignmentId);
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, assignmentId }),
      });
      const data = await res.json();
      if (data.success) { await fetchAssignments(); setActiveTab(nextTab); }
      else setError(data.error || "Action failed.");
    } catch { setError("Network error. Please try again."); }
    finally { setActionLoading(null); }
  };

  const handleRespond = (assignmentId, status) =>
    handleAction(assignmentId, "respond", status === "ACCEPTED" ? "ACCEPTED" : "DECLINED");

  const q = search.trim().toLowerCase();
  const filtered = allAssignments.filter(a =>
    a.status === activeTab &&
    (!q || [a.projectTitle, a.milestoneTitle, a.teamName, a.note]
      .some(f => f?.toLowerCase().includes(q)))
  );
  const countByStatus = tabs.reduce((acc, t) => {
    acc[t.key] = allAssignments.filter(a => a.status === t.key).length;
    return acc;
  }, {});

  const showActions = ["PENDING", "ACCEPTED", "IN_PROGRESS"].includes(activeTab);

  return (
    <div className="dashboard__content hover-bgc-color">
      {detailTarget && <TaskDetailModal assignment={detailTarget} onClose={() => setDetailTarget(null)} />}
      {submitTarget && (
        <SubmitModal
          assignment={submitTarget}
          onClose={() => setSubmitTarget(null)}
          onSubmitted={() => { fetchAssignments(); setActiveTab("IN_REVIEW"); }}
        />
      )}

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Tasks</h2>
            <p className="text">Tasks assigned to you by other contractors</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            {error && <div className="alert alert-danger mb20">{error}</div>}

            <div className="mb20">
              <div className="position-relative" style={{ maxWidth: 360 }}>
                <i className="flaticon-search fz16 text-muted position-absolute" style={{ top: "50%", left: 14, transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by project, team, milestone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

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
                      {countByStatus[tab.key] > 0 && (
                        <span className="badge badge-new ms-2">{countByStatus[tab.key]}</span>
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
                        <th scope="col">Team</th>
                        <th scope="col">Pay</th>
                        <th scope="col">Deadline</th>
                        {showActions && <th scope="col">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {filtered.map(a => (
                        <tr key={a.id} style={{ cursor: "pointer" }} onClick={() => setDetailTarget(a)}>
                          <td>
                            <h5 className="title mb5">{a.projectTitle}</h5>
                            {a.milestoneTitle && (
                              <span className="fz13 text-muted d-block">› {a.milestoneTitle}</span>
                            )}
                            {a.note && (
                              <p className="fz13 text-muted mb0 mt5">
                                <i className="flaticon-chat fz13 me-1" />{a.note}
                              </p>
                            )}
                          </td>
                          <td className="vam fz14">{a.teamName || "—"}</td>
                          <td className="vam">
                            <span className="text-thm fw500 fz16">${a.pay.toLocaleString()}</span>
                          </td>
                          <td className="vam">
                            <span className="fz14">{new Date(a.deadline).toLocaleDateString()}</span>
                          </td>
                          {showActions && (
                            <td className="vam" onClick={e => e.stopPropagation()}>
                              <div className="d-flex gap-2">
                                {activeTab === "PENDING" && (
                                  <>
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
                                  </>
                                )}
                                {activeTab === "ACCEPTED" && (
                                  <button
                                    onClick={() => handleAction(a.id, "start", "IN_PROGRESS")}
                                    className="ud-btn btn-thm bdrs4 btn-sm"
                                    disabled={actionLoading === a.id}
                                  >
                                    {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Start"}
                                  </button>
                                )}
                                {activeTab === "IN_PROGRESS" && (
                                  <button
                                    onClick={() => setSubmitTarget(a)}
                                    className="ud-btn btn-thm bdrs4 btn-sm"
                                    disabled={actionLoading === a.id}
                                  >
                                    Submit
                                  </button>
                                )}
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
