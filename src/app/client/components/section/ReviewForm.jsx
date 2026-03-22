"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ project, worker, existingReview, onSuccess }) {
  const router = useRouter();
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/client/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          projectTitle: project.title,
          workerId: worker.id,
          workerName: worker.name,
          workerAvatar: worker.avatar,
          rating,
          comment,
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        if (onSuccess) onSuccess();
        router.push("/client/reviews");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
      <h4 className="mb20">Write a Review</h4>
      
      {project && (
        <div className="project-info mb20 p15 bgc-thm4 bdrs8">
          <span className="fz14 text-muted d-block mb5">Project</span>
          <h6 className="mb0">{project.title}</h6>
        </div>
      )}

      {worker && (
        <div className="worker-info mb20 d-flex align-items-center">
          <img
            src={worker.avatar || "/images/team/freelancer-1.png"}
            alt={worker.name}
            className="rounded-circle me-3"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
          <div>
            <span className="fz14 text-muted d-block">Reviewing</span>
            <h6 className="mb0">{worker.name}</h6>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">Rating</label>
          <div className="rating-stars d-flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="btn p-0 border-0 bg-transparent"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <i
                  className={`flaticon-star fz24 ${
                    star <= (hoverRating || rating) ? "text-thm" : "text-muted"
                  }`}
                />
              </button>
            ))}
            <span className="ms-2 fz16 fw500">{rating}/5</span>
          </div>
        </div>

        <div className="mb20">
          <label className="heading-color ff-heading fw500 mb10">Your Review</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Share your experience working with this freelancer..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="ud-btn btn-dark"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ud-btn btn-thm"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
      </form>
    </div>
  );
}
