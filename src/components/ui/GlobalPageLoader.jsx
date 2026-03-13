"use client";

import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { usePathname } from "next/navigation";

const MIN_VISIBLE_MS = 260;
const MAX_VISIBLE_MS = 10000;

export default function GlobalPageLoader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const shownAtRef = useRef(0);
  const hideTimerRef = useRef(null);
  const failSafeTimerRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (failSafeTimerRef.current) {
      clearTimeout(failSafeTimerRef.current);
      failSafeTimerRef.current = null;
    }
  }, []);

  const showLoader = useCallback(() => {
    clearTimers();
    shownAtRef.current = Date.now();
    setIsVisible(true);

    failSafeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      clearTimers();
    }, MAX_VISIBLE_MS);
  }, [clearTimers]);

  const hideLoader = useCallback(() => {
    const elapsed = Date.now() - shownAtRef.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);

    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
      clearTimers();
    }, delay);
  }, [clearTimers]);

  useEffect(() => {
    hideLoader();
  }, [pathname, hideLoader]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target?.closest?.("a");
      if (!anchor) return;
      if (anchor.hasAttribute("download")) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.getAttribute("data-bs-toggle")) return;

      let nextUrl;
      try {
        nextUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (nextUrl.origin !== window.location.origin) return;

      const currentPath = `${window.location.pathname}${window.location.search}`;
      const nextPath = `${nextUrl.pathname}${nextUrl.search}`;
      if (currentPath === nextPath) return;

      showLoader();
    };

    const handlePopState = () => {
      showLoader();
    };

    window.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [clearTimers, showLoader]);

  return (
    <div
      className={`global-page-loader ${isVisible ? "is-visible" : ""}`}
      aria-hidden={!isVisible}
    >
      <div className="global-page-loader__inner">
        <span className="global-page-loader__ring" />
        <span className="global-page-loader__text">Loading...</span>
      </div>
    </div>
  );
}
