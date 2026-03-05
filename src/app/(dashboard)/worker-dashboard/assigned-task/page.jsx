import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import AssignedTaskInfo from "@/components/dashboard-worker/section/AssignedTaskInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Assigned Task",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <AssignedTaskInfo />
      </DashboardLayout>
    </>
  );
}
