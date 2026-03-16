"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { createMockTask } from "@/utils/auth/mockAuth";
import { useRouter } from "next/navigation";

const defaultMilestones = [
  { title: "Milestone 1", amount: "" },
  { title: "Milestone 2", amount: "" },
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
  const [subtasks, setSubtasks] = useState([""]);

  const addToast = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const addSubtask = () => setSubtasks((prev) => [...prev, ""]);
  const removeSubtask = (index) => setSubtasks((prev) => prev.filter((_, i) => i !== index));
  const updateSubtask = (index, value) => setSubtasks((prev) => prev.map((item, i) => (i === index ? value : item)));

  const updateMilestone = (index, key, value) =>
    setMilestones((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const addMilestone = () =>
    setMilestones((prev) => [...prev, { title: `Milestone ${prev.length + 1}`, amount: "" }]);

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
      skills: subtasks.filter((s) => s.trim() !== ""),
      milestones: budgetModel === "milestone" ? milestones : [],
    };
    const result = await createMockTask(taskData);
    if (result.ok) {
      addToast("success", "Task created successfully! Redirecting...");
      setTimeout(() => router.push("/dashboard/active-tasks"), 2000);
    } else {
      setSubmitError(result.message || "Failed to create task.");
      addToast("error", result.message || "Failed to create task.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* Toasts */}
      <div style={{ position: "fixed", top: "80px", right: "20px", zIndex: 9999, width: "320px" }}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ background: toast.type === "success" ? "#e8f8ee" : "#fdecec", border: `1px solid ${toast.type === "success" ? "#9dd8b5" : "#f6b0b0"}`, color: toast.type === "success" ? "#14532d" : "#7f1d1d", borderRadius: "12px", padding: "16px", marginBottom: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "12px" }}>
            <i className={toast.type === "success" ? "fal fa-check-circle" : "fal fa-exclamation-circle"} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12"><div className="dashboard_title_area"><h2>Create Task</h2></div></div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <h5 className="title mb20 bdrb1 pb15">Required Filters</h5>
            <div className="row">
              <div className="col-md-4 mb20">
                <label className="form-label fw500">Category (mandatory)</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {taskCategoryCatalog.map((cat) => <option key={cat.title} value={cat.title}>{cat.title}</option>)}
                </select>
              </div>
              <div className="col-md-4 mb20">
                <label className="form-label fw500">Task Type</label>
                <select className="form-select" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                  <option value="individual">Individual</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="col-md-4 mb20">
                <label className="form-label fw500">Physical / Virtual</label>
                <select className="form-select" value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                  <option value="virtual">Virtual</option>
                  <option value="physical">Physical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <h5 className="title mb20 bdrb1 pb15">Task Details</h5>
            <div className="row">
              <div className="col-md-12 mb20">
                <label className="form-label fw500">Title</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title" />
              </div>
              <div className="col-md-12 mb20">
                <label className="form-label fw500">Description</label>
                <textarea rows={5} className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task in detail" />
              </div>
              {workMode === "physical" && (
                <>
                  <div className="col-md-6 mb20"><label className="form-label fw500">City</label><input className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /></div>
                  <div className="col-md-6 mb20"><label className="form-label fw500">State / Region</label><input className="form-control" value={stateRegion} onChange={(e) => setStateRegion(e.target.value)} /></div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="title mb20 bdrb1 pb15">Budget Section</h5>
            <div className="row g-3">
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Budget Model</label>
                <select className="form-select" value={budgetModel} onChange={(e) => setBudgetModel(e.target.value)}>
                  <option value="fixed">Fixed</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>
              {budgetModel === "fixed" ? (
                <div className="col-md-6 mb20"><label className="form-label fw500">Total Budget</label><input className="form-control" placeholder="e.g. 1200" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} /></div>
              ) : (
                <div className="col-md-12">
                  <label className="form-label fw500">Milestone Breakdown</label>
                  {milestones.map((m, i) => (
                    <div className="row mb10" key={i}>
                      <div className="col-md-8"><input className="form-control" value={m.title} onChange={(e) => updateMilestone(i, "title", e.target.value)} /></div>
                      <div className="col-md-4"><input className="form-control" placeholder="Amount" value={m.amount} onChange={(e) => updateMilestone(i, "amount", e.target.value)} /></div>
                    </div>
                  ))}
                  <button type="button" className="ud-btn btn-light-thm mt10" onClick={addMilestone}>Add Milestone</button>
                  <p className="text mt10 mb0">Milestone Total: ${totalMilestoneAmount}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="title mb20 bdrb1 pb15">Schedule Section</h5>
            <div className="row">
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Start Date</label>
                <input type="date" className="form-control" value={scheduleStart} onChange={(e) => setScheduleStart(e.target.value)} />
              </div>
              <div className="col-md-6 mb20">
                <label className="form-label fw500">End Date</label>
                <input type="date" className="form-control" value={scheduleEnd} min={scheduleStart} onChange={(e) => setScheduleEnd(e.target.value)} />
              </div>
            </div>
            <p className="text mb0">Schedule: {scheduleWindowLabel || "Not set"}</p>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between mb20 bdrb1 pb15">
              <h5 className="title">Subtasks</h5>
              <button type="button" className="ud-btn btn-light-thm" onClick={addSubtask}>Add Subtask</button>
            </div>
            {subtasks.map((s, i) => (
              <div className="d-flex gap-2 mb10" key={i}>
                <input className="form-control" placeholder={`Subtask ${i + 1}`} value={s} onChange={(e) => updateSubtask(i, e.target.value)} />
                {subtasks.length > 1 && <button type="button" className="ud-btn btn-light-thm" onClick={() => removeSubtask(i)}>Remove</button>}
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="title mb20 bdrb1 pb15">Preview &amp; Submit</h5>
            <div className="row mb20">
              <div className="col-md-6 mb15"><p className="mb-1 fw500">Type</p><p className="mb-0 text text-capitalize">{taskType}</p></div>
              <div className="col-md-6 mb15"><p className="mb-1 fw500">Mode</p><p className="mb-0 text text-capitalize">{workMode}</p></div>
              <div className="col-md-6 mb15"><p className="mb-1 fw500">Category</p><p className="mb-0 text">{category || "Not set"}</p></div>
              <div className="col-md-6 mb15"><p className="mb-1 fw500">Budget</p><p className="mb-0 text">{budgetModel === "fixed" ? `$${totalBudget}` : `$${totalMilestoneAmount}`}</p></div>
            </div>
            {submitError && <p className="text-danger mb15">{submitError}</p>}
            <button type="button" className="ud-btn btn-thm" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Task"}<i className="fal fa-arrow-right-long ms-2" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
