"use client";

import { useEffect, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import LineChart from "../chart/LineChart";
import { getAuthSession, getContractorProposals, getContractorTeam, getAssignmentsForContractor } from "@/utils/auth/mockAuth";

export default function DashboardInfo() {
  const [stats, setStats] = useState({
    activeProjects: 0,
    pendingProposals: 0,
    teamSize: 0,
    pendingMilestones: 0,
  });

  useEffect(() => {
    const session = getAuthSession();
    if (!session?.id) return;
    const proposals = getContractorProposals(session.id);
    const team = getContractorTeam(session.id);
    const assignments = getAssignmentsForContractor(session.id);
    setStats({
      activeProjects: proposals.filter(p => p.status === "accepted").length,
      pendingProposals: proposals.filter(p => p.status === "pending").length,
      teamSize: team.workers.length,
      pendingMilestones: assignments.filter(a =>
        a.milestones.some(m => m.status === "submitted")
      ).length,
    });
  }, []);

  const statCards = [
    { title: "Active Projects", value: stats.activeProjects, icon: "flaticon-contract", sub: "Accepted by clients" },
    { title: "Pending Proposals", value: stats.pendingProposals, icon: "flaticon-document", sub: "Awaiting client response" },
    { title: "Team Size", value: stats.teamSize, icon: "flaticon-team", sub: "Workers in your team" },
    { title: "Milestones to Review", value: stats.pendingMilestones, icon: "flaticon-review", sub: "Submitted by workers" },
  ];

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Contractor Dashboard</h2>
          </div>
        </div>
      </div>

      <div className="row">
        {statCards.map((card, i) => (
          <div key={i} className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">{card.title}</div>
                <div className="title">{card.value}</div>
                <div className="text fz14">{card.sub}</div>
              </div>
              <div className="icon text-center">
                <i className={card.icon} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mb30">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative" style={{ border: "1px solid #e8edf6" }}>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
