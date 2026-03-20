"use client";

import { useState } from "react";
import api from "@/modules/shared/utils/api";

export default function EscrowFunding({ task, onEscrowFunded }) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFundEscrow = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const result = await api.client.fundEscrow(task.id, task.budget.amount);
      if (result.success) {
        setShowSuccess(true);
        if (onEscrowFunded) onEscrowFunded();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a task to fund escrow</p>
      </div>
    );
  }

  if (task.escrow.funded) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <h4 className="mb20">Escrow Status</h4>
        <div className="text-center">
          <div className="mb15">
            <i className="flaticon-check text-thm fz40" />
          </div>
          <h5 className="text-thm">Escrow Funded</h5>
          <p className="text">Amount: ${task.escrow.amount}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Fund Escrow</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Escrow funded successfully!
        </div>
      )}

      <div className="escrow-info mb20">
        <div className="d-flex justify-content-between mb10">
          <span>Task:</span>
          <span className="fw600">{task.title}</span>
        </div>
        <div className="d-flex justify-content-between mb10">
          <span>Amount:</span>
          <span className="fw600 text-thm fz18">${task.budget.amount}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Status:</span>
          <span className="badge badge-warning">Pending</span>
        </div>
      </div>

      <div className="escrow-info bgc-thm4 p15 bdrs8 mb20">
        <p className="text mb0">
          <i className="flaticon-information mr10" />
          Funds will be held securely until task completion is approved.
        </p>
      </div>

      <button
        className="ud-btn btn-thm w-100"
        onClick={handleFundEscrow}
        disabled={loading}
      >
        {loading ? "Processing..." : `Fund $${task.budget.amount}`}
        <i className="fal fa-arrow-right-long" />
      </button>
    </div>
  );
}
