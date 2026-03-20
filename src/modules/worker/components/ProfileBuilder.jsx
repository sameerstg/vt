"use client";

import { useState } from "react";
import useWorkerStore from "@/modules/worker/store/workerStore";
import api from "@/modules/shared/utils/api";

export default function ProfileBuilder() {
  const { profile, updateProfile } = useWorkerStore();
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    skills: profile?.skills?.join(", ") || "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.worker.updateProfile({
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      });
      if (result.success) {
        updateProfile(formData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Build Your Profile</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Profile updated successfully!
        </div>
      )}

      <div className="text-center mb20">
        <img
          src={profile?.avatar || "/images/team/freelancer-1.png"}
          alt={profile?.name}
          className="rounded-circle mb10"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <p className="text">
          <i className="flaticon-star text-thm" /> {profile?.rating || 0} Rating
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <label className="form-label fw600 dark-color">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb20">
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
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Skills (comma-separated)</label>
          <input
            type="text"
            name="skills"
            className="form-control"
            placeholder="Photography, Editing, Design"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Bio</label>
          <textarea
            name="bio"
            className="form-control"
            rows="4"
            placeholder="Tell clients about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="ud-btn btn-thm w-100"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Profile"}
          <i className="fal fa-check" />
        </button>
      </form>
    </div>
  );
}
