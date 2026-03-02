"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

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
  const [taskType, setTaskType] = useState("individual");
  const [workMode, setWorkMode] = useState("virtual");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [budgetModel, setBudgetModel] = useState("fixed");
  const [totalBudget, setTotalBudget] = useState("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [milestones, setMilestones] = useState(defaultMilestones);
  const [subtasks, setSubtasks] = useState([""]);

  const addSubtask = () => setSubtasks((prev) => [...prev, ""]);
  const removeSubtask = (index) =>
    setSubtasks((prev) => prev.filter((_, i) => i !== index));

  const updateSubtask = (index, value) =>
    setSubtasks((prev) => prev.map((item, i) => (i === index ? value : item)));

  const updateMilestone = (index, key, value) =>
    setMilestones((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );

  const addMilestone = () =>
    setMilestones((prev) => [...prev, { title: `Milestone ${prev.length + 1}`, amount: "" }]);

  const totalMilestoneAmount = useMemo(
    () =>
      milestones.reduce((sum, m) => {
        const value = parseFloat(m.amount || "0");
        return Number.isNaN(value) ? sum : sum + value;
      }, 0),
    [milestones],
  );

  const formatDateLabel = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const scheduleWindowLabel = useMemo(() => {
    const start = formatDateLabel(scheduleStart);
    const end = formatDateLabel(scheduleEnd);
    if (!start && !end) return "";
    if (start && end) return `${start} - ${end}`;
    return start || end;
  }, [scheduleStart, scheduleEnd]);

  const filteredCategorySuggestions = useMemo(() => {
    const query = category.trim().toLowerCase();
    if (!query) return taskCategoryCatalog.slice(0, 8);

    const startsWithMatches = taskCategoryCatalog.filter((item) =>
      item.title.toLowerCase().startsWith(query),
    );
    const containsMatches = taskCategoryCatalog.filter(
      (item) =>
        item.title.toLowerCase().includes(query) &&
        !item.title.toLowerCase().startsWith(query),
    );

    return [...startsWithMatches, ...containsMatches].slice(0, 8);
  }, [category]);

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Create Task</h2>
            <p className="text">Create Individual or Contractor task with budget, schedule, and subtasks.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative overflow-visible">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title">Task Details</h5>
            </div>
            <div className="row">
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Task Type</label>
                <select className="form-select" value={taskType} onChange={(e) => setTaskType(e.target.value)}>
                  <option value="individual">Individual</option>
                  <option value="contractor">Contractor</option>
                </select>
              </div>
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Physical / Virtual</label>
                <select className="form-select" value={workMode} onChange={(e) => setWorkMode(e.target.value)}>
                  <option value="virtual">Virtual</option>
                  <option value="physical">Physical</option>
                </select>
              </div>
              <div className="col-md-12 mb20">
                <label className="form-label fw500">Title</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="col-md-12 mb20">
                <label className="form-label fw500">Description</label>
                <textarea
                  rows={5}
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Category (mandatory)</label>
                <div className="position-relative">
                  <input
                    className="form-control"
                    value={category}
                    placeholder="Type category..."
                    onFocus={() => setShowCategorySuggestions(true)}
                    onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 120)}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setShowCategorySuggestions(true);
                    }}
                  />
                  {showCategorySuggestions && filteredCategorySuggestions.length > 0 && (
                    <ul
                      className="bg-white bdrs8 bdr1 p10 mt10 w-100 shadow-sm"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 999,
                        listStyle: "none",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      {filteredCategorySuggestions.map((option) => (
                        <li key={option.title} className="mb5">
                          <button
                            type="button"
                            className="btn w-100 text-start p10"
                            style={{ background: "#f7f7f7", borderRadius: "8px" }}
                            onMouseDown={() => {
                              setCategory(option.title);
                              setShowCategorySuggestions(false);
                            }}
                          >
                            <p className="mb-0 fw600 text-dark">{option.title}</p>
                            <p className="mb-0 fz13 text-muted">{option.skills}</p>
                            <p className="mb-0 fz12 text-muted">{option.subtitle}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {workMode === "physical" && (
                <>
                  <div className="col-md-3 mb20">
                    <label className="form-label fw500">City</label>
                    <input className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>
                  <div className="col-md-3 mb20">
                    <label className="form-label fw500">State</label>
                    <input
                      className="form-control"
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title">Budget Section</h5>
            </div>
            <div className="row g-3 align-items-start">
              <div className="col-md-6">
                <div className="mb20">
                  <label className="form-label fw500">Budget Model</label>
                  <select
                    className="form-select"
                    value={budgetModel}
                    onChange={(e) => setBudgetModel(e.target.value)}
                  >
                    <option value="fixed">Fixed</option>
                    <option value="milestone">Milestone</option>
                  </select>
                </div>
              </div>
              {budgetModel === "fixed" && (
                <div className="col-md-6">
                  <div className="mb20">
                    <label className="form-label fw500">Total Budget</label>
                    <input
                      className="form-control"
                      placeholder="e.g. 1200"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {budgetModel === "milestone" && (
                <div className="col-md-12">
                  <label className="form-label fw500">Milestone Breakdown</label>
                  {milestones.map((milestone, index) => (
                    <div className="row mb10" key={index}>
                      <div className="col-md-8">
                        <input
                          className="form-control"
                          value={milestone.title}
                          onChange={(e) => updateMilestone(index, "title", e.target.value)}
                        />
                      </div>
                      <div className="col-md-4">
                        <input
                          className="form-control"
                          placeholder="Amount"
                          value={milestone.amount}
                          onChange={(e) => updateMilestone(index, "amount", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                  <button type="button" className="ud-btn btn-light-thm mt10" onClick={addMilestone}>
                    Add Milestone
                  </button>
                  <p className="text mt10 mb0">Milestone Total: ${totalMilestoneAmount}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title">Schedule Section</h5>
            </div>
            <div className="row">
              <div className="col-md-6 mb20">
                <label className="form-label fw500">Start Date</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control pe-5"
                    placeholder="Select start date"
                    readOnly
                    value={formatDateLabel(scheduleStart)}
                  />
                  <button
                    type="button"
                    className="btn position-absolute border-0 bg-transparent p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#scheduleWindowModal"
                    aria-label="Open schedule selector"
                    style={{
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      lineHeight: 1,
                    }}
                  >
                    <i className="flaticon-calendar fz16 text-thm2" />
                  </button>
                </div>
              </div>
              <div className="col-md-6 mb20">
                <label className="form-label fw500">End Date</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control pe-5"
                    placeholder="Select end date"
                    readOnly
                    value={formatDateLabel(scheduleEnd)}
                  />
                  <button
                    type="button"
                    className="btn position-absolute border-0 bg-transparent p-0"
                    data-bs-toggle="modal"
                    data-bs-target="#scheduleWindowModal"
                    aria-label="Open schedule selector"
                    style={{
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      lineHeight: 1,
                    }}
                  >
                    <i className="flaticon-calendar fz16 text-thm2" />
                  </button>
                </div>
              </div>
            </div>
            <p className="text mb0">Schedule Window: {scheduleWindowLabel || "Not selected"}</p>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between bdrb1 pb15 mb20">
              <h5 className="title">Subtasks Section</h5>
              <button type="button" className="ud-btn btn-light-thm" onClick={addSubtask}>
                Add Subtask
              </button>
            </div>
            {subtasks.map((subtask, index) => (
              <div className="d-flex gap-2 mb10" key={index}>
                <input
                  className="form-control"
                  placeholder={`Subtask ${index + 1}`}
                  value={subtask}
                  onChange={(e) => updateSubtask(index, e.target.value)}
                />
                {subtasks.length > 1 && (
                  <button
                    type="button"
                    className="ud-btn btn-light-thm"
                    onClick={() => removeSubtask(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title">Preview &amp; Submit</h5>
            </div>
            <div className="row">
              <div className="col-md-6 mb15">
                <p className="mb-1 fw500">Task Type</p>
                <p className="mb-0 text text-capitalize">{taskType}</p>
              </div>
              <div className="col-md-6 mb15">
                <p className="mb-1 fw500">Mode</p>
                <p className="mb-0 text text-capitalize">{workMode}</p>
              </div>
              <div className="col-md-6 mb15">
                <p className="mb-1 fw500">Category</p>
                <p className="mb-0 text">{category || "Not set"}</p>
              </div>
              <div className="col-md-6 mb15">
                <p className="mb-1 fw500">Budget Model</p>
                <p className="mb-0 text text-capitalize">{budgetModel}</p>
              </div>
            </div>
            <button type="button" className="ud-btn btn-thm mt10">
              Submit Task
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="scheduleWindowModal"
        tabIndex={-1}
        aria-labelledby="scheduleWindowModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="scheduleWindowModalLabel">
                Select Schedule Window
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="mb20">
                <label className="form-label fw500">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={scheduleStart}
                  onChange={(e) => setScheduleStart(e.target.value)}
                />
              </div>
              <div className="mb10">
                <label className="form-label fw500">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={scheduleEnd}
                  min={scheduleStart || undefined}
                  onChange={(e) => setScheduleEnd(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-light-thm" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="ud-btn btn-thm" data-bs-dismiss="modal">
                Apply Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
