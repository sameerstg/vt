import { create } from 'zustand';
import { USER_ROLES } from '@/modules/shared/utils/taskStates';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  userRole: null,

  login: (userData, role) => set({
    user: userData,
    isAuthenticated: true,
    userRole: role,
  }),

  logout: () => set({
    user: null,
    isAuthenticated: false,
    userRole: null,
  }),

  setRole: (role) => set({ userRole: role }),

  getDashboardPath: () => {
    const state = useAuthStore.getState();
    switch (state.userRole) {
      case USER_ROLES.CLIENT:
        return '/client/dashboard';
      case USER_ROLES.WORKER:
        return '/worker/dashboard';
      case USER_ROLES.CONTRACTOR:
        return '/contractor/dashboard';
      default:
        return '/dashboard';
    }
  },
}));

export default useAuthStore;
