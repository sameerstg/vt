import { workReviewItems } from "./workReview";

export const feedbackItems = workReviewItems.map((item, index) => ({
  id: item.id,
  jobId: item.jobId,
  jobTitle: item.jobTitle,
  workerName: item.workerName,
  workerProfilePath: item.workerProfilePath,
  ratingAverage: Number((4.6 + index * 0.1).toFixed(1)),
  feedbackCount: 28 + index * 9,
  recentFeedback: [
    "Great communication and timely updates.",
    "Delivered work as requested with minor revisions.",
    "Professional behavior and smooth collaboration.",
  ],
}));

export const getFeedbackById = (id) =>
  feedbackItems.find((item) => item.id === String(id));
