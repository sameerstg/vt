"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
} from "@/utils/auth/mockAuth";
import filterNavigationByRole from "@/utils/auth/filterNavigationByRole";

export default function Navigation() {
  const path = usePathname();
  const [sessionRole, setSessionRole] = useState(null);

  useEffect(() => {
    const syncSessionRole = () => {
      const session = getAuthSession();
      setSessionRole(session?.role || null);
    };

    syncSessionRole();
    window.addEventListener("storage", syncSessionRole);
    window.addEventListener(AUTH_SESSION_EVENT, syncSessionRole);

    return () => {
      window.removeEventListener("storage", syncSessionRole);
      window.removeEventListener(AUTH_SESSION_EVENT, syncSessionRole);
    };
  }, []);

  const menuItems = filterNavigationByRole(navigation, sessionRole);
  const hasPath = (value) => typeof value === "string" && value.length > 0;

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${
          path == "/home-3" || path == "/home-4" || path == "/home-10"
            ? "menu-without-paddingy"
            : ""
        } `}
      >
        {menuItems.map((item,i) => (
          <li
            key={ i }
            className={`visible_list menu-active ${
              item.id == 1 ? "home-menu-parent" : ""
            } `}
          >
            {item.children ? (
              <a
                className={`list-item  ${
                  isActiveNavigation(path, item) ? "ui-active" : ""
                }`}
              >
                <span className="title">{item.name}</span>{" "}
                {item.children && <span className="arrow "></span>}
              </a>
            ) : hasPath(item.path) ? (
              <Link
                href={item.path}
                className={`list-item
                                ${item.path === path ? "ui-active" : ""}`}
              >
                <span className="title">{item.name}</span>
              </Link>
            ) : (
              <a className="list-item">
                <span className="title">{item.name}</span>
              </a>
            )}

            {item.children && (
              <ul className={`sub-menu ${item.id == 1 ? "home-menu" : ""} `}>
                {item.children?.map((item2,i2) => (
                  <li
                    key={i2}
                    className={`menu-active ${
                      isActiveNavigation(path, item2) || item2.path === path
                        ? "ui-child-active"
                        : ""
                    }`}
                  >
                    {item2.children ? (
                      <a>
                        <span className="title">{item2.name}</span>
                        {item2.children && <span className="arrow "></span>}
                      </a>
                    ) : hasPath(item2.path) ? (
                      <Link href={item2.path}>
                        <span className="title">{item2.name}</span>
                      </Link>
                    ) : (
                      <a>
                        <span className="title">{item2.name}</span>
                      </a>
                    )}

                    {item2.children && (
                      <ul className="sub-menu">
                        {item2.children?.map((item3,i3) => (
                          <li
                            key={i3}
                            className={
                              item3.path === path ||
                              item3.path === path.replace(/\/\d+$/, "")
                                ? "ui-child-active"
                                : ""
                            }
                          >
                            {hasPath(item3.path) ? (
                              <Link href={item3.path}>{item3.name}</Link>
                            ) : (
                              <a>{item3.name}</a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
