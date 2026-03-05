"use client";
import { dasboardNavigation } from "@/data/dashboardWorker";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();
  const hiddenWorkerMenuPaths = new Set([
    "/worker-dashboard/saved",
    "/worker-dashboard/reviews",
    "/worker-dashboard/invoice",
    "/worker-dashboard/payouts",
    "/worker-dashboard/statements",
    "/worker-dashboard/manage-services",
    "/worker-dashboard/manage-jobs",
    "/worker-dashboard/manage-projects",
    "/worker-dashboard/add-services",
    "/worker-dashboard/create-projects",
  ]);

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          <p className="fz15 fw400 ff-heading pl30">Start</p>
          {dasboardNavigation
            .slice(0, 8)
            .filter((item) => !hiddenWorkerMenuPaths.has(item.path))
            .map((item, i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          <p className="fz15 fw400 ff-heading pl30 mt30">Organize and Manage</p>

          {dasboardNavigation
            .slice(8, 18)
            .filter((item) => !hiddenWorkerMenuPaths.has(item.path))
            .map((item, i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          <p className="fz15 fw400 ff-heading pl30 mt30">Account</p>
          {dasboardNavigation.slice(18, 20).map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
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
