import DashboardLayout from "@/app/(dashboard)/client/components/DashboardLayout";
import PayoutInfo from "@/app/(dashboard)/client/components/section/PayoutInfo";

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
