"use client";

import { adminSidebarItems } from "@/data/adminDashboard";
import AdminNavIcon from "@/components/dashboard/element/AdminNavIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardSidebar() {
  const pathname = usePathname();
  const isDashboardNamespace =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const routeBase = isDashboardNamespace ? "/dashboard" : "/admin";
  const normalizeAdminPath = (path) => {
    if (routeBase === "/admin") {
      return path;
    }

    return path.replace(/^\/admin/, routeBase);
  };
  const startItems = adminSidebarItems.filter((item) => item.group === "start");
  const organizeItems = adminSidebarItems.filter(
    (item) => item.group === "organize",
  );
  const accountItems = adminSidebarItems.filter((item) => item.group === "account");

  const isSidebarItemActive = (path) => {
    const resolvedPath = normalizeAdminPath(path);

    if (resolvedPath === routeBase) {
      return pathname === resolvedPath;
    }

    return pathname === resolvedPath || pathname.startsWith(`${resolvedPath}/`);
  };

  const renderSidebarItems = (items) =>
    items.map((item) => {
      const isActive = isSidebarItemActive(item.path);

      return (
        <div key={item.id} className="sidebar_list_item">
          <Link
            href={normalizeAdminPath(item.path)}
            title={item.label}
            className={`admin-sidebar-link flex items-center px-6 py-2.5 mx-3 rounded-lg transition-all duration-200 ${
              isActive ? "admin-sidebar-link-active" : ""
            }`}
            style={{ textDecoration: "none" }}
            aria-current={isActive ? "page" : undefined}
          >
            <AdminNavIcon
              icon={item.icon || "flaticon-home"}
              className="admin-sidebar-icon h-[18px] w-[18px] mr-3 shrink-0"
            />
            <span
              className={`admin-sidebar-label text-[15px] font-medium ${
                isActive ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
          </Link>
        </div>
      );
    });

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list py-0">
        <div className="py-2">
          <p className="px-7 mb-4 text-[14px] font-medium text-[#718096]">
            Start
          </p>
          <div className="mb-6">{renderSidebarItems(startItems)}</div>

          <p className="px-7 mb-4 text-[14px] font-medium text-[#718096] mt-6">
            Organize and Manage
          </p>
          <div className="mb-6">{renderSidebarItems(organizeItems)}</div>

          <p className="px-7 mb-4 text-[14px] font-medium text-[#718096] mt-6">
            Account
          </p>
          <div className="pb-8">{renderSidebarItems(accountItems)}</div>
        </div>
      </div>
    </div>
  );
}
