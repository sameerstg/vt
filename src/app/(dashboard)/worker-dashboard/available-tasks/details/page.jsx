import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import AvailableTaskDetails from "@/components/dashboard-worker/section/AvailableTaskDetails";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Worker Dashboard | Available Task Details",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <AvailableTaskDetails />
      </DashboardLayout>
    </>
  );
}
