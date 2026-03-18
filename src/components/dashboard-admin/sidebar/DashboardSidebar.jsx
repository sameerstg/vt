"use client";

import { dasboardNavigation } from "@/data/dashboardAdmin";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState({
    "User Management": path.startsWith("/admin-dashboard/user-management"),
    "Project Monitoring": path.startsWith("/admin-dashboard/project-monitoring"),
  });

  const navigationItems = useMemo(
    () => [...dasboardNavigation.slice(0, 5), ...dasboardNavigation.slice(5, 7)],
    []
  );

  const handleNavClick = (event, item) => {
    const isLogout = item?.name?.toLowerCase() === "logout" || item?.path === "/login" || item?.path === "/client/login";
    if (!isLogout) return;
    event.preventDefault();
    clearAuthSession();
    router.push("/client/login");
  };

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block ">
        <div className="dashboard_sidebar_list -mt-40">
          {navigationItems.map((item, index) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isExactParentPath = path === item.path;
            const isChildActive = hasChildren && item.children.some((child) => path === child.path);
            const isParentActive = hasChildren ? isExactParentPath || isChildActive : isExactParentPath;

            return (
              <div
                key={item.id || index}
                className={`sidebar_list_item ${index === 0 ? "mt-4" : "mb-1"} ${hasChildren ? "sidebar-dropdown-item" : ""
                  }`}
              >
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      className={`items-center sidebar-parent-trigger ${isParentActive ? "-is-active" : ""
                        }`}
                      onClick={() => toggleMenu(item.name)}
                    >
                      <span className="sidebar-parent-text">
                        <i className={`${item.icon} mr15`} />
                        {item.name}
                      </span>
                      <i
                        className={`fas fa-chevron-down sidebar-toggle-arrow ${openMenus[item.name] ? "open" : ""
                          }`}
                        aria-hidden="true"
                      />
                    </button>

                    {openMenus[item.name] && (
                      <div className="sidebar-submenu">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.path}
                            className={`sidebar-submenu-link ${path === child.path ? "active" : ""}`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={(event) => handleNavClick(event, item)}
                    className={`items-center admin-sidebar-link ${isParentActive ? "-is-active" : ""}`}
                  >
                    <i className={`${item.icon} mr15`} />
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .admin-sidebar-link {
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .admin-sidebar-link.-is-active {
          background: #232323;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .sidebar-dropdown-item {
          overflow: hidden;
        }

        .sidebar-parent-trigger {
          width: 100%;
          border: 0;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-radius: 8px;
          text-align: left;
          color: #4b5563;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .sidebar-parent-trigger:hover {
          background: #f4f6fb;
          color: #111827;
        }

        .sidebar-parent-trigger.-is-active {
          background: #232323;
          color: #ffffff;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }

        .sidebar-parent-text {
          display: inline-flex;
          align-items: center;
          font-weight: 600;
        }

        .sidebar-toggle-arrow {
          font-size: 14px;
          line-height: 1;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .sidebar-toggle-arrow.open {
          transform: rotate(180deg);
        }

        .sidebar-submenu {
          padding: 12px 0 2px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-submenu-link {
          display: block;
          color: #4b5563;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 18px;
          border-radius: 8px;
          background: transparent;
          transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
        }

        .sidebar-submenu-link:hover {
          background: #f4f6fb;
          color: #111827;
        }

        .sidebar-submenu-link.active {
          color: #ffffff;
          background: #232323;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        }
      `}</style>
    </>
  );
}
