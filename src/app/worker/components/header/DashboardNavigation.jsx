"use client";
import { dasboardNavigation } from "@/data/dashboardWorker";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardNavigation() {
  const [isActive, setActive] = useState(false);
  const path = usePathname();

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
            {dasboardNavigation.slice(0, 8).map((item, i) =>
              item.children ? (
                item.children.map((child, j) => (
                  <li
                    key={`${i}-${j}`}
                    className={path === child.path ? "mobile-dasboard-menu-active" : ""}
                    onClick={() => setActive(false)}
                  >
                    <Link href={child.path}>
                      <i className="flaticon-next mr10 fz11" />
                      {child.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li
                  key={i}
                  className={path === item.path ? "mobile-dasboard-menu-active" : ""}
                  onClick={() => setActive(false)}
                >
                  <Link href={item.path}>
                    <i className={`${item.icon} mr10`} />
                    {item.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
