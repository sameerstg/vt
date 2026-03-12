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
          <div className="dashboard_title_area">
            <h2>Proposal Submission Page</h2>
          </div>
        </div>
      </div>

      <ProposalSubmissionPanel />
    </div>
  );
}
