"use client";

import { useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";

const registeredWorkers = [
  { id: "w-1001", name: "Ahsan Raza", email: "ahsan.raza@veritask.com" },
  { id: "w-1002", name: "Sara Khan", email: "sara.khan@veritask.com" },
  { id: "w-1003", name: "Bilal Ahmed", email: "bilal.ahmed@veritask.com" },
  { id: "w-1004", name: "Maham Ali", email: "maham.ali@veritask.com" },
];

const initialMilestoneAllocation = [
  {
    id: "ms-1",
    title: "UI Fix Batch",
    description: "Fix responsive and dropdown issues in contractor module.",
    schedule: "2026-03-08",
    assignedWorkers: 1,
    status: "In Progress",
  },
  {
    id: "ms-2",
    title: "QA Regression Pass",
    description: "Run checklist and verify resolved defects.",
    schedule: "2026-03-12",
    assignedWorkers: 0,
    status: "Pending",
  },
  {
    id: "ms-3",
    title: "Client Delivery Notes",
    description: "Prepare final changelog and handover notes.",
    schedule: "2026-03-15",
    assignedWorkers: 0,
    status: "Pending",
  },
];

const initialTeamList = [
  {
    id: "tm-1",
    workerName: "Ahsan Raza",
    workerEmail: "ahsan.raza@veritask.com",
    role: "Frontend Worker",
    milestoneTitle: "UI Fix Batch",
    schedule: "2026-03-08",
    internalPayout: "$280",
    taskStatus: "In Progress",
  },
];

const initialDistributionLog = [
  {
    id: "log-1",
    date: "2026-03-02",
    worker: "Ahsan Raza",
    milestone: "UI Fix Batch",
    payout: "$280",
    status: "In Progress",
  },
];

const getStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("completed")) return "style4";
  if (normalized.includes("progress")) return "style6";
  if (normalized.includes("blocked")) return "style5";
  return "style1";
};

