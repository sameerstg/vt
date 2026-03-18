import DashboardLayout from "@/components/dashboard-admin/DashboardLayout";
import DisputeResolutionInfo from "@/components/dashboard-admin/section/DisputeResolutionInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "VeriTask | Dispute Resolution",
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

