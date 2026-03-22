"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

const statusConfig = {
  POSTED: { label: "Posted", class: "badge-new" },
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute" },
  CANCELLED: { label: "Cancelled", class: "badge-cancelled" },
};

const milestoneStatusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  APPROVED: { label: "Approved", class: "badge-completed" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute" },
};

export default function WorkerProjectDetailPage({ projectId }) {
  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [escrow, setEscrow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchMilestones();
      fetchEscrow();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/worker/projects?type=assigned`);
      const data = await res.json();
      if (data.success) {
        const proj = data.data.assigned.find(p => p.id === projectId) ||
                     data.data.available.find(p => p.id === projectId);
        setProject(proj);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await fetch(`/api/worker/milestones?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        setMilestones(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEscrow = async () => {
    try {
      const res = await fetch(`/api/client/escrow?projectId=${projectId}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setEscrow(data.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateMilestone = async (milestoneId, action) => {
    try {
      const res = await fetch("/api/worker/milestones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId, action }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMilestones();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="text-center p50">
          <i className="flaticon-folder fz60 text-muted mb20 d-block" />
          <h5 className="text-muted">Project not found</h5>
          <Link href="/worker/browse-projects" className="ud-btn btn-thm mt20">
            Browse Projects
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status] || statusConfig.POSTED;

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="d-flex align-items-center gap-3 mb-3">
            <Link href="/worker/my-projects" className="text-muted">
              <i className="fal fa-arrow-left-long" />
            </Link>
            <div className="dashboard_title_area mb-0">
              <h2>{project.title}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-start mb20">
              <div>
                <span className={`badge ${status.class} mb10`}>{status.label}</span>
                <p className="text mb0">{project.description}</p>
              </div>
              <div className="text-end">
                <span className="fw600 fz20 text-thm">${project.budget.toLocaleString()}</span>
                <span className="d-block fz14 text-muted">
                  {project.budgetModel === "MILESTONE" ? "Milestone Based" : "Fixed Price"}
                </span>
              </div>
            </div>

            <div className="row bdrbt1 pt20">
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Type</span>
                <span className="fw500">{project.type}</span>
              </div>
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Category</span>
                <span className="fw500">{project.category}</span>
              </div>
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Client</span>
                <span className="fw500">Client #{project.clientId}</span>
              </div>
              {project.address && (
                <div className="col-md-3">
                  <span className="fz14 text-muted d-block">Location</span>
                  <span className="fw500">{project.address}</span>
                </div>
              )}
            </div>
          </div>

          {["ASSIGNED", "IN_PROGRESS", "SUBMITTED"].includes(project.status) && (
            <>
              {escrow && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <h5 className="mb20">
                    <i className="flaticon-security me-2" />
                    Escrow Status
                  </h5>
                  <div className="row">
                    <div className="col-md-4">
                      <span className="fz14 text-muted d-block">Total Amount</span>
                      <span className="fw600 fz18">${escrow.amount.toLocaleString()}</span>
                    </div>
                    <div className="col-md-4">
                      <span className="fz14 text-muted d-block">Net Amount</span>
                      <span className="fz16">${escrow.netAmount?.toLocaleString()}</span>
                    </div>
                    <div className="col-md-4">
                      <span className="fz14 text-muted d-block">Status</span>
                      <span className={`badge ${escrow.status === "FUNDED" ? "bg-success" : "bg-secondary"}`}>
                        {escrow.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {project.budgetModel === "MILESTONE" && milestones.length > 0 && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <h5 className="mb20">
                    <i className="flaticon-checklist me-2" />
                    Milestones ({milestones.length})
                  </h5>
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="milestone-item mb20 p20 bdrs4 bgc-gray1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <span className="badge mb10" style={{ background: "#e0e7ff", color: "#3730a3" }}>
                            Milestone {index + 1}
                          </span>
                          <h5 className="title mb5">{milestone.title}</h5>
                          {milestone.description && (
                            <p className="text-muted fz14 mb10">{milestone.description}</p>
                          )}
                          <div className="d-flex gap-3 fz14">
                            <span className={`badge ${milestoneStatusConfig[milestone.status]?.class}`}>
                              {milestoneStatusConfig[milestone.status]?.label}
                            </span>
                            <span className="text-thm fw500">${milestone.amount.toLocaleString()}</span>
                            {milestone.dueDate && (
                              <span className="text-muted">
                                <i className="flaticon-calendar fz14 me-1" />
                                Due: {new Date(milestone.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          {milestone.status === "PENDING" && project.status === "ASSIGNED" && (
                            <button
                              onClick={() => handleUpdateMilestone(milestone.id, "start")}
                              className="ud-btn btn-thm bdrs4"
                            >
                              Start Work
                            </button>
                          )}
                          {milestone.status === "IN_PROGRESS" && (
                            <button
                              onClick={() => handleUpdateMilestone(milestone.id, "submit")}
                              className="ud-btn btn-thm bdrs4"
                            >
                              Submit
                            </button>
                          )}
                          {milestone.status === "SUBMITTED" && (
                            <span className="badge badge-submitted p10">
                              Awaiting Review
                            </span>
                          )}
                          {milestone.status === "APPROVED" && (
                            <span className="badge badge-completed p10">
                              <i className="flaticon-check fz14 me-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {project.status === "POSTED" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="mb20">
                <i className="flaticon-contract me-2" />
                Ready to Work?
              </h5>
              <div className="text-center p30 bdr1 bdrs8">
                <i className="flaticon-contract fz40 text-thm mb15" />
                <p className="mb20">This project is open for offers. Submit your proposal to get started.</p>
                <Link href="/worker/browse-projects" className="ud-btn btn-thm">
                  Submit Offer
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="mb20">Quick Actions</h5>
            <div className="d-grid gap-2">
              {["ASSIGNED", "IN_PROGRESS", "SUBMITTED"].includes(project.status) && (
                <Link
                  href="/worker/message"
                  className="ud-btn btn-dark"
                >
                  Message Client
                  <i className="fal fa-envelope" />
                </Link>
              )}
              <Link
                href="/worker/my-projects"
                className="ud-btn btn-light"
              >
                Back to Projects
                <i className="fal fa-arrow-left" />
              </Link>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="mb20">Project Stats</h5>
            {project.budgetModel === "MILESTONE" && (
              <div className="stat-item d-flex justify-content-between mb10">
                <span className="text-muted">Total Milestones</span>
                <span className="fw500">{milestones.length}</span>
              </div>
            )}
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Budget</span>
              <span className="fw500 text-thm">${project.budget.toLocaleString()}</span>
            </div>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Payment Model</span>
              <span className="fw500">{project.budgetModel === "MILESTONE" ? "Milestone" : "Fixed"}</span>
            </div>
            <div className="stat-item d-flex justify-content-between">
              <span className="text-muted">Posted</span>
              <span className="fw500">{new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {escrow && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="mb20">Payment Info</h5>
              <div className="text-center">
                <span className={`badge ${escrow.status === "FUNDED" ? "bg-success" : "bg-warning"} mb15`}>
                  {escrow.status}
                </span>
                <h3 className="mb5">${escrow.netAmount?.toLocaleString() || escrow.amount.toLocaleString()}</h3>
                <span className="text-muted">You'll Receive</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
