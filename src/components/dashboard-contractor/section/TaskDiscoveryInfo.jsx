import DashboardNavigation from "../header/DashboardNavigation";
import TaskDiscoveryPanel from "@/components/dashboard-shared/TaskDiscoveryPanel";

export default function TaskDiscoveryInfo() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>Task Discovery Page</h2>
          </div>
        </div>
      </div>

      <TaskDiscoveryPanel
        preferredLocation="United States"
        proposalPath="/contractor-dashboard/manage-projects"
      />
    </div>
  );
}
