interface VeritaskDispute {
  id: string;
  taskId: string;
  clientId: string;
  workerId: string;
  reason: string;
  status: "open" | "resolved" | "closed";
  createdAt: string;
  resolution: string | null;
}

export const veritaskDisputes: VeritaskDispute[] = [
  {
    id: 'dispute-001',
    taskId: 'task-old-001',
    clientId: 'client-001',
    workerId: 'worker-001',
    reason: 'Work quality not as agreed',
    status: 'open',
    createdAt: '2026-02-15T10:00:00Z',
    resolution: null,
  },
];

export const getDisputesByTask = (taskId: string): VeritaskDispute[] => veritaskDisputes.filter(dispute => dispute.taskId === taskId);
export const getDisputesByClient = (clientId: string): VeritaskDispute[] => veritaskDisputes.filter(dispute => dispute.clientId === clientId);
export const getDisputesByWorker = (workerId: string): VeritaskDispute[] => veritaskDisputes.filter(dispute => dispute.workerId === workerId);
