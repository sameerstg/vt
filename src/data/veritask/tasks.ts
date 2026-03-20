import { TASK_STATES, TASK_TYPES, BUDGET_MODELS, URGENCY_LEVELS } from '@/modules/shared/utils/taskStates';

type TaskState = "posted" | "applications_received" | "offer_accepted" | "in_progress" | "completed" | "disputed";
type TaskType = "physical" | "virtual";
type BudgetModel = "fixed" | "milestone";
type UrgencyLevel = "low" | "medium" | "high";

interface TaskLocation {
  lat: number;
  lng: number;
  address: string;
}

interface TaskBudget {
  model: BudgetModel;
  amount: number;
  milestones?: { id: string; name: string; amount: number }[];
}

interface TaskSchedule {
  date: string;
  timeWindow: string;
}

interface TaskEscrow {
  funded: boolean;
  amount: number;
  released: boolean;
}

interface VeritaskTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  location: TaskLocation | null;
  budget: TaskBudget;
  urgency: UrgencyLevel;
  schedule: TaskSchedule;
  status: TaskState;
  clientId: string;
  assignedWorkerId: string | null;
  escrow: TaskEscrow;
  createdAt: string;
  category: string;
  applications?: string[];
}

export const veritaskTasks: VeritaskTask[] = [
  {
    id: 'task-001',
    title: 'Product Photography for E-commerce',
    description: 'Need professional photos of 20 products for my online store. Products include clothing items and accessories. Must be on white background.',
    type: TASK_TYPES.PHYSICAL as TaskType,
    location: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, New York, NY' },
    budget: { model: BUDGET_MODELS.FIXED as BudgetModel, amount: 500 },
    urgency: URGENCY_LEVELS.MEDIUM as UrgencyLevel,
    schedule: { date: '2026-03-25', timeWindow: '10:00 AM - 2:00 PM' },
    status: TASK_STATES.POSTED as TaskState,
    clientId: 'client-001',
    assignedWorkerId: null,
    escrow: { funded: false, amount: 500, released: false },
    createdAt: '2026-03-18T10:00:00Z',
    category: 'Photography',
  },
  {
    id: 'task-002',
    title: 'Deep House Cleaning',
    description: 'Full house cleaning needed including kitchen deep clean, bathroom sanitization, and general tidying. 3 bedroom house.',
    type: TASK_TYPES.PHYSICAL as TaskType,
    location: { lat: 40.6782, lng: -73.9442, address: 'Brooklyn, NY' },
    budget: { model: BUDGET_MODELS.FIXED as BudgetModel, amount: 200 },
    urgency: URGENCY_LEVELS.HIGH as UrgencyLevel,
    schedule: { date: '2026-03-22', timeWindow: '9:00 AM - 1:00 PM' },
    status: TASK_STATES.APPLICATIONS_RECEIVED as TaskState,
    clientId: 'client-002',
    assignedWorkerId: null,
    escrow: { funded: true, amount: 200, released: false },
    createdAt: '2026-03-17T14:30:00Z',
    category: 'Cleaning',
    applications: ['worker-002'],
  },
  {
    id: 'task-003',
    title: 'Website Development for Small Business',
    description: 'Need a 5-page website for a local bakery. Include home, about, menu, gallery, and contact pages. Mobile responsive required.',
    type: TASK_TYPES.VIRTUAL as TaskType,
    location: null,
    budget: { model: BUDGET_MODELS.FIXED as BudgetModel, amount: 1500 },
    urgency: URGENCY_LEVELS.LOW as UrgencyLevel,
    schedule: { date: '2026-04-01', timeWindow: 'Flexible' },
    status: TASK_STATES.OFFER_ACCEPTED as TaskState,
    clientId: 'client-001',
    assignedWorkerId: 'worker-003',
    escrow: { funded: true, amount: 1500, released: false },
    createdAt: '2026-03-15T09:00:00Z',
    category: 'Web Development',
  },
  {
    id: 'task-004',
    title: 'Event Photography - Corporate Conference',
    description: 'Need photographer for 4-hour corporate conference. Need candid shots, speaker photos, and group photos.',
    type: TASK_TYPES.PHYSICAL as TaskType,
    location: { lat: 40.7580, lng: -73.9855, address: 'Times Square, NY' },
    budget: { model: BUDGET_MODELS.FIXED as BudgetModel, amount: 800 },
    urgency: URGENCY_LEVELS.MEDIUM as UrgencyLevel,
    schedule: { date: '2026-03-28', timeWindow: '2:00 PM - 6:00 PM' },
    status: TASK_STATES.IN_PROGRESS as TaskState,
    clientId: 'client-001',
    assignedWorkerId: 'worker-001',
    escrow: { funded: true, amount: 800, released: false },
    createdAt: '2026-03-10T11:00:00Z',
    category: 'Photography',
  },
  {
    id: 'task-005',
    title: 'Office Relocation Assistance',
    description: 'Need help moving office furniture and equipment to new location. 3 floors down, 2 blocks to new building.',
    type: TASK_TYPES.PHYSICAL as TaskType,
    location: { lat: 40.7484, lng: -73.9857, address: 'Midtown Manhattan, NY' },
    budget: { model: BUDGET_MODELS.FIXED as BudgetModel, amount: 400 },
    urgency: URGENCY_LEVELS.HIGH as UrgencyLevel,
    schedule: { date: '2026-03-23', timeWindow: '8:00 AM - 4:00 PM' },
    status: TASK_STATES.COMPLETED as TaskState,
    clientId: 'client-002',
    assignedWorkerId: 'worker-002',
    escrow: { funded: true, amount: 400, released: true },
    createdAt: '2026-03-05T16:00:00Z',
    category: 'Moving',
  },
  {
    id: 'task-006',
    title: 'Mobile App UI Design',
    description: 'Need UI designs for fitness tracking mobile app. Include onboarding, dashboard, workout logging, and profile screens.',
    type: TASK_TYPES.VIRTUAL as TaskType,
    location: null,
    budget: { model: BUDGET_MODELS.MILESTONE as BudgetModel, amount: 2000, milestones: [
      { id: 'm1', name: 'Initial Concepts', amount: 500 },
      { id: 'm2', name: 'UI Mockups', amount: 800 },
      { id: 'm3', name: 'Final Designs', amount: 700 },
    ]},
    urgency: URGENCY_LEVELS.MEDIUM as UrgencyLevel,
    schedule: { date: '2026-04-10', timeWindow: 'Flexible' },
    status: TASK_STATES.POSTED as TaskState,
    clientId: 'client-001',
    assignedWorkerId: null,
    escrow: { funded: false, amount: 2000, released: false },
    createdAt: '2026-03-19T08:00:00Z',
    category: 'Design',
  },
];

export const getTaskById = (id: string): VeritaskTask | undefined => veritaskTasks.find(task => task.id === id);
export const getTasksByClient = (clientId: string): VeritaskTask[] => veritaskTasks.filter(task => task.clientId === clientId);
export const getTasksByWorker = (workerId: string): VeritaskTask[] => veritaskTasks.filter(task => task.assignedWorkerId === workerId);
export const getOpenTasks = (): VeritaskTask[] => veritaskTasks.filter(task => task.status === TASK_STATES.POSTED as TaskState);