"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const contractorMilestones = [
  { id: 1, title: "UI Fix Batch", amount: "$280" },
  { id: 2, title: "QA Regression Pass", amount: "$220" },
  { id: 3, title: "Client Delivery Notes", amount: "$300" },
];

const workers = [
  { id: "w-1001", name: "Ahsan Raza" },
  { id: "w-1002", name: "Sara Khan" },
  { id: "w-1003", name: "Bilal Ahmed" },
  { id: "w-1004", name: "Maham Ali" },
];

const parseAmount = (value = "") => {
  const parsed = Number(String(value).replace(/[$,\s]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatAmount = (value = 0) => `$${Number(value).toLocaleString()}`;

export default function PaymentDistributionInfo() {
  const defaultMilestoneId = String(contractorMilestones[0]?.id || "");
  const [totalEscrowReceived, setTotalEscrowReceived] = useState("1200");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState(defaultMilestoneId);
  const [milestoneAmount, setMilestoneAmount] = useState("");
  const [allocations, setAllocations] = useState([{ workerId: "", amount: "" }]);
  const [distributionConfirmation, setDistributionConfirmation] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [transactionLog, setTransactionLog] = useState([
    {
      id: "dist-1",
      date: "2026-03-02",
      milestone: "UI Fix Batch",
      distributed: "$180",
      workers: 1,
      status: "Distributed",
    },
  ]);
  const [isDistributed, setIsDistributed] = useState(false);

  const selectedMilestone = useMemo(
    () =>
      contractorMilestones.find((item) => String(item.id) === String(selectedMilestoneId)),
    [selectedMilestoneId]
  );

  useEffect(() => {
    if (selectedMilestone?.amount) {
      setMilestoneAmount(String(parseAmount(selectedMilestone.amount)));
    }
  }, [selectedMilestone]);

  const allocatedTotal = useMemo(
    () => allocations.reduce((sum, item) => sum + parseAmount(item.amount), 0),
    [allocations]
  );

  const remainingAmount = Math.max(parseAmount(milestoneAmount) - allocatedTotal, 0);

  const addAllocationRow = () => {
    setAllocations((prev) => [...prev, { workerId: "", amount: "" }]);
  };

  const removeAllocationRow = (index) => {
    setAllocations((prev) => prev.filter((_, idx) => idx !== index));
  };

  const updateAllocationField = (index, field, value) => {
    setAllocations((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
    setFieldErrors((prev) => ({ ...prev, allocations: undefined }));
  };

  const validate = () => {
    const errors = {};

    if (!parseAmount(totalEscrowReceived)) errors.totalEscrowReceived = "Total Escrow Received is required.";
    if (!selectedMilestoneId) errors.selectedMilestoneId = "Please select a milestone.";
    if (!parseAmount(milestoneAmount)) errors.milestoneAmount = "Milestone Amount is required.";

    const invalidAllocation = allocations.some((item) => !item.workerId || !parseAmount(item.amount));
    if (!allocations.length || invalidAllocation) {
      errors.allocations = "Each allocation row must have worker and amount.";
    }
    if (allocatedTotal > parseAmount(milestoneAmount)) {
      errors.allocations = "Allocated amount cannot exceed milestone amount.";
    }
    if (!distributionConfirmation) {
      errors.distributionConfirmation = "Please confirm before distribution.";
    }

    return errors;
  };

  const handleDistribute = (event) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setIsDistributed(false);
      return;
    }

    const workersInThisDistribution = new Set(
      allocations.map((item) => item.workerId).filter(Boolean)
    ).size;

    const newEntry = {
      id: `dist-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      milestone: selectedMilestone?.title || "Milestone",
      distributed: formatAmount(allocatedTotal),
      workers: workersInThisDistribution,
      status: "Distributed",
    };

    setTransactionLog((prev) => [newEntry, ...prev]);
    setAllocations([{ workerId: "", amount: "" }]);
    setDistributionConfirmation(false);
    setIsDistributed(true);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Payment Distribution</h2>
          </div>
        </div>
      </div>

      {isDistributed && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              Internal distribution recorded successfully.
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleDistribute}>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Total Escrow Received</h5>
              </div>
              <div className="form-style1 row">
                <div className="col-lg-4">
                  <label className="heading-color ff-heading fw500 mb10">Escrow Amount</label>
                  <input
                    type="text"
                    className={`form-control${fieldErrors.totalEscrowReceived ? " border-danger" : ""}`}
                    placeholder="$1200"
                    value={totalEscrowReceived}
                    onChange={(event) => setTotalEscrowReceived(event.target.value)}
                  />
                  {fieldErrors.totalEscrowReceived && (
                    <small className="text-danger d-block mt5">{fieldErrors.totalEscrowReceived}</small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Milestone Amount</h5>
              </div>
              <div className="form-style1 row">
                <div className="col-lg-6">
                  <label className="heading-color ff-heading fw500 mb10">Milestone</label>
                  <select
                    className={`form-control${fieldErrors.selectedMilestoneId ? " border-danger" : ""}`}
                    value={selectedMilestoneId}
                    onChange={(event) => setSelectedMilestoneId(event.target.value)}
                  >
                    {contractorMilestones.map((milestone) => (
                      <option key={milestone.id} value={String(milestone.id)}>
                        {milestone.title}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.selectedMilestoneId && (
                    <small className="text-danger d-block mt5">{fieldErrors.selectedMilestoneId}</small>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="heading-color ff-heading fw500 mb10">Milestone Amount</label>
                  <input
                    type="text"
                    className={`form-control${fieldErrors.milestoneAmount ? " border-danger" : ""}`}
                    placeholder="$0"
                    value={milestoneAmount}
                    onChange={(event) => setMilestoneAmount(event.target.value)}
                  />
                  {fieldErrors.milestoneAmount && (
                    <small className="text-danger d-block mt5">{fieldErrors.milestoneAmount}</small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-flex justify-content-between align-items-center bdrb1 pb15 mb25">
                <h5 className="list-title mb-0">Worker Allocation</h5>
                <button type="button" className="ud-btn btn-thm-border" onClick={addAllocationRow}>
                  Add Row
                </button>
              </div>

              <div className="form-style1">
                {allocations.map((allocation, index) => (
                  <div key={index} className="row align-items-end mb20">
                    <div className="col-lg-6">
                      <label className="heading-color ff-heading fw500 mb10">Worker</label>
                      <select
                        className="form-control"
                        value={allocation.workerId}
                        onChange={(event) =>
                          updateAllocationField(index, "workerId", event.target.value)
                        }
                      >
                        <option value="">Select worker</option>
                        {workers.map((worker) => (
                          <option key={worker.id} value={worker.id}>
                            {worker.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-4">
                      <label className="heading-color ff-heading fw500 mb10">Allocation Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="$0"
                        value={allocation.amount}
                        onChange={(event) =>
                          updateAllocationField(index, "amount", event.target.value)
                        }
                      />
                    </div>
                    <div className="col-lg-2">
                      <button
                        type="button"
                        className="ud-btn btn-dark w-100"
                        onClick={() => removeAllocationRow(index)}
                        disabled={allocations.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {fieldErrors.allocations && (
                  <small className="text-danger d-block mb10">{fieldErrors.allocations}</small>
                )}

                <div className="allocation-summary-box">
                  <p className="mb5 text">
                    <strong>Allocated Total:</strong> {formatAmount(allocatedTotal)}
                  </p>
                  <p className="mb0 text">
                    <strong>Remaining:</strong> {formatAmount(remainingAmount)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Distribution Confirmation</h5>
              </div>

              <div className="checkbox-style1 mb20">
                <label className="custom_checkbox">
                  I confirm the internal distribution amounts are correct.
                  <input
                    type="checkbox"
                    checked={distributionConfirmation}
                    onChange={(event) => setDistributionConfirmation(event.target.checked)}
                  />
                  <span className="checkmark" />
                </label>
                {fieldErrors.distributionConfirmation && (
                  <small className="text-danger d-block mt5">
                    {fieldErrors.distributionConfirmation}
                  </small>
                )}
              </div>

              <button type="submit" className="ud-btn btn-thm">
                Confirm Distribution
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Transaction Log</h5>
            </div>

            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Milestone</th>
                    <th scope="col">Distributed Amount</th>
                    <th scope="col">Workers</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {transactionLog.map((item) => (
                    <tr key={item.id}>
                      <td className="vam">{item.date}</td>
                      <td className="vam">{item.milestone}</td>
                      <td className="vam">{item.distributed}</td>
                      <td className="vam">{item.workers}</td>
                      <td className="vam">
                        <span className="pending-style style4">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .allocation-summary-box {
          border: 1px solid #e7ebf5;
          background: #fbfcff;
          border-radius: 10px;
          padding: 12px;
        }
      `}</style>
    </div>
  );
}
