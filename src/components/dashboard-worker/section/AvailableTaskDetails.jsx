"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { workerTasks } from "@/data/workerTasks";
import { taskDiscoveryItems } from "@/data/taskDiscovery";
import { getAllClientTasks } from "@/utils/auth/mockAuth";

export default function AvailableTaskDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const taskId = searchParams.get('taskId');

  const task = useMemo(() => {
    if (!taskId) return null;
    return (
      taskDiscoveryItems.find(t => String(t.id) === String(taskId)) ||
      workerTasks.find(t => String(t.id) === String(taskId)) ||
      getAllClientTasks().find(t => String(t.id) === String(taskId)) ||
      null
    );
  }, [taskId]);

  // Agar task nahi mila ya taskId nahi hai
  if (!taskId || !task) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>Task not found</h4>
              <p className="text mb20">No task selected or task not found.</p>
              <Link href="/worker-dashboard/available-tasks" className="ud-btn btn-thm">
                Back to Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleApplyNow = () => {
    router.push(`/worker-dashboard/proposal-submission?taskId=${task.id}&taskTitle=${encodeURIComponent(task.title)}&clientId=${task.clientId || ""}`);
  };

  const handleContactClient = () => {
    router.push(`/messages?client=${encodeURIComponent(task.client)}&task=${encodeURIComponent(task.title)}`);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* HEADER */}
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Available Task Details</h2>
            <p className="text">Explore this opportunity and apply.</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">

            {/* Top Navigation */}
            <div className="d-flex justify-content-between align-items-center mb30">
              <div>
                <h4 className="mb0">{task.title}</h4>
                <p className="text-muted mb0 mt5">Task ID: #{task.id}</p>
              </div>
              <Link href="/worker-dashboard/available-tasks" className="ud-btn btn-light-default">
                ← Back to List
              </Link>
            </div>

            {/* Status Badge */}
            <div className="mb30">
              <span className="badge bg-success text-white px-3 py-2">
                Status: Available
              </span>
            </div>

            {/* Task Summary Cards */}
            <div className="row g-4 mb30">
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Client</p>
                  <p className="mb0 fw600">{task.client || "VT Verified Client"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Budget</p>
                  <p className="mb0 fw600 text-success">{task.budget || "$500"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Deadline</p>
                  <p className="mb0 fw600">{task.deadline || "Mar 25, 2026"}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Skills</p>
                  <p className="mb0 fw600">{(task.skills && task.skills.length > 0) ? task.skills.join(", ") : (task.category || "General Tech")}</p>
                </div>
              </div>
            </div>

            {/* More Details Section */}
            <div className="row g-4 mb30">
              <div className="col-md-12">
                <div className="bdr1 bdrs8 p20 mb30">
                  <h5 className="mb15">Project Overview</h5>
                  <p className="mb15">
                    This project for {task.client || "a premium VT client"} involves {task.title.toLowerCase()} with a focus on quality and efficiency. 
                    The successful candidate will be responsible for the end-to-end execution of the assigned modules.
                  </p>
                  <p className="mb15">
                    <strong>Scope:</strong> The scope covers initial requirement gathering, design implementation, testing, and final deployment support. 
                    {(task.skills && task.skills.length > 0) ? `Expertise in ${task.skills.join(', ')} is highly preferred.` : `Broad experience in ${task.category || "this domain"} is expected.`}
                  </p>
                  <p className="mb0">
                    We expect a professional approach with clear documentation and adherence to milestones. 
                    The total project duration is estimated to be 4-6 weeks with regular check-ins.
                  </p>
                </div>

                <div className="bdr1 bdrs8 p20 mb30">
                  <h5 className="mb15">Key Responsibilities & Deliverables</h5>
                  <ul className="list-style-type-bullet ps-3">
                    <li className="mb10">Develop and implement features according to technical specifications.</li>
                    <li className="mb10">Conduct unit testing and ensure performance optimization of all deliverables.</li>
                    <li className="mb10">Maintain clear code comments and provide thorough project documentation.</li>
                    <li className="mb10">Participate in weekly status meetings and incorporate feedback from the review team.</li>
                    <li className="mb0">Deliver a finalized, ready-to-deploy package by the project deadline.</li>
                  </ul>
                </div>

                <div className="row g-4 mb30">
                  <div className="col-md-6">
                    <div className="bdr1 bdrs8 p20 h-100">
                      <h5 className="mb15">Task Requirements</h5>
                      <ul className="list-style-type-check ps-0" style={{ listStyle: "none" }}>
                        <li className="mb10">✓ 3+ years of experience in {task.category || "relevant tech stack"}</li>
                        <li className="mb10">✓ Strong portfolio demonstrating similar successful projects</li>
                        <li className="mb10">✓ Excellent English communication skills (written & verbal)</li>
                        <li className="mb10">✓ Ability to work within a fast-paced, milestone-driven environment</li>
                        <li className="mb0">✓ High attention to detail and commitment to quality</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bdr1 bdrs8 p20 h-100">
                      <h5 className="mb15">About the Client</h5>
                      <div className="d-flex align-items-center mb15">
                        <div className="client-avatar me-3 bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                          <i className="fal fa-building text-primary" />
                        </div>
                        <div>
                          <p className="mb0 fw600">{task.client || task.category + " Digital"}</p>
                          <p className="mb0 text-muted small">Verified Enterprise Client</p>
                        </div>
                      </div>
                      <p className="mb10"><strong>Rating:</strong> 4.9/5 (120+ reviews)</p>
                      <p className="mb10"><strong>Project Success:</strong> 98%</p>
                      <p className="mb10"><strong>Avg. Response Time:</strong> &lt; 2 hours</p>
                      <p className="mb0"><strong>Payment Status:</strong> Fully Verified ✓</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Notice */}
                <div className="bg-light-blue bdrs8 p20 mb30">
                  <div className="d-flex align-items-start gap-3">
                    <i className="fal fa-info-circle text-primary mt-1" />
                    <div>
                      <h6 className="mb5">Eligibility Note</h6>
                      <p className="mb0 text-sm">
                        {task.isEligible === false 
                          ? "Note: You currently don't meet all the requirements for this task, but you can still submit a proposal for manual review."
                          : "You are eligible to apply for this task. Your profile matches the required skill set for this project."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt30">
              {/* <button onClick={handleContactClient} className="ud-btn btn-light-default">
                Contact Client
              </button> */}
              <button 
                onClick={handleApplyNow} 
                className="ud-btn btn-thm"
              >
                Apply Now<i className="fal fa-arrow-right-long ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .badge.bg-success {
          background-color: #28a745 !important;
        }
        .text-muted {
          color: #6c757d !important;
        }
        .text-success {
          color: #28a745 !important;
        }
      `}</style>
    </div>
  );
}
