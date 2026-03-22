"use client";
import Link from "next/link";

const statusConfig = {
  POSTED: { label: "Open", class: "badge-new" },
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
};

export default function WorkerProjectCard({ project }) {
  const status = statusConfig[project.status] || statusConfig.POSTED;

  return (
    <tr>
      <th scope="row">
        <div className="worker-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
          <div className="d-lg-flex px-0">
            <div className="details mb15-md-md">
              <h5 className="title mb10">
                <Link 
                  href={`/worker/project/${project.id}`}
                  className="text-dark text-decoration-none hover-text-primary"
                >
                  {project.title}
                </Link>
              </h5>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className={`${project.type === "PHYSICAL" ? "flaticon-place" : "flaticon-web"} fz16 vam text-thm2 me-1`} />
                {project.type === "PHYSICAL" ? (project.address || "Location TBD") : "Remote"}
              </p>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-calendar fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </th>
      <td className="vam">
        <span className="fz15 fw400">{project.category}</span>
      </td>
      <td className="vam">
        <div className="d-flex align-items-center gap-2">
          <span className={`badge ${status.class}`}>{status.label}</span>
        </div>
        <span className="fz14 fw400 d-block mt5">
          ${project.budget.toLocaleString()}/{project.budgetModel === "MILESTONE" ? "Milestone" : "Fixed"}
        </span>
      </td>
    </tr>
  );
}
