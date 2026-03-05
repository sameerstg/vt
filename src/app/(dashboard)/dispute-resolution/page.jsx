import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DisputeResolutionInfo from "@/components/dashboard/section/DisputeResolutionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Freeio - Freelance Marketplace React/Next Js Template | Dispute Resolution",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <DisputeResolutionInfo />
      </DashboardLayout>
    </>
  );
}
