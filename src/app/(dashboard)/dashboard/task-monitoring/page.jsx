import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { taskDetailPanel, taskMonitoringTasks } from "@/data/adminDashboard";

const taskStatusClass = {
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Disputed: "bg-rose-100 text-rose-700",
  Review: "bg-violet-100 text-violet-700",
};

export const metadata = {
  title: "Task Monitoring",
};

const PAGE_SIZE = 3;

const buildPageHref = (page) =>
  page <= 1 ? "/dashboard/task-monitoring" : `/dashboard/task-monitoring?page=${page}`;

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

export default async function TaskMonitoringPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const parsedPage = Number(resolvedSearchParams?.page);
  const totalPages = Math.max(1, Math.ceil(taskMonitoringTasks.length / PAGE_SIZE));
  const currentPage =
    Number.isFinite(parsedPage) && parsedPage > 0
      ? Math.min(Math.floor(parsedPage), totalPages)
      : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTasks = taskMonitoringTasks.slice(startIndex, startIndex + PAGE_SIZE);
  const visiblePageNumbers = getVisiblePageNumbers(currentPage, totalPages);

  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb20 pt-2">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>Task Monitoring</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Real-time oversight of all platform tasks, escrow states, and project health.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2">Filter Bar</h4>
              <div className="row g-2 px-2 pb-1">
                <div className="col-md-3">
                  <select className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-500 outline-none bg-slate-50/30">
                    <option>Status Filter</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Disputed</option>
                    <option>Review</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-500 outline-none bg-slate-50/30">
                    <option>Category Filter</option>
                    <option>Design</option>
                    <option>Development</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    placeholder="Search task ID or Title..."
                    className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/30"
                  />
                </div>
                <div className="col-md-3">
                  <button className="ud-btn btn-thm w-100 h-11" style={{ backgroundColor: '#2d138f', borderColor: '#2d138f' }}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
              <div className="d-flex justify-content-between mb20 px-2 border-b border-light pb10">
                <h4 className="title text-[18px] font-bold text-[#6200ee] mb-0">Active Task List</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Show:</span>
                  <select className="form-select text-xs border-0 bg-transparent font-bold text-slate-700 outline-none focus:ring-0 py-0">
                    <option>Recent first</option>
                    <option>Highest budget</option>
                  </select>
                </div>
              </div>
              
              <div className="packages_table table-responsive px-2">
                <table className="table-style3 table at-savesearch align-middle mb-0">
                  <thead className="">
                    <tr className="border-bottom border-slate-100">
                      <th scope="col" className="px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Task ID</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Project Title</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Participants</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Budget</th>
                      <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      <th scope="col" className="text-end px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="t-body font-medium">
                    {paginatedTasks.map((task) => (
                      <tr key={task.id} className="border-bottom border-slate-50 last:border-0">
                        <td className="px-0 py-3 text-slate-900 font-bold fz13">#{task.id}</td>
                        <td className="py-3">
                          <div className="fw500 text-slate-800 fz13">{task.title}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{task.category}</div>
                        </td>
                        <td className="py-3 fz12">
                          <div className="text-slate-500 mb-0">B: <span className="text-slate-800 font-bold">{task.buyer}</span></div>
                          <div className="text-slate-500">S: <span className="text-slate-800 font-bold">{task.seller}</span></div>
                        </td>
                        <td className="py-3 text-slate-900 font-bold fz13">{task.budget}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                              taskStatusClass[task.status] || "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="text-end px-0 py-3">
                          <div className="d-flex justify-content-end gap-1">
                            <Link 
                              href={`/dashboard/task-monitoring/${task.id}`}
                              className="ud-btn btn-light-thm btn-sm h-8 px-3 py-0 fz12 flex items-center gap-1 border-0"
                              style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}
                            >
                              <i className="flaticon-website fz10" />
                              View
                            </Link>
                            <button className="ud-btn btn-dark btn-sm h-8 px-3 py-0 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#1a1a1a' }}>
                              Suspend
                            </button>
                            <button className="ud-btn btn-light-thm btn-sm h-8 px-3 py-0 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f5f5f5', color: '#666' }}>
                              Force
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
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    aria-label="Previous page"
                    className="d-flex justify-content-center align-items-center rounded-circle border border-slate-900 bg-white text-slate-900 text-decoration-none"
                    style={{ width: "40px", height: "40px", fontSize: "16px" }}
                  >
                    <i className="fas fa-angle-left" />
                  </Link>
                )}

                {visiblePageNumbers.map((pageItem) => {
                  if (typeof pageItem !== "number") {
                    return (
                      <span key={pageItem} className="text-slate-700 fw600 px-1">
                        ...
                      </span>
                    );
                  }

                  if (pageItem === currentPage) {
                    return (
                      <span
                        key={pageItem}
                        className="d-inline-flex justify-content-center align-items-center rounded-circle text-white fw700"
                        style={{ width: "40px", height: "40px", backgroundColor: "#4c1d95" }}
                        aria-current="page"
                      >
                        {pageItem}
                      </span>
                    );
                  }

                  return (
                    <Link
                      key={pageItem}
                      href={buildPageHref(pageItem)}
                      className="border-0 bg-transparent text-slate-900 fw600 px-2 py-1 text-decoration-none"
                    >
                      {pageItem}
                    </Link>
                  );
                })}

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

          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative animate-in slide-in-from-bottom-4 duration-500">
                 <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10 flex items-center gap-2">
                    <i className="fas fa-microchip text-slate-400 fz14" />
                    Management Suite
                 </h4>
                 <div className="row g-3 px-2">
                    <div className="col-lg-6">
                      <div className="rounded-xl border border-slate-100 bg-slate-50/30 p20 h-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">System Health Log</div>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed mb-0">
                          {taskDetailPanel.escrowStatus}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="rounded-xl border border-slate-100 bg-slate-50/30 p20 h-100">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rapid Override</div>
                        <div className="row g-2">
                          <div className="col-sm-8">
                            <select className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs font-medium text-slate-700 outline-none bg-white">
                              <option>Quick State Change</option>
                              {taskDetailPanel.forceStates.map((state) => (
                                <option key={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-sm-4">
                            <button className="ud-btn btn-dark w-100 text-[10px] px-0 py-2 leading-[1.2]" style={{ backgroundColor: '#1a1a1a' }}>
                              Apply Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
      </div>
    </DashboardLayout>
  );
}
