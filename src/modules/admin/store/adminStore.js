import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  // State
  users: [],
  disputes: [],
  transactions: [],
  
  // Actions
  setUsers: (users) => set({ users }),
  setDisputes: (disputes) => set({ disputes }),
  setTransactions: (transactions) => set({ transactions }),
  
  // Getters
  getAdminStats: () => {
    const { users, disputes, transactions } = get();
    const totalUsers = users.length;
    const totalDisputes = disputes.length;
    const pendingDisputes = disputes.filter(d => d.status === "pending").length;
    const totalTransactionVolume = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    
    return {
      totalUsers,
      totalDisputes,
      pendingDisputes,
      totalTransactionVolume
    };
  },
  
  // Mock data initialization (in a real app, this would come from an API)
  initialize: () => {
    // Mock users data
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", role: "client", status: "active", avatar: "/images/avatar1.png" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "worker", status: "active", avatar: "/images/avatar2.png" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "contractor", status: "active", avatar: "/images/avatar3.png" },
      { id: 4, name: "Alice Brown", email: "alice@example.com", role: "admin", status: "active", avatar: "/images/avatar4.png" },
    ];
    
    // Mock disputes data
    const mockDisputes = [
      { id: 1, taskId: 101, clientId: 1, workerId: 2, description: "Payment dispute", status: "pending", createdAt: "2026-03-15" },
      { id: 2, taskId: 102, clientId: 1, workerId: 3, description: "Quality issue", status: "resolved", createdAt: "2026-03-10" },
      { id: 3, taskId: 103, clientId: 2, workerId: 1, description: "Late delivery", status: "escalated", createdAt: "2026-03-12" },
    ];
    
    // Mock transactions data
    const mockTransactions = [
      { id: 1, amount: 150.00, date: "2026-03-14", type: "payment", status: "completed" },
      { id: 2, amount: 200.00, date: "2026-03-13", type: "payout", status: "completed" },
      { id: 3, amount: 75.50, date: "2026-03-12", type: "fee", status: "completed" },
      { id: 4, amount: 300.00, date: "2026-03-11", type: "payment", status: "completed" },
    ];
    
    set({ users: mockUsers, disputes: mockDisputes, transactions: mockTransactions });
  }
}));

// Initialize store with mock data
useAdminStore.getState().initialize();

export default useAdminStore;