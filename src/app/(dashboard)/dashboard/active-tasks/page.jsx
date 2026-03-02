import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ActiveTasksInfo from "@/components/dashboard/section/ActiveTasksInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Active Tasks",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ActiveTasksInfo />
      </DashboardLayout>
    </>
  );
}
