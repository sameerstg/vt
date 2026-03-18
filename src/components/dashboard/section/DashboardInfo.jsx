"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LineChart from "../chart/LineChart";
import {
  activeTasks,
  completedTasks,
  disputedTasks,
  inProgressTasks,
  pendingEscrow,
  taskStats,
} from "@/data/clientDashboard";

export default function DashboardInfo() {
  const router = useRouter();
  const sectionCards = [
    {
      key: "active",
      title: "Projects",
      description: "Tasks currently open and receiving proposals.",
      path: "/dashboard/active-tasks",
      createPath: "/dashboard/create-task",
      items: activeTasks.map((task) => ({
        id: task.title,
        title: task.title,
        meta: task.budget,
      })),
    },
    {
      key: "pending_escrow",
      title: "Pending Escrow Funding",
      description: "Tasks waiting for escrow payment confirmation.",
      path: "/dashboard/pending-escrow-funding",
      items: pendingEscrow.map((task) => ({
        id: task.task,
        title: task.task,
        meta: task.amount,
      })),
    },
    {
      key: "in_progress",
      title: "In Progress",
      description: "Tasks currently being worked on by freelancers.",
      path: "/dashboard/in-progress",
      items: inProgressTasks.map((task) => ({
        id: task.task,
        title: task.task,
        meta: task.eta,
      })),
    },
    {
      key: "completed",
      title: "Completed",
      description: "Tasks delivered and approved successfully.",
      path: "/dashboard/completed",
      items: completedTasks.map((task) => ({
        id: task.task,
        title: task.task,
        meta: task.completedOn,
      })),
    },
    {
      key: "disputed",
      title: "Disputed",
      description: "Tasks requiring dispute resolution.",
      path: "/dashboard/disputed",
      items: disputedTasks.map((task) => ({
        id: task.task,
        title: task.task,
        meta: task.status,
      })),
    },
  ];

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Client Dashboard</h2>
            </div>
          </div>
        </div>

        <div className="row g-4 mb30">
          {taskStats.map((item, index) => (
            <div key={index} className="col-sm-6 col-xxl-4">
              <div className="d-flex align-items-center justify-content-between statistics_funfact">
                <div className="details">
                  <div className="fz15">{item.title}</div>
                  <div className="title">{item.value}</div>
                  <div className="text fz14">{item.note}</div>
                </div>
                <div className="icon text-center">
                  <i className={item.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mb30">
          <div className="col-xl-12">
            <div
              className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative"
              style={{ border: "1px solid #e8edf6" }}
            >
              <LineChart />
            </div>
          </div>
        </div>

        <div className="row g-4">
          {sectionCards.map((section) => (
            <div className="col-xl-6" key={section.key}>
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative h-100" style={{ border: '1px solid #e8edf6' }}>
                <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
                  <h5 className="title mb-0">{section.title}</h5>
                  {section.key === "active" && (
                    <button
                      onClick={() => router.push(section.createPath)}
                      className="ud-btn btn-thm"
                      style={{ padding: "5px 15px", fontSize: "12px" }}
                    >
                      + Create Project<i className="fal fa-arrow-right-long ms-1" />
                    </button>
                  )}
                </div>
                <p className="text mb20 fz14 text-muted">
                  {section.description}
                </p>
                <ul className="mb0 ps-0">
                  {section.items.slice(0, 3).map((item) => (
                    <li
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb10 p15 bdrs4"
                      style={{
                        backgroundColor: "#f7f7f7",
                        listStyle: "none",
                        border: "1px solid #f0f2f7"
                      }}
                    >
                      <span className="fw500 fz15">{item.title}</span>
                      <span className="fw600 text-thm6">{item.meta}</span>
                    </li>
                  ))}
                  {section.items.length === 0 && (
                    <li className="text-muted fz14 mt20" style={{ listStyle: "none" }}>
                      No tasks found.
                    </li>
                  )}
                </ul>
                <div className="text-end mt15">
                  <Link href={section.path} className="text-decoration-underline fz14 text-thm6">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
