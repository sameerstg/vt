"use client";

import { useState } from "react";
import useContractorStore from "@/modules/contractor/store/contractorStore";
import api from "@/modules/shared/utils/api";

export default function PayrollDistributor({ task }) {
  const { teamMembers } = useContractorStore();
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const taskAmount = task?.budget?.amount || 0;

  const handleDistributionChange = (memberId, value) => {
    setDistributions(prev => ({
      ...prev,
      [memberId]: parseFloat(value) || 0,
    }));
  };

  const getTotalDistributed = () => {
    return Object.values(distributions).reduce((sum, val) => sum + val, 0);
  };

  const getRemainingAmount = () => {
    return taskAmount - getTotalDistributed();
  };

  const handleDistribute = async () => {
    if (!task) return;
    if (getRemainingAmount() !== 0) {
      alert("Total distribution must equal task amount");
      return;
    }
    setLoading(true);
    try {
      const result = await api.contractor.distributePayment(task.id, distributions);
      if (result.success) {
        setShowSuccess(true);
        setDistributions([]);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a completed task to distribute payment</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Distribute Payment</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Payment distributed successfully!
        </div>
      )}

      <div className="task-summary bgc-thm4 p15 bdrs8 mb20">
        <div className="d-flex justify-content-between">
          <span>Task:</span>
          <span className="fw600">{task.title}</span>
        </div>
        <div className="d-flex justify-content-between mt10">
          <span>Total Amount:</span>
          <span className="fw600 text-thm fz18">${taskAmount}</span>
        </div>
      </div>

      {teamMembers.length === 0 ? (
        <div className="text-center p30">
          <p className="text">No team members to distribute payment to.</p>
        </div>
      ) : (
        <>
          <div className="distributions-list mb20">
            {teamMembers.map((member) => (
              <div key={member.id} className="distribution-item d-flex justify-content-between align-items-center mb10">
                <span className="fw500">{member.name}</span>
                <div className="d-flex align-items-center gap-2">
                  <span>$</span>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "120px" }}
                    placeholder="0.00"
                    value={distributions[member.id] || ""}
                    onChange={(e) => handleDistributionChange(member.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="summary bdr1 p15 bdrs8 mb20">
            <div className="d-flex justify-content-between mb10">
              <span>Total Distributed:</span>
              <span className="fw600">${getTotalDistributed().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Remaining:</span>
              <span className={`fw600 ${getRemainingAmount() === 0 ? "text-thm" : "text-danger"}`}>
                ${getRemainingAmount().toFixed(2)}
              </span>
            </div>
          </div>

          <button
            className="ud-btn btn-thm w-100"
            onClick={handleDistribute}
            disabled={loading || getRemainingAmount() !== 0 || teamMembers.length === 0}
          >
            {loading ? "Distributing..." : "Distribute Payment"}
            <i className="fal fa-paper-plane" />
          </button>
        </>
      )}
    </div>
  );
}
