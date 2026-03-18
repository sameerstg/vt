"use client";
import { dasboardNavigation } from "@/data/dashboardAdmin";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAuthSession } from "@/utils/auth/mockAuth";

export default function DashboardSidebar() {
  const path = usePathname();
  const router = useRouter();

  const handleNavClick = (event, item) => {
    const isLogout = item?.name?.toLowerCase() === "logout" || item?.path === "/login" || item?.path === "/client/login";
    if (!isLogout) return;
    event.preventDefault();
    clearAuthSession();
    router.push("/client/login");
  };

  return (
    <>
      <div className="dashboard__sidebar d-none d-lg-block ">
        <div className="dashboard_sidebar_list -mt-40" >
          {dasboardNavigation.slice(0, 1).map((item,i) => (
            <div key={ i } className="sidebar_list_item mt-4">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          

          {dasboardNavigation.slice(1, 5).map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
                }`}
              >
                <i className={`${item.icon} mr15`} />
                {item.name}
              </Link>
            </div>
          ))}

          
          {dasboardNavigation.slice(5, 7).map((item,i) => (
            <div key={ i } className="sidebar_list_item mb-1">
              <Link
                href={item.path}
                onClick={(event) => handleNavClick(event, item)}
                className={`items-center ${
                  path === item.path ? "-is-active" : ""
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