export default function TeamManagementInfo() {
  const [teamList, setTeamList] = useState(initialTeamList);
  const [milestoneAllocation, setMilestoneAllocation] = useState(initialMilestoneAllocation);
  const [distributionLog, setDistributionLog] = useState(initialDistributionLog);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    registeredWorkerId: "",
    assignedRole: "",
    assignedMilestoneId: "",
    milestoneDescription: "",
    milestoneSchedule: "",
    internalPayout: "",
    taskStatus: "Pending",
  });

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.registeredWorkerId) errors.registeredWorkerId = "Add Registered Worker is required.";
    if (!formData.assignedRole.trim()) errors.assignedRole = "Assign Role is required.";
    if (!formData.assignedMilestoneId) errors.assignedMilestoneId = "Assign Milestone is required.";
    if (!formData.milestoneDescription.trim()) {
      errors.milestoneDescription = "Milestone Description is required.";
    }
    if (!formData.milestoneSchedule) errors.milestoneSchedule = "Schedule is required.";
    if (!formData.internalPayout.trim()) errors.internalPayout = "Define Internal Payout is required.";
    if (!formData.taskStatus) errors.taskStatus = "Task Status is required.";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length) {
      setIsSaved(false);
      return;
    }

    const worker = registeredWorkers.find((item) => item.id === formData.registeredWorkerId);
    const milestone = milestoneAllocation.find((item) => item.id === formData.assignedMilestoneId);

    if (!worker || !milestone) {
      setIsSaved(false);
      return;
    }

    const newTeamMember = {
      id: `tm-${Date.now()}`,
      workerName: worker.name,
      workerEmail: worker.email,
      role: formData.assignedRole,
      milestoneTitle: milestone.title,
      schedule: formData.milestoneSchedule,
      internalPayout: formData.internalPayout,
      taskStatus: formData.taskStatus,
    };

    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      worker: worker.name,
      milestone: milestone.title,
      payout: formData.internalPayout,
      status: formData.taskStatus,
    };

    setTeamList((prev) => [newTeamMember, ...prev]);
    setDistributionLog((prev) => [newLog, ...prev]);
    setMilestoneAllocation((prev) =>
      prev.map((item) =>
        item.id === formData.assignedMilestoneId
          ? {
              ...item,
              description: formData.milestoneDescription,
              schedule: formData.milestoneSchedule,
              status: formData.taskStatus,
              assignedWorkers: item.assignedWorkers + 1,
            }
          : item
      )
    );

    setFormData({
      registeredWorkerId: "",
      assignedRole: "",
      assignedMilestoneId: "",
      milestoneDescription: "",
      milestoneSchedule: "",
      internalPayout: "",
      taskStatus: "Pending",
    });
    setIsSaved(true);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Team Management</h2>
            <p className="text">Create and manage team members.</p>
          </div>
        </div>
      </div>

      {isSaved && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              Team allocation saved successfully.
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb25">
              <h5 className="list-title">Team Assignment Form</h5>
            </div>

            <form className="form-style1" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Add Registered Worker</label>
                    <select
                      className={`form-control${fieldErrors.registeredWorkerId ? " border-danger" : ""}`}
                      value={formData.registeredWorkerId}
                      onChange={(event) => updateField("registeredWorkerId", event.target.value)}
                    >
                      <option value="">Select worker</option>
                      {registeredWorkers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                          {worker.name}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.registeredWorkerId && (
                      <small className="text-danger d-block mt5">{fieldErrors.registeredWorkerId}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Assign Role</label>
                    <input
                      type="text"
                      className={`form-control${fieldErrors.assignedRole ? " border-danger" : ""}`}
                      placeholder="e.g. Frontend Worker"
                      value={formData.assignedRole}
                      onChange={(event) => updateField("assignedRole", event.target.value)}
                    />
                    {fieldErrors.assignedRole && (
                      <small className="text-danger d-block mt5">{fieldErrors.assignedRole}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Assign Milestone</label>
                    <select
                      className={`form-control${fieldErrors.assignedMilestoneId ? " border-danger" : ""}`}
                      value={formData.assignedMilestoneId}
                      onChange={(event) => updateField("assignedMilestoneId", event.target.value)}
                    >
                      <option value="">Select milestone</option>
                      {milestoneAllocation.map((milestone) => (
                        <option key={milestone.id} value={milestone.id}>
                          {milestone.title}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.assignedMilestoneId && (
                      <small className="text-danger d-block mt5">{fieldErrors.assignedMilestoneId}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Milestone Description and Schedule
                    </label>
                    <textarea
                      cols={30}
                      rows={4}
                      className={fieldErrors.milestoneDescription ? "border-danger" : ""}
                      placeholder="Describe milestone scope..."
                      value={formData.milestoneDescription}
                      onChange={(event) => updateField("milestoneDescription", event.target.value)}
                    />
                    {fieldErrors.milestoneDescription && (
                      <small className="text-danger d-block mt5">
                        {fieldErrors.milestoneDescription}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Schedule</label>
                    <input
                      type="date"
                      className={`form-control${fieldErrors.milestoneSchedule ? " border-danger" : ""}`}
                      value={formData.milestoneSchedule}
                      onChange={(event) => updateField("milestoneSchedule", event.target.value)}
                    />
                    {fieldErrors.milestoneSchedule && (
                      <small className="text-danger d-block mt5">{fieldErrors.milestoneSchedule}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Define Internal Payout</label>
                    <input
                      type="text"
                      className={`form-control${fieldErrors.internalPayout ? " border-danger" : ""}`}
                      placeholder="$300"
                      value={formData.internalPayout}
                      onChange={(event) => updateField("internalPayout", event.target.value)}
                    />
                    {fieldErrors.internalPayout && (
                      <small className="text-danger d-block mt5">{fieldErrors.internalPayout}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-2">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">Task Status</label>
                    <select
                      className={`form-control${fieldErrors.taskStatus ? " border-danger" : ""}`}
                      value={formData.taskStatus}
                      onChange={(event) => updateField("taskStatus", event.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                    {fieldErrors.taskStatus && (
                      <small className="text-danger d-block mt5">{fieldErrors.taskStatus}</small>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <button type="submit" className="ud-btn btn-thm">
                    Save Team Allocation
                    <i className="fal fa-arrow-right-long" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Team List</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Worker</th>
                    <th scope="col">Role</th>
                    <th scope="col">Milestone</th>
                    <th scope="col">Schedule</th>
                    <th scope="col">Internal Payout</th>
                    <th scope="col">Task Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {teamList.map((member) => (
                    <tr key={member.id}>
                      <td className="vam">
                        <span className="fw500">{member.workerName}</span>
                        <br />
                        <small>{member.workerEmail}</small>
                      </td>
                      <td className="vam">{member.role}</td>
                      <td className="vam">{member.milestoneTitle}</td>
                      <td className="vam">{member.schedule}</td>
                      <td className="vam">{member.internalPayout}</td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(member.taskStatus)}`}>
                          {member.taskStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Milestone Allocation</h5>
            </div>
            <div className="row">
              {milestoneAllocation.map((milestone) => (
                <div key={milestone.id} className="col-xl-4 col-md-6">
                  <div className="milestone-card">
                    <div className="d-flex justify-content-between align-items-center mb10">
                      <h6 className="mb-0">{milestone.title}</h6>
                      <span className={`pending-style ${getStatusClass(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text mb10">{milestone.description}</p>
                    <p className="text mb5">
                      <strong>Schedule:</strong> {milestone.schedule}
                    </p>
                    <p className="text mb0">
                      <strong>Assigned Workers:</strong> {milestone.assignedWorkers}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title">Internal Distribution Log</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Worker</th>
                    <th scope="col">Milestone</th>
                    <th scope="col">Internal Payout</th>
                    <th scope="col">Task Status</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {distributionLog.map((log) => (
                    <tr key={log.id}>
                      <td className="vam">{log.date}</td>
                      <td className="vam">{log.worker}</td>
                      <td className="vam">{log.milestone}</td>
                      <td className="vam">{log.payout}</td>
                      <td className="vam">
                        <span className={`pending-style ${getStatusClass(log.status)}`}>{log.status}</span>
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
        .milestone-card {
          border: 1px solid #e7ebf5;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 16px;
          height: calc(100% - 16px);
          background: #fbfcff;
        }
      `}</style>
    </div>
  );
}
