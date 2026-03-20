"use client";

import { useState } from "react";
import { getOffersByTask } from "@/data/veritask/offers";
import { getUserById } from "@/data/veritask/users";
import api from "@/modules/shared/utils/api";

export default function OfferReviewer({ task, onOfferAccepted }) {
  const [loading, setLoading] = useState(null);
  const offers = task ? getOffersByTask(task.id) : [];

  const handleAcceptOffer = async (offer) => {
    setLoading(offer.id);
    try {
      const result = await api.client.acceptOffer(offer.id);
      if (result.success && onOfferAccepted) {
        onOfferAccepted(offer);
      }
    } finally {
      setLoading(null);
    }
  };

  const handleRejectOffer = async (offerId) => {
    setLoading(offerId);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setLoading(null);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a task to view offers</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Review Offers</h4>
      <p className="text mb20">Task: {task.title}</p>

      {offers.length === 0 ? (
        <p className="text-center">No offers received yet</p>
      ) : (
        <div className="offers-list">
          {offers.map((offer) => {
            const worker = getUserById(offer.workerId);
            return (
              <div key={offer.id} className="offer-card bdr1 p20 mb15 bdrs8">
                <div className="d-flex align-items-center mb15">
                  <div className="freelancer-box">
                    <img
                      src={worker?.avatar || "/images/team/freelancer-1.png"}
                      alt={worker?.name}
                      className="w-100"
                    />
                  </div>
                  <div className="ml15">
                    <h6 className="mb5">{worker?.name || "Unknown Worker"}</h6>
                    <div className="d-flex align-items-center">
                      <span className="fz14">
                        <i className="flaticon-star text-thm" /> {worker?.rating || 0}
                      </span>
                      <span className="fz14 ml20">
                        {worker?.completedTasks || 0} tasks completed
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb15">
                  <p className="text mb5">{offer.terms}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw600 fz18">${offer.amount}</span>
                  </div>
                  <div className="d-flex gap10">
                    <button
                      className="ud-btn btn-thm"
                      onClick={() => handleAcceptOffer(offer)}
                      disabled={loading === offer.id}
                    >
                      {loading === offer.id ? "Processing..." : "Accept"}
                    </button>
                    <button
                      className="ud-btn btn-dark"
                      onClick={() => handleRejectOffer(offer.id)}
                      disabled={loading === offer.id}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
