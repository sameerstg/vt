"use client";

import { useState } from "react";
import useWorkerStore from "@/modules/worker/store/workerStore";
import { TASK_STATES, TASK_STATE_LABELS } from "@/modules/shared/utils/taskStates";
import TaskBrowser from "@/modules/worker/components/TaskBrowser";
import OfferSubmitter from "@/modules/worker/components/OfferSubmitter";
import TaskAcceptor from "@/modules/worker/components/TaskAcceptor";
import ProfileBuilder from "@/modules/worker/components/ProfileBuilder";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import api from "@/modules/shared/utils/api";

export default function WorkerDashboard() {
  const { tasks, selectedTask, selectTask, getOpenTasks, getMyTasks, getMyOffers } = useWorkerStore();
  const [activeTab, setActiveTab] = useState("browse");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const openTasks = getOpenTasks();
  const myTasks = getMyTasks();
  const myOffers = getMyOffers();

  const handleTaskSelected = (task) => {
    selectTask(task);
    if (activeTab === "browse") {
      setActiveTab("offer");
    }
  };

  const handleOfferSubmitted = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setActiveTab("my-offers");
  };

  const handleTaskAccepted = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCompleteTask = async (taskId) => {
    const result = await api.worker.completeTask(taskId);
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
                  <h2 className="page_title">Worker Dashboard</h2>
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
                    className={`tab_btn ${activeTab === "browse" ? "active" : ""}`}
                    onClick={() => setActiveTab("browse")}
                  >
                    <i className="flaticon-search" /> Browse Tasks
                    <span className="badge badge-new ml10">{openTasks.length}</span>
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "offer" ? "active" : ""}`}
                    onClick={() => setActiveTab("offer")}
                  >
                    <i className="flaticon-document" /> Submit Offer
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "my-tasks" ? "active" : ""}`}
                    onClick={() => setActiveTab("my-tasks")}
                  >
                    <i className="flaticon-briefcase" /> My Tasks
                    <span className="badge badge-info ml10">{myTasks.length}</span>
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "my-offers" ? "active" : ""}`}
                    onClick={() => setActiveTab("my-offers")}
                  >
                    <i className="flaticon-document" /> My Offers
                    <span className="badge badge-warning ml10">{myOffers.length}</span>
                  </div>
                  <div
                    className={`tab_btn ${activeTab === "profile" ? "active" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <i className="flaticon-photo" /> Profile
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

                {activeTab === "browse" && (
                  <TaskBrowser onTaskSelected={handleTaskSelected} />
                )}

                {activeTab === "offer" && (
                  <div className="row">
                    <div className="col-lg-6">
                      <TaskBrowser onTaskSelected={handleTaskSelected} />
                    </div>
                    <div className="col-lg-6">
                      <OfferSubmitter task={selectedTask} onOfferSubmitted={handleOfferSubmitted} />
                    </div>
                  </div>
                )}

                {activeTab === "my-tasks" && (
                  <div className="my-tasks-section">
                    <h4 className="mb20">My Assigned Tasks</h4>
                    {myTasks.length === 0 ? (
                      <div className="bgc-white p30 bdrs12 text-center">
                        <p className="text">No assigned tasks yet. Browse and apply for tasks!</p>
                      </div>
                    ) : (
                      <div className="task-list">
                        {myTasks.map((task) => (
                          <div key={task.id} className="task-card bgc-white p20 bdrs8 mb15 bdr1">
                            <div className="d-flex justify-content-between align-items-start mb10">
                              <h5 className="task-title mb0">{task.title}</h5>
                              <span className={getStatusBadgeClass(task.status)}>
                                {TASK_STATE_LABELS[task.status]}
                              </span>
                            </div>
                            <p className="text mb10">{task.description?.substring(0, 100)}...</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw600 text-thm">${task.budget.amount}</span>
                              {task.status === TASK_STATES.OFFER_ACCEPTED && (
                                <button
                                  className="ud-btn btn-thm btn-sm"
                                  onClick={() => handleTaskAccepted()}
                                >
                                  Start Task
                                </button>
                              )}
                              {task.status === TASK_STATES.IN_PROGRESS && (
                                <button
                                  className="ud-btn btn-thm btn-sm"
                                  onClick={() => handleCompleteTask(task.id)}
                                >
                                  Complete Task
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "my-offers" && (
                  <div className="my-offers-section">
                    <h4 className="mb20">My Submitted Offers</h4>
                    {myOffers.length === 0 ? (
                      <div className="bgc-white p30 bdrs12 text-center">
                        <p className="text">No offers submitted yet.</p>
                      </div>
                    ) : (
                      <div className="offers-list">
                        {myOffers.map((offer) => {
                          const task = tasks.find(t => t.id === offer.taskId);
                          return (
                            <div key={offer.id} className="offer-card bgc-white p20 bdrs8 mb15 bdr1">
                              <div className="d-flex justify-content-between align-items-start mb10">
                                <div>
                                  <h6 className="mb5">{task?.title || "Task"}</h6>
                                  <span className={`badge ${
                                    offer.status === "pending" ? "badge-warning" :
                                    offer.status === "accepted" ? "badge-success" :
                                    "badge-danger"
                                  }`}>
                                    {offer.status}
                                  </span>
                                </div>
                                <span className="fw600 text-thm">${offer.amount}</span>
                              </div>
                              <p className="text mb0">{offer.terms}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "profile" && (
                  <ProfileBuilder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
