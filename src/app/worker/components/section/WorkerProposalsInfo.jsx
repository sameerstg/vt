"use client";
import { useState, useEffect } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import Pagination1 from "@/components/section/Pagination1";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  ACCEPTED: { label: "Accepted", class: "badge-completed" },
  REJECTED: { label: "Rejected", class: "badge-cancelled" },
  WITHDRAWN: { label: "Withdrawn", class: "badge-cancelled" },
};

export default function WorkerProposalsInfo() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProposals, setTotalProposals] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProposals();
  }, [currentPage]);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/worker/offers");
      const data = await res.json();
      if (data.success) {
        setTotalProposals(data.data.length);
        const start = (currentPage - 1) * itemsPerPage;
        setProposals(data.data.slice(start, start + itemsPerPage));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (offerId) => {
    try {
      const res = await fetch("/api/worker/offers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId, action: "withdraw" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProposals();
      }
    } catch (e) {
      console.error(e);
    }
  };

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
              <p className="text">Track your submitted offers and proposals</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              {loading ? (
                <div className="text-center p50">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : proposals.length === 0 ? (
                <div className="text-center p50">
                  <i className="flaticon-contract fz60 text-muted mb20 d-block" />
                  <h5 className="text-muted">No proposals yet</h5>
                  <p className="text-muted">Submit offers on projects to see them here</p>
                </div>
              ) : (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Project</th>
                        <th scope="col">Your Bid</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {proposals.map((proposal) => (
                        <tr key={proposal.id}>
                          <td>
                            <h5 className="title mb5">{proposal.projectId}</h5>
                            <p className="fz14 text-muted mb0">
                              {proposal.terms?.substring(0, 80)}
                              {proposal.terms?.length > 80 ? "..." : ""}
                            </p>
                          </td>
                          <td className="vam">
                            <span className="text-thm fw500">${proposal.amount.toLocaleString()}</span>
                          </td>
                          <td className="vam">
                            <span className="fz15">{proposal.estimatedDays} days</span>
                          </td>
                          <td className="vam">
                            <span className={`badge ${statusConfig[proposal.status]?.class}`}>
                              {statusConfig[proposal.status]?.label}
                            </span>
                          </td>
                          <td className="vam">
                            {proposal.status === "PENDING" && (
                              <button
                                onClick={() => handleWithdraw(proposal.id)}
                                className="ud-btn btn-light btn-sm"
                              >
                                Withdraw
                              </button>
                            )}
                            {proposal.status === "ACCEPTED" && (
                              <span className="text-success">
                                <i className="flaticon-check me-1" />
                                Project Assigned
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">
                    <Pagination1
                      currentPage={currentPage}
                      totalItems={totalProposals}
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
    </>
  );
}
