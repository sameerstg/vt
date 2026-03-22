"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState, useEffect } from "react";
import Pagination1 from "@/components/section/Pagination1";
import WorkerProjectCard from "../card/WorkerProjectCard";
import OfferCard from "../card/OfferCard";

const tabs = [
  { label: "Proposed Projects", status: "OFFERS" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "In Review", status: "SUBMITTED" },
  { label: "Completed", status: "COMPLETED" },
];

export default function ManageProjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [offers, setOffers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tabs[selectedTab].status === "OFFERS") {
        const res = await fetch("/api/worker/offers");
        const data = await res.json();
        if (data.success) {
          const pendingOffers = data.data.filter(o => o.status === "PENDING");
          setAllOffers(pendingOffers);
          setTotalItems(pendingOffers.length);
        }
      } else if (tabs[selectedTab].status === "IN_PROGRESS" || tabs[selectedTab].status === "SUBMITTED" || tabs[selectedTab].status === "COMPLETED") {
        const res = await fetch("/api/worker/projects?type=assigned");
        const data = await res.json();
        if (data.success) {
          const filtered = data.data.assigned.filter(p => p.status === tabs[selectedTab].status);
          setAllProjects(filtered);
          setTotalItems(filtered.length);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    if (tabs[selectedTab].status === "OFFERS") {
      setOffers(allOffers.slice(start, start + itemsPerPage));
    } else {
      setProjects(allProjects.slice(start, start + itemsPerPage));
    }
  }, [allProjects, allOffers, currentPage, selectedTab]);

  const getCurrentItems = () => {
    if (tabs[selectedTab].status === "OFFERS") {
      return offers;
    }
    return projects;
  };

  const showOffers = tabs[selectedTab].status === "OFFERS";

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Project</h2>
              <p className="text">View and manage your projects</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/worker/browse-projects"
                className="ud-btn btn-dark default-box-shadow2"
              >
                Browse Projects
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500 ps-0 ${selectedTab === i ? "active" : ""}`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </nav>

                {loading ? (
                  <div className="text-center p50">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : getCurrentItems().length === 0 ? (
                  <div className="text-center p50">
                    <i className="flaticon-folder fz60 text-muted mb20 d-block" />
                    <h5 className="text-muted">No {tabs[selectedTab].label.toLowerCase()} found</h5>
                    {tabs[selectedTab].status === "OFFERS" && (
                      <Link href="/worker/browse-projects" className="ud-btn btn-thm mt20">
                        Browse Projects
                        <i className="fal fa-arrow-right-long" />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Category</th>
                          <th scope="col">{showOffers ? "Your Bid" : "Status/Budget"}</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {getCurrentItems().map((item) => (
                          showOffers ? (
                            <OfferCard key={item.id} offer={item} />
                          ) : (
                            <WorkerProjectCard key={item.id} project={item} />
                          )
                        ))}
                      </tbody>
                    </table>
                    <div className="mt30">
                      <Pagination1
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
