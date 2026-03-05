import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import ProposalSubmissionInfo from "@/components/dashboard-worker/section/ProposalSubmissionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Proposal Submission",
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
