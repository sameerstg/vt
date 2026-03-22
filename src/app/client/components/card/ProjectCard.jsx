"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const statusConfig = {
  POSTED: { label: "Posted", class: "badge-new" },
  ASSIGNED: { label: "Assigned", class: "badge-assigned" },
  IN_PROGRESS: { label: "In Progress", class: "badge-in-progress" },
  SUBMITTED: { label: "Submitted", class: "badge-submitted" },
  COMPLETED: { label: "Completed", class: "badge-completed" },
  IN_DISPUTE: { label: "In Dispute", class: "badge-dispute" },
  CANCELLED: { label: "Cancelled", class: "badge-cancelled" },
};

export default function ProjectCard({ project }) {
  const [offersCount, setOffersCount] = useState(0);
  
  useEffect(() => {
    fetch(`/api/client/offers?projectId=${project.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOffersCount(data.data.length);
        }
      })
      .catch(() => {});
  }, [project.id]);

  const status = statusConfig[project.status] || statusConfig.POSTED;

  return (
    <tr>
      <th scope="row">
        <div className="worker-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
          <div className="d-lg-flex px-0">
            <div className="details mb15-md-md">
              <h5 className="title mb10">
                <Link 
                  href={`/client/project/${project.id}`}
                  className="text-dark text-decoration-none hover-text-primary"
                >
                  {project.title}
                </Link>
              </h5>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-place fz16 vam text-thm2 me-1" />
                {project.type === "PHYSICAL" ? (project.address || "Location TBD") : "Remote"}
              </p>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-calendar fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
              {offersCount > 0 && (
                <p className="mb-0 fz14 list-inline-item mb5-sm text-thm">
                  <i className="flaticon-contract fz16 vam me-1 bdrl1 pl15 pl0-xs bdrn-xs" />
                  {offersCount} {offersCount === 1 ? "Offer" : "Offers"}
                </p>
              )}
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
