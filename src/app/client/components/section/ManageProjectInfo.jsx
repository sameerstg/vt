"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState, useEffect } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ProjectCard from "../card/ProjectCard";

const tabs = [
  { label: "Posted Projects", status: "POSTED" },
  { label: "Ongoing Projects", status: "IN_PROGRESS" },
  { label: "For Review", status: "SUBMITTED" },
  { label: "Completed Projects", status: "COMPLETED" },
  { label: "In Dispute", status: "IN_DISPUTE" },
];

export default function ManageProjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewProject, setReviewProject] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
    fetchProjects();
  }, [selectedTab]);

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const status = tabs[selectedTab].status;
      const res = await fetch(`/api/client/projects?status=${status}`);
      const data = await res.json();
      if (data.success) {
        const allProjects = data.data;
        setTotalProjects(allProjects.length);
        const start = (currentPage - 1) * itemsPerPage;
        const paginatedProjects = allProjects.slice(start, start + itemsPerPage);
        setProjects(paginatedProjects);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = async (action) => {
    if (!reviewProject) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/client/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: reviewProject.id, action }),
      });
      const data = await res.json();
      if (data.success) {
        setReviewProject(null);
        fetchProjects();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      {reviewProject && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setReviewProject(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review Submission</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setReviewProject(null)}
                />
              </div>
              <div className="modal-body px30 py20">
                <h6 className="fz16 fw600 mb5">{reviewProject.title}</h6>
                <p className="text fz13 mb20 text-muted">
                  Submitted {reviewProject.submittedAt ? new Date(reviewProject.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                  {reviewProject.workerId && <span className="ms-2">· Worker: {reviewProject.workerId}</span>}
                </p>

                <div className="mb20">
                  <p className="fz13 fw600 mb5 text-dark">Submission Notes</p>
                  <div className="bdrs4 p15" style={{ background: "#f8f9fa", border: "1px solid #e9ecef" }}>
                    <p className="mb-0 fz14" style={{ lineHeight: 1.6 }}>
                      {reviewProject.submissionDescription || "No description provided."}
                    </p>
                  </div>
                </div>

                {reviewProject.submissionFileName && (
                  <div className="mb20">
                    <p className="fz13 fw600 mb5 text-dark">Attachment</p>
                    <div className="d-flex align-items-center gap-2 bdrs4 p15" style={{ background: "#f8f9fa", border: "1px solid #e9ecef" }}>
                      <i className="flaticon-file fz20 text-thm2" />
                      <span className="fz14">{reviewProject.submissionFileName}</span>
                      <a href="#" className="ms-auto fz13 text-thm">
                        <i className="fal fa-download me-1" />Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="ud-btn btn-thm"
                  onClick={() => handleReviewAction("approve")}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Approve"}
                  <i className="fal fa-check ms-2" />
                </button>
                <button
                  className="ud-btn btn-dark"
                  onClick={() => handleReviewAction("dispute")}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Processing..." : "Put in Dispute"}
                  <i className="fal fa-exclamation-triangle ms-2" />
                </button>
                <button
                  className="ud-btn btn-white2"
                  onClick={() => setReviewProject(null)}
                  disabled={actionLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Project</h2>
              <p className="text">View and manage your posted projects</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/client/create-projects"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Create Project
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${selectedTab === i ? "active" : ""}`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </nav>

                {loading ? (
                  <div className="text-center p50">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center p50">
                    <i className="flaticon-folder fz60 text-muted mb20 d-block" />
                    <h5 className="text-muted">No projects found</h5>
                    <Link href="/client/create-projects" className="ud-btn btn-thm mt20">
                      Create Your First Project
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                ) : (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">Status/Budget</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {projects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onReview={tabs[selectedTab].status === "SUBMITTED" ? () => setReviewProject(project) : undefined}
                          />
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
      </div>
    </>
  );
}
