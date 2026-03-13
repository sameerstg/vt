import React from "react";

const mockPayroll = [
  {
    taskId: "task-101",
    to: "Alice Smith",
    amount: 200,
    date: "2026-03-10"
  },
  {
    taskId: "task-103",
    to: "Bob Lee",
    amount: 150,
    date: "2026-03-11"
  }
];

export default function PayrollManagement() {
  return (
    <div>
      <h2>Payroll Management</h2>
      <table>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {mockPayroll.map((pay, idx) => (
            <tr key={idx}>
              <td>{pay.taskId}</td>
              <td>{pay.to}</td>
              <td>${pay.amount}</td>
              <td>{pay.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
