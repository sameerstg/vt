import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TaskDiscoveryInfo from "@/components/dashboard-worker/section/TaskDiscoveryInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { workerSectionConfig } from "@/data/workerTasks";

const sectionKey = "available";

export const metadata = {
  title: `Worker Dashboard | ${workerSectionConfig[sectionKey].title}`,
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
