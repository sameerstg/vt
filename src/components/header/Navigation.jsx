"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${
          path == "/home-3" || path == "/home-4" || path == "/home-10"
            ? "menu-without-paddingy"
            : ""
        } `}
      >
        {navigation.map((item, i) => {
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;
          const isSingleDirectChild =
            hasChildren &&
            item.children.length === 1 &&
            !item.children[0]?.children &&
            !!item.children[0]?.path;
          const directPath = isSingleDirectChild ? item.children[0].path : item.path;
          const isActiveTopLink = directPath
            ? directPath === path || directPath === path.replace(/\/\d+$/, "")
            : isActiveNavigation(path, item);

          return (
            <li
              key={i}
              className={`visible_list menu-active ${
                item.id == 1 ? "home-menu-parent" : ""
              } `}
            >
              {hasChildren && !isSingleDirectChild ? (
                <a
                  className={`list-item  ${
                    isActiveNavigation(path, item) ? "ui-active" : ""
                  }`}
                >
                  <span className="title">{item.name}</span>{" "}
                  <span className="arrow "></span>
                </a>
              ) : (
                <Link
                  href={directPath || "/"}
                  className={`list-item ${isActiveTopLink ? "ui-active" : ""}`}
                >
                  <span className="title">{item.name}</span>
                </Link>
              )}

              {hasChildren && !isSingleDirectChild && (
                <ul className={`sub-menu ${item.id == 1 ? "home-menu" : ""} `}>
                  {item.children?.map((item2, i2) => (
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
                      ) : (
                        <Link href={item2.path}>
                          <span className="title">{item2.name}</span>
                        </Link>
                      )}

                      {item2.children && (
                        <ul className="sub-menu">
                          {item2.children?.map((item3, i3) => (
                            <li
                              key={i3}
                              className={
                                item3.path === path ||
                                item3.path === path.replace(/\/\d+$/, "")
                                  ? "ui-child-active"
                                  : ""
                              }
                            >
                              <Link href={item3.path}>{item3.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
