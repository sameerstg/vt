"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

const tabs = [
  { key: "PENDING", label: "Pending" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "IN_PROGRESS", label: "In Progress" },
  { key: "IN_REVIEW", label: "In Review" },
  { key: "DECLINED", label: "Declined" },
];

const emptyMessages = {
  PENDING: "No pending assignments",
  ACCEPTED: "No accepted assignments",
  IN_PROGRESS: "No assignments in progress",
  IN_REVIEW: "No assignments in review",
  DECLINED: "No declined assignments",
};

export default function WorkerAssignmentsInfo() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchAssignments(); }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/assignments?workerId=worker-021");
      const data = await res.json();
      if (data.success) setAllAssignments(data.data);
      else setError("Failed to load assignments.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const handleAction = async (assignmentId, action, nextTab) => {
    setActionLoading(assignmentId);
    try {
      const res = await fetch("/api/assignments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, assignmentId, ...(action === "respond" ? {} : {}) }),
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
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Tasks</h2>
            <p className="text">Tasks assigned to you by contractors</p>
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
                          <td className="vam fz14">{a.teamName || "—"}</td>
                          <td className="vam">
                            <span className="text-thm fw500 fz16">${a.pay.toLocaleString()}</span>
                          </td>
                          <td className="vam">
                            <span className="fz14">{new Date(a.deadline).toLocaleDateString()}</span>
                          </td>
                          {showActions && (
                            <td className="vam">
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
                                    onClick={() => handleAction(a.id, "submit", "IN_REVIEW")}
                                    className="ud-btn btn-thm bdrs4 btn-sm"
                                    disabled={actionLoading === a.id}
                                  >
                                    {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Submit"}
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
