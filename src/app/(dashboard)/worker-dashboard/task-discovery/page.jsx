import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TaskDiscoveryInfo from "@/components/dashboard-worker/section/TaskDiscoveryInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "VeriTask | Task Discovery",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TaskDiscoveryInfo />
      </DashboardLayout>
    </>
  );
}
