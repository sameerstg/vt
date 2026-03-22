import { getReviewsByClientId, getReviewsByProjectId } from '../../projects';
import { getReviewsState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const clientId = searchParams.get("clientId") || "client-001";
  
  let filteredReviews = getReviewsByClientId(clientId);
  if (projectId) {
    filteredReviews = getReviewsByProjectId(projectId);
  }
  
  const state = getReviewsState();
  const stateReviews = state.get(clientId) || [];
  
  const allReviews = [...filteredReviews, ...stateReviews];
  
  if (projectId) {
    return Response.json({
      success: true,
      data: allReviews.filter(r => r.projectId === projectId),
    });
  }
  
  return Response.json({
    success: true,
    data: allReviews,
  });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const state = getReviewsState();
  
  const newReview = {
    id: `review-${Date.now()}`,
    projectId: body.projectId,
    projectTitle: body.projectTitle,
    workerId: body.workerId,
    workerName: body.workerName,
    workerAvatar: body.workerAvatar || "/images/team/freelancer-1.png",
    clientId: body.clientId || "client-001",
    rating: parseInt(body.rating) || 5,
    comment: body.comment || "",
    createdAt: new Date().toISOString(),
  };
  
  const existingReviews = state.get(body.clientId || "client-001") || [];
  state.set(body.clientId || "client-001", [...existingReviews, newReview]);
  
  return Response.json({
    success: true,
    data: newReview,
  });
}
