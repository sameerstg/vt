import DashboardLayout from "@/components/dashboard-contractor/DashboardLayout";
import MessageInfo from "@/components/dashboard-contractor/section/MessageInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Message",
};

export default function page() {
  return (
    <>
    
    <MobileNavigation2 />
      <DashboardLayout>
        <MessageInfo />
      </DashboardLayout>
    </>
  );
}

