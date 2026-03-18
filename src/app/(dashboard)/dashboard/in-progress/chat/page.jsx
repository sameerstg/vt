import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InProgressChatInfo from "@/components/dashboard/section/InProgressChatInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Project Chat",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <InProgressChatInfo />
      </DashboardLayout>
    </>
  );
}
