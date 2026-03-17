"use client";

import ClientSectionLayout from "./ClientSectionLayout";
import { getAuthSession, getProposalsForClient } from "@/utils/auth/mockAuth";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";

export default function ProposalReviewInfo() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposalId, setSelectedProposalId] = useState(null);

  const refreshProposals = useCallback(() => {
    const session = getAuthSession();
    if (session?.id) {
      const clientProposals = getProposalsForClient(session.id);
      setProposals(clientProposals);
      if (clientProposals.length > 0 && !selectedProposalId) {
        setSelectedProposalId(clientProposals[0].id);
      }
    }
    setLoading(false);
  }, [selectedProposalId]);

  useEffect(() => {
    refreshProposals();

    // Listen for storage changes in case of multi-tab testing
    const handleStorage = (e) => {
      if (e.key === "vt_submitted_proposals") {
        refreshProposals();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refreshProposals]);

  const selected = useMemo(() => {
    return proposals.find((item) => item.id === selectedProposalId) || proposals[0];
  }, [proposals, selectedProposalId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 5);
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

  if (loading) {
    return (
      <ClientSectionLayout title="Proposal Review" description="Review worker proposals and take hiring action.">
        <div className="text-center p50">
          <div className="spinner-border text-thm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </ClientSectionLayout>
    );
  }

  if (proposals.length === 0) {
    return (
      <ClientSectionLayout title="Proposal Review" description="Review worker proposals and take hiring action.">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
          <h5 className="title mb10">No Proposals Received</h5>
          <p className="text">You haven't received any proposals for your tasks yet.</p>
          <Link href="/dashboard/create-task" className="ud-btn btn-thm mt10">
            Create a New Task
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </ClientSectionLayout>
    );
  }

  return (
    <ClientSectionLayout
      title="Proposal Review Page"
    >
      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <h5 className="title mb-0">Proposal List</h5>
              <p className="mb-0 text">
                {proposals.length} proposals received | Reviewing: {selected?.workerName}
              </p>
            </div>
            {proposals.map((item, index) => (
              <div
                key={item.id}
                className="p20 bdr1 bdrs4 mb15"
                style={{
                  borderColor: selected?.id === item.id ? "#5b5f97" : undefined,
                  boxShadow: selected?.id === item.id ? "0 0 0 1px #5b5f97 inset" : "none",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedProposalId(item.id)}
              >
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb15">
                  <div>
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle me-3 d-flex align-items-center justify-content-center bg-light fw600 text-thm"
                        style={{ width: "48px", height: "48px", fontSize: "18px" }}
                      >
                        {item.workerName?.charAt(0)}
                      </div>
                      <div>
                        <h6 className="mb5">{item.workerName}</h6>
                        <p className="text mb0">{item.workerEmail}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="badge bgc-thm4 text-dark mb5 text-capitalize">{item.status || "Pending"}</span>
                    <p className="mb0 fw500">${item.offerAmount}</p>
                    <p className="mb0 fz14 text">Timeline: {item.timeline ? (isNaN(item.timeline) ? item.timeline : `${item.timeline} Days`) : "N/A"}</p>
                  </div>
                </div>
                <p className="mb8 text">
                  <span className="fw500">Job Title:</span> {item.taskTitle}
                </p>
                <p className="text mb10">{item.coverLetter || "No cover letter provided."}</p>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <p className="mb0 fz14 text">
                    Rating 5.0
                    {renderStars(5)} | 0 jobs | 100% success
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
                {index !== proposals.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Cover Letter</h5>
            </div>
            <p className="mb10 text">
              <span className="fw500">Job Title:</span> {selected?.taskTitle}
            </p>
            <p className="text mb10">{selected?.coverLetter || "No cover letter provided."}</p>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Worker Informaiton</h5>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center bg-light fw600 text-thm"
                style={{ width: "56px", height: "56px", fontSize: "20px" }}
              >
                {selected?.workerName?.charAt(0)}
              </div>
              <div>
                <h6 className="mb5">{selected?.workerName}</h6>
                <p className="text mb0">{selected?.workerEmail}</p>
              </div>
            </div>
            <div className="mt20">
              <p className="mb8">
                <span className="fw500">Rating:</span> 5.0
                {renderStars(5)}
              </p>
              <p className="mb8">
                <span className="fw500">Completed Jobs:</span> 0
              </p>
              <p className="mb8">
                <span className="fw500">Success Rate:</span> 100%
              </p>
            </div>
            <div className="mt20">
              <button className="ud-btn btn-light w-100">
                Contact Worker
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Offer Details</h5>
            </div>
            <h4 className="mb10">${selected?.offerAmount}</h4>
            <p className="mb5">
              <span className="fw500">Offer Type:</span> <span className="text-capitalize">{selected?.offerType}</span>
            </p>
            <p className="mb5">
              <span className="fw500">Timeline:</span> {selected?.timeline}
            </p>
            <p className="text mb0">Includes full scope from task brief and revision support.</p>
          </div>
        </div>
      </div>
    </ClientSectionLayout>
  );
}
