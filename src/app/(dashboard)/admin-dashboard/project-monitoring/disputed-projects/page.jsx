import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import ProjectMonitoringDisputedProjectsInfo from "@/components/dashboard-admin/section/ProjectMonitoringDisputedProjectsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Admin Dashboard | Disputed Projects",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProjectMonitoringDisputedProjectsInfo />
      </DashboardLayout>
    </>
  );
}
