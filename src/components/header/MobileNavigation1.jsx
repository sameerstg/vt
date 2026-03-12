"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AUTH_SESSION_EVENT,
  clearAuthSession,
  getAuthSession,
  getRoleFlow,
} from "@/utils/auth/mockAuth";

export default function MobileNavigation1() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const mobileUserLabel = useMemo(() => {
    if (!session?.name) return "";
    return session.name.split(" ")[0];
  }, [session]);
  const dashboardHref = useMemo(() => {
    if (!session?.role) return "/seller/login";
    return getRoleFlow(session.role)?.dashboardPath || "/seller/login";
  }, [session]);

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());
    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener(AUTH_SESSION_EVENT, syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener(AUTH_SESSION_EVENT, syncSession);
    };
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    router.push("/seller/login");
  };

  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bb-white-light">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="mobile_logo" href="/">
                  <Image
                    height={40}
                    width={133}
                    src="/images/logo.png"
                    alt="Header Logo"
                  />
                </Link>
                <div className="right-side text-end">
                  {session ? (
                    <>
                      <Link className="text-white" href={dashboardHref}>
                        {mobileUserLabel}
                      </Link>
                      <button
                        type="button"
                        className="text-white border-0 bg-transparent ml10"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link className="text-white" href="/login">
                      join
                    </Link>
                  )}
                  <a
                    className="menubar ml30"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/white-nav-icon.svg"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
