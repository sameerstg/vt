"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

export default function TeamManagementInfo() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", role: "", rate: "" });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contractor?type=team");
      const data = await res.json();
      if (data.success) {
        setTeam(data.data.team);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contractor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addTeamMember",
          ...newMember,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTeam(data.data);
        setShowAddModal(false);
        setNewMember({ name: "", role: "", rate: "" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const res = await fetch("/api/contractor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "removeTeamMember",
          memberId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTeam(data.data);
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
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Team Management</h2>
              <p className="text">Manage your team members and subcontractors</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                onClick={() => setShowAddModal(true)}
                className="ud-btn btn-dark default-box-shadow2"
              >
                Add Member
                <i className="fal fa-plus" />
              </button>
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
              ) : !team ? (
                <div className="text-center p50">
                  <i className="flaticon-team fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">No team created yet</h5>
                  <p className="text-muted">Create your team to manage subcontractors</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="ud-btn btn-thm mt20"
                  >
                    Create Team
                  </button>
                </div>
              ) : (
                <>
                  <div className="team-header mb30">
                    <h4 className="mb10">{team.name}</h4>
                    <p className="text-muted">{team.description || "Your professional team"}</p>
                    <span className="badge badge-new">{team.members?.length || 0} Members</span>
                  </div>

                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Worker</th>
                          <th scope="col">Role</th>
                          <th scope="col">Hourly Rate</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {team.members?.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center p30">
                              <p className="text-muted mb0">No team members yet</p>
                            </td>
                          </tr>
                        ) : (
                          team.members?.map((member) => (
                            <tr key={member.id}>
                              <td>
                                <div className="d-flex align-items-center gap10">
                                  <div className="member-avatar">
                                    <span className="avatar-circle">
                                      {member.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div>
                                    <h5 className="title mb0">{member.name}</h5>
                                    <span className="fz13 text-muted">{member.workerId}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="vam">
                                <span className="fz15">{member.role}</span>
                              </td>
                              <td className="vam">
                                <span className="text-thm fw500">${member.rate}/hr</span>
                              </td>
                              <td className="vam">
                                <span className={`badge ${member.isActive ? "badge-completed" : "badge-cancelled"}`}>
                                  {member.isActive ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td className="vam">
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="ud-btn btn-light btn-sm"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal fade show d-block" id="addMemberModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
              </div>
              <form onSubmit={handleAddMember}>
                <div className="modal-body">
                  <div className="mb20">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      placeholder="Worker name"
                      required
                    />
                  </div>
                  <div className="mb20">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      placeholder="e.g., Developer, Designer"
                      required
                    />
                  </div>
                  <div className="mb20">
                    <label className="form-label">Hourly Rate ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newMember.rate}
                      onChange={(e) => setNewMember({ ...newMember, rate: e.target.value })}
                      placeholder="25"
                      min="1"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="ud-btn btn-light" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="ud-btn btn-thm">
                    Add Member
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
