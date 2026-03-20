const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (credentials) => {
      await delay(500);
      return { success: true, user: { id: 'user-001', role: 'client' } };
    },
    register: async (userData) => {
      await delay(500);
      return { success: true, user: { id: `user-${Date.now()}`, ...userData } };
    },
    verifyOTP: async (otp) => {
      await delay(300);
      return { success: true };
    },
  },
  
  client: {
    createTask: async (taskData) => {
      await delay(500);
      return { success: true, taskId: `task-${Date.now()}` };
    },
    fundEscrow: async (taskId, amount) => {
      await delay(800);
      return { success: true, transactionId: `txn-${Date.now()}` };
    },
    acceptOffer: async (offerId) => {
      await delay(500);
      return { success: true };
    },
    releasePayment: async (taskId) => {
      await delay(800);
      return { success: true, transactionId: `txn-${Date.now()}` };
    },
    raiseDispute: async (taskId, reason) => {
      await delay(500);
      return { success: true, disputeId: `dispute-${Date.now()}` };
    },
    editTask: async (taskId, taskData) => {
      await delay(500);
      return { success: true };
    },
  },
  
  worker: {
    submitOffer: async (taskId, offerData) => {
      await delay(500);
      return { success: true, offerId: `offer-${Date.now()}` };
    },
    acceptTask: async (taskId) => {
      await delay(500);
      return { success: true };
    },
    completeTask: async (taskId) => {
      await delay(500);
      return { success: true };
    },
    updateProfile: async (profileData) => {
      await delay(500);
      return { success: true };
    },
    withdrawOffer: async (offerId) => {
      await delay(500);
      return { success: true };
    },
  },
  
  contractor: {
    applyForTask: async (taskId, applicationData) => {
      await delay(500);
      return { success: true, applicationId: `app-${Date.now()}` };
    },
    createTeam: async (teamData) => {
      await delay(500);
      return { success: true, teamId: `team-${Date.now()}` };
    },
    addTeamMember: async (teamId, memberData) => {
      await delay(500);
      return { success: true, memberId: `member-${Date.now()}` };
    },
    removeTeamMember: async (memberId) => {
      await delay(500);
      return { success: true };
    },
    assignSubtask: async (taskId, memberId, subtaskData) => {
      await delay(500);
      return { success: true, subtaskId: `subtask-${Date.now()}` };
    },
    distributePayment: async (taskId, distributions) => {
      await delay(800);
      return { success: true, transactionIds: distributions.map(() => `txn-${Date.now()}`) };
    },
    updateTeamProfile: async (teamData) => {
      await delay(500);
      return { success: true };
    },
  },
  
  escrow: {
    fund: async (taskId, amount) => {
      await delay(1000);
      return { success: true, escrowId: `escrow-${Date.now()}` };
    },
    release: async (escrowId) => {
      await delay(1000);
      return { success: true };
    },
    refund: async (escrowId) => {
      await delay(1000);
      return { success: true };
    },
  },
};

export default api;
