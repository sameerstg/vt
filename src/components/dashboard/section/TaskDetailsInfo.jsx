"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getMockTaskById } from "@/utils/auth/mockAuth";
import ClientSectionLayout from "./ClientSectionLayout";

export default function TaskDetailsInfo() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      if (taskId) {
        const data = await getMockTaskById(taskId);
        setTask(data);
      }
      setLoading(false);
    }
    loadTask();
  }, [taskId]);

  const taskStatus = task?.status || "In Progress";
  const isAssigned = false; // logic for assigned worker can be added later
  const showDisputeButton = ["In Progress", "Completed", "Disputed"].includes(taskStatus);

  if (loading) {
    return (
      <ClientSectionLayout title="Task Details" description="Loading task details...">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
          <p className="text mb-0">Loading...</p>
        </div>
      </ClientSectionLayout>
    );
  }

  if (!task) {
    return (
      <ClientSectionLayout title="Task Details" description="Task not found.">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
          <p className="text mb-0">The requested task could not be found.</p>
        </div>
      </ClientSectionLayout>
    );
  }

  return (
    <ClientSectionLayout
      title="Task Details"
      description="View task and manage lifecycle."
    >
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            {/* Top Navigation */}
            <div className="d-flex justify-content-between align-items-center mb30">
              <div>
                <h4 className="mb0">{task.title}</h4>
                <p className="text-muted mb0 mt5">Task ID: #{task.id}</p>
              </div>
              <Link href="/dashboard/active-tasks" className="ud-btn btn-light-default">
                ← Back to List
              </Link>
            </div>

            {/* Status Badge */}
            <div className="mb30">
              <span className="badge bg-success text-white px-3 py-2" style={{ backgroundColor: "#28a745" }}>
                Status: {taskStatus}
              </span>
            </div>

            {/* Task Summary Cards */}
            <div className="row g-4 mb30">
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Category</p>
                  <p className="mb0 fw600">{task.category || "General"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Budget</p>
                  <p className="mb0 fw600 text-success" style={{ color: "#28a745" }}>{task.budget || "$0"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Deadline</p>
                  <p className="mb0 fw600">{task.deadline || "TBD"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Delivery Model</p>
                  <p className="mb0 fw600">{task.taskType || "Standard"}</p>
                </div>
              </div>
            </div>

            {/* More Details Section */}
            <div className="row g-4 mb30">
              <div className="col-md-12">
                <div className="bdr1 bdrs8 p20 mb30">
                  <h5 className="mb15">Project Overview</h5>
                  <p className="mb15">
                    {task.description || "No description provided for this task."}
                  </p>
                  <p className="mb15">
                    <strong>Work Mode:</strong> {task.workMode || "Virtual"}
                  </p>
                  <p className="mb0">
                    <strong>Budget Model:</strong> {task.budgetModel}
                  </p>
                </div>

                <div className="bdr1 bdrs8 p20 mb30">
                  <h5 className="mb15">Key Responsibilities & Deliverables</h5>
                  <ul className="list-style-type-bullet ps-3">
                    <li className="mb10">Develop and implement features according to technical specifications.</li>
                    <li className="mb10">Conduct unit testing and ensure performance optimization of all deliverables.</li>
                    <li className="mb10">Maintain clear code comments and provide thorough project documentation.</li>
                    {(task.milestones && task.milestones.length > 0) ? (
                      <li className="mb0">Complete {task.milestones.length} defined milestones within given timelines.</li>
                    ) : (
                      <li className="mb0">Deliver a finalized, ready-to-deploy package by the project deadline.</li>
                    )}
                  </ul>
                </div>

                <div className="row g-4 mb30">
                  <div className="col-md-6">
                    <div className="bdr1 bdrs8 p20 h-100">
                      <h5 className="mb15">Skills Required</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {task.skills && task.skills.map(skill => (
                          <span key={skill} className="badge bgc-thm4 text-dark px-3 py-2">{skill}</span>
                        ))}
                        {(!task.skills || task.skills.length === 0) && <p className="text mb0">No specific skills listed.</p>}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bdr1 bdrs8 p20 h-100">
                      <h5 className="mb15">About the Client</h5>
                      <div className="d-flex align-items-center mb15">
                        <div className="client-avatar me-3 bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                          <i className="fal fa-user-tie text-primary" />
                        </div>
                        <div>
                          <p className="mb0 fw600">VT Verified Client</p>
                          <p className="mb0 text-muted small">ID: #{task.clientId || "USR-2026"}</p>
                        </div>
                      </div>
                      <p className="mb10"><strong>Rating:</strong> 4.9/5 (Demo Account)</p>
                      <p className="mb10"><strong>Project Success:</strong> 100%</p>
                      <p className="mb0"><strong>Payment Status:</strong> Fully Verified ✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {showDisputeButton && (
              <div className="d-flex justify-content-end gap-3 mt30">
                <button className="ud-btn btn-light-default">
                  Raise Dispute
                </button>
                <button className="ud-btn btn-thm">
                  Manage Task<i className="fal fa-arrow-right-long ms-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {task.milestones && task.milestones.length > 0 && (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="bdrb1 pb15 mb20">
            <h5 className="title mb-0">Milestones</h5>
          </div>
          <div className="packages_table table-responsive">
            <table className="table-style3 table at-savesearch align-middle mb-0">
              <thead className="t-head">
                <tr>
                  <th scope="col">Milestone</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody className="t-body">
                {task.milestones.map((item, idx) => (
                  <tr key={idx} className="task-row-hover">
                    <td className="fw500">{item.title}</td>
                    <td>${item.amount}</td>
                    <td>
                      <span className="badge bgc-thm4 text-dark fz12 py-1 px-2">Scheduled</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .text-muted {
          color: #6c757d !important;
        }
        :global(.task-row-hover:hover td) {
          background-color: #f5f7ff;
        }
        :global(.task-row-hover:hover td:first-child) {
          color: #5b2eff;
          font-weight: 600;
        }
      `}</style>
    </ClientSectionLayout>
  );
}
