import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import ContractorDashboardComponent from "@/modules/contractor/pages/ContractorDashboard";

export const metadata = {
  title: "VeriTask - Contractor Dashboard",
};

export default function ContractorDashboardPage() {
  return (
    <DashboardLayout>
      <ContractorDashboardComponent />
    </DashboardLayout>
  );
}
