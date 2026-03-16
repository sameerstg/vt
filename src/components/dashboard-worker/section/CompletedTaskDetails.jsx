"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { workerTasks } from "@/data/workerTasks";

export default function CompletedTaskDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD

  // URL se taskId aur title lein
  const taskId = searchParams.get('taskId');
  const taskTitle = searchParams.get('title') || 'Task Details';

  // Task ID ko number mein convert karein
  const taskIdNum = parseInt(taskId);

=======
  
  // URL se taskId aur title lein
  const taskId = searchParams.get('taskId');
  const taskTitle = searchParams.get('title') || 'Task Details';
  
  // Task ID ko number mein convert karein
  const taskIdNum = parseInt(taskId);
  
>>>>>>> b2f4255c9895284eb7ef42cda174c4c5f7e60dee
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
              <Link href="/worker-dashboard/tasks?tab=completed" className="ud-btn btn-thm">
                Back to Completed Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Agar task completed nahi hai
  if (task.status !== "completed") {
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
              <p className="text mb20">This task is not in your completed tasks.</p>
              <Link href="/worker-dashboard/tasks?tab=completed" className="ud-btn btn-thm">
                Back to Completed Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h2>Completed Task Details</h2>
<<<<<<< HEAD
=======
            <p className="text">Review your completed task history and details.</p>
>>>>>>> b2f4255c9895284eb7ef42cda174c4c5f7e60dee
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
<<<<<<< HEAD

=======
            
>>>>>>> b2f4255c9895284eb7ef42cda174c4c5f7e60dee
            {/* Top Navigation */}
            <div className="d-flex justify-content-between align-items-center mb30">
              <div>
                <h4 className="mb0">{task.title}</h4>
                <p className="text-muted mb0 mt5">Task ID: #{task.id}</p>
              </div>
              <Link href="/worker-dashboard/tasks?tab=completed" className="ud-btn btn-light-default">
                ← Back to List
              </Link>
            </div>

            {/* Status Badge */}
            <div className="mb30">
              <span className="badge bg-success text-white px-3 py-2">
                Status: Completed
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
                  <p className="mb8 text-muted">Budget Earned</p>
                  <p className="mb0 fw600 text-success">{task.budget}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Completed On</p>
                  <p className="mb0 fw600">{task.deadline || new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs8 p20">
                  <p className="mb8 text-muted">Skills Utilized</p>
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
<<<<<<< HEAD
                    This task involved {task.title.toLowerCase()} for {task.client}.
=======
                    This task involved {task.title.toLowerCase()} for {task.client}. 
>>>>>>> b2f4255c9895284eb7ef42cda174c4c5f7e60dee
                    Successfully completed utilizing: {task.skills.join(', ')}.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="bdr1 bdrs8 p20">
                  <h5 className="mb15">Completion Info</h5>
                  <p className="mb8"><strong>Status:</strong> Approved and Paid</p>
                  <p className="mb8"><strong>Client Feedback:</strong> Pending Rating</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt30">
              {/* <button onClick={handleContactClient} className="ud-btn btn-light-default">
                Message Client
              </button> */}
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
