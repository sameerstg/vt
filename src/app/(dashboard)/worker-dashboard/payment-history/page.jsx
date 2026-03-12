import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import WorkerTaskSectionInfo from "@/components/dashboard-worker/section/WorkerTaskSectionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { workerSectionConfig } from "@/data/workerTasks";

const sectionKey = "payment_history";

export const metadata = {
  title: `Worker Dashboard | ${workerSectionConfig[sectionKey].title}`,
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkerTaskSectionInfo sectionKey={sectionKey} />
      </DashboardLayout>
    </>
  );
}
