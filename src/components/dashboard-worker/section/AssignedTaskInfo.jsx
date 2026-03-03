"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  assignedTask,
  assignedTaskMessages,
  assignedTaskMilestones,
} from "@/data/dashboardWorker";

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed")) return "style4";
  if (normalized.includes("submitted")) return "style1";
  if (normalized.includes("progress")) return "style6";
  return "style5";
};

export default function AssignedTaskInfo() {
  const [taskStatus, setTaskStatus] = useState(assignedTask.status);
  const [submissionNote, setSubmissionNote] = useState("");
  const [hasSubmittedWork, setHasSubmittedWork] = useState(false);
  const [messages, setMessages] = useState(assignedTaskMessages);
  const [newMessage, setNewMessage] = useState("");

  const milestoneStats = useMemo(() => {
    const completed = assignedTaskMilestones.filter((item) =>
      item.status.toLowerCase().includes("completed")
    ).length;
    const inProgress = assignedTaskMilestones.filter((item) =>
      item.status.toLowerCase().includes("progress")
    ).length;
    const pending = assignedTaskMilestones.length - completed - inProgress;
    return { completed, inProgress, pending };
  }, []);

  const handleSubmitWork = (event) => {
    event.preventDefault();
    setTaskStatus("Work Submitted");
    setHasSubmittedWork(true);
    if (submissionNote.trim()) {
      const workerMessage = {
        id: Date.now(),
        sender: "Worker",
        senderName: "You",
        time: "Just now",
        text: `Work submitted note: ${submissionNote.trim()}`,
      };
      setMessages((prev) => [...prev, workerMessage]);
      setSubmissionNote("");
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!newMessage.trim()) return;
    const message = {
      id: Date.now(),
      sender: "Worker",
      senderName: "You",
      time: "Just now",
      text: newMessage.trim(),
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="dashboard__content hover-bgc-color assigned-task-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-9">
          <div className="dashboard_title_area">
            <h2>Assigned Task</h2>
            <p className="text">Purpose: Execute assigned task.</p>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="status-chip-wrap text-lg-end">
            <span className={`pending-style ${getStatusClass(taskStatus)}`}>{taskStatus}</span>
          </div>
        </div>
      </div>

      {hasSubmittedWork && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              Work submitted successfully. Client has been notified.
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-xxl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Task Details</h5>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="mb8 text">
                  <strong>Task ID:</strong> {assignedTask.id}
                </p>
                <p className="mb8 text">
                  <strong>Client:</strong> {assignedTask.client}
                </p>
                <p className="mb8 text">
                  <strong>Category:</strong> {assignedTask.category}
                </p>
                <p className="mb8 text">
                  <strong>Location:</strong> {assignedTask.location}
                </p>
              </div>
              <div className="col-md-6">
                <p className="mb8 text">
                  <strong>Budget Model:</strong> {assignedTask.budgetModel}
                </p>
                <p className="mb8 text">
                  <strong>Offer Amount:</strong> {assignedTask.offerAmount}
                </p>
                <p className="mb8 text">
                  <strong>Timeline:</strong> {assignedTask.timeline}
                </p>
                <p className="mb8 text">
                  <strong>Due Date:</strong> {assignedTask.dueDate}
                </p>
              </div>
            </div>

            <div className="bdrt1 pt20 mt20">
              <h6 className="mb10">{assignedTask.title}</h6>
              <p className="text mb15">{assignedTask.description}</p>
              <h6 className="mb10">Deliverables</h6>
              <ul className="deliverables-list mb-0">
                {assignedTask.deliverables.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Status Indicator</h5>
            </div>
            <div className="status-indicator-box">
              <div className="mb15">
                <span className={`pending-style ${getStatusClass(taskStatus)}`}>{taskStatus}</span>
              </div>
              <p className="text mb8">
                <strong>Start Date:</strong> {assignedTask.startDate}
              </p>
              <p className="text mb8">
                <strong>Due Date:</strong> {assignedTask.dueDate}
              </p>
              <p className="text mb0">
                <strong>Priority:</strong> {assignedTask.priority}
              </p>
            </div>

            <div className="bdrt1 pt20 mt20">
              <h6 className="mb10">Milestone Summary</h6>
              <p className="text mb5">
                <strong>Completed:</strong> {milestoneStats.completed}
              </p>
              <p className="text mb5">
                <strong>In Progress:</strong> {milestoneStats.inProgress}
              </p>
              <p className="text mb0">
                <strong>Pending:</strong> {milestoneStats.pending}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title">Milestones</h5>
            </div>

            <div className="row">
              {assignedTaskMilestones.map((milestone) => (
                <div key={milestone.id} className="col-xl-4 col-md-6">
                  <div className="milestone-card">
                    <div className="d-flex justify-content-between align-items-center mb10">
                      <h6 className="mb-0">{milestone.title}</h6>
                      <span className={`pending-style ${getStatusClass(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text mb8">
                      <strong>Due:</strong> {milestone.dueDate}
                    </p>
                    <p className="text mb10">
                      <strong>Amount:</strong> {milestone.amount}
                    </p>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <small className="text d-block mt5">{milestone.progress}% complete</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title">Submit Work Button</h5>
            </div>

            <form className="form-style1" onSubmit={handleSubmitWork}>
              <div className="row align-items-end">
                <div className="col-lg-9">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Submission Note</label>
                    <textarea
                      cols={30}
                      rows={4}
                      placeholder="Add update for client before submitting work..."
                      value={submissionNote}
                      onChange={(event) => setSubmissionNote(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb20 text-lg-end">
                    <button type="submit" className="ud-btn btn-thm w-100 w-lg-auto">
                      Submit Work
                      <i className="fal fa-arrow-right-long" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title">Messaging Thread</h5>
            </div>

            <div className="thread-wrap">
              {messages.map((message) => {
                const isWorker = message.sender === "Worker";
                return (
                  <div key={message.id} className={`thread-item ${isWorker ? "worker" : "client"}`}>
                    <div className="thread-meta">
                      <strong>{message.senderName}</strong> <span>{message.time}</span>
                    </div>
                    <p className="mb-0">{message.text}</p>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendMessage} className="message-compose">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message to client..."
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
              />
              <button type="submit" className="ud-btn btn-thm">
                Send
                <i className="fal fa-arrow-right-long" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .status-chip-wrap .pending-style {
          padding: 7px 14px;
          border-radius: 20px;
          font-size: 13px;
        }

        .deliverables-list {
          padding-left: 18px;
        }

        .deliverables-list li {
          margin-bottom: 8px;
          color: #4b5563;
        }

        .status-indicator-box {
          background: #fbfcff;
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 16px;
        }

        .milestone-card {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 16px;
          height: calc(100% - 16px);
        }

        .progress-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: #eef1f7;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: #5b2dff;
        }

        .thread-wrap {
          max-height: 420px;
          overflow-y: auto;
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 18px;
          background: #fbfcff;
        }

        .thread-item {
          max-width: 85%;
          padding: 12px 14px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .thread-item.client {
          background: #fff;
          border: 1px solid #e6eaf4;
        }

        .thread-item.worker {
          margin-left: auto;
          background: #f4f0ff;
          border: 1px solid #dfd3ff;
        }

        .thread-meta {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 6px;
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .message-compose {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
        }

        @media (max-width: 767px) {
          .message-compose {
            grid-template-columns: 1fr;
          }

          .thread-item {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
