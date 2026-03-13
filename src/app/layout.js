"use client";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { useEffect, useRef } from "react";
import BottomToTop from "@/components/button/BottomToTop";
import SearchModal1 from "@/components/modal/SearchModal1";
import GlobalPageLoader from "@/components/ui/GlobalPageLoader";
import { usePathname } from "next/navigation";
import "react-tooltip/dist/react-tooltip.css";
import "rc-slider/assets/index.css";
import NavSidebar from "@/components/sidebar/NavSidebar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export default function RootLayout({ children }) {
  const path = usePathname();
  const wowRef = useRef(null);

  useEffect(() => {
    import("bootstrap");
  }, []);

  // wow js
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className}`} suppressHydrationWarning>
        <GlobalPageLoader />
        <SearchModal1 />
        {children}

        {/* bottom to top */}
        <BottomToTop />

        {/* sidebar mobile navigation */}
        <NavSidebar />
      </body>
    </html>
  );
}
