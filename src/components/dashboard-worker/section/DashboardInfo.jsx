import DashboardNavigation from "../header/DashboardNavigation";
import Link from "next/link";
import DoughnutChart from "../chart/DoughnutChart";
import LineChart from "../chart/LineChart";
import {
  getWorkerTasksBySection,
  paymentHistory,
  workerSectionConfig,
} from "@/data/workerTasks";

export default function DashboardInfo() {
  const availableTasks = getWorkerTasksBySection("available");
  const appliedTasks = getWorkerTasksBySection("applied");
  const assignedTasks = getWorkerTasksBySection("assigned");
  const inProgressTasks = getWorkerTasksBySection("in_progress");
  const completedTasks = getWorkerTasksBySection("completed");

  const sectionCards = [
    { key: "available", tasks: availableTasks },
    { key: "applied", tasks: appliedTasks },
    { key: "assigned", tasks: assignedTasks },
    { key: "in_progress", tasks: inProgressTasks },
    { key: "completed", tasks: completedTasks },
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
              <h2>Worker Dashboard</h2>
              <p className="text">
                View available and assigned tasks with progress and payment updates.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Open Task Buckets</div>
                <div className="title">5</div>
                <div className="text fz14">Tracked states for worker execution</div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-content" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Tasks In Progress</div>
                <div className="title">{inProgressTasks.length}</div>
                <div className="text fz14">Active delivery workload right now</div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-success" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-4">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Payments Recorded</div>
                <div className="title">{paymentHistory.length}</div>
                <div className="text fz14">Latest completed and pending payouts</div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-dollar" />
              </div>
            </div>
          </div>
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
                  <h5 className="title">{workerSectionConfig[section.key].title}</h5>
                  <Link
                    href={workerSectionConfig[section.key].path}
                    className="text-decoration-underline text-thm6"
                  >
                    View All
                  </Link>
                </div>
                <p className="text mb15">{workerSectionConfig[section.key].description}</p>
                <ul className="mb0 ps-0">
                  {section.tasks.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="d-flex justify-content-between mb10 p10 bdrs4"
                      style={{ backgroundColor: "#f7f7f7", listStyle: "none" }}
                    >
                      <span className="fw500">{task.title}</span>
                      <span className="text-thm6">{task.budget}</span>
                    </li>
                  ))}
                  {section.tasks.length === 0 && (
                    <li style={{ listStyle: "none" }}>No tasks found.</li>
                  )}
                </ul>
              </div>
            </div>
          ))}

          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">{workerSectionConfig.payment_history.title}</h5>
                <Link
                  href={workerSectionConfig.payment_history.path}
                  className="text-decoration-underline text-thm6"
                >
                  View All
                </Link>
              </div>
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Task</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Method</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.date}</td>
                        <td>{payment.task}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.method}</td>
                        <td>{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

