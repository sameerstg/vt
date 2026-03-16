import ClientSectionLayout from "./ClientSectionLayout";
import Link from "next/link";

export default function WorkReviewApprovalInfo({ review }) {
  const getMilestoneBadgeClass = (status) => {
    if (status === "Approved") return "badge bg-success";
    if (status === "Under Review") return "badge bg-warning text-dark";
    if (status === "Submitted") return "badge bg-info text-dark";
    return "badge bg-secondary";
  };

  return (
    <ClientSectionLayout
      title="Work Review & Approval Page"
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h5 className="title mb-0">Task Context</h5>
          <p className="mb-0 text">{review.jobId}</p>
        </div>
        <h4 className="mb10">{review.jobTitle}</h4>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <p className="mb0 text">
            Submitted by <span className="fw500">{review.workerName}</span> | Offer Amount {review.offerAmount}
          </p>
          <Link href={review.workerProfilePath} className="ud-btn btn-light">
            View Worker Profile
            <i className="fal fa-arrow-right-long" />
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Submission Files</h5>
            </div>
            {review.submissionFiles.map((file, index) => (
              <div key={file.name}>
                <div className="d-flex justify-content-between align-items-center py10 flex-wrap gap-2">
                  <div>
                    <p className="mb5 fw500">{file.name}</p>
                    <p className="mb0 text fz14">
                      {file.type} | {file.size}
                    </p>
                  </div>
                  <button type="button" className="ud-btn btn-light">
                    Download
                    <i className="fal fa-download" />
                  </button>
                </div>
                {index !== review.submissionFiles.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Revision Request</h5>
            </div>
            <p className="text mb15">
              If updates are needed, mention exact changes before approval.
            </p>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Write revision notes (e.g. spacing fixes, copy changes, missing files)..."
            />
            <div className="form-check mt15 mb15">
              <input className="form-check-input" type="checkbox" id="notifyWorker" defaultChecked />
              <label className="form-check-label" htmlFor="notifyWorker">
                Notify worker immediately after sending revision request.
              </label>
            </div>
            <div className="mt15">
              <button type="button" className="ud-btn btn-light">
                Send Revision Request
                <i className="fal fa-paper-plane" />
              </button>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Milestone Status</h5>
            </div>
            {review.milestones.map((milestone, index) => (
              <div key={milestone.id} className="mb15">
                <div className="d-flex justify-content-between align-items-center gap-2 mb5">
                  <p className="mb0 fw500">{milestone.title}</p>
                  <span className={getMilestoneBadgeClass(milestone.status)}>{milestone.status}</span>
                </div>
                <p className="mb0 text fz14">Submitted: {milestone.submittedOn}</p>
                {index !== review.milestones.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Actions</h5>
            </div>
            <div className="d-grid gap-2">
              <button type="button" className="ud-btn btn-thm w-100">
                Approve Work
                <i className="fal fa-check" />
              </button>
              <Link href={`/dashboard/feedback/${review.id}`} className="ud-btn btn-light w-100 text-center">
                Open Feedback
                <i className="fal fa-arrow-right-long" />
              </Link>
              <button type="button" className="ud-btn btn-danger w-100">
                Raise Dispute
                <i className="fal fa-triangle-exclamation" />
              </button>
            </div>
            <p className="text fz13 mt15 mb0">
              Approval will release milestone payment. Dispute will open resolution workflow.
            </p>
          </div>
        </div>
      </div>
    </ClientSectionLayout>
  );
}
