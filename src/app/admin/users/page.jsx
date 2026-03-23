"use client";

import { useState } from "react";
import UserManager from "@/modules/admin/components/UserManager";
import useAdminStore from "@/modules/admin/store/adminStore";

export default function AdminUsersPage() {
  const { users, setUsers } = useAdminStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>User Management</h2>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="alert alert-success mb20">Action completed successfully!</div>
      )}
      <UserManager
        users={users}
        setUsers={setUsers}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
