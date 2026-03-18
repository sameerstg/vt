"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ClientSectionLayout from "./ClientSectionLayout";
import { getMockTaskById } from "@/utils/auth/mockAuth";

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

export default function InProgressChatInfo() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const fallbackTaskTitle = searchParams.get("taskTitle");
  const fallbackFreelancer = searchParams.get("freelancer");

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function loadTask() {
      if (!taskId) {
        setLoading(false);
        return;
      }

      const taskData = await getMockTaskById(taskId);
      setTask(taskData);
      setLoading(false);
    }

    loadTask();
  }, [taskId]);

  useEffect(() => {
    const workerName = task?.freelancer || fallbackFreelancer || "Assigned Worker";
    const taskTitle = task?.title || fallbackTaskTitle || "Current Project";

    setMessages([
      {
        id: 1,
        sender: "worker",
        senderName: workerName,
        time: "10:18 AM",
        text: `Hi, I have started working on ${taskTitle} and the initial setup is complete.`,
      },
      {
        id: 2,
        sender: "client",
        senderName: "You",
        time: "10:24 AM",
        text: "Good. Please keep me posted on the milestone progress and share blockers early.",
      },
      {
        id: 3,
        sender: "worker",
        senderName: workerName,
        time: "10:31 AM",
        text: "Understood. I will send the next update with screenshots before end of day.",
      },
    ]);
  }, [task, fallbackFreelancer, fallbackTaskTitle]);

  const workerName = task?.freelancer || fallbackFreelancer || "Assigned Worker";
  const taskTitle = task?.title || fallbackTaskTitle || "In Progress Project";
  const taskEta = task?.timeline || "In Progress";

  const stats = useMemo(
    () => [
      { label: "Project", value: taskTitle },
      { label: "Freelancer", value: workerName },
      { label: "ETA", value: taskEta },
      { label: "Status", value: "In Progress" },
    ],
    [taskEta, taskTitle, workerName]
  );

  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "client",
        senderName: "You",
        time: formatTime(),
        text: trimmed,
      },
    ]);
    setMessage("");
  };

  if (loading) {
    return (
      <ClientSectionLayout title="Project Chat" description="Loading conversation...">
        <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
          <p className="mb-0">Loading...</p>
        </div>
      </ClientSectionLayout>
    );
  }

  return (
    <ClientSectionLayout
      title="Project Chat"
      description="Coordinate with your assigned freelancer."
    >
      <div className="mb20">
        <Link href="/dashboard/active-tasks?tab=progress" className="ud-btn btn-light-default">
          ← Back to List
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 h-100">
            <div className="bdrb1 pb15 mb20">
              <h5 className="mb-0">Conversation Details</h5>
            </div>

            <div className="chat-profile-card">
              <div className="chat-avatar">{workerName.charAt(0)}</div>
              <div>
                <h6 className="mb5">{workerName}</h6>
                <p className="text mb0">Assigned freelancer</p>
              </div>
            </div>

            <div className="chat-stats-grid">
              {stats.map((item) => (
                <div key={item.label} className="chat-stat-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="chat-note-box">
              <h6 className="mb10">Project Note</h6>
              <p className="mb0 text">
                Use this thread for milestone updates, questions, file coordination, and delivery clarifications.
              </p>
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h5 className="mb5">{taskTitle}</h5>
                <p className="text mb0">Direct chat with {workerName}</p>
              </div>
              <span className="chat-status-pill">In Progress</span>
            </div>

            <div className="chat-thread-panel">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`chat-bubble ${item.sender === "client" ? "client" : "worker"}`}
                >
                  <div className="chat-bubble-meta">
                    <strong>{item.senderName}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p className="mb-0">{item.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="chat-compose-bar">
              <input
                type="text"
                className="form-control"
                placeholder={`Write a message to ${workerName}...`}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button type="submit" className="ud-btn btn-thm">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-profile-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px;
          border: 1px solid #e7ebf5;
          border-radius: 12px;
          background: #fbfcff;
          margin-bottom: 20px;
        }

        .chat-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #5b2dff, #7c3aed);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
        }

        .chat-stats-grid {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
        }

        .chat-stat-item {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 14px 16px;
          background: #fff;
        }

        .chat-stat-item span {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
        }

        .chat-stat-item strong {
          display: block;
          font-size: 15px;
          color: #1f2937;
        }

        .chat-note-box {
          padding: 18px;
          border-radius: 12px;
          background: linear-gradient(180deg, #faf7ff 0%, #f3f0ff 100%);
          border: 1px solid #e9ddff;
        }

        .chat-status-pill {
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 999px;
          background: #e0f2fe;
          border: 1px solid #bae6fd;
          color: #0369a1;
          font-size: 12px;
          font-weight: 700;
        }

        .chat-thread-panel {
          min-height: 460px;
          max-height: 460px;
          overflow-y: auto;
          border: 1px solid #e7ebf5;
          border-radius: 16px;
          padding: 20px;
          background: linear-gradient(180deg, #fbfcff 0%, #f8f9fc 100%);
          margin-bottom: 18px;
        }

        .chat-bubble {
          max-width: 78%;
          padding: 14px 16px;
          border-radius: 16px;
          margin-bottom: 14px;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.04);
        }

        .chat-bubble.worker {
          background: #ffffff;
          border: 1px solid #e5e7eb;
        }

        .chat-bubble.client {
          margin-left: auto;
          background: #f4f0ff;
          border: 1px solid #ddd6fe;
        }

        .chat-bubble-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 12px;
          color: #64748b;
        }

        .chat-compose-bar {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
        }

        @media (max-width: 991px) {
          .chat-thread-panel {
            min-height: 360px;
            max-height: 360px;
          }
        }

        @media (max-width: 767px) {
          .chat-bubble {
            max-width: 100%;
          }

          .chat-compose-bar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </ClientSectionLayout>
  );
}
