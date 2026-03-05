"use client";

import { useState } from "react";

const timelineOptions = [
  { value: "", label: "Select timeline" },
  { value: "1-3-days", label: "1 - 3 days" },
  { value: "4-7-days", label: "4 - 7 days" },
  { value: "1-2-weeks", label: "1 - 2 weeks" },
  { value: "2-4-weeks", label: "2 - 4 weeks" },
  { value: "1-month+", label: "1 month+" },
];

export default function SubmitProposal1() {
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState("");
  const [timeline, setTimeline] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const validate = () => {
    const errors = {};
    const priceNumber = Number(price);

    if (!price || Number.isNaN(priceNumber) || priceNumber <= 0) {
      errors.price = "Please enter a valid price.";
    }
    if (!timeline) errors.timeline = "Please select a timeline.";
    if (coverLetter.length > 1500) {
      errors.coverLetter = "Cover letter should be under 1500 characters.";
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length) {
      addToast("error", "Please fix the highlighted fields.");
      return;
    }

    addToast("success", "Proposal submitted successfully.");
    setPrice("");
    setTimeline("");
    setCoverLetter("");
  };

  const inputClass = (name) =>
    `form-control${fieldErrors[name] ? " border-danger" : ""}`;
  const textareaClass = `pt15${fieldErrors.coverLetter ? " border-danger" : ""}`;
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
  const currencySelectStyle = {
    ...selectStyle,
    minHeight: "52px",
    width: "118px",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: "0",
    backgroundPosition:
      "calc(100% - 16px) calc(50% - 3px), calc(100% - 10px) calc(50% - 3px)",
  };
  const timelineSelectStyle = {
    ...selectStyle,
    minHeight: "52px",
  };
  const priceInputStyle = {
    minHeight: "52px",
    paddingLeft: "38px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };
  const isUsd = currency === "USD";
  const currencyIconClass = isUsd ? "fas fa-dollar-sign" : "fas fa-euro-sign";

  return (
    <>
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1100,
          width: "min(360px, calc(100vw - 40px))",
        }}
      >
        {toasts.map((toast) => {
          const styles = {
            success: { bg: "#e8f8ee", border: "#9dd8b5", color: "#14532d" },
            error: { bg: "#fdecec", border: "#f6b0b0", color: "#7f1d1d" },
            info: { bg: "#e8f1ff", border: "#a8c5ff", color: "#1e3a8a" },
          };
          const currentStyle = styles[toast.type] || styles.info;
          return (
            <div
              key={toast.id}
              style={{
                background: currentStyle.bg,
                border: `1px solid ${currentStyle.border}`,
                color: currentStyle.color,
                borderRadius: "10px",
                padding: "12px 14px",
                marginBottom: "10px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {toast.message}
            </div>
          );
        })}
      </div>

      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-5">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">Submit Proposal</h4>
                  <p className="text">
                    Send your price, expected timeline, and optional cover letter to start
                    the conversation.
                  </p>
                </div>

                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-dollar" />
                  </div>
                  <div className="details">
                    <h5 className="title">Price</h5>
                    <p className="mb-0 text">Set your total offer or hourly rate.</p>
                  </div>
                </div>

                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-calendar" />
                  </div>
                  <div className="details">
                    <h5 className="title">Timeline</h5>
                    <p className="mb-0 text">Tell the client how fast you can deliver.</p>
                  </div>
                </div>

                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-mail" />
                  </div>
                  <div className="details">
                    <h5 className="title">Cover Letter (Optional)</h5>
                    <p className="mb-0 text">
                      Add a short message about your approach and experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Proposal Details</h4>
                <p className="text mb30">Complete the fields below and submit your proposal.</p>
                <form className="form-style1" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">Price</label>
                        <div className="d-flex align-items-stretch">
                          <select
                            className={`form-control${fieldErrors.price ? " border-danger" : ""}`}
                            value={currency}
                            onChange={(event) => setCurrency(event.target.value)}
                            style={currencySelectStyle}
                            aria-label="Select currency"
                          >
                            <option value="USD">$ USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                          <div className="position-relative flex-grow-1">
                            <span
                              className="position-absolute top-50 translate-middle-y"
                              style={{ left: "14px", color: "#6b7280", lineHeight: 1 }}
                            >
                              <i className={currencyIconClass} aria-hidden="true" />
                            </span>
                            <input
                              type="text"
                              inputMode="decimal"
                              className={inputClass("price")}
                              placeholder="Enter your price"
                              style={priceInputStyle}
                              value={price}
                              onChange={(event) => setPrice(event.target.value)}
                            />
                          </div>
                        </div>
                        {fieldErrors.price && (
                          <small className="text-danger d-block mt5">{fieldErrors.price}</small>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">Timeline</label>
                        <select
                          className={inputClass("timeline")}
                          style={timelineSelectStyle}
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
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Cover letter (optional)
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          className={textareaClass}
                          placeholder="Write a short message for the client..."
                          value={coverLetter}
                          onChange={(event) => setCoverLetter(event.target.value)}
                        />
                        {fieldErrors.coverLetter && (
                          <small className="text-danger d-block mt5">
                            {fieldErrors.coverLetter}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button type="submit" className="ud-btn btn-thm">
                        Submit Proposal
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

