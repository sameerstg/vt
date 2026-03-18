import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import PaymentDistributionInfo from "@/components/dashboard-contractor/section/PaymentDistributionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title:
    "VeriTask | Payment Distribution",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <PaymentDistributionInfo />
      </DashboardLayout>
    </>
  );
}
