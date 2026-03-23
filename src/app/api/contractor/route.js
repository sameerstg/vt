import { projects as allProjects } from '../projects';
import { getProjectsState } from '../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const contractorInvites = new Map([
  ["contractor-001", [
    {
      id: "cinv-001", teamId: "team-ext-001", teamName: "Infrastructure Alliance", contractorId: "contractor-ext-1", contractorName: "CloudSphere Inc",
      description: "Cloud infrastructure and DevOps projects", inviteRole: "Solutions Architect", status: "PENDING",
      members: [
        { id: "cim-001", memberId: "contractor-ext-1", name: "Oliver Grant", type: "contractor", role: "CTO", rate: 150 },
        { id: "cim-002", memberId: "worker-051", name: "Nathan Brooks", type: "worker", role: "DevOps Lead", rate: 90 },
        { id: "cim-003", memberId: "worker-061", name: "Camille Dufour", type: "worker", role: "Cloud Engineer", rate: 85 },
      ],
    },
    {
      id: "cinv-002", teamId: "team-ext-002", teamName: "Enterprise Solutions Hub", contractorId: "contractor-ext-2", contractorName: "Nexus Consulting",
      description: "Large-scale enterprise software delivery", inviteRole: "Technical Lead", status: "PENDING",
      members: [
        { id: "cim-010", memberId: "contractor-ext-2", name: "Fiona Blake", type: "contractor", role: "Delivery Manager", rate: 130 },
        { id: "cim-011", memberId: "worker-023", name: "James Wilson", type: "worker", role: "Backend Dev", rate: 70 },
      ],
    },
    {
      id: "cinv-003", teamId: "team-ext-003", teamName: "FinTech Builders", contractorId: "contractor-ext-3", contractorName: "PayForge Ltd",
      description: "Payment and financial platform development", inviteRole: "Integration Specialist", status: "PENDING",
      members: [
        { id: "cim-020", memberId: "contractor-ext-3", name: "Marcus Webb", type: "contractor", role: "CEO", rate: 160 },
        { id: "cim-021", memberId: "worker-081", name: "Rachel Kim", type: "worker", role: "Data Engineer", rate: 88 },
        { id: "cim-022", memberId: "worker-071", name: "Hassan Ali", type: "worker", role: "Backend Dev", rate: 80 },
      ],
    },
  ]],
]);

