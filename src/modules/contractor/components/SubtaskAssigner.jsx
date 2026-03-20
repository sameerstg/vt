"use client";

import { useState } from "react";
import useContractorStore from "@/modules/contractor/store/contractorStore";
import api from "@/modules/shared/utils/api";

export default function SubtaskAssigner({ task }) {
  const { teamMembers } = useContractorStore();
  const [subtasks, setSubtasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubtask = () => {
    if (!formData.title || !formData.assignedTo || !formData.amount) return;
    setSubtasks(prev => [...prev, { ...formData, id: `subtask-${Date.now()}` }]);
    setFormData({ title: "", description: "", assignedTo: "", amount: "" });
    setShowForm(false);
  };

  const handleRemoveSubtask = (subtaskId) => {
    setSubtasks(prev => prev.filter(s => s.id !== subtaskId));
  };

  const handleAssignAll = async () => {
    if (subtasks.length === 0) return;
    setLoading(true);
    try {
      for (const subtask of subtasks) {
        await api.contractor.assignSubtask(task?.id, subtask.assignedTo, subtask);
      }
      setSubtasks([]);
      alert("Subtasks assigned successfully!");
    } finally {
      setLoading(false);
    }
  };

  if (!task) {
    return (
      <div className="bgc-white p30 bdrs12 default-box-shadow1">
        <p className="text-center">Select a task to assign subtasks</p>
      </div>
    );
  }

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <div className="d-flex justify-content-between align-items-center mb20">
        <h4 className="mb0">Assign Subtasks</h4>
        <button
          className="ud-btn btn-thm"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="fal fa-plus" /> Add Subtask
        </button>
      </div>

      {showForm && (
        <div className="mb20 p20 bgc-thm4 bdrs8">
          <div className="mb15">
            <label className="form-label fw600 dark-color">Subtask Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter subtask title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb15">
            <label className="form-label fw600 dark-color">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              placeholder="Subtask details"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Assign To</label>
              <select
                name="assignedTo"
                className="form-control"
                value={formData.assignedTo}
                onChange={handleChange}
              >
                <option value="">Select Team Member</option>
                {teamMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mb15">
              <label className="form-label fw600 dark-color">Amount ($)</label>
              <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="ud-btn btn-thm" onClick={handleAddSubtask}>
            Add Subtask
          </button>
        </div>
      )}

      {subtasks.length === 0 ? (
        <div className="text-center p30">
          <i className="flaticon-checklist fz40 text-thm mb15" />
          <p className="text">No subtasks assigned yet.</p>
        </div>
      ) : (
        <>
          <div className="subtasks-list mb20">
            {subtasks.map((subtask) => {
              const member = teamMembers.find(m => m.id === subtask.assignedTo);
              return (
                <div key={subtask.id} className="subtask-item bdr1 p15 bdrs8 mb10">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb5">{subtask.title}</h6>
                      <p className="text mb0 fz14">
                        Assigned to: <span className="fw500">{member?.name}</span>
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw600 text-thm">${subtask.amount}</span>
                      <button
                        className="btn-close"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="ud-btn btn-thm w-100"
            onClick={handleAssignAll}
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign All Subtasks"}
            <i className="fal fa-check" />
          </button>
        </>
      )}
    </div>
  );
}
