import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WorkReviewApprovalInfo from "@/components/dashboard/section/WorkReviewApprovalInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import { getWorkReviewById, workReviewItems } from "@/data/workReview";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Client Dashboard | Work Review & Approval",
};

export function generateStaticParams() {
  return workReviewItems.map((item) => ({ id: item.id }));
}

export default async function Page({ params }) {
  const { id } = await params;
  const review = getWorkReviewById(id);

  if (!review) {
    notFound();
  }

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <WorkReviewApprovalInfo review={review} />
      </DashboardLayout>
    </>
  );
}
