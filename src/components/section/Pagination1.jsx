"use client";

import { usePathname } from "next/navigation";

const getVisiblePages = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function Pagination1({
  currentPage = 2,
  totalPages = 20,
  totalItems = 300,
  pageSize = 20,
  onPageChange,
  countLabel = "property available",
}) {
  const path = usePathname();
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  const canGoPrev = safeCurrentPage > 1;
  const canGoNext = safeCurrentPage < safeTotalPages;
  const visiblePages = getVisiblePages(safeCurrentPage, safeTotalPages);

  const startItem =
    totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem =
    totalItems === 0 ? 0 : Math.min(safeCurrentPage * pageSize, totalItems);

  const goToPage = (page) => {
    if (typeof onPageChange !== "function") return;
    if (page < 1 || page > safeTotalPages) return;
    onPageChange(page);
  };

  return (
    <>
      <div
        className={`mbp_pagination text-center ${
          path === "/blog-2" || path === "/blog-3" ? "mb40-md" : ""
        } ${path === "/shop-list" ? "mt30" : ""}`}
      >
        <ul className="page_navigation">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => goToPage(safeCurrentPage - 1)}
              disabled={!canGoPrev}
              aria-label="Go to previous page"
            >
              <span className="fas fa-angle-left" />
            </button>
          </li>

          {visiblePages.map((item, index) => {
            if (item === "...") {
              return (
                <li key={`ellipsis-${index}`} className="page-item">
                  <span className="page-link">...</span>
                </li>
              );
            }

            const isActive = item === safeCurrentPage;

            return (
              <li
                key={`page-${item}`}
                className={`page-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => goToPage(item)}
                  disabled={isActive}
                >
                  {item}
                  {isActive ? <span className="sr-only">(current)</span> : null}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => goToPage(safeCurrentPage + 1)}
              disabled={!canGoNext}
              aria-label="Go to next page"
            >
              <span className="fas fa-angle-right" />
            </button>
          </li>
        </ul>

        <p className="mt10 mb-0 pagination_page_count text-center">
          {startItem} - {endItem} of {totalItems}
          {totalItems > 99 ? "+" : ""} {countLabel}
        </p>
      </div>
    </>
  );
}
