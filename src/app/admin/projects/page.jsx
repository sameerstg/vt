"use client";

import ProjectManager from "@/modules/admin/components/ProjectManager";

export default function AdminProjectsPage() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Projects</h2>
          </div>
        </div>
      </div>
      <div className="ps-widget bgc-white bdrs4 p30 mb30">
        <ProjectManager />
      </div>
    </div>
  );
}
