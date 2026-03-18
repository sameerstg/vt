"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { adminTaskMonitoringTasks } from "@/data/dashboardAdmin";

const stateOptions = ["Pending", "In Progress", "Under Review", "Completed", "Flagged", "Suspended"];

const statusTabs = [
  { id: "All", label: "All", key: "all" },
  { id: "In Progress", label: "In Progress", key: "inProgress" },
  { id: "Under Review", label: "Review", key: "underReview" },
  { id: "Flagged", label: "Flagged", key: "flagged" },
  { id: "Suspended", label: "Suspended", key: "suspended" },
  { id: "Completed", label: "Completed", key: "completed" },
];

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed")) return "style4";
  if (normalized.includes("flagged")) return "style1";
  if (normalized.includes("suspended")) return "style5";
  if (normalized.includes("progress") || normalized.includes("review")) return "style6";
  return "style5";
};

const getPriorityBadgeClass = (priority = "") => {
  const normalized = priority.toLowerCase();
  if (normalized.includes("high")) return "priority-high";
  if (normalized.includes("medium")) return "priority-medium";
  return "priority-low";
};

const getHealthLabel = (task) => {
  if (task.status === "Flagged") return "Needs attention";
  if (task.status === "Suspended") return "Paused";
  if (task.status === "Under Review") return "Under review";
  if (task.status === "Completed") return "Completed";
  return "On track";
};

const getHealthClass = (task) => {
  if (task.status === "Flagged") return "health-risk";
  if (task.status === "Suspended") return "health-paused";
  if (task.status === "Under Review") return "health-review";
  if (task.status === "Completed") return "health-done";
  return "health-good";
};

const getTaskSnapshot = (task) => {
  if (task.status === "Flagged") {
    return "This task needs manual follow-up before the next milestone can move forward.";
  }
  if (task.status === "Suspended") {
    return "Progress is paused until the admin team clears the current compliance or delivery risk.";
  }
  if (task.status === "Under Review") {
    return "The work is in admin review and waiting for a final decision on the next state.";
  }
  if (task.status === "Completed") {
    return "Delivery is complete and the task is retained here for operational visibility.";
  }
  return "Delivery is active and the task is moving through the normal workflow.";
};

