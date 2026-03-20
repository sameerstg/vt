"use client";

import { useState } from "react";
import { TASK_STATES, TASK_STATE_LABELS } from "@/modules/shared/utils/taskStates";

export default function DisputeManager({ disputes, onSuccess }) {
  const [activeDispute, setActiveDispute] = useState(null);
  const [resolutionAction, setResolutionAction] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState("");

  const handleResolve = (disputeId) => {
    setResolutionAction("resolve");
    setActiveDispute(disputes.find(d => d.id === disputeId));
  };

  const handleRefund = (disputeId) => {
    setResolutionAction("refund");
    setActiveDispute(disputes.find(d => d.id === disputeId));
  };

  const handleSuspend = (disputeId) => {
    setResolutionAction("suspend");
    setActiveDispute(disputes.find(d => d.id === disputeId));
  };

  const handleCancelResolution = () => {
    setActiveDispute(null);
    setResolutionAction(null);
    setResolutionNotes("");
  };

  const handleSubmitResolution = async () => {
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update dispute status based on action
      const updatedDisputes = disputes.map(dispute => {
        if (dispute.id === activeDispute.id) {
          switch (resolutionAction) {
            case "resolve":
              return { ...dispute, status: "resolved" };
            case "refund":
              return { ...dispute, status: "resolved" }; // Refunded and resolved
            case "suspend":
              return { ...dispute, status: "resolved" }; // User suspended, dispute resolved
            default:
              return dispute;
          }
        }
        return dispute;
      });
      
      // In a real app, we'd update state here
      onSuccess();
      handleCancelResolution();
    } catch (error) {
      console.error("Failed to submit resolution:", error);
    }
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Dispute Management</h4>

      {disputes.length === 0 ? (
        <p className="text-center">No disputes to manage</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task</th>
                  <th>Client</th>
                  <th>Worker</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((dispute, index) => (
                  <tr key={dispute.id}>
                    <td>{dispute.id}</td>
                    <td>Task #{dispute.taskId}</td>
                    <td>Client #{dispute.clientId}</td>
                    <td>Worker #{dispute.workerId}</td>
                    <td>{dispute.description}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(dispute.status)}`}>
                        {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          type="button"
                          className="ud-btn btn-sm btn-thm"
                          onClick={() => handleResolve(dispute.id)}
                          disabled={dispute.status !== "pending"}
                        >
                          Resolve
                        </button>
                        <button
                          type="button"
                          className="ud-btn btn-sm btn-dark"
                          onClick={() => handleRefund(dispute.id)}
                          disabled={dispute.status !== "pending"}
                        >
                          Refund
                        </button>
                        <button
                          type="button"
                          className="ud-btn btn-sm btn-danger"
                          onClick={() => handleSuspend(dispute.id)}
                          disabled={dispute.status !== "pending"}
                        >
                          Suspend User
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resolution Modal */}
          {activeDispute && resolutionAction && (
            <div className="modal-overlay"
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
            >
              <div
                style={{ 
                  maxWidth: "500px", 
                  width: "100%", 
                  maxHeight: "80vh", 
                  overflowY: "auto",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "30px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb20">
                  <h5>Dispute Resolution</h5>
                  <p className="text mb10">
                    <strong>Dispute #{activeDispute.id}</strong>: {activeDispute.description}
                  </p>
                  <p className="text mb10">
                    <strong>Task:</strong> #{activeDispute.taskId} | 
                    <strong>Client:</strong> #{activeDispute.clientId} | 
                    <strong>Worker:</strong> #{activeDispute.workerId}
                  </p>
                </div>

                <div className="mb20">
                  <label className="form-label fw600 dark-color">Resolution Action</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="resolutionAction"
                      id="resolveOption"
                      value="resolve"
                      checked={resolutionAction === "resolve"}
                      onChange={(e) => setResolutionAction(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="resolveOption">
                      Approve Task Completion
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="resolutionAction"
                      id="refundOption"
                      value="refund"
                      checked={resolutionAction === "refund"}
                      onChange={(e) => setResolutionAction(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="refundOption">
                      Refund Labor Amount
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="resolutionAction"
                      id="suspendOption"
                      value="suspend"
                      checked={resolutionAction === "suspend"}
                      onChange={(e) => setResolutionAction(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="suspendOption">
                      Suspend/Remove User
                    </label>
                  </div>
                </div>

                <div className="mb20">
                  <label className="form-label fw600 dark-color">Resolution Notes (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Add any notes about your resolution decision..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-end gap10">
                  <button
                    type="button"
                    className="ud-btn btn-sm btn-light"
                    onClick={handleCancelResolution}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ud-btn btn-sm btn-thm"
                    onClick={handleSubmitResolution}
                  >
                    {resolutionAction === "resolve" ? "Approve Completion" : 
                     resolutionAction === "refund" ? "Process Refund" : 
                     "Suspend User"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Helper function to get badge class based on dispute status
function getStatusBadgeClass(status) {
  const classes = {
    pending: "badge-warning",
    resolved: "badge-success",
    escalated: "badge-error",
  };
  return classes[status] || "badge-info";
}