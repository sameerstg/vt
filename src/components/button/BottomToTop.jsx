"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BottomToTop() {
  const [isBottom, setBottom] = useState(false);
  const pathname = usePathname();
  const isTaskMonitoringRoute =
    pathname === "/dashboard/task-monitoring" ||
    pathname.startsWith("/dashboard/task-monitoring/") ||
    pathname === "/admin/task-monitoring" ||
    pathname.startsWith("/admin/task-monitoring/");

  // scroll from top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setBottom(scrollTop > 80);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // bottom to top handler
  const bottomToTopHandler = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <a
        onClick={bottomToTopHandler}
        aria-label="Back to top"
        className={`scrollToHome ${isBottom ? "show" : ""}${isTaskMonitoringRoute ? " tm-round-up" : ""}`}
      >
        <i className="fas fa-angle-up" />
      </a>
    </>
  );
}
