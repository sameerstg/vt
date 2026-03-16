import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TasksInfo from "@/components/dashboard-worker/section/TasksInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { workerSectionConfig } from "@/data/workerTasks";

const sectionKey = "applied";

export const metadata = {
  title: `Worker Dashboard | ${workerSectionConfig[sectionKey].title}`,
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TasksInfo 
          initialFilter={sectionKey} 
          pageTitle={workerSectionConfig[sectionKey].title}
          pageDescription={workerSectionConfig[sectionKey].description}
        />
      </DashboardLayout>
    </>
  );
}
