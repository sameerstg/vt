"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { getWorkerTasksBySection } from "@/data/workerTasks";
import TaskDiscoveryPanel from "@/components/dashboard-shared/TaskDiscoveryPanel";
import WorkSubmissionPanel from "@/components/dashboard-shared/WorkSubmissionPanel";

const TASK_SECTIONS = [
  { key: "available", label: "Available Tasks", path: "/worker-dashboard/available-tasks" },
  { key: "applied", label: "Applied Tasks", path: "/worker-dashboard/applied-tasks" },
  { key: "assigned", label: "Assigned Tasks", path: "/worker-dashboard/assigned-tasks" },
  { key: "in_progress", label: "In Progress", path: "/worker-dashboard/in-progress" },
  { key: "completed", label: "Completed Tasks", path: "/worker-dashboard/completed-tasks" },
  { key: "work_submission", label: "Work Submission", path: "/worker-dashboard/manage-projects" },
];

const statusLabelMap = {
  available: "Available",
  applied: "Applied",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
};

const sectionLabelMap = {
  available: "Available Tasks",
  applied: "Applied Tasks",
  assigned: "Assigned Tasks",
  in_progress: "In Progress Tasks",
  completed: "Completed Tasks",
};

export default function TasksInfo({
  initialFilter = "available",
  pageTitle = "Tasks",
  pageDescription = "",
}) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  useEffect(() => {
    setActiveFilter(initialFilter);
    setCurrentPage(1);
  }, [initialFilter]);

  const stats = useMemo(() => {
    const available = getWorkerTasksBySection("available").length;
    const applied = getWorkerTasksBySection("applied").length;
    const assigned = getWorkerTasksBySection("assigned").length;
    const inProgress = getWorkerTasksBySection("in_progress").length;
    const completed = getWorkerTasksBySection("completed").length;
    return {
      total: available + applied + assigned + inProgress + completed,
      available,
      applied,
      assigned,
      inProgress,
      completed,
    };
  }, []);

  const baseTasks = useMemo(
    () => (activeFilter === "work_submission" ? [] : getWorkerTasksBySection(activeFilter)),
    [activeFilter]
  );

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return baseTasks.filter((task) => {
      if (!query) return true;
      return (
        task.title.toLowerCase().includes(query) ||
        task.client.toLowerCase().includes(query) ||
        task.skills.join(" ").toLowerCase().includes(query)
      );
    });
  }, [baseTasks, searchQuery]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  }, [currentPage, filteredTasks, tasksPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="dashboard__content hover-bgc-color worker-task-monitoring-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{pageTitle}</h2>
            <p className="text">{pageDescription}</p>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-content" />
              <span className="tm-stat-kicker">Total</span>
            </div>
            <h4>{stats.total}</h4>
            <p className="tm-stat-sub">All task buckets</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-briefcase" />
              <span className="tm-stat-kicker">Available</span>
            </div>
            <h4>{stats.available}</h4>
            <p className="tm-stat-sub">Open opportunities</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-contract" />
              <span className="tm-stat-kicker">Assigned</span>
            </div>
            <h4>{stats.assigned}</h4>
            <p className="tm-stat-sub">Tasks to execute</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-review-1" />
              <span className="tm-stat-kicker">Completed</span>
            </div>
            <h4>{stats.completed}</h4>
            <p className="tm-stat-sub">Delivered tasks</p>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative tm-toolbar-card">
            <div className="bdrb1 pb15 mb20 tm-toolbar-head">
              <div>
                <h5 className="list-title mb-1">Status Filter</h5>
                {/* <p className="text mb-0">
                  {activeFilter === "work_submission"
                    ? "Manage completion proof submissions."
                    : `Showing ${filteredTasks.length} tasks in \`${activeFilter}\``}
                </p> */}
              </div>
            </div>
            <div className="tm-filter-wrap">
              {TASK_SECTIONS
                // remove work_submission option when viewing regular task lists
                .filter((f) => f.key !== "work_submission")
                .map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    className={`tm-filter-btn ${activeFilter === filter.key ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          {activeFilter === "available" ? (
            <TaskDiscoveryPanel
              preferredLocation="United States"
              proposalPath="/worker-dashboard/proposal"
            />
          ) : activeFilter === "work_submission" ? (
            <WorkSubmissionPanel showMilestoneSelector />
          ) : (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb20">
                <h5 className="list-title mb-0">
                  {sectionLabelMap[activeFilter] || "Tasks"} List
                </h5>
              </div>
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Client</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Skills</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paginatedTasks.map((task) => {
                      const detailHref =
                        activeFilter === "in_progress"
                          ? `/worker-dashboard/manage-projects?taskId=${task.id}&taskTitle=${encodeURIComponent(
                              task.title
                            )}`
                          : `/worker-dashboard/proposal?taskId=${task.id}&taskTitle=${encodeURIComponent(
                              task.title
                            )}`;

                      // sirf Available aur In Progress clickable honge
                      const allowNavigation =
                        activeFilter === "available" || activeFilter === "in_progress";

                      const openDetail = () => {
                        if (!allowNavigation) return;
                        window.location.href = detailHref;
                      };

                      return (
                        <tr
                          key={task.id}
                          className="task-row-hover"
                          role={allowNavigation ? "button" : undefined}
                          tabIndex={allowNavigation ? 0 : undefined}
                          style={{ cursor: allowNavigation ? "pointer" : "default" }}
                          onClick={allowNavigation ? openDetail : undefined}
                          onKeyDown={(event) => {
                            if (!allowNavigation) return;
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              openDetail();
                            }
                          }}
                        >
                          <td>{task.title}</td>
                          <td>{task.client}</td>
                          <td>{task.budget}</td>
                          <td>{task.deadline}</td>
                          <td>{task.skills.join(", ")}</td>
                        </tr>
                      );
                    })}
                    {!paginatedTasks.length && !filteredTasks.length && (
                      <tr>
                        <td className="text-center py-5" colSpan={5}>
                          <p className="mb-0 text">No tasks found for this filter/search combination.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredTasks.length > 0 && (
                <div className="worker-pagination mt30">
                  <button
                    className="worker-pagination__nav"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  {Array.from({ length: totalPages || 1 }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`worker-pagination__page ${
                          currentPage === page ? "is-active" : ""
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    className="worker-pagination__nav"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .worker-task-monitoring-page :global(.ps-widget) {
          border: 1px solid #e8edf6;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .tm-toolbar-head {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tm-filter-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tm-filter-btn {
          border: 1px solid #dbe1ee;
          background: #ffffff;
          border-radius: 9px;
          padding: 8px 13px;
          font-weight: 600;
          color: #334155;
          font-size: 13px;
        }

        .tm-filter-btn.active,
        .tm-filter-btn:hover {
          border-color: #5b2dff;
          color: #5b2dff;
          background: #f4f0ff;
        }

        .task-row-hover td {
          transition: background-color 0.2s ease;
        }

        .task-row-hover:hover td {
          background-color: #f5f7ff;
        }

        .task-row-hover:hover td:first-child {
          color: #5b2eff;
          font-weight: 600;
        }

        .worker-pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .worker-pagination__page,
        .worker-pagination__nav {
          min-width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #dbe1ee;
          background: #ffffff;
          font-weight: 600;
        }

        .worker-pagination__page.is-active {
          border-color: #5b2dff;
          background: #f4f0ff;
          color: #5b2dff;
        }

        .worker-pagination__nav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
