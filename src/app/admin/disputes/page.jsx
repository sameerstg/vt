"use client";

import { useState } from "react";
import DisputeManager from "@/modules/admin/components/DisputeManager";
import useAdminStore from "@/modules/admin/store/adminStore";

export default function AdminDisputesPage() {
  const { disputes, setDisputes } = useAdminStore();
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
            <h2>Dispute Management</h2>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="alert alert-success mb20">Action completed successfully!</div>
      )}
      <DisputeManager
        disputes={disputes}
        setDisputes={setDisputes}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
