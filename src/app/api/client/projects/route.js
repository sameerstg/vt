import { getProjectsByClientId, getProjectById } from '../../projects';
import { getProjectsState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const clientId = searchParams.get("clientId") || "client-001";
  
  let filteredProjects = getProjectsByClientId(clientId);
  if (status) {
    filteredProjects = filteredProjects.filter(p => p.status === status);
  }
  
  const state = getProjectsState();
  filteredProjects = filteredProjects.map(proj => {
    const stateProject = state.get(proj.id);
    return stateProject || proj;
  });
  
  return Response.json({
    success: true,
    data: filteredProjects,
  });
}

export async function PUT(request) {
  await delay(300);
  const body = await request.json();
  const { projectId, action } = body;

  if (!projectId || !action) {
    return Response.json({ success: false, error: "projectId and action required" }, { status: 400 });
  }

  const state = getProjectsState();
  const base = getProjectById(projectId);
  const project = state.get(projectId) || base;

  if (!project) {
    return Response.json({ success: false, error: "Project not found" }, { status: 404 });
  }

  if (project.status !== "SUBMITTED") {
    return Response.json({ success: false, error: "Project is not in SUBMITTED state" }, { status: 400 });
  }

  let newStatus;
  if (action === "approve") {
    newStatus = "COMPLETED";
  } else if (action === "dispute") {
    newStatus = "IN_DISPUTE";
  } else {
    return Response.json({ success: false, error: "Unknown action" }, { status: 400 });
  }

  const updated = { ...project, status: newStatus, updatedAt: new Date().toISOString() };
  state.set(projectId, updated);

  return Response.json({ success: true, data: updated });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const state = getProjectsState();
  
  const newProject = {
    id: `proj-${Date.now()}`,
    clientId: body.clientId || "client-001",
    title: body.title,
    description: body.description,
    type: body.type || "VIRTUAL",
    budgetModel: body.budgetModel || "FIXED",
    budget: parseFloat(body.budget) || 0,
    category: body.category || "General",
    status: "POSTED",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  state.set(newProject.id, newProject);
  
  return Response.json({
    success: true,
    data: newProject,
  });
}
