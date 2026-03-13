import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";

export const metadata = {
  title: "Teams | Contractor Dashboard",
};

export default function TeamPage() {
  return (
    <DashboardLayout>
      <TeamManagementInfo />
    </DashboardLayout>
  );
}
