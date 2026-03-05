"use client";

import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { assignedTask, assignedTaskMilestones } from "@/data/dashboardWorker";

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed")) return "style4";
  if (normalized.includes("progress")) return "style6";
  return "style5";
};

export default function WorkSubmissionInfo() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState("task");
  const [completionNote, setCompletionNote] = useState("");
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const milestoneOptions = useMemo(() => {
    const options = [{ id: "task", title: "Entire Task" }];
    assignedTaskMilestones.forEach((milestone) => {
      options.push({ id: String(milestone.id), title: milestone.title });
    });
    return options;
  }, []);

  const selectedMilestoneDetails = useMemo(() => {
    if (selectedMilestone === "task") return null;
    return assignedTaskMilestones.find(
      (milestone) => String(milestone.id) === selectedMilestone
    );
  }, [selectedMilestone]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files || []);

    const isFileDuplicate = (file, fileList) =>
      fileList.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

    const uniqueNewFiles = newFiles.filter(
      (file) => !isFileDuplicate(file, uploadedFiles)
    );

    if (uniqueNewFiles.length) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
      setFieldErrors((prev) => ({ ...prev, uploadedFiles: undefined }));
    }
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  const validate = () => {
    const errors = {};

    if (!uploadedFiles.length) {
      errors.uploadedFiles = "Please upload at least one file.";
    }
    if (!completionNote.trim()) {
      errors.completionNote = "Completion note is required.";
    }
    if (!markAsCompleted) {
      errors.markAsCompleted = "Please mark as completed to submit proof.";
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
    <div className="dashboard__content hover-bgc-color work-submission-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Work Submission</h2>
            <p className="text">Purpose: Submit completion proof.</p>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              Work proof submitted successfully.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xxl-8">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Upload Section</h5>
              </div>

              <div className="task-info-box mb25">
                <h6 className="mb5">{assignedTask.title}</h6>
                <p className="text mb0">
                  Client: {assignedTask.client} | Task ID: {assignedTask.id}
                </p>
              </div>

              <div className="row">
                {uploadedFiles.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="col-6 col-xl-3 position-relative">
                    <div className="project-attach">
                      <h6 className="title">{file.name.split(".")[0].substring(0, 16)}</h6>
                      <p className="text-uppercase">{file.name.split(".").pop()}</p>
                      <span className="icon flaticon-page" />
                    </div>
                    <button
                      type="button"
                      className="position-absolute ui-delete-btn"
                      onClick={() => handleFileDelete(file.name)}
                    >
                      x
                    </button>
                  </div>
                ))}

                <div className="col-6 col-xl-3">
                  <label>
                    <a className="upload-img">
                      Upload Files
                      <input
                        type="file"
                        className="d-none"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </a>
                  </label>
                </div>
              </div>

              {fieldErrors.uploadedFiles && (
                <small className="text-danger d-block mt10">{fieldErrors.uploadedFiles}</small>
              )}

              <div className="form-style1 mt25">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Completion Note</label>
                  <textarea
                    cols={30}
                    rows={6}
                    placeholder="Describe what you completed and include proof details..."
                    value={completionNote}
                    onChange={(event) => setCompletionNote(event.target.value)}
                    className={fieldErrors.completionNote ? "border-danger" : ""}
                  />
                  {fieldErrors.completionNote && (
                    <small className="text-danger d-block mt5">{fieldErrors.completionNote}</small>
                  )}
                </div>

                <div className="checkbox-style1 mb20">
                  <label className="custom_checkbox">
                    Mark as Completed
                    <input
                      type="checkbox"
                      checked={markAsCompleted}
                      onChange={(event) => setMarkAsCompleted(event.target.checked)}
                    />
                    <span className="checkmark" />
                  </label>
                  {fieldErrors.markAsCompleted && (
                    <small className="text-danger d-block mt5">{fieldErrors.markAsCompleted}</small>
                  )}
                </div>

                <button type="submit" className="ud-btn btn-thm">
                  Submit Completion Proof
                  <i className="fal fa-arrow-right-long" />
                </button>
              </div>
            </div>
          </div>

          <div className="col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Milestone Selector (if applicable)</h5>
              </div>

              <div className="form-style1">
                <div className="mb20">
                  <label className="heading-color ff-heading fw500 mb10">Select Milestone</label>
                  <select
                    className="form-control"
                    style={selectStyle}
                    value={selectedMilestone}
                    onChange={(event) => setSelectedMilestone(event.target.value)}
                  >
                    {milestoneOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="milestone-details-box">
                {selectedMilestoneDetails ? (
                  <>
                    <h6 className="mb10">{selectedMilestoneDetails.title}</h6>
                    <p className="text mb5">
                      <strong>Due Date:</strong> {selectedMilestoneDetails.dueDate}
                    </p>
                    <p className="text mb5">
                      <strong>Amount:</strong> {selectedMilestoneDetails.amount}
                    </p>
                    <p className="text mb0">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`pending-style ${getStatusClass(
                          selectedMilestoneDetails.status
                        )}`}
                      >
                        {selectedMilestoneDetails.status}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="text mb0">Submission will be applied to the full assigned task.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        .task-info-box,
        .milestone-details-box {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fbfcff;
          padding: 14px;
        }
      `}</style>
    </div>
  );
}
