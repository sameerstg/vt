import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DisputedDetailsInfo from "@/components/dashboard/section/DisputedDetailsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { disputedTasks } from "@/data/clientDashboard";

export const metadata = {
  title: "Client Dashboard | Dispute Details",
};

export function generateStaticParams() {
  return disputedTasks.map((item) => ({ id: item.id }));
}

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const item =
    disputedTasks.find((entry) => entry.id === id) || {
      id,
      task: resolvedSearchParams?.task || "Disputed Project",
      issue: resolvedSearchParams?.issue || "Escrow funding dispute",
      status: resolvedSearchParams?.status || "Open",
      worker: resolvedSearchParams?.worker || "Escrow Support",
      openedOn: resolvedSearchParams?.openedOn || "Today",
      budget: resolvedSearchParams?.budget || "N/A",
      escrowStatus: resolvedSearchParams?.escrowStatus || "Pending Review",
      reason:
        resolvedSearchParams?.reason ||
        "This dispute was raised from pending escrow funding and is awaiting review.",
      updates: [
        {
          id: `${id}-update-1`,
          sender: "You",
          time: "Just now",
          text: `A dispute was opened for ${resolvedSearchParams?.task || "this project"} due to pending escrow funding.`,
        },
        {
          id: `${id}-update-2`,
          sender: "Support",
          time: "Just now",
          text: "Support has received the case and will verify payment status and escrow release conditions.",
        },
      ],
      evidence: [{ id: `${id}-evidence-1`, name: "escrow-payment-status.pdf", size: "320 KB" }],
    };

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <DisputedDetailsInfo item={item} />
      </DashboardLayout>
    </>
  );
}
