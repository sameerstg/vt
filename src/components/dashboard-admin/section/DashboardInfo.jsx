"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  adminEscrowBalances,
  adminFinancialOverview,
  adminModerationControls,
  adminPlatformFeeLedger,
  adminReleasedPayments,
  adminTaskMonitoringTasks,
  adminTransactionHistory,
  adminUsers,
  adminVerificationRequests,
} from "@/data/dashboardAdmin";
import { getAdminUserSummary } from "@/data/adminUserSummary";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const trendWindows = [
  { id: "6m", label: "Last 6 Months", count: 6 },
  { id: "4m", label: "Last 4 Months", count: 4 },
  { id: "3m", label: "Last 3 Months", count: 3 },
];

const formatCurrency = (amount) =>
  `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (
    normalized.includes("verified") ||
    normalized.includes("completed") ||
    normalized.includes("released") ||
    normalized.includes("settled")
  ) {
    return "style4";
  }
  if (
    normalized.includes("pending") ||
    normalized.includes("in progress") ||
    normalized.includes("review")
  ) {
    return "style5";
  }
  if (
    normalized.includes("flagged") ||
    normalized.includes("rejected") ||
    normalized.includes("suspended") ||
    normalized.includes("banned")
  ) {
    return "style1";
  }
  return "style6";
};

export default function DashboardInfo() {
  const [selectedWindow, setSelectedWindow] = useState("6m");

  const overviewStats = useMemo(() => {
    const userSummary = getAdminUserSummary();
    const pendingKyc = adminVerificationRequests.filter(
      (request) => request.reviewStatus === "Pending"
    ).length;
    const verifiedUsers = adminUsers.filter(
      (user) => user.verificationStatus === "Verified"
    ).length;
    const flaggedTasks = adminTaskMonitoringTasks.filter(
      (task) => task.flagged || task.status === "Flagged"
    ).length;
    const suspendedUsers = adminModerationControls.filter((entry) => {
      const state = entry.currentAction.toLowerCase();
      return state.includes("suspended") || state.includes("banned");
    }).length;

    const escrowFunded = adminEscrowBalances.reduce(
      (sum, row) => sum + row.totalFunded,
      0
    );
    const platformFees = adminPlatformFeeLedger.reduce(
      (sum, row) => sum + row.feeAmount,
      0
    );

    return {
      totalUsers: userSummary.totalUsers,
      clients: userSummary.clients,
      workers: userSummary.workers,
      contractors: userSummary.contractors,
      admins: userSummary.admins,
      pendingKyc,
      verifiedUsers,
      flaggedTasks,
      suspendedUsers,
      escrowFunded,
      platformFees,
      releasedPayments: adminReleasedPayments.length,
    };
  }, []);

  const trendSource = useMemo(() => {
    const selected =
      trendWindows.find((option) => option.id === selectedWindow) ||
      trendWindows[0];
    return adminFinancialOverview.monthlyRevenueTrend.slice(-selected.count);
  }, [selectedWindow]);

  const trendData = useMemo(
    () => ({
      labels: trendSource.map((item) => item.month),
      datasets: [
        {
          label: "Escrow Inflow",
          data: trendSource.map((item) => item.escrowInflow),
          borderColor: "#5B2DFF",
          backgroundColor: "rgba(91, 45, 255, 0.12)",
          pointBackgroundColor: "#5B2DFF",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          tension: 0.35,
          fill: true,
        },
        {
          label: "Released",
          data: trendSource.map((item) => item.released),
          borderColor: "#5BBB7B",
          backgroundColor: "rgba(91, 187, 123, 0.08)",
          pointBackgroundColor: "#5BBB7B",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          tension: 0.35,
          fill: true,
        },
        {
          label: "Platform Fee",
          data: trendSource.map((item) => item.platformFee),
          borderColor: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.08)",
          pointBackgroundColor: "#F59E0B",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          tension: 0.35,
          fill: true,
        },
      ],
    }),
    [trendSource]
  );

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.18)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const taskStatusDistribution = useMemo(() => {
    const stateCounts = adminTaskMonitoringTasks.reduce((accumulator, task) => {
      accumulator[task.status] = (accumulator[task.status] || 0) + 1;
      return accumulator;
    }, {});

    const labels = Object.keys(stateCounts);
    const values = Object.values(stateCounts);
    const palette = ["#5B2DFF", "#5BBB7B", "#F59E0B", "#FB7185", "#38BDF8", "#94A3B8"];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: labels.map((_, index) => palette[index % palette.length]),
          borderWidth: 4,
          hoverBorderWidth: 4,
        },
      ],
    };
  }, []);

  const taskStatusOptions = {
    cutout: "68%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 14,
          boxHeight: 10,
          padding: 12,
        },
      },
    },
  };

  const flaggedTasks = useMemo(
    () =>
      adminTaskMonitoringTasks.filter(
        (task) => task.status === "Flagged" || task.status === "Suspended"
      ).slice(0, 4),
    []
  );

  const latestTransactions = useMemo(
    () => adminTransactionHistory.slice(0, 4),
    []
  );

  return (
    <div className="dashboard__content hover-bgc-color admin-dashboard-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Dashboard</h2>
            <p className="text">
              Unified admin snapshot for users, tasks, financial activity, and dispute operations.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xxl-3">
          <div className="admin-kpi-card">
            <div className="admin-kpi-head">
              <span className="admin-kpi-icon">
                <i className="flaticon-photo" />
              </span>
              <p>Total Users</p>
            </div>
            <h4>{overviewStats.totalUsers}</h4>
            <span className="admin-kpi-meta">
              {overviewStats.admins} admin account{overviewStats.admins === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-xxl-3">
          <div className="admin-kpi-card">
            <div className="admin-kpi-head">
              <span className="admin-kpi-icon">
                <i className="flaticon-review-1" />
              </span>
              <p>Clients</p>
            </div>
            <h4>{overviewStats.clients}</h4>
            <span className="admin-kpi-meta">
              {overviewStats.pendingKyc} pending KYC request{overviewStats.pendingKyc === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-xxl-3">
          <div className="admin-kpi-card">
            <div className="admin-kpi-head">
              <span className="admin-kpi-icon">
                <i className="flaticon-delete" />
              </span>
              <p>Workers</p>
            </div>
            <h4>{overviewStats.workers}</h4>
            <span className="admin-kpi-meta">
              {overviewStats.verifiedUsers} verified profile{overviewStats.verifiedUsers === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-xxl-3">
          <div className="admin-kpi-card">
            <div className="admin-kpi-head">
              <span className="admin-kpi-icon">
                <i className="flaticon-dollar" />
              </span>
              <p>Contractors</p>
            </div>
            <h4>{overviewStats.contractors}</h4>
            <span className="admin-kpi-meta">
              {overviewStats.suspendedUsers} suspended or banned user{overviewStats.suspendedUsers === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 bdrb1 pb15 mb20">
              <div>
                <h5 className="list-title mb-1">Financial Trend Overview</h5>
                <p className="text mb-0">
                  Escrow inflow, released payments, and platform fee performance.
                </p>
              </div>
              <select
                className="form-select admin-select-filter"
                value={selectedWindow}
                onChange={(event) => setSelectedWindow(event.target.value)}
              >
                {trendWindows.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-line-chart-wrap">
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>
        </div>

        <div className="col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-1">Task State Mix</h5>
              <p className="text mb-0">Distribution of current monitored task states.</p>
            </div>
            <div className="admin-doughnut-wrap">
              <Doughnut data={taskStatusDistribution} options={taskStatusOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p25 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">ID Verification Queue</h5>
              <Link href="/admin-dashboard/user-management" className="admin-inline-link">
                View All
              </Link>
            </div>
            <div className="admin-list">
              {adminVerificationRequests.map((request) => (
                <div key={request.id} className="admin-list-item">
                  <div>
                    <p className="admin-list-title mb-1">{request.id}</p>
                    <p className="text mb-0">
                      {request.userName} ({request.userRole})
                    </p>
                    <p className="text mb-0">{request.documentType}</p>
                  </div>
                  <div className="text-end">
                    <span className={`pending-style ${getStatusClass(request.reviewStatus)}`}>
                      {request.reviewStatus}
                    </span>
                    <p className="text mb-0 mt5">{request.submittedOn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p25 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Flagged and Suspended Tasks</h5>
              <Link href="/admin-dashboard/task-monitoring" className="admin-inline-link">
                View All
              </Link>
            </div>
            <div className="admin-list">
              {flaggedTasks.map((task) => (
                <div key={task.id} className="admin-list-item">
                  <div>
                    <p className="admin-list-title mb-1">{task.id}</p>
                    <p className="text mb-0">{task.title}</p>
                    <p className="text mb-0">Due: {task.dueOn}</p>
                  </div>
                  <div className="text-end">
                    <span className={`pending-style ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                    <p className="text mb-0 mt5">{task.ownerName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p25 mb30 overflow-hidden position-relative">
            <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Recent Financial Activity</h5>
              <Link href="/admin-dashboard/financial-overview" className="admin-inline-link">
                View All
              </Link>
            </div>
            <div className="admin-list">
              {latestTransactions.map((transaction) => (
                <div key={transaction.id} className="admin-list-item">
                  <div>
                    <p className="admin-list-title mb-1">{transaction.id}</p>
                    <p className="text mb-0">{transaction.party}</p>
                    <p className="text mb-0">{transaction.taskId}</p>
                  </div>
                  <div className="text-end">
                    <p className="admin-list-amount mb-0">
                      {formatCurrency(transaction.amount)}
                    </p>
                    <span className={`pending-style ${getStatusClass(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard-page :global(.ps-widget) {
          border: 1px solid #e8edf6;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .admin-kpi-card {
          border: 1px solid #e7ecf6;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.05);
          padding: 16px 18px;
          margin-bottom: 20px;
        }

        .admin-kpi-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
        }

        .admin-kpi-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #f3f0ff;
          color: #5b2dff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .admin-kpi-head p {
          margin-bottom: 0;
          color: #5d6575;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.35px;
        }

        .admin-kpi-card h4 {
          margin-bottom: 2px;
          color: #1e293b;
          line-height: 1.15;
        }

        .admin-kpi-meta {
          color: #7b8698;
          font-size: 13px;
          font-weight: 400;
        }

        .admin-select-filter {
          width: 180px;
          height: 38px;
          font-size: 13px;
        }

        .admin-line-chart-wrap {
          height: 320px;
        }

        .admin-doughnut-wrap {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-inline-link {
          color: #5b2dff;
          font-size: 14px;
          text-decoration: underline;
          font-weight: 500;
        }

        .admin-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .admin-list-item {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
          border: 1px solid #edf1f8;
          border-radius: 10px;
          background: #fbfcff;
          padding: 12px;
        }

        .admin-list-title {
          color: #0f172a;
          font-weight: 600;
          font-size: 14px;
        }

        .admin-list-amount {
          color: #0f172a;
          font-weight: 700;
          font-size: 15px;
        }

        @media (max-width: 575px) {
          .admin-line-chart-wrap {
            height: 260px;
          }

          .admin-doughnut-wrap {
            min-height: 260px;
          }

          .admin-list-item {
            flex-direction: column;
          }

          .admin-select-filter {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
