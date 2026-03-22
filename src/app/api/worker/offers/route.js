import { getOffersByProjectId, offers as allOffers, updateOfferStatus } from '../../projects';
import { getOffersState, getProjectsState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  const workerId = searchParams.get("workerId") || "worker-021";

  let filteredOffers;
  if (projectId) {
    filteredOffers = getOffersByProjectId(projectId).filter(o => o.workerId === workerId);
  } else {
    filteredOffers = allOffers.filter(o => o.workerId === workerId);
  }

  const offersState = getOffersState();
  filteredOffers = filteredOffers.map(offer => {
    const stateOffer = offersState.get(offer.id);
    return stateOffer || offer;
  });

  return Response.json({
    success: true,
    data: filteredOffers,
  });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const offersState = getOffersState();

  const newOffer = {
    id: `offer-${Date.now()}`,
    projectId: body.projectId,
    workerId: body.workerId || "worker-021",
    workerName: "Alex Thompson",
    workerAvatar: "/images/team/freelancer-1.png",
    workerRating: 4.9,
    workerCompletedTasks: 87,
    amount: parseFloat(body.amount),
    terms: body.terms || "",
    estimatedDays: parseInt(body.estimatedDays) || 7,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  offersState.set(newOffer.id, newOffer);

  return Response.json({
    success: true,
    data: newOffer,
  });
}

export async function PUT(request) {
  await delay(300);
  const body = await request.json();
  const offersState = getOffersState();

  if (body.action === "withdraw") {
    const offer = offersState.get(body.offerId);
    if (offer) {
      offer.status = "WITHDRAWN";
      offersState.set(body.offerId, offer);
      return Response.json({ success: true, data: offer });
    }
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
