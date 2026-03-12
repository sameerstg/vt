import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import WorkSubmissionInfo from "@/components/dashboard-contractor/section/WorkSubmissionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Contractor Dashboard | Work Submission",
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
