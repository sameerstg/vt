import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PendingEscrowFundingInfo from "@/components/dashboard/section/PendingEscrowFundingInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Pending Escrow Funding",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <PendingEscrowFundingInfo />
      </DashboardLayout>
    </>
  );
}
