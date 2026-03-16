import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import CompletedTaskDetails from "@/components/dashboard-worker/section/CompletedTaskDetails";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Completed Task Details | Worker Dashboard",
};

export default function CompletedTaskDetailsPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <CompletedTaskDetails />
      </DashboardLayout>
    </>
  );
}
