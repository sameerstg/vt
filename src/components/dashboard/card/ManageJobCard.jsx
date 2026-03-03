"use client";
import Image from "next/image";
import { Tooltip } from "react-tooltip";

export default function ManageJobCard({ data }) {
  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="thumb w60 position-relative rounded-circle mb15-md">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={data.img}
                  alt="rounded"
                />
                <span className="online-badge2" />
              </div>
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-1" style={{ fontSize: '15px', fontWeight: '600', color: '#2d138f' }}>{data.title}</h5>
                <p className="mb-0" style={{ color: '#5f5cf1', fontSize: '13px', fontWeight: '500' }}>{data.server}</p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz14 fw400" style={{ color: '#5e6d82' }}>{data.application}+ Applied</span>
        </td>
        <td className="vam">
          <span style={{ fontSize: '14px', color: '#5e6d82' }}>{data.created}</span>
          <br />
          <span style={{ fontSize: '14px', color: '#5e6d82' }}>{data.expired}</span>
        </td>
        <td className="vam">
          <span className="badge" style={{ backgroundColor: '#eef4ff', color: '#3178ff', padding: '8px 15px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>Active</span>
        </td>
        <td>
          <div className="d-flex align-items-center" style={{ gap: '12px' }}>
            <button
              className="btn-action"
              id="edit"
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
              style={{ backgroundColor: '#fef1f1', border: 'none', borderRadius: '10px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Tooltip anchorSelect="#edit" className="ui-tooltip">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" style={{ color: '#1a7a5c', fontSize: '18px' }} />
            </button>
            <button
              className="btn-action"
              id="delete"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              style={{ backgroundColor: '#fef1f1', border: 'none', borderRadius: '10px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Tooltip anchorSelect="#delete" className="ui-tooltip">
                Delete
              </Tooltip>
              <span className="flaticon-delete" style={{ color: '#1a7a5c', fontSize: '18px' }} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
