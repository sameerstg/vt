"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  getTaskById,
  submitWorkerAppeal,
  getWorkerAppeals,
} from "@/utils/auth/mockAuth";

const REASON_OPTIONS = [
  "Unfair rejection of submitted work",
  "Milestone payment not released",
  "Scope changed without agreement",
  "Incorrect revision request",
  "Work completed but task not marked done",
  "Other",
];

const STATUS_CLASS = {
  Open: "style5",
  "Under Review": "style1",
  Resolved: "style4",
  Rejected: "style6",
};

export default function WorkerAppealInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const taskTitle = searchParams.get("taskTitle") || "";
  const source = searchParams.get("source") || "client";

  const [session, setSession] = useState(null);
  const [reason, setReason] = useState(REASON_OPTIONS[0]);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [pastAppeals, setPastAppeals] = useState([]);
  const [activeTab, setActiveTab] = useState(taskId ? "new" : "history");

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
    const s = getAuthSession();
    setSession(s);
    if (s?.id) {
      setPastAppeals(getWorkerAppeals(s.id));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!description.trim()) return;

    const result = submitWorkerAppeal({
      workerId: session?.id,
      workerName: session?.name,
      taskId,
      taskTitle: taskTitle || `Task #${taskId}`,
      source,
      reason,
      description,
    });

    if (result?.ok) {
      showToast("success", "Appeal submitted successfully. Admin will review it shortly.");
      setDescription("");
      setFiles([]);
      setSubmitAttempted(false);
      setPastAppeals(getWorkerAppeals(session?.id));
      setTimeout(() => setActiveTab("history"), 1800);
    } else {
      showToast("error", "Failed to submit appeal. Please try again.");
    }
  };

  return (
    <div className="dashboard__content hover-bgc-color worker-appeal-page">
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
              <h2>Appeal / Dispute</h2>
              {taskTitle && <p className="text mb0">Project: {taskTitle}</p>}
            </div>
            <button
              onClick={() => router.push("/worker-dashboard/assigned-projects")}
              className="ud-btn btn-light-default"
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </div>

      <div className="row mb20">
        <div className="col-xl-12">
          <div className="appeal-tabs">
            <button
              className={`appeal-tab-btn${activeTab === "new" ? " active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              Submit New Appeal
            </button>
            <button
              className={`appeal-tab-btn${activeTab === "history" ? " active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              Appeal History
              {pastAppeals.length > 0 && (
                <span className="appeal-count-badge">{pastAppeals.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {activeTab === "new" && (
        <div className="row g-4">
          <div className="col-xl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="list-title bdrb1 pb15 mb20">Appeal Details</h5>
              <form className="form-style1" onSubmit={handleSubmit}>

                {taskId && (
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Project</label>
                    <input
                      type="text"
                      className="form-control"
                      value={taskTitle || `Task #${taskId}`}
                      readOnly
                      style={{ background: "#f8f9fc" }}
                    />
                  </div>
                )}

                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Reason for Appeal*</label>
                  <select
                    className="form-select"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  >
                    {REASON_OPTIONS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Description*</label>
                  <textarea
                    rows={6}
                    className={`form-control${submitAttempted && !description.trim() ? " is-invalid" : ""}`}
                    placeholder="Explain your appeal in detail — what happened, what you expected, and any supporting context..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  {submitAttempted && !description.trim() && (
                    <small className="text-danger d-block mt5">Description is required.</small>
                  )}
                </div>

                <div className="mb25">
                  <label className="heading-color ff-heading fw500 mb10">Supporting Files (optional)</label>
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
                    Submit Appeal <i className="fal fa-arrow-right-long ms-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h6 className="bdrb1 pb15 mb15">What happens next?</h6>
              <div className="appeal-step">
                <span className="appeal-step__num">1</span>
                <p className="text fz13 mb0">Your appeal is reviewed by an admin within 2–3 business days.</p>
              </div>
              <div className="appeal-step">
                <span className="appeal-step__num">2</span>
                <p className="text fz13 mb0">The opposing party may be asked to respond.</p>
              </div>
              <div className="appeal-step">
                <span className="appeal-step__num">3</span>
                <p className="text fz13 mb0">Admin issues a final decision — funds are held in escrow until resolved.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
                <h5 className="list-title mb-0">My Appeals</h5>
                <button
                  className="ud-btn btn-thm"
                  style={{ padding: "6px 16px", fontSize: "13px" }}
                  onClick={() => setActiveTab("new")}
                >
                  + New Appeal
                </button>
              </div>

              {pastAppeals.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text text-muted mb0">No appeals submitted yet.</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Appeal ID</th>
                        <th scope="col">Project</th>
                        <th scope="col">Reason</th>
                        <th scope="col">Submitted</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {pastAppeals.map(a => (
                        <tr key={a.id}>
                          <td className="fw500">{a.id}</td>
                          <td>{a.taskTitle}</td>
                          <td>{a.reason}</td>
                          <td>{new Date(a.submittedAt).toLocaleDateString()}</td>
                          <td>
                            <span className={`pending-style ${STATUS_CLASS[a.status] || "style5"}`}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .vt-toast--error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .appeal-tabs { display: flex; gap: 8px; border-bottom: 2px solid #e8edf6; padding-bottom: 0; }
        .appeal-tab-btn { background: none; border: none; padding: 10px 20px; font-size: 14px; font-weight: 600; color: #6b7280; border-bottom: 3px solid transparent; margin-bottom: -2px; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .appeal-tab-btn.active { color: #5b2dff; border-bottom-color: #5b2dff; }
        .appeal-count-badge { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; background: #5b2dff; color: #fff; border-radius: 50%; font-size: 11px; }
        .appeal-step { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 16px; }
        .appeal-step__num { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; background: #5b2dff; color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
      `}</style>
    </div>
  );
}
