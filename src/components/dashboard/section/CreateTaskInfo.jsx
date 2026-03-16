"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { createMockTask } from "@/utils/auth/mockAuth";
import { useRouter } from "next/navigation";

const defaultMilestones = [
  { title: "Milestone 1", amount: "", description: "" },
  { title: "Milestone 2", amount: "", description: "" },
];

const taskCategoryCatalog = [
  { title: "Development & IT", skills: "1,853 skills", subtitle: "Software Engineer, Web / Mobile Developer & More" },
  { title: "Design & Creative", skills: "1,853 skills", subtitle: "UI/UX, Branding, Visual Design & More" },
  { title: "Digital Marketing", skills: "1,853 skills", subtitle: "SEO, Ads, Social Media Growth & More" },
  { title: "Writing & Translation", skills: "1,853 skills", subtitle: "Content, Copywriting, Translation & More" },
  { title: "Music & Audio", skills: "1,853 skills", subtitle: "Voice Over, Mixing, Production & More" },
  { title: "Video & Animation", skills: "1,853 skills", subtitle: "Editing, Motion Graphics, 2D/3D & More" },
  { title: "Engineering & Architecture", skills: "1,853 skills", subtitle: "CAD, Planning, Technical Drawing & More" },
  { title: "Finance & Accounting", skills: "1,853 skills", subtitle: "Bookkeeping, Tax, Financial Analysis & More" },
];

