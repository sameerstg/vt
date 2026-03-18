"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import {
  adminModerationControls,
  adminUsers,
  adminVerificationRequests,
} from "@/data/dashboardAdmin";
import { getAdminUserSummary } from "@/data/adminUserSummary";

const userRoleTabs = ["All Users", "Clients", "Contractors", "Workers"];
const activityStatusTabs = ["Active", "Non Active"];
const TABLE_PAGE_SIZE = 4;

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

const getPaginatedData = (items = [], page = 1, pageSize = TABLE_PAGE_SIZE) => {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    totalItems,
    totalPages,
    currentPage,
    pageSize,
  };
};

export default function UserManagementInfo({ initialUserRole = "All Users" }) {
  const isRoleLocked = initialUserRole !== "All Users";
  const isClientsView = initialUserRole === "Clients";
  const normalizedInitialRole = initialUserRole.endsWith("s")
    ? initialUserRole.slice(0, -1)
    : initialUserRole;
  const activeUserHeading = isRoleLocked ? `All ${initialUserRole}` : "User List";
  const activeUserCaption = isRoleLocked
    ? `Browse all ${initialUserRole.toLowerCase()} and review their account activity.`
    : "Browse all users, roles, and account activity.";
  const userManagementTabs = [
    isRoleLocked ? initialUserRole : "All Users",
    "Verification Requests",
    "Suspend / Ban Controls",
  ];
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedUserRole, setSelectedUserRole] = useState(initialUserRole);
  const [selectedActivityStatus, setSelectedActivityStatus] = useState("Active");
  const [verificationRequests, setVerificationRequests] = useState(adminVerificationRequests);
  const [tablePages, setTablePages] = useState({
    users: 1,
    verification: 1,
    moderation: 1,
    documents: 1,
  });
  const [selectedReviewRequestId, setSelectedReviewRequestId] = useState(
    adminVerificationRequests[0]?.id || ""
  );
  const [selectedDocumentId, setSelectedDocumentId] = useState(
    adminVerificationRequests[0]?.documents?.[0]?.id || ""
  );
  const [actionMessage, setActionMessage] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  const filteredUsersByRole = useMemo(() => {
    if (selectedUserRole === "All Users") return usersWithLiveVerification;

    const normalizedSelectedRole = selectedUserRole.endsWith("s")
      ? selectedUserRole.slice(0, -1)
      : selectedUserRole;

    return usersWithLiveVerification.filter((user) => user.role === normalizedSelectedRole);
  }, [selectedUserRole, usersWithLiveVerification]);

  const filteredUserDirectory = useMemo(() => {
    if (selectedActivityStatus === "Active") {
      return filteredUsersByRole.filter((user) =>
        user.accountStatus.toLowerCase().includes("active")
      );
    }

    return filteredUsersByRole.filter(
      (user) => !user.accountStatus.toLowerCase().includes("active")
    );
  }, [filteredUsersByRole, selectedActivityStatus]);

  const filteredVerificationRequests = useMemo(() => {
    if (!isRoleLocked) return verificationRequests;
    return verificationRequests.filter((request) => request.userRole === normalizedInitialRole);
  }, [isRoleLocked, normalizedInitialRole, verificationRequests]);

  const filteredModerationControls = useMemo(() => {
    if (!isRoleLocked) return adminModerationControls;
    return adminModerationControls.filter((item) => item.role === normalizedInitialRole);
  }, [isRoleLocked, normalizedInitialRole]);

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
      totalUsers: usersWithLiveVerification.length + userSummary.admins,
      clients: usersWithLiveVerification.filter((user) => user.role === "Client").length,
      workers: usersWithLiveVerification.filter((user) => user.role === "Worker").length,
      contractors: usersWithLiveVerification.filter((user) => user.role === "Contractor").length,
      admins: userSummary.admins,
      pendingKyc,
      verifiedUsers,
      flaggedUsers,
      docsPendingReview,
    };
  }, [verificationRequests, usersWithLiveVerification]);

  const paginatedUsers = useMemo(
    () => getPaginatedData(filteredUserDirectory, tablePages.users),
    [filteredUserDirectory, tablePages.users]
  );

  const paginatedVerificationRequests = useMemo(
    () => getPaginatedData(filteredVerificationRequests, tablePages.verification),
    [filteredVerificationRequests, tablePages.verification]
  );

  const paginatedModerationControls = useMemo(
    () => getPaginatedData(filteredModerationControls, tablePages.moderation),
    [filteredModerationControls, tablePages.moderation]
  );

  const paginatedSelectedDocuments = useMemo(
    () => getPaginatedData(selectedReviewRequest?.documents || [], tablePages.documents),
    [selectedReviewRequest, tablePages.documents]
  );

  const applyAction = (action, target) => {
    setActionMessage(`${action} applied for ${target}.`);
  };

  const openUserProfile = (profile) => {
    setSelectedProfile(profile);
    setIsProfileModalOpen(true);
    setActionMessage(`Profile opened for ${profile.name}.`);
  };

  useEffect(() => {
    setSelectedUserRole(initialUserRole);
    setSelectedActivityStatus("Active");
    handleTablePageChange("users", 1);
    handleTablePageChange("verification", 1);
    handleTablePageChange("moderation", 1);
  }, [initialUserRole]);

  useEffect(() => {
    if (!filteredVerificationRequests.length) {
      setSelectedReviewRequestId("");
      setSelectedDocumentId("");
      return;
    }

    const isSelectedVisible = filteredVerificationRequests.some(
      (request) => request.id === selectedReviewRequestId
    );

    if (!isSelectedVisible) {
      setSelectedReviewRequestId(filteredVerificationRequests[0].id);
      setSelectedDocumentId(filteredVerificationRequests[0]?.documents?.[0]?.id || "");
    }
  }, [filteredVerificationRequests, selectedReviewRequestId]);

  const handleTablePageChange = (tableKey, page) => {
    setTablePages((prev) => ({
      ...prev,
      [tableKey]: page,
    }));
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
    handleTablePageChange("documents", 1);
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

      {!isRoleLocked && (
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
      )}

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative admin-module-card">
            <div className="navtab-style1">
              <nav>
                <div className="admin-user-tabs-shell mb30">
                  <div className="admin-user-tabs-bar">
                    <div className="nav nav-tabs admin-user-tabs">
                      {userManagementTabs.map((item, index) => (
                        <button
                          key={item}
                          type="button"
                          className={`nav-link fw500 ps-0 ${selectedTab === index ? "active" : ""}`}
                          onClick={() => setSelectedTab(index)}
                        >
                          <span className="tab-label">{item}</span>
                        </button>
                      ))}
                    </div>
                    {selectedTab === 0 && (
                      <div className="admin-status-tabs">
                        {activityStatusTabs.map((status) => (
                          <button
                            key={status}
                            type="button"
                            className={`user-role-tab compact ${selectedActivityStatus === status ? "active" : ""}`}
                            onClick={() => {
                              setSelectedActivityStatus(status);
                              handleTablePageChange("users", 1);
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </nav>

              {selectedTab === 0 && (
                <div>
                  <div className="admin-section-heading bdrb1 pb15 mb20">
                    <div>
                      <span className="section-eyebrow">Directory</span>
                      <h5 className="list-title mb-0">{activeUserHeading}</h5>
                    </div>
                    <p className="section-caption mb-0">{activeUserCaption}</p>
                  </div>
                  {!isRoleLocked && (
                    <div className="user-role-tabs-wrap mb20">
                      {userRoleTabs.map((role) => (
                        <button
                          key={role}
                          type="button"
                          className={`user-role-tab ${selectedUserRole === role ? "active" : ""}`}
                          onClick={() => {
                            setSelectedUserRole(role);
                            handleTablePageChange("users", 1);
                          }}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <thead className="t-head">
                        <tr>
                          <th scope="col">User</th>
                          {!isRoleLocked && <th scope="col">Role</th>}
                          <th scope="col">Account</th>
                          <th scope="col">Verification</th>
                          <th scope="col">Last Login</th>
                          <th scope="col">Profile Access</th>
                        </tr>
                      </thead>
                      <tbody className="t-body">
                        {paginatedUsers.items.map((item) => (
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
                            {!isRoleLocked && (
                              <td className="vam">
                                <span className="fz14 fw500">{item.role}</span>
                              </td>
                            )}
                            <td className="vam">
                              <span className={`pending-style ${getAccountStatusClass(item.accountStatus)}`}>
                                {item.accountStatus}
                              </span>
                            </td>
                            <td className="vam">
                              <span className={`pending-style ${getVerificationStatusClass(item.liveVerificationStatus)}`}>
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
                                onClick={() => openUserProfile(item)}
                              >
                                Open Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt30">
                    <Pagination1
                      currentPage={paginatedUsers.currentPage}
                      totalPages={paginatedUsers.totalPages}
                      totalItems={paginatedUsers.totalItems}
                      pageSize={paginatedUsers.pageSize}
                      onPageChange={(page) => handleTablePageChange("users", page)}
                      countLabel="users"
                    />
                  </div>
                </div>
              )}

              {selectedTab === 1 && (
                <div>
                  <div className="admin-section-heading bdrb1 pb15 mb20">
                    <div>
                      <span className="section-eyebrow">Compliance</span>
                      <h5 className="list-title mb-0">ID Verification Review</h5>
                    </div>
                    <p className="section-caption mb-0">Review submitted KYC documents and pending requests.</p>
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
                        {paginatedVerificationRequests.items.map((item) => (
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
                              <span className={`pending-style ${getVerificationStatusClass(item.reviewStatus)}`}>
                                {item.reviewStatus}
                              </span>
                            </td>
                            <td className="vam">
                              <div className="d-flex flex-wrap gap-2">
                                {!isClientsView && (
                                  <button
                                    type="button"
                                    className="ud-btn btn-thm-border action-btn review-btn"
                                    onClick={() => openRequestDocuments(item.id)}
                                  >
                                    Review Docs
                                  </button>
                                )}
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
                  <div className="mt30">
                    <Pagination1
                      currentPage={paginatedVerificationRequests.currentPage}
                      totalPages={paginatedVerificationRequests.totalPages}
                      totalItems={paginatedVerificationRequests.totalItems}
                      pageSize={paginatedVerificationRequests.pageSize}
                      onPageChange={(page) => handleTablePageChange("verification", page)}
                      countLabel="verification requests"
                    />
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
                        <span className={`pending-style ${getVerificationStatusClass(selectedReviewRequest.reviewStatus)}`}>
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
                            {paginatedSelectedDocuments.items.map((doc) => (
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
                                      onClick={() => handleDocumentDecision(selectedReviewRequest.id, doc.id, "approve")}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      type="button"
                                      className="ud-btn btn-thm-border action-btn danger-btn"
                                      onClick={() => handleDocumentDecision(selectedReviewRequest.id, doc.id, "reject")}
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
                      <div className="mt30">
                        <Pagination1
                          currentPage={paginatedSelectedDocuments.currentPage}
                          totalPages={paginatedSelectedDocuments.totalPages}
                          totalItems={paginatedSelectedDocuments.totalItems}
                          pageSize={paginatedSelectedDocuments.pageSize}
                          onPageChange={(page) => handleTablePageChange("documents", page)}
                          countLabel="documents"
                        />
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
              )}

              {selectedTab === 2 && (
                <div>
                  <div className="admin-section-heading bdrb1 pb15 mb20">
                    <div>
                      <span className="section-eyebrow">Moderation</span>
                      <h5 className="list-title mb-0">Suspend / Ban Controls</h5>
                    </div>
                    <p className="section-caption mb-0">Manage restricted accounts, strikes, and actions.</p>
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
                        {paginatedModerationControls.items.map((item) => (
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
                  <div className="mt30">
                    <Pagination1
                      currentPage={paginatedModerationControls.currentPage}
                      totalPages={paginatedModerationControls.totalPages}
                      totalItems={paginatedModerationControls.totalItems}
                      pageSize={paginatedModerationControls.pageSize}
                      onPageChange={(page) => handleTablePageChange("moderation", page)}
                      countLabel="moderation records"
                    />
                  </div>
                </div>
              )}

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
                  {selectedReviewRequest.userName} ({selectedReviewRequest.userRole}) - {" "}
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

      {isProfileModalOpen && selectedProfile && (
        <div
          className="profile-preview-modal-backdrop"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div
            className="profile-preview-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="profile-preview-modal-head">
              <div className="profile-preview-user">
                <div className="profile-preview-avatar">
                  <Image
                    src={selectedProfile.image}
                    width={88}
                    height={88}
                    alt={selectedProfile.name}
                    className="profile-preview-avatar-image"
                  />
                </div>
                <div>
                  <span className="profile-preview-role">{selectedProfile.role}</span>
                  <h4 className="mb-1">{selectedProfile.name}</h4>
                  <p className="text mb-0">{selectedProfile.email}</p>
                </div>
              </div>
              <button
                type="button"
                className="doc-preview-modal-close"
                onClick={() => setIsProfileModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="profile-preview-metrics">
              <div className="profile-preview-metric">
                <span>{selectedProfile.primaryMetricLabel}</span>
                <strong>{selectedProfile.primaryMetricValue}</strong>
              </div>
              <div className="profile-preview-metric">
                <span>{selectedProfile.secondaryMetricLabel}</span>
                <strong>{selectedProfile.secondaryMetricValue}</strong>
              </div>
              <div className="profile-preview-metric">
                <span>Joined</span>
                <strong>{selectedProfile.joinedOn}</strong>
              </div>
              <div className="profile-preview-metric">
                <span>Location</span>
                <strong>{selectedProfile.location}</strong>
              </div>
            </div>

            <div className="profile-preview-grid">
              <div className="profile-preview-panel">
                <h6>Contact Details</h6>
                <div className="profile-detail-list">
                  <div>
                    <span>Phone</span>
                    <strong>{selectedProfile.phone}</strong>
                  </div>
                  <div>
                    <span>Company</span>
                    <strong>{selectedProfile.company}</strong>
                  </div>
                  <div>
                    <span>Account</span>
                    <strong>{selectedProfile.accountStatus}</strong>
                  </div>
                  <div>
                    <span>Verification</span>
                    <strong>{selectedProfile.liveVerificationStatus}</strong>
                  </div>
                </div>
              </div>

              <div className="profile-preview-panel">
                <h6>About</h6>
                <p className="text mb-0">{selectedProfile.bio}</p>
                <div className="profile-skills-wrap">
                  {(selectedProfile.skills || []).map((skill) => (
                    <span key={skill} className="profile-skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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

        .admin-user-tabs-shell {
          padding: 8px 0 0;
          border-top: 1px solid #e6ebf2;
          background: transparent;
        }

        .admin-user-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .admin-user-tabs {
          gap: 10px;
          border-bottom: 0;
          margin-bottom: 0;
          padding: 10px 0 0;
        }

        .admin-status-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 10px;
          margin-left: auto;
          padding-top: 10px;
        }

        .admin-user-tabs .nav-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 10px 20px;
          border: 1px solid #d6dfef;
          border-radius: 4px;
          color: #243b64;
          background: #ffffff;
          margin-bottom: 0;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease;
          box-shadow: none;
        }

        .admin-user-tabs .nav-link:hover {
          border-color: #becce4;
          color: #163c7a;
          background: #fbfcff;
        }

        .admin-user-tabs .tab-label {
          position: relative;
          z-index: 1;
        }

        .admin-user-tabs .nav-link.active {
          color: #5b41ff;
          border-color: #5b41ff;
          background: #ffffff;
          box-shadow: none;
        }

        .admin-user-tabs .nav-link.active .tab-label::after {
          display: none;
        }

        .admin-section-heading {
          display: block;
        }

        .section-eyebrow {
          display: inline-block;
          margin-bottom: 10px;
          color: #3256a8;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .admin-section-heading .list-title {
          color: #182230;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .section-caption {
          max-width: 560px;
          margin-top: 8px;
          color: #667085;
          font-size: 14px;
          line-height: 1.6;
          text-align: left;
        }

        .user-role-tabs-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .user-role-tab {
          min-height: 40px;
          padding: 10px 18px;
          border: 1px solid #d6dfef;
          border-radius: 4px;
          background: #ffffff;
          color: #243b64;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .user-role-tab.compact {
          min-width: 132px;
          width: auto;
        }

        .user-role-tab:hover {
          border-color: #becce4;
          color: #163c7a;
          background: #fbfcff;
        }

        .user-role-tab.active {
          color: #5b41ff;
          border-color: #5b41ff;
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

        .profile-preview-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.58);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2100;
          padding: 20px;
        }

        .profile-preview-modal-card {
          width: min(920px, 100%);
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #e4eaf4;
          box-shadow: 0 28px 60px rgba(15, 23, 42, 0.2);
          padding: 24px;
          max-height: calc(100vh - 40px);
          overflow: auto;
        }

        .profile-preview-modal-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }

        .profile-preview-user {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-preview-avatar {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #eef2ff;
          flex-shrink: 0;
        }

        .profile-preview-avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-preview-role {
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          border-radius: 999px;
          background: #f4f1ff;
          color: #5b41ff;
          padding: 0 12px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 8px;
        }

        .profile-preview-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .profile-preview-metric,
        .profile-preview-panel {
          border: 1px solid #e8edf6;
          border-radius: 14px;
          background: #fbfcff;
          padding: 16px;
        }

        .profile-preview-metric span,
        .profile-detail-list span {
          display: block;
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 6px;
        }

        .profile-preview-metric strong,
        .profile-detail-list strong {
          color: #1f2937;
          font-size: 15px;
          font-weight: 700;
        }

        .profile-preview-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.3fr);
          gap: 16px;
        }

        .profile-preview-panel h6 {
          margin-bottom: 14px;
        }

        .profile-detail-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .profile-skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 14px;
        }

        .profile-skill-chip {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          border-radius: 999px;
          background: #eef2ff;
          color: #334155;
          padding: 0 12px;
          font-size: 13px;
          font-weight: 600;
        }

        @media (max-width: 991px) {
          .doc-preview-image {
            height: 240px;
          }

          .doc-preview-modal-image {
            height: 300px;
          }

          .profile-preview-metrics,
          .profile-preview-grid,
          .profile-detail-list {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 575px) {
          .admin-user-tabs-shell {
            padding-top: 8px;
          }

          .admin-user-tabs-bar {
            align-items: stretch;
          }

          .admin-user-tabs {
            gap: 8px;
          }

          .admin-status-tabs {
            width: 100%;
            justify-content: flex-start;
            margin-left: 0;
            padding-top: 0;
          }

          .admin-user-tabs .nav-link {
            min-height: 40px;
            padding: 10px 14px;
            font-size: 14px;
          }

          .user-role-tab {
            width: 100%;
          }

          .user-role-tab.compact {
            min-width: 0;
          }

          .admin-section-heading .list-title {
            font-size: 23px;
          }

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

          .profile-preview-modal-card {
            padding: 16px;
          }

          .profile-preview-modal-head,
          .profile-preview-user,
          .profile-preview-metrics,
          .profile-preview-grid,
          .profile-detail-list {
            grid-template-columns: 1fr;
            flex-direction: column;
          }

          .profile-preview-user {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

