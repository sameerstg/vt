// app/(dashboard)/worker-dashboard/applied-tasks/details/page.jsx
import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import AppliedTaskDetails from "@/components/dashboard-worker/section/AppliedTaskDetails";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Applied Task Details | Worker Dashboard",
};

export default function AppliedTaskDetailsPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <AppliedTaskDetails />
      </DashboardLayout>
    </>
  );
}