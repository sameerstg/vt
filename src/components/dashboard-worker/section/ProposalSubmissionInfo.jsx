import Link from "next/link";
import DashboardNavigation from "../header/DashboardNavigation";
import ProposalSubmissionPanel from "@/components/dashboard-shared/ProposalSubmissionPanel";

export default function ProposalSubmissionInfo() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area d-flex justify-content-between align-items-center">
            <div>
              <h2>Proposal Submission Page</h2>
              <p className="text">Submit offer.</p>
            </div>
            <Link href="/worker-dashboard/tasks?tab=available" className="ud-btn btn-light-default">
              ← Back to List
            </Link>
          </div>
        </div>
      </div>

      <ProposalSubmissionPanel />
    </div>
  );
}
