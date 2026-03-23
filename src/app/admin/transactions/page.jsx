"use client";

import { useState } from "react";
import FinancialOversight from "@/modules/admin/components/FinancialOversight";
import useAdminStore from "@/modules/admin/store/adminStore";

export default function AdminTransactionsPage() {
  const { transactions } = useAdminStore();
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
            <h2>Transactions</h2>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="alert alert-success mb20">Action completed successfully!</div>
      )}
      <FinancialOversight
        transactions={transactions}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
