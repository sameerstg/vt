"use client";

import { useState } from "react";
import useContractorStore from "@/modules/contractor/store/contractorStore";
import { TASK_STATES, TASK_STATE_LABELS, TASK_TYPES } from "@/modules/shared/utils/taskStates";
import { getUserById } from "@/data/veritask/users";
import TeamManager from "@/modules/contractor/components/TeamManager";
import PayrollDistributor from "@/modules/contractor/components/PayrollDistributor";
import SubtaskAssigner from "@/modules/contractor/components/SubtaskAssigner";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import api from "@/modules/shared/utils/api";

export default function ContractorDashboard() {
  const { tasks, selectedTask, selectTask, getMyTasks, getAvailableTasks } = useContractorStore();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showSuccess, setShowSuccess] = useState(false);

  const myTasks = getMyTasks();
  const availableTasks = getAvailableTasks();

  const handleApplyForTask = async (task) => {
    const result = await api.contractor.applyForTask(task.id, {
      amount: task.budget.amount,
      terms: "I can complete this task with my team.",
    });
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      [TASK_STATES.POSTED]: "badge-new",
      [TASK_STATES.APPLICATIONS_RECEIVED]: "badge-applications",
      [TASK_STATES.OFFER_ACCEPTED]: "badge-assigned",
      [TASK_STATES.IN_PROGRESS]: "badge-in-progress",
      [TASK_STATES.COMPLETED]: "badge-completed",
    };
    return classes[status] || "badge-new";
  };

  return (
    <>
      <MobileNavigation2 />
      <div className="dashboard__parent p0">
        <div id="item_header">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="dashboard_header_content">
                  <h2 className="page_title">Contractor Dashboard</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="dashboard__sidebar">
                <div className="dashboard_sidebar_tabs">
                  <div
                    className={`tab_btn ${activeTab === "tasks" ? "active" : ""}`}
                    onClick={() => setActiveTab("tasks")}
                  >
                    <i className="flaticon-briefcase" /> My Tasks
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "browse" ? "active" : ""}`}
                    onClick={() => setActiveTab("browse")}
                  >
                    <i className="flaticon-search" /> Browse Tasks
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "team" ? "active" : ""}`}
                    onClick={() => setActiveTab("team")}
                  >
                    <i className="flaticon-users" /> Team
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "subtasks" ? "active" : ""}`}
                    onClick={() => setActiveTab("subtasks")}
                  >
                    <i className="flaticon-checklist" /> Subtasks
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "payroll" ? "active" : ""}`}
                    onClick={() => setActiveTab("payroll")}
                  >
                    <i className="flaticon-dollar" /> Payroll
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="dashboard__content">
                {showSuccess && (
                  <div className="alert alert-success mb20">
                    Action completed successfully!
                  </div>
                )}

                {activeTab === "tasks" && (
                  <div className="tasks-section">
                    <h4 className="mb20">My Tasks</h4>
                    {myTasks.length === 0 ? (
                      <div className="bgc-white p30 bdrs12 text-center">
                        <p className="text">No tasks assigned yet. Browse and apply for tasks!</p>
                      </div>
                    ) : (
                      <div className="task-list">
                        {myTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`task-card bgc-white p20 bdrs8 mb15 cursor-pointer ${
                              selectedTask?.id === task.id ? "bdr-thm" : "bdr1"
                            }`}
                            onClick={() => selectTask(task)}
                          >
                            <div className="d-flex justify-content-between align-items-start mb10">
                              <h5 className="task-title mb0">{task.title}</h5>
                              <span className={getStatusBadgeClass(task.status)}>
                                {TASK_STATE_LABELS[task.status]}
                              </span>
                            </div>
                            <p className="text mb10">{task.description?.substring(0, 100)}...</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw600 text-thm">${task.budget.amount}</span>
                              <span className="badge badge-info">
                                <i className={task.type === TASK_TYPES.PHYSICAL ? "flaticon-pin mr5" : "flaticon-monitor mr5"} />
                                {task.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "browse" && (
                  <div className="browse-section">
                    <h4 className="mb20">Available Tasks</h4>
                    {availableTasks.length === 0 ? (
                      <div className="bgc-white p30 bdrs12 text-center">
                        <p className="text">No tasks available at the moment.</p>
                      </div>
                    ) : (
                      <div className="task-list">
                        {availableTasks.map((task) => {
                          const client = getUserById(task.clientId);
                          return (
                            <div key={task.id} className="task-card bgc-white p20 bdrs8 mb15 bdr1">
                              <div className="d-flex justify-content-between align-items-start mb10">
                                <h5 className="task-title mb0">{task.title}</h5>
                                <span className="fw600 text-thm">${task.budget.amount}</span>
                              </div>
                              <p className="text mb10">{task.description?.substring(0, 100)}...</p>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={client?.avatar || "/images/team/client-1.png"}
                                    alt={client?.name}
                                    className="rounded-circle me-2"
                                    style={{ width: "24px", height: "24px" }}
                                  />
                                  <span className="text">{client?.name}</span>
                                </div>
                                <button
                                  className="ud-btn btn-thm btn-sm"
                                  onClick={() => handleApplyForTask(task)}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "team" && <TeamManager />}

                {activeTab === "subtasks" && <SubtaskAssigner task={selectedTask} />}

                {activeTab === "payroll" && <PayrollDistributor task={selectedTask} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
