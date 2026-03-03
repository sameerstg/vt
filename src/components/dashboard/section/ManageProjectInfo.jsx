"use client";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageProjectCard from "../card/ManageProjectCard";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";

const tab = [
  "Posted Projects",
  "Pending Projects",
  "Ongoing Services",
  "Expired Projects",
  "Completed Services",
  "Canceled Services",
];

export default function ManageProjectInfo() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40 pt-4">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>Manage Project</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/create-projects"
                className="btn-3d-blue ml-auto"
              >
                Create Project
                <i className="fal fa-plus" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative" style={{ border: '1px solid #eee' }}>
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30 border-bottom-0">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw600 ps-0 me-4 ${
                          selectedTab == i ? "active" : ""
                        }`}
                        style={{ 
                          color: selectedTab == i ? '#4d1aab' : '#94a3b8',
                          border: 'none',
                          borderBottom: selectedTab == i ? '2px solid #4d1aab' : 'none',
                          paddingBottom: '15px',
                          fontSize: '15px'
                        }}
                        onClick={() => setSelectedTab(i)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Title</th>
                        <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Category</th>
                        <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Type/Cost</th>
                        <th scope="col" style={{ color: '#6200ee', fontWeight: '600', borderTop: 'none', paddingBottom: '20px' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {Array(7)
                        .fill(7)
                        .map((_, i) => (
                          <ManageProjectCard key={i} />
                        ))}
                    </tbody>
                  </table>
                  <div className="mt30">
                    <Pagination1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
