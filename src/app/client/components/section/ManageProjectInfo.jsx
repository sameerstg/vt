"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState, useEffect } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ProjectCard from "../card/ProjectCard";

const tabs = [
  { label: "Posted Projects", status: "POSTED" },
  { label: "Ongoing Projects", status: "IN_PROGRESS" },
  { label: "Completed Projects", status: "COMPLETED" },
];

export default function ManageProjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, [selectedTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const status = tabs[selectedTab].status;
      const res = await fetch(`/api/client/projects?status=${status}`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                          />
                        ))}
                      </tbody>
                    </table>
                    <div className="mt30">
                      <Pagination1 />
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
