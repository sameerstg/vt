"use client";

import { useState } from "react";

const tabs = [
  {
    id: "account",
    name: "Account & Payments",
    content: [
      {
        title: "1. Account Registration",
        description:
          "To use Freeio services, you must create an account with accurate information. You are responsible for maintaining the confidentiality of your account credentials and password. You agree to notify us immediately of any unauthorized use of your account.",
      },
      {
        title: "2. Payment Terms",
        description:
          "All payments on Freeio are processed securely. Payment terms depend on the project agreement between the freelancer and the client. We charge a service fee for facilitating transactions. All prices are displayed in the selected currency.",
      },
      {
        title: "3. Refund Policy",
        description:
          "Refunds are processed according to the project agreement and our dispute resolution process. Once a transaction is completed, refunds may only be issued if services were not delivered as agreed.",
      },
    ],
  },
  {
    id: "orders",
    name: "Manage Orders",
    content: [
      {
        title: "1. Order Placement",
        description:
          "Clients can place orders through our platform. Each order must include a clear description of requirements, deadline, and budget. Freelancers can accept or decline orders based on their availability and expertise.",
      },
      {
        title: "2. Order Protection",
        description:
          "Freeio provides order protection to ensure both parties fulfill their obligations. Payments are held in escrow until the work is completed and accepted by the client.",
      },
      {
        title: "3. Dispute Resolution",
        description:
          "If there are disagreements about work quality or payment, Freeio provides a dispute resolution system. Both parties can provide evidence and communicate through our platform to reach a resolution.",
      },
    ],
  },
  {
    id: "refunds",
    name: "Returns & Refunds",
    content: [
      {
        title: "1. Refund Eligibility",
        description:
          "Refunds are available if the freelancer fails to deliver work as specified in the order agreement or within the agreed timeframe without valid reason.",
      },
      {
        title: "2. Refund Process",
        description:
          "To request a refund, contact our support team with documentation of the issue. We will investigate and process refunds within 14 business days if the claim is valid.",
      },
      {
        title: "3. Non-Refundable Items",
        description:
          "Payments for completed and accepted work cannot be refunded. Partial refunds may be issued if work is partially completed or if we determine the service quality did not meet agreed standards.",
      },
    ],
  },
  {
    id: "covid",
    name: "COVID-19",
    content: [
      {
        title: "1. Remote Work Acknowledgment",
        description:
          "All Freeio services are conducted remotely. By using our platform, you acknowledge and accept that work is delivered digitally without physical interaction.",
      },
      {
        title: "2. Health & Safety",
        description:
          "While Freeio services are digital-only, we support freelancers and clients in maintaining safe working environments. Any concerns should be reported to our support team.",
      },
      {
        title: "3. Service Continuity",
        description:
          "Freeio remains operational 24/7. However, delivery times may be affected by circumstances beyond our control. We will work with both parties to adjust timelines if necessary.",
      },
    ],
  },
  {
    id: "other",
    name: "Other",
    content: [
      {
        title: "1. Intellectual Property",
        description:
          "All work created on Freeio remains the intellectual property of the creator unless otherwise agreed in writing. Clients have the right to use the delivered work as specified in the order agreement.",
      },
      {
        title: "2. User Conduct",
        description:
          "Users must not engage in harassment, discrimination, fraud, or illegal activities. Violations of our terms may result in account suspension or permanent ban from the platform.",
      },
      {
        title: "3. Platform Changes",
        description:
          "Freeio reserves the right to modify these terms at any time. We will notify users of significant changes. Continued use of the platform implies acceptance of updated terms.",
      },
    ],
  },
];

export default function TermsCondition1() {
  const [currentTab, setCurrentTab] = useState("account");

  const activeTab = tabs.find((tab) => tab.id === currentTab);

  return (
    <>
      <section className="our-terms">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-title">
                <h2>Terms and Conditions</h2>
                <p className="text">
                  Read our comprehensive terms and conditions to understand how Freeio operates and your rights as a user.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-2">
              <div className="terms_condition_widget mb30-sm">
                <div className="widget_list">
                  <nav>
                    <div className="nav nav-tabs text-start">
                      {tabs.map((tab) => (
                        <button
                          onClick={() => setCurrentTab(tab.id)}
                          key={tab.id}
                          className={`nav-link text-start ${currentTab === tab.id ? "active" : ""
                            }`}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-lg-9 col-xl-9 offset-xl-1">
              <div className="terms_condition_grid text-start">
                {activeTab &&
                  activeTab.content.map((item, idx) => (
                    <div key={idx} className="grids mb90 mb40-md">
                      <h4 className="title">{item.title}</h4>
                      <p className="text fz15">{item.description}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
