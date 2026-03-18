"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import { getWorkerTasksBySection } from "@/data/workerTasks";
import TaskDiscoveryPanel from "@/components/dashboard-shared/TaskDiscoveryPanel";
import WorkSubmissionPanel from "@/components/dashboard-shared/WorkSubmissionPanel";
import { getAuthSession, getWorkerAppliedTasks } from "@/utils/auth/mockAuth";
import WorkerTaskFilters from "@/components/dashboard-shared/WorkerTaskFilters";

const TASK_SECTIONS = [
  { key: "applied", label: "Applied Projects", path: "/worker-dashboard/applied-tasks" },
  { key: "assigned", label: "Assigned Projects", path: "/worker-dashboard/assigned-tasks" },
  { key: "in_progress", label: "In Progress Projects", path: "/worker-dashboard/in-progress" },
  { key: "completed", label: "Completed Projects", path: "/worker-dashboard/completed-tasks" },
  { key: "work_submission", label: "Work Submission", path: "/worker-dashboard/manage-projects" },
];

const sectionLabelMap = {
  applied: "Applied Projects",
  assigned: "Assigned Projects",
  in_progress: "In Progress Projects",
  completed: "Completed Projects",
};

const FOREIGN_LOCATIONS = [
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
];

export default function TasksInfo({
  initialFilter = "applied",
  pageTitle = "Projects",
  pageDescription = "",
}) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeFilter, setActiveFilter] = useState(tabParam || initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [taskType, setTaskType] = useState("all");
  const [budgetModel, setBudgetModel] = useState("all");
  const [workMode, setWorkMode] = useState("all");

  // Standardized catalogs from CreateTaskInfo / TaskDiscoveryPanel
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

  useEffect(() => {
    setActiveFilter(tabParam || initialFilter);
    setCurrentPage(1);
    setCategory("all");
    setLocation("all");
    setTaskType("all");
    setBudgetModel("all");
    setWorkMode("all");
  }, [initialFilter, tabParam]);

  useEffect(() => {
    setCategory("all");
    setLocation("all");
    setTaskType("all");
    setBudgetModel("all");
    setWorkMode("all");
    setCurrentPage(1);
  }, [activeFilter]);

  const baseTasks = useMemo(() => {
    if (activeFilter === "work_submission" || activeFilter === "available") return [];
    const staticTasks = getWorkerTasksBySection(activeFilter);
    let all = staticTasks;
    if (activeFilter === "applied") {
      const session = getAuthSession();
      if (session?.id) {
        const dynamicApplied = getWorkerAppliedTasks(session.id);
        all = [...staticTasks, ...dynamicApplied];
      }
    }
    return Array.from(new Map(all.map(task => [String(task.id), task])).values());
  }, [activeFilter]);

  const locationOptions = useMemo(
    () => [
      "all",
      ...new Set([
        ...baseTasks.map((item) => item.location).filter(Boolean),
        ...FOREIGN_LOCATIONS,
      ]),
    ],
    [baseTasks]
  );

  const taskTypeOptions = ["all", "Individual", "Contractor"];
  const budgetModelOptions = ["all", "Fixed", "Milestone"];
  const workModeOptionsList = ["all", "Virtual", "Physical"];

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return baseTasks
      .filter(task => !query || task.title.toLowerCase().includes(query) || task.client.toLowerCase().includes(query))
      .filter(item => (category === "all" ? true : item.category === category))
      .filter(item => (location === "all" ? true : item.location === location))
      .filter(item => (taskType === "all" ? true : (item.taskType || "").toLowerCase() === taskType.toLowerCase()))
      .filter(item => (budgetModel === "all" ? true : (item.budgetModel || "").toLowerCase() === budgetModel.toLowerCase()))
      .filter(item => (workMode === "all" ? true : (item.workMode || "").toLowerCase() === workMode.toLowerCase()));
  }, [baseTasks, searchQuery, category, location, taskType, budgetModel, workMode]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage);
  }, [currentPage, filteredTasks, tasksPerPage]);

  return (
    <div className="dashboard__content hover-bgc-color worker-task-monitoring-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{pageTitle}</h2>
            <p className="text">{pageDescription}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative tm-toolbar-card">
            <div className="bdrb1 pb15 mb20 tm-toolbar-head">
              <h5 className="list-title mb-1">Status Filter</h5>
            </div>
            <div className="tm-filter-wrap">
              {TASK_SECTIONS.filter(f => f.key !== "work_submission").map(filter => (
                <button
                  key={filter.key}
                  type="button"
                  className={`tm-filter-btn ${activeFilter === filter.key ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {["applied", "assigned", "in_progress", "completed"].includes(activeFilter) && (
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
        )}

        <div className="col-xl-12">
          {activeFilter === "available" ? (
            <TaskDiscoveryPanel preferredLocation="United States" proposalPath="/worker-dashboard/proposal" />
          ) : activeFilter === "work_submission" ? (
            <WorkSubmissionPanel showMilestoneSelector />
          ) : (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb20">
                <h5 className="list-title mb-0">{sectionLabelMap[activeFilter] || "Tasks"} List</h5>
              </div>
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Client</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Skills</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paginatedTasks.map(task => (
                      <tr key={task.id} className="task-row-hover">
                        <td>{task.title}</td>
                        <td>{task.client}</td>
                        <td>{task.budget}</td>
                        <td>{task.deadline}</td>
                        <td>{(task.skills || []).join(", ")}</td>
                        <td>
                          <Link
                            href={activeFilter === "in_progress" 
                              ? `/worker-dashboard/manage-projects?taskId=${task.id}&taskTitle=${encodeURIComponent(task.title)}`
                              : `/worker-dashboard/${activeFilter === "applied" ? "applied-tasks" : activeFilter === "assigned" ? "assigned-tasks" : "completed-tasks"}/details?taskId=${task.id}&title=${encodeURIComponent(task.title)}`}
                            className="ud-btn btn-thm"
                            style={{ padding: "5px 15px", fontSize: "12px" }}
                          >
                            {activeFilter === "in_progress" ? "Submit Work" : "Details"}
                            <i className="fal fa-arrow-right-long ms-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {!paginatedTasks.length && (
                      <tr>
                        <td className="text-center py-5" colSpan={6}>
                          <p className="mb-0 text">No tasks found for this filter/search combination.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="worker-pagination mt30">
                  <button className="worker-pagination__nav" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} className={`worker-pagination__page ${currentPage === page ? "is-active" : ""}`} onClick={() => setCurrentPage(page)}>{page}</button>
                  ))}
                  <button className="worker-pagination__nav" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .worker-task-monitoring-page :global(.ps-widget) { border: 1px solid #e8edf6; }
        .tm-filter-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tm-filter-btn { border: 1px solid #dbe1ee; background: #ffffff; border-radius: 4px; padding: 8px 13px; font-weight: 600; color: #334155; font-size: 13px; }
        .tm-filter-btn.active, .tm-filter-btn:hover { border-color: #5b2dff; color: #5b2dff; background: #f7f7f7; }
        .task-row-hover td { transition: background-color 0.2s ease; }
        .task-row-hover:hover td { background-color: #f7f7f7; }
        .worker-pagination { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .worker-pagination__page, .worker-pagination__nav { min-width: 42px; height: 42px; border-radius: 4px; border: 1px solid #dbe1ee; background: #ffffff; font-weight: 600; }
        .worker-pagination__page.is-active { border-color: #5b2dff; background: #f7f7f7; color: #5b2dff; }
        .worker-pagination__nav:disabled { opacity: 0.45; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
