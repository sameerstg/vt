"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ClientSectionLayout from "./ClientSectionLayout";

export default function DisputedDetailsInfo({ item }) {
  const [reply, setReply] = useState("");
  const [updates, setUpdates] = useState(item.updates || []);

  const summary = useMemo(
    () => [
      { label: "Project", value: item.task },
      { label: "Worker", value: item.worker || "Assigned Worker" },
      { label: "Opened On", value: item.openedOn || "N/A" },
      { label: "Budget", value: item.budget || "N/A" },
      { label: "Escrow", value: item.escrowStatus || "On Hold" },
      { label: "Status", value: item.status || "Open" },
    ],
    [item]
  );

  const handleSendReply = (event) => {
    event.preventDefault();
    const trimmed = reply.trim();
    if (!trimmed) return;

    setUpdates((prev) => [
      ...prev,
      {
        id: `update-${Date.now()}`,
        sender: "You",
        time: "Just now",
        text: trimmed,
      },
    ]);
    setReply("");
  };

  return (
    <ClientSectionLayout title="Dispute Details" description="Review dispute context and track resolution.">
      <div className="mb20">
        <Link href="/dashboard/active-tasks?tab=disputed" className="ud-btn btn-light-default">
          ← Back to List
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Dispute Summary</h5>
            </div>

            <div className="dispute-issue-card mb20">
              <span className="dispute-status-pill">{item.status}</span>
              <h5 className="mb10 mt15">{item.task}</h5>
              <p className="mb0 text">{item.issue}</p>
            </div>

            <div className="dispute-summary-grid">
              {summary.map((entry) => (
                <div key={entry.label} className="dispute-summary-item">
                  <span>{entry.label}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>

            <div className="dispute-reason-box">
              <h6 className="mb10">Issue Details</h6>
              <p className="mb0 text">{item.reason}</p>
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Dispute Conversation</h5>
            </div>

            <div className="dispute-thread">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className={`dispute-thread-item ${update.sender === "You" ? "client" : "other"}`}
                >
                  <div className="dispute-thread-meta">
                    <strong>{update.sender}</strong>
                    <span>{update.time}</span>
                  </div>
                  <p className="mb-0">{update.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendReply} className="dispute-reply-bar">
              <input
                type="text"
                className="form-control"
                placeholder="Write a dispute update..."
                value={reply}
                onChange={(event) => setReply(event.target.value)}
              />
              <button type="submit" className="ud-btn btn-thm">
                Send
              </button>
            </form>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Evidence</h5>
            </div>

            <div className="row g-3">
              {(item.evidence || []).map((file) => (
                <div key={file.id} className="col-md-6">
                  <div className="evidence-card">
                    <div>
                      <p className="mb5 fw600">{file.name}</p>
                      <p className="mb0 text">{file.size}</p>
                    </div>
                    <button type="button" className="ud-btn btn-light-purple evidence-btn">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dispute-status-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 999px;
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: #991b1b;
          font-size: 12px;
          font-weight: 700;
        }

        .dispute-issue-card {
          padding: 20px;
          border-radius: 14px;
          background: linear-gradient(180deg, #fff7f7 0%, #fff 100%);
          border: 1px solid #fee2e2;
        }

        .dispute-summary-grid {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
        }

        .dispute-summary-item {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 14px 16px;
          background: #fff;
        }

        .dispute-summary-item span {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .dispute-reason-box {
          padding: 18px;
          border-radius: 12px;
          background: #fbfcff;
          border: 1px solid #e7ebf5;
        }

        .dispute-thread {
          max-height: 360px;
          overflow-y: auto;
          border: 1px solid #e7ebf5;
          border-radius: 14px;
          background: #fbfcff;
          padding: 18px;
          margin-bottom: 16px;
        }

        .dispute-thread-item {
          max-width: 85%;
          padding: 12px 14px;
          border-radius: 14px;
          margin-bottom: 12px;
        }

        .dispute-thread-item.other {
          background: #ffffff;
          border: 1px solid #e5e7eb;
        }

        .dispute-thread-item.client {
          margin-left: auto;
          background: #f4f0ff;
          border: 1px solid #ddd6fe;
        }

        .dispute-thread-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .dispute-reply-bar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
        }

        .evidence-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          background: #fbfcff;
          border: 1px solid #e7ebf5;
        }

        .evidence-btn {
          min-width: 82px;
        }

        @media (max-width: 767px) {
          .dispute-thread-item {
            max-width: 100%;
          }

          .dispute-reply-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ClientSectionLayout>
  );
}
