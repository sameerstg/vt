"use client";
import { useState } from "react";
import { dasboardNavigation } from "@/data/dashboardContractor";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();
  const [teamsOpen, setTeamsOpen] = useState(false);
  // Sub-menu paths for Teams tab
  const teamsSubMenuPaths = [
    "/contractor-dashboard/team",
    "/contractor-dashboard/team/assign-projects",
    "/contractor-dashboard/team/assign-milestones"
  ];
  // Open Teams menu if any sub-menu item is active
  const isTeamsActive = teamsSubMenuPaths.some((p) => path.startsWith(p));
  // Track if menu was manually toggled: null = auto, true = open, false = closed
  const [manualTeamsOpen, setManualTeamsOpen] = useState(null);
  // Determine if menu should be open
  const teamsMenuOpen =
    manualTeamsOpen === null
      ? isTeamsActive
      : manualTeamsOpen;
  const startPaths = new Set(["/contractor-dashboard"]);
  const organizePaths = new Set([
    "/contractor-dashboard/manage-services",
    "/contractor-dashboard/manage-jobs",
    "/contractor-dashboard/manage-projects",
    "/contractor-dashboard/team-management",
    "/contractor-dashboard/team",
    "/contractor-dashboard/team/assign-projects",
    "/contractor-dashboard/team/assign-milestones",
    "/contractor-dashboard/dispute-submission",
  ]);
  const accountPaths = new Set([
    "/contractor-dashboard/my-profile",
    "/login",
  ]);

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
          {dasboardNavigation
            .filter((item) => startPaths.has(item.path))
            .map((item, i) => (
              <div key={i} className="sidebar_list_item mb-1">
                <Link
                  href={item.path}
                  onClick={(event) => handleNavClick(event, item)}
                  className={`items-center cursor-pointer ${path === item.path ? "-is-active" : ""
                    }`}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.name}
                </Link>
              </div>
            ))}

          {/* Teams tab with sub-menu */}
          <div className="sidebar_list_item mb-1">
            <a
              className={`items-center cursor-pointer d-flex align-items-center`}
              onClick={(e) => {
                e.preventDefault();
                setManualTeamsOpen((prev) => (prev === null ? true : !prev));
              }}
            >
              <i className="fal fa-users mr15" />
              Teams
              <span className="ms-auto">
                {teamsMenuOpen ? "▼" : "▶"}
              </span>
            </a>
            {teamsMenuOpen && (
              <div className="ms-4">
                <Link
                  href="/contractor-dashboard/team"
                  className={`items-center cursor-pointer d-flex align-items-center mb-1 ${path === "/contractor-dashboard/team" ? "-is-active" : ""}`}
                >
                  <i className="fal fa-users mr15" />
                  <span>Team Members</span>
                </Link>
                <Link
                  href="/contractor-dashboard/team/assign-projects"
                  className={`items-center cursor-pointer d-flex align-items-center mb-1 ${path === "/contractor-dashboard/team/assign-projects" ? "-is-active" : ""}`}
                >
                  <i className="flaticon-presentation mr15" />
                  <span>Assign Projects</span>
                </Link>
                <Link
                  href="/contractor-dashboard/team/assign-milestones"
                  className={`items-center cursor-pointer d-flex align-items-center mb-1 ${path === "/contractor-dashboard/team/assign-milestones" ? "-is-active" : ""}`}
                >
                  <i className="flaticon-briefcase mr15" />
                  <span>Assign Milestones</span>
                </Link>
              </div>
            )}
          </div>

          {dasboardNavigation
            .filter((item) => organizePaths.has(item.path) && item.name !== "Teams")
            .map((item, i) => (
              <div key={i} className="sidebar_list_item mb-1">
                <Link
                  href={item.path}
                  onClick={(event) => handleNavClick(event, item)}
                  className={`items-center cursor-pointer ${path === item.path ? "-is-active" : ""
                    }`}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.name}
                </Link>
              </div>
            ))}


          {dasboardNavigation.filter((item) => accountPaths.has(item.path)).map((item, i) => (
            <div key={i} className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center cursor-pointer ${path === item.path ? "-is-active" : ""
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
