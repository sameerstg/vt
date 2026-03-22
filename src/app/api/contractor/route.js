import { projects as allProjects, updateProject } from '../../projects';
import { getProjectsState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const contractorTeams = new Map([
  ["contractor-001", {
    id: "team-001",
    contractorId: "contractor-001",
    name: "Web Dev Team Alpha",
    description: "Experienced web development team",
    members: [
      { id: "tm-001", workerId: "worker-021", name: "Alex Thompson", role: "Lead Developer", rate: 75, isActive: true },
      { id: "tm-002", workerId: "worker-022", name: "Maria Garcia", role: "UI/UX Designer", rate: 60, isActive: true },
      { id: "tm-003", workerId: "worker-023", name: "James Wilson", role: "Backend Developer", rate: 70, isActive: true },
    ],
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  }],
  ["contractor-002", {
    id: "team-002",
    contractorId: "contractor-002",
    name: "Cleaning Services Crew",
    description: "Professional cleaning team",
    members: [
      { id: "tm-004", workerId: "worker-024", name: "Sarah Johnson", role: "Team Lead", rate: 40, isActive: true },
      { id: "tm-005", workerId: "worker-025", name: "David Lee", role: "Cleaner", rate: 30, isActive: true },
    ],
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  }],
]);

const payrollRecords = new Map();

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const contractorId = searchParams.get("contractorId") || "contractor-001";

  let result = { assignedProjects: [], team: null, subprojects: [], payroll: [] };

  if (type === "assigned" || !type) {
    let assignedProjects = allProjects.filter(p => 
      p.contractorId === contractorId
    );
    const projectsState = getProjectsState();
    assignedProjects = assignedProjects.map(proj => {
      const stateProject = projectsState.get(proj.id);
      return stateProject || proj;
    });
    result.assignedProjects = assignedProjects;
  }

  if (type === "team" || !type) {
    result.team = contractorTeams.get(contractorId) || null;
  }

  if (type === "subprojects" || !type) {
    const parentProjectId = searchParams.get("parentProjectId");
    if (parentProjectId) {
      result.subprojects = allProjects.filter(p => p.parentProjectId === parentProjectId);
    }
  }

  if (type === "payroll" || !type) {
    result.payroll = payrollRecords.get(contractorId) || [];
  }

  return Response.json({
    success: true,
    data: result,
  });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const contractorId = body.contractorId || "contractor-001";

  if (body.action === "addTeamMember") {
    const team = contractorTeams.get(contractorId);
    if (!team) {
      contractorTeams.set(contractorId, {
        id: `team-${Date.now()}`,
        contractorId,
        name: "New Team",
        description: "",
        members: [],
        createdAt: new Date().toISOString(),
      });
    }
    const newTeam = contractorTeams.get(contractorId);
    newTeam.members.push({
      id: `tm-${Date.now()}`,
      workerId: body.workerId,
      name: body.name,
      role: body.role || "Worker",
      rate: parseFloat(body.rate) || 25,
      isActive: true,
    });
    contractorTeams.set(contractorId, newTeam);
    return Response.json({ success: true, data: newTeam });
  }

  if (body.action === "distributePayroll") {
    const records = payrollRecords.get(contractorId) || [];
    records.push({
      id: `pay-${Date.now()}`,
      projectId: body.projectId,
      amount: parseFloat(body.amount),
      distributedTo: body.workers,
      createdAt: new Date().toISOString(),
    });
    payrollRecords.set(contractorId, records);
    return Response.json({ success: true, data: records[records.length - 1] });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}

export async function PUT(request) {
  await delay(300);
  const body = await request.json();
  const contractorId = body.contractorId || "contractor-001";

  if (body.action === "removeTeamMember") {
    const team = contractorTeams.get(contractorId);
    if (team) {
      team.members = team.members.filter(m => m.id !== body.memberId);
      contractorTeams.set(contractorId, team);
      return Response.json({ success: true, data: team });
    }
  }

  if (body.action === "updateTeamMember") {
    const team = contractorTeams.get(contractorId);
    if (team) {
      const member = team.members.find(m => m.id === body.memberId);
      if (member) {
        Object.assign(member, body.updates);
        contractorTeams.set(contractorId, team);
        return Response.json({ success: true, data: team });
      }
    }
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
