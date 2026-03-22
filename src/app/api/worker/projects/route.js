import { getProjectsByStatus, projects as allProjects, updateProject } from '../../projects';
import { getOffersByProjectId, getAllOffers, offers as allOffers } from '../../projects';
import { getOffersState, getProjectsState } from '../../uiState';

export async function PUT(request) {
  const body = await request.json();
  const { projectId, action } = body;

  const projectsState = getProjectsState();
  const base = allProjects.find(p => p.id === projectId);
  if (!base) {
    return Response.json({ success: false, error: "Project not found" }, { status: 404 });
  }

  const current = projectsState.get(projectId) || { ...base };

  if (action === "submit") {
    if (current.status !== "IN_PROGRESS") {
      return Response.json({ success: false, error: "Only IN_PROGRESS projects can be submitted" }, { status: 400 });
    }
    current.status = "SUBMITTED";
    current.submittedAt = new Date().toISOString();
    current.updatedAt = new Date().toISOString();
  } else {
    return Response.json({ success: false, error: "Unknown action" }, { status: 400 });
  }

  projectsState.set(projectId, current);
  return Response.json({ success: true, data: current });
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const workerId = searchParams.get("workerId") || "worker-021";

  let result = { available: [], assigned: [], pendingOffers: [] };

  if (type === "available" || !type) {
    let availableProjects = allProjects.filter(p => p.status === "POSTED");
    const projectsState = getProjectsState();
    availableProjects = availableProjects.map(proj => {
      const stateProject = projectsState.get(proj.id);
      return stateProject || proj;
    });
    result.available = availableProjects;
  }

  if (type === "assigned" || !type) {
    let assignedProjects = allProjects.filter(p =>
      p.workerId === workerId &&
      ["ASSIGNED", "IN_PROGRESS", "SUBMITTED", "IN_DISPUTE", "COMPLETED"].includes(p.status)
    );
    const projectsState = getProjectsState();
    assignedProjects = assignedProjects.map(proj => {
      const stateProject = projectsState.get(proj.id);
      return stateProject || proj;
    });
    result.assigned = assignedProjects;
  }

  if (type === "pending" || !type) {
    let pendingOffers = allOffers.filter(o =>
      o.workerId === workerId && o.status === "PENDING"
    );
    const offersState = getOffersState();
    pendingOffers = pendingOffers.map(offer => {
      const stateOffer = offersState.get(offer.id);
      return stateOffer || offer;
    });
    result.pendingOffers = pendingOffers;
  }

  return Response.json({
    success: true,
    data: result,
  });
}
