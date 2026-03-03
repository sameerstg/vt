"use client";
import { Tooltip } from "react-tooltip";

export default function ManageProjectCard() {
  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details">
                <h5 className="title mb-1" style={{ fontSize: '15px', fontWeight: '600', color: '#2d138f' }}>Food Delviery Mobile App</h5>
                <div className="d-flex align-items-center gap-3">
                  <p className="mb-0" style={{ color: '#5e6d82', fontSize: '13px' }}>
                    <i className="flaticon-place fz14 vam me-1" />{" "}
                    London, UK
                  </p>
                  <p className="mb-0" style={{ color: '#5e6d82', fontSize: '13px' }}>
                    <i className="flaticon-30-days fz14 vam me-1" />{" "}
                    2 hours ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span style={{ color: '#5f5cf1', fontSize: '14px', fontWeight: '500' }}>Web & App Design</span>
        </td>
        <td className="vam">
          <span style={{ color: '#5e6d82', fontSize: '14px' }}>$500.00 / Fixed</span>
        </td>
        <td className="vam">
          <div className="d-flex align-items-center" style={{ gap: '12px' }}>
            <button
              className="btn-action"
              id="edit-project"
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
              style={{ backgroundColor: '#fef1f1', border: 'none', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Tooltip anchorSelect="#edit-project" className="ui-tooltip">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" style={{ color: '#1a7a5c', fontSize: '16px' }} />
            </button>
            <button
              className="btn-action"
              id="delete-project"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              style={{ backgroundColor: '#fef1f1', border: 'none', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <Tooltip anchorSelect="#delete-project" className="ui-tooltip">
                Delete
              </Tooltip>
              <span className="flaticon-delete" style={{ color: '#1a7a5c', fontSize: '16px' }} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
