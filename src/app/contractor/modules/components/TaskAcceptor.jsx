"use client";

import { useState } from "react";
import api from "@/modules/shared/utils/api";

export default function TaskAcceptor({ task, onTaskAccepted }) {
  const [loading, setLoading] = useState(false);

  const handleAcceptTask = async () => {
    if (!task) return;
    setLoading(true);
    try {
      const result = await api.worker.acceptTask(task.id);
      if (result.success && onTaskAccepted) {
        onTaskAccepted();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select an assigned task to start</p>
      </div>
    );
  }

  if (task.status !== "offer_accepted") {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Task must be accepted by client first</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Start Task</h4>
      
      <div className="task-details mb20">
        <h5 className="mb10">{task.title}</h5>
        <p className="text mb15">{task.description}</p>
        
        <div className="d-flex justify-content-between mb10">
          <span>Payment:</span>
          <span className="fw600 text-thm fz18">${task.budget.amount}</span>
        </div>
        <div className="d-flex justify-content-between mb10">
          <span>Scheduled:</span>
          <span>{task.schedule.date} ({task.schedule.timeWindow})</span>
        </div>
        {task.location && (
          <div className="d-flex justify-content-between">
            <span>Location:</span>
            <span>{task.location.address}</span>
          </div>
        )}
      </div>

      <div className="bgc-thm4 p15 bdrs8 mb20">
        <p className="text mb0">
          <i className="flaticon-information mr10" />
          By accepting this task, you agree to complete it according to the agreed terms.
        </p>
      </div>

      <button
        className="ud-btn btn-thm w-100"
        onClick={handleAcceptTask}
        disabled={loading}
      >
        {loading ? "Processing..." : "Accept & Start Task"}
        <i className="fal fa-play" />
      </button>
    </div>
  );
}
