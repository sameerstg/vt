"use client";

import ReportsOverview from "@/modules/admin/components/ReportsOverview";

export default function AdminReportsPage() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Reports</h2>
          </div>
        </div>
      </div>
      <ReportsOverview />
    </div>
  );
}
