"use client";
import Link from "next/link";
import Mega from "./Mega";
import Image from "next/image";
import Navigation from "./Navigation";
import useStickyMenu from "@/hook/useStickyMenu";
import MobileNavigation1 from "./MobileNavigation1";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AUTH_SESSION_EVENT,
    clearAuthSession,
    getAuthSession,
    getRoleFlow,
} from "@/utils/auth/mockAuth";

export default function Header1() {
    const router = useRouter();
    const sticky = useStickyMenu(50);
    const [session, setSession] = useState(null);
    const [isSessionReady, setIsSessionReady] = useState(false);
    const dashboardHref = useMemo(() => {
        if (!session?.role) return "/seller/login";
        return getRoleFlow(session.role)?.dashboardPath || "/seller/login";
    }, [session]);

    useEffect(() => {
        const syncSession = () => setSession(getAuthSession());
        syncSession();
        setIsSessionReady(true);

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
            <header
                className={`header-nav nav-homepage-style stricky main-menu animated   ${
                    sticky ? "slideInDown stricky-fixed" : "slideIn"
                }`}
            >
                <nav className="posr">
                    <div className="container-fluid posr menu_bdrt1 px30">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto px-0">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="logos br-white-light pr30 pr5-xl">
                                        <Link
                                            className="header-logo logo1"
                                            href="/"
                                        >
                                            <Image
                                                height={35}
                                                width={123}
                                                src="/images/logo.png"
                                                alt="Header Logo"
                                            />
                                        </Link>
                                        <Link
                                            className="header-logo logo2"
                                            href="/"
                                        >
                                            <Image
                                                height={40}
                                                width={123}
                                                src="/images/logo.png"
                                                alt="Header Logo"
                                            />
                                        </Link>
                                    </div>
                                    <div className="home1_style">
                                        <Mega />
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto px-5">
                                <div className="d-flex align-items-center header-right-cluster header-right-cluster--centered ">
                                    <Navigation />
                                    {/* {(!isSessionReady || !session) && (
                                        <Link
                                            className="login-info bdrl1 pl15-lg pl30"
                                            data-bs-toggle="modal"
                                            href="#exampleModalToggle"
                                        >
                                            <span className="flaticon-loupe" />
                                        </Link>
                                    )} */}
                                    {!isSessionReady ? null : session ? (
                                        <>
                                            <Link
                                                className="login-info d-none d-xxl-inline-block header-user-link"
                                                href={dashboardHref}
                                            >
                                                <span
                                                    className="d-inline-block text-truncate"
                                                    style={{ maxWidth: "140px", verticalAlign: "bottom" }}
                                                >
                                                    {session.name}
                                                </span>
                                            </Link>
                                            <button
                                                type="button"
                                                className="ud-btn btn-white add-joining"
                                                style={{ padding: "10px 14px", minWidth: "92px", lineHeight: 1.1 }}
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                className={`login-info mx15-lg mx30`}
                                                href="/become-seller"
                                            >
                                                <span className="d-none d-xl-inline-block">
                                                    Become a
                                                </span>{" "}
                                                Contractor &amp; Worker
                                            </Link>
                                            <Link
                                                className={`login-info mr15-lg mr30`}
                                                href="/login"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                className="ud-btn btn-white add-joining"
                                                href="/register"
                                            >
                                                Join
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <MobileNavigation1 />
        </>
    );
}
