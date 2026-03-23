"use client";

import useAdminStore from "@/modules/admin/store/adminStore";
import { projects } from "@/app/api/projects/data";

export default function ReportsOverview() {
  const { users, disputes, transactions, teams } = useAdminStore();

  // User breakdown
  const byRole = ["client", "worker", "contractor", "admin"].map((role) => ({
    role,
    total: users.filter((u) => u.role === role).length,
    active: users.filter((u) => u.role === role && u.status === "active").length,
    suspended: users.filter((u) => u.role === role && u.status === "suspended").length,
  }));

  // Project breakdown by status
  const projectStatuses = ["POSTED", "ASSIGNED", "IN_PROGRESS", "SUBMITTED", "COMPLETED", "IN_DISPUTE", "CANCELLED"];
  const projectCounts = projectStatuses.map((s) => ({
    status: s,
    count: projects.filter((p) => p.status === s).length,
  }));
  const totalProjects = projects.length;

  // Financial summary
  const payments = transactions.filter((t) => t.type === "payment" && t.status === "completed");
  const payouts  = transactions.filter((t) => t.type === "payout"  && t.status === "completed");
  const fees     = transactions.filter((t) => t.type === "fee"     && t.status === "completed");
  const refunds  = transactions.filter((t) => t.type === "refund"  && t.status === "completed");
  const sum = (arr) => arr.reduce((acc, t) => acc + t.amount, 0);

  // Dispute breakdown
  const disputeByStatus = ["pending", "escalated", "resolved"].map((s) => ({
    status: s,
    count: disputes.filter((d) => d.status === s).length,
  }));

  const ROLE_COLORS = {
    client: "badge-assigned",
    worker: "badge-in-progress",
    contractor: "badge-submitted",
    admin: "badge-dispute",
  };

  const STATUS_COLORS = {
    POSTED: "badge-new",
    ASSIGNED: "badge-assigned",
    IN_PROGRESS: "badge-in-progress",
    SUBMITTED: "badge-submitted",
    COMPLETED: "badge-completed",
    IN_DISPUTE: "badge-dispute",
    CANCELLED: "badge-cancelled",
  };

  const DISPUTE_COLORS = {
    pending: "badge-in-progress",
    escalated: "badge-dispute",
    resolved: "badge-completed",
  };

  return (
    <div>
      {/* Platform Summary */}
      <div className="row mb30">
        {[
          { label: "Total Users",    value: users.length,       icon: "flaticon-user" },
          { label: "Total Projects", value: totalProjects,      icon: "flaticon-contract" },
          { label: "Total Teams",    value: teams.length,       icon: "flaticon-team" },
          { label: "Open Disputes",  value: disputes.filter((d) => d.status !== "resolved").length, icon: "flaticon-support" },
        ].map((s) => (
          <div key={s.label} className="col-sm-6 col-xxl-3">
            <div className="d-flex align-items-center justify-content-between statistics_funfact">
              <div className="details">
                <div className="fz15">{s.label}</div>
                <div className="title">{s.value}</div>
              </div>
              <div className="icon text-center"><i className={s.icon} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* User breakdown */}
        <div className="col-xl-6 mb30">
          <div className="ps-widget bgc-white bdrs4 p30 h-100">
            <h6 className="mb20">Users by Role</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Total</th>
                    <th>Active</th>
                    <th>Suspended</th>
                  </tr>
                </thead>
                <tbody>
                  {byRole.map((r) => (
                    <tr key={r.role}>
                      <td>
                        <span className={`badge ${ROLE_COLORS[r.role]}`}>
                          {r.role.charAt(0).toUpperCase() + r.role.slice(1)}
                        </span>
                      </td>
                      <td className="fw600">{r.total}</td>
                      <td className="text-success">{r.active}</td>
                      <td className="text-danger">{r.suspended}</td>
                    </tr>
                  ))}
                  <tr className="fw600 bdrb1">
                    <td>Total</td>
                    <td>{users.length}</td>
                    <td className="text-success">{users.filter((u) => u.status === "active").length}</td>
                    <td className="text-danger">{users.filter((u) => u.status === "suspended").length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="col-xl-6 mb30">
          <div className="ps-widget bgc-white bdrs4 p30 h-100">
            <h6 className="mb20">Financial Summary</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr><th>Type</th><th>Count</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {[
                    { label: "Payments",  data: payments, cls: "text-success" },
                    { label: "Payouts",   data: payouts,  cls: "text-warning" },
                    { label: "Fees",      data: fees,     cls: "text-info" },
                    { label: "Refunds",   data: refunds,  cls: "text-danger" },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className={row.cls}>{row.label}</td>
                      <td>{row.data.length}</td>
                      <td className="fw600">${sum(row.data).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bdrb1 pt10 mb10" />
            <div className="d-flex justify-content-between fz14 fw600">
              <span>Net Revenue (fees − refunds)</span>
              <span className="text-thm">
                ${(sum(fees) - sum(refunds)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Project status breakdown */}
        <div className="col-xl-6 mb30">
          <div className="ps-widget bgc-white bdrs4 p30 h-100">
            <h6 className="mb20">Projects by Status</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr><th>Status</th><th>Count</th><th>Share</th></tr>
                </thead>
                <tbody>
                  {projectCounts.filter((r) => r.count > 0).map((r) => (
                    <tr key={r.status}>
                      <td>
                        <span className={`badge ${STATUS_COLORS[r.status]}`}>
                          {r.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="fw600">{r.count}</td>
                      <td className="text-muted">
                        {((r.count / totalProjects) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="fw600">
                    <td>Total</td>
                    <td>{totalProjects}</td>
                    <td>100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dispute breakdown */}
        <div className="col-xl-6 mb30">
          <div className="ps-widget bgc-white bdrs4 p30 h-100">
            <h6 className="mb20">Disputes by Status</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr><th>Status</th><th>Count</th></tr>
                </thead>
                <tbody>
                  {disputeByStatus.map((r) => (
                    <tr key={r.status}>
                      <td>
                        <span className={`badge ${DISPUTE_COLORS[r.status]}`}>
                          {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                        </span>
                      </td>
                      <td className="fw600">{r.count}</td>
                    </tr>
                  ))}
                  <tr className="fw600">
                    <td>Total</td>
                    <td>{disputes.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
