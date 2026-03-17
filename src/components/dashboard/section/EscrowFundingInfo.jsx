"use client";
import { useState } from "react";
import ClientSectionLayout from "./ClientSectionLayout";

const milestones = [
  { title: "Requirements Finalization", amount: 80, due: "Mar 04, 2026", status: "Completed" },
  { title: "Wireframe + UI Draft", amount: 120, due: "Mar 07, 2026", status: "Pending Funding" },
  { title: "Final Delivery + Handover", amount: 120, due: "Mar 10, 2026", status: "Pending Funding" },
];

export default function EscrowFundingInfo() {
  const taskBudget = 320;
  const platformFee = 16;
  const totalPayable = taskBudget + platformFee;

  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [amount, setAmount] = useState(totalPayable);
  const [confirmed, setConfirmed] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmPayment = () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!paymentMethod) {
      setErrorMessage("Please select a payment method.");
      return;
    }

    if (!amount || amount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (!confirmed) {
      setErrorMessage("Please confirm the escrow funding checkbox.");
      return;
    }

    setSuccessMessage("Payment created successfully. Escrow funding has been initiated.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <ClientSectionLayout title="Escrow Funding Page">
      <div className="row">
        <div className="col-xl-8">

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Escrow Summary</h5>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <p><strong>Task:</strong> Landing Page Redesign</p>
                <p><strong>Worker:</strong> Daniel Carter</p>
                <p><strong>Budget Model:</strong> Milestone</p>
              </div>

              <div className="col-sm-6">
                <p><strong>Task Budget:</strong> ${taskBudget}</p>
                <p><strong>Platform Fee:</strong> ${platformFee}</p>
                <p><strong>Total Payable:</strong> ${totalPayable}</p>
              </div>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Milestone Breakdown</h5>
            </div>

            <div className="table-style1 table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {milestones.map((item) => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>${item.amount}</td>
                      <td>{item.due}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

        </div>

        <div className="col-xl-4">

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Platform Fee</h5>
            </div>

            <p className="text">
              A fixed platform fee is applied for escrow and payment protection.
            </p>

            <h4>${platformFee}</h4>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Confirm Payment</h5>
            </div>

            {successMessage && (
              <div className="alert alert-success mb15">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger mb15">
                {errorMessage}
              </div>
            )}

            <div className="mb15">
              <label className="form-label fw500">Payment Method</label>

              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Bank Transfer</option>
                <option>Payoneer</option>
                <option>Credit/Debit Card</option>
              </select>
            </div>

            <div className="mb15">
              <label className="form-label fw500">Amount</label>

              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-check mb20">
              <input
                className="form-check-input"
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />

              <label className="form-check-label">
                Confirmation: I confirm this escrow funding amount and payment method.
              </label>
            </div>

            <button
              type="button"
              className="ud-btn btn-thm w-100"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
              <i className="fal fa-arrow-right-long" />
            </button>

          </div>

        </div>
      </div>
    </ClientSectionLayout>
  );
}