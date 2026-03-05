"use client";

import { useMemo } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const clientRaisedDisputes = [
  {
    id: "DSP-3011",
    projectTitle: "Marketplace Checkout Revamp",
    clientName: "BluePeak Labs",
    raisedOn: "2026-02-27",
    reason: "Quality mismatch",
    description:
      "Client reported checkout screens do not match approved spacing and validation states from milestone scope.",
    supportingFiles: [
      { id: "f-1", name: "checkout-qa-report.pdf", size: "1.2 MB" },
      { id: "f-2", name: "ui-diff-screenshots.zip", size: "3.8 MB" },
    ],
    disputedAmount: "$420",
    status: "Open",
  },
  {
    id: "DSP-3012",
    projectTitle: "Mobile App Notification Module",
    clientName: "NovaScale",
    raisedOn: "2026-02-25",
    reason: "Timeline delay",
    description:
      "Client dispute states the second milestone was not delivered on agreed date and asks for revised schedule confirmation.",
    supportingFiles: [{ id: "f-3", name: "milestone-deadline-mail.pdf", size: "850 KB" }],
    disputedAmount: "$300",
    status: "Awaiting Contractor Response",
  },
  {
    id: "DSP-3007",
    projectTitle: "SEO Audit and Tracking Setup",
    clientName: "SellCraft",
    raisedOn: "2026-02-18",
    reason: "Scope clarification",
    description:
      "Client requested clarification on deliverables included in analytics setup and backlink recommendations for final handover.",
    supportingFiles: [
      { id: "f-4", name: "scope-reference.docx", size: "430 KB" },
      { id: "f-5", name: "client-comments.png", size: "640 KB" },
    ],
    disputedAmount: "$180",
    status: "Resolved",
  },
];

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("resolved")) return "style4";
  if (normalized.includes("awaiting")) return "style1";
  return "style5";
};

export default function DisputeSubmissionInfo() {
  const disputeStats = useMemo(() => {
    const total = clientRaisedDisputes.length;
    const open = clientRaisedDisputes.filter((item) => item.status === "Open").length;
    const awaiting = clientRaisedDisputes.filter((item) =>
      item.status.toLowerCase().includes("awaiting")
    ).length;
    const resolved = clientRaisedDisputes.filter((item) =>
      item.status.toLowerCase().includes("resolved")
    ).length;

    return { total, open, awaiting, resolved };
  }, []);

  return (
    <div className="dashboard__content hover-bgc-color contractor-dispute-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Dispute Submission</h2>
            <p className="text">
              Client-initiated disputes on your active projects. Contractor view is read-only.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <div className="ps-widget bgc-white bdrs4 p20 mb20 text-center">
            <h4 className="mb5">{disputeStats.total}</h4>
            <p className="text mb-0">Total Disputes</p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="ps-widget bgc-white bdrs4 p20 mb20 text-center">
            <h4 className="mb5">{disputeStats.open}</h4>
            <p className="text mb-0">Open</p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="ps-widget bgc-white bdrs4 p20 mb20 text-center">
            <h4 className="mb5">{disputeStats.awaiting}</h4>
            <p className="text mb-0">Awaiting Response</p>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="ps-widget bgc-white bdrs4 p20 mb20 text-center">
            <h4 className="mb5">{disputeStats.resolved}</h4>
            <p className="text mb-0">Resolved</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Dispute Overview</h5>
              <span className="text fz14">Client created records only</span>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Dispute ID</th>
                    <th scope="col">Project</th>
                    <th scope="col">Client</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Raised On</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {clientRaisedDisputes.map((item) => (
                    <tr key={item.id}>
                      <td className="vam fw500">{item.id}</td>
                      <td className="vam">{item.projectTitle}</td>
                      <td className="vam">{item.clientName}</td>
                      <td className="vam">{item.reason}</td>
                      <td className="vam">{item.raisedOn}</td>
                      <td className="vam">{item.disputedAmount}</td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Reason, Description and Supporting Files</h5>
            </div>
            <div className="row">
              {clientRaisedDisputes.map((item) => (
                <div key={`${item.id}-details`} className="col-xl-6">
                  <div className="dispute-card">
                    <div className="d-flex justify-content-between align-items-center gap-2 mb10">
                      <h6 className="mb-0">{item.projectTitle}</h6>
                      <span className={`pending-style ${getStatusClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mb8 text">
                      <strong>Reason:</strong> {item.reason}
                    </p>
                    <p className="mb10 text">
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p className="mb8 text">
                      <strong>Supporting Files:</strong>
                    </p>
                    <div className="file-chip-wrap">
                      {item.supportingFiles.map((file) => (
                        <span key={file.id} className="file-chip">
                          <i className="flaticon-page mr8" />
                          {file.name} ({file.size})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dispute-card {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          background: #fbfcff;
          padding: 16px;
          margin-bottom: 16px;
          height: calc(100% - 16px);
        }

        .file-chip-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .file-chip {
          display: inline-flex;
          align-items: center;
          border: 1px solid #dde3f1;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 12px;
          background: #ffffff;
          color: #374151;
        }
      `}</style>
    </div>
  );
}
