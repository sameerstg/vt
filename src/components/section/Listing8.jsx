"use client";
import { project1 } from "@/data/product";
import ProjectCard1 from "../card/ProjectCard1";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebar2 from "../sidebar/ListingSidebar2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import { useState, useEffect, useMemo } from "react";
import { getAllPublishedTasks } from "@/utils/auth/mockAuth";

export default function Listing8() {
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Initial fetch
    setDynamicProjects(getAllPublishedTasks());

    // Listen for storage changes to update list immediately if a task is published
    const handleStorage = (e) => {
      if (e.key === "vt_registered_users") {
        setDynamicProjects(getAllPublishedTasks());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getPrice = priceStore((state) => state.priceRange);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getLocation = listingStore((state) => state.getLocation);
  const getSearch = listingStore((state) => state.getSearch);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getEnglishLevel = listingStore((state) => state.getEnglishLevel);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    getCategory,
    getProjectType,
    getPrice,
    getDesginTool,
    getLocation,
    getSearch,
    getSpeak,
    getBestSeller,
    getEnglishLevel,
  ]);

  // Normalize dynamic projects to fit ProjectCard1
  const normalizedDynamic = useMemo(() => {
    return dynamicProjects.map(task => {
      // Parse budget: "$1200" -> {min: 1200, max: 1200} or similar
      const budgetVal = parseInt(task.budget?.replace(/[^0-9]/g, '') || "0");
      
      return {
        id: task.id,
        img: task.clientImage || `/images/team/client-1.png`,
        title: task.title,
        location: task.location || task.clientLocation || "Remote",
        price: { min: budgetVal, max: budgetVal },
        category: task.category,
        projectType: task.budgetModel === "fixed" ? "Fixed" : "Milestone",
        language: "English",
        skills: (task.skills || []).join(" ") || task.category,
        tags: [task.category, task.workMode === "virtual" ? "Remote" : "On-site"],
        brief: task.description?.substring(0, 150) + (task.description?.length > 150 ? "..." : ""),
        author: task.clientName,
        createdAt: task.createdAt,
        proposals: task.proposals || 0
      };
    });
  }, [dynamicProjects]);

  // Merge static and dynamic data
  const allProjects = useMemo(() => {
    return [...normalizedDynamic, ...project1];
  }, [normalizedDynamic]);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : item;

  // project-type filter
  const projectTypeFilter = (item) =>
    getProjectType?.length !== 0
      ? getProjectType.includes(item.projectType)
      : item;

  // price filter
  const priceFilter = (item) =>
    getPrice.min <= item.price.min && getPrice.max >= item.price.max;

  // skill filter
  const skillFilter = (item) =>
    getDesginTool?.length !== 0
      ? getDesginTool.includes(item.skills?.split(" ").join("-").toLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location?.split(" ").join("-").toLowerCase())
      : item;

  // search filter
  const searchFilter = (item) =>
    getSearch !== ""
      ? item.location
          ?.split("-")
          .join(" ")
          .toLowerCase()
          .includes(getSearch.toLowerCase()) || 
        item.title?.toLowerCase().includes(getSearch.toLowerCase())
      : item;

  // speak filter
  const speakFilter = (item) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language?.split(" ").join("-").toLowerCase())
      : item;

  // english level filter
  const englishLevelFilter = (item) =>
    getEnglishLevel?.length !== 0
      ? getEnglishLevel.includes(item.englishLevel)
      : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  // content
  const filteredProjects = allProjects
    .filter(categoryFilter)
    .filter(projectTypeFilter)
    .filter(priceFilter)
    .filter(skillFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(speakFilter)
    .filter(englishLevelFilter)
    .filter(sortByFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  let content = paginatedProjects.map((item, i) => (
    <div key={item.id || i} className="col-md-6 col-lg-12">
      <ProjectCard1 data={item} />
    </div>
  ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar2 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={filteredProjects.length} />
              <div className="row">
                {content.length > 0 ? content : (
                  <div className="col-12 text-center p50">
                    <h5>No projects found matching your filters.</h5>
                  </div>
                )}
              </div>
              <div className="mt30">
                <Pagination1 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredProjects.length}
                  pageSize={itemsPerPage}
                  onPageChange={(page) => setCurrentPage(page)}
                  countLabel="Project available"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}
