"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  getContractorAssignmentForWorker,
  getTaskById,
  submitWorkerWork,
  updateMilestoneStatus,
  getWorkerClientMilestones,
  updateWorkerClientMilestone,
} from "@/utils/auth/mockAuth";
import { workerTasks } from "@/data/workerTasks";

const getStatusClass = (status = "") => {
  const s = status.toLowerCase();
  if (s === "completed") return "style4";
  if (s === "submitted") return "style1";
  if (s === "revision") return "style5";
  if (s === "working") return "style6";
  return "style5";
};

export default function AssignedTaskDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const source = searchParams.get("source") || "client";

  const [task, setTask] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [session, setSession] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [revisionModal, setRevisionModal] = useState(null);

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
    const s = getAuthSession();
    setSession(s);
    if (!taskId || !s?.id) return;

    if (source === "contractor") {
      const assignment = getContractorAssignmentForWorker(s.id, taskId);
      if (assignment) {
        setTask({
          id: assignment.taskId,
          title: assignment.taskTitle,
          contractorId: assignment.contractorId,
          source: "contractor",
        });
        setMilestones(assignment.milestones || []);
      }
    } else {
      const t = getTaskById(taskId) || workerTasks.find(w => String(w.id) === String(taskId));
      if (t) {
        setTask({ ...t, source: "client" });
        setMilestones(t.milestones || []);
      }
    }
  }, [taskId, source]);

  const handleUpdateProgress = (milestoneId, progress) => {
    if (!session?.id || !task) return;
    if (source === "contractor") {
      updateMilestoneStatus(task.contractorId, task.id, session.id, milestoneId, { progress });
      setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, progress } : m));
    }
  };

  const handleSubmitMilestone = (milestoneId) => {
    if (!session?.id || !task) return;
    if (source === "contractor") {
      updateMilestoneStatus(task.contractorId, task.id, session.id, milestoneId, { status: "submitted" });
      setMilestones(prev => prev.map(m => m.id === milestoneId ? { ...m, status: "submitted" } : m));
      showToast("success", "Milestone submitted for contractor review.");
    }
  };

  const handleSubmitAll = () => {
    if (!session?.id || !task) return;
    const pendingIds = milestones
      .filter(m => m.status === "working" || m.status === "revision")
      .map(m => m.id);
    if (pendingIds.length === 0) {
      showToast("info", "No milestones to submit.");
      return;
    }
    submitWorkerWork(session.id, task.id, pendingIds, { note: "All milestones submitted." });
    setMilestones(prev =>
      prev.map(m => pendingIds.includes(m.id) ? { ...m, status: "submitted" } : m)
    );
    showToast("success", "All pending milestones submitted.");
  };

  if (!taskId) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40"><div className="col-lg-12"><DashboardNavigation /></div></div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>No task selected</h4>
              <p className="text mb20">Please navigate from the Assigned Tasks list.</p>
              <button onClick={() => router.push("/worker-dashboard/assigned-projects")} className="ud-btn btn-thm">
                ← Back to Assigned Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40"><div className="col-lg-12"><DashboardNavigation /></div></div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>Task not found</h4>
              <button onClick={() => router.push("/worker-dashboard/assigned-projects")} className="ud-btn btn-light-default">
                ← Back to Assigned Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allCompleted = milestones.length > 0 && milestones.every(m => m.status === "completed" || m.status === "submitted");

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`vt-toast vt-toast--${t.type}`}>{t.message}</div>
        ))}
      </div>

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-8">
          <div className="dashboard_title_area">
            <h2>{task.title}</h2>
            <p className="text mb0">
              Source:{" "}
              <span className={`source-badge source-badge--${source}`}>
                {source === "contractor" ? "Via Contractor" : "Client Direct"}
              </span>
            </p>
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
          <button onClick={() => router.push("/worker-dashboard/assigned-projects")} className="ud-btn btn-light-default">
            ← Back to Assigned Tasks
          </button>
        </div>
      </div>

      {/* Milestones */}
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb25">
              <h5 className="list-title mb-0">Your Milestones</h5>
              {source === "contractor" && (
                <button onClick={handleSubmitAll} className="ud-btn btn-thm" style={{ padding: "7px 18px", fontSize: "13px" }}>
                  Submit All Work
                </button>
              )}
            </div>

            {milestones.length === 0 && (
              <p className="text text-muted">No milestones assigned yet.</p>
            )}

            <div className="row g-3">
              {milestones.map(m => (
                <div key={m.id} className="col-xl-6">
                  <div className="milestone-card">
                    <div className="d-flex justify-content-between align-items-start mb10">
                      <h6 className="mb0">{m.title}</h6>
                      <span className={`pending-style ${getStatusClass(m.status)}`}>{m.status}</span>
                    </div>

                    <div className="d-flex gap-4 mb10">
                      <p className="text mb0 fz13"><strong>Due:</strong> {m.deadline || "—"}</p>
                      <p className="text mb0 fz13"><strong>Value:</strong> ${m.price || 0}</p>
                    </div>

                    {m.contractorNote && m.status === "revision" && (
                      <div className="revision-note mb10">
                        <strong>Revision Note:</strong> {m.contractorNote}
                      </div>
                    )}

                    <div className="progress-track mb5">
                      <div className="progress-fill" style={{ width: `${m.progress || 0}%` }} />
                    </div>
                    <small className="text d-block mb12">{m.progress || 0}% complete</small>

                    {source === "contractor" && (m.status === "working" || m.status === "revision") && (
                      <div className="d-flex gap-2 flex-wrap">
                        <select
                          className="form-select form-select-sm"
                          style={{ width: "auto", fontSize: "12px" }}
                          value={m.progress || 0}
                          onChange={e => handleUpdateProgress(m.id, Number(e.target.value))}
                        >
                          {[0, 25, 50, 75, 100].map(v => (
                            <option key={v} value={v}>{v}%</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleSubmitMilestone(m.id)}
                          className="ud-btn btn-thm"
                          style={{ padding: "4px 14px", fontSize: "12px" }}
                        >
                          Submit Milestone
                        </button>
                      </div>
                    )}

                    {m.status === "submitted" && (
                      <p className="text fz12 text-muted mb0">Awaiting contractor review...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {source === "client" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <button
                onClick={() => router.push(`/worker-dashboard/work-submission?taskId=${task.id}&source=client`)}
                className="ud-btn btn-thm"
              >
                Submit Work to Client <i className="fal fa-arrow-right-long ms-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .vt-toast--info { background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
        .vt-toast--error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .source-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .source-badge--client { background: #d4f7e4; color: #1a7a4a; }
        .source-badge--contractor { background: #f0ebff; color: #5b2dff; }
        .milestone-card { border: 1px solid #e7ebf5; border-radius: 10px; padding: 18px; height: 100%; }
        .progress-track { width: 100%; height: 8px; border-radius: 999px; background: #eef1f7; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 999px; background: #5b2dff; transition: width 0.3s ease; }
        .revision-note { background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 8px 12px; font-size: 12px; color: #5d4037; }
        .mb12 { margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
