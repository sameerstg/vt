"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";

export default function ContractorDashboardInfo() {
  const [stats, setStats] = useState({
    activeProjects: 0,
    teamMembers: 0,
    completedProjects: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contractor");
      const data = await res.json();
      if (data.success) {
        const projects = data.data.assignedProjects || [];
        const teamData = data.data.team;
        
        setStats({
          activeProjects: projects.filter(p => ["ASSIGNED", "IN_PROGRESS", "SUBMITTED"].includes(p.status)).length,
          teamMembers: teamData?.members?.length || 0,
          completedProjects: projects.filter(p => p.status === "COMPLETED").length,
          totalRevenue: 45000,
        });

        setTeam(teamData);
        setRecentProjects(projects.slice(0, 3));
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
              <h2>Contractor Dashboard</h2>
              <p className="text">Manage your team and projects</p>
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
                    <div className="fz15">Team Members</div>
                    <div className="title">{stats.teamMembers}</div>
                    <div className="text fz14">
                      <span className="text-thm">Active</span>
                    </div>
                  </div>
                  <div className="icon text-center">
                    <i className="flaticon-team" />
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
                    <div className="fz15">Total Revenue</div>
                    <div className="title">${stats.totalRevenue.toLocaleString()}</div>
                    <div className="text fz14">
                      <span className="text-thm">Received</span>
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
                    <h5 className="title">My Team</h5>
                    <Link href="/contractor/team" className="text-decoration-underline text-thm6">
                      Manage
                    </Link>
                  </div>
                  {team?.members?.length === 0 ? (
                    <div className="text-center p20">
                      <i className="flaticon-team fz40 text-muted mb10 d-block" />
                      <p className="text-muted fz14">No team members yet</p>
                      <Link href="/contractor/team" className="ud-btn btn-thm btn-sm">
                        Add Members
                      </Link>
                    </div>
                  ) : (
                    <div className="dashboard-widget-list">
                      {team?.members?.slice(0, 3).map((member) => (
                        <div key={member.id} className="widget-item pb15">
                          <div className="d-flex justify-content-between">
                            <div>
                              <span className="title fw500 text-dark d-block">{member.name}</span>
                              <span className="subtitle text-muted fz13 d-block">{member.role}</span>
                            </div>
                            <span className="badge badge-new">${member.rate}/hr</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-xxl-4">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Active Projects</h5>
                    <Link href="/contractor/my-projects" className="text-decoration-underline text-thm6">
                      View All
                    </Link>
                  </div>
                  {recentProjects.length === 0 ? (
                    <div className="text-center p20">
                      <i className="flaticon-work fz40 text-muted mb10 d-block" />
                      <p className="text-muted fz14">No active projects</p>
                    </div>
                  ) : (
                    <div className="dashboard-widget-list">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="widget-item pb15">
                          <span className="title fw500 text-dark d-block">{project.title}</span>
                          <span className="subtitle text-muted fz13 d-block">
                            {project.category} • ${project.budget.toLocaleString()}
                          </span>
                          <span className={`badge mt5 ${project.status === "IN_PROGRESS" ? "badge-in-progress" : "badge-assigned"}`}>
                            {project.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-md-6 col-xxl-4">
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                    <h5 className="title">Quick Actions</h5>
                  </div>
                  <div className="quick-actions">
                    <Link href="/contractor/team" className="action-item mb10 d-block">
                      <i className="flaticon-team me-2" />
                      Manage Team
                    </Link>
                    <Link href="/contractor/my-projects" className="action-item mb10 d-block">
                      <i className="flaticon-work me-2" />
                      My Projects
                    </Link>
                    <Link href="/contractor/payroll" className="action-item mb10 d-block">
                      <i className="flaticon-dollar me-2" />
                      Distribute Payroll
                    </Link>
                    <Link href="/contractor/reviews" className="action-item d-block">
                      <i className="flaticon-review me-2" />
                      Reviews
                    </Link>
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
