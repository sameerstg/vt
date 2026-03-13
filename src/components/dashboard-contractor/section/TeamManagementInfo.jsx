

"use client";
import React from "react";

export default function TeamManagementInfo() {
  // Placeholder team members with multiple projects
  const [teamMembers, setTeamMembers] = React.useState([
    { id: 1, name: "Ahsan Raza", email: "ahsan.raza@veritask.com", userId: "w-1001", projects: ["UI Fix Batch", "QA Regression Pass"] },
    { id: 2, name: "Sara Khan", email: "sara.khan@veritask.com", userId: "w-1002", projects: ["QA Regression Pass"] },
    { id: 3, name: "Bilal Ahmed", email: "bilal.ahmed@veritask.com", userId: "w-1003", projects: ["Client Delivery Notes", "UI Fix Batch"] },
  ]);

  // Mock worker database
  const workerDB = [
    { id: "w-1001", name: "Ahsan Raza", email: "ahsan.raza@veritask.com" },
    { id: "w-1002", name: "Sara Khan", email: "sara.khan@veritask.com" },
    { id: "w-1003", name: "Bilal Ahmed", email: "bilal.ahmed@veritask.com" },
    { id: "w-1004", name: "Maham Ali", email: "maham.ali@veritask.com" },
    { id: "w-1005", name: "Ali Usman", email: "ali.usman@veritask.com" },
  ];

  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedWorker, setSelectedWorker] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);
  const [newMember, setNewMember] = React.useState({ name: "", email: "", userId: "" });
  const [error, setError] = React.useState({});

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!selectedWorker) return;
    setTeamMembers((prev) => [
      {
        id: Date.now(),
        name: selectedWorker.name,
        email: selectedWorker.email,
        userId: selectedWorker.id,
        projects: []
      },
      ...prev
    ]);
    setShowModal(false);
    setSearch("");
    setSearchResults([]);
    setSelectedWorker(null);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="dashboard_title_area mb30">
        <h2>Team Management</h2>
      </div>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Team Members</h5>
        </div>
        <div className="packages_table table-responsive">
          <table className="table-style3 table at-savesearch">
            <thead className="t-head">
              <tr>
                <th>Name</th>
                <th>Assigned Project</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="vam fw500">
                    {member.name}<br />
                    <small className="text-muted">{member.email} | {member.userId}</small>
                  </td>
                  <td className="vam">
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {member.projects.map((proj, idx) => (
                        <li key={idx} style={{ marginBottom: 4 }}>
                          <span className="badge bgc-thm-light text-thm">{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="vam">
                    <button className="ud-btn btn-thm btn-xs mr10">Assign Project</button>
                    <button className="ud-btn btn-danger btn-xs" onClick={() => setTeamMembers(prev => prev.filter(tm => tm.id !== member.id))}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt20">
          <button className="ud-btn btn-thm" onClick={() => setShowModal(true)}>Add Team Mate</button>
          {showModal && (
            <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.2)" }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Team Mate</h5>
                    <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
                  </div>
                  <form onSubmit={handleAddMember}>
                    <div className="modal-body">
                      <div className="mb10">
                        <label>Search by Email or User ID</label>
                        <input
                          className="form-control"
                          value={search}
                          onChange={e => {
                            setSearch(e.target.value);
                            const val = e.target.value.trim().toLowerCase();
                            if (val.length === 0) {
                              setSearchResults([]);
                              setSelectedWorker(null);
                              return;
                            }
                            // Exclude already added team members
                            const results = workerDB.filter(
                              w => (w.email.toLowerCase().includes(val) || w.id.toLowerCase().includes(val)) &&
                                !teamMembers.some(tm => tm.userId === w.id)
                            );
                            setSearchResults(results);
                            setSelectedWorker(null);
                          }}
                          placeholder="Enter email or user ID"
                        />
                      </div>
                      {searchResults.length > 0 && (
                        <div className="mb10">
                          <label>Select Worker</label>
                          <ul style={{ listStyle: "none", padding: 0 }}>
                            {searchResults.map(w => (
                              <li key={w.id} style={{ marginBottom: 6 }}>
                                <button
                                  type="button"
                                  className={`ud-btn btn-thm btn-xs ${selectedWorker && selectedWorker.id === w.id ? "active" : ""}`}
                                  onClick={() => {
                                    setSelectedWorker(w);
                                    setSearch(w.email);
                                    setSearchResults([]);
                                  }}
                                  tabIndex={0}
                                >
                                  {w.name} ({w.email} | {w.id})
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {search && searchResults.length === 0 && (
                        <div className="mb10">
                          <small className="text-danger">No worker found or already in team.</small>
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="ud-btn btn-thm" disabled={!selectedWorker}>Add</button>
                      <button type="button" className="ud-btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
