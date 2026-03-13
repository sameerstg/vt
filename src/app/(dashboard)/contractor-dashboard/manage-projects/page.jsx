import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import ProposalSubmissionInfo from "@/components/dashboard-contractor/section/ProposalSubmissionInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Contractor Dashboard | Proposal Submission",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <ProposalSubmissionInfo />
      </DashboardLayout>
    </>
  );
}
