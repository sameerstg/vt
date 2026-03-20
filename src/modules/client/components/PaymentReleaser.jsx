"use client";

import { useState } from "react";
import api from "@/modules/shared/utils/api";

export default function PaymentReleaser({ task, onPaymentReleased }) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleReleasePayment = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const result = await api.client.releasePayment(task.id);
      if (result.success) {
        setShowSuccess(true);
        if (onPaymentReleased) onPaymentReleased();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRaiseDispute = async () => {
    if (!task) return;
    const reason = prompt("Please enter the reason for dispute:");
    if (reason) {
      setLoading(true);
      try {
        const result = await api.client.raiseDispute(task.id, reason);
        if (result.success) {
          alert("Dispute raised successfully. Admin will review shortly.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a task to release payment</p>
      </div>
    );
  }

  if (task.status === "completed") {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <h4 className="mb20">Payment Status</h4>
        <div className="text-center">
          <div className="mb15">
            <i className="flaticon-check text-thm fz40" />
          </div>
          <h5 className="text-thm">Payment Released</h5>
          <p className="text">Amount: ${task.escrow.amount}</p>
        </div>
      </div>
    );
  }

  if (task.status !== "in_progress" && task.status !== "completed") {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <h4 className="mb20">Payment Release</h4>
        <p className="text-center">Task must be in progress to release payment</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Release Payment</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Payment released successfully!
        </div>
      )}

      <div className="escrow-info mb20">
        <div className="d-flex justify-content-between mb10">
          <span>Task:</span>
          <span className="fw600">{task.title}</span>
        </div>
        <div className="d-flex justify-content-between mb10">
          <span>Worker:</span>
          <span className="fw600">{task.assignedWorkerId}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Amount:</span>
          <span className="fw600 text-thm fz18">${task.escrow.amount}</span>
        </div>
      </div>

      <div className="d-grid gap-2">
        <button
          className="ud-btn btn-thm"
          onClick={handleReleasePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Release Payment"}
          <i className="fal fa-check" />
        </button>
        <button
          className="ud-btn btn-dark"
          onClick={handleRaiseDispute}
          disabled={loading}
        >
          Raise Dispute
        </button>
      </div>
    </div>
  );
}
