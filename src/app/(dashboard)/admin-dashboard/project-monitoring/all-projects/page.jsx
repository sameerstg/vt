import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import ProjectMonitoringAllProjectsInfo from "@/components/dashboard-admin/section/ProjectMonitoringAllProjectsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Admin Dashboard | All Projects",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProjectMonitoringAllProjectsInfo />
      </DashboardLayout>
    </>
  );
}
