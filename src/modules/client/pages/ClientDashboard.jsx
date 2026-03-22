"use client";

import { useState } from "react";
import useClientStore from "@/modules/client/store/clientStore";
import { TASK_STATES, TASK_STATE_LABELS } from "@/modules/shared/utils/taskStates";
import TaskCreator from "@/modules/client/components/TaskCreator";
import OfferReviewer from "@/modules/client/components/OfferReviewer";
import EscrowFunding from "@/modules/client/components/EscrowFunding";
import PaymentReleaser from "@/modules/client/components/PaymentReleaser";
import DashboardNavigation from "@/components/dashboard-client/header/DashboardNavigation";
import Link from "next/link";

export default function ClientDashboard() {
  const { tasks, selectedTask, selectTask, getClientTasks, getTaskOffers } = useClientStore();
  const [activeTab, setActiveTab] = useState("tasks");
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const clientTasks = getClientTasks();
  const taskOffers = selectedTask ? getTaskOffers(selectedTask.id) : [];

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
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Client Dashboard</h2>
              {/* <button
                className="ud-btn btn-thm mt-3"
                onClick={() => setShowTaskCreator(true)}
              >
                <i className="fal fa-plus" /> Create Project
              </button> */}
              <Link href="/client/create-projects" className="ud-btn btn-thm mt-3"><i className="fal fa-plus" /> Create Project</Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Tasks</div>
                <div className="title">{clientTasks.length}</div>
                <div className="text fz14">
                  <span className="text-thm">{clientTasks.filter(t => t.status === TASK_STATES.POSTED).length}</span> Active
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-briefcase" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">In Progress</div>
                <div className="title">{clientTasks.filter(t => t.status === TASK_STATES.IN_PROGRESS).length}</div>
                <div className="text fz14">
                  <span className="text-thm">{clientTasks.filter(t => t.status === TASK_STATES.COMPLETED).length}</span> Completed
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-work" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Offers</div>
                <div className="title">{taskOffers.length}</div>
                <div className="text fz14">
                  <span className="text-thm">Pending</span> Review
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-document" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Escrow</div>
                <div className="title">${clientTasks.filter(t => t.escrow.funded).reduce((sum, t) => sum + t.budget.amount, 0)}</div>
                <div className="text fz14">
                  <span className="text-thm">Secured</span> Funds
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-dollar" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-xl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">My Tasks</h5>
              </div>
              <div className="task-list">
                {clientTasks.length === 0 ? (
                  <div className="text-center p20">
                    <p className="text mb20">No tasks yet.</p>
                    <button
                      className="ud-btn btn-thm"
                      onClick={() => setShowTaskCreator(true)}
                    >
                      Create Your First Task
                    </button>
                  </div>
                ) : (
                  clientTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`task-card bgc-white p20 bdrs8 mb15 cursor-pointer bdr1`}
                      onClick={() => { selectTask(task); setActiveTab("offers"); }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb10">
                        <h6 className="task-title mb0">{task.title}</h6>
                        <span className={getStatusBadgeClass(task.status)}>
                          {TASK_STATE_LABELS[task.status]}
                        </span>
                      </div>
                      <p className="text mb10 fz14">{task.description?.substring(0, 80)}...</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw600 text-thm fz14">${task.budget.amount}</span>
                        {task.escrow.funded && (
                          <span className="badge badge-success fz12">
                            <i className="flaticon-check mr5" /> Escrow
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              {showSuccess && (
                <div className="alert alert-success mb20">
                  Action completed successfully!
                </div>
              )}

              {!selectedTask && (
                <div className="text-center p50">
                  <i className="flaticon-briefcase fz60 text-thm3 mb20 d-block" />
                  <h5 className="text">Select a task from the left to manage offers, escrow, and payments</h5>
                </div>
              )}

              {activeTab === "offers" && selectedTask && (
                <OfferReviewer
                  task={selectedTask}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}

              {activeTab === "escrow" && selectedTask && (
                <EscrowFunding
                  task={selectedTask}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}

              {activeTab === "payments" && selectedTask && (
                <PaymentReleaser
                  task={selectedTask}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}

              {!activeTab && !selectedTask && (
                <div className="text-center p50">
                  <i className="flaticon-document fz60 text-thm3 mb20 d-block" />
                  <h5 className="text">Review worker offers and manage your tasks</h5>
                </div>
              )}
            </div>
          </div>
        </div> */}
        {/* 
        <div className="row">
          <div className="col-md-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">Task Management</h5>
                <div className="d-flex gap10">
                  <button
                    className={`ud-btn btn-sm ${activeTab === "offers" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("offers")}
                    disabled={!selectedTask}
                  >
                    <i className="flaticon-document mr5" /> Offers
                  </button>
                  <button
                    className={`ud-btn btn-sm ${activeTab === "escrow" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("escrow")}
                    disabled={!selectedTask}
                  >
                    <i className="flaticon-dollar mr5" /> Escrow
                  </button>
                  <button
                    className={`ud-btn btn-sm ${activeTab === "payments" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("payments")}
                    disabled={!selectedTask}
                  >
                    <i className="flaticon-credit-card mr5" /> Payments
                  </button>
                </div>
              </div>
              {!selectedTask && (
                <div className="text-center p30">
                  <p className="text">Select a task from My Tasks to manage offers, escrow, and payments</p>
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>

      {/* {showTaskCreator && (
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
              onTaskCreated={() => { setShowTaskCreator(false); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
            />
          </div>
        </div>
      )} */}
    </>
  );
}
