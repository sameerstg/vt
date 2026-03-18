import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import UserManagementInfo from "@/components/dashboard-admin/section/UserManagementInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | User Management Contractors",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <UserManagementInfo initialUserRole="Contractors" />
      </DashboardLayout>
    </>
  );
}
