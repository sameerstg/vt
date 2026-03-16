"use client";

import ClientSectionLayout from "./ClientSectionLayout";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function FeedbackInfo({ item }) {
  const [rating, setRating] = useState(5);
  const [writtenFeedback, setWrittenFeedback] = useState("");

  const summaryLabel = useMemo(() => {
    if (rating >= 5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Needs Improvement";
    return "Poor";
  }, [rating]);

  return (
    <ClientSectionLayout
      title="Feedback"
    >
      <div className="row">
        <div className="col-xl-5">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Rating Summary</h5>
            </div>
            <h4 className="mb10">{item.jobTitle}</h4>
            <p className="text mb10">
              Worker: <span className="fw500">{item.workerName}</span>
            </p>
            <p className="text mb20">
              Current Avg Rating: <span className="fw500">{item.ratingAverage}</span> ({item.feedbackCount} reviews)
            </p>

            <div className="p15 bdr1 bdrs4 mb20">
              <p className="mb5 fw500">Selected Rating: {rating}/5</p>
              <p className="mb0 text">{summaryLabel}</p>
            </div>

            <p className="mb10 fw500">Recent Feedback Highlights</p>
            {item.recentFeedback.map((line) => (
              <p key={line} className="mb5 text fz14">
                - {line}
              </p>
            ))}

            <div className="mt20">
              <Link href={item.workerProfilePath} className="ud-btn btn-light w-100">
                View Worker Profile
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-7">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Submit Feedback</h5>
            </div>

            <div className="mb20">
              <label className="form-label fw500">Rating (numeric)</label>
              <input
                type="number"
                min={1}
                max={5}
                step={0.1}
                className="form-control"
                value={rating}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (!Number.isNaN(next)) {
                    setRating(Math.max(1, Math.min(5, next)));
                  }
                }}
              />
            </div>

            <div className="mb20">
              <label className="form-label fw500">Written Feedback</label>
              <textarea
                className="form-control"
                rows={6}
                placeholder="Write your completion feedback..."
                value={writtenFeedback}
                onChange={(e) => setWrittenFeedback(e.target.value)}
              />
            </div>

            <button type="button" className="ud-btn btn-thm">
              Submit Feedback
              <i className="fal fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>
    </ClientSectionLayout>
  );
}
