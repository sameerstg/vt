const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const assignments = new Map([
  ["asgn-001", {
    id: "asgn-001",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-001",
    projectTitle: "Website Redesign Project",
    milestoneId: null,
    milestoneTitle: null,
    pay: 800,
    deadline: "2026-04-30",
    status: "PENDING",
    note: "Please handle the frontend implementation",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }],
  ["asgn-002", {
    id: "asgn-002",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-001",
    projectTitle: "Website Redesign Project",
    milestoneId: "ms-001",
    milestoneTitle: "Design Phase",
    pay: 400,
    deadline: "2026-04-15",
    status: "ACCEPTED",
    note: null,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  }],
  ["asgn-003", {
    id: "asgn-003",
    contractorId: "contractor-001",
    workerId: "worker-021",
    workerName: "Alex Thompson",
    projectId: "proj-003",
    projectTitle: "Mobile App for Food Delivery",
    milestoneId: null,
    milestoneTitle: null,
    pay: 600,
    deadline: "2026-05-01",
    status: "DECLINED",
    note: "Backend API integration work",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  }],
]);

export async function GET(request) {
  await delay(200);
  const { searchParams } = new URL(request.url);
  const contractorId = searchParams.get("contractorId");
  const workerId = searchParams.get("workerId");

  if (!contractorId && !workerId) {
    return Response.json({ success: true, data: [] });
  }

  let result = Array.from(assignments.values());

  if (contractorId) result = result.filter(a => a.contractorId === contractorId);
  if (workerId) result = result.filter(a => a.workerId === workerId);

  return Response.json({ success: true, data: result });
}

export async function POST(request) {
  await delay(300);
  const body = await request.json();

  if (body.action !== "create") {
    return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
  }

  const { contractorId, workerId, workerName, projectId, projectTitle, pay, deadline } = body;
  if (!contractorId || !workerId || !workerName || !projectId || !projectTitle || !pay || !deadline) {
    return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const id = `asgn-${Date.now()}`;
  const record = {
    id,
    contractorId,
    workerId,
    workerName,
    projectId,
    projectTitle,
    milestoneId: body.milestoneId || null,
    milestoneTitle: body.milestoneTitle || null,
    pay: parseFloat(pay),
    deadline,
    status: "PENDING",
    note: body.note || null,
    createdAt: new Date().toISOString(),
  };

  assignments.set(id, record);
  return Response.json({ success: true, data: record });
}

export async function PUT(request) {
  await delay(200);
  const body = await request.json();

  if (body.action === "respond") {
    const { assignmentId, status } = body;
    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return Response.json({ success: false, error: "Invalid status" }, { status: 400 });
    }
    const record = assignments.get(assignmentId);
    if (!record) {
      return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }
    if (record.status !== "PENDING") {
      return Response.json({ success: false, error: "Assignment already responded to" }, { status: 400 });
    }
    record.status = status;
    assignments.set(assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "cancel") {
    const { assignmentId } = body;
    const record = assignments.get(assignmentId);
    if (!record) {
      return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    }
    if (record.status !== "PENDING") {
      return Response.json({ success: false, error: "Cannot cancel a responded assignment" }, { status: 400 });
    }
    assignments.delete(assignmentId);
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
