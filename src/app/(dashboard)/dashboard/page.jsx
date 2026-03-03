import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminDashboardOverview from "@/components/dashboard/section/AdminDashboardOverview";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Dashboard",
};

export default function page() {
  return (
    <DashboardLayout>
      <AdminDashboardOverview routeBase="/dashboard" />
    </DashboardLayout>
  );
}
