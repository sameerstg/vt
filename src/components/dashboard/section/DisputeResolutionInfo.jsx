"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const initialDisputes = [
  {
    id: "DSP-4101",
    status: "Ongoing",
    raisedOn: "2026-03-01",
    projectTitle: "Checkout Flow Revamp",
    taskTitle: "Milestone 2 - Payment and Validation",
    clientName: "BluePeak Labs",
    contractorName: "Ahsan Raza",
    reason: "Quality mismatch",
    description:
      "Client reported that checkout validation states and mobile spacing do not fully match the approved Figma milestone.",
    escrow: {
      totalReceived: "$1,400",
      laborAmount: "$450",
      released: "$700",
      remaining: "$700",
      status: "On Hold",
    },
    uploadedProof: [
      { id: "pf-1", name: "ui-diff-report.pdf", size: "1.1 MB" },
      { id: "pf-2", name: "validation-screen-recording.mp4", size: "7.4 MB" },
    ],
    messages: [
      {
        id: "m-1",
        sender: "Client",
        senderName: "BluePeak Labs",
        time: "2026-03-01 10:15",
        text: "Validation message styles are inconsistent in two checkout steps.",
      },
      {
        id: "m-2",
        sender: "Contractor",
        senderName: "Ahsan Raza",
        time: "2026-03-01 12:05",
        text: "I have pushed a fix branch and attached evidence for review.",
      },
    ],
    resolutionAction: "Pending",
  },
  {
    id: "DSP-4098",
    status: "Closed",
    raisedOn: "2026-02-24",
    projectTitle: "Notification Module Upgrade",
    taskTitle: "Milestone 3 - Trigger Rules",
    clientName: "NovaScale",
    contractorName: "Sara Khan",
    reason: "Timeline delay",
    description:
      "Delivery date was exceeded by five days and client requested partial labor refund from escrow.",
    escrow: {
      totalReceived: "$2,000",
      laborAmount: "$300",
      released: "$1,400",
      remaining: "$600",
      status: "Partially Refunded",
    },
    uploadedProof: [
      { id: "pf-3", name: "milestone-timeline.pdf", size: "620 KB" },
      { id: "pf-4", name: "client-approval-mail.png", size: "390 KB" },
    ],
    messages: [
      {
        id: "m-3",
        sender: "Admin",
        senderName: "Dispute Admin",
        time: "2026-02-25 09:30",
        text: "Refund labor amount was approved and dispute has been closed.",
      },
    ],
    resolutionAction: "Refund Labor Amount",
  },
  {
    id: "DSP-4089",
    status: "Solved",
    raisedOn: "2026-02-17",
    projectTitle: "SEO and Analytics Setup",
    taskTitle: "Final Delivery Package",
    clientName: "SellCraft",
    contractorName: "Bilal Ahmed",
    reason: "Scope clarification",
    description:
      "Client and contractor agreed on final deliverables after admin review and completion was approved.",
    escrow: {
      totalReceived: "$900",
      laborAmount: "$260",
      released: "$900",
      remaining: "$0",
      status: "Released",
    },
    uploadedProof: [
      { id: "pf-5", name: "handover-notes.docx", size: "240 KB" },
      { id: "pf-6", name: "tracking-dashboard.png", size: "870 KB" },
    ],
    messages: [
      {
        id: "m-4",
        sender: "Admin",
        senderName: "Dispute Admin",
        time: "2026-02-18 16:20",
        text: "Completion was approved after evidence validation.",
      },
    ],
    resolutionAction: "Approve Completion",
  },
];

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("solved")) return "style4";
  if (normalized.includes("closed")) return "style5";
  return "style6";
};

const getEscrowStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("released")) return "style4";
  if (normalized.includes("refunded")) return "style5";
  return "style1";
};

