"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ClientSectionLayout from "./ClientSectionLayout";
import {
  activeTasks,
  completedTasks,
  disputedTasks,
  inProgressTasks,
  pendingEscrow,
} from "@/data/clientDashboard";

const TAB_CONFIG = {
  active: {
    key: "active",
    label: "Projects",
    title: "Projects",
  },
  pending: {
    key: "pending",
    label: "Pending Escrow Funding",
    title: "Pending Escrow Funding",
    description: "Track tasks waiting for escrow funding.",
  },
  progress: {
    key: "progress",
    label: "In Progress",
    title: "In Progress",
    description: "Monitor tasks currently being worked on.",
  },
  completed: {
    key: "completed",
    label: "Completed",
    title: "Completed",
    description: "Review tasks that have been completed and approved.",
  },
  disputed: {
    key: "disputed",
    label: "Disputed",
    title: "Disputed",
    description: "Track and resolve disputed tasks.",
  },
};

const TAB_ORDER = [
  TAB_CONFIG.active,
  TAB_CONFIG.pending,
  TAB_CONFIG.progress,
  TAB_CONFIG.completed,
  TAB_CONFIG.disputed,
];

const isValidTab = (tabKey) => TAB_ORDER.some((item) => item.key === tabKey);

import { getAuthSession, getProposalCountForTask, getClientTasks } from "@/utils/auth/mockAuth";

