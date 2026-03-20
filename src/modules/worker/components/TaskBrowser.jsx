"use client";

import { useState } from "react";
import { getOpenTasks } from "@/data/veritask/tasks";
import { getUserById } from "@/data/veritask/users";
import { TASK_TYPES, TASK_STATE_LABELS } from "@/modules/shared/utils/taskStates";

export default function TaskBrowser({ onTaskSelected }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  const openTasks = getOpenTasks();

  const filteredTasks = openTasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || task.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    if (onTaskSelected) onTaskSelected(task);
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">Browse Tasks</h4>

      <div className="d-flex gap-2 mb20">
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-control"
          style={{ maxWidth: "150px" }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value={TASK_TYPES.PHYSICAL}>Physical</option>
          <option value={TASK_TYPES.VIRTUAL}>Virtual</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center">No tasks available</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => {
            const client = getUserById(task.clientId);
            return (
              <div
                key={task.id}
                className={`task-card bdr1 p20 bdrs8 mb15 cursor-pointer ${
                  selectedTask?.id === task.id ? "bdr-thm" : ""
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <div className="d-flex justify-content-between align-items-start mb10">
                  <div>
                    <h5 className="task-title mb5">{task.title}</h5>
                    <span className="badge badge-info">
                      <i className={task.type === TASK_TYPES.PHYSICAL ? "flaticon-pin mr5" : "flaticon-monitor mr5"} />
                      {task.type === TASK_TYPES.PHYSICAL ? "Physical" : "Virtual"}
                    </span>
                  </div>
                  <span className="fw600 text-thm fz18">${task.budget.amount}</span>
                </div>
                <p className="text mb10">{task.description?.substring(0, 120)}...</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src={client?.avatar || "/images/team/client-1.png"}
                      alt={client?.name}
                      className="rounded-circle me-2"
                      style={{ width: "24px", height: "24px" }}
                    />
                    <span className="text">{client?.name}</span>
                  </div>
                  <span className="text">
                    <i className="flaticon-calendar mr5" />
                    {task.schedule.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
