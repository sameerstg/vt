"use client";
import { useState } from "react";

export default function MilestoneForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Milestone</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw500">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="e.g., Design Phase"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw500">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Describe this milestone..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label fw500">Amount ($)</label>
                    <input
                      type="number"
                      name="amount"
                      className="form-control"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label fw500">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      className="form-control"
                      value={formData.dueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="ud-btn btn-dark"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="ud-btn btn-thm">
                Add Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
