// components/dashboard-worker/section/AppliedTaskDetails.jsx
"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { workerTasks } from "@/data/workerTasks";

export default function AppliedTaskDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL se taskId aur title lein
  const taskId = searchParams.get('taskId');
  const taskTitle = searchParams.get('title') || 'Task Details';

  // Task ID ko number mein convert karein
  const taskIdNum = parseInt(taskId);

  // Task find karein
  const task = useMemo(() => {
    if (isNaN(taskIdNum)) return null;
    return workerTasks.find(t => t.id === taskIdNum);
  }, [taskIdNum]);

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
              <Link href="/worker-dashboard/tasks?tab=applied" className="ud-btn btn-thm">
                Back to Applied Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agar task applied nahi hai
  if (task.status !== "applied") {
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
              <h4>Invalid Task</h4>
              <p className="text mb20">This task is not in your applied tasks.</p>
              <Link href="/worker-dashboard/tasks?tab=applied" className="ud-btn btn-thm">
                Back to Applied Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleWithdrawApplication = () => {
    if (confirm('Are you sure you want to withdraw your application?')) {
      alert('Application withdrawn successfully');
      router.push('/worker-dashboard/tasks?tab=applied');
    }
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
            <h2>Applied Task Details</h2>
            <p className="text">Complete information about your applied task.</p>
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
              <Link href="/worker-dashboard/tasks?tab=applied" className="ud-btn btn-light-default">
                ← Back to List
              </Link>
            </div>

            {/* Status Badge */}
            <div className="mb30">
              <span className="badge bg-warning text-dark px-3 py-2">
                Status: Applied
              </span>
            </div>

            {/* Task Summary Cards */}
            <div className="row g-4 mb30">
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Client</p>
                  <p className="mb0 fw600">{task.client}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Budget</p>
                  <p className="mb0 fw600 text-success">{task.budget}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Deadline</p>
                  <p className="mb0 fw600">{task.deadline}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Skills</p>
                  <p className="mb0 fw600">{task.skills.join(", ")}</p>
                </div>
              </div>
            </div>

            {/* More Details Section */}
            <div className="row g-4 mb30">
              <div className="col-md-6">
                <div className="bdr1 bdrs8 p20">
                  <h5 className="mb15">Task Description</h5>
                  <p className="mb0">
                    This task involves {task.title.toLowerCase()} for {task.client}.
                    Required skills: {task.skills.join(', ')}.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bdr1 bdrs8 p20">
                  <h5 className="mb15">Application Info</h5>
                  <p className="mb8"><strong>Applied on:</strong> {new Date().toLocaleDateString()}</p>
                  <p className="mb8"><strong>Proposal status:</strong> Pending review</p>
                  <p className="mb0"><strong>Eligibility:</strong> {task.isEligible ? 'Eligible ✓' : 'Not eligible ✗'}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt30">
              {/* <button onClick={handleWithdrawApplication} className="ud-btn btn-light-default">
                Withdraw Application
              </button>
              <button onClick={handleContactClient} className="ud-btn btn-thm">
                Contact Client
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .badge.bg-warning {
          background-color: #ffc107 !important;
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