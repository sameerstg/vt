"use client";

import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 5;

const pendingTone = [
  "bg-amber-100 text-amber-700",
  "bg-blue-100 text-blue-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
];

const getStatusClass = (status, index) => {
  if (status === "Active") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending") {
    return pendingTone[index % pendingTone.length];
  }

  return "bg-slate-100 text-slate-600";
};

const getVisiblePageNumbers = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push("ellipsis-start");
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 1) {
    pages.push("ellipsis-end");
  }

  pages.push(totalPages);
  return pages;
};

const getDepthFromCategoryName = (value) => {
  const matches = value.match(/>\s/g);
  return matches ? matches.length : 0;
};

const stripCategoryDepthPrefix = (value) =>
  value.replace(/^(>\s*)+/, "").trim();

const buildCategoryHierarchy = (rows) => {
  const hierarchy = {};
  let currentMain = "";
  let currentSub = "";

  rows.forEach((item) => {
    const rawName = String(item.name || "");
    const depth = getDepthFromCategoryName(rawName);
    const name = stripCategoryDepthPrefix(rawName);

    if (!name) return;

    if (depth === 0) {
      currentMain = name;
      currentSub = "";
      if (!hierarchy[currentMain]) {
        hierarchy[currentMain] = {};
      }
      return;
    }

    if (depth === 1) {
      if (!currentMain) return;
      currentSub = name;
      if (!hierarchy[currentMain]) {
        hierarchy[currentMain] = {};
      }
      if (!hierarchy[currentMain][currentSub]) {
        hierarchy[currentMain][currentSub] = [];
      }
      return;
    }

    if (!currentMain || !currentSub) return;
    if (!hierarchy[currentMain]) {
      hierarchy[currentMain] = {};
    }
    if (!hierarchy[currentMain][currentSub]) {
      hierarchy[currentMain][currentSub] = [];
    }
    if (!hierarchy[currentMain][currentSub].includes(name)) {
      hierarchy[currentMain][currentSub].push(name);
    }
  });

  return hierarchy;
};

const toSlugToken = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parseCategoryList = (text, startId, existingSlugSet) => {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const parsedRows = [];
  const path = [];
  let idCounter = startId;

  lines.forEach((line) => {
    let depth = null;
    let name = "";

    const level3 = line.match(/^(\d+)\.(\d+)\.(\d+)\s+(.+)$/);
    const level2 = line.match(/^(\d+)\.(\d+)\s+(.+)$/);
    const level1 = line.match(/^(\d+)[.)]\s+(.+)$/);

    if (level3) {
      depth = 2;
      name = level3[4];
    } else if (level2) {
      depth = 1;
      name = level2[3];
    } else if (level1) {
      depth = 0;
      name = level1[2];
    } else {
      name = line.replace(/^[-*]\s*/, "");
      depth = path[1] ? 2 : path[0] ? 1 : 0;
    }

    name = name.trim();
    if (!name) return;

    path[depth] = name;
    path.length = depth + 1;

    const slug = path
      .slice(0, depth + 1)
      .map((segment) => toSlugToken(segment))
      .filter(Boolean)
      .join("-");

    if (!slug || existingSlugSet.has(slug)) return;
    existingSlugSet.add(slug);

    parsedRows.push({
      id: String(idCounter).padStart(3, "0"),
      name: `${depth > 0 ? `${"> ".repeat(depth)}` : ""}${name}`,
      slug,
      activeJobs: 0,
      status: depth === 0 ? "Active" : "Pending",
    });

    idCounter += 1;
  });

  return parsedRows;
};


