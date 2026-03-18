"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import GlobalPageLoader from "@/components/ui/GlobalPageLoader";

const NavSidebar = dynamic(() => import("@/components/sidebar/NavSidebar"), {
  ssr: false,
});

export default function AppClientShell({ children }) {
  const path = usePathname();
  const wowRef = useRef(null);

  useEffect(() => {
    import("bootstrap");
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timer = null;
    let idleId = null;

    const runWow = async () => {
      if (cancelled) return;
      const wowModule = await import("@/utils/wow");
      if (cancelled) return;

      if (!wowRef.current) {
        wowRef.current = new wowModule.default({
          mobile: false,
          live: false,
        });
        wowRef.current.init();
        return;
      }

      wowRef.current.sync?.();
    };

    const scheduleRun = () => {
      timer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(() => {
            runWow();
          });
          return;
        }

        runWow();
      }, 120);
    };

    if (document.readyState === "complete") {
      scheduleRun();
    } else {
      window.addEventListener("load", scheduleRun, { once: true });
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      window.removeEventListener("load", scheduleRun);
    };
  }, [path]);

  return (
    <>
      <GlobalPageLoader />
      <SearchModal1 />
      {children}
      <BottomToTop />
      <NavSidebar />
    </>
  );
}
