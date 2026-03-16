import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";

export const metadata = {
  title: "Assign Projects | Contractor Dashboard",
};

export default function AssignProjectsPage() {
  return (
    <DashboardLayout>
      <TeamManagementInfo activeTab="projects" />
    </DashboardLayout>
  );
}
