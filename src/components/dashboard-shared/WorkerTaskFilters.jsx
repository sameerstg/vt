"use client";

export default function WorkerTaskFilters({
  category,
  setCategory,
  location,
  setLocation,
  taskType,
  setTaskType,
  budgetModel,
  setBudgetModel,
  workMode,
  setWorkMode,
  locationOptions = ["all"],
  categoryOptions = [
    "all",
    "Development & IT",
    "Design & Creative",
    "Digital Marketing",
    "Writing & Translation",
    "Music & Audio",
    "Video & Animation",
    "Engineering & Architecture",
    "Finance & Accounting",
  ],
  taskTypeOptions = ["all", "Individual", "Contractor"],
  budgetModelOptions = ["all", "Fixed", "Milestone"],
  workModeOptionsList = ["all", "Virtual", "Physical"],
}) {
  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
      <h5 className="title mb20">Advanced Filters</h5>
      <div className="row g-3">
        {/* Category */}
        <div className="col-md-6 col-xl-3">
          <label className="form-label fw500 text-muted fz14">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderRadius: "8px", border: "1px solid #e8edf6", height: "45px" }}
          >
            {categoryOptions.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="col-md-6 col-xl-2">
          <label className="form-label fw500 text-muted fz14">Location</label>
          <select
            className="form-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ borderRadius: "8px", border: "1px solid #e8edf6", height: "45px" }}
          >
            {locationOptions.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Locations" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Task Type */}
        <div className="col-md-6 col-xl-2">
          <label className="form-label fw500 text-muted fz14">Task Type</label>
          <select
            className="form-select"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            style={{ borderRadius: "8px", border: "1px solid #e8edf6", height: "45px" }}
          >
            {taskTypeOptions.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Task Types" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Model */}
        <div className="col-md-6 col-xl-3">
          <label className="form-label fw500 text-muted fz14">Budget Model</label>
          <select
            className="form-select"
            value={budgetModel}
            onChange={(e) => setBudgetModel(e.target.value)}
            style={{ borderRadius: "8px", border: "1px solid #e8edf6", height: "45px" }}
          >
            {budgetModelOptions.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All Budget Models" : item}
              </option>
            ))}
          </select>
        </div>

        {/* Work Mode */}
        <div className="col-md-6 col-xl-2">
          <label className="form-label fw500 text-muted fz14">Mode</label>
          <select
            className="form-select"
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
            style={{ borderRadius: "8px", border: "1px solid #e8edf6", height: "45px" }}
          >
            {workModeOptionsList.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All" : item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
