"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { adminAllProjects } from "@/data/adminProjects";
import Pagination1 from "@/components/section/Pagination1";

const tabs = [
  { key: "all", label: "All Projects" },
  { key: "ongoing", label: "Ongoing Projects" },
  { key: "completed", label: "Complete Projects" },
  { key: "closed", label: "Closed Projects" }
];

export default function ProjectMonitoringAllProjectsInfo() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab, searchQuery]);

  const filteredProjects = useMemo(() => {
    let list = adminAllProjects;
    
    // Filter by tab
    if (selectedTab === "ongoing") list = list.filter(p => p.status === "Ongoing");
    if (selectedTab === "completed") list = list.filter(p => p.status === "Completed");
    if (selectedTab === "closed") list = list.filter(p => p.status === "Closed");
    
    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.client.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }
    
    return list;
  }, [selectedTab, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  const getStatusBadgeStyle = (status) => {
    if (status === "Ongoing") {
      return { background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" };
    }
    if (status === "Completed") {
      return { background: "#f0fdf4", color: "#166534", border: "1px solid #dcfce7" };
    }
    if (status === "Closed") {
      return { background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" };
    }
    return { background: "#fffbeb", color: "#b45309", border: "1px solid #fef3c7" };
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>All Projects</h2>
            <p className="text">View all projects created by clients on the platform.</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="navtab-style1">
              <nav>
                <div className="nav nav-tabs mb30" id="nav-tab2" role="tablist">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`nav-link fw500 ps-0 pe-0 ${selectedTab === tab.key ? "active" : ""}`}
                      onClick={() => setSelectedTab(tab.key)}
                      style={{ marginRight: "30px", paddingBottom: "15px" }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </nav>

              <div className="d-flex align-items-center mb30">
                <div className="position-relative w-100" style={{ maxWidth: "400px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by project name or client name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: "40px", height: "50px", borderRadius: "8px" }}
                  />
                  <i className="flaticon-loupe position-absolute" style={{ left: "15px", top: "15px", color: "#888" }} />
                </div>
              </div>

              <div className="packages_table table-responsive">
                <table className="table-style3 table align-middle mb-0">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Project ID</th>
                      <th scope="col">Project Name</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Budget</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paginatedProjects.length > 0 ? (
                      paginatedProjects.map((project) => (
                        <tr key={project.id}>
                          <td>{project.id}</td>
                          <td className="fw500">{project.title}</td>
                          <td>{project.client}</td>
                          <td>{project.budget}</td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                padding: "6px 14px",
                                fontSize: "12px",
                                fontWeight: "600",
                                borderRadius: "6px",
                                ...getStatusBadgeStyle(project.status),
                              }}
                            >
                              {project.status}
                            </span>
                          </td>
                          <td>{project.createdAt}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No projects found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredProjects.length > 0 && (
                <div className="mt30">
                  <Pagination1
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredProjects.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    countLabel="projects"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
