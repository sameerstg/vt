"use client";

import { useState } from "react";
import useAdminStore from "@/modules/admin/store/adminStore";
import DisputeManager from "@/modules/admin/components/DisputeManager";
import UserManager from "@/modules/admin/components/UserManager";
import FinancialOversight from "@/modules/admin/components/FinancialOversight";

export default function AdminDashboard() {
  const { users, disputes, transactions, getAdminStats } = useAdminStore();
  const [activeTab, setActiveTab] = useState("disputes");
  const [showSuccess, setShowSuccess] = useState(false);

  const { totalUsers, totalDisputes, pendingDisputes, totalTransactionVolume } = getAdminStats();

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: "badge-warning",
      resolved: "badge-success",
      escalated: "badge-error",
    };
    return classes[status] || "badge-info";
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Admin Dashboard</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Total Users</div>
                <div className="title">{totalUsers}</div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-user" />
              </div>
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
              <div className="icon text-center">
                <i className="flaticon-support" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">Transaction Volume</div>
                <div className="title">${totalTransactionVolume.toLocaleString()}</div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-dollar" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">System Health</div>
                <div className="title">Optimal</div>
                <div className="text fz14">
                  <span className="text-success">All Systems Nominal</span>
                </div>
              </div>
              <div className="icon text-center">
                <i className="flaticon-shield" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between bdrb1 pb15 mb20">
                <h5 className="title">Admin Controls</h5>
                <div className="d-flex gap10">
                  <button
                    className={`ud-btn btn-sm ${activeTab === "disputes" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("disputes")}
                  >
                    <i className="flaticon-support mr5" /> Disputes
                  </button>
                  <button
                    className={`ud-btn btn-sm ${activeTab === "users" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("users")}
                  >
                    <i className="flaticon-user mr5" /> Users
                  </button>
                  <button
                    className={`ud-btn btn-sm ${activeTab === "financial" ? "btn-thm" : "btn-light"}`}
                    onClick={() => setActiveTab("financial")}
                  >
                    <i className="flaticon-dollar mr5" /> Financial
                  </button>
                </div>
              </div>

              {showSuccess && (
                <div className="alert alert-success mb20">
                  Action completed successfully!
                </div>
              )}

              {activeTab === "disputes" && (
                <DisputeManager
                  disputes={disputes}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}

              {activeTab === "users" && (
                <UserManager
                  users={users}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}

              {activeTab === "financial" && (
                <FinancialOversight
                  transactions={transactions}
                  onSuccess={() => { setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}