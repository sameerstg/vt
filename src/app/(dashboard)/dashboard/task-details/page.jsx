import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TaskDetailsInfo from "@/components/dashboard/section/TaskDetailsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Task Details",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TaskDetailsInfo />
      </DashboardLayout>
    </>
  );
}
