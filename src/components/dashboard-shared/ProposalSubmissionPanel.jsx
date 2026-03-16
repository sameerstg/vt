"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { taskDiscoveryItems } from "@/data/taskDiscovery";
import { getAuthSession, getAllClientTasks, submitProposal } from "@/utils/auth/mockAuth";

const SUBMITTED_PROPOSALS_KEY = "vt_submitted_proposals";

export default function ProposalSubmissionPanel() {
  const searchParams = useSearchParams();
  const preselectedTaskId = searchParams.get("taskId") || "";
  const preselectedTaskTitle = searchParams.get("taskTitle") || "";
  const urlClientId = searchParams.get("clientId") || "";
  const urlClientEmail = searchParams.get("clientEmail") || "";

  const [dynamicTasks, setDynamicTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setDynamicTasks(getAllClientTasks());
    setCurrentUser(getAuthSession());
  }, []);

  const allAvailableTasks = useMemo(() => {
    return [...taskDiscoveryItems, ...dynamicTasks];
  }, [dynamicTasks]);

  const matchedTaskById = useMemo(
    () => allAvailableTasks.find((task) => String(task.id) === String(preselectedTaskId)) || null,
    [preselectedTaskId, allAvailableTasks]
  );

  const [offerType, setOfferType] = useState("accept");
  const [selectedTaskId, setSelectedTaskId] = useState(preselectedTaskId || "");
  const [offerAmount, setOfferAmount] = useState("");
  const [timeline, setTimeline] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedTask = useMemo(() => {
    if (selectedTaskId) {
      return allAvailableTasks.find((task) => String(task.id) === String(selectedTaskId)) || null;
    }
    return matchedTaskById;
  }, [matchedTaskById, selectedTaskId, allAvailableTasks]);

  const selectedTaskTitle = selectedTask?.title || preselectedTaskTitle || "";
  const selectedTaskValid = Boolean(selectedTaskTitle);
  // Ensure we have a clientId either from the resolved task or the URL
  const resolvedClientId = selectedTask?.clientId || urlClientId;
  const clientIdValid = Boolean(resolvedClientId);

  const amountValid = Number(offerAmount) > 0;
  const timelineValid = timeline.trim().length > 0;
  
  // Requirement: selectedTask must be resolved (or have URL fallback) to ensure clientId is captured
  const canSubmit = selectedTaskValid && clientIdValid && amountValid && timelineValid && termsAccepted;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (!canSubmit) {
      setIsSubmitted(false);
      return;
    }

    try {
      const payload = {
        id: `proposal-${Date.now()}`,
        taskId: selectedTask?.id || preselectedTaskId || "",
        taskTitle: selectedTaskTitle,
        clientId: resolvedClientId || "client-demo-1", 
        clientEmail: selectedTask?.clientEmail || urlClientEmail || "client@veritask.demo",
        workerId: currentUser?.id || "worker-demo",
        workerName: currentUser?.name || "Demo Worker",
        workerEmail: currentUser?.email || "worker@veritask.demo",
        offerType,
        offerAmount: Number(offerAmount),
        timeline: timeline.trim(),
        coverLetter: coverLetter.trim(),
        submittedAt: new Date().toISOString(),
        status: "pending"
      };
      
      await submitProposal(payload);
    } catch {
      // Keep UI responsive
    }

    setIsSubmitted(true);
  };

  return (
    <div className="row g-4">
      <div className="col-xl-8">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <h5 className="title mb20">Proposal Form</h5>
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Selected Task</label>
              <select
                className={`form-select${submitAttempted && !selectedTaskValid ? " border-danger" : ""}`}
                value={selectedTaskId}
                onChange={(event) => setSelectedTaskId(event.target.value)}
              >
                <option value="">Select task</option>
                {allAvailableTasks.map((task) => (
                  <option key={task.id} value={String(task.id)}>
                    {task.title}
                  </option>
                ))}
              </select>
              {selectedTaskTitle && (
                <small className="text d-block mt5">Selected: {selectedTaskTitle}</small>
              )}
              {submitAttempted && !selectedTaskValid && (
                <small className="text-danger d-block mt5">Task selection is required.</small>
              )}
            </div>

            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10 d-block">Offer Type (Accept Price / Custom)</label>
              <div className="d-flex flex-wrap gap-3">
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="offerType"
                    className="form-check-input me-2"
                    checked={offerType === "accept"}
                    onChange={() => setOfferType("accept")}
                  />
                  Accept Price
                </label>
                <label className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="offerType"
                    className="form-check-input me-2"
                    checked={offerType === "custom"}
                    onChange={() => setOfferType("custom")}
                  />
                  Custom
                </label>
              </div>
            </div>

            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Offer Amount</label>
              <input
                type="number"
                className={`form-control${submitAttempted && !amountValid ? " border-danger" : ""}`}
                placeholder="e.g. 500"
                value={offerAmount}
                onChange={(event) => setOfferAmount(event.target.value)}
              />
              {submitAttempted && !amountValid && (
                <small className="text-danger d-block mt5">Offer amount is required.</small>
              )}
            </div>

            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Timeline</label>
              <input
                type="text"
                className={`form-control${submitAttempted && !timelineValid ? " border-danger" : ""}`}
                placeholder="e.g. 5 days"
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
              />
              {submitAttempted && !timelineValid && (
                <small className="text-danger d-block mt5">Timeline is required.</small>
              )}
            </div>

            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Optional Cover Letter</label>
              <textarea
                cols={30}
                rows={5}
                placeholder="Briefly explain your approach..."
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
              />
            </div>

            <button type="submit" className="ud-btn btn-thm">
              Submit Proposal
              <i className="fal fa-arrow-right-long" />
            </button>
          </form>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative h-100">
          <h5 className="title mb20">Terms Confirmation</h5>
          <label className="d-flex align-items-start mb15">
            <input
              type="checkbox"
              className="form-check-input mt-1 me-2"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />
            <span className="text">I confirm proposal amount, timeline, and delivery terms are accurate.</span>
          </label>
          {submitAttempted && !termsAccepted && (
            <small className="text-danger d-block mb15">Please accept terms before submitting.</small>
          )}

          {isSubmitted && (
            <div className="alert alert-success mt20 mb0" role="alert">
              Proposal submitted successfully.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
