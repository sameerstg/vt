"use client";

import { serviceCategories } from "@/data/serviceCatalog";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const splitInHalf = (items) => {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
};

export default function Mega({ staticMenuClass }) {
  const [activeCategorySlug, setActiveCategorySlug] = useState(
    serviceCategories[0]?.slug || "",
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const megaMenuRef = useRef(null);
  const [leftCategories, rightCategories] = splitInHalf(serviceCategories);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!megaMenuRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const openMenu = () => {
    setActiveCategorySlug(
      (currentSlug) => currentSlug || serviceCategories[0]?.slug || "",
    );
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderCategoryItem = (category) => {
    const isActive = activeCategorySlug === category.slug;
    const [leftSections, rightSections] = splitInHalf(category.sections);
    const sectionColumns = [leftSections, rightSections].filter(
      (column) => column.length > 0,
    );

    return (
      <li
        key={category.title}
        onMouseEnter={() => setActiveCategorySlug(category.slug)}
        style={{
          position: "relative",
          zIndex: isActive ? 4 : 1,
          backgroundColor: isActive ? "#f0efec" : undefined,
          borderLeft: isActive
            ? "2px solid var(--primary-color)"
            : "2px solid transparent",
        }}
      >
        <Link className="dropdown" href={`/services/${category.slug}`} onClick={closeMenu}>
          <span className={`menu-icn ${category.icon}`} />
          <span className="menu-title">{category.title}</span>
        </Link>

        <div
          className="drop-menu d-flex justify-content-between"
          style={{
            left: "calc(100% - 2px)",
            width: "min(720px, 82vw)",
            maxHeight: "560px",
            overflowY: "auto",
            opacity: isMenuOpen && isActive ? 1 : 0,
            visibility: isMenuOpen && isActive ? "visible" : "hidden",
            pointerEvents: isMenuOpen && isActive ? "auto" : "none",
            transform: isMenuOpen && isActive ? "translateX(0)" : "translateX(-1%)",
            zIndex: isMenuOpen && isActive ? 25 : -1,
          }}
        >
          {sectionColumns.map((columnSections, columnIndex) => (
            <div
              key={`${category.title}-column-${columnIndex}`}
              className="mega-drop-column"
              style={{ width: `${100 / sectionColumns.length - 2}%` }}
            >
              {columnSections.map((section, sectionIndex) => (
                <div key={`${category.title}-${section.title}`}>
                  <div className="h6 cat-title">{section.title}</div>
                  <ul
                    className={`ps-0 ${
                      sectionIndex === columnSections.length - 1 ? "mb-0" : "mb40"
                    }`}
                  >
                    {section.items.map((item) => (
                      <li key={`${section.title}-${item.slug}`}>
                        <Link
                          href={`/services/${category.slug}/${item.slug}`}
                          onClick={closeMenu}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </li>
    );
  };

  return (
    <div
      id="mega-menu"
      ref={megaMenuRef}
      style={{ position: "relative" }}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <button
        type="button"
        className={`btn-mega fw500 border-0 bg-transparent ${staticMenuClass ? staticMenuClass : ""} `}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
        style={{
          display: "inline-flex",
          alignItems: "center",
          minWidth: "150px",
          height: "50px",
          lineHeight: 1,
        }}
      >
        <span
          className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${
            staticMenuClass ? staticMenuClass : ""
          } `}
        />
        Categories
      </button>

      <div
        className="menu ps-0 mega-two-column-menu"
        style={{
          width: "min(660px, 78vw)",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          columnGap: 0,
          alignItems: "start",
          position: "absolute",
          left: 0,
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden",
          pointerEvents: isMenuOpen ? "auto" : "none",
          top: isMenuOpen ? "calc(100% - 10px)" : "calc(100% + 4px)",
          zIndex: 90,
        }}
      >
        <ul className="ps-0 mb-0" style={{ listStyle: "none" }}>
          {leftCategories.map((category) => renderCategoryItem(category))}
        </ul>
        <ul className="ps-0 mb-0" style={{ listStyle: "none" }}>
          {rightCategories.map((category) => renderCategoryItem(category))}
        </ul>
      </div>
    </div>
  );
}
