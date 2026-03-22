import { getMilestonesByProjectId, milestones as allMilestones } from '../../projects';
import { getMilestonesState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const contractorProjectIds = [
  "proj-C09", "proj-C10", "proj-C11", "proj-C12",
  "proj-C13", "proj-C14", "proj-C15",
];

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");

  let filteredMilestones;
  if (projectId) {
    filteredMilestones = getMilestonesByProjectId(projectId);
  } else {
    filteredMilestones = allMilestones.filter(m => contractorProjectIds.includes(m.projectId));
  }

  const milestonesState = getMilestonesState();
  filteredMilestones = filteredMilestones.map(ms => {
    const stateMs = milestonesState.get(ms.id);
    return stateMs || ms;
  });

  return Response.json({
    success: true,
    data: filteredMilestones,
  });
}

export async function PUT(request) {
  await delay(400);
  const body = await request.json();
  const milestonesState = getMilestonesState();

  const milestone = milestonesState.get(body.milestoneId) || allMilestones.find(m => m.id === body.milestoneId);

  if (!milestone) {
    return Response.json({ success: false, error: "Milestone not found" }, { status: 404 });
  }

  if (body.action === "start") {
    milestone.status = "IN_PROGRESS";
  } else if (body.action === "submit") {
    milestone.status = "SUBMITTED";
    milestone.submittedAt = new Date().toISOString();
  } else if (body.action === "complete") {
    milestone.status = "APPROVED";
    milestone.approvedAt = new Date().toISOString();
  }

  milestonesState.set(milestone.id, milestone);

  return Response.json({ success: true, data: milestone });
}
