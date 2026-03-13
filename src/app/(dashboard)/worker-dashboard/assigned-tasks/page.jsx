import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TasksInfo from "@/components/dashboard-worker/section/TasksInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { workerSectionConfig } from "@/data/workerTasks";

const sectionKey = "assigned";

export const metadata = {
  title: `Worker Dashboard | ${workerSectionConfig[sectionKey].title}`,
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TasksInfo
          initialFilter="assigned"
          pageTitle="Assigned Tasks"
          pageDescription="Same task flow view with assigned filter applied."
        />
      </DashboardLayout>
    </>
  );
}
