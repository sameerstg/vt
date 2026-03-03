import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import {
  feeLedgerEntries,
  financialEscrowPanel,
  financialSummary,
  financialTransactions,
} from "@/data/adminDashboard";

export const metadata = {
  title: "Financial Overview",
};

const PAGE_SIZE = 3;

const buildPageHref = (page) =>
  page <= 1 ? "/dashboard/financial-overview" : `/dashboard/financial-overview?page=${page}`;

export default async function FinancialOverviewPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const parsedPage = Number(resolvedSearchParams?.page);
  const totalPages = Math.max(1, Math.ceil(financialTransactions.length / PAGE_SIZE));
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.min(Math.floor(parsedPage), totalPages)
      : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTransactions = financialTransactions.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  const paymentStatusClass = {
    Released: "bg-emerald-100 text-emerald-700",
    "In Escrow": "bg-blue-100 text-blue-700",
    Pending: "bg-amber-100 text-amber-700",
    Disputed: "bg-rose-100 text-rose-700",
  };

  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb20 pt-2">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>Financial Overview</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Track platform revenue, escrow flows, and transaction ledgers.</p>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          {financialSummary.map((card) => (
            <div key={card.id} className="col-sm-6 col-xxl-4">
               <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</div>
                  <div className="text-2xl font-bold text-slate-800">{card.value}</div>
                  {card.trend && (
                    <div className="mt-1 flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md w-fit">
                      <i className="fas fa-arrow-up text-[8px]" />
                      {card.trend}
                    </div>
                  )}
               </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2">Revenue Ledger</h4>
              <div className="packages_table table-responsive px-2">
                <table className="table-style3 table at-savesearch align-middle mb-0">
                  <thead className="">
                    <tr className="border-bottom border-slate-100">
                      <th scope="col" className="px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice Info</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="text-end px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body font-medium">
                    {paginatedTransactions.map((item) => (
                      <tr key={item.id} className="border-bottom border-slate-50 last:border-0">
                        <td className="px-0 py-3">
                          <div className="font-bold text-slate-900 fz13">#{item.id}</div>
                          <div className="text-[11px] text-slate-500 font-medium">{item.invoiceName}</div>
                        </td>
                        <td className="py-3 text-slate-600 fz12">{item.purchaseDate}</td>
                        <td className="py-3 text-slate-900 font-bold fz13">{item.amount}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              paymentStatusClass[item.status] || "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="text-end px-0 py-3">
                          <Link
                            href={`/dashboard/task-monitoring/${item.taskId}`}
                            className="inline-flex items-center gap-1 rounded-md border border-[#dbe3ff] bg-[#f0f3ff] px-3 py-1.5 text-[12px] font-bold text-[#5b44ff] transition-colors hover:bg-[#e7ecff] hover:text-[#4b34f5]"
                            aria-label={`View details for transaction ${item.id}`}
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 12C3.9 7.9 7.5 5.5 12 5.5C16.5 5.5 20.1 7.9 22 12C20.1 16.1 16.5 18.5 12 18.5C7.5 18.5 3.9 16.1 2 12Z"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              />
                              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                            </svg>
                            Details
                          </Link>
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
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    aria-label="Previous page"
                    className="d-flex justify-content-center align-items-center rounded-circle border border-slate-900 bg-white text-slate-900 text-decoration-none"
                    style={{ width: "40px", height: "40px", fontSize: "16px" }}
                  >
                    <i className="fas fa-angle-left" />
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) =>
                  pageNumber === currentPage ? (
                    <span
                      key={pageNumber}
                      className="d-inline-flex justify-content-center align-items-center rounded-circle text-white fw700"
                      style={{ width: "40px", height: "40px", backgroundColor: "#4c1d95" }}
                      aria-current="page"
                    >
                      {pageNumber}
                    </span>
                  ) : (
                    <Link
                      key={pageNumber}
                      href={buildPageHref(pageNumber)}
                      className="border-0 bg-transparent text-slate-900 fw600 px-2 py-1 text-decoration-none"
                    >
                      {pageNumber}
                    </Link>
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
                  <Link
                    href={buildPageHref(currentPage + 1)}
                    aria-label="Next page"
                    className="d-flex justify-content-center align-items-center rounded-circle border border-slate-900 bg-white text-slate-900 text-decoration-none"
                    style={{ width: "40px", height: "40px", fontSize: "16px" }}
                  >
                    <i className="fas fa-angle-right" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-lg-5">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10">Escrow Liquidity</h4>
              <div className="space-y-2 px-2">
                {[
                  { label: "Active Escrow", value: financialEscrowPanel.activeEscrowAmount, color: "text-blue-600" },
                  { label: "Pending Releases", value: financialEscrowPanel.pendingReleases, color: "text-amber-600" },
                  { label: "Disputed Funds", value: financialEscrowPanel.disputedFunds, color: "text-rose-600" },
                  { label: "Release Timer", value: financialEscrowPanel.autoReleaseTimer, color: "text-slate-600" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{stat.label}</span>
                    <span className={`text-[13px] font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10">Fee History</h4>
              <div className="packages_table table-responsive px-2">
                <table className="table-style3 table at-savesearch align-middle mb-0">
                  <thead className="">
                    <tr className="border-bottom border-slate-100">
                      <th scope="col" className="px-0 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                      <th scope="col" className="py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Reference</th>
                      <th scope="col" className="text-end px-0 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Fee</th>
                    </tr>
                  </thead>
                  <tbody className="t-body font-medium">
                    {feeLedgerEntries.map((entry, idx) => (
                      <tr key={idx} className="border-bottom border-slate-50 last:border-0">
                        <td className="px-0 py-2 text-slate-500 font-bold fz11">{entry.date}</td>
                        <td className="py-2">
                          <div className="text-slate-800 text-[12px] leading-tight font-bold">{entry.task}</div>
                          <div className="text-[10px] text-slate-400 italic">Gross: {entry.gross}</div>
                        </td>
                        <td className="py-2 text-emerald-600 font-bold fz12 text-end">{entry.feeCollected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