export default function AdminSettingsCategorySection({ categories = [] }) {
  const [rows, setRows] = useState(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [addingOpen, setAddingOpen] = useState(false);
  const [bulkImportMessage, setBulkImportMessage] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    slug: "",
    note: "This is what i want",
  });

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name,
      slug: item.slug,
      note: "This is what i want",
    });
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;

    setRows((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: editForm.name,
              slug: editForm.slug,
            }
          : item,
      ),
    );

    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;
    setRows((prev) => prev.filter((item) => item.id !== deletingItem.id));
    setDeletingItem(null);
  };

  const handleBulkImportCategories = () => {
    if (!selectedMainCategory || !selectedSubCategory || !selectedServiceCategory) {
      setBulkImportMessage("Main, sub aur service select karein.");
      return;
    }
    const input = [
      `1. ${selectedMainCategory}`,
      `1.1 ${selectedSubCategory}`,
      selectedServiceCategory,
    ].join("\n");

    const existingSlugSet = new Set(rows.map((item) => item.slug).filter(Boolean));
    const selectedServiceSlug = [
      selectedMainCategory,
      selectedSubCategory,
      selectedServiceCategory,
    ]
      .map((segment) => toSlugToken(segment))
      .join("-");
    const existingSelectedIndex = rows.findIndex(
      (item) => item.slug === selectedServiceSlug,
    );
    const nextIdStart =
      rows.reduce(
        (maxValue, item) =>
          Math.max(maxValue, Number.parseInt(String(item.id), 10) || 0),
        0,
      ) + 1;

    const newRows = parseCategoryList(input, nextIdStart, existingSlugSet);

    if (newRows.length === 0) {
      if (existingSelectedIndex >= 0) {
        setCurrentPage(Math.floor(existingSelectedIndex / PAGE_SIZE) + 1);
        setBulkImportMessage("Selected category applied successfully.");
        setAddingOpen(false);
        return;
      }
      setBulkImportMessage("Selected category apply nahi ho saki.");
      return;
    }

    const nextRows = [...rows, ...newRows];
    const selectedIndexInNextRows = nextRows.findIndex(
      (item) => item.slug === selectedServiceSlug,
    );
    setRows(nextRows);
    setCurrentPage(
      selectedIndexInNextRows >= 0
        ? Math.floor(selectedIndexInNextRows / PAGE_SIZE) + 1
        : Math.ceil(nextRows.length / PAGE_SIZE),
    );
    setBulkImportMessage("Selected category applied successfully.");
    setAddingOpen(false);
  };

  const categoryHierarchy = useMemo(() => buildCategoryHierarchy(rows), [rows]);
  const mainCategoryOptions = Object.keys(categoryHierarchy);
  const subCategoryOptions = selectedMainCategory
    ? Object.keys(categoryHierarchy[selectedMainCategory] || {})
    : [];
  const serviceCategoryOptions =
    selectedMainCategory && selectedSubCategory
      ? categoryHierarchy[selectedMainCategory]?.[selectedSubCategory] || []
      : [];

  const setDefaultDropdownSelection = () => {
    const preferredMain = mainCategoryOptions.includes("Home Cleaning")
      ? "Home Cleaning"
      : mainCategoryOptions[0] || "";
    const nextSubOptions = Object.keys(categoryHierarchy[preferredMain] || {});
    const preferredSub =
      preferredMain === "Home Cleaning" && nextSubOptions.includes("Standard Cleaning")
        ? "Standard Cleaning"
        : nextSubOptions[0] || "";
    const nextServiceOptions = categoryHierarchy[preferredMain]?.[preferredSub] || [];
    const preferredService =
      preferredMain === "Home Cleaning" &&
      preferredSub === "Standard Cleaning" &&
      nextServiceOptions.includes("General house cleaning")
        ? "General house cleaning"
        : nextServiceOptions[0] || "";

    setSelectedMainCategory(preferredMain);
    setSelectedSubCategory(preferredSub);
    setSelectedServiceCategory(preferredService);
  };

  const handleMainCategoryChange = (event) => {
    const nextMain = event.target.value;
    const nextSubOptions = Object.keys(categoryHierarchy[nextMain] || {});
    const nextSub = nextSubOptions[0] || "";
    const nextServiceOptions = categoryHierarchy[nextMain]?.[nextSub] || [];
    const nextService = nextServiceOptions[0] || "";

    setSelectedMainCategory(nextMain);
    setSelectedSubCategory(nextSub);
    setSelectedServiceCategory(nextService);
  };

  const handleSubCategoryChange = (event) => {
    const nextSub = event.target.value;
    const nextServiceOptions =
      categoryHierarchy[selectedMainCategory]?.[nextSub] || [];
    const nextService = nextServiceOptions[0] || "";

    setSelectedSubCategory(nextSub);
    setSelectedServiceCategory(nextService);
  };


  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRows = rows.slice(startIndex, startIndex + PAGE_SIZE);
  const visiblePageNumbers = getVisiblePageNumbers(currentPage, totalPages);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
    <div className="row">
      <div className="col-xl-12">
        <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-wrap items-center justify-between gap-3 mb15 px-2 border-b border-light pb10">
            <h4 className="title text-[18px] font-bold text-[#6200ee] mb-0">
              Categories & Taxonomies
            </h4>
            <button
              type="button"
              onClick={() => {
                setAddingOpen(true);
                setDefaultDropdownSelection();
                setBulkImportMessage("");
              }}
              className="ud-btn btn-thm h-11 px-5 fz13 fw700 d-inline-flex align-items-center justify-content-center text-decoration-none"
              style={{
                backgroundColor: "#2d138f",
                borderColor: "#2d138f",
                minWidth: "170px",
                lineHeight: 1,
                letterSpacing: "0.2px",
                textDecoration: "none",
              }}
            >
              Add Category
            </button>
          </div>
          <div className="packages_table table-responsive px-2">
            <table className="table-style3 table at-savesearch align-middle mb-0">
              <thead className="">
                <tr className="border-bottom border-slate-100">
                  <th scope="col" className="px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                  <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                  <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th scope="col" className="text-end px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  
                </tr>
              </thead>
              <tbody className="t-body font-medium">
                {paginatedRows.map((category) => (
                  <tr key={category.id} className="border-bottom border-slate-50 last:border-0">
                    <td className="px-0 py-3 text-slate-900 font-bold fz13">
                      #{category.id}
                    </td>
                    <td className="py-3 text-slate-800 fz13">{category.name}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getStatusClass(
                          category.status,
                          Number(category.id) - 1,
                        )}`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="text-end px-0 py-3">
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          type="button"
                          className="ud-btn btn-light-thm btn-sm h-7 w-7 p-0 fz10 border-0 flex items-center justify-center"
                          style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}
                          onClick={() => openEditModal(category)}
                        >
                          <i className="far fa-pen" />
                        </button>
                        <button
                          type="button"
                          className="ud-btn btn-dark btn-sm h-7 w-7 p-0 fz10 border-0 flex items-center justify-center"
                          style={{ backgroundColor: '#1a1a1a' }}
                          onClick={() => setDeletingItem(category)}
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2 gap-sm-3 mt-3 pt-1 flex-wrap">
            {currentPage === 1 ? (
              <button
                type="button"
                aria-label="Previous page"
                disabled
                className="d-flex justify-content-center align-items-center rounded-circle border border-slate-200 bg-white text-slate-300"
                style={{ width: "40px", height: "40px", fontSize: "16px" }}
              >
                <i className="fas fa-angle-left" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="d-flex justify-content-center align-items-center rounded-circle border border-slate-900 bg-white text-slate-900"
                style={{ width: "40px", height: "40px", fontSize: "16px" }}
              >
                <i className="fas fa-angle-left" />
              </button>
            )}

            {visiblePageNumbers.map((pageItem) =>
              typeof pageItem !== "number" ? (
                <span key={pageItem} className="text-slate-700 fw600 px-1">
                  ...
                </span>
              ) : pageItem === currentPage ? (
                <span
                  key={pageItem}
                  className="d-inline-flex justify-content-center align-items-center rounded-circle text-white fw700 border-0"
                  style={{ width: "40px", height: "40px", backgroundColor: "#4c1d95" }}
                  aria-current="page"
                >
                  {pageItem}
                </span>
              ) : (
                <button
                  key={pageItem}
                  type="button"
                  onClick={() => setCurrentPage(pageItem)}
                  className="border-0 bg-transparent text-slate-900 fw600 px-2 py-1"
                >
                  {pageItem}
                </button>
              ),
            )}

            {currentPage === totalPages ? (
              <button
                type="button"
                aria-label="Next page"
                disabled
                className="d-flex justify-content-center align-items-center rounded-circle border border-slate-200 bg-white text-slate-300"
                style={{ width: "40px", height: "40px", fontSize: "16px" }}
              >
                <i className="fas fa-angle-right" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Next page"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="d-flex justify-content-center align-items-center rounded-circle border border-slate-900 bg-white text-slate-900"
                style={{ width: "40px", height: "40px", fontSize: "16px" }}
              >
                <i className="fas fa-angle-right" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

      {addingOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-[760px] rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setAddingOpen(false)}
              className="absolute right-6 top-6 h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close add category popup"
            >
              <i className="far fa-times" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-2">Add Categories</h3>
            <p className="text-sm text-slate-500 font-medium mb-4">
              Dropdown select karein, phir Apply Filters click karein.
            </p>

            <div className="rounded-xl border border-slate-200 p-4 mb-4 bg-slate-50/50">
              <h4 className="text-sm font-bold text-[#2d138f] mb-3">Dropdown Filter</h4>
              <div className="row g-2">
                <div className="col-md-4">
                  <select
                    value={selectedMainCategory}
                    onChange={handleMainCategoryChange}
                    className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 bg-white outline-none"
                  >
                    {mainCategoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    value={selectedSubCategory}
                    onChange={handleSubCategoryChange}
                    className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 bg-white outline-none"
                  >
                    {subCategoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    value={selectedServiceCategory}
                    onChange={(event) => setSelectedServiceCategory(event.target.value)}
                    className="w-full h-11 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 bg-white outline-none"
                  >
                    {serviceCategoryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {bulkImportMessage ? (
              <p className="mt-3 mb-0 text-xs font-bold text-slate-500">{bulkImportMessage}</p>
            ) : null}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAddingOpen(false)}
                className="h-12 px-6 rounded-xl bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImportCategories}
                className="ud-btn btn-thm h-11 px-4"
                style={{ backgroundColor: "#2d138f", borderColor: "#2d138f" }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      ) : null}


      {editingItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-[600px] rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="absolute right-6 top-6 h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close edit popup"
            >
              <i className="far fa-times" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Edit Category</h3>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editForm.slug}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, slug: event.target.value }))
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                  Description / Note
                </label>
                <textarea
                  rows={4}
                  value={editForm.note}
                  onChange={(event) =>
                    setEditForm((prev) => ({ ...prev, note: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition resize-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="h-12 px-6 rounded-xl bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="ud-btn btn-thm"
              >
                Update Category
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deletingItem ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-[450px] rounded-2xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mx-auto h-16 w-16 rounded-full bg-rose-50 flex items-center justify-center mb-6">
               <i className="far fa-trash-alt text-2xl text-rose-500" />
            </div>
            
            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">
              Are you sure?
            </h3>
            <p className="text-center text-slate-500 text-sm font-medium leading-relaxed">
              This action will permanently delete <span className="font-bold text-slate-900">"{deletingItem.name}"</span>. This process cannot be undone.
            </p>
            
            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="h-12 rounded-xl bg-slate-50 text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="h-12 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700 transition shadow-lg shadow-rose-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
