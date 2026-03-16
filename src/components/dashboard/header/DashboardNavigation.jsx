"use client";
import { dasboardNavigation } from "@/data/dashboard";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";
export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname()
  const router = useRouter();

  const handleNavClick = (event, item) => {
    setActive(false);
    const isLogout = item?.name?.toLowerCase() === "logout" || item?.path === "/login" || item?.path === "/seller/login";
    if (!isLogout) return;
    event.preventDefault();
    clearAuthSession();
    router.push("/seller/login");
  };

  const hiddenPaths = new Set([
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
  ]);

  const primaryItems = dasboardNavigation.slice(0, 13).filter(item => !hiddenPaths.has(item.path));
  const secondaryItems = dasboardNavigation.slice(13, 24).filter(item => !hiddenPaths.has(item.path));
  const accountItems = dasboardNavigation.slice(24, 26).filter(item => !hiddenPaths.has(item.path));

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
            {primaryItems.map((item,i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} key={i}>
                <Link href={item.path} onClick={(event) => handleNavClick(event, item)}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
           
            {secondaryItems.map((item,i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} key={i}>
                <Link href={item.path} onClick={(event) => handleNavClick(event, item)}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <p className="fz15 fw400 ff-heading mt30 pl30">Account</p>
            </li>
            {accountItems.map((item,i) => (
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
    </>
  );
}
