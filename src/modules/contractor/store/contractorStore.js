import { create } from 'zustand';
import { veritaskTasks, getOpenTasks } from '@/data/veritask/tasks';
import { veritaskUsers, getContractors } from '@/data/veritask/users';
import { TASK_STATES } from '@/modules/shared/utils/taskStates';

const useContractorStore = create((set, get) => ({
  tasks: veritaskTasks,
  contractors: getContractors(),
  teamMembers: [],
  currentContractorId: 'contractor-001',
  selectedTask: null,
  profile: veritaskUsers.find(u => u.id === 'contractor-001'),

  setCurrentContractor: (contractorId) => set({ currentContractorId: contractorId }),
  
  selectTask: (task) => set({ selectedTask: task }),
  
  getMyTasks: () => {
    const { currentContractorId } = get();
    return veritaskTasks.filter(task => task.assignedWorkerId === currentContractorId);
  },
  
  getAvailableTasks: () => {
    return veritaskTasks.filter(task => task.status === TASK_STATES.POSTED);
  },
  
  applyForTask: async (taskId, offerData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.APPLICATIONS_RECEIVED }
          : task
      )
    }));
    return { success: true };
  },
  
  addTeamMember: async (memberData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newMember = {
      ...memberData,
      id: `team-${Date.now()}`,
      contractorId: get().currentContractorId,
    };
    set(state => ({ teamMembers: [...state.teamMembers, newMember] }));
    return { success: true, member: newMember };
  },
  
  removeTeamMember: async (memberId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      teamMembers: state.teamMembers.filter(m => m.id !== memberId)
    }));
    return { success: true };
  },
  
  assignSubtask: async (taskId, teamMemberId, subtaskData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  distributePayment: async (taskId, distributions) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },
  
  updateProfile: async (profileData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      profile: { ...state.profile, ...profileData }
    }));
    return { success: true };
  },
}));

export default useContractorStore;
