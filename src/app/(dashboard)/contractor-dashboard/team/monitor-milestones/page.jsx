import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";

export const metadata = {
  title: "Monitor Milestones | Contractor Dashboard",
};

export default function MonitorMilestonesPage() {
  return (
    <DashboardLayout>
      <TeamManagementInfo activeTab="monitor" />
    </DashboardLayout>
  );
}
