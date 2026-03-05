"use client";

import ClientSectionLayout from "./ClientSectionLayout";
import { project1, freelancer1 } from "@/data/product";
import Link from "next/link";
import { useState } from "react";

const proposalList = project1.slice(0, 3).map((job, index) => {
  const worker = freelancer1[index];
  return {
    id: `${job.id}-${worker.id}`,
    jobTitle: job.title,
    jobId: `JOB-${1000 + job.id}`,
    workerName: worker.name,
    workerRole: worker.profession,
    image: worker.img,
    offerAmount: `$${job.price.max}`,
    timeline: job.projectType === "Fixed" ? "5 days" : "7 days",
    deliveryDate: index === 0 ? "Mar 10, 2026" : index === 1 ? "Mar 11, 2026" : "Mar 09, 2026",
    coverLetter: job.brief,
    rating: worker.rating,
    completedJobs: worker.reviews,
    successRate: `${Math.max(90, Math.round(worker.rating * 20))}%`,
    location: job.location,
    responseTime: index === 0 ? "1 hour" : index === 1 ? "2 hours" : "45 mins",
    status: index === 0 ? "Top Match" : index === 1 ? "Verified" : "Fast Delivery",
    category: job.category,
    budgetRange: `$${job.price.min} - $${job.price.max}`,
    profilePath: `/employee-single/${worker.id}`,
    workReviewPath: `/dashboard/work-review-approval/${job.id}`,
    coverLetterAttachment:
      index === 1
        ? null
        : {
            fileName: `${job.title.replace(/\s+/g, "-").toLowerCase()}-cover-letter.pdf`,
            size: index === 0 ? "0.8 MB" : "0.9 MB",
          },
  };
});

export default function ProposalReviewInfo() {
  const [selectedProposalId, setSelectedProposalId] = useState(proposalList[0]?.id);
  const selected = proposalList.find((item) => item.id === selectedProposalId) || proposalList[0];
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <span className="ms5">
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={`${i < fullStars ? "fas" : "far"} fa-star`}
            style={{ color: i < fullStars ? "#f4b400" : "#c7c7c7", fontSize: "13px", marginRight: "2px" }}
          />
        ))}
      </span>
    );
  };

  return (
    <ClientSectionLayout
      title="Proposal Review Page"
      description="Review worker/contractor proposals and take hiring action."
    >
      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="title mb-0">Proposal List</h5>
              <p className="mb-0 text">
                {proposalList.length} proposals received | Reviewing: {selected.workerName}
              </p>
            </div>
            {proposalList.map((item, index) => (
              <div
                key={item.id}
                className="p20 bdr1 bdrs4 mb15"
                style={{
                  borderColor: selected.id === item.id ? "#5b5f97" : undefined,
                  boxShadow: selected.id === item.id ? "0 0 0 1px #5b5f97 inset" : "none",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedProposalId(item.id)}
              >
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb15">
                  <div>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.workerName}
                        width={48}
                        height={48}
                        className="rounded-circle me-3"
                      />
                      <div>
                        <h6 className="mb5">{item.workerName}</h6>
                        <p className="text mb0">{item.workerRole}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="badge bgc-thm4 text-dark mb5">{item.status}</span>
                    <p className="mb0 fw500">{item.offerAmount}</p>
                    <p className="mb0 fz14 text">Timeline: {item.timeline}</p>
                  </div>
                </div>
                <p className="mb8 text">
                  <span className="fw500">Job Title:</span> {item.jobTitle}
                </p>
                <p className="text mb10">{item.coverLetter}</p>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <p className="mb0 fz14 text">
                    Rating {item.rating}
                    {renderStars(item.rating)} | {item.completedJobs} jobs | {item.successRate} success | Responds in{" "}
                    {item.responseTime}
                  </p>
                </div>
                <div className="d-flex justify-content-end gap-2 flex-wrap mt15">
                  <button type="button" className="ud-btn btn-thm">
                    Accept Proposal
                    <i className="fal fa-check" />
                  </button>
                  <button type="button" className="ud-btn btn-danger">
                    Reject Proposal
                    <i className="fal fa-xmark" />
                  </button>
                </div>
                {index !== proposalList.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Cover Letter</h5>
            </div>
            <p className="mb10 text">
              <span className="fw500">Job Title:</span> {selected.jobTitle}
            </p>
            <p className="text mb10">{selected.coverLetter}</p>
            <p className="text mb0">
              I can start immediately and provide daily progress updates with revision support until final approval.
            </p>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Worker Profile Preview</h5>
            </div>
            <div className="d-flex align-items-center">
              <img
                src={selected.image}
                alt="worker preview"
                width={56}
                height={56}
                className="rounded-circle me-3"
              />
              <div>
                <h6 className="mb5">{selected.workerName}</h6>
                <p className="text mb0">{selected.workerRole}</p>
              </div>
            </div>
            <div className="mt20">
              <p className="mb8">
                <span className="fw500">Rating:</span> {selected.rating}
                {renderStars(selected.rating)}
              </p>
              <p className="mb8">
                <span className="fw500">Completed Jobs:</span> {selected.completedJobs}
              </p>
              <p className="mb8">
                <span className="fw500">Success Rate:</span> {selected.successRate}
              </p>
              <p className="mb8">
                <span className="fw500">Location:</span> {selected.location}
              </p>
              <p className="mb0">
                <span className="fw500">Avg Response:</span> {selected.responseTime}
              </p>
            </div>
            <div className="mt20">
              <Link href={selected.profilePath} className="ud-btn btn-light w-100">
                View Full Profile
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Cover Letter</h5>
            </div>
            <div className="p15 bdr1 bdrs4 mb15">
              <p className="mb8 fw500">Text</p>
              <p className="mb0 text fz14">{selected.coverLetter}</p>
            </div>
            {selected.coverLetterAttachment ? (
              <>
                <p className="mb8 fw500">{selected.coverLetterAttachment.fileName}</p>
                <p className="mb15 text">Size: {selected.coverLetterAttachment.size}</p>
                <button type="button" className="ud-btn btn-light w-100">
                  Download Attachment
                  <i className="fal fa-download" />
                </button>
              </>
            ) : (
              <p className="mb0 text">Attachment optional: no file attached for this proposal.</p>
            )}
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Offer Amount</h5>
            </div>
            <h4 className="mb10">{selected.offerAmount}</h4>
            <p className="mb5">
              <span className="fw500">Service Fee:</span> $16
            </p>
            <p className="mb5">
              <span className="fw500">Escrow Amount:</span> {selected.offerAmount}
            </p>
            <p className="text mb0">Includes full scope from task brief and revision support.</p>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Timeline</h5>
            </div>
            <p className="mb5">
              <span className="fw500">Delivery Window:</span> {selected.timeline}
            </p>
            <p className="mb0">
              <span className="fw500">Expected Delivery:</span> {selected.deliveryDate}
            </p>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Next Step</h5>
            </div>
            <p className="text mb15">
              Once you accept a proposal, continue to work verification and milestone approval.
            </p>
            <Link href={selected.workReviewPath} className="ud-btn btn-light">
              Open Work Review
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </ClientSectionLayout>
  );
}
