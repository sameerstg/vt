"use client";
import { useState } from "react";
import Link from "next/link";
const packagePlans = [
  {
    tab: "Basic",
    price: "$50",
    title: "High-converting Landing Pages",
    desc: "I will redesign your current landing page or create one for you (upto 4 sections)",
    delivery: "3 Days Delivery",
    revisions: "2 Revisions",
    points: ["2 Page / Screen", "Source file"],
    cta: "Continue $50",
  },
  {
    tab: "Standart",
    price: "$29",
    title: "High-converting Landing Pages",
    desc: "I will redesign your current landing page or create one for you (upto 4 sections)",
    delivery: "3 Days Delivery",
    revisions: "2 Revisions",
    points: ["2 Page / Screen", "Source file"],
    cta: "Continue $29",
  },
  {
    tab: "Premium",
    price: "$250",
    title: "High-converting Landing Pages",
    desc: "I will redesign your current landing page or create one for you (upto 4 sections)",
    delivery: "3 Days Delivery",
    revisions: "2 Revisions",
    points: ["2 Page / Screen", "Source file"],
    cta: "Continue $250",
  },
];

const milestonePlans = [
  {
    tab: "M1",
    price: "$300",
    title: "Milestone 1: Wireframe",
    desc: "User flow and low-fidelity screens for approval",
    delivery: "2 Days Delivery",
    revisions: "1 Revision",
    points: ["Wireframes", "User journey map"],
    cta: "Fund $300",
  },
  {
    tab: "M2",
    price: "$500",
    title: "Milestone 2: UI Design",
    desc: "High-fidelity UI for core screens and components",
    delivery: "3 Days Delivery",
    revisions: "2 Revisions",
    points: ["6 UI screens", "Style guide"],
    cta: "Review $500",
  },
  {
    tab: "M3",
    price: "$700",
    title: "Milestone 3: Handoff",
    desc: "Responsive variants and delivery-ready exports",
    delivery: "4 Days Delivery",
    revisions: "3 Revisions",
    points: ["Desktop + Mobile", "Final export files"],
    cta: "Unlock $700",
  },
];

export default function ServiceDetailPrice1({
  initialTab = 0,
  milestoneMode = false,
  proposalPath = "",
}) {
  const [getTab, setTab] = useState(initialTab);
  const plans = milestoneMode ? milestonePlans : packagePlans;
  const activePlan = plans[getTab] || plans[0];

  return (
    <>
      <div className="price-widget">
        <div className="navtab-style1">
          <nav>
            <div className="nav nav-tabs mb20">
              {plans.map((item, i) => (
                <button
                  onClick={() => setTab(i)}
                  key={i}
                  className={`nav-link fw500 ${getTab === i ? "active" : ""}`}
                >
                  {item.tab}
                </button>
              ))}
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="price-content">
              <div className="price">{activePlan.price}</div>
              <div className="h5 mb-2">{activePlan.title}</div>
              <p className="text fz14">{activePlan.desc}</p>
              <hr className="opacity-100 mb20" />
              <ul className="p-0 mb15 d-sm-flex align-items-center">
                <li className="fz14 fw500 dark-color">
                  <i className="flaticon-sandclock fz20 text-thm2 me-2 vam" />
                  {activePlan.delivery}
                </li>
                <li className="fz14 fw500 dark-color ml20 ml0-xs">
                  <i className="flaticon-recycle fz20 text-thm2 me-2 vam" />
                  {activePlan.revisions}
                </li>
              </ul>
              <div className="list-style1">
                <ul>
                  {activePlan.points.map((point) => (
                    <li key={point} className="mb15">
                      <i className="far fa-check text-thm3 bgc-thm3-light" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-grid">
                {milestoneMode && proposalPath ? (
                  <Link
                    className="ud-btn btn-thm"
                    href={`${proposalPath}?milestone=${encodeURIComponent(activePlan.title)}`}
                  >
                    {activePlan.cta}
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                ) : (
                  <Link
                    className="ud-btn btn-thm"
                    href={`/submit-proposal?plan=${encodeURIComponent(activePlan.tab)}&price=${encodeURIComponent(activePlan.price)}`}
                  >
                    {activePlan.cta}
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
