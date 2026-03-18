"use client";

import ClientSectionLayout from "./ClientSectionLayout";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { completedTasks } from "@/data/clientDashboard";

export default function FeedbackInfo({ item }) {
  const searchParams = useSearchParams();
  const [rating, setRating] = useState(5);
  const [writtenFeedback, setWrittenFeedback] = useState("");
  const projectTitle = searchParams.get("project") || item.jobTitle;
  const freelancerName = searchParams.get("freelancer") || item.workerName;
  const completedOn = searchParams.get("completedOn");
  const selectedCompletedTask = useMemo(
    () =>
      completedTasks.find(
        (entry) =>
          String(entry.id) === String(item.id) ||
          entry.task === projectTitle
      ),
    [item.id, projectTitle]
  );
  const submittedOn = searchParams.get("submittedOn") || selectedCompletedTask?.submittedOn;
  const budget = searchParams.get("budget") || selectedCompletedTask?.budget || "TBD";
  const deliveryNote =
    searchParams.get("deliveryNote") || selectedCompletedTask?.deliveryNote || "Final work files were submitted for review.";
  const deliverables = selectedCompletedTask?.deliverables || [];
  const disputeHref = `/dashboard/disputed/dispute-submission-${item.id}?task=${encodeURIComponent(
    projectTitle
  )}&issue=${encodeURIComponent("Submitted work requires dispute review")}&status=${encodeURIComponent(
    "Open"
  )}&worker=${encodeURIComponent(freelancerName)}&openedOn=${encodeURIComponent(
    completedOn || submittedOn || "Today"
  )}&budget=${encodeURIComponent(budget)}&escrowStatus=${encodeURIComponent(
    "Under Review"
  )}&reason=${encodeURIComponent(
    `A dispute was raised after reviewing the submitted work for ${projectTitle}.`
  )}`;
  const fundHref = `/dashboard/escrow-funding?task=${encodeURIComponent(
    projectTitle
  )}&worker=${encodeURIComponent(freelancerName)}&amount=${encodeURIComponent(
    budget
  )}`;

  const summaryLabel = useMemo(() => {
    if (rating >= 5) return "Excellent";
    if (rating >= 4) return "Very Good";
    if (rating >= 3) return "Good";
    if (rating >= 2) return "Needs Improvement";
    return "Poor";
  }, [rating]);

  return (
    <ClientSectionLayout
      title="Submission Work"
    >
      <div className="mb20">
        <Link href="/dashboard/active-tasks?tab=completed" className="ud-btn btn-light-default">
          ← Back to List
        </Link>
      </div>

      <div className="row">
        <div className="col-xl-5">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Submission Summary</h5>
            </div>
            <h4 className="mb10">{projectTitle}</h4>
            <p className="text mb10">
              Worker: <span className="fw500">{freelancerName}</span>
            </p>
            {completedOn && (
              <p className="text mb10">
                Completed On: <span className="fw500">{completedOn}</span>
              </p>
            )}
            {submittedOn && (
              <p className="text mb10">
                Submitted On: <span className="fw500">{submittedOn}</span>
              </p>
            )}
            <p className="text mb10">
              Budget: <span className="fw500">{budget}</span>
            </p>
            <div className="p15 bdr1 bdrs4 mb20">
              <p className="mb5 fw500">Worker Delivery Note</p>
              <p className="mb0 text">{deliveryNote}</p>
            </div>
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

            <div className="d-flex gap-2 mt15 flex-wrap">
              <Link href={disputeHref} className="ud-btn btn-light-purple">
                Dispute
              </Link>
              <Link href={fundHref} className="ud-btn btn-thm">
                Fund
              </Link>
            </div>
          </div>
        </div>

        <div className="col-xl-7">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Submitted Work Details</h5>
            </div>

            <div className="p15 bdr1 bdrs4 mb20 bg-light">
              <p className="mb5 fw500">Project</p>
              <p className="mb10 text">{projectTitle}</p>
              <p className="mb5 fw500">Worker</p>
              <p className="mb0 text">{freelancerName}</p>
            </div>

            <div className="mb20">
              <label className="form-label fw500">Submitted Files</label>
              <div className="p15 bdr1 bdrs4">
                {deliverables.length ? (
                  deliverables.map((file) => (
                    <p key={file} className="mb10 text">
                      {file}
                    </p>
                  ))
                ) : (
                  <p className="mb0 text">No submitted files available.</p>
                )}
              </div>
            </div>

            <div className="mb20">
              <label className="form-label fw500">Submission Summary</label>
              <textarea
                className="form-control"
                rows={4}
                value={deliveryNote}
                readOnly
              />
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
              Save Review
              <i className="fal fa-paper-plane" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ud-btn.btn-light-purple {
          border: 1px solid #5b2dff;
          color: #5b2dff;
          background: transparent;
        }

        .ud-btn.btn-light-purple:hover {
          background: #5b2dff;
          color: #fff;
        }
      `}</style>
    </ClientSectionLayout>
  );
}
