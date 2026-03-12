"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  AUTH_SESSION_EVENT,
  getAuthSession,
} from "@/utils/auth/mockAuth";
import filterNavigationByRole from "@/utils/auth/filterNavigationByRole";

export default function NavSidebar() {
  const path = usePathname();
  const crossRef = useRef(null);
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
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header border-bottom">
          <Link href="/">
            <Image
              alt="Header Logo"
              width="133"
              height="40"
              src="/images/logo.png"
            />
          </Link>
          <button
            ref={crossRef}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="ui-navigation-sidebar">
            <Sidebar>
              <Menu>
                {menuItems.map((item,i) =>
                  item?.children ? (
                    <SubMenu
                      key={ i }
                      label={item.name}
                      className={
                        isActiveNavigation(path, item) ? "ui-mobile-active" : ""
                      }
                    >
                      {item.children.map((item2,i2) =>
                        item2?.children ? (
                          <SubMenu
                            key={i2}
                            label={item2.name}
                            className={
                              isActiveNavigation(path, item2)
                                ? "ui-mobile-active"
                                : ""
                            }
                          >
                            {item2.children.map((item3,i3) => (
                              <MenuItem
                                key={i3}
                                component={
                                  hasPath(item3.path) ? <Link href={item3.path} /> : undefined
                                }
                                className={
                                  item3.path === path ||
                                  item3.path === path.replace(/\/\d+$/, "")
                                    ? "ui-mobile-active"
                                    : ""
                                }
                              >
                                <span data-bs-dismiss="offcanvas">
                                  {item3.name}
                                </span>
                              </MenuItem>
                            ))}
                          </SubMenu>
                        ) : (
                          <MenuItem
                            key={i2}
                            component={
                              hasPath(item2.path) ? <Link href={item2.path} /> : undefined
                            }
                            className={
                              item2.path === path ? "ui-mobile-active" : ""
                            }
                          >
                            <span data-bs-dismiss="offcanvas">
                              {item2.name}
                            </span>
                          </MenuItem>
                        ),
                      )}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      key={ i }
                      component={hasPath(item.path) ? <Link href={item.path} /> : undefined}
                      className={item.path === path ? "ui-mobile-active" : ""}
                    >
                      <span data-bs-dismiss="offcanvas">{item.name}</span>
                    </MenuItem>
                  ),
                )}
              </Menu>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
}
