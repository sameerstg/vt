"use client";

import Link from "next/link";
import ClientSectionLayout from "./ClientSectionLayout";

export default function ClosedDetailsInfo({ item }) {
  const detailCards = [
    { label: "Project", value: item.task },
    { label: "Worker", value: item.worker || "Assigned Worker" },
    { label: "Closed On", value: item.closedOn || "N/A" },
    { label: "Budget", value: item.budget || "N/A" },
    { label: "Status", value: item.status || "Closed" },
  ];

  return (
    <ClientSectionLayout title="Closed Project Details" description="Review closed project and resolution summary.">
      <div className="mb20">
        <Link href="/dashboard/active-tasks?tab=closed" className="ud-btn btn-light-default">
          ← Back to List
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 h-100">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Closed Summary</h5>
            </div>

            <div className="closed-status-card mb20">
              <span className="closed-status-pill">{item.status}</span>
              <h5 className="mb10 mt15">{item.task}</h5>
              <p className="mb0 text">{item.issue}</p>
            </div>

            <div className="closed-detail-grid">
              {detailCards.map((card) => (
                <div key={card.label} className="closed-detail-item">
                  <span>{card.label}</span>
                  <strong>{card.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Resolution Details</h5>
            </div>
            <div className="closed-copy-box mb20">
              <h6 className="mb10">Resolution Outcome</h6>
              <p className="mb0 text">{item.resolution}</p>
            </div>
            <div className="closed-copy-box">
              <h6 className="mb10">Project Summary</h6>
              <p className="mb0 text">{item.summary}</p>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Case Timeline</h5>
            </div>
            <div className="closed-timeline">
              <div className="closed-timeline-item">
                <strong>Dispute Raised</strong>
                <span>Initial issue was recorded and review started.</span>
              </div>
              <div className="closed-timeline-item">
                <strong>Evidence Reviewed</strong>
                <span>Client and worker submissions were validated.</span>
              </div>
              <div className="closed-timeline-item">
                <strong>Case Closed</strong>
                <span>{item.closedOn}: {item.resolution}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .closed-status-card {
          padding: 20px;
          border-radius: 14px;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          border: 1px solid #e5e7eb;
        }

        .closed-status-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 999px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #374151;
          font-size: 12px;
          font-weight: 700;
        }

        .closed-detail-grid {
          display: grid;
          gap: 12px;
        }

        .closed-detail-item {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 14px 16px;
          background: #fff;
        }

        .closed-detail-item span {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .closed-copy-box {
          padding: 18px;
          border-radius: 12px;
          background: #fbfcff;
          border: 1px solid #e7ebf5;
        }

        .closed-timeline {
          display: grid;
          gap: 14px;
        }

        .closed-timeline-item {
          padding: 16px;
          border-radius: 12px;
          background: #fbfcff;
          border: 1px solid #e7ebf5;
        }

        .closed-timeline-item strong {
          display: block;
          margin-bottom: 6px;
        }

        .closed-timeline-item span {
          color: #4b5563;
          font-size: 14px;
        }
      `}</style>
    </ClientSectionLayout>
  );
}
