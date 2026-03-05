"use client";

import { useMemo } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  adminEscrowBalances,
  adminFinancialOverview,
  adminPlatformFeeLedger,
  adminReleasedPayments,
  adminTransactionHistory,
} from "@/data/dashboardAdmin";
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
import { Line, Doughnut } from "react-chartjs-2";

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

const formatCurrency = (amount) =>
  `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed") || normalized.includes("released") || normalized.includes("settled")) return "style4";
  if (normalized.includes("pending") || normalized.includes("review")) return "style5";
  if (normalized.includes("suspended") || normalized.includes("hold")) return "style1";
  return "style6";
};

const getTypeBadgeClass = (type = "") => {
  const normalized = type.toLowerCase();
  if (normalized.includes("credit")) return "fo-chip fo-chip-credit";
  if (normalized.includes("debit")) return "fo-chip fo-chip-debit";
  if (normalized.includes("hold")) return "fo-chip fo-chip-hold";
  if (normalized.includes("fee")) return "fo-chip fo-chip-fee";
  return "fo-chip";
};

export default function FinancialOverviewInfo() {
  const totals = useMemo(() => {
    const escrowFunded = adminEscrowBalances.reduce((sum, row) => sum + row.totalFunded, 0);
    const escrowOnHold = adminEscrowBalances.reduce((sum, row) => sum + row.onHold, 0);
    const releasedGross = adminReleasedPayments.reduce((sum, row) => sum + row.grossAmount, 0);
    const releasedNet = adminReleasedPayments.reduce((sum, row) => sum + row.netAmount, 0);
    const feeTotal = adminPlatformFeeLedger.reduce((sum, row) => sum + row.feeAmount, 0);

    return {
      escrowFunded,
      escrowOnHold,
      releasedGross,
      releasedNet,
      feeTotal,
    };
  }, []);

  const trendData = useMemo(() => {
    const labels = adminFinancialOverview.monthlyRevenueTrend.map((item) => item.month);
    return {
      labels,
      datasets: [
        {
          label: "Escrow Inflow",
          data: adminFinancialOverview.monthlyRevenueTrend.map((item) => item.escrowInflow),
          borderColor: "#5B2DFF",
          backgroundColor: "rgba(91, 45, 255, 0.12)",
          pointBackgroundColor: "#5B2DFF",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          fill: true,
          tension: 0.35,
        },
        {
          label: "Released",
          data: adminFinancialOverview.monthlyRevenueTrend.map((item) => item.released),
          borderColor: "#5BBB7B",
          backgroundColor: "rgba(91, 187, 123, 0.08)",
          pointBackgroundColor: "#5BBB7B",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          fill: true,
          tension: 0.35,
        },
        {
          label: "Platform Fee",
          data: adminFinancialOverview.monthlyRevenueTrend.map((item) => item.platformFee),
          borderColor: "#F59E0B",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          pointBackgroundColor: "#F59E0B",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          fill: true,
          tension: 0.35,
        },
      ],
    };
  }, []);

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
        grid: { color: "rgba(148, 163, 184, 0.15)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const feeSplitData = useMemo(
    () => ({
      labels: adminFinancialOverview.feeDistribution.map((item) => `${item.label} (${item.value}%)`),
      datasets: [
        {
          data: adminFinancialOverview.feeDistribution.map((item) => item.value),
          backgroundColor: adminFinancialOverview.feeDistribution.map((item) => item.color),
          borderWidth: 4,
          hoverBorderWidth: 4,
        },
      ],
    }),
    []
  );

  const feeSplitOptions = {
    cutout: "68%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxHeight: 10,
          boxWidth: 14,
          padding: 14,
        },
      },
    },
  };

  return (
    <div className="dashboard__content hover-bgc-color financial-overview-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Financial Overview</h2>
            <p className="text">
              Escrow and platform revenue visibility with transaction-level tracking.
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <div className="fo-stat-card">
            <p>Total Escrow Funded</p>
            <h4>{formatCurrency(totals.escrowFunded)}</h4>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="fo-stat-card">
            <p>Escrow On Hold</p>
            <h4>{formatCurrency(totals.escrowOnHold)}</h4>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="fo-stat-card">
            <p>Released Payments</p>
            <h4>{formatCurrency(totals.releasedNet)}</h4>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="fo-stat-card">
            <p>Platform Fee Revenue</p>
            <h4>{formatCurrency(totals.feeTotal)}</h4>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xxl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Escrow vs Released vs Fee Trend</h5>
            </div>
            <div className="fo-line-chart-wrap">
              <Line data={trendData} options={trendOptions} />
            </div>
          </div>
        </div>
        <div className="col-xxl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Platform Fee Split</h5>
            </div>
            <div className="fo-doughnut-wrap">
              <Doughnut data={feeSplitData} options={feeSplitOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Transaction History</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Transaction</th>
                    <th scope="col">Task / Party</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminTransactionHistory.map((row) => (
                    <tr key={row.id}>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{row.id}</span>
                        <span className="text">{row.date}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{row.taskId}</span>
                        <p className="text mb-0">{row.party}</p>
                        <p className="text mb-0">{row.description}</p>
                      </td>
                      <td className="vam">
                        <span className={getTypeBadgeClass(row.type)}>{row.type}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500">{formatCurrency(row.amount)}</span>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Escrow Balances</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Escrow ID</th>
                    <th scope="col">Task / Owner</th>
                    <th scope="col">Funded</th>
                    <th scope="col">Released</th>
                    <th scope="col">On Hold</th>
                    <th scope="col">Available</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminEscrowBalances.map((row) => (
                    <tr key={row.id}>
                      <td className="vam">
                        <span className="fz14 fw500">{row.id}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{row.taskId}</span>
                        <p className="text mb-0">{row.owner}</p>
                      </td>
                      <td className="vam">{formatCurrency(row.totalFunded)}</td>
                      <td className="vam">{formatCurrency(row.released)}</td>
                      <td className="vam">{formatCurrency(row.onHold)}</td>
                      <td className="vam">
                        <span className="fz14 fw500">{formatCurrency(row.available)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Released Payments</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Payment</th>
                    <th scope="col">Receiver</th>
                    <th scope="col">Method</th>
                    <th scope="col">Gross</th>
                    <th scope="col">Fee</th>
                    <th scope="col">Net Released</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminReleasedPayments.map((row) => (
                    <tr key={row.id}>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{row.id}</span>
                        <p className="text mb-0">{row.date}</p>
                        <p className="text mb-0">{row.taskId}</p>
                      </td>
                      <td className="vam">{row.receiver}</td>
                      <td className="vam">{row.method}</td>
                      <td className="vam">{formatCurrency(row.grossAmount)}</td>
                      <td className="vam">{formatCurrency(row.fee)}</td>
                      <td className="vam">
                        <span className="fz14 fw500">{formatCurrency(row.netAmount)}</span>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Platform Fee Ledger</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Ledger Entry</th>
                    <th scope="col">Reference</th>
                    <th scope="col">Fee Type</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Base Amount</th>
                    <th scope="col">Fee Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminPlatformFeeLedger.map((row) => (
                    <tr key={row.id}>
                      <td className="vam">
                        <span className="fz14 fw500 d-block">{row.id}</span>
                        <p className="text mb-0">{row.date}</p>
                      </td>
                      <td className="vam">{row.reference}</td>
                      <td className="vam">{row.feeType}</td>
                      <td className="vam">{row.rate}</td>
                      <td className="vam">{formatCurrency(row.baseAmount)}</td>
                      <td className="vam">
                        <span className="fz14 fw500">{formatCurrency(row.feeAmount)}</span>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .financial-overview-page :global(.ps-widget) {
          border: 1px solid #e8edf6;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
        }

        .fo-stat-card {
          border: 1px solid #e7ecf6;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.05);
          padding: 16px 18px;
          margin-bottom: 20px;
        }

        .fo-stat-card p {
          margin-bottom: 7px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.35px;
          font-weight: 600;
          color: #64748b;
        }

        .fo-stat-card h4 {
          margin-bottom: 0;
          color: #0f172a;
        }

        .fo-line-chart-wrap {
          height: 320px;
        }

        .fo-doughnut-wrap {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fo-chip {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 3px 10px;
          font-size: 12px;
          font-weight: 600;
          background: #f1f5f9;
          color: #334155;
        }

        .fo-chip-credit {
          background: #ecfdf3;
          color: #047857;
        }

        .fo-chip-debit {
          background: #eff6ff;
          color: #1d4ed8;
        }

        .fo-chip-hold {
          background: #fff7ed;
          color: #c2410c;
        }

        .fo-chip-fee {
          background: #f5f3ff;
          color: #6d28d9;
        }

        @media (max-width: 575px) {
          .fo-line-chart-wrap {
            height: 260px;
          }

          .fo-doughnut-wrap {
            min-height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
