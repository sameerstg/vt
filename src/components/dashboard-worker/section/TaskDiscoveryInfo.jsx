"use client";

import { useMemo, useState } from "react";
import { taskDiscoveryTasks } from "@/data/dashboardWorker";
import DashboardNavigation from "../header/DashboardNavigation";

const buildOptions = (items = []) => {
  return ["all", ...Array.from(new Set(items)).sort((a, b) => a.localeCompare(b))];
};

const getCountry = (location = "") => {
  const parts = location
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return parts.length ? parts[parts.length - 1].toLowerCase() : "";
};

const getLocationPriority = (task, preferredLocation) => {
  if (preferredLocation === "all") return 1;
  if (task.location === preferredLocation) return 1;
  if (task.taskType === "Remote" || task.location.toLowerCase().includes("remote")) return 2;
  if (getCountry(task.location) === getCountry(preferredLocation)) return 3;
  return 4;
};

const getPriorityLabel = (priority) => {
  if (priority === 1) return "Best Match";
  if (priority === 2) return "Remote Match";
  if (priority === 3) return "Country Match";
  return "Other";
};

const getBudgetBounds = (budget = "") => {
  const values = (budget.match(/\d[\d,]*/g) || []).map((item) =>
    Number(item.replace(/,/g, ""))
  );
  const min = values.length ? values[0] : 0;
  const max = values.length > 1 ? values[values.length - 1] : min;
  return { min, max };
};

