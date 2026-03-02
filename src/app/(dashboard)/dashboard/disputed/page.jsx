import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DisputedInfo from "@/components/dashboard/section/DisputedInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Disputed",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <DisputedInfo />
      </DashboardLayout>
    </>
  );
}