export default function CreateTaskInfo() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [taskType, setTaskType] = useState("individual");
  const [workMode, setWorkMode] = useState("virtual");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [budgetModel, setBudgetModel] = useState("fixed");
  const [totalBudget, setTotalBudget] = useState("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [mediaFiles, setMediaFiles] = useState([]);

  const addToast = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMilestone = (index, key, value) =>
    setMilestones((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const addMilestone = () =>
    setMilestones((prev) => [...prev, { title: `Milestone ${prev.length + 1}`, amount: "", description: "" }]);

  const removeMilestone = (index) => {
    if (milestones.length > 1) {
      setMilestones((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const totalMilestoneAmount = useMemo(() =>
    milestones.reduce((sum, m) => {
      const value = parseFloat(m.amount || "0");
      return Number.isNaN(value) ? sum : sum + value;
    }, 0), [milestones]
  );

  const formatDateLabel = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  };

  const scheduleWindowLabel = useMemo(() => {
    const start = formatDateLabel(scheduleStart);
    const end = formatDateLabel(scheduleEnd);
    if (!start && !end) return "";
    if (start && end) return `${start} - ${end}`;
    return start || end;
  }, [scheduleStart, scheduleEnd]);

  const handleSubmit = async () => {
    if (!title || !category) {
      setSubmitError("Title and Category are mandatory.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");
    const taskData = {
      title, description, category, taskType, workMode,
      location: workMode === "physical" ? `${city}, ${stateRegion}` : "Remote",
      budget: budgetModel === "fixed" ? `$${totalBudget}` : `$${totalMilestoneAmount}`,
      budgetModel,
      deadline: scheduleEnd ? formatDateLabel(scheduleEnd) : "Not set",
      milestones: budgetModel === "milestone" ? milestones : [],
      attachments: mediaFiles.map(f => f.name),
    };
    const result = await createMockTask(taskData);
    if (result.ok) {
      addToast("success", "Project created successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard/active-tasks"), 2000);
    } else {
      setSubmitError(result.message || "Failed to create project.");
      addToast("error", result.message || "Failed to create project.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* Toasts */}
      <div style={{ position: "fixed", top: "80px", right: "20px", zIndex: 9999, width: "320px" }}>
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-premium" style={{ background: toast.type === "success" ? "#e8f8ee" : "#fdecec", border: `1px solid ${toast.type === "success" ? "#9dd8b5" : "#f6b0b0"}`, color: toast.type === "success" ? "#14532d" : "#7f1d1d" }}>
            <i className={toast.type === "success" ? "fal fa-check-circle" : "fal fa-exclamation-circle"} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2 className="fw500">Create Project</h2>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Form Details */}
        <div className="col-xl-9">
          <div className="ps-widget bgc-white bdrs12 p30 mb30 border-light shadow-sm">
            <h4 className="title fz17 fw600 bdrb1 pb15 mb30">Basic Info & Filters</h4>
            <div className="row g-4">
              <div className="col-md-4">
                <label className="heading-color ff-heading fw500 mb10 d-block">Category <span className="text-danger">*</span></label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {taskCategoryCatalog.map((cat) => <option key={cat.title} value={cat.title}>{cat.title}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="heading-color ff-heading fw500 mb10 d-block">Project Type</label>
                <select className="form-select" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                  <option value="individual">Individual</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="heading-color ff-heading fw500 mb10 d-block">Work Delivery</label>
                <select className="form-select" value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                  <option value="virtual">Virtual (Remote)</option>
                  <option value="physical">Physical (On-site)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs12 p30 mb30 border-light shadow-sm">
            <h4 className="title fz17 fw600 bdrb1 pb15 mb30">Project Details</h4>
            <div className="row g-4">
              <div className="col-md-12">
                <label className="heading-color ff-heading fw500 mb10 d-block">Project Title <span className="text-danger">*</span></label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Design a modern e-commerce landing page" />
              </div>
              <div className="col-md-12">
                <label className="heading-color ff-heading fw500 mb10 d-block">Description</label>
                <textarea rows={6} className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide a detailed brief of your project requirements..." />
              </div>
              {workMode === "physical" && (
                <div className="row g-3 mt-1">
                  <div className="col-md-6"><label className="heading-color ff-heading fw500 mb10 d-block">City</label><input className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /></div>
                  <div className="col-md-6"><label className="heading-color ff-heading fw500 mb10 d-block">State / Region</label><input className="form-control" value={stateRegion} onChange={(e) => setStateRegion(e.target.value)} /></div>
                </div>
              )}
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs12 p30 mb30 border-light shadow-sm">
            <h4 className="title fz17 fw600 bdrb1 pb15 mb30">Budget & Milestones</h4>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="heading-color ff-heading fw500 mb10 d-block">Budget Model</label>
                <select className="form-select" value={budgetModel} onChange={(e) => setBudgetModel(e.target.value)}>
                  <option value="fixed">Fixed Price Project</option>
                  <option value="milestone">Milestone Based Project</option>
                </select>
              </div>
              {budgetModel === "fixed" ? (
                <div className="col-md-6">
                  <label className="heading-color ff-heading fw500 mb10 d-block">Total Budget ($)</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input className="form-control" placeholder="e.g. 1200" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} />
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d-flex justify-content-between align-items-center mb20 mt10">
                    <h6 className="fz15 fw600 mb-0">Milestone Breakdown</h6>
                    <button type="button" className="ud-btn btn-light-thm" style={{ padding: "5px 15px", fontSize: "12px" }} onClick={addMilestone}>
                      <i className="fal fa-plus me-1" /> Add Milestone
                    </button>
                  </div>
                  {milestones.map((m, i) => (
                    <div className="milestone-premium mb20" key={i}>
                      <div className="row g-3">
                        <div className="col-md-8">
                          <label className="fz13 fw500 mb5 dark-color">Milestone Title</label>
                          <input className="form-control fz14" value={m.title} onChange={(e) => updateMilestone(i, "title", e.target.value)} placeholder="e.g. Initial Research" />
                        </div>
                        <div className="col-md-4">
                          <label className="fz13 fw500 mb5 dark-color">Amount ($)</label>
                          <div className="input-group">
                            <span className="input-group-text fz14">$</span>
                            <input className="form-control fz14" placeholder="0.00" value={m.amount} onChange={(e) => updateMilestone(i, "amount", e.target.value)} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label className="fz13 fw500 mb5 dark-color">Delivery Details</label>
                          <textarea rows={2} className="form-control fz14" value={m.description} onChange={(e) => updateMilestone(i, "description", e.target.value)} placeholder="What will be delivered in this phase?" />
                        </div>
                        {milestones.length > 1 && (
                          <div className="col-md-12 text-end">
                            <button type="button" className="text-danger fz13 fw500 btn-remove-milestone" onClick={() => removeMilestone(i)}>
                              <i className="fal fa-trash-alt me-1" /> Remove Milestone
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between align-items-center p3 bdrs8 bgc-thm-light mt20">
                    <span className="fz15 fw600 dark-color">Total Project Amount</span>
                    <span className="fz18 fw700 text-thm">${totalMilestoneAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs12 p30 mb30 border-light shadow-sm">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb30">
              <h4 className="title fz17 fw600 mb-0">Media Files & Attachments</h4>
            </div>
            <div className="upload-box-premium d-flex flex-column align-items-center justify-content-center">
              <div className="icon-wrap">
                <i className="fal fa-cloud-upload fz48 text-thm" />
              </div>
              <h5 className="fz16 fw600 mt20 mb10">Upload project documents</h5>
              <p className="text mb20">Drag and drop files here or click to browse</p>
              <label className="ud-btn btn-thm" style={{ cursor: "pointer" }}>
                Select Files
                <input type="file" multiple className="d-none" onChange={handleMediaUpload} />
              </label>
              <p className="text-muted fz12 mt20">Supported: JPG, PNG, PDF, ZIP (Max 10MB per file)</p>
            </div>

            {mediaFiles.length > 0 && (
              <div className="mt30">
                <h6 className="fz14 fw600 mb15">Selected Files ({mediaFiles.length})</h6>
                <div className="row g-3">
                  {mediaFiles.map((file, idx) => (
                    <div key={idx} className="col-md-6">
                      <div className="media-item-premium">
                        <div className="d-flex align-items-center overflow-hidden">
                          <div className="file-icon"><i className="fal fa-file-alt" /></div>
                          <div className="ms-2 overflow-hidden">
                            <div className="text-truncate fz13 fw600 dark-color">{file.name}</div>
                            <div className="fz11 text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                        </div>
                        <button type="button" className="remove-btn" onClick={() => removeMedia(idx)}>
                          <i className="fal fa-times" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="ps-widget bgc-white bdrs12 p30 mb30 border-light shadow-sm">
            <h4 className="title fz17 fw600 bdrb1 pb15 mb30">Project Schedule</h4>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="heading-color ff-heading fw500 mb10 d-block">Target Start Date</label>
                <input type="date" className="form-control" value={scheduleStart} onChange={(e) => setScheduleStart(e.target.value)} />
              </div>
              <div className="col-md-6">
                <label className="heading-color ff-heading fw500 mb10 d-block">Expected Completion</label>
                <input type="date" className="form-control" value={scheduleEnd} min={scheduleStart} onChange={(e) => setScheduleEnd(e.target.value)} />
              </div>
            </div>
            {scheduleWindowLabel && (
              <div className="mt20 p2 bdrs8 bgc-white border d-inline-flex align-items-center">
                <i className="fal fa-calendar-alt text-thm me-2 ms-2" />
                <span className="fz13 fw500 dark-color me-2">Project Window: {scheduleWindowLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Project Summary (Sticky) */}
        <div className="col-xl-3">
          <div className="sticky-sidebar">
            <div className="ps-widget bgc-white bdrs12 p25 mb30 border-light shadow-sm">
              <h5 className="title fz16 fw600 bdrb1 pb15 mb20">Project Summary</h5>
              <div className="summary-list">
                <div className="summary-item mb15">
                  <div className="text-muted fz13 mb-1">Title</div>
                  <div className="fw600 dark-color text-truncate">{title || "Untitled Project"}</div>
                </div>
                <div className="summary-item mb15">
                  <div className="text-muted fz13 mb-1">Category</div>
                  <div className="fw500 dark-color">{category || "Not selected"}</div>
                </div>
                <div className="summary-item mb15">
                  <div className="text-muted fz13 mb-1">Budget Model</div>
                  <div className="fw500 dark-color text-capitalize">{budgetModel} Price</div>
                </div>
                <div className="summary-item bdrb1 pb15 mb15">
                  <div className="text-muted fz13 mb-1">Budget Total</div>
                  <div className="fz18 fw700 text-thm">
                    ${budgetModel === "fixed" ? (totalBudget || "0") : totalMilestoneAmount.toLocaleString()}
                  </div>
                </div>
                <div className="summary-item mb20">
                  <div className="d-flex justify-content-between fz13 mb-1">
                    <span className="text-muted">Attachments</span>
                    <span className="fw600">{mediaFiles.length} files</span>
                  </div>
                  <div className="d-flex justify-content-between fz13">
                    <span className="text-muted">Milestones</span>
                    <span className="fw600">{milestones.length} phases</span>
                  </div>
                </div>
              </div>
              {submitError && <div className="alert alert-danger p2 fz13 mb15">{submitError}</div>}
              <button
                type="button"
                className="ud-btn btn-thm w-100"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Project"}
                <i className="fal fa-arrow-right-long ms-2" />
              </button>
              <p className="text-center fz12 text-muted mt15 mb-0">
                By submitting, you agree to our <br /> Project Terms & Services.
              </p>
            </div>

            <div className="ps-widget bgc-white bdrs12 p25 border-light shadow-sm">
              <h6 className="fz14 fw600 mb10">Need Help?</h6>
              <p className="fz13 text-muted mb0">Our support team is available 24/7 to help you with project creation.</p>
              <a href="#" className="text-thm fw600 fz13 mt10 d-inline-block">Contact Support</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .toast-premium {
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .milestone-premium {
          background-color: #fbfbfb;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .milestone-premium:hover {
          border-color: #5b2dff;
          box-shadow: 0 5px 15px rgba(91, 45, 255, 0.05);
        }

        .btn-remove-milestone {
          background: none;
          border: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .btn-remove-milestone:hover {
          opacity: 1;
        }

        .upload-box-premium {
          border: 2px dashed #dbe1ee;
          background-color: #f8faff;
          border-radius: 12px;
          padding: 40px;
          transition: all 0.2s ease;
        }

        .upload-box-premium:hover {
          border-color: #5b2dff;
          background-color: #f5f3ff;
        }

        .upload-box-premium .icon-wrap {
          width: 80px;
          height: 80px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .media-item-premium {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.2s;
        }

        .media-item-premium:hover {
          border-color: #5b2dff;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .media-item-premium .file-icon {
          width: 32px;
          height: 32px;
          background: #f5f3ff;
          color: #5b2dff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .media-item-premium .remove-btn {
          background: none;
          border: none;
          color: #999;
          transition: color 0.2s;
        }

        .media-item-premium .remove-btn:hover {
          color: #ff4d4d;
        }

        .bgc-thm-light {
          background-color: #f5f3ff;
        }

        .sticky-sidebar {
          position: sticky;
          top: 100px;
        }

        .border-light {
          border: 1px solid #f0f2f7 !important;
        }

        :global(.form-select), :global(.form-control) {
          border-color: #dbe1ee;
          padding-top: 10px;
          padding-bottom: 10px;
          border-radius: 8px;
        }

        :global(.form-select:focus), :global(.form-control:focus) {
          border-color: #5b2dff;
          box-shadow: 0 0 0 3px rgba(91, 45, 255, 0.1);
        }

        :global(.input-group-text) {
          background-color: #f8fafc;
          border-color: #dbe1ee;
          color: #64748b;
          border-radius: 8px 0 0 8px;
        }
      `}</style>
    </div>
  );
}
