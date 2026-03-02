import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProposalReviewInfo from "@/components/dashboard/section/ProposalReviewInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Proposal Review",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProposalReviewInfo />
      </DashboardLayout>
    </>
  );
}
