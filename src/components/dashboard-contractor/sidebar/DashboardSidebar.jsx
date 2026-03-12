"use client";
import { dasboardNavigation } from "@/data/dashboardContractor";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();
  const startPaths = new Set(["/contractor-dashboard"]);
  const organizePaths = new Set([
    "/contractor-dashboard/manage-services",
    "/contractor-dashboard/manage-jobs",
    "/contractor-dashboard/manage-projects",
    "/contractor-dashboard/team-management",
    "/contractor-dashboard/payment-distribution",
    "/contractor-dashboard/dispute-submission",
  ]);
  const accountPaths = new Set([
    "/contractor-dashboard/my-profile",
    "/login",
  ]);

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
          {dasboardNavigation
            .filter((item) => startPaths.has(item.path))
            .map((item, i) => (
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

          

          {dasboardNavigation
            .filter((item) => organizePaths.has(item.path))
            .map((item, i) => (
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

          
          {dasboardNavigation.filter((item) => accountPaths.has(item.path)).map((item,i) => (
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
