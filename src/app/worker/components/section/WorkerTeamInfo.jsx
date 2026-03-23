"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

export default function WorkerTeamInfo() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/api/worker/projects?type=team&workerId=worker-021")
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setTeams(data.data.teams || []);
          if (data.data.teams?.length > 0) {
            setExpanded({ [data.data.teams[0].id]: true });
          }
        } else {
          setError("Failed to load teams.");
        }
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Teams</h2>
            <p className="text">Teams you are a member of</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          {error && <div className="alert alert-danger mb20">{error}</div>}

          {loading ? (
            <div className="ps-widget bgc-white bdrs4 p30 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teams.length === 0 ? (
            <div className="ps-widget bgc-white bdrs4 p30 text-center">
              <i className="flaticon-team fz60 text-muted mb20 d-block" />
              <h5 className="text-muted">You are not assigned to any team yet.</h5>
            </div>
          ) : (
            teams.map(team => (
              <div key={team.id} className="ps-widget bgc-white bdrs4 p30 mb20 overflow-hidden position-relative">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="d-flex align-items-center gap-3 flex-grow-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggle(team.id)}
                  >
                    <i className={`flaticon-${expanded[team.id] ? "up" : "down"}-arrow fz14 text-muted`} />
                    <div>
                      <h5 className="mb2">{team.name}</h5>
                      <p className="fz13 text-muted mb0">
                        {team.contractorName} &middot; {team.members.length} member{team.members.length !== 1 ? "s" : ""}
                        {team.description && <> &middot; {team.description}</>}
                      </p>
                    </div>
                  </div>
                </div>

                {expanded[team.id] && (
                  <div className="packages_table table-responsive mt20">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Member</th>
                          <th scope="col">Type</th>
                          <th scope="col">Role</th>
                          <th scope="col">Rate / hr</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {team.members.map(m => (
                          <tr key={m.id}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <div
                                  className="d-flex align-items-center justify-content-center rounded-circle bgc-thm4 fw600 text-thm fz14"
                                  style={{ width: 36, height: 36, flexShrink: 0 }}
                                >
                                  {m.name.charAt(0)}
                                </div>
                                <div>
                                  <span className="fw500 d-block">
                                    {m.name}
                                    {m.memberId === "worker-021" && (
                                      <span className="badge badge-new ms-2 fz11">You</span>
                                    )}
                                  </span>
                                  <span className="fz12 text-muted">{m.memberId}</span>
                                </div>
                              </div>
                            </td>
                            <td className="vam">
                              <span className={`badge fz12 ${m.type === "contractor" ? "badge-assigned" : "badge-in-progress"}`}>
                                {m.type === "contractor" ? "Contractor" : "Worker"}
                              </span>
                            </td>
                            <td className="vam fz14">{m.role}</td>
                            <td className="vam">
                              <span className="text-thm fw500">${m.rate}/hr</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
