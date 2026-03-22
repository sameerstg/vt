import { getEscrowByProjectId } from '../../projects';
import { getProjectsState } from '../../uiState';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(request) {
  await delay(300);
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get("projectId");
  
  if (projectId) {
    let escrow = getEscrowByProjectId(projectId);
    
    const state = getProjectsState();
    const projectState = state.get(projectId);
    if (projectState?.escrow) {
      escrow = projectState.escrow;
    }
    
    return Response.json({
      success: true,
      data: escrow ? [escrow] : [],
    });
  }
  
  return Response.json({
    success: true,
    data: [],
  });
}

export async function POST(request) {
  await delay(800);
  const body = await request.json();
  const state = getProjectsState();
  
  const newEscrow = {
    id: `escrow-${Date.now()}`,
    projectId: body.projectId,
    amount: parseFloat(body.amount) || 0,
    platformFee: parseFloat(body.amount) * 0.05 || 0,
    netAmount: parseFloat(body.amount) * 0.95 || 0,
    status: "FUNDED",
    fundedAt: new Date().toISOString(),
  };
  
  const project = state.get(body.projectId) || {};
  state.set(body.projectId, { ...project, escrow: newEscrow });
  
  return Response.json({
    success: true,
    data: newEscrow,
  });
}
