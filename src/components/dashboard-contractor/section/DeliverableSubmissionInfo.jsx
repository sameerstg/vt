"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  getAssignmentsForContractor,
  getTaskById,
  updateMockTaskStatus,
} from "@/utils/auth/mockAuth";

export default function DeliverableSubmissionInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [session, setSession] = useState(null);
  const [task, setTask] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
    const s = getAuthSession();
    setSession(s);
    if (s?.id && taskId) {
      const t = getTaskById(taskId);
      setTask(t);
      const all = getAssignmentsForContractor(s.id);
      setAssignments(all.filter(a => a.taskId === taskId));
    }
  }, [taskId]);

  const allMilestones = assignments.flatMap(a =>
    (a.milestones || []).map(m => ({ ...m, workerName: a.workerName }))
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!deliveryNote.trim()) return;
    updateMockTaskStatus(taskId, "Work Submitted");
    showToast("success", "Deliverable submitted to client.");
    setTimeout(() => router.push("/contractor-dashboard"), 1800);
  };

  if (!taskId) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40"><div className="col-lg-12"><DashboardNavigation /></div></div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>No task selected</h4>
              <button onClick={() => router.push("/contractor-dashboard/team/monitor-milestones")} className="ud-btn btn-light-default">
                ← Back to Monitor Milestones
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`vt-toast vt-toast--${t.type}`}>{t.message}</div>
        ))}
      </div>

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Submit Project Deliverable</h2>
            {task && <p className="text">Project: <strong>{task.title}</strong></p>}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-8">
          {/* Milestone Summary */}
          {allMilestones.length > 0 && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="list-title bdrb1 pb15 mb20">Milestone Summary (all completed ✓)</h5>
              {allMilestones.map((m, i) => (
                <div key={i} className="milestone-summary-row">
                  <span className="fw500">{m.title}</span>
                  <span className="text-muted fz13">— {m.workerName}</span>
                  <span className="ms-auto" style={{ color: "#28a745", fontSize: "13px", fontWeight: 600 }}>✓</span>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Note */}
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="list-title bdrb1 pb15 mb20">Delivery Note</h5>
            <form className="form-style1" onSubmit={handleSubmit}>
              <div className="mb20">
                <textarea
                  rows={5}
                  className={`form-control${submitAttempted && !deliveryNote.trim() ? " is-invalid" : ""}`}
                  placeholder="Summarize what was delivered and any important notes for the client..."
                  value={deliveryNote}
                  onChange={e => setDeliveryNote(e.target.value)}
                />
                {submitAttempted && !deliveryNote.trim() && (
                  <small className="text-danger d-block mt5">Delivery note is required.</small>
                )}
              </div>
              <div className="d-flex gap-3 justify-content-end">
                <button
                  type="button"
                  className="ud-btn btn-light-default"
                  onClick={() => router.push("/contractor-dashboard/team/monitor-milestones")}
                >
                  Cancel
                </button>
                <button type="submit" className="ud-btn btn-thm">
                  Submit to Client <i className="fal fa-arrow-right-long ms-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .milestone-summary-row { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #f7f7f7; border-radius: 6px; margin-bottom: 8px; font-size: 13px; }
      `}</style>
    </div>
  );
}
