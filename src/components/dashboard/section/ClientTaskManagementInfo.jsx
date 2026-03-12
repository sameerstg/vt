"use client";

import { useEffect, useMemo, useState } from "react";
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
    label: "Active Tasks",
    title: "Active Tasks",
    description: "Manage your posted tasks that are currently active.",
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

function renderTabContent(tabKey) {
  if (tabKey === "active") {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Active Tasks</h5>
        </div>
        {activeTasks.map((item, index) => (
          <div key={`${item.title}-${index}`} className="mb15">
            <p className="dark-color mb-1 fw500">{item.title}</p>
            <p className="mb-0 fz14 text">
              Budget: {item.budget} | Proposals: {item.proposals} | {item.status}
            </p>
            {activeTasks.length !== index + 1 ? (
              <hr className="opacity-100 mt15 mb0" />
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (tabKey === "pending") {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Pending Escrow Funding</h5>
        </div>
        {pendingEscrow.map((item, index) => (
          <div key={`${item.task}-${index}`} className="mb15">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">
              Amount: {item.amount} | Due: {item.due}
            </p>
            {pendingEscrow.length !== index + 1 ? (
              <hr className="opacity-100 mt15 mb0" />
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (tabKey === "progress") {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">In Progress</h5>
        </div>
        {inProgressTasks.map((item, index) => (
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
      </div>
    );
  }

  if (tabKey === "completed") {
    return (
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Completed</h5>
        </div>
        {completedTasks.map((item, index) => (
          <div key={`${item.task}-${index}`} className="mb15">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">
              Freelancer: {item.freelancer} | Completed: {item.completedOn}
            </p>
            {completedTasks.length !== index + 1 ? (
              <hr className="opacity-100 mt15 mb0" />
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
      <div className="bdrb1 pb15 mb20">
        <h5 className="title">Disputed</h5>
      </div>
      {disputedTasks.map((item, index) => (
        <div key={`${item.task}-${index}`} className="mb10">
          <p className="dark-color mb-1 fw500">{item.task}</p>
          <p className="mb-0 fz14 text">
            Issue: {item.issue} | Status: {item.status}
          </p>
          {disputedTasks.length !== index + 1 ? (
            <hr className="opacity-100 mt15 mb0" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function ClientTaskManagementInfo({ initialTab = "active" }) {
  const initialSafeTab = isValidTab(initialTab) ? initialTab : "active";
  const [selectedTab, setSelectedTab] = useState(initialSafeTab);

  useEffect(() => {
    if (isValidTab(initialTab)) {
      setSelectedTab(initialTab);
    }
  }, [initialTab]);

  const currentTab = useMemo(
    () => TAB_CONFIG[selectedTab] || TAB_CONFIG.active,
    [selectedTab],
  );

  return (
    <ClientSectionLayout
      title={currentTab.title}
      description={currentTab.description}
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="navtab-style1">
          <nav>
            <div className="nav nav-tabs mb30">
              {TAB_ORDER.map((item) => (
                <button
                  key={item.key}
                  className={`nav-link fw500 ps-0 ${selectedTab === item.key ? "active" : ""}`}
                  onClick={() => setSelectedTab(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
      {renderTabContent(selectedTab)}
    </ClientSectionLayout>
  );
}
