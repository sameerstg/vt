import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getWorkerTasksBySection,
  paymentHistory,
  workerSectionConfig,
} from "@/data/workerTasks";

export default function WorkerTaskSectionInfo({ sectionKey }) {
  const section = workerSectionConfig[sectionKey];
  const tasks =
    sectionKey === "payment_history" ? [] : getWorkerTasksBySection(sectionKey);

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{section.title}</h2>
            <p className="text">{section.description}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-end mb20">
              <Link href="/worker-dashboard" className="ud-btn btn-light-default">
                Back to Dashboard
              </Link>
            </div>

            {sectionKey === "payment_history" ? (
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
            ) : (
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Task</th>
                      <th scope="col">Client</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Deadline</th>
                      <th scope="col">Skills</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.client}</td>
                        <td>{task.budget}</td>
                        <td>{task.deadline}</td>
                        <td>{task.skills.join(", ")}</td>
                      </tr>
                    ))}
                    {tasks.length === 0 && (
                      <tr>
                        <td colSpan={5}>No tasks found for this section.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

