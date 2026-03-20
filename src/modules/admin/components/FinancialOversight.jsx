"use client";

import { useState } from "react";

export default function FinancialOversight({ transactions, onSuccess }) {
  const [filterType, setFilterType] = useState("all");
  const [dateRange, setDateRange] = useState("all-time");

  // Filter transactions based on type and date range
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type
    if (filterType !== "all" && transaction.type !== filterType) {
      return false;
    }
    
    // Filter by date range (simplified - in real app would use actual date comparison)
    if (dateRange !== "all-time") {
      // For demo purposes, we'll assume all transactions are recent
      // In a real app, you'd compare transaction.date with current date
      return true;
    }
    
    return true;
  });

  // Calculate summary statistics
  const totalVolume = filteredTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const transactionCount = filteredTransactions.length;
  const feeIncome = filteredTransactions
    .filter(t => t.type === "fee")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const payoutTotal = filteredTransactions
    .filter(t => t.type === "payout")
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  const paymentTotal = filteredTransactions
    .filter(t => t.type === "payment")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Financial Oversight</h4>

      {/* Filters */}
      <div className="row mb30">
        <div className="col-md-3">
          <label className="form-label fw600 dark-color">Transaction Type</label>
          <select
            className="form-control"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="payment">Payments</option>
            <option value="payout">Payouts</option>
            <option value="fee">Fees</option>
            <option value="refund">Refunds</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label fw600 dark-color">Date Range</label>
          <select
            className="form-control"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="all-time">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div className="col-md-6 text-md-end">
          <button
            type="button"
            className="ud-btn btn-sm btn-outline-secondary"
            onClick={() => {
              // In a real app, this would trigger data refresh
              onSuccess();
            }}
          >
            <i className="fal fa-sync-alt mr5" /> Refresh Data
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="row mb30">
        <div className="col-sm-6 col-xl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Total Volume</div>
              <div className="title text-thm">${totalVolume.toLocaleString()}</div>
            </div>
            <div className="icon text-center">
              <i className="flaticon-dollar" />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Transaction Count</div>
              <div className="title">{transactionCount}</div>
            </div>
            <div className="icon text-center">
              <i className="flaticon-exchange" />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Fee Income</div>
              <div className="title text-thm">${feeIncome.toLocaleString()}</div>
            </div>
            <div className="icon text-center">
              <i className="flaticon-percent" />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="d-flex align-items-center justify-content-between statistics_funfact">
            <div className="details">
              <div className="fz15">Net Flow</div>
              <div className="title text-thm">${(paymentTotal - payoutTotal).toLocaleString()}</div>
            </div>
            <div className="icon text-center">
              <i className="flaticon-transfer" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colspan="6" className="text-center py40">
                  No transactions found matching the selected filters.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date || "N/A"}</td>
                  <td>
                    <span className={`badge bg-${transaction.type === "payment" ? "success" : 
                                                transaction.type === "payout" ? "warning" : 
                                                transaction.type === "fee" ? "info" : 
                                                transaction.type === "refund" ? "danger" : "secondary"}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td>${(transaction.amount || 0).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${transaction.status === "completed" ? "badge-success" : 
                                                  transaction.status === "pending" ? "badge-warning" : 
                                                  transaction.status === "failed" ? "badge-danger" : "badge-info"}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="ud-btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        // In a real app, this would show transaction details
                        alert(`Viewing details for transaction #${transaction.id}`);
                      }}
                    >
                      <i className="fal fa-info-circle mr5" /> Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}