import { getProjectsByStatus, projects as allProjects, updateProject } from '../../projects';
import { getOffersByProjectId, getAllOffers, offers as allOffers } from '../../projects';
import { getOffersState, getProjectsState } from '../../uiState';

const workerTeams = new Map([
  ["worker-021", [
    {
      id: "team-001", contractorId: "contractor-001", contractorName: "BuildRight Solutions",
      name: "Web Dev Team Alpha", description: "Full-stack web development team",
      members: [
        { id: "tm-001", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "Lead Developer", rate: 75, isActive: true },
        { id: "tm-002", memberId: "worker-022", name: "Maria Garcia", type: "worker", role: "UI/UX Designer", rate: 60, isActive: true },
        { id: "tm-003", memberId: "worker-023", name: "James Wilson", type: "worker", role: "Backend Developer", rate: 70, isActive: true },
        { id: "tm-005", memberId: "contractor-002", name: "Linda Park", type: "contractor", role: "Project Manager", rate: 90, isActive: true },
      ],
    },
    {
      id: "team-002", contractorId: "contractor-001", contractorName: "BuildRight Solutions",
      name: "Mobile Dev Squad", description: "iOS and Android specialists",
      members: [
        { id: "tm-010", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "React Native Dev", rate: 75, isActive: true },
        { id: "tm-011", memberId: "worker-031", name: "Sofia Chen", type: "worker", role: "iOS Developer", rate: 80, isActive: true },
        { id: "tm-012", memberId: "worker-032", name: "Marcus Lee", type: "worker", role: "Android Developer", rate: 78, isActive: true },
      ],
    },
    {
      id: "team-003", contractorId: "contractor-001", contractorName: "BuildRight Solutions",
      name: "QA & Testing Team", description: "Quality assurance and automated testing",
      members: [
        { id: "tm-020", memberId: "worker-041", name: "Derek Owens", type: "worker", role: "QA Lead", rate: 65, isActive: true },
        { id: "tm-021", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "Frontend Tester", rate: 75, isActive: true },
        { id: "tm-022", memberId: "contractor-003", name: "Victor Crane", type: "contractor", role: "Test Architect", rate: 95, isActive: true },
      ],
    },
    {
      id: "team-007", contractorId: "contractor-002", contractorName: "DataFirst Corp",
      name: "Data Analytics Team", description: "Data science and business intelligence",
      members: [
        { id: "tm-060", memberId: "worker-081", name: "Rachel Kim", type: "worker", role: "Data Scientist", rate: 88, isActive: true },
        { id: "tm-061", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "Data Engineer", rate: 75, isActive: true },
        { id: "tm-062", memberId: "contractor-005", name: "Pavel Novak", type: "contractor", role: "Data Architect", rate: 105, isActive: true },
      ],
    },
    {
      id: "team-010", contractorId: "contractor-003", contractorName: "Nexus Group",
      name: "Product Team", description: "Product strategy and roadmap execution",
      members: [
        { id: "tm-090", memberId: "worker-111", name: "Nadia Obi", type: "worker", role: "Product Manager", rate: 85, isActive: true },
        { id: "tm-091", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "Tech Lead", rate: 75, isActive: true },
        { id: "tm-092", memberId: "contractor-007", name: "Sara Quinn", type: "contractor", role: "VP of Product", rate: 120, isActive: true },
      ],
    },
  ]],
]);

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

  if (type === "team") {
    result.teams = workerTeams.get(workerId) || [];
    return Response.json({ success: true, data: result });
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