export default function ClientTaskManagementInfo({ initialTab = "active" }) {
  const router = useRouter();
  const initialSafeTab = isValidTab(initialTab) ? initialTab : "active";
  const [selectedTab, setSelectedTab] = useState(initialSafeTab);
  const [userCreatedTasks, setUserCreatedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const session = getAuthSession();
    if (session?.id) {
      setUserCreatedTasks(getClientTasks(session.id));
    }
  }, []);

  useEffect(() => {
    if (isValidTab(initialTab)) {
      setSelectedTab(initialTab);
    }
  }, [initialTab]);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const allDataForCurrentTab = useMemo(() => {
    if (selectedTab === "active") {
      return [
        ...userCreatedTasks.map(t => ({
          id: t.id,
          title: t.title,
          budget: t.budget,
          proposals: getProposalCountForTask(t.id),
          status: "Active"
        })),
        ...activeTasks
      ];
    }
    if (selectedTab === "pending") return pendingEscrow;
    if (selectedTab === "progress") return inProgressTasks;
    if (selectedTab === "completed") return completedTasks;
    if (selectedTab === "disputed") return disputedTasks;
    return [];
  }, [selectedTab, userCreatedTasks]);

  const totalPages = Math.ceil(allDataForCurrentTab.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allDataForCurrentTab.slice(start, start + itemsPerPage);
  }, [allDataForCurrentTab, currentPage, itemsPerPage]);

  const currentTab = useMemo(
    () => TAB_CONFIG[selectedTab] || TAB_CONFIG.active,
    [selectedTab],
  );

  const renderTabContent = (tabKey, items) => {
    const paginationUI = totalPages > 1 && (
      <div className="worker-pagination mt30">
        <button
          type="button"
          className="worker-pagination__nav"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            className={`worker-pagination__page ${currentPage === page ? "is-active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="worker-pagination__nav"
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );

    if (tabKey === "active") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
            <h5 className="title mb-0">Projects</h5>
          </div>
          <div className="packages_table table-responsive">
            <table className="table-style3 table at-savesearch align-middle mb-0">
              <thead className="t-head">
                <tr>
                  <th scope="col">Task Title</th>
                  <th scope="col">Budget</th>
                  <th scope="col">Proposals</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody className="t-body">
                {items.map((item, index) => (
                  <tr key={`${item.title}-${index}`} className="task-row-hover">
                    <td className="fw500">{item.title}</td>
                    <td>{item.budget}</td>
                    <td>{item.proposals} Proposals</td>
                    <td>
                      <span className="badge bgc-thm4 text-dark fz12 py-2 px-3">{item.status}</span>
                    </td>
                    <td className="text-end">
                      <Link
                        href={`/dashboard/task-details?taskId=${item.id || ""}`}
                        className="ud-btn btn-thm"
                        style={{ padding: "5px 15px", fontSize: "12px" }}
                      >
                        Details<i className="fal fa-arrow-right-long ms-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length && (
              <div className="text-center py-5">
                <p className="text mb-0">No active tasks found.</p>
              </div>
            )}
          </div>
          {paginationUI}
        </div>
      );
    }

    if (tabKey === "pending") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="bdrb1 pb15 mb20">
            <h5 className="title">Pending Escrow Funding</h5>
          </div>
          {items.map((item, index) => (
            <div key={`${item.task}-${index}`} className="mb15">
              <p className="dark-color mb-1 fw500">{item.task}</p>
              <p className="mb-0 fz14 text">
                Amount: {item.amount} | Due: {item.due}
              </p>
              {items.length !== index + 1 ? (
                <hr className="opacity-100 mt15 mb0" />
              ) : null}
            </div>
          ))}
          {!items.length && <p className="text-center py-4 mb-0">No pending items found.</p>}
          {paginationUI}
        </div>
      );
    }

    if (tabKey === "progress") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="bdrb1 pb15 mb20">
            <h5 className="title">In Progress</h5>
          </div>
          {items.map((item, index) => (
            <div key={`${item.task}-${index}`} className="dashboard-timeline-label">
              <div className="timeline-item pb15">
                <div className="timeline-badge d-flex align-items-center">
                  <i className="fas fa-genderless" />
                </div>
                <div className="ra_pcontent pl10">
                  <span className="title">{item.task}</span>
                  <br />
                  <span className="subtitle">
                    Freelancer: {item.freelancer} | ETA: {item.eta}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {!items.length && <p className="text-center py-4 mb-0">No tasks in progress.</p>}
          {paginationUI}
        </div>
      );
    }

    if (tabKey === "completed") {
      return (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="bdrb1 pb15 mb20">
            <h5 className="title">Completed</h5>
          </div>
          {items.map((item, index) => (
            <div key={`${item.task}-${index}`} className="mb15">
              <p className="dark-color mb-1 fw500">{item.task}</p>
              <p className="mb-0 fz14 text">
                Freelancer: {item.freelancer} | Completed: {item.completedOn}
              </p>
              {items.length !== index + 1 ? (
                <hr className="opacity-100 mt15 mb0" />
              ) : null}
            </div>
          ))}
          {!items.length && <p className="text-center py-4 mb-0">No completed tasks found.</p>}
          {paginationUI}
        </div>
      );
    }

    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Disputed</h5>
        </div>
        {items.map((item, index) => (
          <div key={`${item.task}-${index}`} className="mb10">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">
              Issue: {item.issue} | Status: {item.status}
            </p>
            {items.length !== index + 1 ? (
              <hr className="opacity-100 mt15 mb0" />
            ) : null}
          </div>
        ))}
        {!items.length && <p className="text-center py-4 mb-0">No disputed tasks found.</p>}
        {paginationUI}
      </div>
    );
  };

  return (
    <ClientSectionLayout
      title={currentTab.title}
      description={currentTab.description}
      extra={
        selectedTab === "active" && (
          <button
            onClick={() => router.push("/dashboard/create-task")}
            className="ud-btn btn-thm"
            style={{ padding: "8px 20px" }}
          >
            Create Task<i className="fal fa-arrow-right-long ms-1" />
          </button>
        )
      }
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative tm-toolbar-card">
        <div className="bdrb1 pb15 mb20 tm-toolbar-head">
          <h5 className="list-title mb-1">Status Filter</h5>
        </div>
        <div className="tm-filter-wrap">
          {TAB_ORDER.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`tm-filter-btn ${selectedTab === item.key ? "active" : ""}`}
              onClick={() => setSelectedTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent(selectedTab, paginatedItems)}

      <style jsx>{`
        :global(.worker-pagination) {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        :global(.worker-pagination__page),
        :global(.worker-pagination__nav) {
          min-width: 42px;
          height: 42px;
          border-radius: 4px;
          border: 1px solid #dbe1ee;
          background: #ffffff;
          font-weight: 600;
          color: #334155;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 14px;
          transition: all 0.2s ease;
        }

        :global(.worker-pagination__page.is-active) {
          border-color: #5b2dff;
          background: #f7f7f7;
          color: #5b2dff;
        }

        :global(.worker-pagination__page:hover:not(:disabled)),
        :global(.worker-pagination__nav:hover:not(:disabled)) {
          border-color: #5b2dff;
          color: #5b2dff;
          background: #f7f7f7;
        }

        :global(.worker-pagination__nav:disabled) {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .tm-filter-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tm-filter-btn { border: 1px solid #dbe1ee; background: #ffffff; border-radius: 4px; padding: 8px 13px; font-weight: 600; color: #334155; font-size: 13px; }
        .tm-filter-btn.active, .tm-filter-btn:hover { border-color: #5b2dff; color: #5b2dff; background: #f7f7f7; }

        :global(.task-row-hover td) {
          transition: background-color 0.2s ease;
        }

        :global(.task-row-hover:hover td) {
          background-color: #f7f7f7;
        }

        :global(.task-row-hover:hover td:first-child) {
          color: #5b2dff;
          font-weight: 600;
        }
      `}</style>
    </ClientSectionLayout>
  );
}
