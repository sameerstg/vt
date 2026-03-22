import DashboardLayout from "@/components/dashboard-client/DashboardLayout";
import ClientDashboard from "@/modules/client/pages/ClientDashboard";

export const metadata = {
  title: "VeriTask - Client Dashboard",
};

export default function ClientDashboardPage() {
  return (
    <DashboardLayout>
      <ClientDashboard />
    </DashboardLayout>
  );
}
