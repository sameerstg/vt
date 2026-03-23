"use client";

import { useState } from "react";

export default function TeamManager({ teams }) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.contractorName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id) => setExpanded((prev) => (prev === id ? null : id));

  const roleBadge = (type) =>
    type === "contractor"
      ? "badge bg-warning text-dark"
      : "badge bg-info text-dark";

  return (
    <div>
      <div className="row mb20">
        <div className="col-md-5">
          <div className="search_area">
            <input
              type="text"
              className="form-control"
              placeholder="Search teams or contractors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <label>
              <span className="flaticon-loupe" />
            </label>
          </div>
        </div>
        <div className="col-md-7 d-flex align-items-center justify-content-end">
          <span className="fz14 text-muted">{filtered.length} team{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center py40 text-muted">No teams found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th style={{ width: 36 }} />
                <th>Team Name</th>
                <th>Contractor</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((team) => (
                <>
                  <tr
                    key={team.id}
                    className="cursor-pointer"
                    onClick={() => toggleExpand(team.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="text-center">
                      <i
                        className={`fal fa-chevron-${expanded === team.id ? "up" : "down"} fz12 text-muted`}
                      />
                    </td>
                    <td>
                      <span className="fw500">{team.name}</span>
                      <div className="fz12 text-muted">{team.description}</div>
                    </td>
                    <td>{team.contractorName}</td>
                    <td>
                      <span className="badge badge-assigned">{team.members.length}</span>
                    </td>
                    <td className="fz13 text-muted">{team.createdAt}</td>
                  </tr>

                  {expanded === team.id && (
                    <tr key={`${team.id}-members`}>
                      <td />
                      <td colSpan={4} className="p0">
                        <div className="bgc-thm3 px20 py15 bdrs4 mb5">
                          <table className="table table-sm mb0">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Role</th>
                                <th>Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {team.members.map((m) => (
                                <tr key={m.id}>
                                  <td className="fw500">{m.name}</td>
                                  <td>
                                    <span className={roleBadge(m.type)}>
                                      {m.type.charAt(0).toUpperCase() + m.type.slice(1)}
                                    </span>
                                  </td>
                                  <td>{m.role}</td>
                                  <td>${m.rate}/hr</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
