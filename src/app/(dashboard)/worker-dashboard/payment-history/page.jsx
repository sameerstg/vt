import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import PaymentHistoryInfo from "@/components/dashboard-worker/section/PaymentHistoryInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Worker Dashboard | Payment History",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <PaymentHistoryInfo />
      </DashboardLayout>
    </>
  );
}
