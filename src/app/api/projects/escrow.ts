export interface Escrow {
  id: string;
  projectId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: "PENDING" | "FUNDED" | "PARTIALLY_RELEASED" | "RELEASED" | "REFUNDED";
  fundedAt?: string;
  releasedAt?: string;
}

export const escrowAccounts: Escrow[] = [
  // ONGOING (IN_PROGRESS) projects - funded escrow
  {
    id: "escrow-011",
    projectId: "proj-011",
    amount: 800.00,
    platformFee: 40.00,
    netAmount: 760.00,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 13).toISOString(),
  },
  {
    id: "escrow-012",
    projectId: "proj-012",
    amount: 3500.00,
    platformFee: 175.00,
    netAmount: 3325.00,
    status: "PARTIALLY_RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 29).toISOString(),
  },
  {
    id: "escrow-013",
    projectId: "proj-013",
    amount: 450.00,
    platformFee: 22.50,
    netAmount: 427.50,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
  },
  {
    id: "escrow-014",
    projectId: "proj-014",
    amount: 2000.00,
    platformFee: 100.00,
    netAmount: 1900.00,
    status: "PARTIALLY_RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "escrow-015",
    projectId: "proj-015",
    amount: 300.00,
    platformFee: 15.00,
    netAmount: 285.00,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "escrow-016",
    projectId: "proj-016",
    amount: 1500.00,
    platformFee: 75.00,
    netAmount: 1425.00,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    id: "escrow-017",
    projectId: "proj-017",
    amount: 400.00,
    platformFee: 20.00,
    netAmount: 380.00,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: "escrow-018",
    projectId: "proj-018",
    amount: 12000.00,
    platformFee: 600.00,
    netAmount: 11400.00,
    status: "PARTIALLY_RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 44).toISOString(),
  },
  {
    id: "escrow-019",
    projectId: "proj-019",
    amount: 750.00,
    platformFee: 37.50,
    netAmount: 712.50,
    status: "FUNDED",
    fundedAt: new Date(Date.now() - 86400000 * 11).toISOString(),
  },
  {
    id: "escrow-020",
    projectId: "proj-020",
    amount: 1800.00,
    platformFee: 90.00,
    netAmount: 1710.00,
    status: "PARTIALLY_RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 17).toISOString(),
  },

  // COMPLETED projects - released escrow
  {
    id: "escrow-021",
    projectId: "proj-021",
    amount: 3500.00,
    platformFee: 175.00,
    netAmount: 3325.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 85).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: "escrow-022",
    projectId: "proj-022",
    amount: 2800.00,
    platformFee: 140.00,
    netAmount: 2660.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 115).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: "escrow-023",
    projectId: "proj-023",
    amount: 200.00,
    platformFee: 10.00,
    netAmount: 190.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 95).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: "escrow-024",
    projectId: "proj-024",
    amount: 600.00,
    platformFee: 30.00,
    netAmount: 570.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 48).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "escrow-025",
    projectId: "proj-025",
    amount: 5500.00,
    platformFee: 275.00,
    netAmount: 5225.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 145).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 75).toISOString(),
  },
  {
    id: "escrow-026",
    projectId: "proj-026",
    amount: 1250.00,
    platformFee: 62.50,
    netAmount: 1187.50,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 38).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: "escrow-027",
    projectId: "proj-027",
    amount: 350.00,
    platformFee: 17.50,
    netAmount: 332.50,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 52).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 25).toISOString(),
  },
  {
    id: "escrow-028",
    projectId: "proj-028",
    amount: 4500.00,
    platformFee: 225.00,
    netAmount: 4275.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 105).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 50).toISOString(),
  },
  {
    id: "escrow-029",
    projectId: "proj-029",
    amount: 275.00,
    platformFee: 13.75,
    netAmount: 261.25,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 28).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: "escrow-030",
    projectId: "proj-030",
    amount: 800.00,
    platformFee: 40.00,
    netAmount: 760.00,
    status: "RELEASED",
    fundedAt: new Date(Date.now() - 86400000 * 78).toISOString(),
    releasedAt: new Date(Date.now() - 86400000 * 35).toISOString(),
  },
];

export function getEscrowByProjectId(projectId: string): Escrow | undefined {
  return escrowAccounts.find(e => e.projectId === projectId);
}

export function getAllEscrow(): Escrow[] {
  return escrowAccounts;
}

export function addEscrow(escrowData: Omit<Escrow, "id">): Escrow {
  const escrow: Escrow = {
    ...escrowData,
    id: `escrow-${Date.now()}`,
  };
  escrowAccounts.push(escrow);
  return escrow;
}

export function updateEscrowStatus(projectId: string, status: Escrow["status"]): Escrow | undefined {
  const index = escrowAccounts.findIndex(e => e.projectId === projectId);
  if (index === -1) return undefined;
  
  escrowAccounts[index].status = status;
  if (status === "RELEASED") {
    escrowAccounts[index].releasedAt = new Date().toISOString();
  }
  return escrowAccounts[index];
}
