"use client";

import { adminSidebarItems } from "@/data/adminDashboard";
import AdminNavIcon from "@/components/dashboard/element/AdminNavIcon";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const pathname = usePathname();
  const isDashboardNamespace =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  const routeBase = isDashboardNamespace ? "/dashboard" : "/admin";

  const normalizeAdminPath = (path) => {
    if (routeBase === "/admin") {
      return path;
    }

    return path.replace(/^\/admin/, routeBase);
  };

  const startItems = adminSidebarItems.filter((item) => item.group === "start");
  const organizeItems = adminSidebarItems.filter(
    (item) => item.group === "organize",
  );
  const accountItems = adminSidebarItems.filter((item) => item.group === "account");

  const isNavActive = (navPath) => {
    const resolvedPath = normalizeAdminPath(navPath);

    if (resolvedPath === routeBase) {
      return pathname === resolvedPath;
    }

    return pathname === resolvedPath || pathname.startsWith(`${resolvedPath}/`);
  };

  return (
    <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
      <nav className="posr">
        <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
          <div className="row align-items-center justify-content-between">
            <div className="col-6 col-lg-auto">
              <div className="text-center text-lg-start d-flex align-items-center">
                <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                  <Link href="/" className="logo">
                    <Image
                      height={40}
                      width={133}
                      src="/images/logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
                <div className="fz20 ml90">
                  <a onClick={toggle} className="dashboard_sidebar_toggle_icon vam">
                    <Image
                      height={18}
                      width={20}
                      src="/images/dashboard-navicon.svg"
                      alt="navicon"
                    />
                  </a>
                </div>
                <a
                  className="login-info d-block d-xl-none ml40 vam"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                >
                  <span className="flaticon-loupe" />
                </a>
                <div className="ml40 d-none d-xl-block">
                  <div className="search_area dashboard-style">
                    <input
                      type="text"
                      className="form-control border-0"
                      placeholder="What service are you looking for today?"
                    />
                    <label>
                      <span className="flaticon-loupe" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-auto">
              <div className="text-center text-lg-end header_right_widgets">
                <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                  <li className="d-none d-sm-block">
                    <a className="text-center mr5 text-thm2 fz20">
                      <span className="flaticon-notification" />
                    </a>
                  </li>
                  <li className="d-none d-sm-block">
                    <a className="text-center mr5 text-thm2 fz20">
                      <span className="flaticon-mail" />
                    </a>
                  </li>
                  <li className="d-none d-sm-block">
                    <a className="text-center mr5 text-thm2 fz20">
                      <span className="flaticon-like" />
                    </a>
                  </li>
                  <li className="user_setting">
                    <div className="dropdown">
                      <a className="btn" data-bs-toggle="dropdown">
                        <Image
                          height={50}
                          width={50}
                          src="/images/resource/user.png"
                          alt="user.png"
                        />
                      </a>
                      <div className="dropdown-menu">
                        <div className="user_setting_content">
                          <p className="fz15 fw400 ff-heading mb10 pl30">Start</p>
                          {startItems.map((item) => (
                            <Link
                              key={item.id}
                              className={`dropdown-item ${
                                isNavActive(item.path) ? "active" : ""
                              }`}
                              href={normalizeAdminPath(item.path)}
                            >
                              <span className="d-inline-flex align-items-center gap-2">
                                <AdminNavIcon
                                  icon={item.icon || "flaticon-home"}
                                  className="h-4 w-4 shrink-0"
                                />
                                {item.label}
                              </span>
                            </Link>
                          ))}
                          <p className="fz15 fw400 ff-heading mt30 pl30">
                            Organize and Manage
                          </p>
                          {organizeItems.map((item) => (
                            <Link
                              key={item.id}
                              className={`dropdown-item ${
                                isNavActive(item.path) ? "active" : ""
                              }`}
                              href={normalizeAdminPath(item.path)}
                            >
                              <span className="d-inline-flex align-items-center gap-2">
                                <AdminNavIcon
                                  icon={item.icon || "flaticon-web"}
                                  className="h-4 w-4 shrink-0"
                                />
                                {item.label}
                              </span>
                            </Link>
                          ))}
                          <p className="fz15 fw400 ff-heading mt30 pl30">Account</p>
                          {accountItems.map((item) => (
                            <Link
                              key={item.id}
                              className={`dropdown-item ${
                                isNavActive(item.path) ? "active" : ""
                              }`}
                              href={normalizeAdminPath(item.path)}
                            >
                              <span className="d-inline-flex align-items-center gap-2">
                                <AdminNavIcon
                                  icon={item.icon || "flaticon-user"}
                                  className="h-4 w-4 shrink-0"
                                />
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
