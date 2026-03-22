"use client";
import { useState } from "react";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new", color: "#999" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress", color: "#3498db" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted", color: "#f39c12" },
  APPROVED: { label: "Approved", class: "badge-completed", color: "#27ae60" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute", color: "#e74c3c" },
};

export default function MilestoneCard({ milestone, onApprove, loading }) {
  const status = statusConfig[milestone.status] || statusConfig.PENDING;
  
  const handleApprove = () => {
    if (onApprove) onApprove(milestone);
  };

  return (
    <div className="milestone-card bdr1 p20 mb15 bdrs8">
      <div className="d-flex align-items-center justify-content-between mb15">
        <div className="d-flex align-items-center">
          <span className="milestone-number me-3">{milestone.order}</span>
          <div>
            <h6 className="mb5">{milestone.title}</h6>
            {milestone.description && (
              <p className="fz14 text-muted mb0">{milestone.description}</p>
            )}
          </div>
        </div>
        <span className={`badge ${status.class}`} style={{ color: status.color }}>
          {status.label}
        </span>
      </div>
      
      <div className="d-flex align-items-center justify-content-between pt15 bdrbt1">
        <div className="d-flex align-items-center gap-3">
          <span className="fw600 fz16">${milestone.amount?.toLocaleString()}</span>
          {milestone.dueDate && (
            <span className="fz14 text-muted">
              <i className="flaticon-calendar me-1" />
              Due: {new Date(milestone.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {milestone.status === "SUBMITTED" && (
          <button
            className="ud-btn btn-thm btn-sm"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading ? "Processing..." : "Approve"}
          </button>
        )}
        
        {milestone.status === "APPROVED" && milestone.approvedAt && (
          <span className="fz12 text-success">
            <i className="flaticon-check me-1" />
            Approved {new Date(milestone.approvedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
