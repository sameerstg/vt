"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import ReviewComment from "../element/ReviewComment";
import ReviewForm from "../section/ReviewForm";

const tab = ["All Reviews", "Projects", "Services"];

export default function ReviewsInfo() {
  const [currentTab, setCurrentTab] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/client/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleWriteReview = (review) => {
    setSelectedProject({ id: review.projectId, title: review.projectTitle });
    setSelectedWorker({
      id: review.workerId,
      name: review.workerName,
      avatar: review.workerAvatar,
    });
    setShowForm(true);
  };

  if (showForm) {
    return (
      <>
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>Write Review</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8">
              <ReviewForm
                project={selectedProject}
                worker={selectedWorker}
                onSuccess={() => {
                  setShowForm(false);
                  fetchReviews();
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Reviews</h2>
              <p className="text">View reviews from your completed projects</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <div className="navtab-style1">
                  <nav>
                    <div className="nav nav-tabs mb30">
                      {tab.map((item, i) => (
                        <button
                          onClick={() => setCurrentTab(i)}
                          key={i}
                          className={`nav-link fw500 ps-0 ${currentTab === i ? "active" : ""}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </nav>

                  {loading ? (
                    <div className="text-center p50">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center p50">
                      <i className="flaticon-star fz60 text-muted mb20 d-block" />
                      <h5 className="text-muted">No reviews yet</h5>
                      <p className="text-muted">Complete projects to receive reviews from workers</p>
                    </div>
                  ) : (
                    <div className="reviews-list">
                      {reviews.map((review, i) => (
                        <div key={review.id} className={`pb20 ${i < reviews.length - 1 ? "bdrb1" : ""}`}>
                          <div className="d-flex align-items-start mb20">
                            <img
                              src={review.workerAvatar || "/images/team/freelancer-1.png"}
                              alt={review.workerName}
                              className="rounded-circle me-3"
                              style={{ width: 60, height: 60, objectFit: "cover" }}
                            />
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className="mt-0 mb-1">{review.workerName}</h6>
                                  <div className="d-flex align-items-center gap-3">
                                    <div>
                                      {[...Array(5)].map((_, si) => (
                                        <i
                                          key={si}
                                          className={`fas fa-star fz10 ${
                                            si < review.rating ? "review-color" : "text-muted"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="fz14 text-muted">
                                      {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="project-badge">
                                  <span className="badge bg-light text-dark">
                                    {review.projectTitle}
                                  </span>
                                </div>
                              </div>
                              <p className="text mt15 mb15">{review.comment}</p>
                              <button
                                className="ud-btn bgc-thm4 text-thm btn-sm"
                                onClick={() => handleWriteReview(review)}
                              >
                                Respond
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
