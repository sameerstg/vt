import { redirect } from "next/navigation";
import { workReviewItems } from "@/data/workReview";

export default function Page() {
  const firstId = workReviewItems[0]?.id || "1";
  redirect(`/dashboard/work-review-approval/${firstId}`);
}
