import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NotificationsInfo from "@/components/dashboard/section/NotificationsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Notifications",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <NotificationsInfo />
      </DashboardLayout>
    </>
  );
}
