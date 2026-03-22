import DashboardLayout from "@/app/worker/components/DashboardLayout";
import StatementInfo from "@/app/worker/components/section/StatementInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Statement",
};

export default function page() {
  return (
    <>

      <MobileNavigation2 />
      <DashboardLayout>
        <StatementInfo />
      </DashboardLayout>
    </>
  );
}

