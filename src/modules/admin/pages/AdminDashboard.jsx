"use client";

import { useState } from "react";
import useAdminStore from "@/modules/admin/store/adminStore";
import DisputeManager from "@/modules/admin/components/DisputeManager";
import UserManager from "@/modules/admin/components/UserManager";
import FinancialOversight from "@/modules/admin/components/FinancialOversight";
import TeamManager from "@/modules/admin/components/TeamManager";
import ProjectManager from "@/modules/admin/components/ProjectManager";

const TABS = [
  { key: "disputes", label: "Disputes", icon: "flaticon-support" },
  { key: "users",    label: "Users",    icon: "flaticon-user" },
  { key: "teams",    label: "Teams",    icon: "flaticon-team" },
  { key: "projects", label: "Projects", icon: "flaticon-contract" },
  { key: "financial",label: "Financial",icon: "flaticon-dollar" },
];

export default function AdminDashboard() {
  const { users, disputes, transactions, teams, getAdminStats, setUsers, setDisputes } = useAdminStore();
  const [activeTab, setActiveTab] = useState("disputes");
  const [showSuccess, setShowSuccess] = useState(false);

  const { totalUsers, totalDisputes, pendingDisputes, totalTransactionVolume } = getAdminStats();

  const onSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Admin Dashboard</h2>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="row">
        <div className="col-sm-6 col-xxl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Total Users</div>
              <div className="title">{totalUsers}</div>
            </div>
            <div className="icon text-center"><i className="flaticon-user" /></div>
          </div>
        </div>
        <div className="col-sm-6 col-xxl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Total Disputes</div>
              <div className="title">{totalDisputes}</div>
              <div className="text fz14">
                <span className="text-thm">{pendingDisputes}</span> Pending
              </div>
            </div>
            <div className="icon text-center"><i className="flaticon-support" /></div>
          </div>
        </div>
        <div className="col-sm-6 col-xxl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Transaction Volume</div>
              <div className="title">${totalTransactionVolume.toLocaleString()}</div>
            </div>
            <div className="icon text-center"><i className="flaticon-dollar" /></div>
          </div>
        </div>
        <div className="col-sm-6 col-xxl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Active Teams</div>
              <div className="title">{teams.length}</div>
            </div>
            <div className="icon text-center"><i className="flaticon-team" /></div>
          </div>
        </div>
      </div>

      {/* Admin Controls panel */}
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20 flex-wrap gap10">
              <h5 className="title mb0">Admin Controls</h5>
              <div className="d-flex flex-wrap gap10">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`ud-btn btn-sm ${activeTab === tab.key ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <i className={`${tab.icon} mr5`} /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {showSuccess && (
              <div className="alert alert-success mb20">Action completed successfully!</div>
            )}

            {activeTab === "disputes" && (
              <DisputeManager disputes={disputes} setDisputes={setDisputes} onSuccess={onSuccess} />
            )}
            {activeTab === "users" && (
              <UserManager users={users} setUsers={setUsers} onSuccess={onSuccess} />
            )}
            {activeTab === "teams" && (
              <TeamManager teams={teams} />
            )}
            {activeTab === "projects" && (
              <ProjectManager />
            )}
            {activeTab === "financial" && (
              <FinancialOversight transactions={transactions} onSuccess={onSuccess} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
