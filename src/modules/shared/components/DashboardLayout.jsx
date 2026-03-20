"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VeriTaskDashboardLayout({ children }) {
  const pathname = usePathname();

  const getNavItems = () => {
    if (pathname.includes("/client/dashboard")) {
      return [
        { name: "My Tasks", icon: "flaticon-briefcase", path: "/client/dashboard" },
        { name: "Create Task", icon: "flaticon-plus", path: "/client/dashboard" },
      ];
    }
    if (pathname.includes("/worker/dashboard")) {
      return [
        { name: "Browse Tasks", icon: "flaticon-search", path: "/worker/dashboard" },
        { name: "My Tasks", icon: "flaticon-briefcase", path: "/worker/dashboard" },
        { name: "My Profile", icon: "flaticon-photo", path: "/worker/dashboard" },
      ];
    }
    if (pathname.includes("/contractor/dashboard")) {
      return [
        { name: "My Tasks", icon: "flaticon-briefcase", path: "/contractor/dashboard" },
        { name: "Team", icon: "flaticon-users", path: "/contractor/dashboard" },
        { name: "Browse Tasks", icon: "flaticon-search", path: "/contractor/dashboard" },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo mb30">
          <Link href="/">
            <img src="/images/header-logo.svg" alt="VeriTask" />
          </Link>
        </div>
        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <i className={`${item.icon}`} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="dashboard-footer mt-auto">
          <Link href="/login" className="nav-item">
            <i className="flaticon-logout" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
