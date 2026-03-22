"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";
import SubmitOfferModal from "../modal/SubmitOfferModal";

const statusConfig = {
  POSTED: { label: "Open", class: "badge-new" },
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
};

export default function BrowseProjectsInfo() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, [currentPage, categoryFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/worker/projects?type=available");
      const data = await res.json();
      if (data.success) {
        let filtered = data.data.available;
        if (searchTerm) {
          filtered = filtered.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        if (categoryFilter) {
          filtered = filtered.filter(p => p.category === categoryFilter);
        }
        setTotalProjects(filtered.length);
        const start = (currentPage - 1) * itemsPerPage;
        setProjects(filtered.slice(start, start + itemsPerPage));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleOpenOffer = (project) => {
    setSelectedProject(project);
    setShowOfferModal(true);
  };

  const categories = [...new Set(projects.map(p => p.category))];

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Browse Projects</h2>
              <p className="text">Find and apply for available projects</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="row mb30">
                <div className="col-md-6">
                  <div className="search_area">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span><i className="flaticon-search" /></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Design">Design</option>
                    <option value="Writing">Writing</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Moving">Moving</option>
                    <option value="Gardening">Gardening</option>
                    <option value="Photography">Photography</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Software Development">Software Development</option>
                  </select>
                </div>
              </div>

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
                  <p className="text-muted">Check back later for new opportunities</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Category</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <div className="d-flex align-items-start">
                              <div className="flex-grow-1">
                                <h5 className="title mb5">
                                  <Link
                                    href={`/worker/project/${project.id}`}
                                    className="text-dark text-decoration-none hover-text-primary"
                                  >
                                    {project.title}
                                  </Link>
                                </h5>
                                <p className="fz14 text-muted mb0">
                                  {project.description.substring(0, 100)}
                                  {project.description.length > 100 ? "..." : ""}
                                </p>
                                <div className="d-flex gap-3 mt10">
                                  <span className="fz14">
                                    <i className={`${project.type === "PHYSICAL" ? "flaticon-place" : "flaticon-web"} fz16 vam text-thm2 me-1`} />
                                    {project.type === "PHYSICAL" ? "Physical" : "Virtual"}
                                  </span>
                                  <span className="fz14">
                                    <i className="flaticon-calendar fz16 vam text-thm2 me-1" />
                                    {new Date(project.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="vam">
                            <span className="fz15">{project.category}</span>
                          </td>
                          <td className="vam">
                            <span className="text-thm fw500">${project.budget.toLocaleString()}</span>
                            <span className="fz14 text-muted d-block">
                              {project.budgetModel === "MILESTONE" ? "Milestone-based" : "Fixed Price"}
                            </span>
                          </td>
                          <td className="vam">
                            <div className="d-flex gap-2">
                              <Link
                                href={`/worker/project/${project.id}`}
                                className="ud-btn btn-thm2 bdrs4"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => handleOpenOffer(project)}
                                className="ud-btn btn-dark bdrs4"
                              >
                                Submit Offer
                              </button>
                            </div>
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

      {showOfferModal && selectedProject && (
        <SubmitOfferModal
          project={selectedProject}
          onClose={() => {
            setShowOfferModal(false);
            setSelectedProject(null);
          }}
          onSuccess={() => {
            setShowOfferModal(false);
            setSelectedProject(null);
            fetchProjects();
          }}
        />
      )}
    </>
  );
}
