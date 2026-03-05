"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const DEFAULT_ACCEPT_AMOUNT = "1200";
const timelineOptions = [
  { value: "", label: "Select timeline" },
  { value: "1-3-days", label: "1 - 3 days" },
  { value: "4-7-days", label: "4 - 7 days" },
  { value: "1-2-weeks", label: "1 - 2 weeks" },
  { value: "2-4-weeks", label: "2 - 4 weeks" },
  { value: "1-month+", label: "1 month+" },
];

const toNumber = (value = "") => Number(value.replace(/,/g, "").trim());

export default function ProposalSubmissionInfo() {
  const [offerType, setOfferType] = useState("accept");
  const [offerAmount, setOfferAmount] = useState(DEFAULT_ACCEPT_AMOUNT);
  const [timeline, setTimeline] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [confirmPolicy, setConfirmPolicy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOfferTypeChange = (type) => {
    setOfferType(type);
    if (type === "accept") {
      setOfferAmount(DEFAULT_ACCEPT_AMOUNT);
      setFieldErrors((prev) => ({ ...prev, offerAmount: undefined }));
    }
  };

  const validate = () => {
    const errors = {};
    const parsedAmount = toNumber(offerAmount);

    if (!offerAmount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      errors.offerAmount = "Offer amount is required.";
    }
    if (!timeline) {
      errors.timeline = "Timeline is required.";
    }
    if (coverLetter.length > 1500) {
      errors.coverLetter = "Cover letter should be under 1500 characters.";
    }
    if (!confirmTerms) {
      errors.confirmTerms = "You must accept terms before submission.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
  };

  const selectedTimelineLabel = useMemo(() => {
    const selected = timelineOptions.find((item) => item.value === timeline);
    return selected ? selected.label : "Not selected";
  }, [timeline]);

  const offerAmountClass = `form-control${fieldErrors.offerAmount ? " border-danger" : ""}`;
  const timelineClass = `form-control${fieldErrors.timeline ? " border-danger" : ""}`;
  const textareaClass = `${fieldErrors.coverLetter ? "border-danger" : ""}`;
  const selectStyle = {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage:
      "linear-gradient(45deg, transparent 50%, #6b7280 50%), linear-gradient(135deg, #6b7280 50%, transparent 50%)",
    backgroundPosition:
      "calc(100% - 20px) calc(50% - 3px), calc(100% - 14px) calc(50% - 3px)",
    backgroundSize: "6px 6px, 6px 6px",
    backgroundRepeat: "no-repeat",
    paddingRight: "44px",
    cursor: "pointer",
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Proposal Submission</h2>
            <p className="text">Purpose: Submit offer.</p>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              Proposal submitted successfully.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xxl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Proposal Form</h5>
              </div>
              <div className="form-style1">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb25">
                      <label className="heading-color ff-heading fw500 mb10">Offer Type</label>
                      <div className="offer-type-wrap">
                        <button
                          type="button"
                          className={`offer-type-btn ${offerType === "accept" ? "active" : ""}`}
                          onClick={() => handleOfferTypeChange("accept")}
                        >
                          Accept Price
                        </button>
                        <button
                          type="button"
                          className={`offer-type-btn ${offerType === "custom" ? "active" : ""}`}
                          onClick={() => handleOfferTypeChange("custom")}
                        >
                          Custom
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="heading-color ff-heading fw500 mb10">Offer Amount</label>
                      <div className="position-relative">
                        <span className="offer-amount-prefix">$</span>
                        <input
                          type="text"
                          inputMode="decimal"
                          className={offerAmountClass}
                          placeholder="Enter amount"
                          value={offerAmount}
                          onChange={(event) => setOfferAmount(event.target.value)}
                          readOnly={offerType === "accept"}
                          style={{ paddingLeft: "32px" }}
                        />
                      </div>
                      {offerType === "accept" && (
                        <small className="text d-block mt5">
                          Client listed price is auto-applied.
                        </small>
                      )}
                      {fieldErrors.offerAmount && (
                        <small className="text-danger d-block mt5">{fieldErrors.offerAmount}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb25">
                      <label className="heading-color ff-heading fw500 mb10">Timeline</label>
                      <select
                        className={timelineClass}
                        style={selectStyle}
                        value={timeline}
                        onChange={(event) => setTimeline(event.target.value)}
                      >
                        {timelineOptions.map((option) => (
                          <option key={option.value || "default"} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {fieldErrors.timeline && (
                        <small className="text-danger d-block mt5">{fieldErrors.timeline}</small>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb0">
                      <label className="heading-color ff-heading fw500 mb10">
                        Optional Cover Letter
                      </label>
                      <textarea
                        cols={30}
                        rows={7}
                        className={textareaClass}
                        placeholder="Write a short message for the client..."
                        value={coverLetter}
                        onChange={(event) => setCoverLetter(event.target.value)}
                      />
                      <div className="d-flex justify-content-between mt5">
                        {fieldErrors.coverLetter ? (
                          <small className="text-danger">{fieldErrors.coverLetter}</small>
                        ) : (
                          <small className="text">Optional</small>
                        )}
                        <small className="text">{coverLetter.length}/1500</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Terms Confirmation</h5>
              </div>

              <div className="checkbox-style1 mb15">
                <label className="custom_checkbox">
                  I agree to the platform terms and contract conditions.
                  <input
                    type="checkbox"
                    checked={confirmTerms}
                    onChange={(event) => setConfirmTerms(event.target.checked)}
                  />
                  <span className="checkmark" />
                </label>
                {fieldErrors.confirmTerms && (
                  <small className="text-danger d-block mt5">{fieldErrors.confirmTerms}</small>
                )}
              </div>

              <div className="checkbox-style1 mb25">
                <label className="custom_checkbox">
                  I confirm my pricing and timeline details are accurate.
                  <input
                    type="checkbox"
                    checked={confirmPolicy}
                    onChange={(event) => setConfirmPolicy(event.target.checked)}
                  />
                  <span className="checkmark" />
                </label>
              </div>

              <div className="bdrt1 pt20 mt20">
                <h6 className="mb10">Offer Snapshot</h6>
                <p className="mb5 text">
                  <strong>Type:</strong>{" "}
                  {offerType === "accept" ? "Accept Price" : "Custom"}
                </p>
                <p className="mb5 text">
                  <strong>Amount:</strong> ${offerAmount || "0"}
                </p>
                <p className="mb20 text">
                  <strong>Timeline:</strong> {selectedTimelineLabel}
                </p>
                <button type="submit" className="ud-btn btn-thm w-100">
                  Submit Offer
                  <i className="fal fa-arrow-right-long" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        .offer-type-wrap {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .offer-type-btn {
          border: 1px solid #dadde8;
          background: #fff;
          color: #4b5563;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          min-width: 140px;
        }

        .offer-type-btn.active {
          border-color: #5b2dff;
          color: #5b2dff;
          background: #f7f4ff;
        }

        .offer-amount-prefix {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
