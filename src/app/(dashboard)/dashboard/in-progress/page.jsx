import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientTaskManagementInfo from "@/components/dashboard/section/ClientTaskManagementInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | In Progress",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ClientTaskManagementInfo initialTab="progress" />
      </DashboardLayout>
    </>
  );
}
