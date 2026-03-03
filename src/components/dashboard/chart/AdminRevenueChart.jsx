"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { adminRevenueSeries } from "@/data/adminDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const revenueChartData = {
  labels: adminRevenueSeries.map((item) => item.month),
  datasets: [
    {
      label: "Revenue",
      data: adminRevenueSeries.map((item) => item.revenue),
      borderColor: "#5bbb7b", // Green line as in reference
      backgroundColor: "rgba(91, 187, 123, 0.05)",
      borderWidth: 3,
      pointRadius: 5,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#5bbb7b",
      pointBorderWidth: 2,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: "#5bbb7b",
      tension: 0.4,
      fill: true,
    },
  ],
};

const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(34, 34, 34, 0.9)",
      padding: 12,
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
      cornerRadius: 8,
      callbacks: {
        label(context) {
          return ` Revenue: $${context.parsed.y.toLocaleString()}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#94a3b8",
        font: { size: 12, weight: "500" },
      },
    },
    y: {
      grid: {
        color: "rgba(148, 163, 184, 0.1)",
        drawBorder: false,
      },
      ticks: {
        color: "#94a3b8",
        font: { size: 12, weight: "500" },
        callback(value) {
          return `$${Number(value) / 1000}k`;
        },
      },
    },
  },
};

export default function AdminRevenueChart() {
  return (
    <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p30 mb30 overflow-hidden position-relative animate-in fade-in duration-500">
      <div className="navtab-style1">
        <div className="d-sm-flex align-items-center justify-content-between mb-6">
          <h4 className="title text-[20px] font-bold text-[#6200ee] mb-0">Profile Views</h4>
          <div className="page_control_shorting dark-color text-center text-md-end">
            <div className="dropdown bootstrap-select show-tick">
              <button type="button" className="btn dropdown-toggle btn-light bg-slate-50 border-slate-100 rounded-lg text-sm font-semibold">
                <div className="filter-option">
                  <div className="filter-option-inner">
                    <div className="filter-option-inner-inner">This Year</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[430px]">
        <Line data={revenueChartData} options={revenueChartOptions} />
      </div>
    </div>
  );
}
