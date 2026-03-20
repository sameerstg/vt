import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import WorkerDashboardComponent from "@/modules/worker/pages/WorkerDashboard";

export const metadata = {
  title: "VeriTask - Worker Dashboard",
};

export default function WorkerDashboardPage() {
  return (
    <DashboardLayout>
      <WorkerDashboardComponent />
    </DashboardLayout>
  );
}
