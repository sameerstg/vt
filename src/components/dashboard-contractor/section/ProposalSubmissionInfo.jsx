"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getAuthSession,
  submitContractorProposal,
  getContractorProposals,
} from "@/utils/auth/mockAuth";

const getStatusClass = (status = "") => {
  const s = status.toLowerCase();
  if (s === "accepted") return "style4";
  if (s === "rejected") return "style1";
  return "style5";
};

export default function ProposalSubmissionInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const taskTitle = searchParams.get("taskTitle") || "";
  const clientId = searchParams.get("clientId") || "";

  let parsedMilestones = [];
  try {
    parsedMilestones = JSON.parse(searchParams.get("milestones") || "[]");
  } catch {}

  const isFormView = Boolean(taskId);

  const [session, setSession] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [form, setForm] = useState({ totalBid: "", timeline: "", coverLetter: "" });
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const showToast = (type, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
    const s = getAuthSession();
    setSession(s);
    if (s?.id) {
      setProposals(getContractorProposals(s.id));
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.totalBid || Number(form.totalBid) <= 0) e.totalBid = "Enter a valid bid amount.";
    if (!form.timeline || Number(form.timeline) <= 0) e.timeline = "Enter timeline in days.";
    if (!form.coverLetter.trim()) e.coverLetter = "Cover letter is required.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;

    const result = submitContractorProposal({
      taskId,
      taskTitle,
      clientId,
      contractorId: session.id,
      contractorName: session.name,
      totalBid: Number(form.totalBid),
      timeline: form.timeline,
      coverLetter: form.coverLetter,
    });

    if (result.ok) {
      showToast("success", "Proposal submitted successfully!");
      setTimeout(() => router.push("/contractor-dashboard/manage-projects"), 1500);
    } else {
      showToast("error", result.message || "Failed to submit proposal.");
    }
  };

  const filteredProposals = proposals.filter(p => filterStatus === "all" || p.status === filterStatus);

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
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{isFormView ? "Apply for Project" : "Applied Projects"}</h2>
          </div>
        </div>
      </div>

      {isFormView ? (
        /* ---- PROPOSAL FORM ---- */
        <div className="row">
          <div className="col-xxl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb20">
                <h5 className="list-title">Project</h5>
                <p className="text mb5 fz15"><strong>{taskTitle}</strong></p>
                {parsedMilestones.length > 0 && (
                  <p className="text fz13 text-muted mb0">{parsedMilestones.length} milestone{parsedMilestones.length > 1 ? "s" : ""} included</p>
                )}
              </div>

              {parsedMilestones.length > 0 && (
                <div className="mb25">
                  <h6 className="mb12">Milestones Overview</h6>
                  {parsedMilestones.map((m, i) => (
                    <div key={i} className="milestone-preview">
                      <span className="fw500">{m.title}</span>
                      <span className="text-muted fz13 ms-auto">${m.price || 0} · Due {m.deadline || "—"}</span>
                    </div>
                  ))}
                </div>
              )}

              <form className="form-style1" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb20">
                    <label className="heading-color ff-heading fw500 mb10">Total Bid Amount*</label>
                    <input
                      type="number"
                      min="1"
                      className={`form-control${submitAttempted && errors.totalBid ? " is-invalid" : ""}`}
                      placeholder="e.g. 2500"
                      value={form.totalBid}
                      onChange={e => setForm(f => ({ ...f, totalBid: e.target.value }))}
                    />
                    {submitAttempted && errors.totalBid && (
                      <small className="text-danger d-block mt5">{errors.totalBid}</small>
                    )}
                  </div>
                  <div className="col-md-6 mb20">
                    <label className="heading-color ff-heading fw500 mb10">Timeline (days)*</label>
                    <input
                      type="number"
                      min="1"
                      className={`form-control${submitAttempted && errors.timeline ? " is-invalid" : ""}`}
                      placeholder="e.g. 30"
                      value={form.timeline}
                      onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))}
                    />
                    {submitAttempted && errors.timeline && (
                      <small className="text-danger d-block mt5">{errors.timeline}</small>
                    )}
                  </div>
                  <div className="col-12 mb20">
                    <label className="heading-color ff-heading fw500 mb10">Cover Letter*</label>
                    <textarea
                      rows={5}
                      className={`form-control${submitAttempted && errors.coverLetter ? " is-invalid" : ""}`}
                      placeholder="Describe your team's expertise and approach..."
                      value={form.coverLetter}
                      onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                    />
                    {submitAttempted && errors.coverLetter && (
                      <small className="text-danger d-block mt5">{errors.coverLetter}</small>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-end">
                  <button
                    type="button"
                    className="ud-btn btn-light-default"
                    onClick={() => router.push("/contractor-dashboard/manage-jobs")}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="ud-btn btn-thm">
                    Submit Proposal <i className="fal fa-arrow-right-long ms-1" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* ---- APPLIED PROJECTS LIST ---- */
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
                <h5 className="list-title mb-0">Applied Projects</h5>
                <div className="d-flex gap-2">
                  {["all", "pending", "accepted", "rejected"].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`filter-btn${filterStatus === s ? " active" : ""}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th>Project</th>
                      <th>My Bid</th>
                      <th>Timeline</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {filteredProposals.map(p => (
                      <tr key={p.id}>
                        <td className="fw500">{p.taskTitle}</td>
                        <td>${p.totalBid?.toLocaleString()}</td>
                        <td>{p.timeline} days</td>
                        <td>
                          <span className={`pending-style ${getStatusClass(p.status)}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          {p.status === "accepted" && (
                            <button
                              onClick={() => router.push(`/contractor-dashboard/team?taskId=${p.taskId}`)}
                              className="ud-btn btn-thm"
                              style={{ padding: "5px 14px", fontSize: "12px" }}
                            >
                              Manage Team
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredProposals.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <p className="text mb10">No proposals found.</p>
                          <button
                            onClick={() => router.push("/contractor-dashboard/manage-jobs")}
                            className="ud-btn btn-thm"
                            style={{ padding: "6px 18px", fontSize: "13px" }}
                          >
                            Browse Projects
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .toast-container { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px; }
        .vt-toast { padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; min-width: 260px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        .vt-toast--success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .vt-toast--error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .milestone-preview { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f7f7f7; border-radius: 6px; margin-bottom: 8px; font-size: 13px; }
        .filter-btn { border: 1px solid #dbe1ee; background: #fff; border-radius: 4px; padding: 5px 12px; font-size: 12px; font-weight: 600; color: #334155; cursor: pointer; }
        .filter-btn.active { border-color: #5b2dff; color: #5b2dff; background: #f4f0ff; }
        .mb12 { margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
