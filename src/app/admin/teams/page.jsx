"use client";

import TeamManager from "@/modules/admin/components/TeamManager";
import useAdminStore from "@/modules/admin/store/adminStore";

export default function AdminTeamsPage() {
  const { teams } = useAdminStore();

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Teams</h2>
          </div>
        </div>
      </div>
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <TeamManager teams={teams} />
      </div>
    </div>
  );
}
