import { getMilestonesByProjectId } from '../../projects';
import { getMilestonesState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  
  let filteredMilestones = [];
  if (projectId) {
    filteredMilestones = getMilestonesByProjectId(projectId);
  }
  
  const state = getMilestonesState();
  filteredMilestones = filteredMilestones.map(ms => {
    const stateMs = state.get(ms.id);
    return stateMs || ms;
  });
  
  return Response.json({
    success: true,
    data: filteredMilestones,
  });
}

export async function POST(request) {
  await delay(500);
  const body = await request.json();
  const state = getMilestonesState();
  
  if (body.action === "approve") {
    const milestone = getMilestonesByProjectId("").find(m => m.id === body.milestoneId);
    if (milestone) {
      const updatedMilestone = { 
        ...milestone, 
        status: "APPROVED",
        approvedAt: new Date().toISOString()
      };
      state.set(body.milestoneId, updatedMilestone);
      return Response.json({ success: true, data: updatedMilestone });
    }
  }
  
  if (body.action === "create") {
    const newMilestone = {
      id: `ms-${Date.now()}`,
      projectId: body.projectId,
      title: body.title,
      description: body.description || "",
      amount: parseFloat(body.amount) || 0,
      order: 1,
      status: "PENDING",
      dueDate: body.dueDate || null,
    };
    state.set(newMilestone.id, newMilestone);
    return Response.json({ success: true, data: newMilestone });
  }
  
  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
