"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "@/app/worker/components/header/DashboardNavigation";

const WORKER_ID = "worker-021";

export default function WorkerTeamInfo() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchTeams = () => {
    setLoading(true);
    fetch(`/api/worker/projects?type=team&workerId=${WORKER_ID}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setTeams(data.data.teams || []);
          const active = (data.data.teams || []).filter(t => t.memberStatus === "ACTIVE");
          if (active.length > 0) setExpanded({ [active[0].id]: true });
        } else {
          setError("Failed to load teams.");
        }
      })
      .catch(() => setError("Network error."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTeams(); }, []);

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const handleInviteResponse = async (teamId, accept) => {
    setActionLoading(teamId);
    setError("");
    try {
      const res = await fetch("/api/worker/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "respondTeamInvite", workerId: WORKER_ID, teamId, status: accept ? "ACTIVE" : "DECLINED" }),
      });
      const data = await res.json();
      if (data.success) fetchTeams();
      else setError(data.error || "Action failed.");
    } catch { setError("Network error."); }
    finally { setActionLoading(null); }
  };

  const q = search.trim().toLowerCase();
  const pendingTeams = teams.filter(t => t.memberStatus === "PENDING");
  const activeTeams = teams.filter(t => t.memberStatus === "ACTIVE" &&
    (!q || [t.name, t.contractorName, t.description].some(f => f?.toLowerCase().includes(q)))
  );

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
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
          ) : (
            <>
              {/* Pending Invitations */}
              {pendingTeams.length > 0 && (
                <div className="ps-widget bgc-white bdrs4 p30 mb20">
                  <h5 className="mb20">
                    Team Invitations
                    <span className="badge badge-new ms-2 fz12">{pendingTeams.length}</span>
                  </h5>
                  {pendingTeams.map(team => (
                    <div key={team.id} className="d-flex justify-content-between align-items-center py15 bdrt1">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle bgc-thm4 fw600 text-thm fz16"
                          style={{ width: 44, height: 44, flexShrink: 0 }}
                        >
                          {team.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="mb2 fw600">{team.name}</h6>
                          <p className="fz13 text-muted mb0">
                            {team.contractorName}
                            {team.description && <> &middot; {team.description}</>}
                            <> &middot; {team.members.length} member{team.members.length !== 1 ? "s" : ""}</>
                          </p>
                          {team.inviteRole && (
                            <span className="fz12 text-muted">Role: {team.inviteRole}</span>
                          )}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="ud-btn btn-thm bdrs4 btn-sm"
                          disabled={actionLoading === team.id}
                          onClick={() => handleInviteResponse(team.id, true)}
                        >
                          {actionLoading === team.id
                            ? <span className="spinner-border spinner-border-sm" />
                            : "Accept"
                          }
                        </button>
                        <button
                          className="ud-btn btn-light bdrs4 btn-sm"
                          disabled={actionLoading === team.id}
                          onClick={() => handleInviteResponse(team.id, false)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search */}
              <div className="mb20">
                <div className="position-relative" style={{ maxWidth: 360 }}>
                  <i className="flaticon-search fz16 text-muted position-absolute" style={{ top: "50%", left: 14, transform: "translateY(-50%)" }} />
                  <input
                    type="text"
                    className="form-control ps-5"
                    placeholder="Search teams…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Active Teams */}
              {activeTeams.length === 0 ? (
                <div className="ps-widget bgc-white bdrs4 p30 text-center">
                  <i className="flaticon-team fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">
                    {search ? "No teams match your search." : "You are not assigned to any team yet."}
                  </h5>
                </div>
              ) : (
                activeTeams.map(team => (
                  <div key={team.id} className="ps-widget bgc-white bdrs4 p30 mb20 overflow-hidden position-relative">
                    <div className="d-flex justify-content-between align-items-center">
                      <div
                        className="d-flex align-items-center gap-3 flex-grow-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggle(team.id)}
                      >
                        <i className="flaticon-down-filled-triangular-arrow fz12 text-muted" style={{ transition: "transform 0.2s", transform: expanded[team.id] ? "rotate(180deg)" : "rotate(0deg)" }} />
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
                                        {m.memberId === WORKER_ID && (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
