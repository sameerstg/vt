"use client";

import ClientSectionLayout from "./ClientSectionLayout";
import { acceptMockProposal, getAuthSession, getProposalsForClient, getTaskById } from "@/utils/auth/mockAuth";
import Link from "next/link";



import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";



export default function ProposalReviewInfo() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [filterTitle, setFilterTitle] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");



  const refreshProposals = useCallback(() => {
    const session = getAuthSession();
    if (session?.id) {
      const clientProposals = getProposalsForClient(session.id);
      setProposals(clientProposals);

      // If navigating from a specific task via taskId param
      if (taskId) {
        const task = getTaskById(taskId);
        if (task && task.title) {
          setFilterTitle(task.title);

          // Auto-select the first proposal for this specific task
          const taskProposals = clientProposals.filter(p => String(p.taskId) === String(taskId) || p.taskTitle === task.title);
          if (taskProposals.length > 0) {
            setSelectedProposalId(taskProposals[0].id);
          }
        }
      } else if (clientProposals.length > 0 && !selectedProposalId) {
        setSelectedProposalId(clientProposals[0].id);
      }
    }
    setLoading(false);


  }, [selectedProposalId, taskId]);




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

  const projectTitles = useMemo(() => {
    return ["All Projects", ...new Set(proposals.map((p) => p.taskTitle))];
  }, [proposals]);

  const filteredProposals = useMemo(() => {
    let list = proposals;
    if (filterTitle !== "All Projects") {
      list = list.filter((p) => p.taskTitle === filterTitle);
    }
    return list;
  }, [proposals, filterTitle]);

  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);

  const paginatedProposals = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProposals.slice(start, start + itemsPerPage);
  }, [filteredProposals, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterTitle]);

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

  const handleAcceptProposal = (proposal) => {
    if (!proposal || !proposal.taskId) return;

    const result = acceptMockProposal(proposal);

    if (result && result.ok) {
      refreshProposals();
      router.push("/dashboard/active-tasks?tab=progress");
    } else {
      alert(result?.message || "Failed to accept proposal.");
    }
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
      title="Proposal Review"
    >
      <div className="mb20">
        <Link href="/dashboard/active-tasks" className="text-thm fz14 fw500 d-flex align-items-center">
          <i className="fal fa-arrow-left me-2" />
          Back to Projects
        </Link>
      </div>
      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Proposal List</h5>
            </div>
            <div className="mb20">
              <p className="mb-0 text fz14">
                {filteredProposals.length} proposals found | Reviewing: {selected?.workerName}
              </p>
            </div>
            {paginatedProposals.map((item, index) => (
              <div
                key={item.id}
                className="p20 bdr1 bdrs12 mb15 proposal-card-premium transition"
                style={{
                  border: selected?.id === item.id ? "2px solid #5b2dff" : "1px solid #e9ecef",
                  backgroundColor: selected?.id === item.id ? "#f5f3ff" : "#fff",
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
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptProposal(item);
                    }}
                  >
                    Accept Proposal
                    <i className="fal fa-check" />
                  </button>
                  <button type="button" className="ud-btn btn-danger">
                    Reject Proposal
                    <i className="fal fa-xmark" />
                  </button>
                </div>
                {index !== paginatedProposals.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="worker-pagination mt30">
                <button
                  className="worker-pagination__nav"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`worker-pagination__page ${currentPage === page ? "is-active" : ""
                      }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="worker-pagination__nav"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>

              </div>
            )}
          </div>

        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Worker Information</h5>
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
              <h5 className="title mb-0">Cover Letter</h5>
            </div>
            <p className="mb10 text">
              <span className="fw500">Job Title:</span> {selected?.taskTitle}
            </p>
            <p className="text mb10">{selected?.coverLetter || "No cover letter provided."}</p>
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

          {selected?.attachments && selected.attachments.length > 0 && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb20">
                <h5 className="title mb-0">Worker Attachments</h5>
              </div>
              <div className="row g-2">
                {selected.attachments.map((file, i) => (
                  <div key={i} className="col-12">
                    <div className="project-attach p-2 border bdrs8 d-flex align-items-center">
                      <span className="icon flaticon-page me-2" style={{ fontSize: '20px', color: '#5b2dff' }} />
                      <div className="overflow-hidden flex-grow-1">
                        <h6 className="title fz13 mb-0 text-truncate" title={file}>{file}</h6>
                        <p className="fz12 text-uppercase mb-0">{file.split('.').pop()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .proposal-card-premium:hover {
          border-color: #5b2dff !important;
          box-shadow: 0 4px 12px rgba(91, 45, 255, 0.08);
          transform: translateY(-2px);
        }
        .transition {
          transition: all 0.3s ease;
        }
        .worker-pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .worker-pagination__page,
        .worker-pagination__nav {
          min-width: 42px;
          height: 42px;
          border-radius: 4px;
          border: 1px solid #dbe1ee;
          background: #ffffff;
          font-weight: 600;
          cursor: pointer;
        }
        .worker-pagination__page.is-active {
          border-color: #5b2dff;
          background: #f7f7f7;
          color: #5b2dff;
        }
        .worker-pagination__nav:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </ClientSectionLayout>
  );
}
