"use client";

import { useState } from "react";
import useClientStore from "@/modules/client/store/clientStore";
import { TASK_STATES, TASK_STATE_LABELS } from "@/modules/shared/utils/taskStates";
import TaskCreator from "@/modules/client/components/TaskCreator";
import OfferReviewer from "@/modules/client/components/OfferReviewer";
import EscrowFunding from "@/modules/client/components/EscrowFunding";
import PaymentReleaser from "@/modules/client/components/PaymentReleaser";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export default function ClientDashboard() {
  const { tasks, selectedTask, selectTask, getClientTasks, getTaskOffers } = useClientStore();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const clientTasks = getClientTasks();

  const getStatusBadgeClass = (status) => {
    const classes = {
      [TASK_STATES.POSTED]: "badge-new",
      [TASK_STATES.APPLICATIONS_RECEIVED]: "badge-applications",
      [TASK_STATES.OFFER_ACCEPTED]: "badge-assigned",
      [TASK_STATES.IN_PROGRESS]: "badge-in-progress",
      [TASK_STATES.COMPLETED]: "badge-completed",
      [TASK_STATES.DISPUTED]: "badge-disputed",
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
                  <h2 className="page_title">Client Dashboard</h2>
                  <div className="header_nav">
                    <button
                      className="ud-btn btn-thm"
                      onClick={() => setShowTaskCreator(true)}
                    >
                      <i className="fal fa-plus" /> Create Task
                    </button>
                  </div>
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
                    className={`tab_btn ${activeTab === "offers" ? "active" : ""}`}
                    onClick={() => setActiveTab("offers")}
                  >
                    <i className="flaticon-document" /> Review Offers
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "escrow" ? "active" : ""}`}
                    onClick={() => setActiveTab("escrow")}
                  >
                    <i className="flaticon-dollar" /> Escrow
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "payments" ? "active" : ""}`}
                    onClick={() => setActiveTab("payments")}
                  >
                    <i className="flaticon-credit-card" /> Payments
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="dashboard__content">
                {activeTab === "tasks" && !showTaskCreator && (
                  <div className="tasks-section">
                    <h4 className="mb20">My Tasks</h4>
                    {clientTasks.length === 0 ? (
                      <div className="bgc-white p30 bdrs12 text-center">
                        <p className="text mb20">You haven't created any tasks yet.</p>
                        <button
                          className="ud-btn btn-thm"
                          onClick={() => setShowTaskCreator(true)}
                        >
                          Create Your First Task
                        </button>
                      </div>
                    ) : (
                      <div className="task-list">
                        {clientTasks.map((task) => (
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
                              <span className="text">
                                <i className="flaticon-calendar mr5" />
                                {task.schedule.date}
                              </span>
                            </div>
                            {task.escrow.funded && (
                              <div className="mt10">
                                <span className="badge badge-success">
                                  <i className="flaticon-check mr5" /> Escrow Funded
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tasks" && showTaskCreator && (
                  <div>
                    <button
                      className="ud-btn btn-dark mb20"
                      onClick={() => setShowTaskCreator(false)}
                    >
                      <i className="fal fa-arrow-left" /> Back to Tasks
                    </button>
                    <TaskCreator onTaskCreated={() => setShowTaskCreator(false)} />
                  </div>
                )}

                {activeTab === "offers" && (
                  <OfferReviewer task={selectedTask} />
                )}

                {activeTab === "escrow" && (
                  <EscrowFunding task={selectedTask} />
                )}

                {activeTab === "payments" && (
                  <PaymentReleaser task={selectedTask} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTaskCreator && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setShowTaskCreator(false)}
        >
          <div
            style={{ maxWidth: "600px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <TaskCreator
              onTaskCreated={() => setShowTaskCreator(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
