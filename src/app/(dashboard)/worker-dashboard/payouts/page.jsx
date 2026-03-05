import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import PayoutInfo from "@/components/dashboard-worker/section/PayoutInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";
export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Payout",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <PayoutInfo />
      </DashboardLayout>
    </>
  );
}

