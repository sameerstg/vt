"use client";
import { dasboardNavigation } from "@/data/dashboard";
import { adminSidebarItems } from "@/data/adminDashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();
  const isDashboardAdminMode =
    path === "/dashboard" || path.startsWith("/dashboard/");

  const dashboardAdminItems = adminSidebarItems.map((item) => ({
    ...item,
    name: item.label,
    path: item.path.startsWith("/admin")
      ? item.path.replace(/^\/admin/, "/dashboard")
      : item.path,
  }));

  const startAdminItems = dashboardAdminItems.filter(
    (item) => item.group === "start",
  );
  const organizeAdminItems = dashboardAdminItems.filter(
    (item) => item.group === "organize",
  );
  const accountAdminItems = dashboardAdminItems.filter(
    (item) => item.group === "account",
  );

  const isItemActive = (itemPath) => {
    if (itemPath === "/dashboard") {
      return path === itemPath;
    }

    return path === itemPath || path.startsWith(`${itemPath}/`);
  };

  const renderItem = (item, isActive) => (
    <div key={item.path || item.id} className="sidebar_list_item">
      <Link
        href={item.path}
        title={item.name}
        className={`admin-sidebar-link flex items-center px-6 py-2.5 mx-3 rounded-lg transition-all duration-200 ${
          isActive ? "admin-sidebar-link-active" : ""
        }`}
        style={{ textDecoration: "none" }}
        aria-current={isActive ? "page" : undefined}
      >
        <i
          className={`${item.icon} admin-sidebar-icon text-lg w-6 mr-3`}
        />
        <span
          className={`admin-sidebar-label text-[15px] font-medium ${
            isActive ? "font-semibold" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    </div>
  );

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list py-0">
        <div className="py-2">
          {isDashboardAdminMode ? (
            <>
              <p className="px-7 mb-3 text-[12px] font-bold uppercase tracking-widest text-[#94a3b8]">
                Start
              </p>
              <div className="mb-6">
                {startAdminItems.map((item) => renderItem(item, isItemActive(item.path)))}
              </div>

              <p className="px-7 mb-3 text-[12px] font-bold uppercase tracking-widest text-[#94a3b8] mt-6">
                Organize and Manage
              </p>
              <div className="mb-6">
                {organizeAdminItems.map((item) =>
                  renderItem(item, isItemActive(item.path)),
                )}
              </div>

              <p className="px-7 mb-3 text-[12px] font-bold uppercase tracking-widest text-[#94a3b8] mt-6">
                Account
              </p>
              <div className="pb-8">
                {accountAdminItems.map((item) => renderItem(item, isItemActive(item.path)))}
              </div>
            </>
          ) : (
            <>
              <p className="px-7 mb-4 text-[14px] font-medium text-[#718096]">
                Start
              </p>
              <div className="mb-6">
                {dasboardNavigation
                  .slice(0, 8)
                  .map((item) => renderItem(item, path === item.path))}
              </div>

              <p className="px-7 mb-4 text-[14px] font-medium text-[#718096] mt-6">
                Organize and Manage
              </p>
              <div className="mb-6">
                {dasboardNavigation
                  .slice(8, 13)
                  .map((item) => renderItem(item, path === item.path))}
              </div>

              <p className="px-7 mb-4 text-[14px] font-medium text-[#718096] mt-6">
                Account
              </p>
              <div className="pb-8">
                {dasboardNavigation
                  .slice(13, 15)
                  .map((item) => renderItem(item, path === item.path))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
