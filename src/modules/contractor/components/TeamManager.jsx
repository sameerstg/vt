"use client";

import { useState } from "react";
import useContractorStore from "@/modules/contractor/store/contractorStore";
import api from "@/modules/shared/utils/api";

export default function TeamManager() {
  const { teamMembers, addTeamMember, removeTeamMember } = useContractorStore();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await addTeamMember(formData);
      if (result.success) {
        setFormData({ name: "", email: "", phone: "", role: "", skills: "" });
        setShowForm(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      await removeTeamMember(memberId);
    }
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <div className="d-flex justify-content-between align-items-center mb20">
        <h4 className="mb0">Team Management</h4>
        <button
          className="ud-btn btn-thm"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="fal fa-plus" /> Add Member
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb20 p20 bgc-thm4 bdrs8">
          <div className="row">
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Member name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="member@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Phone</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="+1 555-0123"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Role</label>
              <select
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="subcontractor">Subcontractor</option>
                <option value="assistant">Assistant</option>
                <option value="specialist">Specialist</option>
              </select>
            </div>
          </div>
          <div className="mb15">
            <label className="form-label fw600 dark-color">Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              placeholder="Cleaning, Organizing, Moving"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="ud-btn btn-thm" disabled={loading}>
              {loading ? "Adding..." : "Add Member"}
            </button>
            <button
              type="button"
              className="ud-btn btn-dark"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {teamMembers.length === 0 ? (
        <div className="text-center p30">
          <i className="flaticon-users fz40 text-thm mb15" />
          <p className="text">No team members yet. Add your first team member!</p>
        </div>
      ) : (
        <div className="team-list">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member bdr1 p15 bdrs8 mb10">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="member-avatar bgc-thm4 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "48px", height: "48px" }}>
                    <span className="text-thm fw600">{member.name?.charAt(0)}</span>
                  </div>
                  <div className="ml15">
                    <h6 className="mb5">{member.name}</h6>
                    <p className="text mb0 fz14">
                      <i className="flaticon-role mr5" /> {member.role}
                    </p>
                  </div>
                </div>
                <button
                  className="ud-btn btn-dark btn-sm"
                  onClick={() => handleRemoveMember(member.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
