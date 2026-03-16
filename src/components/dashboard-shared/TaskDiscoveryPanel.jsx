"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { taskDiscoveryItems } from "@/data/taskDiscovery";
import { getAllClientTasks } from "@/utils/auth/mockAuth";
import WorkerTaskFilters from "./WorkerTaskFilters";

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
  const [workMode, setWorkMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const [dynamicTasks, setDynamicTasks] = useState([]);

  useEffect(() => {
    setDynamicTasks(getAllClientTasks());
  }, []);

  const allTasks = useMemo(() => {
    return [...taskDiscoveryItems, ...dynamicTasks];
  }, [dynamicTasks]);

  // Standardized catalogs from CreateTaskInfo
  const categoryOptions = [
    "all",
    "Development & IT",
    "Design & Creative",
    "Digital Marketing",
    "Writing & Translation",
    "Music & Audio",
    "Video & Animation",
    "Engineering & Architecture",
    "Finance & Accounting",
  ];

  const locationOptions = useMemo(
    () => [
      "all",
      ...new Set([
        ...allTasks.map((item) => item.location),
        ...FOREIGN_LOCATIONS,
      ]),
    ],
    [allTasks]
  );

  const taskTypeOptions = ["all", "Individual", "Contractor"];
  const budgetModelOptions = ["all", "Fixed", "Milestone"];
  const workModeOptions = ["all", "Virtual", "Physical"];

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allTasks
      .filter((item) => (category === "all" ? true : item.category === category))
      .filter((item) => (location === "all" ? true : item.location === location))
      .filter((item) => (taskType === "all" ? true : (item.taskType || "").toLowerCase() === taskType.toLowerCase()))
      .filter((item) =>
        budgetModel === "all" ? true : (item.budgetModel || "").toLowerCase() === budgetModel.toLowerCase()
      )
      .filter((item) => {
        if (workMode === "all") return true;
        const mode = (item.workMode || "").toLowerCase();
        return mode === workMode.toLowerCase();
      })
      .filter((item) => {
        if (!query) return true;
        return (
          item.title.toLowerCase().includes(query) ||
          (item.client || "").toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        const aRank = getLocationPriorityRank(a.location, preferredLocation);
        const bRank = getLocationPriorityRank(b.location, preferredLocation);
        if (aRank !== bRank) return aRank - bRank;
        return String(a.id).localeCompare(String(b.id));
      });
  }, [allTasks, budgetModel, category, location, preferredLocation, taskType, workMode, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, location, taskType, budgetModel, workMode, searchQuery]);

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
      clientId: task.clientId || "",
      clientEmail: task.clientEmail || "",
    });
    router.push(`${proposalPath}?${query.toString()}`);
  };

  return (
    <div className="row g-4">
      {/* FILTERS */}
      <div className="col-xl-12">
        <WorkerTaskFilters
          category={category}
          setCategory={setCategory}
          location={location}
          setLocation={setLocation}
          taskType={taskType}
          setTaskType={setTaskType}
          budgetModel={budgetModel}
          setBudgetModel={setBudgetModel}
          workMode={workMode}
          setWorkMode={setWorkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          locationOptions={locationOptions}
        />
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
                  <th>Client</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Mode</th>
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
                    <td className="fw500">{task.title}</td>
                    <td>{task.client || "VT Verified"}</td>
                    <td>{task.category}</td>
                    <td>{task.location}</td>
                    <td className="text-capitalize">{task.workMode || "Virtual"}</td>
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
        .task-row-hover td { transition: background-color 0.2s ease; }
        .task-row-hover:hover td { background-color: #f7f7f7; }
        .task-row-hover:hover td:first-child { color: #5b2dff; font-weight: 600; }
        .worker-pagination { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .worker-pagination__page, .worker-pagination__nav { min-width: 42px; height: 42px; border-radius: 4px; border: 1px solid #dbe1ee; background: #ffffff; font-weight: 600; }
        .worker-pagination__page.is-active { border-color: #5b2dff; background: #f7f7f7; color: #5b2dff; }
        .worker-pagination__nav:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>
    </div>
  );
}