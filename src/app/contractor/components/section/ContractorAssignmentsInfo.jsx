"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/contractor/components/header/DashboardNavigation";

const CONTRACTOR_ID = "contractor-001";

function SubmissionModal({ assignment, onClose }) {
  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p30">
          <div className="d-flex justify-content-between align-items-center mb20">
            <h5 className="mb0">Submission Details</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <p className="fz13 text-muted mb20">
            <strong>{assignment.projectTitle}</strong>
            {assignment.milestoneTitle && <> &middot; {assignment.milestoneTitle}</>}
            <> &middot; {assignment.workerName}</>
          </p>

          {assignment.submittedAt && (
            <p className="fz12 text-muted mb15">
              Submitted on {new Date(assignment.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}

          <div className="mb20">
            <label className="form-label fw600 fz14 mb10">Description</label>
            {assignment.submissionDescription ? (
              <p className="fz14 mb0" style={{ lineHeight: 1.7 }}>{assignment.submissionDescription}</p>
            ) : (
              <p className="fz14 text-muted mb0">No description provided.</p>
            )}
          </div>

          <div className="mb25">
            <label className="form-label fw600 fz14 mb10">Attachment</label>
            {assignment.submissionFileName ? (
              <div className="d-flex align-items-center gap-2 bdrs4 p10" style={{ background: "#f5f7ff", border: "1px solid #e0e7ff" }}>
                <i className="flaticon-file-1 fz20 text-thm" />
                <span className="fz14 fw500">{assignment.submissionFileName}</span>
              </div>
            ) : (
              <p className="fz14 text-muted mb0">No file attached.</p>
            )}
          </div>

          <button className="ud-btn btn-light bdrs4" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

const tabs = [
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "IN_REVIEW", label: "For Review" },
  { key: "DECLINED", label: "Declined" },
];

const statusBadge = {
  PENDING: "badge-new",
  ACCEPTED: "badge-assigned",
  IN_PROGRESS: "badge-in-progress",
  IN_REVIEW: "badge-submitted",
  DECLINED: "badge-cancelled",
};

const statusLabel = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "For Review",
  DECLINED: "Declined",
};

export default function ContractorAssignmentsInfo() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [viewTarget, setViewTarget] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/assignments?contractorId=${CONTRACTOR_ID}`);
      const data = await res.json();
      if (data.success) setAllAssignments(data.data);
      else setError("Failed to load assignments.");
    } catch { setError("Network error."); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAssignments(); }, []);

  const handleAction = async (assignmentId, action, nextTab) => {
    if (action === "cancel" && !confirm("Cancel this assignment?")) return;
    setActionLoading(assignmentId);
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, assignmentId }),
      });
      const data = await res.json();
      if (data.success) { await fetchAssignments(); if (nextTab) setActiveTab(nextTab); }
      else setError(data.error || "Action failed.");
    } catch { setError("Network error."); }
    finally { setActionLoading(null); }
  };

  const q = search.trim().toLowerCase();
  const filtered = allAssignments.filter(a =>
    a.status === activeTab &&
    (!q || [a.projectTitle, a.milestoneTitle, a.workerName, a.workerId, a.note]
      .some(f => f?.toLowerCase().includes(q)))
  );
  const countByStatus = tabs.reduce((acc, t) => {
    acc[t.key] = allAssignments.filter(a => a.status === t.key).length;
    return acc;
  }, {});
  const showActions = activeTab === "PENDING" || activeTab === "IN_REVIEW";

  return (
    <div className="dashboard__content hover-bgc-color">
      {viewTarget && <SubmissionModal assignment={viewTarget} onClose={() => setViewTarget(null)} />}
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Task Assigned</h2>
            <p className="text">Assignments you have sent to team members</p>
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
                  placeholder="Search by project, worker, milestone…"
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
                  <h5 className="text-muted">No {tabs.find(t => t.key === activeTab)?.label.toLowerCase()} assignments</h5>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Project / Milestone</th>
                        <th scope="col">Assigned To</th>
                        <th scope="col">Pay</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Status</th>
                        {showActions && <th scope="col">Actions</th>}
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {filtered.map(a => (
                        <tr key={a.id}>
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
                          <td className="vam">
                            <span className="fw500 fz15">{a.workerName}</span>
                            <span className="fz12 text-muted d-block">{a.workerId}</span>
                          </td>
                          <td className="vam">
                            <span className="text-thm fw500 fz16">${a.pay.toLocaleString()}</span>
                          </td>
                          <td className="vam">
                            <span className="fz14">{new Date(a.deadline).toLocaleDateString()}</span>
                          </td>
                          <td className="vam">
                            <span className={`badge fz12 ${statusBadge[a.status] || "badge-new"}`}>
                              {statusLabel[a.status] || a.status}
                            </span>
                          </td>
                          {showActions && (
                            <td className="vam">
                              <div className="d-flex gap-2">
                                {activeTab === "PENDING" && (
                                  <button
                                    className="ud-btn btn-light bdrs4 btn-sm"
                                    disabled={actionLoading === a.id}
                                    onClick={() => handleAction(a.id, "cancel", null)}
                                  >
                                    {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Cancel"}
                                  </button>
                                )}
                                {activeTab === "IN_REVIEW" && (
                                  <>
                                    <button
                                      className="ud-btn btn-light bdrs4 btn-sm d-flex align-items-center gap-1"
                                      onClick={() => setViewTarget(a)}
                                    >
                                      <i className="flaticon-file-1" />View
                                    </button>
                                    <button
                                      className="ud-btn btn-thm bdrs4 btn-sm"
                                      disabled={actionLoading === a.id}
                                      onClick={() => handleAction(a.id, "approve", "DECLINED")}
                                    >
                                      {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Approve"}
                                    </button>
                                  </>
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
