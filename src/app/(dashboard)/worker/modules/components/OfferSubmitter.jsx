"use client";

import { useState } from "react";
import api from "@/modules/shared/utils/api";

export default function OfferSubmitter({ task, onOfferSubmitted }) {
  const [formData, setFormData] = useState({
    amount: task?.budget?.amount || "",
    terms: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) return;
    setLoading(true);
    try {
      const result = await api.worker.submitOffer(task.id, formData);
      if (result.success) {
        setShowSuccess(true);
        setFormData({ amount: "", terms: "" });
        if (onOfferSubmitted) onOfferSubmitted();
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a task to submit an offer</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Submit Offer</h4>
      
      {showSuccess && (
        <div className="alert alert-success mb20">
          Offer submitted successfully!
        </div>
      )}

      <div className="task-summary bgc-thm4 p15 bdrs8 mb20">
        <h6 className="mb10">{task.title}</h6>
        <div className="d-flex justify-content-between">
          <span className="text">Client Budget:</span>
          <span className="fw600">${task.budget.amount}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <label className="form-label fw600 dark-color">Your Offer Amount ($)</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            placeholder="Enter your offer amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb20">
          <label className="form-label fw600 dark-color">Terms & Conditions</label>
          <textarea
            name="terms"
            className="form-control"
            rows="4"
            placeholder="Describe what you'll deliver and your terms..."
            value={formData.terms}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="ud-btn btn-thm w-100"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Offer"}
          <i className="fal fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}
