"use client";

import toggleStore from "@/store/toggleStore";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import DashboardFooter from "./footer/DashboardFooter";
import AdminDashboardHeader from "./header/AdminDashboardHeader";
import AdminDashboardSidebar from "./sidebar/AdminDashboardSidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const isActive = toggleStore((state) => state.isDasboardSidebarActive);
  const pathname = usePathname();
  const isDashboardAdminRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const isAdminRoute = pathname.startsWith("/admin") || isDashboardAdminRoute;

  if (isAdminRoute) {
    return (
      <>
        <AdminDashboardHeader />
        <div className="dashboard_content_wrapper">
          <div
            className={`dashboard dashboard_wrapper pr30 pr0-xl ${
              isActive ? "dsh_board_sidebar_hidden" : ""
            }`}
          >
            <AdminDashboardSidebar />
            <main className="dashboard__main pl0-md">
              {children}
              <DashboardFooter />
            </main>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div
          className={`dashboard dashboard_wrapper pr30 pr0-xl ${
            isActive ? "dsh_board_sidebar_hidden" : ""
          }`}
        >
          <DashboardSidebar />
          <div className="dashboard__main pl0-md">
            {children}
            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}
