"use client";
import { dasboardNavigation } from "@/data/dashboardAdmin";
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
            {dasboardNavigation.slice(0, 1).map((item,i) => (
              <li className={path == item.path ? 'mobile-dasboard-menu-active' : ''} key={i}>
                <Link href={item.path} onClick={(event) => handleNavClick(event, item)}>
                  <i className={`${item.icon} mr10`} />
                  {item.name}
                </Link>
              </li>
            ))}
            
            {dasboardNavigation.slice(1, 5).map((item,i) => (
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
            {dasboardNavigation.slice(5, 7).map((item,i) => (
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
