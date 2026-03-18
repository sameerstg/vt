import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import TaskMonitoringInfo from "@/components/dashboard-admin/section/TaskMonitoringInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | Task Monitoring",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TaskMonitoringInfo />
      </DashboardLayout>
    </>
  );
}
