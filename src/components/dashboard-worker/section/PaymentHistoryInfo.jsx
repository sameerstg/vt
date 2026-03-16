"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import { paymentHistory } from "@/data/workerTasks";

export default function PaymentHistoryInfo() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Statistics calculation
  const stats = useMemo(() => {
    const totalEarnings = paymentHistory
      .filter(p => p.status === "Paid")
      .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "").replace(",", "")), 0);

    const pendingPayments = paymentHistory
      .filter(p => p.status === "Pending")
      .reduce((sum, p) => sum + parseFloat(p.amount.replace("$", "").replace(",", "")), 0);

    return {
      totalEarnings: `$${totalEarnings.toLocaleString()}`,
      pendingPayments: `$${pendingPayments.toLocaleString()}`,
      totalTransactions: paymentHistory.length
    };
  }, []);

  const filteredHistory = useMemo(() => {
    return paymentHistory
      .filter((item) => {
        if (activeFilter === "all") return true;
        return item.status.toLowerCase() === activeFilter.toLowerCase();
      })
      .filter((item) => {
        if (!searchQuery) return true;
        return item.task.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [activeFilter, searchQuery]);

  const totalPages = Math.ceil(filteredHistory.length / tasksPerPage);
  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredHistory.slice(startIndex, startIndex + tasksPerPage);
  }, [currentPage, filteredHistory, tasksPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  return (
    <div className="dashboard__content hover-bgc-color worker-payment-history-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Payment History</h2>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="row">
        <div className="col-sm-6 col-xxl-4">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Total Earnings</div>
              <div className="title">{stats.totalEarnings}</div>
              <div className="text fz14">Life-time received payments</div>
            </div>
            <div className="icon text-center"><i className="flaticon-income" /></div>
          </div>
        </div>
        <div className="col-sm-6 col-xxl-4">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Pending Payments</div>
              <div className="title">{stats.pendingPayments}</div>
              <div className="text fz14">Awaiting release or approval</div>
            </div>
            <div className="icon text-center"><i className="flaticon-waiting" /></div>
          </div>
        </div>
        <div className="col-sm-6 col-xxl-4">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Transactions</div>
              <div className="title">{stats.totalTransactions}</div>
              <div className="text fz14">Total payment activities</div>
            </div>
            <div className="icon text-center"><i className="flaticon-file" /></div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Toolbar: Status Filters and Search */}
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative tm-toolbar-card">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div className="tm-filter-wrap">
                {["all", "Paid", "Pending"].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`tm-filter-btn ${activeFilter === filter ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter === "all" ? "All Invoices" : filter}
                  </button>
                ))}
              </div>
              {/* <div className="dashboard_search_meta">
                <div className="search_area" style={{ minWidth: "250px" }}>
                  <input
                    type="text"
                    className="form-control bdrs4"
                    placeholder="Search Transaction"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <label><span className="far fa-magnifying-glass" /></label>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Transaction List</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Task / Project</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Method</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {paginatedHistory.map((item) => (
                    <tr key={item.id} className="task-row-hover">
                      <td className="fw500">{item.task}</td>
                      <td>{item.date}</td>
                      <td className="text-thm fw700">{item.amount}</td>
                      <td>{item.method}</td>
                      <td>
                        <span
                          className={`badge ${item.status === "Paid" ? "bg-success" : "bg-warning"} text-white px-3 py-1`}
                          style={{ borderRadius: "50px", fontSize: "11px" }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/worker-dashboard/invoice-details?id=${item.id}`}
                          className="ud-btn btn-thm"
                          style={{ padding: "5px 15px", fontSize: "12px" }}
                        >
                          Details
                          <i className="fal fa-arrow-right-long ms-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!paginatedHistory.length && (
                    <tr>
                      <td className="text-center py-5" colSpan={6}>
                        <p className="mb-0 text">No transaction records found for your search.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="worker-pagination mt30">
                <button
                  className="worker-pagination__nav"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`worker-pagination__page ${currentPage === page ? "is-active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="worker-pagination__nav"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .worker-payment-history-page :global(.ps-widget) { 
          border: 1px solid #e8edf6; 
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06); 
        }
        .tm-filter-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tm-filter-btn { border: 1px solid #dbe1ee; background: #ffffff; border-radius: 9px; padding: 8px 13px; font-weight: 600; color: #334155; font-size: 13px; transition: all 0.2s ease; }
        .tm-filter-btn.active, .tm-filter-btn:hover { border-color: #5b2dff; color: #5b2dff; background: #f4f0ff; }
        
        .task-row-hover td { transition: background-color 0.2s ease; }
        .task-row-hover:hover td { background-color: #f5f7ff; }
        
        .worker-pagination { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        .worker-pagination__page, .worker-pagination__nav { 
          min-width: 42px; 
          height: 42px; 
          border-radius: 10px; 
          border: 1px solid #dbe1ee; 
          background: #ffffff; 
          font-weight: 600; 
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .worker-pagination__page.is-active { 
          border-color: #5b2dff; 
          background: #f4f0ff; 
          color: #5b2dff; 
        }
        .worker-pagination__nav:disabled { opacity: 0.45; cursor: not-allowed; }
        .text-thm { color: #5b2dff !important; }

        .statistics_funfact {
          background: #fff;
          padding: 30px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
          border: 1px solid #e8edf6;
        }
        .statistics_funfact .details .title { font-size: 30px; font-weight: 700; margin: 5px 0; }
        .statistics_funfact .icon { width: 60px; height: 60px; line-height: 60px; border-radius: 50%; background: #f5f7ff; color: #5b2dff; font-size: 24px; }
      `}</style>
    </div>
  );
}
