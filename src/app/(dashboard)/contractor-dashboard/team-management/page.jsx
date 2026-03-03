import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import TeamManagementInfo from "@/components/dashboard-contractor/section/TeamManagementInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Team Management",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <TeamManagementInfo />
      </DashboardLayout>
    </>
  );
}
