import DashboardLayout from "@/app/(dashboard)/client/components/DashboardLayout";
import ClientDashboardComponent from "@/app/(dashboard)/client/modules/pages/ClientDashboard";

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
