import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import WorkSubmissionPanel from "@/components/dashboard-shared/WorkSubmissionPanel";

export default function WorkSubmissionInfo() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area d-flex justify-content-between align-items-center">
            <div>
              <h2>Work Submission Page</h2>
              <p className="text">Submit completion proof.</p>
            </div>
            <Link href="/worker-dashboard/tasks?tab=in_progress" className="ud-btn btn-light-default">
              ← Back to List
            </Link>
          </div>
        </div>
      </div>

      <WorkSubmissionPanel showMilestoneSelector />
    </div>
  );
}
