"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ClientSectionLayout from "./ClientSectionLayout";

import {
  activeTasks,
  closedTasks,
  completedTasks,
  disputedTasks,
  inProgressTasks,
  pendingEscrow,
} from "@/data/clientDashboard";

import {
  getAuthSession,
  getProposalCountForTask,
  getClientTasks,
  updateMockTaskStatus,
} from "@/utils/auth/mockAuth";

const TAB_CONFIG = {
  active: { key: "active", label: "All Projects", title: "All Projects" },
  draft: { key: "draft", label: "New Projects", title: "New Projects" },
  ongoing: { key: "ongoing", label: "Published Projects", title: "Published Projects" },
  pending: { key: "pending", label: "Pending Escrow Funding", title: "Pending Escrow Funding" },
  progress: { key: "progress", label: "In Progress", title: "In Progress" },
  completed: { key: "completed", label: "Completed", title: "Completed" },
  disputed: { key: "disputed", label: "Disputed", title: "Disputed" },
  closed: { key: "closed", label: "Closed", title: "Closed" },
};

const TAB_ORDER = [
  TAB_CONFIG.active,
  TAB_CONFIG.draft,
  TAB_CONFIG.ongoing,
  TAB_CONFIG.progress,
  TAB_CONFIG.completed,
  TAB_CONFIG.pending,
  TAB_CONFIG.disputed,
  TAB_CONFIG.closed,
];

const isValidTab = (tabKey) =>
  TAB_ORDER.some((item) => item.key === tabKey);

