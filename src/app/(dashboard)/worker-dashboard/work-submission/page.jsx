import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import WorkSubmissionInfo from "@/components/dashboard-worker/section/WorkSubmissionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Work Submission",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkSubmissionInfo />
      </DashboardLayout>
    </>
  );
}
