import DashboardLayout from "@/components/dashboard-worker/DashboardLayout";
import ProposalInfo from "@/components/dashboard-worker/section/ProposalInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Proposal",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <ProposalInfo />
      </DashboardLayout>
    </>
  );
}

