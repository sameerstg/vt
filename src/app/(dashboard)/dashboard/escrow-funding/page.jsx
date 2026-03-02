import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EscrowFundingInfo from "@/components/dashboard/section/EscrowFundingInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Client Dashboard | Escrow Funding",
};

export default function Page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <EscrowFundingInfo />
      </DashboardLayout>
    </>
  );
}
