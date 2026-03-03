"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminTaskDetailContent({ taskId = "39482" }) {
  const milestones = [
    {
      id: 1,
      title: "Milestone 1: Wireframes",
      date: "Oct 28, 2023",
      amount: "$1,125.00",
      status: "Released",
      statusColor: "text-emerald-700 bg-emerald-100",
      icon: "fas fa-check-circle text-emerald-500",
    },
    {
      id: 2,
      title: "Milestone 2: High Fidelity Design",
      date: "Nov 05, 2023",
      amount: "$1,125.00",
      status: "Released",
      statusColor: "text-emerald-700 bg-emerald-100",
      icon: "fas fa-check-circle text-emerald-500",
    },
    {
      id: 3,
      title: "Milestone 3: Frontend Development",
      date: "Due Nov 15, 2023",
      amount: "$1,125.00",
      status: "Funded & Active",
      statusColor: "text-blue-700 bg-blue-100",
      icon: "fas fa-ellipsis-h text-blue-500",
      isAction: true,
    },
    {
      id: 4,
      title: "Milestone 4: Final Handover",
      date: "Due Nov 20, 2023",
      amount: "$1,125.00",
      status: "Not Funded",
      statusColor: "text-slate-600 bg-slate-100",
      icon: "far fa-circle text-slate-400",
    },
  ];

  const activities = [
    {
      time: "Today, 10:23 AM",
      action: "Seller submitted work for Milestone 3",
      source: "System",
    },
    {
      time: "Nov 05, 4:15 PM",
      action: "Buyer released Milestone 2 funds ($1,125.00)",
      source: "Escrow",
    },
    {
      time: "Nov 05, 2:00 PM",
      action: "Buyer approved Milestone 2 deliverables",
      source: "Action",
    },
  ];

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb20 pt-2">
        <div className="col-lg-8">
          <div className="dashboard_title_area">
            <div className="mb-1 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Task Monitoring <span className="mx-1">/</span> #{taskId}
            </div>
            <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>
              Website Redesign Project
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                In Progress
              </span>
              <span className="text-xs font-bold text-slate-400">ID: #{taskId}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="text-lg-end d-flex flex-wrap gap-2 align-items-center justify-content-lg-end mt-2 mt-lg-0">
              <button
                className="ud-btn btn-light-thm h-11 px-4 fz13 fw600 d-inline-flex align-items-center justify-content-between border-0 text-decoration-none"
                style={{ backgroundColor: "#f5f5f5", color: "#5f6673", minWidth: "170px", lineHeight: 1 }}
              >
                <span>State Override</span>
                <i className="fas fa-chevron-down text-[10px]" />
              </button>
              <button
                className="ud-btn btn-dark h-11 px-4 fz13 fw600 d-inline-flex align-items-center justify-content-center gap-2 border-0 text-decoration-none"
                style={{ backgroundColor: "#1a1a1a", minWidth: "120px", lineHeight: 1 }}
              >
                <i className="fas fa-ban text-[11px]" />
                <span>Suspend</span>
              </button>
               <button
                className="ud-btn btn-thm h-11 px-4 fz13 fw700 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                style={{ backgroundColor: "#2d138f", borderColor: "#2d138f", minWidth: "120px", lineHeight: 1 }}
              >
                <i className="fas fa-edit text-[11px]" />
                <span>Edit</span>
              </button>
          </div>
        </div>
      </div>

      <div className="row g-4">

        <div className="col-lg-8 space-y-6">
          {/* KPI Cards Row */}
          <div className="row g-3">
            {[
              { label: "Total Budget", value: "$4,500.00", icon: "flaticon-dollar", color: "blue" },
              { label: "In Escrow", value: "$2,250.00", icon: "flaticon-contract", color: "emerald" },
              { label: "Milestones", value: "2 of 4", icon: "flaticon-review", color: "violet" },
              { label: "Days Active", value: "12 days", icon: "flaticon-logout", color: "amber" }
            ].map((kpi, i) => (
              <div key={i} className="col-sm-6 col-xl-3">
                <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p-4 flex flex-column h-100">
                  <div className="text-slate-500 mb-2 font-bold text-xs uppercase tracking-wide">{kpi.label}</div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-800">{kpi.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Task Overview Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20">
            <h4 className="title text-[18px] font-bold text-[#6200ee] mb15 px-2">Task Overview</h4>
            <div className="px-2 space-y-3">
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                The client requires a full redesign of their corporate website. The scope includes a new homepage, about
                us page, services page, and a contact form.
              </p>
              <div>
                <h5 className="text-xs font-bold text-slate-800 mb-1 uppercase tracking-tight">Scope Summary:</h5>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600 font-medium">
                  <li>Figma Design & Prototypes</li>
                  <li>Responsive Development</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Web Design", "Figma", "Frontend"].map((tag) => (
                  <span key={tag} className="rounded px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb20 px-2 border-b border-light pb10">
              <h4 className="title text-[18px] font-bold text-[#6200ee] mb-0">Milestone Progress</h4>
              <button
                type="button"
                className="h-9 px-3 rounded-md border border-slate-200 bg-white text-[10px] font-bold text-[#2d138f] uppercase tracking-widest d-inline-flex align-items-center justify-content-center gap-1 text-decoration-none"
                style={{ lineHeight: 1 }}
              >
                <span>View Logs</span>
                <i className="fas fa-external-link-alt text-[8px]" />
              </button>
            </div>
            
            <div className="px-2 space-y-2">
              {milestones.map((m) => (
                <div key={m.id} className="rounded-lg border border-slate-50 bg-slate-50/30 p-3 transition-colors hover:bg-slate-50">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2 items-center">
                      <i className={`${m.icon} text-xs`} />
                      <div>
                        <div className="font-bold text-slate-800 fz13 leading-tight">{m.title}</div>
                        <div className="text-[10px] text-slate-500 font-medium mt-0.5">{m.amount} <span className="mx-1">•</span> {m.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${m.statusColor}`}>
                        {m.status}
                      </span>
                      {m.isAction && (
                        <button
                          type="button"
                          className="ud-btn btn-thm h-9 px-3 fz12 fw700 d-inline-flex align-items-center justify-content-center text-decoration-none"
                          style={{
                            backgroundColor: "#2d138f",
                            borderColor: "#2d138f",
                            minWidth: "112px",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Release Funds
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20">
            <h4 className="title text-[18px] font-bold text-[#6200ee] mb15 px-2">Activity Stream</h4>
            <div className="table-responsive px-2">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr className="border-bottom border-slate-100">
                    <th className="px-0 py-2 text-xs font-bold text-slate-400">Timestamp</th>
                    <th className="py-2 text-xs font-bold text-slate-400">Activity Detail</th>
                    <th className="text-end px-0 py-2 text-xs font-bold text-slate-400">Actor</th>
                  </tr>
                </thead>
                <tbody className="text-[12px] font-medium">
                  {activities.map((a, i) => (
                    <tr key={i} className="border-bottom border-slate-50 last:border-0">
                      <td className="px-0 py-2.5 text-slate-500 fz11">{a.time}</td>
                      <td className="py-2.5 text-slate-800 fz12">{a.action}</td>
                      <td className="text-end px-0 py-2.5 font-bold text-blue-600 fz11 text-uppercase">{a.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4 space-y-6">
          {/* Buyer Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl overflow-hidden mb20">
             <div className="p15 border-bottom border-light bg-slate-50/50">
              <h5 className="title text-xs font-bold text-[#6200ee] mb-0 uppercase tracking-widest">Client Insights</h5>
            </div>
            <div className="p20 text-center">
               <div className="relative mx-auto mb10 h-16 w-16">
                <Image
                  src="/images/team/fl-1.png"
                  alt="Buyer"
                  fill
                  className="rounded-full object-cover ring-2 ring-slate-100"
                />
              </div>
              <h5 className="mb-0 font-bold text-slate-800 text-base">Acme Corp Ltd.</h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Global Partner</p>
              
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-50 pt-3">
                <div className="text-center">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Volume</div>
                  <div className="text-base font-bold text-slate-800">$45k</div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reliability</div>
                  <div className="flex items-center justify-center gap-1 font-bold text-slate-800 text-base">
                    4.9 <i className="fas fa-star text-amber-400 text-[10px]" />
                  </div>
                </div>
              </div>

               <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button className="ud-btn btn-light-thm btn-sm h-8 px-3 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}>
                  <i className="fas fa-user-circle fz10" />
                  Profile
                </button>
                <button className="ud-btn btn-light-thm btn-sm h-8 px-3 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
                  <i className="fas fa-comment-alt fz10" />
                  Chat
                </button>
              </div>
            </div>
          </div>

          {/* Seller Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl overflow-hidden mb20">
             <div className="p15 border-bottom border-light bg-slate-50/50">
              <h5 className="title text-xs font-bold text-[#6200ee] mb-0 uppercase tracking-widest">Expert Analyst</h5>
            </div>
            <div className="p20 text-center">
               <div className="relative mx-auto mb10 h-16 w-16">
                <Image
                  src="/images/team/fl-2.png"
                  alt="Seller"
                  fill
                  className="rounded-full object-cover ring-2 ring-slate-100"
                />
              </div>
              <h5 className="mb-0 font-bold text-slate-800 text-base">Sarah Jenkins</h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Senior UI Designer</p>
              
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-50 pt-3">
                <div className="text-center">
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Revenue</div>
                   <div className="text-base font-bold text-slate-800">$120k</div>
                </div>
                <div className="text-center">
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rating</div>
                   <div className="flex items-center justify-center gap-1 font-bold text-slate-800 text-base">
                    5.0 <i className="fas fa-star text-amber-400 text-[10px]" />
                  </div>
                </div>
              </div>

               <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button className="ud-btn btn-light-thm btn-sm h-8 px-3 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}>
                  <i className="fas fa-user-circle fz10" />
                  Profile
                </button>
                <button className="ud-btn btn-light-thm btn-sm h-8 px-3 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
                  <i className="fas fa-comment-alt fz10" />
                  Chat
                </button>
              </div>
            </div>
          </div>

          {/* Internal Notes Widget */}
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20">
            <h4 className="title text-[16px] font-bold text-[#6200ee] mb15 px-2">Actionable Notes</h4>
            <div className="px-2">
              <textarea
                  rows={3}
                  placeholder="Record private administrative notes..."
                  className="w-full rounded-lg bg-slate-50/50 p-3 text-xs border border-slate-100 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
                <button
                  className="ud-btn btn-thm w-100 h-11 mt-2 fz13 fw700 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
                  style={{
                    backgroundColor: "#2d138f",
                    borderColor: "#2d138f",
                    lineHeight: 1,
                    letterSpacing: "0.2px",
                    textDecoration: "none",
                  }}
                >
                  <i className="fas fa-save fz11" aria-hidden="true" />
                  <span>Commit Observation</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
