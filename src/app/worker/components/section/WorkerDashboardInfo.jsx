"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";

export default function WorkerDashboardInfo() {
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingOffers: 0,
    completedProjects: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentOffers, setRecentOffers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [projectsRes, offersRes] = await Promise.all([
        fetch("/api/worker/projects"),
        fetch("/api/worker/offers"),
      ]);
      const projectsData = await projectsRes.json();
      const offersData = await offersRes.json();

      if (projectsData.success && offersData.success) {
        const assigned = projectsData.data.assigned || [];
        const pending = offersData.data.pendingOffers || [];

        setStats({
          activeProjects: assigned.length,
          pendingOffers: pending.length,
          completedProjects: 5,
          totalEarnings: 12450,
        });

        setRecentProjects(assigned.slice(0, 3));
        setRecentOffers(pending.slice(0, 3));
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
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Worker Dashboard</h2>
              <p className="text">Welcome back! Here's your overview.</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center p50">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-sm-6 col-xxl-3">
                <div className="d-flex align-items-center justify-content-between statistics_funfact">
                  <div className="details">
                    <div className="fz15">Active Projects</div>
                    <div className="title">{stats.activeProjects}</div>
                    <div className="text fz14">
                      <span className="text-thm">In progress</span>
                    </div>
                  </div>
                  <div className="icon text-center">
                    <i className="flaticon-work" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xxl-3">
                <div className="d-flex align-items-center justify-content-between statistics_funfact">
                  <div className="details">
                    <div className="fz15">Pending Offers</div>
                    <div className="title">{stats.pendingOffers}</div>
                    <div className="text fz14">
                      <span className="text-thm">Awaiting response</span>
                    </div>
                  </div>
                  <div className="icon text-center">
                    <i className="flaticon-contract" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xxl-3">
                <div className="d-flex align-items-center justify-content-between statistics_funfact">
                  <div className="details">
                    <div className="fz15">Completed Projects</div>
                    <div className="title">{stats.completedProjects}</div>
                    <div className="text fz14">
                      <span className="text-thm">All time</span>
                    </div>
                  </div>
                  <div className="icon text-center">
                    <i className="flaticon-success" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xxl-3">
                <div className="d-flex align-items-center justify-content-between statistics_funfact">
                  <div className="details">
                    <div className="fz15">Total Earnings</div>
                    <div className="title">${stats.totalEarnings.toLocaleString()}</div>
                    <div className="text fz14">
                      <span className="text-thm">Withdrawn</span>
                    </div>
                  </div>
                  <div className="icon text-center">
                    <i className="flaticon-dollar" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-xxl-4">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Active Projects</h5>
                    <Link href="/worker/my-projects" className="text-decoration-underline text-thm6">
                      View All
                    </Link>
                  </div>
                  {recentProjects.length === 0 ? (
                    <div className="text-center p20">
                      <i className="flaticon-folder fz40 text-muted mb10 d-block" />
                      <p className="text-muted fz14">No active projects</p>
                      <Link href="/worker/browse-projects" className="ud-btn btn-thm btn-sm">
                        Browse Projects
                      </Link>
                    </div>
                  ) : (
                    <div className="dashboard-widget-list">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="widget-item pb15">
                          <Link href={`/worker/project/${project.id}`} className="d-block">
                            <span className="title fw500 text-dark">{project.title}</span>
                            <span className="subtitle text-muted fz13 d-block">
                              {project.category} • ${project.budget.toLocaleString()}
                            </span>
                          </Link>
                          <span className={`badge mt5 ${project.status === "IN_PROGRESS" ? "badge-in-progress" : "badge-assigned"}`}>
                            {project.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="col-md-6 col-xxl-4">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Pending Offers</h5>
                    <Link href="/worker/proposals" className="text-decoration-underline text-thm6">
                      View All
                    </Link>
                  </div>
                  {recentOffers.length === 0 ? (
                    <div className="text-center p20">
                      <i className="flaticon-contract fz40 text-muted mb10 d-block" />
                      <p className="text-muted fz14">No pending offers</p>
                      <Link href="/worker/browse-projects" className="ud-btn btn-thm btn-sm">
                        Find Projects
                      </Link>
                    </div>
                  ) : (
                    <div className="dashboard-widget-list">
                      {recentOffers.map((offer) => (
                        <div key={offer.id} className="widget-item pb15">
                          <span className="title fw500 text-dark d-block">{offer.projectId}</span>
                          <span className="subtitle text-muted fz13 d-block">
                            Your bid: ${offer.amount.toLocaleString()} • {offer.estimatedDays} days
                          </span>
                          <span className="badge badge-new mt5">Pending</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div> */}

              {/* <div className="col-md-6 col-xxl-4">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Quick Actions</h5>
                  </div>
                  <div className="quick-actions">
                    <Link href="/worker/browse-projects" className="action-item mb10 d-block">
                      <i className="flaticon-search me-2" />
                      Browse Projects
                    </Link>
                    <Link href="/worker/my-projects" className="action-item mb10 d-block">
                      <i className="flaticon-work me-2" />
                      My Projects
                    </Link>
                    <Link href="/worker/proposals" className="action-item mb10 d-block">
                      <i className="flaticon-contract me-2" />
                      My Proposals
                    </Link>
                    <Link href="/worker/reviews" className="action-item d-block">
                      <i className="flaticon-review me-2" />
                      Reviews
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Recent Activity</h5>
                  </div>
                  <div className="dashboard-timeline-label">
                    <div className="timeline-item pb15">
                      <div className="child-timeline-label">Today</div>
                      <div className="timeline-badge d-flex align-items-center">
                        <i className="fas fa-genderless" />
                      </div>
                      <div className="ra_pcontent pl10">
                        <span className="title">Milestone Approved</span>
                        <br />
                        <span className="subtitle">
                          Your work on "API Integration" has been approved
                        </span>
                      </div>
                    </div>
                    <div className="timeline-item pb15">
                      <div className="child-timeline-label">Yesterday</div>
                      <div className="timeline-badge d-flex align-items-center color3">
                        <i className="fas fa-genderless" />
                      </div>
                      <div className="ra_pcontent pl10">
                        <span className="title">New Offer Received</span>
                        <br />
                        <span className="subtitle">
                          Client viewed your proposal for "Website Redesign"
                        </span>
                      </div>
                    </div>
                    <div className="timeline-item pb0">
                      <div className="child-timeline-label">2 days ago</div>
                      <div className="timeline-badge d-flex align-items-center color4">
                        <i className="fas fa-genderless" />
                      </div>
                      <div className="ra_pcontent pl10">
                        <span className="title">Project Started</span>
                        <br />
                        <span className="subtitle">
                          "Social Media Marketing" project has been assigned to you
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
