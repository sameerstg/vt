"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import { getTaskById, getAuthSession } from "@/utils/auth/mockAuth";

const getStatusBadge = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("progress")) return "style6";
  if (s.includes("completed")) return "style4";
  if (s.includes("submitted")) return "style1";
  return "style5";
};

export default function TaskDetailsInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [task, setTask] = useState(null);

  useEffect(() => {
    if (!taskId) return;
    const found = getTaskById(taskId);
    setTask(found);
  }, [taskId]);

  const handleApply = () => {
    if (!task) return;
    const query = new URLSearchParams({
      taskId: task.id,
      taskTitle: task.title,
      clientId: task.clientId || "",
      milestones: JSON.stringify(task.milestones || []),
    });
    router.push(`/contractor-dashboard/manage-projects?${query.toString()}`);
  };

  if (!taskId) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12"><DashboardNavigation /></div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>No task selected</h4>
              <p className="text mb20">Browse projects and click Details to view a task.</p>
              <button onClick={() => router.push("/contractor-dashboard/manage-jobs")} className="ud-btn btn-thm">
                Browse Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12"><DashboardNavigation /></div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <h4>Task not found</h4>
              <button onClick={() => router.push("/contractor-dashboard/manage-jobs")} className="ud-btn btn-light-default">
                ← Back to Browse
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const milestones = task.milestones || [];

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-8">
          <div className="dashboard_title_area">
            <h2>Task Details</h2>
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
          <button onClick={() => router.push("/contractor-dashboard/manage-jobs")} className="ud-btn btn-light-default me-2">
            ← Back to Browse
          </button>
          <button onClick={handleApply} className="ud-btn btn-thm">
            Apply for Project <i className="fal fa-arrow-right-long ms-1" />
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-8">
          {/* Task Info */}
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-start bdrb1 pb20 mb20">
              <div>
                <h4 className="mb5">{task.title}</h4>
                <p className="text mb0 fz14">
                  Client: <strong>{task.clientName || task.client || "Client"}</strong>
                  {task.clientEmail && <span className="ms-2 text-muted fz13">{task.clientEmail}</span>}
                </p>
              </div>
              <span className={`pending-style ${getStatusBadge(task.status)}`}>{task.status || "Available"}</span>
            </div>

            <div className="row g-3 mb20">
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Budget</p>
                <p className="mb0 fw600">{task.budget || "—"}</p>
              </div>
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Timeline</p>
                <p className="mb0 fw600">{task.deadline || "—"}</p>
              </div>
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Category</p>
                <p className="mb0 fw600">{task.category || "—"}</p>
              </div>
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Budget Model</p>
                <p className="mb0 fw600">{task.budgetModel || "Fixed"}</p>
              </div>
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Work Mode</p>
                <p className="mb0 fw600">{task.workMode || "Virtual"}</p>
              </div>
              <div className="col-sm-6 col-md-4">
                <p className="mb5 text fz13 text-muted">Location</p>
                <p className="mb0 fw600">{task.location || "Remote"}</p>
              </div>
            </div>

            {task.description && (
              <div className="bdrt1 pt20">
                <h6 className="mb10">Description</h6>
                <p className="text mb0">{task.description}</p>
              </div>
            )}
          </div>

          {/* Milestones */}
          {milestones.length > 0 && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="title bdrb1 pb15 mb20">Milestones ({milestones.length})</h5>
              {milestones.map((m, idx) => (
                <div key={m.id || idx} className="milestone-item">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb5 fw600">#{idx + 1} {m.title}</p>
                      <p className="mb0 text fz13 text-muted">Due: {m.deadline || "—"}</p>
                    </div>
                    <p className="mb0 fw600 text-success">${m.price || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-xxl-4">
          {/* Skills */}
          {(task.skills || []).length > 0 && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <h6 className="bdrb1 pb15 mb15">Required Skills</h6>
              <div className="d-flex flex-wrap gap-2">
                {task.skills.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Apply CTA */}
          <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
            <h6 className="mb15">Ready to apply?</h6>
            <p className="text fz13 mb20">Submit a proposal with your total bid and timeline.</p>
            <button onClick={handleApply} className="ud-btn btn-thm w-100">
              Apply for Project <i className="fal fa-arrow-right-long ms-1" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .milestone-item {
          border: 1px solid #e7ebf5;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .skill-badge {
          background: #f4f0ff;
          color: #5b2dff;
          border: 1px solid #dfd3ff;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