export default function TaskDiscoveryInfo() {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [taskType, setTaskType] = useState("all");
  const [budgetModel, setBudgetModel] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("priority");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const categoryOptions = useMemo(() => buildOptions(taskDiscoveryTasks.map((task) => task.category)), []);
  const locationOptions = useMemo(() => buildOptions(taskDiscoveryTasks.map((task) => task.location)), []);
  const taskTypeOptions = useMemo(() => buildOptions(taskDiscoveryTasks.map((task) => task.taskType)), []);
  const budgetModelOptions = useMemo(
    () => buildOptions(taskDiscoveryTasks.map((task) => task.budgetModel)),
    []
  );

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return taskDiscoveryTasks.filter((task) => {
      const categoryMatch = category === "all" || task.category === category;
      const locationMatch = location === "all" || task.location === location;
      const taskTypeMatch = taskType === "all" || task.taskType === taskType;
      const budgetModelMatch = budgetModel === "all" || task.budgetModel === budgetModel;
      const remoteMatch =
        !remoteOnly || task.taskType === "Remote" || task.location.toLowerCase().includes("remote");
      const searchMatch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.client.toLowerCase().includes(query) ||
        task.location.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query) ||
        task.budget.toLowerCase().includes(query);

      return (
        categoryMatch &&
        locationMatch &&
        taskTypeMatch &&
        budgetModelMatch &&
        remoteMatch &&
        searchMatch
      );
    });
  }, [budgetModel, category, location, remoteOnly, search, taskType]);

  const prioritizedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (sortBy === "budget-low") {
        const budgetA = getBudgetBounds(a.budget).min;
        const budgetB = getBudgetBounds(b.budget).min;
        if (budgetA !== budgetB) return budgetA - budgetB;
      }

      if (sortBy === "budget-high") {
        const budgetA = getBudgetBounds(a.budget).max;
        const budgetB = getBudgetBounds(b.budget).max;
        if (budgetA !== budgetB) return budgetB - budgetA;
      }

      if (sortBy === "latest") {
        return a.postedRank - b.postedRank;
      }

      const priorityA = getLocationPriority(a, location);
      const priorityB = getLocationPriority(b, location);
      if (priorityA !== priorityB) return priorityA - priorityB;
      return a.postedRank - b.postedRank;
    });
  }, [filteredTasks, location, sortBy]);

  const locationPrioritySummary = useMemo(() => {
    const summary = { 1: 0, 2: 0, 3: 0, 4: 0 };
    prioritizedTasks.forEach((task) => {
      const priority = getLocationPriority(task, location);
      summary[priority] += 1;
    });
    return summary;
  }, [location, prioritizedTasks]);

  const filterChips = useMemo(() => {
    const chips = [];
    if (category !== "all") chips.push({ key: "category", label: category });
    if (location !== "all") chips.push({ key: "location", label: location });
    if (taskType !== "all") chips.push({ key: "taskType", label: taskType });
    if (budgetModel !== "all") chips.push({ key: "budgetModel", label: budgetModel });
    if (remoteOnly) chips.push({ key: "remoteOnly", label: "Remote only" });
    if (search.trim()) chips.push({ key: "search", label: `Search: ${search.trim()}` });
    return chips;
  }, [budgetModel, category, location, remoteOnly, search, taskType]);

  const clearOneFilter = (key) => {
    if (key === "category") setCategory("all");
    if (key === "location") setLocation("all");
    if (key === "taskType") setTaskType("all");
    if (key === "budgetModel") setBudgetModel("all");
    if (key === "remoteOnly") setRemoteOnly(false);
    if (key === "search") setSearch("");
  };

  const hasActiveFilters = useMemo(() => {
    return filterChips.length > 0;
  }, [filterChips.length]);

  const summaryText = useMemo(() => {
    if (!hasActiveFilters) return "Showing all tasks";
    return `Showing ${prioritizedTasks.length} filtered tasks`;
  }, [hasActiveFilters, prioritizedTasks.length]);

  const handleResetFilters = () => {
    setCategory("all");
    setLocation("all");
    setTaskType("all");
    setBudgetModel("all");
    setSearch("");
    setSortBy("priority");
    setRemoteOnly(false);
  };

  return (
    <div className="dashboard__content hover-bgc-color task-discovery-page">
      <div className="row pb30">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Task Discovery</h2>
            <p className="text">
              Browse tasks using smart filters and location priority logic.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative td-filter-widget">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb20">
              <h5 className="list-title mb-0">Required Filters</h5>
              <div className="d-flex align-items-center gap-2">
                <span className="td-summary-text">{summaryText}</span>
                <button type="button" className="td-clear-btn" onClick={handleResetFilters}>
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 col-xl-2">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Category</label>
                  <div className="td-select-wrap">
                    <select
                      className="form-control td-select"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                    >
                      {categoryOptions.map((item) => (
                        <option key={item} value={item}>
                          {item === "all" ? "All Categories" : item}
                        </option>
                      ))}
                    </select>
                    <span className="td-select-icon">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-2">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Location</label>
                  <div className="td-select-wrap">
                    <select
                      className="form-control td-select"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                    >
                      {locationOptions.map((item) => (
                        <option key={item} value={item}>
                          {item === "all" ? "All Locations" : item}
                        </option>
                      ))}
                    </select>
                    <span className="td-select-icon">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-2">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Task Type</label>
                  <div className="td-select-wrap">
                    <select
                      className="form-control td-select"
                      value={taskType}
                      onChange={(event) => setTaskType(event.target.value)}
                    >
                      {taskTypeOptions.map((item) => (
                        <option key={item} value={item}>
                          {item === "all" ? "All Task Types" : item}
                        </option>
                      ))}
                    </select>
                    <span className="td-select-icon">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-2">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Budget Model</label>
                  <div className="td-select-wrap">
                    <select
                      className="form-control td-select"
                      value={budgetModel}
                      onChange={(event) => setBudgetModel(event.target.value)}
                    >
                      {budgetModelOptions.map((item) => (
                        <option key={item} value={item}>
                          {item === "all" ? "All Budget Models" : item}
                        </option>
                      ))}
                    </select>
                    <span className="td-select-icon">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-2">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Sort By</label>
                  <div className="td-select-wrap">
                    <select
                      className="form-control td-select"
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                    >
                      <option value="priority">Priority</option>
                      <option value="latest">Latest</option>
                      <option value="budget-high">Budget: High to Low</option>
                      <option value="budget-low">Budget: Low to High</option>
                    </select>
                    <span className="td-select-icon">
                      <i className="fas fa-chevron-down" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-2">
                <div className="mb20 td-remote-wrap">
                  <label className="heading-color ff-heading fw500 mb10">Quick Toggle</label>
                  <label className="td-check">
                    <input
                      type="checkbox"
                      checked={remoteOnly}
                      onChange={(event) => setRemoteOnly(event.target.checked)}
                    />
                    <span>Remote only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="td-search-wrap">
              <i className="flaticon-loupe td-search-icon" />
              <input
                type="text"
                className="form-control td-search-input"
                placeholder="Search by task title, client, location, or category"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            {hasActiveFilters && (
              <div className="td-chip-wrap">
                {filterChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    className="td-chip"
                    onClick={() => clearOneFilter(chip.key)}
                  >
                    {chip.label}
                    <i className="fas fa-times ms-2" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="d-flex align-items-center justify-content-between bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Task Listings</h5>
              <span className="td-result-count">{prioritizedTasks.length} tasks found</span>
            </div>

            <div className="td-task-list">
              {prioritizedTasks.length ? (
                prioritizedTasks.map((task) => {
                  const priority = getLocationPriority(task, location);
                  return (
                    <div key={task.id} className="td-task-card">
                      <div className="row align-items-center">
                        <div className="col-xl-8">
                          <h5 className="td-task-title mb10">{task.title}</h5>
                          <p className="td-client-name mb15">{task.client}</p>
                          <div className="td-tag-row">
                            <span className="td-tag">{task.category}</span>
                            <span className="td-tag">{task.location}</span>
                            <span className="td-tag">{task.taskType}</span>
                            <span className="td-tag">{task.budgetModel}</span>
                          </div>
                        </div>
                        <div className="col-xl-4 mt20 mt-xl-0">
                          <div className="td-meta-panel">
                            <p className="td-budget mb8">{task.budget}</p>
                            <span className={`td-priority td-priority-${priority}`}>
                              P{priority} - {getPriorityLabel(priority)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="td-empty-state">
                  <h6 className="mb10">No tasks found</h6>
                  <p className="mb-0">Try changing filters or search keywords to discover more tasks.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative td-logic-widget">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Location Priority Logic</h5>
            </div>

            <p className="text mb20">
              Active base location:{" "}
              <span className="fw500 text-thm">
                {location === "all" ? "All Locations" : location}
              </span>
            </p>

            <div className="td-logic-item">
              <span className="td-logic-label">P1: Exact location match</span>
              <span className="td-logic-count td-logic-1">{locationPrioritySummary[1]}</span>
            </div>
            <div className="td-logic-item">
              <span className="td-logic-label">P2: Remote opportunities</span>
              <span className="td-logic-count td-logic-2">{locationPrioritySummary[2]}</span>
            </div>
            <div className="td-logic-item">
              <span className="td-logic-label">P3: Same country</span>
              <span className="td-logic-count td-logic-3">{locationPrioritySummary[3]}</span>
            </div>
            <div className="td-logic-item">
              <span className="td-logic-label">P4: Other locations</span>
              <span className="td-logic-count td-logic-4">{locationPrioritySummary[4]}</span>
            </div>

            <div className="bdrt1 pt15 mt20">
              <p className="mb-0 text">
                Listing order is sorted by priority level first, then by recency rank.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .td-filter-widget {
          z-index: 50;
        }

        .td-summary-text {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        .td-select-wrap {
          position: relative;
        }

        .td-select {
          height: 54px;
          border-radius: 10px;
          border: 1px solid #e0e5f2;
          padding-right: 40px;
          font-weight: 500;
          background-color: #fff;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        .td-select:focus {
          border-color: #6340ff;
          box-shadow: 0 0 0 3px rgba(99, 64, 255, 0.12);
        }

        .td-select-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #687089;
          pointer-events: none;
          font-size: 12px;
        }

        .td-search-wrap {
          position: relative;
          margin-top: 4px;
        }

        .td-chip-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .td-chip {
          border: 1px solid #d6d9e5;
          border-radius: 999px;
          background: #f8f9fc;
          color: #454c67;
          font-size: 12px;
          padding: 6px 10px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
        }

        .td-chip:hover {
          border-color: #6340ff;
          color: #6340ff;
        }

        .td-remote-wrap {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 86px;
        }

        .td-check {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #4b5563;
          cursor: pointer;
        }

        .td-check input {
          width: 16px;
          height: 16px;
          accent-color: #6340ff;
        }

        .td-search-input {
          height: 54px;
          border-radius: 10px;
          border: 1px solid #e0e5f2;
          padding-left: 46px;
          font-weight: 500;
        }

        .td-search-input:focus {
          border-color: #6340ff;
          box-shadow: 0 0 0 3px rgba(99, 64, 255, 0.12);
        }

        .td-search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #757f9a;
          z-index: 1;
          font-size: 16px;
        }

        .td-clear-btn {
          border: 1px solid #d8ddea;
          background-color: #ffffff;
          color: #3f4660;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          line-height: 1;
        }

        .td-clear-btn:hover {
          border-color: #6340ff;
          color: #6340ff;
        }

        .td-result-count {
          font-size: 14px;
          font-weight: 600;
          color: #4d5570;
        }

        .td-task-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .td-task-card {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 18px 16px;
          background: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }

        .td-task-card:hover {
          border-color: #d8cffc;
          box-shadow: 0 8px 24px rgba(39, 15, 107, 0.08);
          transform: translateY(-1px);
        }

        .td-task-title {
          font-size: 20px;
          line-height: 1.35;
        }

        .td-client-name {
          font-size: 14px;
          font-weight: 600;
          color: #586183;
        }

        .td-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .td-tag {
          display: inline-flex;
          align-items: center;
          border: 1px solid #e0e5f2;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 12px;
          line-height: 1.2;
          color: #394162;
          background-color: #fbfcff;
        }

        .td-meta-panel {
          border: 1px solid #e5e9f4;
          border-radius: 10px;
          background: #fff;
          padding: 14px;
          text-align: right;
        }

        .td-budget {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          color: #101828;
        }

        .td-priority {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .td-priority-1 {
          background: #eaf7ee;
          color: #0f7a37;
        }

        .td-priority-2 {
          background: #e8f1ff;
          color: #1d4ed8;
        }

        .td-priority-3 {
          background: #fff6e5;
          color: #b45309;
        }

        .td-priority-4 {
          background: #f4f4f5;
          color: #52525b;
        }

        .td-empty-state {
          border: 1px dashed #cdd5e3;
          border-radius: 12px;
          padding: 28px 18px;
          text-align: center;
          background: #fbfdff;
          color: #576080;
        }

        .td-logic-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dashed #e7e9f1;
        }

        .td-logic-item:last-of-type {
          border-bottom: 0;
          padding-bottom: 2px;
        }

        .td-logic-label {
          font-size: 15px;
          color: #48506c;
          font-weight: 500;
        }

        .td-logic-count {
          width: 44px;
          height: 36px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
        }

        .td-logic-1 {
          background: #eaf7ee;
          color: #0f7a37;
        }

        .td-logic-2 {
          background: #e8f1ff;
          color: #1d4ed8;
        }

        .td-logic-3 {
          background: #fff6e5;
          color: #b45309;
        }

        .td-logic-4 {
          background: #f4f4f5;
          color: #52525b;
        }

        @media (max-width: 1399px) {
          .td-task-title {
            font-size: 18px;
          }

          .td-budget {
            font-size: 22px;
          }
        }

        @media (max-width: 767px) {
          .td-summary-text {
            width: 100%;
          }

          .td-task-card {
            padding: 16px 14px;
          }

          .td-meta-panel {
            text-align: left;
          }

          .td-budget {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}
