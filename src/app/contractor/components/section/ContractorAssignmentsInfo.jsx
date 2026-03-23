"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/contractor/components/header/DashboardNavigation";

const CONTRACTOR_ID = "contractor-001";

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

  const filtered = allAssignments.filter(a => a.status === activeTab);
  const countByStatus = tabs.reduce((acc, t) => {
    acc[t.key] = allAssignments.filter(a => a.status === t.key).length;
    return acc;
  }, {});
  const showActions = activeTab === "PENDING" || activeTab === "IN_REVIEW";

  return (
    <div className="dashboard__content hover-bgc-color">
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
                                  <button
                                    className="ud-btn btn-thm bdrs4 btn-sm"
                                    disabled={actionLoading === a.id}
                                    onClick={() => handleAction(a.id, "approve", "DECLINED")}
                                  >
                                    {actionLoading === a.id ? <span className="spinner-border spinner-border-sm" /> : "Approve"}
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
