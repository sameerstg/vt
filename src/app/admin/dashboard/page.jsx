import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import AdminDashboard from "@/modules/admin/pages/AdminDashboard";

export const metadata = {
  title: "VeriTask - Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <AdminDashboard />
    </DashboardLayout>
  );
}