type UserRole = "client" | "worker" | "contractor";

interface VeritaskUser {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  verified: boolean;
  rating: number;
  skills?: string[];
  completedTasks?: number;
  teamSize?: number;
  completedProjects?: number;
}

export const veritaskUsers: VeritaskUser[] = [
  {
    id: 'client-001',
    role: 'client',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 555-0123',
    location: 'New York, NY',
    avatar: '/images/team/client-1.png',
    verified: true,
    rating: 4.8,
  },
  {
    id: 'client-002',
    role: 'client',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 555-0124',
    location: 'Los Angeles, CA',
    avatar: '/images/team/client-2.png',
    verified: true,
    rating: 4.6,
  },
  {
    id: 'worker-001',
    role: 'worker',
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '+1 555-0125',
    location: 'New York, NY',
    avatar: '/images/team/freelancer-1.png',
    verified: true,
    rating: 4.9,
    skills: ['Photography', 'Photo Editing', 'Event Coverage'],
    completedTasks: 45,
  },
  {
    id: 'worker-002',
    role: 'worker',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 555-0126',
    location: 'Brooklyn, NY',
    avatar: '/images/team/freelancer-2.png',
    verified: true,
    rating: 4.7,
    skills: ['House Cleaning', 'Organizing', 'Moving Help'],
    completedTasks: 32,
  },
  {
    id: 'worker-003',
    role: 'worker',
    name: 'David Park',
    email: 'david.p@email.com',
    phone: '+1 555-0127',
    location: 'Queens, NY',
    avatar: '/images/team/freelancer-3.png',
    verified: true,
    rating: 4.8,
    skills: ['Web Development', 'Graphic Design', 'Content Writing'],
    completedTasks: 67,
  },
  {
    id: 'contractor-001',
    role: 'contractor',
    name: 'Alex Thompson',
    email: 'alex.t@email.com',
    phone: '+1 555-0128',
    location: 'New York, NY',
    avatar: '/images/team/freelancer-4.png',
    verified: true,
    rating: 4.5,
    teamSize: 8,
    completedProjects: 15,
  },
  {
    id: 'contractor-002',
    role: 'contractor',
    name: 'Lisa Martinez',
    email: 'lisa.m@email.com',
    phone: '+1 555-0129',
    location: 'Los Angeles, CA',
    avatar: '/images/team/freelancer-5.png',
    verified: true,
    rating: 4.6,
    teamSize: 5,
    completedProjects: 12,
  },
];

export const getUserById = (id: string): VeritaskUser | undefined => veritaskUsers.find(user => user.id === id);
export const getUsersByRole = (role: UserRole): VeritaskUser[] => veritaskUsers.filter(user => user.role === role);
export const getWorkers = (): VeritaskUser[] => getUsersByRole('worker');
export const getClients = (): VeritaskUser[] => getUsersByRole('client');
export const getContractors = (): VeritaskUser[] => getUsersByRole('contractor');
