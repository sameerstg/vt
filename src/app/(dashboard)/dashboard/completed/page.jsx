import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CompletedInfo from "@/components/dashboard/section/CompletedInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Completed",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <CompletedInfo />
      </DashboardLayout>
    </>
  );
}
