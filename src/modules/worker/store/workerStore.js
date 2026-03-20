import { create } from 'zustand';
import { veritaskTasks, getOpenTasks } from '@/data/veritask/tasks';
import { veritaskOffers, getOffersByWorker } from '@/data/veritask/offers';
import { veritaskUsers, getUserById } from '@/data/veritask/users';
import { TASK_STATES, OFFER_STATUS } from '@/modules/shared/utils/taskStates';

const useWorkerStore = create((set, get) => ({
  tasks: veritaskTasks,
  offers: veritaskOffers,
  workers: veritaskUsers.filter(u => u.role === 'worker'),
  currentWorkerId: 'worker-001',
  selectedTask: null,
  profile: getUserById('worker-001'),

  setCurrentWorker: (workerId) => set({ 
    currentWorkerId: workerId,
    profile: getUserById(workerId)
  }),
  
  selectTask: (task) => set({ selectedTask: task }),
  
  getOpenTasks: () => {
    return veritaskTasks.filter(task => task.status === TASK_STATES.POSTED);
  },
  
  getMyTasks: () => {
    const { currentWorkerId } = get();
    return veritaskTasks.filter(task => task.assignedWorkerId === currentWorkerId);
  },
  
  getMyOffers: () => {
    const { currentWorkerId } = get();
    return getOffersByWorker(currentWorkerId);
  },
  
  submitOffer: async (taskId, offerData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOffer = {
      id: `offer-${Date.now()}`,
      taskId,
      workerId: get().currentWorkerId,
      amount: offerData.amount,
      terms: offerData.terms,
      status: OFFER_STATUS.PENDING,
      createdAt: new Date().toISOString(),
    };
    set(state => ({
      offers: [...state.offers, newOffer],
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.APPLICATIONS_RECEIVED }
          : task
      )
    }));
    return { success: true, offer: newOffer };
  },
  
  acceptTask: async (taskId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.IN_PROGRESS }
          : task
      )
    }));
    return { success: true };
  },
  
  completeTask: async (taskId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.COMPLETED }
          : task
      )
    }));
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

export default useWorkerStore;
