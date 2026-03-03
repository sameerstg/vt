import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import DisputeSubmissionInfo from "@/components/dashboard-contractor/section/DisputeSubmissionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Dispute Submission",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <DisputeSubmissionInfo />
      </DashboardLayout>
    </>
  );
}
