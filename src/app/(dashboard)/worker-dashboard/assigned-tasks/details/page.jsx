import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import AssignedTaskDetails from "@/components/dashboard-worker/section/AssignedTaskDetails";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Assigned Task Details | Worker Dashboard",
};

export default function AssignedTaskDetailsPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <AssignedTaskDetails />
      </DashboardLayout>
    </>
  );
}
