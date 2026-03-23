const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const d = (daysAgo) => new Date(Date.now() - 86400000 * daysAgo).toISOString();
const dl = (daysAhead) => new Date(Date.now() + 86400000 * daysAhead).toISOString().slice(0, 10);

const assignments = new Map([
  // PENDING (5)
  ["asgn-p1", { id: "asgn-p1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: null, pay: 800, deadline: dl(14), status: "PENDING", note: "Handle the frontend module", createdAt: d(1) }],
  ["asgn-p1b", { id: "asgn-p1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Scheduling Module", pay: 700, deadline: dl(16), status: "PENDING", note: "Build appointment scheduling feature", createdAt: d(1) }],
  ["asgn-p1c", { id: "asgn-p1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Settings Page", pay: 500, deadline: dl(10), status: "PENDING", note: null, createdAt: d(2) }],
  ["asgn-p1d", { id: "asgn-p1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 1000, deadline: dl(21), status: "PENDING", note: "Shipping label generation", createdAt: d(1) }],
  ["asgn-p1e", { id: "asgn-p1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Dashboard Widgets", pay: 650, deadline: dl(11), status: "PENDING", note: null, createdAt: d(3) }],
  ["asgn-p2", { id: "asgn-p2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "UI Phase", pay: 650, deadline: dl(10), status: "PENDING", note: "Design the patient portal screens", createdAt: d(2) }],
  ["asgn-p3", { id: "asgn-p3", contractorId: "contractor-001", workerId: "worker-023", workerName: "James Wilson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: null, pay: 1200, deadline: dl(20), status: "PENDING", note: "Backend API integration", createdAt: d(1) }],
  ["asgn-p4", { id: "asgn-p4", contractorId: "contractor-001", workerId: "worker-031", workerName: "Sofia Chen", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Mobile App", pay: 900, deadline: dl(18), status: "PENDING", note: null, createdAt: d(3) }],
  ["asgn-p5", { id: "asgn-p5", contractorId: "contractor-001", workerId: "worker-032", workerName: "Marcus Lee", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Android Client", pay: 750, deadline: dl(12), status: "PENDING", note: "Android client for ERP", createdAt: d(1) }],

  // ACCEPTED (5)
  ["asgn-a1", { id: "asgn-a1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: "ms-C11-1", milestoneTitle: "Design Phase", pay: 400, deadline: dl(7), status: "ACCEPTED", note: null, createdAt: d(5) }],
  ["asgn-a1b", { id: "asgn-a1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Module Config", pay: 600, deadline: dl(9), status: "ACCEPTED", note: "Configure user roles and permissions", createdAt: d(4) }],
  ["asgn-a1c", { id: "asgn-a1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Data Layer", pay: 750, deadline: dl(12), status: "ACCEPTED", note: null, createdAt: d(3) }],
  ["asgn-a1d", { id: "asgn-a1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(6), status: "ACCEPTED", note: "Inventory sync component", createdAt: d(6) }],
  ["asgn-a1e", { id: "asgn-a1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Auth Module", pay: 850, deadline: dl(14), status: "ACCEPTED", note: null, createdAt: d(2) }],
  ["asgn-a2", { id: "asgn-a2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 550, deadline: dl(9), status: "ACCEPTED", note: "Complete dashboard redesign", createdAt: d(4) }],
  ["asgn-a3", { id: "asgn-a3", contractorId: "contractor-001", workerId: "worker-041", workerName: "Derek Owens", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "QA Sprint 1", pay: 700, deadline: dl(5), status: "ACCEPTED", note: null, createdAt: d(6) }],
  ["asgn-a4", { id: "asgn-a4", contractorId: "contractor-001", workerId: "worker-051", workerName: "Nathan Brooks", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "DevOps Setup", pay: 850, deadline: dl(11), status: "ACCEPTED", note: "Set up CI/CD pipeline", createdAt: d(3) }],
  ["asgn-a5", { id: "asgn-a5", contractorId: "contractor-001", workerId: "worker-081", workerName: "Rachel Kim", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: null, pay: 950, deadline: dl(15), status: "ACCEPTED", note: "Analytics dashboard", createdAt: d(2) }],

  // IN_PROGRESS (5)
  ["asgn-i1", { id: "asgn-i1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Frontend Sprint", pay: 1100, deadline: dl(4), status: "IN_PROGRESS", note: null, createdAt: d(10) }],
  ["asgn-i1b", { id: "asgn-i1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Reporting Module", pay: 950, deadline: dl(5), status: "IN_PROGRESS", note: "Generate PDF reports for finance team", createdAt: d(8) }],
  ["asgn-i1c", { id: "asgn-i1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(3), status: "IN_PROGRESS", note: null, createdAt: d(9) }],
  ["asgn-i1d", { id: "asgn-i1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Scanner Integration", pay: 1200, deadline: dl(7), status: "IN_PROGRESS", note: "Barcode scanner API integration", createdAt: d(7) }],
  ["asgn-i1e", { id: "asgn-i1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Notification System", pay: 800, deadline: dl(6), status: "IN_PROGRESS", note: null, createdAt: d(6) }],
  ["asgn-i2", { id: "asgn-i2", contractorId: "contractor-001", workerId: "worker-023", workerName: "James Wilson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "API Layer", pay: 1300, deadline: dl(6), status: "IN_PROGRESS", note: "Core REST API endpoints", createdAt: d(8) }],
  ["asgn-i3", { id: "asgn-i3", contractorId: "contractor-001", workerId: "worker-061", workerName: "Camille Dufour", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Brand Identity", pay: 600, deadline: dl(3), status: "IN_PROGRESS", note: null, createdAt: d(7) }],
  ["asgn-i4", { id: "asgn-i4", contractorId: "contractor-001", workerId: "worker-071", workerName: "Hassan Ali", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: "ms-C12-2", milestoneTitle: "Database Schema", pay: 800, deadline: dl(5), status: "IN_PROGRESS", note: "Schema design and migrations", createdAt: d(9) }],
  ["asgn-i5", { id: "asgn-i5", contractorId: "contractor-001", workerId: "worker-091", workerName: "Diana Wolf", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Security Audit", pay: 1500, deadline: dl(8), status: "IN_PROGRESS", note: "Pen test and security review", createdAt: d(6) }],

  // IN_REVIEW (5)
  ["asgn-r1", { id: "asgn-r1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: "ms-C11-1", milestoneTitle: "Design Phase", pay: 400, deadline: dl(-1), status: "IN_REVIEW", note: null, createdAt: d(15) }],
  ["asgn-r1b", { id: "asgn-r1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Search Feature", pay: 650, deadline: dl(-2), status: "IN_REVIEW", note: "Full-text search with filters", createdAt: d(13) }],
  ["asgn-r1c", { id: "asgn-r1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(0), status: "IN_REVIEW", note: null, createdAt: d(12) }],
  ["asgn-r1d", { id: "asgn-r1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Export Module", pay: 750, deadline: dl(-3), status: "IN_REVIEW", note: "CSV and Excel export functionality", createdAt: d(14) }],
  ["asgn-r1e", { id: "asgn-r1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "User Onboarding", pay: 900, deadline: dl(-1), status: "IN_REVIEW", note: null, createdAt: d(11) }],
  ["asgn-r2", { id: "asgn-r2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(-2), status: "IN_REVIEW", note: "UI components delivered", createdAt: d(14) }],
  ["asgn-r3", { id: "asgn-r3", contractorId: "contractor-001", workerId: "worker-041", workerName: "Derek Owens", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "QA Report", pay: 600, deadline: dl(0), status: "IN_REVIEW", note: "Full QA report submitted", createdAt: d(12) }],
  ["asgn-r4", { id: "asgn-r4", contractorId: "contractor-001", workerId: "worker-071", workerName: "Hassan Ali", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "API Docs", pay: 450, deadline: dl(-3), status: "IN_REVIEW", note: null, createdAt: d(13) }],
  ["asgn-r5", { id: "asgn-r5", contractorId: "contractor-001", workerId: "worker-081", workerName: "Rachel Kim", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Analytics Module", pay: 950, deadline: dl(-1), status: "IN_REVIEW", note: "Dashboard + export ready", createdAt: d(11) }],

  // DECLINED (5)
  ["asgn-d1", { id: "asgn-d1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-003", projectTitle: "Mobile App for Food Delivery", milestoneId: null, milestoneTitle: null, pay: 600, deadline: dl(30), status: "DECLINED", note: "Backend API integration work", createdAt: d(7) }],
  ["asgn-d1b", { id: "asgn-d1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Legacy Migration", pay: 1100, deadline: dl(20), status: "DECLINED", note: null, createdAt: d(9) }],
  ["asgn-d1c", { id: "asgn-d1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Billing Module", pay: 800, deadline: dl(25), status: "DECLINED", note: "Out of scope for current sprint", createdAt: d(10) }],
  ["asgn-d1d", { id: "asgn-d1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(18), status: "DECLINED", note: null, createdAt: d(8) }],
  ["asgn-d1e", { id: "asgn-d1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Localization", pay: 950, deadline: dl(28), status: "DECLINED", note: "i18n and multi-language support", createdAt: d(6) }],
  ["asgn-d2", { id: "asgn-d2", contractorId: "contractor-001", workerId: "worker-033", workerName: "Priya Patel", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "React Native", pay: 700, deadline: dl(25), status: "DECLINED", note: null, createdAt: d(10) }],
  ["asgn-d3", { id: "asgn-d3", contractorId: "contractor-001", workerId: "worker-042", workerName: "Aisha Nkosi", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(20), status: "DECLINED", note: "Automation testing scope", createdAt: d(9) }],
  ["asgn-d4", { id: "asgn-d4", contractorId: "contractor-001", workerId: "worker-052", workerName: "Elena Russo", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Cloud Migration", pay: 1400, deadline: dl(35), status: "DECLINED", note: null, createdAt: d(8) }],
  ["asgn-d5", { id: "asgn-d5", contractorId: "contractor-001", workerId: "worker-062", workerName: "Jordan Hayes", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Motion Design", pay: 550, deadline: dl(22), status: "DECLINED", note: "Motion design for onboarding", createdAt: d(6) }],
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
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "PENDING") return Response.json({ success: false, error: "Assignment already responded to" }, { status: 400 });
    record.status = status;
    assignments.set(assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "start") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "ACCEPTED") return Response.json({ success: false, error: "Only ACCEPTED assignments can be started" }, { status: 400 });
    record.status = "IN_PROGRESS";
    assignments.set(body.assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "submit") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "IN_PROGRESS") return Response.json({ success: false, error: "Only IN_PROGRESS assignments can be submitted" }, { status: 400 });
    record.status = "IN_REVIEW";
    assignments.set(body.assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "cancel") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "PENDING") return Response.json({ success: false, error: "Cannot cancel a responded assignment" }, { status: 400 });
    assignments.delete(body.assignmentId);
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
