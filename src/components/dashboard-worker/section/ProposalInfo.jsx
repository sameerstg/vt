"use client";

import { useMemo, useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import { project1 } from "@/data/product";
import DeleteModal from "../modal/DeleteModal";
import ProposalModal1 from "../modal/ProposalModal1";

const STATUS_TABS = [
  { key: "submitted", label: "Submitted" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "awaiting-escrow", label: "Awaiting escrow" },
];

export default function ProposalInfo() {
  const [activeStatus, setActiveStatus] = useState("submitted");

  const proposals = useMemo(() => {
    const statusCycle = ["submitted", "approved", "rejected", "awaiting-escrow"];
    return project1.slice(0, 7).map((item, index) => ({
      ...item,
      proposalStatus: statusCycle[index % statusCycle.length],
    }));
  }, []);

  const statusCounts = useMemo(
    () =>
      STATUS_TABS.reduce((acc, tab) => {
        acc[tab.key] = proposals.filter((proposal) => proposal.proposalStatus === tab.key).length;
        return acc;
      }, {}),
    [proposals],
  );

  const filteredProposals = useMemo(
    () => proposals.filter((proposal) => proposal.proposalStatus === activeStatus),
    [activeStatus, proposals],
  );

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>My Proposals</h2>
              <p className="text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {STATUS_TABS.map((tab) => (
                      <button
                        key={tab.key}
                        className={`nav-link fw500 ps-0 ${activeStatus === tab.key ? "active" : ""}`}
                        onClick={() => setActiveStatus(tab.key)}
                      >
                        {tab.label}
                        <span className="ms-2">({statusCounts[tab.key] || 0})</span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Cost / Delivery</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {filteredProposals.length ? (
                      filteredProposals.map((item, i) => <ProposalCard1 key={`${item.id}-${i}`} data={item} />)
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          No proposals in this section yet.
                        </td>
                      </tr>
                    )}
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
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
