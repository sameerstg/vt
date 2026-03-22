import { create } from 'zustand';
import { veritaskTasks, getTasksByClient } from '@/data/veritask/tasks';
import { getOffersByTask } from '@/data/veritask/offers';
import { TASK_STATES } from '@/modules/shared/utils/taskStates';

const useClientStore = create((set, get) => ({
  tasks: veritaskTasks,
  currentClientId: 'client-001',
  selectedTask: null,
  offers: [],

  setCurrentClient: (clientId) => set({ currentClientId: clientId }),
  
  selectTask: (task) => set({ selectedTask: task }),
  
  getClientTasks: () => {
    const { currentClientId } = get();
    return getTasksByClient(currentClientId);
  },
  
  getTaskOffers: (taskId) => getOffersByTask(taskId),
  
  createTask: async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      clientId: get().currentClientId,
      status: TASK_STATES.POSTED,
      escrow: { funded: false, amount: taskData.budget.amount, released: false },
      createdAt: new Date().toISOString(),
    };
    set(state => ({ tasks: [...state.tasks, newTask] }));
    return { success: true, task: newTask };
  },
  
  fundEscrow: async (taskId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task => 
        task.id === taskId 
          ? { ...task, escrow: { ...task.escrow, funded: true } }
          : task
      )
    }));
    return { success: true };
  },
  
  acceptOffer: async (offerId, taskId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.OFFER_ACCEPTED, assignedWorkerId: offerId.split('-')[1] }
          : task
      )
    }));
    return { success: true };
  },
  
  releasePayment: async (taskId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.COMPLETED, escrow: { ...task.escrow, released: true } }
          : task
      )
    }));
    return { success: true };
  },
  
  raiseDispute: async (taskId, reason) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, status: TASK_STATES.DISPUTED }
          : task
      )
    }));
    return { success: true };
  },
  
  startTask: async (taskId) => {
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
}));

export default useClientStore;