export default function ClientTaskManagementInfo({ initialTab = "active" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");

  const initialSafeTab = isValidTab(urlTab || initialTab) ? (urlTab || initialTab) : "active";

  const [selectedTab, setSelectedTab] = useState(initialSafeTab);
  const [userCreatedTasks, setUserCreatedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingItems, setPendingItems] = useState(pendingEscrow);
  const [disputeItems, setDisputeItems] = useState(disputedTasks);

  const itemsPerPage = 5;

  useEffect(() => {
    if (urlTab && isValidTab(urlTab)) {
      setSelectedTab(urlTab);
    }
  }, [urlTab]);

  useEffect(() => {
    const session = getAuthSession();
    if (session?.id) {
      setUserCreatedTasks(getClientTasks(session.id));
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const getStatusBadgeStyle = (status) => {
    if (status === "In Progress") {
      return { background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" };
    }

    if (status === "Completed") {
      return { background: "#f0fdf4", color: "#166534", border: "1px solid #dcfce7" };
    }

    if (status === "Disputed") {
      return { background: "#fef2f2", color: "#991b1b", border: "1px solid #fee2e2" };
    }

    if (status === "Closed") {
      return { background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" };
    }

    if (status === "Ongoing" || status === "available") {
      return { background: "#f5f3ff", color: "#5b2dff", border: "1px solid #ddd6fe" };
    }

    return { background: "#fffbeb", color: "#b45309", border: "1px solid #fef3c7" };
  };

  const getStatusLabel = (status) => {
    if (status === "available") return "Available";
    return status || "Draft";
  };

  const getDisplayProposalCount = (task, index = 0) => {
    const liveCount = getProposalCountForTask(task.id);
    if (liveCount > 0) return liveCount;

    if (typeof task.proposals === "number" && task.proposals > 0) {
      return task.proposals;
    }

    if (task.status === "available" || task.status === "Ongoing") {
      return index % 2 === 0 ? 2 : 3;
    }

    return 0;
  };

  const buildAllProjectsItems = useCallback(() => {
    const dynamicTasks = userCreatedTasks.map((t, index) => ({
      id: t.id,
      title: t.title,
      budget: t.budget,
      proposals: getDisplayProposalCount(t, index),
      status: t.status || "Draft",
      freelancer: t.freelancer || "Assigned Worker",
      timeline: t.timeline || "In Progress",
      createdAt: t.createdAt ? new Date(t.createdAt).getTime() : 0,
    }));

    const pendingProjects = pendingItems.map((item, index) => ({
      id: `pending-${index}`,
      title: item.task,
      budget: item.amount,
      proposals: 0,
      status: "Pending",
      due: item.due,
      pendingItem: item,
      createdAt: 0,
    }));

    const inProgressProjects = inProgressTasks.map((item, index) => ({
      id: `progress-${index}`,
      title: item.task,
      budget: "TBD",
      proposals: 0,
      status: "In Progress",
      freelancer: item.freelancer,
      timeline: item.eta,
      createdAt: 0,
    }));

    const completedProjects = completedTasks.map((item) => ({
      id: item.id,
      title: item.task,
      budget: item.budget || "TBD",
      proposals: 0,
      status: "Completed",
      freelancer: item.freelancer,
      completedOn: item.completedOn,
      createdAt: 0,
    }));

    const disputedProjects = disputeItems.map((item) => ({
      id: item.id,
      title: item.task,
      budget: item.budget || "TBD",
      proposals: 0,
      status: "Disputed",
      issue: item.issue,
      disputeItem: item,
      createdAt: 0,
    }));

    const closedProjects = closedTasks.map((item) => ({
      id: item.id,
      title: item.task,
      budget: item.budget || "TBD",
      proposals: 0,
      status: "Closed",
      issue: item.issue,
      closedOn: item.closedOn,
      createdAt: 0,
    }));

    return [
      ...dynamicTasks,
      ...pendingProjects,
      ...inProgressProjects,
      ...completedProjects,
      ...disputedProjects,
      ...closedProjects,
      ...activeTasks,
    ].sort((a, b) => {
      const timeA = a.createdAt || 0;
      const timeB = b.createdAt || 0;
      return timeB - timeA;
    });
  }, [
    disputeItems,
    pendingItems,
    userCreatedTasks,
  ]);

  const allDataForCurrentTab = useMemo(() => {
    if (selectedTab === "active") {
      return buildAllProjectsItems();
    }

    if (selectedTab === "ongoing") {
      return userCreatedTasks
        .filter((t) => t.status === "Ongoing")
        .map((t, index) => ({
          id: t.id,
          title: t.title,
          budget: t.budget,
          proposals: getDisplayProposalCount(t, index),
          status: t.status,
          createdAt: t.createdAt ? new Date(t.createdAt).getTime() : 0,
        }))
        .sort((a, b) => {
          const timeA = a.createdAt || 0;
          const timeB = b.createdAt || 0;
          return timeB - timeA;
        });
    }

    if (selectedTab === "draft") {
      return userCreatedTasks
        .filter((t) => !t.status || t.status === "Draft")
        .map((t) => ({
          id: t.id,
          title: t.title,
          budget: t.budget,
          proposals: getDisplayProposalCount(t),
          status: t.status || "Draft",
          createdAt: t.createdAt ? new Date(t.createdAt).getTime() : 0,
        }))
        .sort((a, b) => {
          const timeA = a.createdAt || 0;
          const timeB = b.createdAt || 0;
          return timeB - timeA;
        });
    }

    if (selectedTab === "pending") return pendingItems;
    if (selectedTab === "progress") {
      const acceptedTasks = userCreatedTasks
        .filter((t) => t.status === "In Progress")
        .map((t) => ({
          id: t.id,
          task: t.title,
          freelancer: t.freelancer || "Assigned Worker",
          eta: t.timeline || "In Progress",
          status: t.status,
          createdAt: t.createdAt ? new Date(t.createdAt).getTime() : 0,
        }));
      
      return [...acceptedTasks, ...inProgressTasks].sort((a, b) => {
        const timeA = a.createdAt || 0;
        const timeB = b.createdAt || 0;
        return timeB - timeA;
      });
    }
    if (selectedTab === "completed") return completedTasks;
    if (selectedTab === "disputed") return disputeItems;
    if (selectedTab === "closed") return closedTasks;

    return [];
  }, [buildAllProjectsItems, selectedTab, userCreatedTasks, pendingItems, disputeItems]);

  const totalPages = Math.ceil(allDataForCurrentTab.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allDataForCurrentTab.slice(start, start + itemsPerPage);
  }, [allDataForCurrentTab, currentPage]);

  const renderPagination = () =>
    totalPages > 1 && (
      <div className="worker-pagination mt30">
        {/* Prev Button */}
        <button
          className="worker-pagination__nav"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`worker-pagination__page ${
              currentPage === page ? "is-active" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="worker-pagination__nav"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        {/* Styles */}
        <style jsx>{`
          .worker-pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
          }

          .worker-pagination__page,
          .worker-pagination__nav {
            min-width: 42px;
            height: 42px;
            border-radius: 4px;
            border: 1px solid #dbe1ee;
            background: #ffffff;
            font-weight: 600;
            cursor: pointer;
          }

          .worker-pagination__page.is-active {
            border-color: #5b2dff;
            background: #f7f7f7;
            color: #5b2dff;
          }

          .worker-pagination__nav:disabled {
            opacity: 0.45;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );

  const handlePublish = (taskId) => {
    const res = updateMockTaskStatus(taskId, "Ongoing");
    if (res.ok) {
      const session = getAuthSession();
      if (session?.id) {
        setUserCreatedTasks(getClientTasks(session.id));
      }
    } else {
      alert(res.message || "Failed to publish task.");
    }
  };

  const handleCreateDispute = (item) => {
    const disputeId = `dispute-${String(item.task).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    setDisputeItems((prev) => {
      if (prev.some((entry) => entry.id === disputeId || entry.task === item.task)) {
        return prev;
      }

      return [
        {
          id: disputeId,
          task: item.task,
          issue: "Escrow funding dispute",
          status: "Open",
          worker: "Escrow Support",
          openedOn: item.due || "Today",
          budget: item.amount,
          escrowStatus: "Pending Review",
          reason: `Funding for ${item.task} is delayed and requires dispute review before escrow release.`,
          updates: [
            {
              id: `${disputeId}-update-1`,
              sender: "You",
              time: "Just now",
              text: `I am raising a dispute for ${item.task} because the escrow funding is still pending.`,
            },
            {
              id: `${disputeId}-update-2`,
              sender: "Support",
              time: "Just now",
              text: "Your dispute has been logged. The escrow team will review the payment issue shortly.",
            },
          ],
          evidence: [
            { id: `${disputeId}-evidence-1`, name: "escrow-payment-status.pdf", size: "320 KB" },
          ],
        },
        ...prev,
      ];
    });

    setSelectedTab("disputed");
  };

  const renderTable = (headers, rows) => (
    <div className="table-style3 table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className={h === "Action" ? "text-end" : ""}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );

  const renderTabContent = (tabKey, items) => {

    if (!items.length) {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
          <p className="mb-0">No data available.</p>
        </div>
      );
    }

    if (tabKey === "active") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">All Projects</h5>

          {renderTable(
            ["Project", "Budget", "Proposals", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.title}</td>
                <td>{item.budget}</td>
                <td>{item.proposals}</td>

                <td>
                  <span 
                    className="badge" 
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      borderRadius: "6px",
                      ...getStatusBadgeStyle(item.status)
                    }}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </td>

                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    {item.status === "In Progress" && item.id && (
                      <>
                        <button
                          onClick={() => router.push(`/dashboard/in-progress/chat?taskId=${item.id || ""}&taskTitle=${encodeURIComponent(item.title)}&freelancer=${encodeURIComponent(item.freelancer || "Assigned Worker")}`)}
                          className="ud-btn btn-light-purple"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Chat
                        </button>
                        <Link
                          href={String(item.id).startsWith("progress-") ? `/dashboard/in-progress/chat?taskTitle=${encodeURIComponent(item.title)}&freelancer=${encodeURIComponent(item.freelancer || "Assigned Worker")}` : `/dashboard/task-details?taskId=${item.id}`}
                          className="ud-btn btn-thm"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Details
                        </Link>
                      </>
                    )}

                    {/* If Draft, show Edit and Publish */}
                    {(item.status === "Draft" || !item.status) && item.id && !String(item.id).startsWith("pending-") && !String(item.id).startsWith("progress-") && !String(item.id).startsWith("closed-") && !String(item.id).startsWith("dispute-") && (
                      <>
                        <button
                          onClick={() => router.push(`/dashboard/create-task?taskId=${item.id}`)}
                          className="ud-btn btn-light-purple"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePublish(item.id)}
                          className="ud-btn btn-thm"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Publish
                        </button>
                      </>
                    )}
                    
                    {/* If Published (Ongoing/available), show Proposal Review and Details */}
                    {(item.status === "Ongoing" || item.status === "available") && item.id && (
                      <>
                        <button
                          onClick={() => router.push(`/dashboard/proposal-review?taskId=${item.id}`)}
                          className="ud-btn btn-light-purple"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Proposal Review
                        </button>
                        <Link
                          href={`/dashboard/task-details?taskId=${item.id}`}
                          className="ud-btn btn-thm"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Details
                        </Link>
                      </>
                    )}

                    {item.status === "Completed" && (
                      <Link
                        href={`/dashboard/feedback/${item.id || 1}?project=${encodeURIComponent(item.title)}&freelancer=${encodeURIComponent(item.freelancer || "Assigned Worker")}&completedOn=${encodeURIComponent(item.completedOn || "")}&budget=${encodeURIComponent(item.budget || "")}`}
                        className="ud-btn btn-light-purple"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Submission Work
                      </Link>
                    )}

                    {item.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCreateDispute(item.pendingItem || { task: item.title, amount: item.budget, due: item.due })}
                          className="ud-btn btn-light-purple"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Dispute
                        </button>
                        <Link
                          href="/dashboard/escrow-funding"
                          className="ud-btn btn-thm"
                          style={{ padding: "6px 14px", fontSize: "12px" }}
                        >
                          Fund
                        </Link>
                      </>
                    )}

                    {item.status === "Disputed" && (
                      <Link
                        href={`/dashboard/disputed/${item.id || ""}?task=${encodeURIComponent(item.title || "")}&issue=${encodeURIComponent(item.issue || "")}&status=${encodeURIComponent(item.status || "")}&worker=${encodeURIComponent(item.disputeItem?.worker || "")}&openedOn=${encodeURIComponent(item.disputeItem?.openedOn || "")}&budget=${encodeURIComponent(item.budget || "")}&escrowStatus=${encodeURIComponent(item.disputeItem?.escrowStatus || "")}&reason=${encodeURIComponent(item.disputeItem?.reason || "")}`}
                        className="ud-btn btn-light-purple"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Open
                      </Link>
                    )}

                    {item.status === "Closed" && (
                      <Link
                        href={`/dashboard/closed/${item.id}`}
                        className="ud-btn btn-light-purple"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Details
                      </Link>
                    )}

                    {/* Fallback for static items without ID */}
                    {!item.id && (
                      <Link
                        href={`/dashboard/task-details?taskId=${item.id}`}
                        className="ud-btn btn-thm"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Details
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "ongoing") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">Published Projects</h5>

          {renderTable(
            ["Project", "Budget", "Proposals", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.title}</td>
                <td>{item.budget}</td>
                <td>{item.proposals}</td>
                <td>
                  <span 
                    className="badge" 
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      borderRadius: "6px",
                      background: "#f5f3ff", 
                      color: "#5b2dff", 
                      border: "1px solid #ddd6fe"
                    }}
                  >
                    Ongoing
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/proposal-review?taskId=${item.id}`)}
                      className="ud-btn btn-light-purple"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Proposal Review
                    </button>
                    <Link
                      href={`/dashboard/task-details?taskId=${item.id}`}
                      className="ud-btn btn-thm"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Details
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "draft") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">New Projects</h5>

          {renderTable(
            ["Project", "Budget", "Proposals", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.title}</td>
                <td>{item.budget}</td>
                <td>{item.proposals}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "6px",
                      ...getStatusBadgeStyle(item.status),
                    }}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/create-task?taskId=${item.id}`)}
                      className="ud-btn btn-light-purple"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublish(item.id)}
                      className="ud-btn btn-thm"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Publish
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "pending") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">Pending Escrow Funding</h5>

          {renderTable(
            ["Project", "Amount", "Due", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.amount}</td>
                <td>{item.due}</td>

                <td>
                  <span className="badge bg-warning text-dark px-3 py-2">
                    Pending
                  </span>
                </td>

                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleCreateDispute(item)}
                      className="ud-btn btn-light-purple"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Dispute
                    </button>
                    <Link
                      href="/dashboard/escrow-funding"
                      className="ud-btn btn-thm"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Fund
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "progress") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">In Progress</h5>

          {renderTable(
            ["Project", "Worker", "ETA", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.freelancer}</td>
                <td>{item.eta}</td>

                <td>
                  <span 
                    className="badge" 
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      borderRadius: "6px",
                      background: "#e0f2fe", 
                      color: "#0369a1", 
                      border: "1px solid #bae6fd"
                    }}
                  >
                    In Progress
                  </span>
                </td>

                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    <Link
                      href={`/dashboard/in-progress/chat?taskId=${item.id || ""}&taskTitle=${encodeURIComponent(item.task)}&freelancer=${encodeURIComponent(item.freelancer || "Assigned Worker")}`}
                      className="ud-btn btn-light-purple"
                      style={{ padding: "6px 14px", fontSize: "12px" }}
                    >
                      Chat
                    </Link>
                    {(item.id) ? (
                      <Link
                        href={`/dashboard/task-details?taskId=${item.id}`}
                        className="ud-btn btn-thm"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Details
                      </Link>
                    ) : (
                      <Link
                        href={`/dashboard/task-details`}
                        className="ud-btn btn-thm"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                      >
                        Details
                      </Link>
                    )}
                  </div>
                </td>

              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "completed") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">Completed</h5>

          {renderTable(
            ["Project", "Worker", "Completed On", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.freelancer}</td>
                <td>{item.completedOn}</td>

                <td>
                  <span 
                    className="badge" 
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      borderRadius: "6px",
                      background: "#f0fdf4", 
                      color: "#166534", 
                      border: "1px solid #dcfce7"
                    }}
                  >
                    Completed
                  </span>
                </td>
                <td className="text-end">
                  <Link
                    href={`/dashboard/feedback/${item.id || 1}?project=${encodeURIComponent(item.task)}&freelancer=${encodeURIComponent(item.freelancer)}&completedOn=${encodeURIComponent(item.completedOn)}&submittedOn=${encodeURIComponent(item.submittedOn || "")}&budget=${encodeURIComponent(item.budget || "")}`}
                    className="ud-btn btn-light-purple"
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    Submission Work
                  </Link>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "disputed") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">Disputed</h5>

          {renderTable(
            ["Project", "Issue", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.issue}</td>

                <td>
                  <span 
                    className="badge" 
                    style={{ 
                      padding: "6px 14px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      borderRadius: "6px",
                      background: "#fef2f2", 
                      color: "#991b1b", 
                      border: "1px solid #fee2e2"
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-end">
                  <Link
                    href={`/dashboard/disputed/${item.id || ""}?task=${encodeURIComponent(item.task || "")}&issue=${encodeURIComponent(item.issue || "")}&status=${encodeURIComponent(item.status || "")}&worker=${encodeURIComponent(item.worker || "")}&openedOn=${encodeURIComponent(item.openedOn || "")}&budget=${encodeURIComponent(item.budget || "")}&escrowStatus=${encodeURIComponent(item.escrowStatus || "")}&reason=${encodeURIComponent(item.reason || "")}`}
                    className="ud-btn btn-light-purple"
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }

    if (tabKey === "closed") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30">
          <h5 className="mb20">Closed</h5>

          {renderTable(
            ["Project", "Issue", "Closed On", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.issue}</td>
                <td>{item.closedOn}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "6px",
                      ...getStatusBadgeStyle(item.status),
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="text-end">
                  <Link
                    href={`/dashboard/closed/${item.id}`}
                    className="ud-btn btn-light-purple"
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          )}

          {renderPagination()}
        </div>
      );
    }
  };

  return (
    <ClientSectionLayout
      title={TAB_CONFIG[selectedTab].title}
      extra={
        <button
          onClick={() => router.push("/dashboard/create-task")}
          className="ud-btn btn-thm"
        >
          Create Project
        </button>
      }
    >

      {/* FILTER SECTION */}

      <div className="ps-widget bgc-white bdrs4 p30 mb30">

        <div className="bdrb1 pb15 mb20">
          <h5 className="list-title mb-1">Status Filter</h5>
        </div>

        <div className="tm-filter-wrap">
          {TAB_ORDER.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tm-filter-btn ${
                selectedTab === tab.key ? "active" : ""
              }`}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {renderTabContent(selectedTab, paginatedItems)}

      <style jsx>{`

        .tm-filter-wrap {
          display: flex !important;
          flex-wrap: wrap;
          gap: 10px !important;
        }

        .tm-filter-btn {
          border: 1px solid #dbe1ee !important; 
          background: #ffffff !important; 
          border-radius: 4px !important; 
          padding: 8px 13px !important; 
          font-weight: 600 !important; 
          color: #334155 !important; 
          font-size: 13px !important;
          cursor: pointer !important;
          transition: 0.2s;
        }

        .tm-filter-btn.active,
        .tm-filter-btn:hover {
          border-color: #5b2dff !important; 
          color: #5b2dff !important; 
          background: #f7f7f7 !important; 
        }

        .ud-btn.btn-light-purple {
          border: 1px solid #5b2dff;
          color: #5b2dff;
          background: transparent;
          transition: 0.3s;
        }

        .ud-btn.btn-light-purple:hover {
          background: #5b2dff;
          color: #fff;
        }

        .ud-btn.btn-thm:hover {
          background: #4a24d6;
        }

      `}</style>

    </ClientSectionLayout>
  );
}
