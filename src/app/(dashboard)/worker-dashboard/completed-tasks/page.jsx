import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import WorkerTaskSectionInfo from "@/components/dashboard-worker/section/WorkerTaskSectionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Worker Dashboard | Completed Tasks",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkerTaskSectionInfo sectionKey="completed" />
      </DashboardLayout>
    </>
  );
}

