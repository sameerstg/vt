"use client";

import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import LineChart from "../chart/LineChart";
import { useState, useEffect, useMemo } from "react";
import {
  getWorkerTasksBySection,
  workerSectionConfig,
} from "@/data/workerTasks";
import { getAuthSession, getWorkerAppliedTasks } from "@/utils/auth/mockAuth";

export default function DashboardInfo() {
  const [session, setSession] = useState(null);
  const [dynamicAppliedTasks, setDynamicAppliedTasks] = useState([]);

  useEffect(() => {
    const currentSession = getAuthSession();
    setSession(currentSession);
    if (currentSession?.id) {
      const applied = getWorkerAppliedTasks(currentSession.id);
      setDynamicAppliedTasks(applied);
    }
  }, []);

  const availableTasks = getWorkerTasksBySection("available");
  const assignedTasks = getWorkerTasksBySection("assigned");
  const inProgressTasks = getWorkerTasksBySection("in_progress");
  const completedTasks = getWorkerTasksBySection("completed");

  const sectionCards = useMemo(() => {
    const rawCards = [
      { 
        key: "applied", 
        tasks: [...getWorkerTasksBySection("applied"), ...dynamicAppliedTasks] 
      },
      { key: "assigned", tasks: assignedTasks },
      { key: "in_progress", tasks: inProgressTasks },
      { key: "completed", tasks: completedTasks },
    ];

    // Deduplicate tasks within each section by their ID
    return rawCards.map(section => ({
      ...section,
      tasks: Array.from(new Map(section.tasks.map(t => [String(t.id), t])).values())
    }));
  }, [availableTasks, dynamicAppliedTasks, assignedTasks, inProgressTasks, completedTasks]);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>

          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Worker Dashboard</h2>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="row g-4 mb30">
          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Open Project Buckets</div>
                <div className="title">4</div>
                <div className="text fz14">
                  Tracked states for project execution
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-content" />
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Projects In Progress</div>
                <div className="title">{inProgressTasks.length}</div>
                <div className="text fz14">
                  Active delivery workload right now
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-success" />
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Completed Projects</div>
                <div className="title">{completedTasks.length}</div>
                <div className="text fz14">
                  Successfully delivered projects
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="row mb30">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative border-none" style={{ border: '1px solid #e8edf6' }}>
              <LineChart />
            </div>
          </div>
        </div>

        {/* Task Sections */}
        <div className="row g-4">
          {sectionCards.map((section) => (
            <div className="col-xl-6" key={section.key}>
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative h-100 border-none" style={{ border: '1px solid #e8edf6' }}>
                <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
                  <h5 className="title mb-0">
                    {workerSectionConfig[section.key].title}
                  </h5>

                  <Link
                    href={workerSectionConfig[section.key].path}
                    className="text-decoration-underline fz14 text-thm6"
                  >
                    View All
                  </Link>
                </div>

                <p className="text mb20 fz14 text-muted">
                  {workerSectionConfig[section.key].description}
                </p>

                <ul className="mb0 ps-0">
                  {section.tasks.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="d-flex justify-content-between align-items-center mb10 p15 bdrs4"
                      style={{
                        backgroundColor: "#f7f7f7",
                        listStyle: "none",
                        border: "1px solid #f0f2f7"
                      }}
                    >
                      <span className="fw500 fz15">{task.title}</span>
                      <span className="fw600 text-thm6">{task.budget}</span>
                    </li>
                  ))}

                  {section.tasks.length === 0 && (
                    <li className="text-muted fz14 mt20" style={{ listStyle: "none" }}>
                      No tasks found.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}