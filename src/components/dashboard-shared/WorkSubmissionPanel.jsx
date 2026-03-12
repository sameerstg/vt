"use client";

import { useMemo, useState } from "react";

const milestoneOptions = [
  { id: "ms-1", title: "Milestone 1 - Initial Draft" },
  { id: "ms-2", title: "Milestone 2 - Revision + QA" },
  { id: "ms-3", title: "Milestone 3 - Final Delivery" },
];

export default function WorkSubmissionPanel({
  showMilestoneSelector = true,
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [completionNote, setCompletionNote] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState(showMilestoneSelector ? "ms-1" : "");
  const [isMarkedCompleted, setIsMarkedCompleted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const hasFiles = uploadedFiles.length > 0;
  const noteValid = completionNote.trim().length > 0;
  const milestoneValid = !showMilestoneSelector || Boolean(selectedMilestone);
  const canSubmit = hasFiles && noteValid && milestoneValid;

  const selectedMilestoneTitle = useMemo(() => {
    if (!showMilestoneSelector) return "N/A";
    const found = milestoneOptions.find((item) => item.id === selectedMilestone);
    return found?.title || "N/A";
  }, [selectedMilestone, showMilestoneSelector]);

  const onFileChange = (event) => {
    const fileList = Array.from(event.target.files || []);
    setUploadedFiles(fileList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (!canSubmit) {
      setIsMarkedCompleted(false);
      return;
    }
    setIsMarkedCompleted(true);
  };

  return (
    <div className="row g-4">
      <div className="col-xl-8">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <h5 className="title mb20">Upload Section</h5>
          <form className="form-style1" onSubmit={handleSubmit}>
            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Upload Files</label>
              <input type="file" className="form-control" multiple onChange={onFileChange} />
              {submitAttempted && !hasFiles && (
                <small className="text-danger d-block mt5">Please upload at least one file.</small>
              )}
              {hasFiles && (
                <div className="mt10">
                  {uploadedFiles.map((file) => (
                    <span key={`${file.name}-${file.size}`} className="badge bgc-thm3 text-dark me-2 mb-2">
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb25">
              <label className="heading-color ff-heading fw500 mb10">Completion Note</label>
              <textarea
                cols={30}
                rows={5}
                placeholder="Add proof summary, delivered scope, and verification notes..."
                value={completionNote}
                onChange={(event) => setCompletionNote(event.target.value)}
                className={submitAttempted && !noteValid ? "border-danger" : ""}
              />
              {submitAttempted && !noteValid && (
                <small className="text-danger d-block mt5">Completion note is required.</small>
              )}
            </div>

            <button type="submit" className="ud-btn btn-thm">
              Mark as Completed
              <i className="fal fa-arrow-right-long" />
            </button>
          </form>
        </div>
      </div>

      <div className="col-xl-4">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative h-100">
          {showMilestoneSelector && (
            <>
              <h5 className="title mb15">Milestone Selector (if applicable)</h5>
              <div className="mb20">
                <select
                  className="form-select"
                  value={selectedMilestone}
                  onChange={(event) => setSelectedMilestone(event.target.value)}
                >
                  {milestoneOptions.map((milestone) => (
                    <option key={milestone.id} value={milestone.id}>
                      {milestone.title}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {isMarkedCompleted && (
            <div className="alert alert-success mt20 mb0" role="alert">
              Work submitted successfully.
              <br />
              <small>Milestone: {selectedMilestoneTitle}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