export default function TaskMonitoringInfo() {
  const [tasks, setTasks] = useState(adminTaskMonitoringTasks);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [transitionDrafts, setTransitionDrafts] = useState(
    Object.fromEntries(adminTaskMonitoringTasks.map((task) => [task.id, task.status])),
  );
  const [selectedTaskId, setSelectedTaskId] = useState(adminTaskMonitoringTasks[0]?.id || "");
  const [globalTargetState, setGlobalTargetState] = useState("In Progress");
  const [actionMessage, setActionMessage] = useState("");
  const detailsRef = useRef(null);

  const counts = useMemo(() => ({
    all: tasks.length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    underReview: tasks.filter((task) => task.status === "Under Review").length,
    flagged: tasks.filter((task) => task.status === "Flagged").length,
    suspended: tasks.filter((task) => task.status === "Suspended").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
  }), [tasks]);

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return tasks.filter((task) => {
      const statusMatched = statusFilter === "All" || task.status === statusFilter;
      if (!statusMatched) return false;
      if (!query) return true;
      return [
        task.id,
        task.title,
        task.project,
        task.ownerName,
        task.ownerType,
        task.assignee,
      ].some((value) => value.toLowerCase().includes(query));
    });
  }, [tasks, statusFilter, searchQuery]);

  const selectedTask = useMemo(
    () => tasks.find((task) => task.id === selectedTaskId) || filteredTasks[0] || null,
    [tasks, selectedTaskId, filteredTasks],
  );

  useEffect(() => {
    if (!filteredTasks.length) return;
    const selectedVisible = filteredTasks.some((task) => task.id === selectedTaskId);
    if (!selectedVisible) {
      setSelectedTaskId(filteredTasks[0].id);
      setGlobalTargetState(filteredTasks[0].status);
    }
  }, [filteredTasks, selectedTaskId]);

  const applyStateTransition = (taskId, nextStatus, source) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const isSuspended = nextStatus === "Suspended";
        const isFlagged = nextStatus === "Flagged";
        return {
          ...task,
          status: nextStatus,
          suspended: isSuspended,
          flagged: isFlagged || isSuspended,
          flaggedReason: isFlagged
            ? task.flaggedReason || "Flagged by admin monitoring review."
            : isSuspended
              ? task.flaggedReason || "Suspended by admin for risk controls."
              : "",
        };
      }),
    );
    setTransitionDrafts((prev) => ({ ...prev, [taskId]: nextStatus }));
    setSelectedTaskId(taskId);
    setGlobalTargetState(nextStatus);
    setActionMessage(`${source}: ${taskId} moved to ${nextStatus}.`);
  };

  const handleDetails = (taskId) => {
    const nextTask = tasks.find((task) => task.id === taskId);
    setSelectedTaskId(taskId);
    setGlobalTargetState(nextTask?.status || "In Progress");
    detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="dashboard__content hover-bgc-color task-monitoring-page">
      <div className="row pb30">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area tm-header">
            <div>
              <h2>Task Monitoring</h2>
              <p className="text mb-0">
                Review delivery health, risk items, and admin interventions in one clean workspace.
              </p>
            </div>
            <div className="tm-header-badges">
              <span className="tm-pill">Admin Ops</span>
              <span className="tm-pill muted">{counts.all} tasks</span>
            </div>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb25" role="alert">
              {actionMessage}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <p>All Tasks</p>
            <h4>{counts.all}</h4>
            <span>Full monitored queue</span>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <p>In Progress</p>
            <h4>{counts.inProgress}</h4>
            <span>Execution running live</span>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <p>Review + Flagged</p>
            <h4>{counts.underReview + counts.flagged}</h4>
            <span>Needs admin review</span>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="tm-stat-card">
            <p>Suspended</p>
            <h4>{counts.suspended}</h4>
            <span>Paused by admin</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs12 p25 mb30 tm-toolbar-card">
            <div className="tm-toolbar-top">
              <div>
                <h5 className="list-title mb-1">Monitoring Queue</h5>
                <p className="text mb-0">Showing {filteredTasks.length} of {counts.all} tasks</p>
              </div>
              <div className="tm-search-wrap">
                <span className="tm-search-icon">
                  <i className="flaticon-loupe" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by task, project, owner or team"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>

            <div className="tm-filter-wrap">
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tm-filter-btn ${statusFilter === tab.id ? "active" : ""}`}
                  onClick={() => setStatusFilter(tab.id)}
                >
                  <span>{tab.label}</span>
                  <strong>{counts[tab.key]}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row align-items-start">
        <div className="col-xxl-7">
          <div className="ps-widget bgc-white bdrs12 p25 mb30 tm-list-card">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20 flex-wrap gap-2">
              <div>
                <h5 className="list-title mb-1">Tasks</h5>
                <p className="text mb-0">Structured like a modern marketplace operations queue.</p>
              </div>
              <span className="tm-pill muted">{filteredTasks.length} visible</span>
            </div>

            <div className="tm-task-list">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className={`tm-task-row ${selectedTask?.id === task.id ? "active" : ""}`}
                >
                  <div className="tm-row-top">
                    <div className="tm-row-tags">
                      <span className="tm-id-tag">{task.id}</span>
                      <span className="tm-project-tag">{task.project}</span>
                      <span className={`tm-health ${getHealthClass(task)}`}>{getHealthLabel(task)}</span>
                    </div>
                    <div className="tm-row-badges">
                      <span className={`pending-style ${getStatusClass(task.status)}`}>{task.status}</span>
                      <span className={`tm-priority-badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
                    </div>
                  </div>

                  <h5 className="tm-task-title">{task.title}</h5>

                  <div className="tm-row-grid">
                    <div className="tm-grid-item">
                      <p>Owner</p>
                      <h6>{task.ownerName}</h6>
                      <span>{task.ownerType}</span>
                    </div>
                    <div className="tm-grid-item">
                      <p>Assigned Team</p>
                      <h6>{task.assignee}</h6>
                      <span>Delivery owner</span>
                    </div>
                    <div className="tm-grid-item">
                      <p>Timeline</p>
                      <h6>{task.dueOn}</h6>
                      <span>Started {task.startedOn}</span>
                    </div>
                    <div className="tm-grid-item">
                      <p>Flag Reason</p>
                      <h6>{task.flaggedReason || "No active issue"}</h6>
                      <span>{task.flaggedReason ? "Escalated by admin" : "Healthy task state"}</span>
                    </div>
                  </div>

                  <div className="tm-row-actions">
                    <div className="tm-transition-row">
                      <select
                        className="form-select tm-select"
                        value={transitionDrafts[task.id] || task.status}
                        onChange={(event) =>
                          setTransitionDrafts((prev) => ({ ...prev, [task.id]: event.target.value }))
                        }
                      >
                        {stateOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="ud-btn btn-thm-border tm-action-btn"
                        onClick={() => applyStateTransition(task.id, transitionDrafts[task.id] || task.status, "Force transition")}
                      >
                        Apply
                      </button>
                    </div>

                    <div className="tm-button-row">
                      <button
                        type="button"
                        className="ud-btn btn-thm-border tm-action-btn"
                        onClick={() => handleDetails(task.id)}
                      >
                        Details
                      </button>
                      {task.status === "Suspended" ? (
                        <button
                          type="button"
                          className="ud-btn btn-thm-border tm-action-btn"
                          onClick={() => applyStateTransition(task.id, "In Progress", "Reinstate task")}
                        >
                          Reinstate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="ud-btn btn-thm-border tm-action-btn tm-danger-btn"
                          onClick={() => applyStateTransition(task.id, "Suspended", "Suspend task")}
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}

              {!filteredTasks.length && (
                <div className="tm-empty-box">
                  <p className="mb-0 text">No tasks match the current filter and search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xxl-5" ref={detailsRef}>
          <div className="ps-widget bgc-white bdrs12 p25 mb30 tm-detail-card">
            <div className="d-flex justify-content-between align-items-start gap-3 bdrb1 pb15 mb20 flex-wrap">
              <div>
                <h5 className="list-title mb-1">Task Details</h5>
                <p className="text mb-0">Focused view for one selected task.</p>
              </div>
              {selectedTask && <span className="tm-pill muted">{selectedTask.id}</span>}
            </div>

            {selectedTask ? (
              <>
                <div className="tm-detail-hero">
                  <div className="tm-row-tags mb10">
                    <span className="tm-project-tag">{selectedTask.project}</span>
                    <span className={`tm-health ${getHealthClass(selectedTask)}`}>{getHealthLabel(selectedTask)}</span>
                  </div>
                  <h4 className="tm-detail-title">{selectedTask.title}</h4>
                  <p className="text mb-0">
                    Owned by {selectedTask.ownerName} and assigned to {selectedTask.assignee}.
                  </p>
                </div>

                <div className="tm-detail-grid">
                  <div className="tm-grid-item">
                    <p>Owner</p>
                    <h6>{selectedTask.ownerName}</h6>
                    <span>{selectedTask.ownerType}</span>
                  </div>
                  <div className="tm-grid-item">
                    <p>Status</p>
                    <h6>{selectedTask.status}</h6>
                    <span>{selectedTask.priority} priority</span>
                  </div>
                  <div className="tm-grid-item">
                    <p>Started</p>
                    <h6>{selectedTask.startedOn}</h6>
                    <span>Kickoff date</span>
                  </div>
                  <div className="tm-grid-item">
                    <p>Due Date</p>
                    <h6>{selectedTask.dueOn}</h6>
                    <span>Target completion</span>
                  </div>
                </div>

                <div className="tm-note-box">
                  <h6 className="mb10">Task Snapshot</h6>
                  <p className="text mb-0">{getTaskSnapshot(selectedTask)}</p>
                </div>

                <div className="tm-note-box">
                  <h6 className="mb10">Risk & Admin Notes</h6>
                  <p className="text mb-0">
                    {selectedTask.flaggedReason ||
                      "No flag reason is active for this task. Admin can still change the workflow state from the controls below."}
                  </p>
                </div>

                <div className="tm-admin-box">
                  <div className="bdrb1 pb15 mb20">
                    <h5 className="list-title mb-1">Admin Controls</h5>
                    <p className="text mb-0">Change status or pause the selected task.</p>
                  </div>

                  <div className="row g-3">
                    <div className="col-12">
                      <label className="fw500 mb8">Selected Task</label>
                      <select
                        className="form-select"
                        value={selectedTask.id}
                        onChange={(event) => {
                          const nextTask = tasks.find((task) => task.id === event.target.value);
                          setSelectedTaskId(event.target.value);
                          setGlobalTargetState(nextTask?.status || "In Progress");
                        }}
                      >
                        {tasks.map((task) => (
                          <option key={task.id} value={task.id}>{task.id} - {task.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="fw500 mb8">Target State</label>
                      <select
                        className="form-select"
                        value={globalTargetState}
                        onChange={(event) => setGlobalTargetState(event.target.value)}
                      >
                        {stateOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <div className="tm-button-row full">
                        <button
                          type="button"
                          className="ud-btn btn-thm tm-primary-btn"
                          onClick={() => applyStateTransition(selectedTask.id, globalTargetState, "Admin transition")}
                        >
                          <span>Apply State Change</span>
                          <i className="fal fa-arrow-right-long" />
                        </button>
                        {selectedTask.status === "Suspended" ? (
                          <button
                            type="button"
                            className="ud-btn btn-thm-border tm-action-btn"
                            onClick={() => applyStateTransition(selectedTask.id, "In Progress", "Reinstate task")}
                          >
                            Reinstate Task
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="ud-btn btn-thm-border tm-action-btn tm-danger-btn"
                            onClick={() => applyStateTransition(selectedTask.id, "Suspended", "Suspend task")}
                          >
                            Suspend Task
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="tm-empty-box">
                <p className="mb-0 text">Select a task to open its detail view.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .task-monitoring-page :global(.ps-widget) { border: 1px solid #e8edf6; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06); }
        .tm-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
        .tm-header-badges, .tm-row-tags, .tm-row-badges, .tm-button-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .tm-pill, .tm-id-tag, .tm-project-tag, .tm-health, .tm-priority-badge { display: inline-flex; align-items: center; border-radius: 999px; font-size: 12px; font-weight: 700; padding: 5px 10px; }
        .tm-pill { background: #ede9fe; color: #5b21b6; text-transform: uppercase; letter-spacing: 0.25px; }
        .tm-pill.muted, .tm-project-tag { background: #f8fafc; color: #475569; }
        .tm-id-tag { background: #eef2ff; color: #3949ab; }
        .tm-health.health-good { background: #ecfdf3; color: #047857; }
        .tm-health.health-review { background: #eff6ff; color: #1d4ed8; }
        .tm-health.health-risk { background: #fff1f2; color: #be123c; }
        .tm-health.health-paused { background: #fff7ed; color: #c2410c; }
        .tm-health.health-done { background: #ecfeff; color: #0f766e; }
        .tm-priority-badge.priority-high { background: #ffe8e8; color: #c81e1e; }
        .tm-priority-badge.priority-medium { background: #fff4e5; color: #b45309; }
        .tm-priority-badge.priority-low { background: #ecfdf3; color: #047857; }
        .tm-stat-card { border: 1px solid #e7ecf6; border-radius: 16px; background: linear-gradient(180deg, #fff 0%, #fbfcff 100%); padding: 18px; margin-bottom: 20px; min-height: 140px; }
        .tm-stat-card p { margin-bottom: 6px; color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.35px; }
        .tm-stat-card h4 { margin-bottom: 4px; color: #0f172a; font-size: 30px; }
        .tm-stat-card span { color: #7a8395; font-size: 13px; }
        .tm-toolbar-top { display: flex; justify-content: space-between; align-items: flex-end; gap: 14px; flex-wrap: wrap; margin-bottom: 20px; }
        .tm-search-wrap { display: flex; align-items: center; gap: 10px; border: 1px solid #dbe3f0; border-radius: 14px; background: #fff; padding: 0 14px; min-width: min(430px, 100%); height: 54px; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7); }
        .tm-search-icon { display: inline-flex; align-items: center; justify-content: center; width: 18px; color: #64748b; flex: 0 0 auto; }
        .tm-search-wrap .form-control { border: 0; box-shadow: none; padding: 0; background: transparent; height: 100%; min-width: 0; }
        .tm-search-wrap .form-control:focus { border: 0; box-shadow: none; background: transparent; }
        .tm-filter-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tm-filter-btn { border: 1px solid #dde4f0; background: #fff; border-radius: 12px; padding: 10px 14px; font-weight: 600; color: #334155; font-size: 13px; display: inline-flex; gap: 10px; align-items: center; }
        .tm-filter-btn.active, .tm-filter-btn:hover { border-color: #5b2dff; color: #5b2dff; background: #f4f0ff; }
        .tm-task-list { display: flex; flex-direction: column; gap: 16px; }
        .tm-task-row { border: 1px solid #e5ebf5; border-radius: 16px; background: #fff; padding: 18px; }
        .tm-task-row.active, .tm-task-row:hover { border-color: #d8dff1; box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08); }
        .tm-row-top, .tm-transition-row, .tm-detail-hero { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
        .tm-task-title, .tm-detail-title { color: #0f172a; line-height: 1.45; }
        .tm-task-title { font-size: 18px; margin: 14px 0; }
        .tm-detail-title { margin-bottom: 8px; }
        .tm-row-grid, .tm-detail-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-bottom: 16px; }
        .tm-grid-item { border: 1px solid #edf2f8; border-radius: 12px; background: #fbfcff; padding: 12px; }
        .tm-grid-item p { margin-bottom: 4px; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; }
        .tm-grid-item h6 { margin-bottom: 3px; color: #0f172a; font-size: 14px; line-height: 1.45; }
        .tm-grid-item span { color: #7b8698; font-size: 12px; }
        .tm-row-actions { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: center; }
        .tm-transition-row { align-items: center; }
        .tm-select, .tm-action-btn, .tm-primary-btn { height: 46px; line-height: normal; border-radius: 12px; }
        .tm-select { min-width: 170px; padding-right: 34px; }
        .tm-action-btn, .tm-primary-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 16px; white-space: nowrap; }
        .tm-action-btn { min-width: 108px; }
        .tm-primary-btn { flex: 1; min-width: 220px; }
        .tm-danger-btn { border-color: #de3f3f; color: #de3f3f; }
        .tm-danger-btn:hover { border-color: #de3f3f; background: #de3f3f; color: #fff; }
        .tm-detail-card { position: sticky; top: 105px; }
        .tm-note-box, .tm-admin-box, .tm-empty-box { border: 1px solid #e8edf6; border-radius: 14px; background: #fbfcff; padding: 16px; }
        .tm-note-box { margin-bottom: 16px; }
        .full { width: 100%; }
        @media (max-width: 1199px) { .tm-detail-card { position: static; } }
        @media (max-width: 991px) { .tm-search-wrap { width: 100%; min-width: 100%; } }
        @media (max-width: 767px) {
          .tm-row-grid, .tm-detail-grid { grid-template-columns: 1fr; }
          .tm-row-actions, .tm-transition-row, .full { flex-direction: column; align-items: stretch; }
          .tm-select, .tm-action-btn, .tm-primary-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}
