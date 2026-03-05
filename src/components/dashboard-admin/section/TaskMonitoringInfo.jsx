"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { adminTaskMonitoringTasks } from "@/data/dashboardAdmin";

const stateOptions = [
  "Pending",
  "In Progress",
  "Under Review",
  "Completed",
  "Flagged",
  "Suspended",
];

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed")) return "style4";
  if (normalized.includes("flagged")) return "style1";
  if (normalized.includes("suspended")) return "style5";
  if (normalized.includes("in progress") || normalized.includes("review")) return "style6";
  return "style5";
};

const getPriorityBadgeClass = (priority = "") => {
  const normalized = priority.toLowerCase();
  if (normalized.includes("high")) return "priority-high";
  if (normalized.includes("medium")) return "priority-medium";
  return "priority-low";
};

export default function TaskMonitoringInfo() {
  const [tasks, setTasks] = useState(adminTaskMonitoringTasks);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [transitionDrafts, setTransitionDrafts] = useState(
    Object.fromEntries(adminTaskMonitoringTasks.map((task) => [task.id, task.status]))
  );
  const [selectedTaskId, setSelectedTaskId] = useState(adminTaskMonitoringTasks[0]?.id || "");
  const [globalTargetState, setGlobalTargetState] = useState("In Progress");
  const [actionMessage, setActionMessage] = useState("");

  const counts = useMemo(() => {
    const inProgress = tasks.filter((task) => task.status === "In Progress").length;
    const flagged = tasks.filter((task) => task.status === "Flagged").length;
    const suspended = tasks.filter((task) => task.status === "Suspended").length;
    const completed = tasks.filter((task) => task.status === "Completed").length;

    return {
      all: tasks.length,
      inProgress,
      flagged,
      suspended,
      completed,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const statusMatched = statusFilter === "All" || task.status === statusFilter;
      if (!statusMatched) return false;
      if (!normalizedQuery) return true;

      return (
        task.id.toLowerCase().includes(normalizedQuery) ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.project.toLowerCase().includes(normalizedQuery) ||
        task.ownerName.toLowerCase().includes(normalizedQuery) ||
        task.assignee.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [tasks, statusFilter, searchQuery]);

  const suspensibleTasks = useMemo(
    () => tasks.filter((task) => task.status !== "Suspended"),
    [tasks]
  );

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) || null,
    [tasks, selectedTaskId]
  );

  const applyStateTransition = (taskId, nextStatus, source) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const isSuspended = nextStatus === "Suspended";
        const isFlagged = nextStatus === "Flagged";
        const nextReason = isFlagged
          ? task.flaggedReason || "Flagged by admin monitoring review."
          : isSuspended
            ? task.flaggedReason || "Suspended by admin for risk controls."
            : "";

        return {
          ...task,
          status: nextStatus,
          suspended: isSuspended,
          flagged: isFlagged || isSuspended,
          flaggedReason: nextReason,
        };
      })
    );

    setTransitionDrafts((prev) => ({ ...prev, [taskId]: nextStatus }));
    setActionMessage(`${source}: ${taskId} moved to ${nextStatus}.`);
  };

  const handleRowTransition = (taskId) => {
    const target = transitionDrafts[taskId] || "In Progress";
    applyStateTransition(taskId, target, "Force transition");
  };

  const handleGlobalTransition = () => {
    if (!selectedTaskId) return;
    applyStateTransition(selectedTaskId, globalTargetState, "Admin transition");
  };

  const suspendTask = (taskId) => {
    applyStateTransition(taskId, "Suspended", "Suspend task");
  };

  return (
    <div className="dashboard__content hover-bgc-color task-monitoring-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Task Monitoring</h2>
            <p className="text">
              Monitor active and flagged tasks with admin-only control actions.
            </p>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              {actionMessage}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-content" />
              <span className="tm-stat-kicker">All Tasks</span>
            </div>
            <h4>{counts.all}</h4>
            <p className="tm-stat-sub">Total monitored tasks</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-web" />
              <span className="tm-stat-kicker">In Progress</span>
            </div>
            <h4>{counts.inProgress}</h4>
            <p className="tm-stat-sub">Active execution items</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-review-1" />
              <span className="tm-stat-kicker">Flagged</span>
            </div>
            <h4>{counts.flagged}</h4>
            <p className="tm-stat-sub">Needs admin attention</p>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <div className="tm-stat-head">
              <span className="tm-stat-icon flaticon-delete" />
              <span className="tm-stat-kicker">Suspended</span>
            </div>
            <h4>{counts.suspended}</h4>
            <p className="tm-stat-sub">Temporarily paused by admin</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative tm-toolbar-card">
            <div className="bdrb1 pb15 mb20 tm-toolbar-head">
              <div>
                <h5 className="list-title mb-1">Status Filter</h5>
                <p className="text mb-0">
                  Showing {filteredTasks.length} of {counts.all} tasks
                </p>
              </div>
              <div className="tm-search-wrap">
                <i className="flaticon-loupe" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by task ID, title, project, owner..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="tm-filter-wrap">
              <button
                type="button"
                className={`tm-filter-btn ${statusFilter === "All" ? "active" : ""}`}
                onClick={() => setStatusFilter("All")}
              >
                All ({counts.all})
              </button>
              <button
                type="button"
                className={`tm-filter-btn ${statusFilter === "In Progress" ? "active" : ""}`}
                onClick={() => setStatusFilter("In Progress")}
              >
                In Progress ({counts.inProgress})
              </button>
              <button
                type="button"
                className={`tm-filter-btn ${statusFilter === "Flagged" ? "active" : ""}`}
                onClick={() => setStatusFilter("Flagged")}
              >
                Flagged ({counts.flagged})
              </button>
              <button
                type="button"
                className={`tm-filter-btn ${statusFilter === "Suspended" ? "active" : ""}`}
                onClick={() => setStatusFilter("Suspended")}
              >
                Suspended ({counts.suspended})
              </button>
              <button
                type="button"
                className={`tm-filter-btn ${statusFilter === "Completed" ? "active" : ""}`}
                onClick={() => setStatusFilter("Completed")}
              >
                Completed ({counts.completed})
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">All Tasks List</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Task</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Timeline</th>
                    <th scope="col">Current State</th>
                    <th scope="col">Flag Reason</th>
                    <th scope="col">Force State Transition (Admin Only)</th>
                    <th scope="col">Suspend Task</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className={`${
                        task.status === "Flagged" ? "tm-flagged-row" : ""
                      } ${task.status === "Suspended" ? "tm-suspended-row" : ""}`}
                    >
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{task.title}</span>
                        <div className="tm-task-meta">
                          <span className="tm-task-id">{task.id}</span>
                          <span className="tm-task-project">{task.project}</span>
                        </div>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{task.ownerName}</span>
                        <p className="text mb-0">
                          {task.ownerType} · Assigned to {task.assignee}
                        </p>
                      </td>
                      <td className="vam">
                        <span className={`tm-priority-badge ${getPriorityBadgeClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="vam">
                        <span className="d-block">Start: {task.startedOn}</span>
                        <span className="fz14 fw400">Due: {task.dueOn}</span>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">
                          {task.flaggedReason || "No flag raised"}
                        </span>
                      </td>
                      <td className="vam">
                        <div className="tm-row-action">
                          <select
                            className="form-select tm-select"
                            value={transitionDrafts[task.id] || task.status}
                            onChange={(event) =>
                              setTransitionDrafts((prev) => ({
                                ...prev,
                                [task.id]: event.target.value,
                              }))
                            }
                          >
                            {stateOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border tm-apply-btn"
                            onClick={() => handleRowTransition(task.id)}
                          >
                            Apply
                          </button>
                        </div>
                      </td>
                      <td className="vam">
                        {task.status === "Suspended" ? (
                          <button
                            type="button"
                            className="ud-btn btn-thm-border tm-apply-btn"
                            onClick={() => applyStateTransition(task.id, "In Progress", "Reinstate task")}
                          >
                            Reinstate
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="ud-btn btn-thm-border tm-apply-btn tm-danger-btn"
                            onClick={() => suspendTask(task.id)}
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {!filteredTasks.length && (
                    <tr>
                      <td className="text-center py-5" colSpan={8}>
                        <div className="tm-empty-box mx-auto">
                          <p className="mb-0 text">
                            No tasks found for this filter/search combination.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Force State Transition (Admin Only)</h5>
            </div>
            {selectedTask && (
              <div className="tm-selected-task mb20">
                <p className="mb5 fw500">{selectedTask.id}</p>
                <p className="text mb8">{selectedTask.title}</p>
                <div className="d-flex flex-wrap gap-2">
                  <span className={`pending-style ${getStatusClass(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                  <span className={`tm-priority-badge ${getPriorityBadgeClass(selectedTask.priority)}`}>
                    {selectedTask.priority}
                  </span>
                </div>
              </div>
            )}
            <div className="row g-3">
              <div className="col-lg-12">
                <label className="fw500 mb8">Select Task</label>
                <select
                  className="form-select"
                  value={selectedTaskId}
                  onChange={(event) => setSelectedTaskId(event.target.value)}
                >
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.id} - {task.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-12">
                <label className="fw500 mb8">Target State</label>
                <select
                  className="form-select"
                  value={globalTargetState}
                  onChange={(event) => setGlobalTargetState(event.target.value)}
                >
                  {stateOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-12">
                <button type="button" className="ud-btn btn-thm w-100" onClick={handleGlobalTransition}>
                  Force Apply State (Admin)
                  <i className="fal fa-arrow-right-long" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Suspend Task</h5>
              <p className="text mb-0 mt5">
                Quick controls for pausing tasks that require immediate admin intervention.
              </p>
            </div>
            <div className="tm-suspend-list">
              {suspensibleTasks.map((task) => (
                <div key={task.id} className="tm-suspend-item">
                  <div>
                    <p className="mb2 fw500">{task.id}</p>
                    <p className="text mb-0">{task.title}</p>
                  </div>
                  <button
                    type="button"
                    className="ud-btn btn-thm-border tm-danger-btn"
                    onClick={() => suspendTask(task.id)}
                  >
                    Suspend Task
                  </button>
                </div>
              ))}
              {!suspensibleTasks.length && (
                <div className="tm-empty-box">
                  <p className="text mb-0">All tasks are currently suspended.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .task-monitoring-page :global(.ps-widget) {
          border: 1px solid #e8edf6;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .tm-stat-card {
          border: 1px solid #e7ecf6;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.05);
          padding: 14px 16px;
          margin-bottom: 20px;
        }

        .tm-stat-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .tm-stat-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f3f0ff;
          color: #5b2dff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .tm-stat-kicker {
          color: #5d6575;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.35px;
        }

        .tm-stat-card h4 {
          margin-bottom: 0;
          color: #1e293b;
          line-height: 1.15;
        }

        .tm-stat-sub {
          margin-bottom: 0;
          margin-top: 4px;
          color: #7a8395;
          font-size: 13px;
          font-weight: 400;
          text-transform: none;
        }

        .tm-toolbar-card {
          background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
        }

        .tm-toolbar-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tm-search-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #dbe3f0;
          border-radius: 10px;
          background: #ffffff;
          padding: 0 10px;
          min-width: min(460px, 100%);
          max-width: 100%;
          height: 42px;
        }

        .tm-search-wrap i {
          color: #64748b;
          font-size: 14px;
        }

        .tm-search-wrap .form-control {
          border: 0;
          box-shadow: none;
          font-size: 14px;
          padding-left: 0;
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

        .tm-priority-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          letter-spacing: 0.2px;
        }

        .tm-priority-badge.priority-high {
          background: #ffe8e8;
          color: #c81e1e;
        }

        .tm-priority-badge.priority-medium {
          background: #fff4e5;
          color: #b45309;
        }

        .tm-priority-badge.priority-low {
          background: #ecfdf3;
          color: #047857;
        }

        .tm-row-action {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 220px;
        }

        .tm-select {
          min-width: 140px;
          height: 40px;
          font-size: 13px;
        }

        .tm-apply-btn {
          min-width: 94px;
          height: 40px;
          line-height: 38px;
          padding: 0 12px;
        }

        .tm-danger-btn {
          border-color: #de3f3f;
          color: #de3f3f;
        }

        .tm-danger-btn:hover {
          border-color: #de3f3f;
          background: #de3f3f;
          color: #ffffff;
        }

        .tm-flagged-row {
          background: #fff9f7;
        }

        .tm-suspended-row {
          background: #f8fafc;
        }

        .tm-task-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .tm-task-id {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: #eff3ff;
          color: #3949ab;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 8px;
        }

        .tm-task-project {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          background: #f4f5f8;
          color: #475569;
          font-size: 12px;
          font-weight: 500;
          padding: 2px 8px;
        }

        .tm-selected-task {
          border: 1px solid #e3e9f4;
          border-radius: 10px;
          background: #f9fbff;
          padding: 12px;
        }

        .tm-suspend-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 420px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .tm-suspend-item {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fbfcff;
          padding: 12px;
        }

        .tm-empty-box {
          border: 1px dashed #d7deec;
          border-radius: 10px;
          padding: 18px;
          background: #fbfcff;
        }

        @media (max-width: 991px) {
          .tm-toolbar-head {
            align-items: stretch;
          }

          .tm-search-wrap {
            width: 100%;
            min-width: 100%;
          }
        }

        @media (max-width: 767px) {
          .tm-row-action {
            flex-direction: column;
            align-items: stretch;
            min-width: 160px;
          }

          .tm-select,
          .tm-apply-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
