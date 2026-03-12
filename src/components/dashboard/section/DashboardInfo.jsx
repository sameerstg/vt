import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import DoughnutChart from "../chart/DoughnutChart";
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
  const sectionCards = [
    {
      key: "active",
      title: "Active Tasks",
      description: "Tasks currently open and receiving proposals.",
      path: "/dashboard/active-tasks",
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
              <p className="text">Manage posted tasks and track progress.</p>
            </div>
          </div>
        </div>

        <div className="row">
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

        <div className="row">
          <div className="col-xl-8">
            <LineChart />
          </div>
          <div className="col-xl-4">
            <DoughnutChart />
          </div>
        </div>

        <div className="row">
          {sectionCards.map((section) => (
            <div className="col-xl-6" key={section.key}>
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                  <h5 className="title">{section.title}</h5>
                  <Link href={section.path} className="text-decoration-underline text-thm6">
                    View All
                  </Link>
                </div>
                <p className="text mb15">{section.description}</p>
                <ul className="mb0 ps-0">
                  {section.items.slice(0, 3).map((item) => (
                    <li
                      key={item.id}
                      className="d-flex justify-content-between mb10 p10 bdrs4"
                      style={{ backgroundColor: "#f7f7f7", listStyle: "none" }}
                    >
                      <span className="fw500">{item.title}</span>
                      <span className="text-thm6">{item.meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
