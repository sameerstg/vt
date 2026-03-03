"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { taskStatusBreakdown } from "@/data/adminDashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const taskStatusData = {
  labels: taskStatusBreakdown.map((item) => item.label),
  datasets: [
    {
      data: taskStatusBreakdown.map((item) => item.value),
      backgroundColor: taskStatusBreakdown.map((item) => item.color),
      borderColor: "#ffffff",
      borderWidth: 4,
      hoverOffset: 15,
    },
  ],
};

const taskStatusOptions = {
  cutout: "75%",
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
        font: {
          size: 13,
          weight: "600",
        },
        color: "#64748b",
      },
    },
    tooltip: {
      backgroundColor: "rgba(34, 34, 34, 0.9)",
      padding: 12,
      cornerRadius: 8,
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
    }
  },
  maintainAspectRatio: false,
};

export default function AdminTaskStatusChart() {
  return (
    <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p30 mb30 overflow-hidden position-relative animate-in fade-in duration-500 delay-150">
      <div className="border-b border-slate-50 pb-4 mb-8">
        <h4 className="title text-[20px] font-bold text-[#6200ee] mb-0">Task Status</h4>
      </div>
      <div className="h-[400px]">
        <Doughnut data={taskStatusData} options={taskStatusOptions} />
      </div>
    </div>
  );
}
