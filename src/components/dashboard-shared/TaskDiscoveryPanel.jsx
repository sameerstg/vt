"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { taskDiscoveryItems } from "@/data/taskDiscovery";

const FOREIGN_LOCATIONS = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
];

function getLocationPriorityRank(location, preferredLocation) {
  const normalized = String(location || "").toLowerCase();
  const preferred = String(preferredLocation || "").toLowerCase();

  if (normalized === preferred) return 1;
  if (normalized === "remote") return 2;
  if (normalized.includes("pakistan")) return 3;
  return 4;
}

export default function TaskDiscoveryPanel({
  preferredLocation = "Karachi",
  proposalPath = "/worker-dashboard/proposal",
}) {
  const router = useRouter();

  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [taskType, setTaskType] = useState("all");
  const [budgetModel, setBudgetModel] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const categoryOptions = useMemo(
    () => ["all", ...new Set(taskDiscoveryItems.map((item) => item.category))],
    []
  );

  const locationOptions = useMemo(
    () => [
      "all",
      ...new Set([
        ...taskDiscoveryItems.map((item) => item.location),
        ...FOREIGN_LOCATIONS,
      ]),
    ],
    []
  );

  const taskTypeOptions = useMemo(
    () => ["all", ...new Set(taskDiscoveryItems.map((item) => item.taskType))],
    []
  );

  const budgetModelOptions = useMemo(
    () => ["all", ...new Set(taskDiscoveryItems.map((item) => item.budgetModel))],
    []
  );

  const filteredTasks = useMemo(() => {
    return taskDiscoveryItems
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => (location === "all" ? true : item.location === location))
      .filter((item) => (taskType === "all" ? true : item.taskType === taskType))
      .filter((item) =>
        budgetModel === "all" ? true : item.budgetModel === budgetModel
      )
      .sort((a, b) => {
        const aRank = getLocationPriorityRank(a.location, preferredLocation);
        const bRank = getLocationPriorityRank(b.location, preferredLocation);
        if (aRank !== bRank) return aRank - bRank;
        return a.id.localeCompare(b.id);
      });
  }, [budgetModel, category, location, preferredLocation, taskType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, location, taskType, budgetModel]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTasks.length / tasksPerPage)
  );

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  }, [currentPage, filteredTasks]);

  const openProposalPage = (task) => {
    const query = new URLSearchParams({
      taskId: task.id,
      taskTitle: task.title,
    });
    router.push(`${proposalPath}?${query.toString()}`);
  };

  return (
    <div className="row g-4">
      {/* FILTERS */}
      <div className="col-xl-12">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <h5 className="title mb20">Required Filters</h5>

          <div className="row g-3">
            <div className="col-md-6 col-xl-3">
              <label className="form-label fw500">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categoryOptions.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Categories" : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 col-xl-3">
              <label className="form-label fw500">Location</label>
              <select
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locationOptions.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Locations" : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 col-xl-3">
              <label className="form-label fw500">Task Type</label>
              <select
                className="form-select"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              >
                {taskTypeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Task Types" : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 col-xl-3">
              <label className="form-label fw500">Budget Model</label>
              <select
                className="form-select"
                value={budgetModel}
                onChange={(e) => setBudgetModel(e.target.value)}
              >
                {budgetModelOptions.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Budget Models" : item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="col-xl-12">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative h-100">
          <h5 className="title mb20">Task Listings</h5>

          <div className="packages_table table-responsive">
            <table className="table-style3 table at-savesearch">
              <thead className="t-head">
                <tr>
                  <th>Task</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Task Type</th>
                  <th>Budget Model</th>
                  <th>Budget</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="t-body">
                {paginatedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="task-row-hover"
                  >
                    <td>{task.title}</td>
                    <td>{task.category}</td>
                    <td>{task.location}</td>
                    <td>{task.taskType}</td>
                    <td>{task.budgetModel}</td>
                    <td>{task.budget}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const query = new URLSearchParams({
                              taskId: task.id,
                              title: task.title,
                            });
                            router.push(`/worker-dashboard/available-tasks/details?${query.toString()}`);
                          }}
                          className="ud-btn btn-light-default"
                          style={{ padding: "5px 15px", fontSize: "12px" }}
                        >
                          Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openProposalPage(task);
                          }}
                          className="ud-btn btn-thm"
                          style={{ padding: "5px 15px", fontSize: "12px" }}
                        >
                          Apply<i className="fal fa-arrow-right-long ms-1" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedTasks.length === 0 && (
                  <tr>
                    <td colSpan={6}>No tasks found for selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="worker-pagination mt30">
            <button
              className="worker-pagination__nav"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`worker-pagination__page ${
                    currentPage === page ? "is-active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              className="worker-pagination__nav"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .task-row-hover td {
          transition: background-color 0.2s ease;
        }

        .task-row-hover:hover td {
          background-color: #f5f7ff;
        }

        .task-row-hover:hover td:first-child {
          color: #5b2eff;
          font-weight: 600;
        }

        .worker-pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .worker-pagination__page,
        .worker-pagination__nav {
          min-width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid #dbe1ee;
          background: #ffffff;
          font-weight: 600;
        }

        .worker-pagination__page.is-active {
          border-color: #5b2dff;
          background: #f4f0ff;
          color: #5b2dff;
        }

        .worker-pagination__nav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}