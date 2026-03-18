"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();
  const hiddenSidebarPaths = new Set([
    "/dashboard/pending-escrow-funding",
    "/dashboard/in-progress",
    "/dashboard/completed",
    "/dashboard/disputed",
    "/manage-services",
    "/manage-jobs",
    "/manage-projects",
    "/add-services",
    "/create-projects",
    "/dashboard/task-details",
    "/dashboard/create-task",
    "/dashboard/proposal-review",
  ]);

  const primaryItems = dasboardNavigation
    .slice(0, 13)
    .filter((item) => !hiddenSidebarPaths.has(item.path) && item.name !== "Feedback" && item.name !== "Escrow Funding" && item.name !== "Work Review & Approval");
  const secondaryItems = dasboardNavigation
    .slice(13, 24)
    .filter((item) => !hiddenSidebarPaths.has(item.path) && item.name !== "Feedback" && item.name !== "Escrow Funding" && item.name !== "Work Review & Approval");
  const accountItems = dasboardNavigation
    .slice(24, 26)
    .filter((item) => !hiddenSidebarPaths.has(item.path) && item.name !== "Feedback" && item.name !== "Escrow Funding" && item.name !== "Work Review & Approval");

  const handleNavClick = (event, item) => {
    const isLogout = item?.name?.toLowerCase() === "logout" || item?.path === "/login" || item?.path === "/seller/login";
    if (!isLogout) return;
    event.preventDefault();
    clearAuthSession();
    router.push("/seller/login");
  };

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {primaryItems.map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          

          {secondaryItems.map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          
          {accountItems.map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
