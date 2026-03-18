"use client";
import { dasboardNavigation } from "@/data/dashboardWorker";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";
export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const tasksRootPath = "/worker-dashboard/assigned-projects";
  const visibleTaskChildPaths = new Set([]);
  const hiddenTaskNavPaths = new Set([
    "/worker-dashboard/available-tasks",
    "/worker-dashboard/applied-tasks",
    "/worker-dashboard/assigned-projects",
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
    setActive(false);
    const isLogout = item?.name?.toLowerCase() === "logout" || item?.path === "/login" || item?.path === "/client/login";
    if (!isLogout) return;
    event.preventDefault();
    clearAuthSession();
    router.push("/client/login");
  };

  return (
    <>
      <div className="dashboard_navigationbar d-block d-lg-none">
        <div className="dropdown">
          <button onClick={() => setActive(!isActive)} className="dropbtn">
            <i className="fa fa-bars pr10" /> Dashboard Navigation
          </button>
          <ul className={`dropdown-content ${isActive ? "show" : ""}`}>
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Start</p>
            </li>
            {dashboardItem && (
              <li className={path == dashboardItem.path ? "mobile-dasboard-menu-active" : ""}>
                <Link href={dashboardItem.path} onClick={(event) => handleNavClick(event, dashboardItem)}>
                  <i className={`${dashboardItem.icon} mr10`} />
                  {dashboardItem.name}
                </Link>
              </li>
            )}
            {tasksItem && (
              <>
                <li className={path == tasksItem.path || allTaskPaths.has(path) ? "mobile-dasboard-menu-active" : ""}>
                  <Link href={tasksItem.path} onClick={(event) => handleNavClick(event, tasksItem)}>
                    <i className={`${tasksItem.icon} mr10`} />
                    {tasksItem.name}
                  </Link>
                </li>
                {taskChildItems.map((item) => (
                  <li className={path == item.path ? "mobile-dasboard-menu-active" : ""} key={item.id}>
                    <Link href={item.path} onClick={(event) => handleNavClick(event, item)} className="task-sub-item-mobile">
                      <i className={`${item.icon} mr10`} />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
            {otherStartItems.map((item) => (
              <li className={path == item.path ? "mobile-dasboard-menu-active" : ""} key={item.id}>
                <Link href={item.path} onClick={(event) => handleNavClick(event, item)}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Account</p>
            </li>
            {dasboardNavigation
              .filter((item) => accountPaths.has(item.path))
              .map((item,i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} key={i}>
                <Link href={item.path} onClick={(event) => handleNavClick(event, item)}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        :global(.task-sub-item-mobile) {
          padding-left: 45px !important;
        }
      `}</style>
    </>
  );
}
