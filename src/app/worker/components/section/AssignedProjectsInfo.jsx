"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";

const statusConfig = {
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
};

const milestoneStatusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  APPROVED: { label: "Approved", class: "badge-completed" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute" },
};

export default function AssignedProjectsInfo() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/worker/projects?type=assigned");
      const data = await res.json();
      if (data.success) {
        setTotalProjects(data.data.assigned.length);
        const start = (currentPage - 1) * itemsPerPage;
        setProjects(data.data.assigned.slice(start, start + itemsPerPage));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = async (projectId) => {
    try {
      const res = await fetch(`/api/worker/milestones?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        setMilestones(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    fetchMilestones(project.id);
  };

  const handleUpdateMilestone = async (milestoneId, action) => {
    try {
      const res = await fetch("/api/worker/milestones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ milestoneId, action }),
      });
      const data = await res.json();
      if (data.success) {
        fetchMilestones(selectedProject.id);
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>My Projects</h2>
              <p className="text">Track your assigned projects and milestones</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              {loading ? (
                <div className="text-center p50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center p50">
                  <i className="flaticon-folder fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">No assigned projects</h5>
                  <p className="text-muted">Browse projects and submit offers to get started</p>
                  <Link href="/worker/browse-projects" className="ud-btn btn-thm mt20">
                    Browse Projects
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Category</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <h5 className="title mb5">
                              <Link
                                href={`/worker/project/${project.id}`}
                                className="text-dark text-decoration-none hover-text-primary"
                              >
                                {project.title}
                              </Link>
                            </h5>
                            <span className="fz14 text-muted">
                              Client Budget: <span className="text-thm fw500">${project.budget.toLocaleString()}</span>
                            </span>
                          </td>
                          <td className="vam">
                            <span className="fz15">{project.category}</span>
                          </td>
                          <td className="vam">
                            <span className={`badge ${statusConfig[project.status]?.class}`}>
                              {statusConfig[project.status]?.label}
                            </span>
                          </td>
                          <td className="vam">
                            <button
                              onClick={() => handleViewDetails(project)}
                              className="ud-btn btn-thm2 bdrs4"
                              data-bs-toggle="modal"
                              data-bs-target="#milestoneModal"
                            >
                              View Milestones
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">
                    <Pagination1
                      currentPage={currentPage}
                      totalItems={totalProjects}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="milestoneModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {selectedProject?.title} - Milestones
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              {milestones.length === 0 ? (
                <div className="text-center p30">
                  <i className="flaticon-folder fz40 text-muted mb15 d-block" />
                  <p className="text-muted">No milestones defined for this project</p>
                </div>
              ) : (
                <div className="milestone-list">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="milestone-item mb20 p20 bdrs4 bgc-white">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <span className="badge mb10" style={{ background: "#e0e7ff", color: "#3730a3" }}>
                            Milestone {index + 1}
                          </span>
                          <h5 className="title mb5">{milestone.title}</h5>
                          {milestone.description && (
                            <p className="text-muted fz14 mb10">{milestone.description}</p>
                          )}
                          <div className="d-flex gap-3 fz14">
                            <span className={`badge ${milestoneStatusConfig[milestone.status]?.class}`}>
                              {milestoneStatusConfig[milestone.status]?.label}
                            </span>
                            <span className="text-thm fw500">${milestone.amount.toLocaleString()}</span>
                            {milestone.dueDate && (
                              <span className="text-muted">
                                <i className="flaticon-calendar fz14 me-1" />
                                Due: {new Date(milestone.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="d-flex gap-2">
                          {milestone.status === "PENDING" && (
                            <button
                              onClick={() => handleUpdateMilestone(milestone.id, "start")}
                              className="ud-btn btn-thm bdrs4"
                            >
                              Start
                            </button>
                          )}
                          {milestone.status === "IN_PROGRESS" && (
                            <button
                              onClick={() => handleUpdateMilestone(milestone.id, "submit")}
                              className="ud-btn btn-thm bdrs4"
                            >
                              Submit
                            </button>
                          )}
                          {milestone.status === "SUBMITTED" && (
                            <span className="badge badge-submitted p10">
                              Awaiting Review
                            </span>
                          )}
                          {milestone.status === "APPROVED" && (
                            <span className="badge badge-completed p10">
                              <i className="flaticon-check fz14 me-1" />
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
