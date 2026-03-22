import DashboardLayout from "@/app/(dashboard)/contractor/components/DashboardLayout";
import MessageInfo from "@/app/(dashboard)/contractor/components/section/MessageInfo";

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

