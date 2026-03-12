"use client";
import { dasboardNavigation } from "@/data/dashboardWorker";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();
  const tasksRootPath = "/worker-dashboard/tasks";
  const visibleTaskChildPaths = new Set([]);
  const hiddenTaskNavPaths = new Set([
    "/worker-dashboard/available-tasks",
    "/worker-dashboard/applied-tasks",
    "/worker-dashboard/assigned-tasks",
    "/worker-dashboard/in-progress",
    "/worker-dashboard/completed-tasks",
  ]);
  const allTaskPaths = new Set([...visibleTaskChildPaths, ...hiddenTaskNavPaths]);
  const hiddenStartNavPaths = new Set([
    "/worker-dashboard/proposal",
    "/worker-dashboard/manage-projects",
  ]);
  const startPaths = new Set([
    "/worker-dashboard",
    tasksRootPath,
    ...allTaskPaths,
    "/worker-dashboard/payment-history",
    "/worker-dashboard/proposal",
    "/worker-dashboard/manage-projects",
  ]);
  const accountPaths = new Set([
    "/worker-dashboard/my-profile",
    "/login",
  ]);

  const dashboardItem = dasboardNavigation.find((item) => item.path === "/worker-dashboard");
  const tasksItem = dasboardNavigation.find((item) => item.path === tasksRootPath);
  const taskChildItems = dasboardNavigation.filter(
    (item) => visibleTaskChildPaths.has(item.path) && !hiddenTaskNavPaths.has(item.path)
  );
  const otherStartItems = dasboardNavigation.filter(
    (item) =>
      startPaths.has(item.path) &&
      !hiddenStartNavPaths.has(item.path) &&
      item.path !== "/worker-dashboard" &&
      item.path !== tasksRootPath &&
      !allTaskPaths.has(item.path)
  );

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
          {dashboardItem && (
            <div className="sidebar_list_item mb-1">
              <Link
                href={dashboardItem.path}
                onClick={(event) => handleNavClick(event, dashboardItem)}
                className={`items-center ${path === dashboardItem.path ? "-is-active" : ""}`}
              >
                <i className={`${dashboardItem.icon} mr15`} />
                {dashboardItem.name}
              </Link>
            </div>
          )}

          {tasksItem && (
            <div className="sidebar_list_item mb-1">
              <Link
                href={tasksItem.path}
                onClick={(event) => handleNavClick(event, tasksItem)}
                className={`items-center ${
                  path === tasksItem.path || allTaskPaths.has(path) ? "-is-active" : ""
                }`}
              >
                <i className={`${tasksItem.icon} mr15`} />
                {tasksItem.name}
              </Link>
              <div className="worker-task-subnav">
                {taskChildItems.map((item) => (
                  <div key={item.id} className="sidebar_list_item mb-1">
                    <Link
                      href={item.path}
                      onClick={(event) => handleNavClick(event, item)}
                      className={`items-center task-sub-item ${path === item.path ? "-is-active" : ""}`}
                    >
                      <i className={`${item.icon} mr15`} />
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {otherStartItems.map((item) => (
            <div key={item.id} className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${path === item.path ? "-is-active" : ""}`}
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
      <style jsx>{`
        .worker-task-subnav .task-sub-item {
          padding-left: 30px;
          font-size: 14px;
        }
      `}</style>
    </>
  );
}
