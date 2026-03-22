"use client";
import { useState, useEffect } from "react";
import ProjectCard1 from "@/components/card/ProjectCard1";
import ListingOption2 from "@/components/element/ListingOption2";
import Pagination1 from "@/components/section/Pagination1";

export default function Listing8() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [budgetFilter, setBudgetFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/worker/projects?type=available");
      const data = await res.json();
      if (data.success) {
        setProjects(data.data.available);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...projects];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    if (budgetFilter) {
      switch (budgetFilter) {
        case "under-500":
          filtered = filtered.filter(p => p.budget < 500);
          break;
        case "500-1000":
          filtered = filtered.filter(p => p.budget >= 500 && p.budget <= 1000);
          break;
        case "1000-5000":
          filtered = filtered.filter(p => p.budget > 1000 && p.budget <= 5000);
          break;
        case "5000-10000":
          filtered = filtered.filter(p => p.budget > 5000 && p.budget <= 10000);
          break;
        case "over-10000":
          filtered = filtered.filter(p => p.budget > 10000);
          break;
      }
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  }, [projects, searchTerm, categoryFilter, typeFilter, budgetFilter]);

  const getCurrentItems = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  };

  const categories = [...new Set(projects.map(p => p.category))];

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setTypeFilter("");
    setBudgetFilter("");
  };

  const hasActiveFilters = searchTerm || categoryFilter || typeFilter || budgetFilter;

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row mb30">
                <div className="col-md-4">
                  <div className="search_area">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span><i className="flaticon-search" /></span>
                  </div>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="VIRTUAL">Remote/Virtual</option>
                    <option value="PHYSICAL">On-site/Physical</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <select
                    className="form-control"
                    value={budgetFilter}
                    onChange={(e) => setBudgetFilter(e.target.value)}
                  >
                    <option value="">Any Budget</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="over-10000">Over $10,000</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mb20">
                  <span className="text-muted">
                    Showing {filteredProjects.length} of {projects.length} projects
                  </span>
                  <div className="mt10">
                    {searchTerm && (
                      <span className="badge bg-primary me-2">Search: {searchTerm}</span>
                    )}
                    {categoryFilter && (
                      <span className="badge bg-primary me-2">{categoryFilter}</span>
                    )}
                    {typeFilter && (
                      <span className="badge bg-primary me-2">{typeFilter === "VIRTUAL" ? "Remote" : "On-site"}</span>
                    )}
                    {budgetFilter && (
                      <span className="badge bg-primary me-2">Budget: {budgetFilter.replace(/-/g, " - ").replace("under", "<").replace("over", ">")}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="row mb30 align-items-center">
                <div className="col-md-6">
                  <span className="heading-title">Available Projects ({filteredProjects.length})</span>
                </div>
              </div>
              {loading ? (
                <div className="text-center p50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : getCurrentItems().length === 0 ? (
                <div className="text-center p50">
                  <i className="flaticon-folder fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">No projects found</h5>
                  <p className="text-muted">
                    {hasActiveFilters
                      ? "Try adjusting your filters to find more projects"
                      : "Check back later for new opportunities"}
                  </p>
                  {hasActiveFilters && (
                    <button className="btn btn-primary mt20" onClick={clearFilters}>
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="row">
                  {getCurrentItems().map((item, i) => (
                    <div key={item.id} className="col-md-6 col-lg-12">
                      <ProjectCard1 data={{
                        id: item.id,
                        title: item.title,
                        brief: item.description?.substring(0, 120),
                        price: { min: item.budget, max: item.budget },
                        location: item.type === "PHYSICAL" ? (item.address || "Location TBD") : "Remote",
                        tags: [item.category, item.budgetModel],
                        img: "/images/team/freelancer-1.png",
                      }} />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt30">
                <Pagination1
                  currentPage={currentPage}
                  totalItems={filteredProjects.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
