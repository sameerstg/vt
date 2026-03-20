import DashboardLayout from "@/components/dashboard-client/DashboardLayout";
import ClientDashboardComponent from "@/modules/client/pages/ClientDashboard";

export const metadata = {
  title: "VeriTask - Client Dashboard",
};

export default function ClientDashboardPage() {
  return (
    <DashboardLayout>
      <ClientDashboardComponent />
    </DashboardLayout>
  );
}
