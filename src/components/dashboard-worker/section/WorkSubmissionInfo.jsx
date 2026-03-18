"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  getContractorAssignmentForWorker,
  getTaskById,
  submitWorkerWork,
} from "@/utils/auth/mockAuth";

export default function WorkSubmissionInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const source = searchParams.get("source") || "client";

  const [session, setSession] = useState(null);
  const [task, setTask] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [note, setNote] = useState("");
  const [files, setFiles] = useState([]);
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
    if (!s?.id || !taskId) return;

    if (source === "contractor") {
      const assignment = getContractorAssignmentForWorker(s.id, taskId);
      if (assignment) {
        setTask({ id: assignment.taskId, title: assignment.taskTitle, source: "contractor" });
        const submittable = (assignment.milestones || []).filter(
          m => m.status === "working" || m.status === "revision"
        );
        setMilestones(submittable);
        setSelectedIds(submittable.map(m => m.id));
      }
    } else {
      const t = getTaskById(taskId);
      if (t) {
        setTask({ ...t, source: "client" });
        const ms = t.milestones || [];
        setMilestones(ms);
        setSelectedIds(ms.map(m => m.id || m.title));
      } else {
        // Task not found in mockUsers — create a minimal placeholder so the form is usable
        setTask({ id: taskId, title: `Task #${taskId}`, source: "client" });
      }
    }
  }, [taskId, source]);

  const toggleMilestone = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!note.trim()) return;
    if (milestones.length > 0 && selectedIds.length === 0) return;

    const result = submitWorkerWork(session?.id, taskId, selectedIds, { note });
    if (result?.ok !== false) {
      showToast("success", "Work submitted successfully!");
      setTimeout(() => router.push("/worker-dashboard/assigned-projects"), 1800);
    } else {
      showToast("error", "Failed to submit work. Please try again.");
    }
  };

  const noTask = !taskId || (!task && taskId);

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
          <div className="dashboard_title_area d-flex justify-content-between align-items-center">
            <div>
              <h2>Work Submission</h2>
              {task && <p className="text mb0">{task.title}</p>}
            </div>
            <button
              onClick={() => router.push("/worker-dashboard/assigned-projects")}
              className="ud-btn btn-light-default"
            >
              ← Back to Assigned Tasks
            </button>
          </div>
        </div>
      </div>

      {noTask && !task ? (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>No task selected</h4>
              <p className="text mb20">Navigate here from the Assigned Tasks or In Progress pages.</p>
              <button onClick={() => router.push("/worker-dashboard/assigned-projects")} className="ud-btn btn-thm">
                Go to Assigned Tasks
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-xl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="list-title bdrb1 pb15 mb20">Select Milestones to Submit</h5>

              {milestones.length === 0 && (
                <p className="text text-muted fz13">No milestones defined — fill in the note below and submit your work directly.</p>
              )}

              {milestones.map(m => {
                const mId = m.id || m.title;
                const checked = selectedIds.includes(mId);
                return (
                  <label key={mId} className={`milestone-check-row${checked ? " selected" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMilestone(mId)}
                      className="me-3"
                    />
                    <span className="fw500">{m.title}</span>
                    {m.price > 0 && (
                      <span className="ms-auto fz13 fw600" style={{ color: "#28a745" }}>${m.price}</span>
                    )}
                  </label>
                );
              })}
            </div>

            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <form className="form-style1" onSubmit={handleSubmit}>
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Submission Note*</label>
                  <textarea
                    rows={5}
                    className={`form-control${submitAttempted && !note.trim() ? " is-invalid" : ""}`}
                    placeholder="Describe what was completed and how to verify the work..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                  {submitAttempted && !note.trim() && (
                    <small className="text-danger d-block mt5">Submission note is required.</small>
                  )}
                  {submitAttempted && milestones.length > 0 && selectedIds.length === 0 && (
                    <small className="text-danger d-block mt5">Select at least one milestone to submit.</small>
                  )}
                </div>

                <div className="mb25">
                  <label className="heading-color ff-heading fw500 mb10">Attachments (optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={e => setFiles(Array.from(e.target.files || []))}
                  />
                  {files.length > 0 && (
                    <div className="mt10 d-flex flex-wrap gap-2">
                      {files.map(f => (
                        <span key={`${f.name}-${f.size}`} className="badge bgc-thm3 text-dark">{f.name}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="ud-btn btn-light-default"
                    onClick={() => router.push("/worker-dashboard/assigned-projects")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="ud-btn btn-thm">
                    Submit Work <i className="fal fa-arrow-right-long ms-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h6 className="bdrb1 pb15 mb15">Summary</h6>
              <p className="text fz13 mb8"><strong>Task:</strong> {task?.title || "—"}</p>
              <p className="text fz13 mb8">
                <strong>Source:</strong>{" "}
                <span className={`source-badge source-badge--${source}`}>
                  {source === "contractor" ? "Via Contractor" : "Client Direct"}
                </span>
              </p>
              <p className="text fz13 mb0">
                <strong>Milestones selected:</strong> {selectedIds.length} of {milestones.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .vt-toast--error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .milestone-check-row { display: flex; align-items: center; padding: 12px 14px; border: 1px solid #e7ebf5; border-radius: 8px; margin-bottom: 10px; cursor: pointer; font-size: 14px; transition: border-color 0.2s; }
        .milestone-check-row.selected { border-color: #5b2dff; background: #f7f4ff; }
        .source-badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .source-badge--client { background: #d4f7e4; color: #1a7a4a; }
        .source-badge--contractor { background: #f0ebff; color: #5b2dff; }
      `}</style>
    </div>
  );
}
