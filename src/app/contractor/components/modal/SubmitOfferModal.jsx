"use client";
import { useState } from "react";

export default function SubmitOfferModal({ project, onClose, onSuccess }) {
  const [amount, setAmount] = useState(project?.budget || 0);
  const [estimatedDays, setEstimatedDays] = useState(7);
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/worker/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          amount,
          estimatedDays,
          terms,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || "Failed to submit offer");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal fade" id="submitOfferModal" tabIndex="-1" show={true}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Submit Offer</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb20">
                <h6 className="mb10">{project?.title}</h6>
                <p className="text-muted fz14 mb0">
                  {project?.description.substring(0, 150)}
                  {project?.description.length > 150 ? "..." : ""}
                </p>
              </div>

              <div className="mb20">
                <label className="form-label">Your Offer Amount ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  min="1"
                  required
                />
                <span className="fz13 text-muted">
                  Client budget: ${project?.budget?.toLocaleString()}
                </span>
              </div>

              <div className="mb20">
                <label className="form-label">Estimated Days to Complete</label>
                <input
                  type="number"
                  className="form-control"
                  value={estimatedDays}
                  onChange={(e) => setEstimatedDays(parseInt(e.target.value))}
                  min="1"
                  required
                />
              </div>

              <div className="mb20">
                <label className="form-label">Terms & Proposal</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-light" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="ud-btn btn-thm" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Offer"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
