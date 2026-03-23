"use client";

import { useState } from "react";
import { projects } from "@/app/api/projects/data";
import { milestones } from "@/app/api/projects/milestones";

const PAGE_SIZE = 10;

const STATUS_COLORS = {
  POSTED: "badge-new",
  ASSIGNED: "badge-assigned",
  IN_PROGRESS: "badge-in-progress",
  SUBMITTED: "badge-submitted",
  COMPLETED: "badge-completed",
  IN_DISPUTE: "badge-dispute",
  CANCELLED: "badge-cancelled",
};

const MILESTONE_COLORS = {
  PENDING: "badge-new",
  IN_PROGRESS: "badge-in-progress",
  SUBMITTED: "badge-submitted",
  APPROVED: "badge-completed",
  IN_DISPUTE: "badge-dispute",
};

const ALL_STATUSES = ["ALL", "POSTED", "ASSIGNED", "IN_PROGRESS", "SUBMITTED", "COMPLETED", "IN_DISPUTE", "CANCELLED"];

export default function ProjectManager() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(null);

  const filtered = projects.filter((p) => {
    const matchesStatus = statusFilter === "ALL" || p.status === statusFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.clientId.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatus = (val) => {
    setStatusFilter(val);
    setPage(1);
  };

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const getProjectMilestones = (projectId) =>
    milestones.filter((m) => m.projectId === projectId);

  return (
    <div>
      <div className="row mb20">
        <div className="col-md-5">
          <div className="search_area">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, ID, or client..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <label>
              <span className="flaticon-loupe" />
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={statusFilter}
            onChange={(e) => handleStatus(e.target.value)}
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "All Statuses" : s.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-end">
          <span className="fz14 text-muted">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th style={{ width: 36 }} />
              <th>Project</th>
              <th>Client</th>
              <th>Category</th>
              <th>Budget</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py40 text-muted">No projects found.</td>
              </tr>
            ) : (
              paginated.map((project) => {
                const pMilestones = getProjectMilestones(project.id);
                const isExpanded = expanded === project.id;
                return (
                  <>
                    <tr
                      key={project.id}
                      onClick={() => toggleExpand(project.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="text-center">
                        {pMilestones.length > 0 ? (
                          <i className={`fal fa-chevron-${isExpanded ? "up" : "down"} fz12 text-muted`} />
                        ) : (
                          <span className="text-muted fz12">—</span>
                        )}
                      </td>
                      <td>
                        <div className="fw500">{project.title}</div>
                        <div className="fz12 text-muted">{project.id}</div>
                      </td>
                      <td className="fz13">{project.clientId}</td>
                      <td className="fz13">{project.category}</td>
                      <td className="fz13">${project.budget.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${project.type === "VIRTUAL" ? "bg-info text-dark" : "bg-secondary"}`}>
                          {project.type}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${STATUS_COLORS[project.status] || "badge-info"}`}>
                          {project.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>

                    {isExpanded && pMilestones.length > 0 && (
                      <tr key={`${project.id}-ms`}>
                        <td />
                        <td colSpan={6} className="p0">
                          <div className="bgc-thm3 px20 py15 bdrs4 mb5">
                            <div className="fz13 fw600 mb10">
                              Milestones ({pMilestones.length})
                            </div>
                            <table className="table table-sm mb0">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Title</th>
                                  <th>Amount</th>
                                  <th>Due Date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pMilestones.map((ms) => (
                                  <tr key={ms.id}>
                                    <td className="text-muted fz12">{ms.order}</td>
                                    <td>
                                      <div className="fw500">{ms.title}</div>
                                      {ms.description && (
                                        <div className="fz12 text-muted">{ms.description}</div>
                                      )}
                                    </td>
                                    <td>${ms.amount.toLocaleString()}</td>
                                    <td className="fz12 text-muted">
                                      {ms.dueDate
                                        ? new Date(ms.dueDate).toLocaleDateString()
                                        : "—"}
                                    </td>
                                    <td>
                                      <span className={`badge ${MILESTONE_COLORS[ms.status] || "badge-info"}`}>
                                        {ms.status.replace("_", " ")}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt20">
          <span className="fz13 text-muted">
            Page {page} of {totalPages}
          </span>
          <div className="d-flex gap10">
            <button
              className="ud-btn btn-thm-border btn-sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <i className="fal fa-arrow-left mr5" /> Prev
            </button>
            <button
              className="ud-btn btn-thm-border btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <i className="fal fa-arrow-right ml5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
