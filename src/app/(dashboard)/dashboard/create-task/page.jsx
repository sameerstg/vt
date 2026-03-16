import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateTaskInfo from "@/components/dashboard/section/CreateTaskInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Create Project",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <CreateTaskInfo />
      </DashboardLayout>
    </>
  );
}
