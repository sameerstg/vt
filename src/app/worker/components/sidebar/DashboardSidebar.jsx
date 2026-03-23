"use client";
import { dasboardNavigation } from "@/data/dashboardWorker";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarItem({ item, path }) {
  if (item.children) {
    const isParentActive = item.children.some(c => path.startsWith(c.path));
    return (
      <div className="sidebar_list_item mb-1">
        <span className={`items-center ${isParentActive ? "-is-active" : ""}`} style={{ cursor: "default" }}>
          <i className={`${item.icon} mr15`} />
          {item.name}
        </span>
        <div className="ps-4 mt-1">
          {item.children.map((child, j) => (
            <div key={j} className="sidebar_list_item mb-1">
              <Link
                href={child.path}
                className={`items-center fz14 ${path === child.path ? "-is-active" : ""}`}
              >
                <i className="flaticon-next mr15 fz11" />
                {child.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="sidebar_list_item mb-1">
      <Link
        href={item.path}
        className={`items-center ${path === item.path ? "-is-active" : ""}`}
      >
        <i className={`${item.icon} mr15`} />
        {item.name}
      </Link>
    </div>
  );
}

export default function DashboardSidebar() {
  const path = usePathname();

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block">
        <div className="dashboard_sidebar_list">
          {dasboardNavigation.slice(0, 8).map((item, i) => (
            <SidebarItem key={i} item={item} path={path} />
          ))}
        </div>
      </div>
    </>
  );
}
