"use client";

import { useState } from "react";

export default function UserManager({ users, onSuccess }) {
  const [activeUser, setActiveUser] = useState(null);
  const [actionType, setActionType] = useState(null); // 'suspend' or 'activate'

  const handleSuspend = (userId) => {
    setActionType("suspend");
    setActiveUser(users.find(u => u.id === userId));
  };

  const handleActivate = (userId) => {
    setActionType("activate");
    setActiveUser(users.find(u => u.id === userId));
  };

  const handleCancelAction = () => {
    setActiveUser(null);
    setActionType(null);
  };

  const handleSubmitAction = async () => {
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user status based on action
      const updatedUsers = users.map(user => {
        if (user.id === activeUser.id) {
          switch (actionType) {
            case "suspend":
              return { ...user, status: "suspended" };
            case "activate":
              return { ...user, status: "active" };
            default:
              return user;
          }
        }
        return user;
      });
      
      // In a real app, we'd update state here
      onSuccess();
      handleCancelAction();
    } catch (error) {
      console.error("Failed to submit user action:", error);
    }
  };

  return (
    <div className="bgc-white p30 bdrs12 default-box-shadow1">
      <h4 className="mb20">User Management</h4>

      {users.length === 0 ? (
        <p className="text-center">No users found</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={user.avatar || "/images/avatar-default.png"} 
                          alt={user.name} 
                          className="me-2 rounded-circle" 
                          width="30" 
                          height="30"
                        />
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.role === "admin" ? "danger" : 
                                              user.role === "contractor" ? "warning" : 
                                              user.role === "worker" ? "info" : "primary"}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === "active" ? "badge-success" : "badge-danger"}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        {user.status === "active" && (
                          <button
                            type="button"
                            className="ud-btn btn-sm btn-danger"
                            onClick={() => handleSuspend(user.id)}
                          >
                            Suspend
                          </button>
                        )}
                        {user.status === "suspended" && (
                          <button
                            type="button"
                            className="ud-btn btn-sm btn-success"
                            onClick={() => handleActivate(user.id)}
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Modal */}
          {activeUser && actionType && (
            <div className="modal-overlay"
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
              }}
            >
              <div
                style={{ 
                  maxWidth: "400px", 
                  width: "100%", 
                  maxHeight: "60vh", 
                  overflowY: "auto",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "30px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb20">
                  <h5>User Action Confirmation</h5>
                  <p className="text mb10">
                    <strong>User:</strong> {activeUser.name} ({activeUser.email})
                  </p>
                  <p className="text mb10">
                    <strong>Role:</strong> {activeUser.role.charAt(0).toUpperCase() + activeUser.role.slice(1)}
                  </p>
                </div>

                <div className="mb20">
                  <p className="text">
                    Are you sure you want to {actionType === "suspend" ? "suspend" : "activate"} this user?
                  </p>
                  <p className="text text-muted mb15">
                    {actionType === "suspend" 
                      ? "Suspending a user will prevent them from accessing the platform." 
                      : "Activating a user will restore their access to the platform."}
                  </p>
                </div>

                <div className="d-flex justify-content-end gap10">
                  <button
                    type="button"
                    className="ud-btn btn-sm btn-light"
                    onClick={handleCancelAction}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ud-btn btn-sm btn-thm"
                    onClick={handleSubmitAction}
                  >
                    {actionType === "suspend" ? "Suspend User" : "Activate User"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}