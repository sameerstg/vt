"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardNavigation from "@/components/dashboard-worker/header/DashboardNavigation";

export default function InvoiceDetailsPage() {
  const router = useRouter();
  
  // Mock invoice data - in real app, this would come from props or API
  const invoice = {
    id: "INV-2026-001",
    date: "Feb 25, 2026",
    task: "Marketing Site Deployment",
    amount: "$390",
    method: "Bank Transfer",
    status: "Paid",
    client: "TechCorp Inc.",
    clientEmail: "billing@techcorp.com",
    paymentId: "TRX-123456789",
    dueDate: "Mar 10, 2026",
    paidDate: "Feb 26, 2026",
    description: "Complete marketing website deployment with responsive design and CMS integration."
  };

  const handleReportIssue = () => {
    // You can pass invoice data as query params if needed
    router.push(`/contact?subject=Report Issue for Invoice ${invoice.id}&invoice=${invoice.id}`);
  };

  const handleContactSupport = () => {
    router.push("/contact");
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12"><DashboardNavigation /></div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Invoice Details</h2>
            <p className="text">Detailed transaction summary and payment certificate.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
            <div className="d-flex justify-content-between align-items-center mb40">
              <div>
                <span className="badge bgc-thm-light text-thm px-3 py-2 mb10 bdrs12 fw600">Verified Invoice</span>
                <h3 className="mb0">Invoice #{invoice.id}</h3>
              </div>
              <div className="d-flex gap-3">
                <Link href="/worker-dashboard/payment-history" className="ud-btn btn-light-default bdrs12">
                  <i className="fal fa-arrow-left me-2" />Back
                </Link>
                <button className="ud-btn btn-thm bdrs12" onClick={() => window.print()}>
                  <i className="fal fa-print me-2" />Print
                </button>
              </div>
            </div>

            <div className="row g-4 mb40">
              <div className="col-md-3">
                <div className="bdr1 bdrs12 p25 h-100 bgc-white">
                  <p className="mb10 text-muted fw500">Issued On</p>
                  <h5 className="mb0">{invoice.date}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs12 p25 h-100 bgc-white">
                  <p className="mb10 text-muted fw500">Status</p>
                  <span className="badge bg-success text-white px-3 py-1 bdrs8">{invoice.status}</span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs12 p25 h-100 bgc-white">
                  <p className="mb10 text-muted fw500">Method</p>
                  <h5 className="mb0">{invoice.method}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bdr1 bdrs12 p25 h-100 bg-dark text-white">
                  <p className="mb10 text-white-opacity fw500">Total Paid</p>
                  <h3 className="mb0 text-white">{invoice.amount}</h3>
                </div>
              </div>
            </div>

            <div className="row g-4 mb40">
              <div className="col-lg-7">
                <div className="bdr1 bdrs12 p30 h-100">
                  <h5 className="mb25 bdrb1 pb15">Task Summary</h5>
                  <div className="mb20">
                    <p className="text-muted mb5">Title</p>
                    <h6 className="fz16">{invoice.task}</h6>
                  </div>
                  <div>
                    <p className="text-muted mb5">Description</p>
                    <p className="mb0 text-dark fz15">{invoice.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="bdr1 bdrs12 p30 h-100">
                  <h5 className="mb25 bdrb1 pb15">Client Information</h5>
                  <div className="mb20">
                    <p className="text-muted mb5">Name</p>
                    <h6>{invoice.client}</h6>
                  </div>
                  <div>
                    <p className="text-muted mb5">Contact</p>
                    <p className="mb0">{invoice.clientEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bgc-thm-light bdrs12 p25 d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <h6 className="mb5">Need assistance?</h6>
                <p className="mb0 text-muted fz13">Our support team is available 24 hours a day for reaching out concerning payment disputes.</p>
              </div>
              <div className="d-flex gap-3">
                <button onClick={handleReportIssue} className="ud-btn btn-light-default bdrs12">Report</button>
                <button onClick={handleContactSupport} className="ud-btn btn-thm bdrs12">Support</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}