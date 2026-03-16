import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";

export const metadata = {
  title: "Assign Milestones | Contractor Dashboard",
};

export default function AssignMilestonesPage() {
  return (
    <DashboardLayout>
      <TeamManagementInfo activeTab="milestones" />
    </DashboardLayout>
  );
}
