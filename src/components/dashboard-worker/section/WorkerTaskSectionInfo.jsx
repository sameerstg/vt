 "use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  getWorkerTasksBySection,
  paymentHistory,
  workerSectionConfig,
} from "@/data/workerTasks";

export default function WorkerTaskSectionInfo({ sectionKey }) {
  const [currentPage, setCurrentPage] = useState(1);
  const section = workerSectionConfig[sectionKey];
  const tasks =
    sectionKey === "payment_history" ? [] : getWorkerTasksBySection(sectionKey);
  const paymentsPerPage = 2;
  const totalPaymentPages = Math.max(1, Math.ceil(paymentHistory.length / paymentsPerPage));
  const paginatedPaymentHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * paymentsPerPage;
    return paymentHistory.slice(startIndex, startIndex + paymentsPerPage);
  }, [currentPage]);
  const assignedTask = sectionKey === "assigned" ? tasks[0] : null;
  const assignedMilestones = [
    { id: 1, title: "Initial setup and template check", due: "Mar 11, 2026", status: "Completed" },
    { id: 2, title: "Implement responsive email blocks", due: "Mar 12, 2026", status: "In Progress" },
    { id: 3, title: "Final QA and handoff package", due: "Mar 13, 2026", status: "Pending" },
  ];
  const messageThread = [
    { id: 1, sender: "Client", text: "Please ensure Outlook compatibility is covered." },
    { id: 2, sender: "You", text: "Done. I will include fallback styles and test notes." },
    { id: 3, sender: "Client", text: "Great, share first draft before final submission." },
  ];

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
            {/* <div className="d-flex justify-content-end mb20">
              <Link href="/worker-dashboard" className="ud-btn btn-light-default">
                Back to Dashboard
              </Link>
            </div> */}

            {sectionKey === "assigned" ? (
              <>
                {!assignedTask ? (
                  <p className="mb0">No assigned task found.</p>
                ) : (
                  <div className="row g-4">
                    <div className="col-xl-6">
                      <div className="bdr1 bdrs8 p20 h-100">
                        <h5 className="mb15">Task Details</h5>
                        <p className="mb8"><span className="fw500">Task:</span> {assignedTask.title}</p>
                        <p className="mb8"><span className="fw500">Client:</span> {assignedTask.client}</p>
                        <p className="mb8"><span className="fw500">Budget:</span> {assignedTask.budget}</p>
                        <p className="mb8"><span className="fw500">Deadline:</span> {assignedTask.deadline}</p>
                        <p className="mb0"><span className="fw500">Skills:</span> {assignedTask.skills.join(", ")}</p>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="bdr1 bdrs8 p20 h-100">
                        <h5 className="mb15">Status Indicator</h5>
                        <span className="badge bg-warning text-dark px-3 py-2">Assigned - Active</span>
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="bdr1 bdrs8 p20">
                        <h5 className="mb15">Milestones</h5>
                        <div className="packages_table table-responsive">
                          <table className="table-style3 table at-savesearch">
                            <thead className="t-head">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Milestone</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Status</th>
                              </tr>
                            </thead>
                            <tbody className="t-body">
                              {assignedMilestones.map((milestone) => (
                                <tr key={milestone.id}>
                                  <td>{milestone.id}</td>
                                  <td>{milestone.title}</td>
                                  <td>{milestone.due}</td>
                                  <td>{milestone.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12">
                      <div className="bdr1 bdrs8 p20">
                        <h5 className="mb15">Messaging Thread</h5>
                        <ul className="list-unstyled mb20">
                          {messageThread.map((message) => (
                            <li key={message.id} className="mb10">
                              <span className="fw500">{message.sender}:</span> {message.text}
                            </li>
                          ))}
                        </ul>
                        <Link href="/worker-dashboard/manage-projects" className="ud-btn btn-thm">
                          Submit Work
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : sectionKey === "payment_history" ? (
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Task</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Method</th>
                      <th scope="col">Status</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paginatedPaymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.date}</td>
                        <td>{payment.task}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.method}</td>
                        <td>{payment.status}</td>
                        <td>
                          <Link
                            href="/worker-dashboard/invoice-details"
                            className="ud-btn btn-thm"
                            style={{ padding: "5px 15px", fontSize: "12px" }}
                          >
                            Details<i className="fal fa-arrow-right-long ms-1" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="worker-pagination mt30">
                  <button
                    type="button"
                    className="worker-pagination__nav"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPaymentPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`worker-pagination__page ${currentPage === page ? "is-active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="worker-pagination__nav"
                    onClick={() => setCurrentPage((page) => Math.min(totalPaymentPages, page + 1))}
                    disabled={currentPage === totalPaymentPages}
                  >
                    Next
                  </button>
                </div>
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
      <style jsx>{`
        .worker-pagination {
          display: flex;
          align-items: center;
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
          color: #334155;
          font-weight: 600;
          padding: 0 14px;
        }

        .worker-pagination__page.is-active {
          border-color: #5b2dff;
          background: #f4f0ff;
          color: #5b2dff;
        }

        .worker-pagination__page:disabled,
        .worker-pagination__nav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
