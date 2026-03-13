import React from "react";

const mockAuditLogs = [
  {
    action: "assign_task",
    taskId: "task-101",
    assignedTo: "Alice Smith",
    timestamp: "2026-03-09T10:00:00Z"
  },
  {
    action: "distribute_payment",
    taskId: "task-101",
    to: "Alice Smith",
    amount: 200,
    timestamp: "2026-03-10T12:00:00Z"
  }
];

export default function AuditLogs() {
  return (
    <div>
      <h2>Audit Logs</h2>
      <ul>
        {mockAuditLogs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.action}</strong> - Task: {log.taskId} - {log.assignedTo || log.to} - {log.amount ? `$${log.amount}` : ""} - {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}
