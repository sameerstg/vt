import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InProgressInfo from "@/components/dashboard/section/InProgressInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | In Progress",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <InProgressInfo />
      </DashboardLayout>
    </>
  );
}
