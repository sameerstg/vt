"use client";
import Link from "next/link";

const statusConfig = {
  PENDING: { label: "Pending", class: "badge-new" },
  ACCEPTED: { label: "Accepted", class: "badge-completed" },
  REJECTED: { label: "Rejected", class: "badge-cancelled" },
  WITHDRAWN: { label: "Withdrawn", class: "badge-cancelled" },
};

export default function OfferCard({ offer }) {
  const status = statusConfig[offer.status] || statusConfig.PENDING;

  return (
    <tr>
      <th scope="row">
        <div className="worker-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
          <div className="d-lg-flex px-0">
            <div className="details mb15-md-md">
              <h5 className="title mb10">{offer.projectId}</h5>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-user fz16 vam text-thm2 me-1" />
                {offer.workerName}
              </p>
              <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                <i className="flaticon-calendar fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />
                {new Date(offer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </th>
      <td className="vam">
        <span className="fz15 fw400 text-thm">${offer.amount?.toLocaleString()}</span>
      </td>
      <td className="vam">
        <span className="fz14 fw400">{offer.estimatedDays} days</span>
      </td>
      <td className="vam">
        <div className="d-flex align-items-center gap-2">
          <span className={`badge ${status.class}`}>{status.label}</span>
        </div>
      </td>
    </tr>
  );
}
