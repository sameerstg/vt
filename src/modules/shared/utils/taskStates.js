export const TASK_STATES = {
  POSTED: 'posted',
  APPLICATIONS_RECEIVED: 'applications_received',
  OFFER_ACCEPTED: 'offer_accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DISPUTED: 'disputed',
};

export const TASK_STATE_LABELS = {
  [TASK_STATES.POSTED]: 'Open',
  [TASK_STATES.APPLICATIONS_RECEIVED]: 'Applications',
  [TASK_STATES.OFFER_ACCEPTED]: 'Assigned',
  [TASK_STATES.IN_PROGRESS]: 'In Progress',
  [TASK_STATES.COMPLETED]: 'Completed',
  [TASK_STATES.DISPUTED]: 'Disputed',
};

export const TASK_STATE_BADGES = {
  [TASK_STATES.POSTED]: 'badge-open',
  [TASK_STATES.APPLICATIONS_RECEIVED]: 'badge-applications',
  [TASK_STATES.OFFER_ACCEPTED]: 'badge-assigned',
  [TASK_STATES.IN_PROGRESS]: 'badge-in-progress',
  [TASK_STATES.COMPLETED]: 'badge-completed',
  [TASK_STATES.DISPUTED]: 'badge-disputed',
};

export const TASK_TYPES = {
  PHYSICAL: 'physical',
  VIRTUAL: 'virtual',
};

export const BUDGET_MODELS = {
  FIXED: 'fixed',
  MILESTONE: 'milestone',
};

export const URGENCY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const OFFER_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const USER_ROLES = {
  CLIENT: 'client',
  WORKER: 'worker',
  CONTRACTOR: 'contractor',
  ADMIN: 'admin',
};

export const ESCROW_STATUS = {
  PENDING: 'pending',
  FUNDED: 'funded',
  RELEASED: 'released',
  REFUNDED: 'refunded',
};
