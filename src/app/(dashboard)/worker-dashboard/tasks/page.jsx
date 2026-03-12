import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import TasksInfo from "@/components/dashboard-worker/section/TasksInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Worker Dashboard | Tasks",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TasksInfo />
      </DashboardLayout>
    </>
  );
}