export default function DisputeResolutionInfo() {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [statusFilter, setStatusFilter] = useState("Ongoing");
  const [selectedDisputeId, setSelectedDisputeId] = useState(initialDisputes[0].id);
  const [adminNote, setAdminNote] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const counts = useMemo(() => {
    const ongoing = disputes.filter((item) => item.status === "Ongoing").length;
    const closed = disputes.filter((item) => item.status === "Closed").length;
    const solved = disputes.filter((item) => item.status === "Solved").length;
    return { ongoing, closed, solved };
  }, [disputes]);

  const filteredDisputes = useMemo(() => {
    if (statusFilter === "All") return disputes;
    return disputes.filter((item) => item.status === statusFilter);
  }, [disputes, statusFilter]);

  const activeDispute = useMemo(() => {
    return (
      disputes.find((item) => item.id === selectedDisputeId) ||
      filteredDisputes[0] ||
      null
    );
  }, [disputes, filteredDisputes, selectedDisputeId]);

  const applyResolution = (actionType) => {
    if (!activeDispute) return;

    let nextStatus = activeDispute.status;
    let nextEscrowStatus = activeDispute.escrow.status;
    let nextAction = "Pending";
    let text = "";

    if (actionType === "approve") {
      nextStatus = "Solved";
      nextEscrowStatus = "Released";
      nextAction = "Approve Completion";
      text = "Admin approved completion and released remaining escrow.";
    }

    if (actionType === "refund") {
      nextStatus = "Closed";
      nextEscrowStatus = "Partially Refunded";
      nextAction = "Refund Labor Amount";
      text = "Admin approved labor refund from escrow and closed the dispute.";
    }

    if (actionType === "suspend") {
      nextStatus = "Closed";
      nextEscrowStatus = "On Hold";
      nextAction = "Suspend User";
      text = "Admin suspended user access and kept escrow on hold for compliance review.";
    }

    const noteSuffix = adminNote.trim() ? ` Note: ${adminNote.trim()}` : "";
    const newMessage = {
      id: `m-${Date.now()}`,
      sender: "Admin",
      senderName: "Dispute Admin",
      time: "Just now",
      text: `${text}${noteSuffix}`,
    };

    setDisputes((prev) =>
      prev.map((item) =>
        item.id === activeDispute.id
          ? {
              ...item,
              status: nextStatus,
              resolutionAction: nextAction,
              escrow: {
                ...item.escrow,
                status: nextEscrowStatus,
              },
              messages: [...item.messages, newMessage],
            }
          : item
      )
    );

    setActionMessage(`${nextAction} applied for ${activeDispute.id}.`);
    setAdminNote("");
    setStatusFilter("All");
  };

  return (
    <div className="dashboard__content hover-bgc-color dispute-resolution-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Dispute Resolution</h2>
            <p className="text">Admin dispute handling for active project conflicts.</p>
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
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <h5 className="list-title mb-0">Dispute Status</h5>
              <div className="status-filter-wrap">
                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === "Ongoing" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Ongoing")}
                >
                  Ongoing ({counts.ongoing})
                </button>
                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === "Closed" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Closed")}
                >
                  Closed ({counts.closed})
                </button>
                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === "Solved" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Solved")}
                >
                  Solved ({counts.solved})
                </button>
                <button
                  type="button"
                  className={`status-filter-btn ${statusFilter === "All" ? "active" : ""}`}
                  onClick={() => setStatusFilter("All")}
                >
                  All ({disputes.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Dispute List</h5>
            </div>
            <div className="dispute-list-wrap">
              {filteredDisputes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`dispute-list-item ${
                    activeDispute?.id === item.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDisputeId(item.id);
                    setActionMessage("");
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb8">
                    <strong>{item.id}</strong>
                    <span className={`pending-style ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mb5 text fw500">{item.projectTitle}</p>
                  <p className="mb0 text">Raised: {item.raisedOn}</p>
                </button>
              ))}
              {!filteredDisputes.length && (
                <div className="empty-box">
                  <p className="mb0 text">No disputes found in this status.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xxl-8">
          {activeDispute ? (
            <>
              <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
                <div className="bdrb1 pb15 mb20">
                  <h5 className="list-title mb-0">Task Summary</h5>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb8 text">
                      <strong>Project:</strong> {activeDispute.projectTitle}
                    </p>
                    <p className="mb8 text">
                      <strong>Task:</strong> {activeDispute.taskTitle}
                    </p>
                    <p className="mb8 text">
                      <strong>Client:</strong> {activeDispute.clientName}
                    </p>
                    <p className="mb0 text">
                      <strong>Contractor:</strong> {activeDispute.contractorName}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb8 text">
                      <strong>Reason:</strong> {activeDispute.reason}
                    </p>
                    <p className="mb8 text">
                      <strong>Current Status:</strong>{" "}
                      <span className={`pending-style ${getStatusClass(activeDispute.status)}`}>
                        {activeDispute.status}
                      </span>
                    </p>
                    <p className="mb8 text">
                      <strong>Last Resolution:</strong> {activeDispute.resolutionAction}
                    </p>
                    <p className="mb0 text">
                      <strong>Raised On:</strong> {activeDispute.raisedOn}
                    </p>
                  </div>
                </div>
                <div className="bdrt1 pt15 mt15">
                  <p className="mb0 text">{activeDispute.description}</p>
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
                <div className="bdrb1 pb15 mb20">
                  <h5 className="list-title mb-0">Escrow Status</h5>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-xl-3">
                    <div className="escrow-box">
                      <p className="mb5 text">Total Escrow Received</p>
                      <h6 className="mb0">{activeDispute.escrow.totalReceived}</h6>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="escrow-box">
                      <p className="mb5 text">Labor Amount</p>
                      <h6 className="mb0">{activeDispute.escrow.laborAmount}</h6>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="escrow-box">
                      <p className="mb5 text">Released</p>
                      <h6 className="mb0">{activeDispute.escrow.released}</h6>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="escrow-box">
                      <p className="mb5 text">Remaining</p>
                      <h6 className="mb0">{activeDispute.escrow.remaining}</h6>
                    </div>
                  </div>
                </div>
                <div className="mt15">
                  <span
                    className={`pending-style ${getEscrowStatusClass(
                      activeDispute.escrow.status
                    )}`}
                  >
                    {activeDispute.escrow.status}
                  </span>
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
                <div className="bdrb1 pb15 mb20">
                  <h5 className="list-title mb-0">Message Thread</h5>
                </div>
                <div className="thread-wrap">
                  {activeDispute.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`thread-item ${
                        message.sender.toLowerCase().includes("admin")
                          ? "admin"
                          : message.sender.toLowerCase().includes("client")
                            ? "client"
                            : "contractor"
                      }`}
                    >
                      <div className="thread-meta">
                        <strong>{message.senderName}</strong>
                        <span>{message.time}</span>
                      </div>
                      <p className="mb-0">{message.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
                <div className="bdrb1 pb15 mb20">
                  <h5 className="list-title mb-0">Uploaded Proof</h5>
                </div>
                <div className="row">
                  {activeDispute.uploadedProof.map((proof) => (
                    <div key={proof.id} className="col-md-6">
                      <div className="proof-item">
                        <div>
                          <p className="mb2 fw500">{proof.name}</p>
                          <p className="mb0 text">{proof.size}</p>
                        </div>
                        <button type="button" className="ud-btn btn-thm-border proof-btn">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
                <div className="bdrb1 pb15 mb20">
                  <h5 className="list-title mb-0">Resolution Actions</h5>
                </div>
                <div className="form-style1 mb20">
                  <label className="heading-color ff-heading fw500 mb10">Admin Note (optional)</label>
                  <textarea
                    cols={30}
                    rows={4}
                    placeholder="Add internal resolution note..."
                    value={adminNote}
                    onChange={(event) => setAdminNote(event.target.value)}
                  />
                </div>
                <div className="resolution-action-wrap">
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={() => applyResolution("approve")}
                  >
                    Approve Completion
                    <i className="fal fa-arrow-right-long" />
                  </button>
                  <button
                    type="button"
                    className="ud-btn btn-thm-border"
                    onClick={() => applyResolution("refund")}
                  >
                    Refund Labor Amount
                  </button>
                  <button
                    type="button"
                    className="ud-btn btn-danger"
                    onClick={() => applyResolution("suspend")}
                  >
                    Suspend User
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <p className="mb-0 text">Select a dispute to view resolution details.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .status-filter-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .status-filter-btn {
          border: 1px solid #dbe1ee;
          background: #fff;
          border-radius: 8px;
          padding: 7px 12px;
          font-size: 13px;
          font-weight: 600;
          color: #4b5563;
        }

        .status-filter-btn.active,
        .status-filter-btn:hover {
          border-color: #5b2dff;
          color: #5b2dff;
          background: #f5f1ff;
        }

        .dispute-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 640px;
          overflow-y: auto;
        }

        .dispute-list-item {
          width: 100%;
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fff;
          padding: 12px;
          text-align: left;
        }

        .dispute-list-item.active,
        .dispute-list-item:hover {
          border-color: #c9bcff;
          background: #faf8ff;
        }

        .empty-box {
          border: 1px dashed #d7deec;
          border-radius: 10px;
          padding: 18px;
          background: #fbfcff;
          text-align: center;
        }

        .escrow-box {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 12px;
          background: #fbfcff;
          margin-bottom: 12px;
        }

        .thread-wrap {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fbfcff;
          padding: 15px;
          max-height: 340px;
          overflow-y: auto;
        }

        .thread-item {
          margin-bottom: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          max-width: 92%;
        }

        .thread-item.client {
          background: #ffffff;
          border: 1px solid #e6ebf5;
        }

        .thread-item.contractor {
          background: #f5f8ff;
          border: 1px solid #dfe8ff;
          margin-left: auto;
        }

        .thread-item.admin {
          background: #f3f0ff;
          border: 1px solid #d9ceff;
          margin-left: auto;
        }

        .thread-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .proof-item {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fbfcff;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .proof-btn {
          min-width: 84px;
          padding: 0 14px;
          height: 40px;
        }

        .resolution-action-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 575px) {
          .resolution-action-wrap .ud-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
