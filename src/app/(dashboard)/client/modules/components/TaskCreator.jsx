"use client";

import { useState } from "react";
import { TASK_TYPES, BUDGET_MODELS, URGENCY_LEVELS } from "@/modules/shared/utils/taskStates";
import api from "@/modules/shared/utils/api";

export default function TaskCreator({ onTaskCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: TASK_TYPES.PHYSICAL,
    address: "",
    budgetModel: BUDGET_MODELS.FIXED,
    amount: "",
    urgency: URGENCY_LEVELS.MEDIUM,
    date: "",
    timeWindow: "",
    category: "",
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
      const result = await api.client.createTask({
        ...formData,
        amount: parseFloat(formData.amount) || 0,
        location: formData.type === TASK_TYPES.PHYSICAL ? { address: formData.address } : null,
      });
      if (result.success) {
        setShowSuccess(true);
        setFormData({
          title: "",
          description: "",
          type: TASK_TYPES.PHYSICAL,
          address: "",
          budgetModel: BUDGET_MODELS.FIXED,
          amount: "",
          urgency: URGENCY_LEVELS.MEDIUM,
          date: "",
          timeWindow: "",
          category: "",
        });
        setTimeout(() => setShowSuccess(false), 3000);
        if (onTaskCreated) onTaskCreated();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Create New Task</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Task created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <label className="form-label fw600 dark-color">Task Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Describe your task in detail"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Task Type</label>
            <select
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              <option value={TASK_TYPES.PHYSICAL}>Physical</option>
              <option value={TASK_TYPES.VIRTUAL}>Virtual</option>
            </select>
          </div>
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Category</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Photography">Photography</option>
              <option value="Moving">Moving</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {formData.type === TASK_TYPES.PHYSICAL && (
          <div className="mb20">
            <label className="form-label fw600 dark-color">Location</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter task location"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="row">
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Budget Model</label>
            <select
              name="budgetModel"
              className="form-control"
              value={formData.budgetModel}
              onChange={handleChange}
            >
              <option value={BUDGET_MODELS.FIXED}>Fixed Price</option>
              <option value={BUDGET_MODELS.MILESTONE}>Milestone</option>
            </select>
          </div>
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Budget Amount ($)</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Urgency</label>
            <select
              name="urgency"
              className="form-control"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value={URGENCY_LEVELS.LOW}>Low</option>
              <option value={URGENCY_LEVELS.MEDIUM}>Medium</option>
              <option value={URGENCY_LEVELS.HIGH}>High</option>
            </select>
          </div>
          <div className="col-md-6 mb20">
            <label className="form-label fw600 dark-color">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Time Window</label>
          <input
            type="text"
            name="timeWindow"
            className="form-control"
            placeholder="e.g., 9:00 AM - 1:00 PM"
            value={formData.timeWindow}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="ud-btn btn-thm w-100"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
          <i className="fal fa-arrow-right-long" />
        </button>
      </form>
    </div>
  );
}
