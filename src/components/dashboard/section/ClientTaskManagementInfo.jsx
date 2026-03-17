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

import {
  getAuthSession,
  getProposalCountForTask,
  getClientTasks,
} from "@/utils/auth/mockAuth";

const TAB_CONFIG = {
  active: { key: "active", label: "Projects", title: "Projects" },
  pending: { key: "pending", label: "Pending Escrow Funding", title: "Pending Escrow Funding" },
  progress: { key: "progress", label: "In Progress", title: "In Progress" },
  completed: { key: "completed", label: "Completed", title: "Completed" },
  disputed: { key: "disputed", label: "Disputed", title: "Disputed" },
};

const TAB_ORDER = [
  TAB_CONFIG.active,
  TAB_CONFIG.pending,
  TAB_CONFIG.progress,
  TAB_CONFIG.completed,
  TAB_CONFIG.disputed,
];

const isValidTab = (tabKey) =>
  TAB_ORDER.some((item) => item.key === tabKey);

export default function ClientTaskManagementInfo({ initialTab = "active" }) {

  const router = useRouter();

  const initialSafeTab = isValidTab(initialTab) ? initialTab : "active";

  const [selectedTab, setSelectedTab] = useState(initialSafeTab);
  const [userCreatedTasks, setUserCreatedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    const session = getAuthSession();
    if (session?.id) {
      setUserCreatedTasks(getClientTasks(session.id));
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const allDataForCurrentTab = useMemo(() => {

    if (selectedTab === "active") {
      return [
        ...userCreatedTasks.map((t) => ({
          id: t.id,
          title: t.title,
          budget: t.budget,
          proposals: getProposalCountForTask(t.id),
          status: "Active",
        })),
        ...activeTasks,
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
  }, [allDataForCurrentTab, currentPage]);

  const renderPagination = () =>
    totalPages > 1 && (
      <div className="worker-pagination mt30">

        <button
          className="worker-pagination__nav"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`worker-pagination__page ${
              currentPage === p ? "is-active" : ""
            }`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="worker-pagination__nav"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>

      </div>
    );

  const renderTable = (headers, rows) => (
    <div className="table-style3 table-responsive">
      <table className="table align-middle">

        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
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
          <h5 className="mb20">Projects</h5>

          {renderTable(
            ["Project", "Budget", "Proposals", "Status", "Action"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.title}</td>
                <td>{item.budget}</td>
                <td>{item.proposals}</td>

                <td>
                  <span className="badge bgc-thm4 px-3 py-2">
                    {item.status}
                  </span>
                </td>

                <td className="text-end">
                  <Link
                    href={`/dashboard/task-details?taskId=${item.id}`}
                    className="ud-btn btn-thm"
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
                  <Link
                    href="/dashboard/escrow-funding"
                    className="ud-btn btn-thm"
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    Fund
                  </Link>
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
            ["Project", "Freelancer", "ETA", "Status"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.freelancer}</td>
                <td>{item.eta}</td>

                <td>
                  <span className="badge bg-primary px-3 py-2">
                    In Progress
                  </span>
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
            ["Project", "Freelancer", "Completed On", "Status"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.freelancer}</td>
                <td>{item.completedOn}</td>

                <td>
                  <span className="badge bg-success px-3 py-2">
                    Completed
                  </span>
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
            ["Project", "Issue", "Status"],
            items.map((item, i) => (
              <tr key={i}>
                <td className="fw500">{item.task}</td>
                <td>{item.issue}</td>

                <td>
                  <span className="badge bg-danger px-3 py-2">
                    {item.status}
                  </span>
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
        selectedTab === "active" && (
          <button
            onClick={() => router.push("/dashboard/create-task")}
            className="ud-btn btn-thm"
          >
            Create Project
          </button>
        )
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

        .tm-filter-wrap{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
        }

        .tm-filter-btn{
          border:2px solid #000;
          background:#fff;
          padding:6px 14px;
          font-size:14px;
          cursor:pointer;
          transition:0.2s;
        }

        .tm-filter-btn.active{
          background:#5b2dff;
          color:#fff;
          border-color:#5b2dff;
        }

        .tm-filter-btn:hover{
          background:#5b2dff;
          color:#fff;
          border-color:#5b2dff;
        }

        .worker-pagination{
          display:flex;
          justify-content:center;
          gap:10px;
          flex-wrap:wrap;
        }

        .worker-pagination__page,
        .worker-pagination__nav{
          min-width:40px;
          height:40px;
          border:1px solid #dbe1ee;
          background:#fff;
          border-radius:4px;
          font-weight:600;
        }

        .worker-pagination__page.is-active{
          background:#5b2dff;
          color:#fff;
          border-color:#5b2dff;
        }

      `}</style>

    </ClientSectionLayout>
  );
}