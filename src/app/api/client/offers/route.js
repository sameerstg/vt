import { getOffersByProjectId, getAllOffers } from '../../projects';
import { getOffersState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  
  let filteredOffers = projectId ? getOffersByProjectId(projectId) : [];
  
  const state = getOffersState();
  filteredOffers = filteredOffers.map(offer => {
    const stateOffer = state.get(offer.id);
    return stateOffer || offer;
  });
  
  return Response.json({
    success: true,
    data: filteredOffers,
  });
}

export async function POST(request) {
  await delay(400);
  const body = await request.json();
  const state = getOffersState();
  const { action, offerId } = body;
  
  const allOffers = getAllOffers();
  const offer = allOffers.find(o => o.id === offerId);
  
  if (!offer) {
    return Response.json({ success: false, error: "Offer not found" }, { status: 404 });
  }
  
  if (action === "accept") {
    const updatedOffer = { ...offer, status: "ACCEPTED" };
    state.set(offerId, updatedOffer);
    return Response.json({ success: true, data: updatedOffer });
  }
  
  if (action === "reject") {
    const updatedOffer = { ...offer, status: "REJECTED" };
    state.set(offerId, updatedOffer);
    return Response.json({ success: true, data: updatedOffer });
  }
  
  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
