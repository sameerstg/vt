"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toggleStore from "@/store/toggleStore";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import DashboardFooter from "./footer/DashboardFooter";
import { getAuthSession, getRoleFlow } from "@/utils/auth/mockAuth";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = toggleStore((state) => state.isDasboardSidebarActive);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const session = getAuthSession();
    if (!session?.role) {
      router.replace("/client/login");
      return;
    }

    if (session.role !== "admin") {
      const roleFlow = getRoleFlow(session.role);
      router.replace(roleFlow?.dashboardPath || "/client/login");
      return;
    }

    setIsAuthorized(true);
  }, [pathname, router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div
          className={`dashboard dashboard_wrapper pr30 pr0-xl ${
            isActive ? "dsh_board_sidebar_hidden" : ""
          }`}
        >
          <DashboardSidebar />
          <div className="dashboard__main pl0-md">
            {children}
            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}
