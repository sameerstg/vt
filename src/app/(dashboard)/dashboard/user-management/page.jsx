import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminUserManagementContent from "@/components/dashboard/section/AdminUserManagementContent";

export const metadata = {
  title: "User Management",
};

export default function UserManagementPage() {
  return (
    <DashboardLayout>
      <AdminUserManagementContent routeBase="/dashboard" />
    </DashboardLayout>
  );
}
