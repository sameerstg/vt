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
    router.push('/contact');
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      {/* HEADER SECTION */}
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>

        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Invoice Details</h2>
            <p className="text">Complete payment information and transaction summary.</p>
          </div>
        </div>
      </div>

      {/* CONTENT BOX */}
      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            
            {/* Top Navigation */}
            <div className="d-flex justify-content-between align-items-center mb30">
              <h4 className="mb0">Invoice #{invoice.id}</h4>
              <div className="d-flex gap-2">
                <Link
                  href="/worker-dashboard/payment-history"
                  className="ud-btn btn-light-default"
                >
                  Back to History
                </Link>
                {/* <button 
                  onClick={() => router.push('/worker-dashboard/invoice-download')}
                  className="ud-btn btn-thm"
                >
                  Download PDF
                </button> */}
              </div>
            </div>

            {/* Invoice Summary Cards */}
            <div className="row g-4 mb30">
              <div className="col-md-4">
                <div className="bdr1 bdrs8 p20 h-100">
                  <p className="mb8 text-muted">Invoice ID</p>
                  <p className="mb0 fw600 fs18">{invoice.id}</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="bdr1 bdrs8 p20 h-100">
                  <p className="mb8 text-muted">Invoice Date</p>
                  <p className="mb0 fw600 fs18">{invoice.date}</p>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="bdr1 bdrs8 p20 h-100">
                  <p className="mb8 text-muted">Status</p>
                  <span className="badge bg-success text-white px-3 py-2 fs14">
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Client & Payment Details */}
            <div className="row g-4 mb30">
              <div className="col-md-6">
                <div className="bdr1 bdrs8 p20">
                  <h5 className="mb20">Client Information</h5>
                  <p className="mb8"><strong>Name:</strong> {invoice.client}</p>
                  <p className="mb0"><strong>Email:</strong> {invoice.clientEmail}</p>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="bdr1 bdrs8 p20">
                  <h5 className="mb20">Payment Information</h5>
                  <p className="mb8"><strong>Payment ID:</strong> {invoice.paymentId}</p>
                  <p className="mb8"><strong>Method:</strong> {invoice.method}</p>
                  <p className="mb8"><strong>Due Date:</strong> {invoice.dueDate}</p>
                  <p className="mb0"><strong>Paid Date:</strong> {invoice.paidDate}</p>
                </div>
              </div>
            </div>

            {/* Task Description */}
            <div className="bdr1 bdrs8 p20 mb30">
              <h5 className="mb15">Task Description</h5>
              <p className="mb0">{invoice.description}</p>
            </div>

            {/* Amount Summary */}
            <div className="bdr1 bdrs8 p20">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5 className="mb0">Total Amount</h5>
                </div>
                <div className="col-md-4 text-md-end">
                  <span className="fw700 fs24 text-thm">{invoice.amount}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-3 mt30">
              <button 
                onClick={handleReportIssue}
                className="ud-btn btn-light-default"
              >
                Report Issue
              </button>
              <button 
                onClick={handleContactSupport}
                className="ud-btn btn-thm"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .badge.bg-success {
          background-color: #10b981 !important;
        }

        .fs14 {
          font-size: 14px;
        }

        .fs18 {
          font-size: 18px;
        }

        .fs24 {
          font-size: 24px;
        }

        .fw600 {
          font-weight: 600;
        }

        .fw700 {
          font-weight: 700;
        }

        .text-muted {
          color: #64748b;
        }
      `}</style>
    </div>
  );
}