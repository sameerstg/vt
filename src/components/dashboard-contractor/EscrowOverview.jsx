import React from "react";

const mockEscrow = {
  received: [
    { taskId: "task-101", amount: 500, date: "2026-03-09" }
  ],
  distributed: [
    { taskId: "task-101", to: "Alice Smith", amount: 200, date: "2026-03-10" }
  ]
};

export default function EscrowOverview() {
  return (
    <div>
      <h2>Escrow Overview</h2>
      <div>
        <h3>Received</h3>
        <ul>
          {mockEscrow.received.map((item, idx) => (
            <li key={idx}>
              Task: {item.taskId} - Amount: ${item.amount} - Date: {item.date}
            </li>
          ))}
        </ul>
        <h3>Distributed</h3>
        <ul>
          {mockEscrow.distributed.map((item, idx) => (
            <li key={idx}>
              Task: {item.taskId} - To: {item.to} - Amount: ${item.amount} - Date: {item.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
