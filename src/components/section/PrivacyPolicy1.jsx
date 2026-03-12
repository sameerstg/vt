"use client";

import { useState } from "react";

const tabs = [
  {
    id: "collection",
    name: "Data Collection",
    content: [
      {
        title: "1. What Information We Collect",
        description:
          "We collect information you provide directly (name, email, phone) when registering, creating a profile, or using our services. We also automatically collect device information, IP address, and browsing data through cookies and analytics tools.",
      },
      {
        title: "2. How We Collect Information",
        description:
          "Information is collected through account registration, service usage, payment processing, communication, and third-party integrations. We use cookies and similar technologies to improve user experience and understand platform usage patterns.",
      },
      {
        title: "3. Types of Information",
        description:
          "Personal data includes your name, email, phone number, payment details, profile information, and communication history. Non-personal data includes device types, browser information, page views, and usage statistics.",
      },
    ],
  },
  {
    id: "usage",
    name: "Data Usage",
    content: [
      {
        title: "1. How We Use Your Information",
        description:
          "We use your data to provide services, process payments, send updates, improve our platform, prevent fraud, and comply with legal obligations. We may also use anonymized data for analytics and business improvement.",
      },
      {
        title: "2. Service Delivery",
        description:
          "Your information helps us match freelancers with clients, process transactions, manage disputes, and provide customer support. We never use your data for purposes other than those specified in this policy without your consent.",
      },
      {
        title: "3. Marketing Communications",
        description:
          "We may send promotional emails, updates, and newsletters. You can opt out anytime by clicking 'unsubscribe' in our emails or adjusting your notification preferences in your account settings.",
      },
    ],
  },
  {
    id: "sharing",
    name: "Data Sharing",
    content: [
      {
        title: "1. Who We Share Data With",
        description:
          "We share your information with service providers (payment processors, hosting providers) who help us operate Freeio. These partners are bound by confidentiality agreements and only access data as needed.",
      },
      {
        title: "2. Third-Party Services",
        description:
          "Certain services may require sharing limited information with third parties (payment gateways, email providers). We ensure all third parties maintain adequate security measures to protect your data.",
      },
      {
        title: "3. Legal Requirements",
        description:
          "We may disclose information when required by law, court order, or to protect our rights. We will notify you of such requests unless legally prohibited from doing so.",
      },
    ],
  },
  {
    id: "security",
    name: "Data Security",
    content: [
      {
        title: "1. How We Protect Your Data",
        description:
          "We implement industry-standard encryption, secure payment processing, and regular security audits to protect your information. Access to personal data is restricted to authorized personnel only.",
      },
      {
        title: "2. Security Measures",
        description:
          "All data transmission uses HTTPS encryption. Passwords are hashed using secure algorithms. We maintain firewalls and intrusion detection systems to prevent unauthorized access.",
      },
      {
        title: "3. Your Responsibility",
        description:
          "You are responsible for maintaining the confidentiality of your password and account credentials. Never share your login details with others. Notify us immediately if you suspect unauthorized access.",
      },
    ],
  },
  {
    id: "rights",
    name: "Your Rights",
    content: [
      {
        title: "1. Data Access & Portability",
        description:
          "You have the right to access your personal data and request a copy in a portable format. Contact our support team to exercise this right. We will provide your data within 14 days.",
      },
      {
        title: "2. Correction & Deletion",
        description:
          "You can update your profile information anytime in your account settings. You may request deletion of your account and personal data, subject to legal retention requirements.",
      },
      {
        title: "3. Opt-Out Rights",
        description:
          "You can opt out of marketing communications, cookies for non-essential purposes, and data sharing with third parties. Some options are available in your account settings or by contacting support.",
      },
    ],
  },
];

export default function PrivacyPolicy1() {
  const [currentTab, setCurrentTab] = useState("collection");

  const activeTab = tabs.find((tab) => tab.id === currentTab);

  return (
    <>
      <section className="our-terms">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="main-title">
                <h2>Privacy Policy</h2>
                <p className="text">
                  Learn how Freeio collects, uses, and protects your personal information.
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
                          className={`nav-link text-start ${
                            currentTab === tab.id ? "active" : ""
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
                <div className="tab-content">
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
        </div>
      </section>
    </>
  );
}
