"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  adminModerationControls,
  adminProfileAccess,
  adminUsers,
  adminVerificationRequests,
} from "@/data/dashboardAdmin";
import { getAdminUserSummary } from "@/data/adminUserSummary";

const getAccountStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("active")) return "style6";
  if (normalized.includes("suspended")) return "style5";
  return "style1";
};

const getVerificationStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("verified")) return "style4";
  if (normalized.includes("pending")) return "style5";
  return "style1";
};

const getDocumentStatusClass = (status = "") => {
  const normalized = status.toLowerCase();
  if (normalized.includes("matched")) return "style4";
  if (normalized.includes("needs")) return "style5";
  if (normalized.includes("rejected") || normalized.includes("blurred")) return "style1";
  return "style6";
};

const deriveRequestStatusFromDocuments = (documents = []) => {
  if (!documents.length) return "Pending";

  const statuses = documents.map((doc) => doc.status.toLowerCase());
  const hasRejected = statuses.some(
    (status) => status.includes("rejected") || status.includes("blurred")
  );
  if (hasRejected) return "Rejected";

  const allMatched = statuses.every((status) => status.includes("matched"));
  if (allMatched) return "Verified";

  return "Pending";
};

export default function UserManagementInfo() {
  const [verificationRequests, setVerificationRequests] = useState(adminVerificationRequests);
  const [selectedReviewRequestId, setSelectedReviewRequestId] = useState(
    adminVerificationRequests[0]?.id || ""
  );
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    adminVerificationRequests[0]?.documents?.[0]?.id || ""
  );
  const [actionMessage, setActionMessage] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const selectedReviewRequest = useMemo(
    () => verificationRequests.find((item) => item.id === selectedReviewRequestId) || null,
    [verificationRequests, selectedReviewRequestId]
  );

  const selectedDocument = useMemo(() => {
    if (!selectedReviewRequest?.documents?.length) return null;
    return (
      selectedReviewRequest.documents.find((item) => item.id === selectedDocumentId) ||
      selectedReviewRequest.documents[0]
    );
  }, [selectedReviewRequest, selectedDocumentId]);

  const usersWithLiveVerification = useMemo(() => {
    const requestStatusByUser = verificationRequests.reduce((accumulator, request) => {
      accumulator[request.userName] = request.reviewStatus;
      return accumulator;
    }, {});

    return adminUsers.map((user) => ({
      ...user,
      liveVerificationStatus: requestStatusByUser[user.name] || user.verificationStatus,
    }));
  }, [verificationRequests]);

  const dashboardStats = useMemo(() => {
    const userSummary = getAdminUserSummary();
    const pendingKyc = verificationRequests.filter(
      (request) => request.reviewStatus === "Pending"
    ).length;
    const verifiedUsers = usersWithLiveVerification.filter(
      (user) => user.liveVerificationStatus === "Verified"
    ).length;
    const flaggedUsers = adminModerationControls.filter((item) => {
      const normalized = item.currentAction.toLowerCase();
      return normalized.includes("suspended") || normalized.includes("banned");
    }).length;
    const docsPendingReview = verificationRequests.reduce((count, request) => {
      const pendingDocs = (request.documents || []).filter((doc) =>
        doc.status.toLowerCase().includes("needs")
      ).length;
      return count + pendingDocs;
    }, 0);

    return {
      totalUsers: userSummary.totalUsers,
      clients: userSummary.clients,
      workers: userSummary.workers,
      contractors: userSummary.contractors,
      admins: userSummary.admins,
      pendingKyc,
      verifiedUsers,
      flaggedUsers,
      docsPendingReview,
    };
  }, [verificationRequests, usersWithLiveVerification]);

  const applyAction = (action, target) => {
    setActionMessage(`${action} applied for ${target}.`);
  };

  const updateRequest = (requestId, updater, successMessage) => {
    setVerificationRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;
        return updater(request);
      })
    );
    setSelectedReviewRequestId(requestId);
    if (successMessage) {
      setActionMessage(successMessage);
    }
  };

  const openRequestDocuments = (requestId) => {
    const request = verificationRequests.find((item) => item.id === requestId);
    setSelectedReviewRequestId(requestId);
    setSelectedDocumentId(request?.documents?.[0]?.id || "");
    setIsPreviewModalOpen(true);
    setActionMessage(`Opened uploaded documents for ${request?.userName || requestId}.`);
  };

  const handleKycDecision = (request, decision) => {
    const isApprove = decision === "approve";
    const nextRequestStatus = isApprove ? "Verified" : "Rejected";
    const nextDocStatus = isApprove ? "Matched" : "Rejected";

    updateRequest(
      request.id,
      (current) => ({
        ...current,
        reviewStatus: nextRequestStatus,
        documents: (current.documents || []).map((doc) => ({
          ...doc,
          status: nextDocStatus,
        })),
      }),
      `KYC ${isApprove ? "approved" : "rejected"} for ${request.userName}.`
    );

    setSelectedDocumentId(request.documents?.[0]?.id || "");
  };

  const handleDocumentDecision = (requestId, documentId, decision) => {
    const isApprove = decision === "approve";
    const nextDocStatus = isApprove ? "Matched" : "Rejected";

    updateRequest(
      requestId,
      (current) => {
        const nextDocuments = (current.documents || []).map((doc) =>
          doc.id === documentId ? { ...doc, status: nextDocStatus } : doc
        );

        return {
          ...current,
          documents: nextDocuments,
          reviewStatus: deriveRequestStatusFromDocuments(nextDocuments),
        };
      },
      `Document ${isApprove ? "approved" : "rejected"} for ${requestId}.`
    );

    setSelectedDocumentId(documentId);
  };

  return (
    <div className="dashboard__content hover-bgc-color admin-user-management-page">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>User Management</h2>
            <p className="text">
              Verify uploaded worker/contractor documents and manage user risk controls.
            </p>
          </div>
        </div>
      </div>

      {actionMessage && (
        <div className="row">
          <div className="col-xl-12">
            <div className="alert alert-success mb30" role="alert">
              {actionMessage}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-sm-6 col-xl-3">
          <div className="kpi-card">
            <p>Total Users</p>
            <h4>{dashboardStats.totalUsers}</h4>
            <span className="kpi-card-meta">
              {dashboardStats.admins} admin account{dashboardStats.admins === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="kpi-card">
            <p>Clients</p>
            <h4>{dashboardStats.clients}</h4>
            <span className="kpi-card-meta">
              {dashboardStats.pendingKyc} pending KYC request{dashboardStats.pendingKyc === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="kpi-card">
            <p>Workers</p>
            <h4>{dashboardStats.workers}</h4>
            <span className="kpi-card-meta">
              {dashboardStats.verifiedUsers} verified profile{dashboardStats.verifiedUsers === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="col-sm-6 col-xl-3">
          <div className="kpi-card">
            <p>Contractors</p>
            <h4>{dashboardStats.contractors}</h4>
            <span className="kpi-card-meta">
              {dashboardStats.flaggedUsers} flagged, {dashboardStats.docsPendingReview} docs pending
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative admin-module-card">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">User List</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Role</th>
                    <th scope="col">Account</th>
                    <th scope="col">Verification</th>
                    <th scope="col">Last Login</th>
                    <th scope="col">Profile Access</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {usersWithLiveVerification.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">
                        <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
                          <div className="d-lg-flex align-items-lg-center">
                            <div className="thumb w60 position-relative rounded-circle mb15-md">
                              <Image
                                height={50}
                                width={50}
                                className="rounded-circle mx-auto"
                                src={item.image}
                                alt={item.name}
                              />
                            </div>
                            <div className="details ml15 ml0-md mb15-md">
                              <h6 className="mb-1">{item.name}</h6>
                              <p className="text mb-0">{item.email}</p>
                            </div>
                          </div>
                        </div>
                      </th>
                      <td className="vam">
                        <span className="fz14 fw500">{item.role}</span>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getAccountStatusClass(item.accountStatus)}`}>
                          {item.accountStatus}
                        </span>
                      </td>
                      <td className="vam">
                        <span
                          className={`pending-style ${getVerificationStatusClass(
                            item.liveVerificationStatus
                          )}`}
                        >
                          {item.liveVerificationStatus}
                        </span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.lastLogin}</span>
                      </td>
                      <td className="vam">
                        <button
                          type="button"
                          className="ud-btn btn-thm-border action-btn"
                          onClick={() => applyAction("Profile opened", item.name)}
                        >
                          Open Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative admin-module-card">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">ID Verification Review</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Request ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Document</th>
                    <th scope="col">Submitted On</th>
                    <th scope="col">Status</th>
                    <th scope="col">Review</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {verificationRequests.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedReviewRequestId === item.id ? "request-row-active" : ""}
                    >
                      <td className="vam">
                        <span className="fz14 fw500">{item.id}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500">{item.userName}</span>
                        <p className="text mb-0">{item.userRole}</p>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.documentType}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.submittedOn}</span>
                      </td>
                      <td className="vam">
                        <span
                          className={`pending-style ${getVerificationStatusClass(item.reviewStatus)}`}
                        >
                          {item.reviewStatus}
                        </span>
                      </td>
                      <td className="vam">
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn review-btn"
                            onClick={() => openRequestDocuments(item.id)}
                          >
                            Review Docs
                          </button>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn"
                            onClick={() => handleKycDecision(item, "approve")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn danger-btn"
                            onClick={() => handleKycDecision(item, "reject")}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedReviewRequest && (
              <div className="doc-review-wrap bdrt1 pt20 mt20">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb15">
                  <div>
                    <h6 className="mb-1">Document Review</h6>
                    <p className="text mb-0">
                      {selectedReviewRequest.id} - {selectedReviewRequest.userName} (
                      {selectedReviewRequest.userRole})
                    </p>
                  </div>
                  <span
                    className={`pending-style ${getVerificationStatusClass(
                      selectedReviewRequest.reviewStatus
                    )}`}
                  >
                    {selectedReviewRequest.reviewStatus}
                  </span>
                </div>

                <div className="packages_table table-responsive mb20">
                  <table className="table-style3 table at-savesearch mb-0">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Document File</th>
                        <th scope="col">Type</th>
                        <th scope="col">Uploaded On</th>
                        <th scope="col">State</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {selectedReviewRequest.documents?.map((doc) => (
                        <tr
                          key={doc.id}
                          className={selectedDocument?.id === doc.id ? "doc-row-active" : ""}
                        >
                          <td className="vam">
                            <span className="fz14 fw500 doc-file-name">{doc.fileName}</span>
                            <p className="text mb-0 doc-file-id">{doc.id}</p>
                          </td>
                          <td className="vam">
                            <span className="fz14 fw400">{doc.fileType}</span>
                          </td>
                          <td className="vam">
                            <span className="fz14 fw400">{doc.uploadedOn}</span>
                          </td>
                          <td className="vam">
                            <span className={`pending-style ${getDocumentStatusClass(doc.status)}`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="vam">
                            <div className="d-flex flex-wrap gap-2">
                              <button
                                type="button"
                                className="ud-btn btn-thm-border action-btn"
                                onClick={() => {
                                  setSelectedDocumentId(doc.id);
                                  setIsPreviewModalOpen(true);
                                  setActionMessage(`Previewing ${doc.fileName}.`);
                                }}
                              >
                                Review
                              </button>
                              <button
                                type="button"
                                className="ud-btn btn-thm-border action-btn"
                                onClick={() =>
                                  handleDocumentDecision(selectedReviewRequest.id, doc.id, "approve")
                                }
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                className="ud-btn btn-thm-border action-btn danger-btn"
                                onClick={() =>
                                  handleDocumentDecision(selectedReviewRequest.id, doc.id, "reject")
                                }
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedDocument && (
                  <div className="doc-preview-shell">
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb15">
                      <h6 className="mb-0">Live Document Preview</h6>
                      <span className={`pending-style ${getDocumentStatusClass(selectedDocument.status)}`}>
                        {selectedDocument.status}
                      </span>
                    </div>
                    <div className="row align-items-stretch g-3">
                      <div className="col-lg-7">
                        <div className="doc-preview-media">
                          <Image
                            src={selectedDocument.previewImage || "/images/listings/g-1.jpg"}
                            width={980}
                            height={580}
                            className="doc-preview-image"
                            alt={selectedDocument.fileName}
                          />
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="doc-meta-grid">
                          <div className="doc-meta-item">
                            <p>File Name</p>
                            <h6>{selectedDocument.fileName}</h6>
                          </div>
                          <div className="doc-meta-item">
                            <p>Document ID</p>
                            <h6>{selectedDocument.id}</h6>
                          </div>
                          <div className="doc-meta-item">
                            <p>Type</p>
                            <h6>{selectedDocument.fileType}</h6>
                          </div>
                          <div className="doc-meta-item">
                            <p>Size</p>
                            <h6>{selectedDocument.fileSize || "N/A"}</h6>
                          </div>
                          <div className="doc-meta-item">
                            <p>Uploaded By</p>
                            <h6>{selectedDocument.uploadedBy || selectedReviewRequest.userName}</h6>
                          </div>
                          <div className="doc-meta-item">
                            <p>Uploaded On</p>
                            <h6>{selectedDocument.uploadedOn}</h6>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 mt15">
                          <a
                            href={selectedDocument.fileUrl || selectedDocument.previewImage}
                            target="_blank"
                            rel="noreferrer"
                            className="ud-btn btn-thm-border action-btn"
                          >
                            Open Full
                          </a>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn"
                            onClick={() =>
                              handleDocumentDecision(
                                selectedReviewRequest.id,
                                selectedDocument.id,
                                "approve"
                              )
                            }
                          >
                            Approve Doc
                          </button>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn danger-btn"
                            onClick={() =>
                              handleDocumentDecision(
                                selectedReviewRequest.id,
                                selectedDocument.id,
                                "reject"
                              )
                            }
                          >
                            Reject Doc
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative admin-module-card">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Suspend / Ban Controls</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Current State</th>
                    <th scope="col">Strikes</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Updated On</th>
                    <th scope="col">Controls</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminModerationControls.map((item) => (
                    <tr key={item.id}>
                      <td className="vam">
                        <span className="fz14 fw500">{item.userName}</span>
                        <p className="text mb-0">{item.role}</p>
                      </td>
                      <td className="vam">
                        <span className={`pending-style ${getAccountStatusClass(item.currentAction)}`}>
                          {item.currentAction}
                        </span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500">{item.strikeCount}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.reason}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.updatedOn}</span>
                      </td>
                      <td className="vam">
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn"
                            onClick={() => applyAction("User suspended", item.userName)}
                          >
                            Suspend
                          </button>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn danger-btn"
                            onClick={() => applyAction("User banned", item.userName)}
                          >
                            Ban
                          </button>
                          <button
                            type="button"
                            className="ud-btn btn-thm-border action-btn"
                            onClick={() => applyAction("User reinstated", item.userName)}
                          >
                            Reinstate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative admin-module-card">
            <div className="bdrb1 pb15 mb20">
              <h5 className="list-title mb-0">Profile Access</h5>
            </div>
            <div className="packages_table table-responsive">
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Profile ID</th>
                    <th scope="col">User</th>
                    <th scope="col">Access Level</th>
                    <th scope="col">Last Accessed</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {adminProfileAccess.map((item) => (
                    <tr key={item.id}>
                      <td className="vam">
                        <span className="fz14 fw500">{item.profileId}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw500">{item.userName}</span>
                        <p className="text mb-0">{item.role}</p>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.accessLevel}</span>
                      </td>
                      <td className="vam">
                        <span className="fz14 fw400">{item.lastAccessed}</span>
                      </td>
                      <td className="vam">
                        <button
                          type="button"
                          className="ud-btn btn-thm-border action-btn"
                          onClick={() => applyAction("Profile access granted", item.userName)}
                        >
                          Access
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isPreviewModalOpen && selectedDocument && selectedReviewRequest && (
        <div
          className="doc-preview-modal-backdrop"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div
            className="doc-preview-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="doc-preview-modal-head">
              <div>
                <h5 className="mb-1">Document Preview</h5>
                <p className="text mb-0">
                  {selectedReviewRequest.userName} ({selectedReviewRequest.userRole}) -{" "}
                  {selectedDocument.fileName}
                </p>
              </div>
              <button
                type="button"
                className="doc-preview-modal-close"
                onClick={() => setIsPreviewModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="doc-preview-modal-media">
              <Image
                src={selectedDocument.previewImage || "/images/dashboard-documents/cnic-front-demo.jpg"}
                width={1200}
                height={720}
                className="doc-preview-modal-image"
                alt={selectedDocument.fileName}
              />
            </div>

            <div className="doc-preview-modal-actions">
              <a
                href={selectedDocument.fileUrl || selectedDocument.previewImage}
                target="_blank"
                rel="noreferrer"
                className="ud-btn btn-thm-border action-btn"
              >
                Open Full
              </a>
              <button
                type="button"
                className="ud-btn btn-thm-border action-btn"
                onClick={() => {
                  handleDocumentDecision(selectedReviewRequest.id, selectedDocument.id, "approve");
                  setIsPreviewModalOpen(false);
                }}
              >
                Approve Doc
              </button>
              <button
                type="button"
                className="ud-btn btn-thm-border action-btn danger-btn"
                onClick={() => {
                  handleDocumentDecision(selectedReviewRequest.id, selectedDocument.id, "reject");
                  setIsPreviewModalOpen(false);
                }}
              >
                Reject Doc
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-user-management-page .admin-module-card {
          border: 1px solid #e9edf5;
          box-shadow: 0 14px 34px rgba(18, 29, 53, 0.06);
        }

        .kpi-card {
          background: #ffffff;
          border: 1px solid #e9edf5;
          box-shadow: 0 10px 28px rgba(20, 30, 50, 0.05);
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 20px;
        }

        .kpi-card p {
          margin-bottom: 6px;
          color: #5d6575;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .kpi-card h4 {
          margin-bottom: 0;
          color: #1e293b;
        }

        .kpi-card-meta {
          display: inline-block;
          margin-top: 6px;
          color: #7b8698;
          font-size: 13px;
          font-weight: 400;
        }

        .table-style3 .t-body tr {
          transition: background 0.2s ease;
        }

        .table-style3 .t-body tr:hover {
          background: #f7f9ff;
        }

        .request-row-active {
          background: #f6f4ff !important;
        }

        .doc-row-active {
          background: #eff5ff !important;
        }

        .action-btn {
          height: 38px;
          line-height: 36px;
          padding: 0 14px;
          min-width: 92px;
        }

        .review-btn {
          min-width: 116px;
        }

        .danger-btn {
          border-color: #de3f3f;
          color: #de3f3f;
        }

        .danger-btn:hover {
          background: #de3f3f;
          border-color: #de3f3f;
          color: #ffffff;
        }

        .doc-review-wrap {
          border-radius: 12px;
          border: 1px solid #edf0f6;
          background: #fbfcff;
          padding: 18px;
        }

        .doc-file-name {
          word-break: break-word;
        }

        .doc-file-id {
          font-size: 12px;
        }

        .doc-preview-shell {
          border: 1px solid #e6ebf5;
          border-radius: 12px;
          background: #ffffff;
          padding: 16px;
        }

        .doc-preview-media {
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #e5eaf4;
          background: #f5f8ff;
        }

        .doc-preview-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }

        .doc-meta-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .doc-meta-item {
          border: 1px solid #ebeff6;
          border-radius: 10px;
          background: #fbfcff;
          padding: 10px;
        }

        .doc-meta-item p {
          margin-bottom: 2px;
          color: #6b7280;
          font-size: 12px;
          font-weight: 500;
        }

        .doc-meta-item h6 {
          margin-bottom: 0;
          font-size: 14px;
          word-break: break-word;
        }

        .doc-preview-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .doc-preview-modal-card {
          width: min(980px, 100%);
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #e4eaf4;
          box-shadow: 0 24px 50px rgba(15, 23, 42, 0.22);
          padding: 18px;
          max-height: calc(100vh - 40px);
          overflow: auto;
        }

        .doc-preview-modal-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: flex-start;
          margin-bottom: 14px;
        }

        .doc-preview-modal-close {
          width: 34px;
          height: 34px;
          border: 1px solid #d8deea;
          background: #ffffff;
          border-radius: 8px;
          font-size: 24px;
          line-height: 1;
          color: #334155;
        }

        .doc-preview-modal-media {
          border: 1px solid #e5ebf5;
          border-radius: 10px;
          overflow: hidden;
          background: #f5f8ff;
          margin-bottom: 14px;
        }

        .doc-preview-modal-image {
          width: 100%;
          height: 420px;
          object-fit: cover;
          display: block;
        }

        .doc-preview-modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 991px) {
          .doc-preview-image {
            height: 240px;
          }

          .doc-preview-modal-image {
            height: 300px;
          }
        }

        @media (max-width: 575px) {
          .doc-meta-grid {
            grid-template-columns: 1fr;
          }

          .doc-preview-image {
            height: 200px;
          }

          .action-btn {
            min-width: 84px;
            padding: 0 10px;
          }

          .doc-preview-modal-card {
            padding: 14px;
          }

          .doc-preview-modal-image {
            height: 220px;
          }
        }
      `}</style>
    </div>
  );
}
