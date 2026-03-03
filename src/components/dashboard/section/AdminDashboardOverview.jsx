import Link from "next/link";
import AdminKpiCard from "@/components/dashboard/card/AdminKpiCard";
import AdminRevenueChart from "@/components/dashboard/chart/AdminRevenueChart";
import AdminTaskStatusChart from "@/components/dashboard/chart/AdminTaskStatusChart";
import {
  adminQuickActions,
  adminRecentActivity,
  adminKpiCards,
  recentTransactions,
  recentUsers,
} from "@/data/adminDashboard";

const kpiIcons = [
  "flaticon-contract",
  "flaticon-success",
  "flaticon-review",
  "flaticon-review-1",
  "flaticon-dollar",
  "flaticon-logout",
];

const userStatusClass = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Suspended: "bg-rose-100 text-rose-700",
  Banned: "bg-slate-200 text-slate-700",
};

export default function AdminDashboardOverview({ routeBase = "/admin" }) {
  const normalizeAdminPath = (path) => {
    if (routeBase === "/admin") {
      return path;
    }

    return path.replace(/^\/admin/, routeBase);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb15 pt-1">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2 className="title" style={{ color: "#2d138f", fontSize: "26px", fontWeight: "700" }}>
              Admin Dashboard
            </h2>
            <p className="text mb-0" style={{ color: "#5e6d82", fontSize: "14px" }}>
              Welcome back! Here's a brief overview of your platform's performance today.
            </p>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {adminKpiCards.map((item, index) => (
          <div key={item.id} className="col-sm-6 col-xxl-3">
            <AdminKpiCard
              title={item.title}
              value={item.value}
              trend={item.trend}
              icon={kpiIcons[index % kpiIcons.length]}
            />
          </div>
        ))}
      </div>

      <div className="row mt-1">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
            <div className="d-flex justify-content-between border-b border-slate-50 pb10 mb20 px-2">
              <h5 className="title text-[18px] font-bold text-[#6200ee] mb-0 px-1">Control Center</h5>
            </div>
            <div className="row g-3 px-2">
              {adminQuickActions.slice(0, 4).map((action) => (
                <div key={action.id} className="col-sm-6 col-xl-3">
                  <Link
                    href={normalizeAdminPath(action.path)}
                    className="group d-block rounded-xl border border-slate-100 bg-slate-50/20 px-3 py-3 text-decoration-none transition-all hover:bg-[#4d1aab]/5 hover:border-[#4d1aab]/20"
                  >
                    <h6 className="mb-0.5 font-bold text-slate-800 group-hover:text-[#4d1aab] transition-colors fz14">
                      {action.label}
                    </h6>
                    <p className="mb-0 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                      {action.id.split("-")[1] || "Action"}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-xl-8">
          <AdminRevenueChart />
        </div>
        <div className="col-xl-4">
          <AdminTaskStatusChart />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative h-100">
            <div className="d-flex justify-content-between border-b border-slate-50 pb10 mb15 px-2">
              <h5 className="title text-[16px] font-bold text-[#6200ee] mb-0">Platform Users</h5>
              <Link
                href={normalizeAdminPath("/admin/user-management")}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 text-decoration-none uppercase tracking-widest"
              >
                Full List
              </Link>
            </div>
            <div className="dashboard-img-service px-2 pb-1">
              {recentUsers.slice(0, 3).map((item, index) => (
                <div key={item.id} className={index !== 2 ? "mb-3" : ""}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-0.5 font-bold text-slate-800 fz13">{item.name}</h6>
                      <p className="text mb-0 text-[11px] font-medium text-slate-400 italic">
                        {item.role} - {item.date}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        userStatusClass[item.status] || "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  {index !== 2 && <hr className="opacity-5 shadow-none border-slate-200 mt-3 mb-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative h-100">
            <div className="d-flex justify-content-between border-b border-slate-50 pb10 mb15 px-2">
              <h5 className="title text-[16px] font-bold text-[#6200ee] mb-0">Revenue Flow</h5>
              <Link
                href={normalizeAdminPath("/admin/financial-overview")}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 text-decoration-none uppercase tracking-widest"
              >
                Ledger
              </Link>
            </div>
            <div className="dashboard-img-service px-2 pb-1">
              {recentTransactions.slice(0, 3).map((item, index) => (
                <div key={item.id} className={index !== 2 ? "mb-3" : ""}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h6 className="mb-0.5 font-bold text-slate-800 font-mono text-[11px]">#{item.id}</h6>
                      <p className="text mb-0 text-[11px] font-medium text-slate-400 italic">
                        {item.type} - {item.date}
                      </p>
                    </div>
                    <h6 className="mb-0 font-bold text-emerald-600 fz13">{item.amount}</h6>
                  </div>
                  {index !== 2 && <hr className="opacity-5 shadow-none border-slate-200 mt-3 mb-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xxl-4">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative h-100">
            <div className="border-b border-slate-50 pb10 mb20 px-2">
              <h5 className="title text-[16px] font-bold text-[#6200ee] mb-0">System Activity</h5>
            </div>
            <div className="px-2 pb-1">
              {adminRecentActivity.slice(0, 5).map((item, index) => (
                <div
                  key={item.id}
                  className={`dashboard-timeline-label ${index === 4 ? "before-none mb0" : ""}`}
                >
                  <div className={`timeline-item ${index === 4 ? "pb0" : "pb10"}`}>
                    <div className="child-timeline-label text-slate-400 font-bold text-[9px] uppercase tracking-tighter">
                      {item.time}
                    </div>
                    <div className="timeline-badge d-flex align-items-center">
                      <i className="fas fa-genderless text-purple-400 text-lg" />
                    </div>
                    <div className="ra_pcontent pl15">
                      <span className="title font-bold text-slate-800 fz13">{item.title}</span>
                      <p className="subtitle text-slate-400 font-bold text-[10px] uppercase tracking-tight mb-0 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
