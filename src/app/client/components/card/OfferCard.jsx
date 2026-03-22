"use client";
import { useState, useEffect } from "react";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new", icon: "flaticon-clock" },
  ACCEPTED: { label: "Accepted", class: "badge-assigned", icon: "flaticon-check" },
  REJECTED: { label: "Rejected", class: "badge-cancelled", icon: "flaticon-close" },
  WITHDRAWN: { label: "Withdrawn", class: "badge-cancelled", icon: "flaticon-close" },
};

export default function OfferCard({ offer, project, onAccept, onReject, loading }) {
  const status = statusConfig[offer.status] || statusConfig.PENDING;

  const handleAccept = () => {
    if (onAccept) onAccept(offer);
  };

  const handleReject = () => {
    if (onReject) onReject(offer);
  };

  return (
    <div className="offer-card bdr1 p30 mb20 bdrs8 default-box-shadow1">
      <div className="d-flex align-items-start justify-content-between mb20">
        <div className="d-flex align-items-center">
          <div className="freelancer-avatar me-3">
            <img
              src={offer.workerAvatar || "/images/team/freelancer-1.png"}
              alt={offer.workerName}
              className="rounded-circle"
              style={{ width: 60, height: 60, objectFit: "cover" }}
            />
          </div>
          <div>
            <h6 className="mb5">{offer.workerName}</h6>
            <div className="d-flex align-items-center gap-3">
              <span className="fz14">
                <i className="flaticon-star text-thm me-1" /> 
                {offer.workerRating || 0}
              </span>
              <span className="fz14 text-muted">
                {offer.workerCompletedTasks || 0} tasks completed
              </span>
              <span className={`badge ${status.class}`}>
                <i className={`${status.icon} me-1`} />
                {status.label}
              </span>
            </div>
          </div>
        </div>
        <div className="text-end">
          <span className="fw600 fz20 text-thm">${offer.amount?.toLocaleString()}</span>
          <span className="d-block fz14 text-muted">{offer.estimatedDays} days delivery</span>
        </div>
      </div>
      
      <div className="mb20">
        <p className="text mb0">{offer.terms}</p>
      </div>

      {offer.status === "PENDING" && project?.status === "POSTED" && (
        <div className="d-flex align-items-center justify-content-end gap-2 pt20 bdrbt1">
          <button
            className="ud-btn btn-dark"
            onClick={handleReject}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reject"}
          </button>
          <button
            className="ud-btn btn-thm"
            onClick={handleAccept}
            disabled={loading}
          >
            {loading ? "Processing..." : "Accept Offer"}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      )}
    </div>
  );
}
