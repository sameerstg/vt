import { notFound } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClosedDetailsInfo from "@/components/dashboard/section/ClosedDetailsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { closedTasks } from "@/data/clientDashboard";

export const metadata = {
  title: "Client Dashboard | Closed Details",
};

export function generateStaticParams() {
  return closedTasks.map((item) => ({ id: item.id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const item = closedTasks.find((entry) => entry.id === id);

  if (!item) {
    notFound();
  }

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ClosedDetailsInfo item={item} />
      </DashboardLayout>
    </>
  );
}
