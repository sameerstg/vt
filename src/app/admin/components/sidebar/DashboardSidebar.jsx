"use client";
import { dasboardNavigation } from "@/data/dashboardAdmin";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const path = usePathname();

  const renderItems = (items) =>
    items.map((item, i) => (
      <div key={i} className="sidebar_list_item mb-1">
        <Link
          href={item.path}
          className={`items-center ${path === item.path ? "-is-active" : ""}`}
        >
          <i className={`${item.icon} mr15`} />
          {item.name}
        </Link>
      </div>
    ));

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        <p className="fz15 fw400 ff-heading pl30">Start</p>
        {renderItems(dasboardNavigation.slice(0, 4))}

        <p className="fz15 fw400 ff-heading pl30 mt30">Manage</p>
        {renderItems(dasboardNavigation.slice(4, 7))}

        {/* <p className="fz15 fw400 ff-heading pl30 mt30">Account</p>
        {renderItems(dasboardNavigation.slice(8, 9))} */}
      </div>
    </div>
  );
}
