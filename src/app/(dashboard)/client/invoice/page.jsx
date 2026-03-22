import DashboardLayout from "@/app/(dashboard)/client/components/DashboardLayout";
import InvoiceInfo from "@/app/(dashboard)/client/components/section/InvoiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Invoice",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <InvoiceInfo />
      </DashboardLayout>
    </>
  );
}