const contractorTeams = new Map([
  ["contractor-001", [
    {
      id: "team-001", contractorId: "contractor-001", name: "Web Dev Team Alpha",
      description: "Full-stack web development team",
      members: [
        { id: "tm-001", memberId: "worker-021", name: "Alex Thompson", type: "worker", role: "Lead Developer", rate: 75, isActive: true },
        { id: "tm-002", memberId: "worker-022", name: "Maria Garcia", type: "worker", role: "UI/UX Designer", rate: 60, isActive: true },
        { id: "tm-003", memberId: "worker-023", name: "James Wilson", type: "worker", role: "Backend Developer", rate: 70, isActive: true },
        { id: "tm-005", memberId: "contractor-002", name: "Linda Park", type: "contractor", role: "Project Manager", rate: 90, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
    },
    {
      id: "team-002", contractorId: "contractor-001", name: "Mobile Dev Squad",
      description: "iOS and Android specialists",
      members: [
        { id: "tm-010", memberId: "worker-031", name: "Sofia Chen", type: "worker", role: "iOS Developer", rate: 80, isActive: true },
        { id: "tm-011", memberId: "worker-032", name: "Marcus Lee", type: "worker", role: "Android Developer", rate: 78, isActive: true },
        { id: "tm-012", memberId: "worker-033", name: "Priya Patel", type: "worker", role: "React Native Dev", rate: 72, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 75).toISOString(),
    },
    {
      id: "team-003", contractorId: "contractor-001", name: "QA & Testing Team",
      description: "Quality assurance and automated testing",
      members: [
        { id: "tm-020", memberId: "worker-041", name: "Derek Owens", type: "worker", role: "QA Lead", rate: 65, isActive: true },
        { id: "tm-021", memberId: "worker-042", name: "Aisha Nkosi", type: "worker", role: "Automation Engineer", rate: 68, isActive: true },
        { id: "tm-022", memberId: "contractor-003", name: "Victor Crane", type: "contractor", role: "Test Architect", rate: 95, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
    },
    {
      id: "team-004", contractorId: "contractor-001", name: "DevOps Crew",
      description: "Infrastructure, CI/CD and cloud operations",
      members: [
        { id: "tm-030", memberId: "worker-051", name: "Nathan Brooks", type: "worker", role: "DevOps Engineer", rate: 85, isActive: true },
        { id: "tm-031", memberId: "worker-052", name: "Elena Russo", type: "worker", role: "Cloud Architect", rate: 92, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 50).toISOString(),
    },
    {
      id: "team-005", contractorId: "contractor-001", name: "Design Studio",
      description: "Brand, visual and product design",
      members: [
        { id: "tm-040", memberId: "worker-061", name: "Camille Dufour", type: "worker", role: "Brand Designer", rate: 65, isActive: true },
        { id: "tm-041", memberId: "worker-062", name: "Jordan Hayes", type: "worker", role: "Motion Designer", rate: 70, isActive: true },
        { id: "tm-042", memberId: "contractor-004", name: "Ingrid Holm", type: "contractor", role: "Creative Director", rate: 110, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    },
    {
      id: "team-006", contractorId: "contractor-001", name: "Backend Engineering",
      description: "API and microservices team",
      members: [
        { id: "tm-050", memberId: "worker-071", name: "Hassan Ali", type: "worker", role: "Senior Backend Dev", rate: 80, isActive: true },
        { id: "tm-051", memberId: "worker-072", name: "Yuki Tanaka", type: "worker", role: "Database Engineer", rate: 75, isActive: true },
        { id: "tm-052", memberId: "worker-073", name: "Ben Carter", type: "worker", role: "API Specialist", rate: 70, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 40).toISOString(),
    },
    {
      id: "team-007", contractorId: "contractor-001", name: "Data Analytics Team",
      description: "Data science and business intelligence",
      members: [
        { id: "tm-060", memberId: "worker-081", name: "Rachel Kim", type: "worker", role: "Data Scientist", rate: 88, isActive: true },
        { id: "tm-061", memberId: "worker-082", name: "Omar Hassan", type: "worker", role: "BI Analyst", rate: 72, isActive: true },
        { id: "tm-062", memberId: "contractor-005", name: "Pavel Novak", type: "contractor", role: "Data Architect", rate: 105, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
    },
    {
      id: "team-008", contractorId: "contractor-001", name: "Security Team",
      description: "Cybersecurity and compliance",
      members: [
        { id: "tm-070", memberId: "worker-091", name: "Diana Wolf", type: "worker", role: "Security Analyst", rate: 90, isActive: true },
        { id: "tm-071", memberId: "worker-092", name: "Carlos Vega", type: "worker", role: "Penetration Tester", rate: 95, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
    {
      id: "team-009", contractorId: "contractor-001", name: "Infrastructure Team",
      description: "Network and on-premise infrastructure",
      members: [
        { id: "tm-080", memberId: "worker-101", name: "Tom Fischer", type: "worker", role: "Network Engineer", rate: 77, isActive: true },
        { id: "tm-081", memberId: "worker-102", name: "Lena Hoffman", type: "worker", role: "Systems Admin", rate: 65, isActive: true },
        { id: "tm-082", memberId: "contractor-006", name: "Roy Steele", type: "contractor", role: "Infrastructure Lead", rate: 100, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    },
    {
      id: "team-010", contractorId: "contractor-001", name: "Product Team",
      description: "Product strategy and roadmap execution",
      members: [
        { id: "tm-090", memberId: "worker-111", name: "Nadia Obi", type: "worker", role: "Product Manager", rate: 85, isActive: true },
        { id: "tm-091", memberId: "worker-112", name: "Ethan Moore", type: "worker", role: "Scrum Master", rate: 75, isActive: true },
        { id: "tm-092", memberId: "contractor-007", name: "Sara Quinn", type: "contractor", role: "VP of Product", rate: 120, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
  ]],
  ["contractor-002", [
    {
      id: "team-c2-001", contractorId: "contractor-002", name: "Cleaning Services Crew",
      description: "Professional cleaning team",
      members: [
        { id: "tm-c2-001", memberId: "worker-024", name: "Sarah Johnson", type: "worker", role: "Team Lead", rate: 40, isActive: true },
        { id: "tm-c2-002", memberId: "worker-025", name: "David Lee", type: "worker", role: "Cleaner", rate: 30, isActive: true },
      ],
      createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    },
  ]],
]);

const payrollRecords = new Map();

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const contractorId = searchParams.get("contractorId") || "contractor-001";

  let result = { available: [], assignedProjects: [], teams: [], subprojects: [], payroll: [] };

  if (type === "available") {
    const projectsState = getProjectsState();
    let available = allProjects.filter(p => p.contractorOnly === true && p.status === "POSTED");
    available = available.map(proj => {
      const stateProject = projectsState.get(proj.id);
      return stateProject || proj;
    });
    result.available = available;
  }

  if (type === "assigned" || !type) {
    let assignedProjects = allProjects.filter(p =>
      p.contractorId === contractorId && p.contractorOnly === true
    );
    const projectsState = getProjectsState();
    assignedProjects = assignedProjects.map(proj => {
      const stateProject = projectsState.get(proj.id);
      return stateProject || proj;
    });
    result.assignedProjects = assignedProjects;
  }

  if (type === "team" || !type) {
    result.teams = contractorTeams.get(contractorId) || [];
  }

  if (type === "invites") {
    result.invites = contractorInvites.get(contractorId) || [];
    return Response.json({ success: true, data: result });
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

  return Response.json({ success: true, data: result });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const contractorId = body.contractorId || "contractor-001";

  if (body.action === "addTeamMember") {
    const teams = contractorTeams.get(contractorId) || [];
    const team = body.teamId ? teams.find(t => t.id === body.teamId) : teams[0];
    if (!team) {
      return Response.json({ success: false, error: "Team not found" }, { status: 404 });
    }
    team.members.push({
      id: `tm-${Date.now()}`,
      memberId: body.memberId,
      name: body.name,
      type: body.type || "worker",
      role: body.role || "Member",
      rate: parseFloat(body.rate) || 25,
      isActive: true,
    });
    return Response.json({ success: true, data: team });
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
  const teams = contractorTeams.get(contractorId) || [];

  if (body.action === "respondTeamInvite") {
    const { inviteId, status } = body;
    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return Response.json({ success: false, error: "Invalid status" }, { status: 400 });
    }
    const invites = contractorInvites.get(contractorId) || [];
    const idx = invites.findIndex(i => i.id === inviteId);
    if (idx === -1) return Response.json({ success: false, error: "Invite not found" }, { status: 404 });
    invites.splice(idx, 1);
    return Response.json({ success: true });
  }

  if (body.action === "removeTeamMember") {
    const team = body.teamId ? teams.find(t => t.id === body.teamId) : teams.find(t => t.members.some(m => m.id === body.memberId));
    if (team) {
      team.members = team.members.filter(m => m.id !== body.memberId);
      return Response.json({ success: true, data: team });
    }
  }

  if (body.action === "updateTeamMember") {
    const team = teams.find(t => t.members.some(m => m.id === body.memberId));
    if (team) {
      const member = team.members.find(m => m.id === body.memberId);
      if (member) {
        Object.assign(member, body.updates);
        return Response.json({ success: true, data: team });
      }
    }
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
