import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TaskDetailsInfo from "@/components/dashboard-contractor/section/TaskDetailsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = { title: "Task Details | VeriTask" };

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TaskDetailsInfo />
      </DashboardLayout>
    </>
  );
}
