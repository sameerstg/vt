import { ESCROW_STATUS } from '@/modules/shared/utils/taskStates';

export const veritaskEscrow = [
  {
    id: 'escrow-001',
    taskId: 'task-002',
    amount: 200,
    status: ESCROW_STATUS.FUNDED,
    fundedAt: '2026-03-17T17:00:00Z',
    releasedAt: null,
  },
  {
    id: 'escrow-002',
    taskId: 'task-003',
    amount: 1500,
    status: ESCROW_STATUS.FUNDED,
    fundedAt: '2026-03-15T11:00:00Z',
    releasedAt: null,
  },
  {
    id: 'escrow-003',
    taskId: 'task-004',
    amount: 800,
    status: ESCROW_STATUS.FUNDED,
    fundedAt: '2026-03-10T14:00:00Z',
    releasedAt: null,
  },
  {
    id: 'escrow-004',
    taskId: 'task-005',
    amount: 400,
    status: ESCROW_STATUS.RELEASED,
    fundedAt: '2026-03-05T17:00:00Z',
    releasedAt: '2026-03-20T10:00:00Z',
  },
];

export const getEscrowByTask = (taskId) => veritaskEscrow.find(escrow => escrow.taskId === taskId);
export const getFundedEscrow = () => veritaskEscrow.filter(escrow => escrow.status === ESCROW_STATUS.FUNDED);
export const getReleasedEscrow = () => veritaskEscrow.filter(escrow => escrow.status === ESCROW_STATUS.RELEASED);
