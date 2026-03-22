"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";

const tabs = [
  { label: "Assigned", status: "ASSIGNED" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "In Review", status: "SUBMITTED" },
  { label: "Completed", status: "COMPLETED" },
];

const statusConfig = {
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "In Review", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
};

export default function ContractorAssignedProjectsInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
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
      const res = await fetch("/api/contractor?type=assigned");
      const data = await res.json();
      if (data.success) {
        const filtered = data.data.assignedProjects.filter(p => p.status === tabs[selectedTab].status);
        setAllProjects(filtered);
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
    const start = (currentPage - 1) * itemsPerPage;
    setProjects(allProjects.slice(start, start + itemsPerPage));
  }, [currentPage, allProjects]);

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
              <p className="text">Track your assigned projects</p>
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
                    <p className="text-muted">Projects will appear here when assigned</p>
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
                              <h5 className="title mb5">{project.title}</h5>
                              <p className="fz14 text-muted mb0">
                                {project.description.substring(0, 80)}
                                {project.description.length > 80 ? "..." : ""}
                              </p>
                            </td>
                            <td className="vam">
                              <span className="fz15">{project.category}</span>
                            </td>
                            <td className="vam">
                              <span className="text-thm fw500">${project.budget.toLocaleString()}</span>
                              <span className="fz14 text-muted d-block">
                                {project.budgetModel === "MILESTONE" ? "Milestone" : "Fixed"}
                              </span>
                            </td>
                            <td className="vam">
                              <Link
                                href={`/contractor/project/${project.id}`}
                                className="ud-btn btn-thm2 bdrs4"
                              >
                                View Details
                              </Link>
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
      </div>
    </>
  );
}
