'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardNavigation from "../../components/header/DashboardNavigation";
import OfferCard from "../../components/card/OfferCard";
import MilestoneCard from "../../components/card/MilestoneCard";
import ReviewForm from "../../components/section/ReviewForm";

const statusConfig = {
  POSTED: { label: "Posted", class: "badge-new" },
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute" },
  CANCELLED: { label: "Cancelled", class: "badge-cancelled" },
};

export default function ProjectDetailPage({ projectId }) {
  const [project, setProject] = useState(null);
  const [offers, setOffers] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [escrow, setEscrow] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingOffer, setAcceptingOffer] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProject();
      fetchOffers();
      fetchMilestones();
      fetchEscrow();
      fetchReviews();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/client/projects?clientId=client-001`);
      const data = await res.json();
      if (data.success) {
        const proj = data.data.find(p => p.id === projectId);
        setProject(proj);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch(`/api/client/offers?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMilestones = async () => {
    try {
      const res = await fetch(`/api/client/milestones?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        setMilestones(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchEscrow = async () => {
    try {
      const res = await fetch(`/api/client/escrow?projectId=${projectId}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setEscrow(data.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/client/reviews?projectId=${projectId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptOffer = async (offer) => {
    setAcceptingOffer(offer.id);
    try {
      const res = await fetch("/api/client/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept", offerId: offer.id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOffers();
        fetchProject();
        fetchEscrow();
      }
    } finally {
      setAcceptingOffer(null);
    }
  };

  const handleRejectOffer = async (offer) => {
    try {
      await fetch("/api/client/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject", offerId: offer.id }),
      });
      fetchOffers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleApproveMilestone = async (milestone) => {
    try {
      await fetch("/api/client/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", milestoneId: milestone.id }),
      });
      fetchMilestones();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="text-center p50">
          <i className="flaticon-folder fz60 text-muted mb20 d-block" />
          <h5 className="text-muted">Project not found</h5>
          <Link href="/client/manage-projects" className="ud-btn btn-thm mt20">
            Back to Projects
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[project.status] || statusConfig.POSTED;
  const acceptedOffer = offers.find(o => o.status === "ACCEPTED");
  const pendingOffers = offers.filter(o => o.status === "PENDING");

  if (showReviewForm) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Write Review</h2>
              <Link href={`/client/project/${projectId}`} className="text-thm">
                <i className="fal fa-arrow-left-long me-2" />
                Back to Project
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8">
            <ReviewForm
              project={{ id: project.id, title: project.title }}
              worker={acceptedOffer ? {
                id: acceptedOffer.workerId,
                name: acceptedOffer.workerName,
                avatar: acceptedOffer.workerAvatar,
              } : null}
              onSuccess={() => {
                setShowReviewForm(false);
                fetchReviews();
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="d-flex align-items-center gap-3 mb-3">
            <Link href="/client/manage-projects" className="text-muted">
              <i className="fal fa-arrow-left-long" />
            </Link>
            <div className="dashboard_title_area mb-0">
              <h2>{project.title}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-start mb20">
              <div>
                <span className={`badge ${status.class} mb10`}>{status.label}</span>
                <p className="text mb0">{project.description}</p>
              </div>
              <div className="text-end">
                <span className="fw600 fz20 text-thm">${project.budget.toLocaleString()}</span>
                <span className="d-block fz14 text-muted">{project.budgetModel === "MILESTONE" ? "Milestone Based" : "Fixed Price"}</span>
              </div>
            </div>

            <div className="row bdrbt1 pt20">
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Type</span>
                <span className="fw500">{project.type}</span>
              </div>
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Category</span>
                <span className="fw500">{project.category}</span>
              </div>
              <div className="col-md-3">
                <span className="fz14 text-muted d-block">Created</span>
                <span className="fw500">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              {project.workerId && (
                <div className="col-md-3">
                  <span className="fz14 text-muted d-block">Worker</span>
                  <span className="fw500">{acceptedOffer?.workerName || "Assigned"}</span>
                </div>
              )}
            </div>
          </div>

          {project.status === "POSTED" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="mb20">
                <i className="flaticon-contract me-2" />
                Offers ({offers.length})
              </h5>
              {pendingOffers.length === 0 ? (
                <div className="text-center p30 bdr1 bdrs8">
                  <i className="flaticon-time fz40 text-muted mb15" />
                  <p className="text-muted mb0">No offers received yet. Workers will submit offers soon.</p>
                </div>
              ) : (
                pendingOffers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    project={project}
                    onAccept={handleAcceptOffer}
                    onReject={handleRejectOffer}
                    loading={acceptingOffer === offer.id}
                  />
                ))
              )}
            </div>
          )}

          {(project.status === "ASSIGNED" || project.status === "IN_PROGRESS") && (
            <>
              {escrow && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <h5 className="mb20">
                    <i className="flaticon-security me-2" />
                    Escrow Status
                  </h5>
                  <div className="row">
                    <div className="col-md-3">
                      <span className="fz14 text-muted d-block">Amount</span>
                      <span className="fw600 fz18">${escrow.amount.toLocaleString()}</span>
                    </div>
                    <div className="col-md-3">
                      <span className="fz14 text-muted d-block">Platform Fee</span>
                      <span className="fz16">${escrow.platformFee?.toLocaleString()}</span>
                    </div>
                    <div className="col-md-3">
                      <span className="fz14 text-muted d-block">Net Amount</span>
                      <span className="fz16">${escrow.netAmount?.toLocaleString()}</span>
                    </div>
                    <div className="col-md-3">
                      <span className="fz14 text-muted d-block">Status</span>
                      <span className={`badge ${escrow.status === "FUNDED" ? "bg-success" : "bg-secondary"}`}>
                        {escrow.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {project.budgetModel === "MILESTONE" && milestones.length > 0 && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <h5 className="mb20">
                    <i className="flaticon-checklist me-2" />
                    Milestones ({milestones.length})
                  </h5>
                  {milestones.map((milestone) => (
                    <MilestoneCard
                      key={milestone.id}
                      milestone={milestone}
                      onApprove={handleApproveMilestone}
                      loading={false}
                    />
                  ))}
                </div>
              )}

              {acceptedOffer && (
                <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                  <h5 className="mb20">
                    <i className="flaticon-user me-2" />
                    Assigned Worker
                  </h5>
                  <div className="d-flex align-items-center">
                    <img
                      src={acceptedOffer.workerAvatar || "/images/team/freelancer-1.png"}
                      alt={acceptedOffer.workerName}
                      className="rounded-circle me-3"
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="mb5">{acceptedOffer.workerName}</h6>
                      <div className="d-flex align-items-center gap-3">
                        <span className="fz14">
                          <i className="flaticon-star text-thm me-1" />
                          {acceptedOffer.workerRating || 0}
                        </span>
                        <span className="fz14 text-muted">
                          {acceptedOffer.workerCompletedTasks || 0} tasks completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {project.status === "COMPLETED" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="mb20">
                <i className="flaticon-star me-2" />
                Reviews
              </h5>
              {reviews.length === 0 ? (
                <div className="text-center p30 bdr1 bdrs8">
                  <i className="flaticon-star fz40 text-muted mb15" />
                  <p className="text-muted mb0">No reviews yet</p>
                  <button
                    className="ud-btn btn-thm mt20"
                    onClick={() => setShowReviewForm(true)}
                  >
                    Write a Review
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bdrbt1 pb20 mb20">
                    <div className="d-flex align-items-center mb10">
                      <img
                        src={review.workerAvatar || "/images/team/freelancer-1.png"}
                        alt={review.workerName}
                        className="rounded-circle me-3"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                      />
                      <div>
                        <h6 className="mb0">{review.workerName}</h6>
                        <div>
                          {[...Array(5)].map((_, si) => (
                            <i
                              key={si}
                              className={`fas fa-star fz10 ${si < review.rating ? "review-color" : "text-muted"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="ms-auto fz14 text-muted">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text mb0">{review.comment}</p>
                  </div>
                ))
              )}
              {reviews.length === 0 && (
                <button
                  className="ud-btn btn-thm mt20"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write a Review
                  <i className="fal fa-arrow-right-long" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="col-xl-4">
          {/* <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="mb20">Quick Actions</h5>
            <div className="d-grid gap-2">
              {(project.status === "ASSIGNED" || project.status === "IN_PROGRESS" || project.status === "SUBMITTED") && (
                <Link
                  href="/client/message"
                  className="ud-btn btn-dark"
                >
                  Message Worker
                  <i className="fal fa-envelope" />
                </Link>
              )}
              {project.status === "COMPLETED" && (
                <button
                  className="ud-btn btn-thm"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write Review
                  <i className="fal fa-star" />
                </button>
              )}
            </div>
          </div> */}

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <h5 className="mb20">Project Stats</h5>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Total Offers</span>
              <span className="fw500">{offers.length}</span>
            </div>
            <div className="stat-item d-flex justify-content-between mb10">
              <span className="text-muted">Accepted</span>
              <span className="fw500">{acceptedOffer ? 1 : 0}</span>
            </div>
            {project.budgetModel === "MILESTONE" && (
              <div className="stat-item d-flex justify-content-between mb10">
                <span className="text-muted">Milestones</span>
                <span className="fw500">{milestones.length}</span>
              </div>
            )}
            <div className="stat-item d-flex justify-content-between">
              <span className="text-muted">Reviews</span>
              <span className="fw500">{reviews.length}</span>
            </div>
          </div>

          {escrow && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h5 className="mb20">Escrow Summary</h5>
              <div className="text-center">
                <span className={`badge ${escrow.status === "FUNDED" ? "bg-success" : escrow.status === "RELEASED" ? "bg-primary" : "bg-warning"} mb15`}>
                  {escrow.status}
                </span>
                <h3 className="mb5">${escrow.amount.toLocaleString()}</h3>
                <span className="text-muted">Total Budget</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
