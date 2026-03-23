import { create } from "zustand";

const mockUsers = [
  // Clients (10)
  { id: "client-001", name: "Ethan Caldwell", email: "ethan@brightwave.io", role: "client", status: "active", joinedAt: "2025-06-12" },
  { id: "client-002", name: "Sophia Harrington", email: "sophia@harrington.co", role: "client", status: "active", joinedAt: "2025-07-03" },
  { id: "client-003", name: "Liam Nguyen", email: "liam.n@novabuild.com", role: "client", status: "active", joinedAt: "2025-08-15" },
  { id: "client-004", name: "Olivia Marshall", email: "olivia@marshallgroup.net", role: "client", status: "suspended", joinedAt: "2025-09-01" },
  { id: "client-005", name: "Noah Bennett", email: "noah@bennettstudio.com", role: "client", status: "active", joinedAt: "2025-09-18" },
  { id: "client-006", name: "Ava Richardson", email: "ava.r@archinova.com", role: "client", status: "active", joinedAt: "2025-10-05" },
  { id: "client-007", name: "James Foster", email: "james@fosterlogistics.com", role: "client", status: "active", joinedAt: "2025-10-22" },
  { id: "client-008", name: "Isabella Turner", email: "isabella@turnercreative.io", role: "client", status: "active", joinedAt: "2025-11-08" },
  { id: "client-009", name: "William Hayes", email: "will@hayesventures.com", role: "client", status: "suspended", joinedAt: "2025-11-25" },
  { id: "client-010", name: "Mia Coleman", email: "mia@colemantech.dev", role: "client", status: "active", joinedAt: "2025-12-10" },

  // Workers (25)
  { id: "worker-001", name: "Alex Thompson", email: "alex.t@freelance.dev", role: "worker", status: "active", joinedAt: "2025-05-14" },
  { id: "worker-002", name: "Maria Garcia", email: "maria.g@design.co", role: "worker", status: "active", joinedAt: "2025-05-28" },
  { id: "worker-003", name: "James Wilson", email: "jwilson@backend.dev", role: "worker", status: "active", joinedAt: "2025-06-03" },
  { id: "worker-004", name: "Sofia Chen", email: "sofia.c@iosdev.me", role: "worker", status: "active", joinedAt: "2025-06-17" },
  { id: "worker-005", name: "Marcus Lee", email: "marcus.l@android.dev", role: "worker", status: "active", joinedAt: "2025-06-25" },
  { id: "worker-006", name: "Priya Patel", email: "priya.p@reactnative.io", role: "worker", status: "active", joinedAt: "2025-07-09" },
  { id: "worker-007", name: "Derek Owens", email: "derek.o@qalead.com", role: "worker", status: "active", joinedAt: "2025-07-22" },
  { id: "worker-008", name: "Aisha Nkosi", email: "aisha.n@automation.dev", role: "worker", status: "suspended", joinedAt: "2025-08-05" },
  { id: "worker-009", name: "Nathan Brooks", email: "nathan.b@devops.cloud", role: "worker", status: "active", joinedAt: "2025-08-19" },
  { id: "worker-010", name: "Elena Russo", email: "elena.r@cloudarch.io", role: "worker", status: "active", joinedAt: "2025-09-02" },
  { id: "worker-011", name: "Camille Dufour", email: "camille.d@brand.fr", role: "worker", status: "active", joinedAt: "2025-09-14" },
  { id: "worker-012", name: "Jordan Hayes", email: "jordan.h@motion.design", role: "worker", status: "active", joinedAt: "2025-09-28" },
  { id: "worker-013", name: "Hassan Ali", email: "hassan.a@backend.net", role: "worker", status: "active", joinedAt: "2025-10-11" },
  { id: "worker-014", name: "Yuki Tanaka", email: "yuki.t@dbengineer.jp", role: "worker", status: "active", joinedAt: "2025-10-23" },
  { id: "worker-015", name: "Ben Carter", email: "ben.c@api.specialist", role: "worker", status: "active", joinedAt: "2025-11-06" },
  { id: "worker-016", name: "Rachel Kim", email: "rachel.k@datascience.io", role: "worker", status: "active", joinedAt: "2025-11-19" },
  { id: "worker-017", name: "Omar Hassan", email: "omar.h@bi.analyst", role: "worker", status: "active", joinedAt: "2025-12-02" },
  { id: "worker-018", name: "Diana Wolf", email: "diana.w@cybersec.pro", role: "worker", status: "active", joinedAt: "2025-12-15" },
  { id: "worker-019", name: "Carlos Vega", email: "carlos.v@pentest.io", role: "worker", status: "suspended", joinedAt: "2025-12-28" },
  { id: "worker-020", name: "Fatima Al-Rashid", email: "fatima.r@netinfra.com", role: "worker", status: "active", joinedAt: "2026-01-10" },
  { id: "worker-021", name: "Lucas Moreau", email: "lucas.m@support.fr", role: "worker", status: "active", joinedAt: "2026-01-23" },
  { id: "worker-022", name: "Emily Zhang", email: "emily.z@content.writer", role: "worker", status: "active", joinedAt: "2026-02-05" },
  { id: "worker-023", name: "Samuel Okafor", email: "samuel.o@seo.ng", role: "worker", status: "active", joinedAt: "2026-02-18" },
  { id: "worker-024", name: "Ines Ferreira", email: "ines.f@photo.pt", role: "worker", status: "active", joinedAt: "2026-03-03" },
  { id: "worker-025", name: "Ryan Kowalski", email: "ryan.k@video.edit", role: "worker", status: "active", joinedAt: "2026-03-14" },

  // Contractors (10)
  { id: "contractor-001", name: "Nexus Digital Solutions", email: "ops@nexusdigital.io", role: "contractor", status: "active", joinedAt: "2025-04-10" },
  { id: "contractor-002", name: "Linda Park", email: "linda@parkpm.com", role: "contractor", status: "active", joinedAt: "2025-05-01" },
  { id: "contractor-003", name: "Victor Crane", email: "victor@cranetest.io", role: "contractor", status: "active", joinedAt: "2025-06-15" },
  { id: "contractor-004", name: "Ingrid Holm", email: "ingrid@holmcreative.se", role: "contractor", status: "active", joinedAt: "2025-07-08" },
  { id: "contractor-005", name: "Pavel Novak", email: "pavel@dataarch.cz", role: "contractor", status: "active", joinedAt: "2025-08-20" },
  { id: "contractor-006", name: "CloudSphere Inc", email: "hello@cloudsphere.com", role: "contractor", status: "active", joinedAt: "2025-09-05" },
  { id: "contractor-007", name: "Nexus Consulting", email: "info@nexusconsulting.co", role: "contractor", status: "suspended", joinedAt: "2025-10-12" },
  { id: "contractor-008", name: "PayForge Ltd", email: "contact@payforge.io", role: "contractor", status: "active", joinedAt: "2025-11-03" },
  { id: "contractor-009", name: "Apex Build Group", email: "ops@apexbuild.com", role: "contractor", status: "active", joinedAt: "2025-12-01" },
  { id: "contractor-010", name: "Meridian Labs", email: "labs@meridian.tech", role: "contractor", status: "active", joinedAt: "2026-01-15" },

  // Admins (5)
  { id: "admin-001", name: "Alice Brown", email: "alice@veritask.com", role: "admin", status: "active", joinedAt: "2025-01-01" },
  { id: "admin-002", name: "Bob Johnson", email: "bob@veritask.com", role: "admin", status: "active", joinedAt: "2025-01-01" },
  { id: "admin-003", name: "Carol Davis", email: "carol@veritask.com", role: "admin", status: "active", joinedAt: "2025-03-15" },
  { id: "admin-004", name: "Daniel Wright", email: "daniel@veritask.com", role: "admin", status: "active", joinedAt: "2025-06-01" },
  { id: "admin-005", name: "Emma Scott", email: "emma@veritask.com", role: "admin", status: "active", joinedAt: "2025-09-01" },
];

const mockTeams = [
  {
    id: "team-001", contractorId: "contractor-001", contractorName: "Nexus Digital Solutions",
    name: "Web Dev Team Alpha", description: "Full-stack web development team",
    members: [
      { id: "tm-001", memberId: "worker-001", name: "Alex Thompson", type: "worker", role: "Lead Developer", rate: 75 },
      { id: "tm-002", memberId: "worker-002", name: "Maria Garcia", type: "worker", role: "UI/UX Designer", rate: 60 },
      { id: "tm-003", memberId: "worker-003", name: "James Wilson", type: "worker", role: "Backend Developer", rate: 70 },
      { id: "tm-004", memberId: "contractor-002", name: "Linda Park", type: "contractor", role: "Project Manager", rate: 90 },
    ],
    createdAt: "2025-09-14",
  },
  {
    id: "team-002", contractorId: "contractor-001", contractorName: "Nexus Digital Solutions",
    name: "Mobile Dev Squad", description: "iOS and Android specialists",
    members: [
      { id: "tm-010", memberId: "worker-004", name: "Sofia Chen", type: "worker", role: "iOS Developer", rate: 80 },
      { id: "tm-011", memberId: "worker-005", name: "Marcus Lee", type: "worker", role: "Android Developer", rate: 78 },
      { id: "tm-012", memberId: "worker-006", name: "Priya Patel", type: "worker", role: "React Native Dev", rate: 72 },
    ],
    createdAt: "2025-09-28",
  },
  {
    id: "team-003", contractorId: "contractor-001", contractorName: "Nexus Digital Solutions",
    name: "QA & Testing Team", description: "Quality assurance and automated testing",
    members: [
      { id: "tm-020", memberId: "worker-007", name: "Derek Owens", type: "worker", role: "QA Lead", rate: 65 },
      { id: "tm-021", memberId: "worker-008", name: "Aisha Nkosi", type: "worker", role: "Automation Engineer", rate: 68 },
      { id: "tm-022", memberId: "contractor-003", name: "Victor Crane", type: "contractor", role: "Test Architect", rate: 95 },
    ],
    createdAt: "2025-10-14",
  },
  {
    id: "team-004", contractorId: "contractor-001", contractorName: "Nexus Digital Solutions",
    name: "DevOps Crew", description: "Infrastructure, CI/CD and cloud operations",
    members: [
      { id: "tm-030", memberId: "worker-009", name: "Nathan Brooks", type: "worker", role: "DevOps Engineer", rate: 85 },
      { id: "tm-031", memberId: "worker-010", name: "Elena Russo", type: "worker", role: "Cloud Architect", rate: 92 },
    ],
    createdAt: "2025-10-29",
  },
  {
    id: "team-005", contractorId: "contractor-001", contractorName: "Nexus Digital Solutions",
    name: "Design Studio", description: "Brand, visual and product design",
    members: [
      { id: "tm-040", memberId: "worker-011", name: "Camille Dufour", type: "worker", role: "Brand Designer", rate: 65 },
      { id: "tm-041", memberId: "worker-012", name: "Jordan Hayes", type: "worker", role: "Motion Designer", rate: 70 },
      { id: "tm-042", memberId: "contractor-004", name: "Ingrid Holm", type: "contractor", role: "Creative Director", rate: 110 },
    ],
    createdAt: "2025-11-12",
  },
  {
    id: "team-006", contractorId: "contractor-006", contractorName: "CloudSphere Inc",
    name: "Infrastructure Alliance", description: "Cloud infrastructure and DevOps projects",
    members: [
      { id: "tm-050", memberId: "contractor-006", name: "Oliver Grant", type: "contractor", role: "CTO", rate: 150 },
      { id: "tm-051", memberId: "worker-009", name: "Nathan Brooks", type: "worker", role: "DevOps Lead", rate: 90 },
      { id: "tm-052", memberId: "worker-010", name: "Elena Russo", type: "worker", role: "Cloud Engineer", rate: 85 },
      { id: "tm-053", memberId: "worker-018", name: "Diana Wolf", type: "worker", role: "Security Analyst", rate: 90 },
    ],
    createdAt: "2025-11-25",
  },
  {
    id: "team-007", contractorId: "contractor-008", contractorName: "PayForge Ltd",
    name: "FinTech Builders", description: "Payment and financial platform development",
    members: [
      { id: "tm-060", memberId: "contractor-008", name: "Marcus Webb", type: "contractor", role: "CEO", rate: 160 },
      { id: "tm-061", memberId: "worker-016", name: "Rachel Kim", type: "worker", role: "Data Engineer", rate: 88 },
      { id: "tm-062", memberId: "worker-013", name: "Hassan Ali", type: "worker", role: "Backend Dev", rate: 80 },
      { id: "tm-063", memberId: "worker-014", name: "Yuki Tanaka", type: "worker", role: "Database Engineer", rate: 75 },
    ],
    createdAt: "2025-12-08",
  },
  {
    id: "team-008", contractorId: "contractor-009", contractorName: "Apex Build Group",
    name: "Enterprise Solutions Hub", description: "Large-scale enterprise software delivery",
    members: [
      { id: "tm-070", memberId: "contractor-009", name: "Fiona Blake", type: "contractor", role: "Delivery Manager", rate: 130 },
      { id: "tm-071", memberId: "worker-003", name: "James Wilson", type: "worker", role: "Backend Dev", rate: 70 },
      { id: "tm-072", memberId: "worker-015", name: "Ben Carter", type: "worker", role: "API Specialist", rate: 70 },
      { id: "tm-073", memberId: "worker-017", name: "Omar Hassan", type: "worker", role: "BI Analyst", rate: 72 },
    ],
    createdAt: "2025-12-20",
  },
  {
    id: "team-009", contractorId: "contractor-010", contractorName: "Meridian Labs",
    name: "Data Analytics Team", description: "Data science and business intelligence",
    members: [
      { id: "tm-080", memberId: "contractor-005", name: "Pavel Novak", type: "contractor", role: "Data Architect", rate: 105 },
      { id: "tm-081", memberId: "worker-016", name: "Rachel Kim", type: "worker", role: "Data Scientist", rate: 88 },
      { id: "tm-082", memberId: "worker-017", name: "Omar Hassan", type: "worker", role: "BI Analyst", rate: 72 },
      { id: "tm-083", memberId: "worker-022", name: "Emily Zhang", type: "worker", role: "Content Analyst", rate: 60 },
    ],
    createdAt: "2026-01-04",
  },
  {
    id: "team-010", contractorId: "contractor-010", contractorName: "Meridian Labs",
    name: "Security & Compliance", description: "Cybersecurity, penetration testing and compliance",
    members: [
      { id: "tm-090", memberId: "worker-018", name: "Diana Wolf", type: "worker", role: "Security Lead", rate: 95 },
      { id: "tm-091", memberId: "worker-019", name: "Carlos Vega", type: "worker", role: "Penetration Tester", rate: 95 },
      { id: "tm-092", memberId: "worker-020", name: "Fatima Al-Rashid", type: "worker", role: "Network Engineer", rate: 82 },
    ],
    createdAt: "2026-01-18",
  },
];

const mockDisputes = [
  { id: "disp-001", projectId: "proj-031", projectTitle: "Data Entry & Spreadsheet", clientId: "client-001", clientName: "Ethan Caldwell", workerId: "worker-001", workerName: "Alex Thompson", description: "Payment dispute — client claims deliverables were incomplete", status: "pending", createdAt: "2026-03-10" },
  { id: "disp-002", projectId: "proj-032", projectTitle: "Logo Design Project", clientId: "client-003", clientName: "Liam Nguyen", workerId: "worker-004", workerName: "Sofia Chen", description: "Quality issue — worker delivered low-resolution assets", status: "pending", createdAt: "2026-03-12" },
  { id: "disp-003", projectId: "proj-033", projectTitle: "SEO Content Writing", clientId: "client-002", clientName: "Sophia Harrington", workerId: "worker-003", workerName: "James Wilson", description: "Late delivery — missed deadline by 2 weeks without notice", status: "escalated", createdAt: "2026-03-08" },
  { id: "disp-004", projectId: "proj-C15", projectTitle: "IT Infrastructure Overhaul", clientId: "client-005", clientName: "Noah Bennett", workerId: "contractor-001", workerName: "Nexus Digital Solutions", description: "Scope dispute — contractor billed for out-of-scope features", status: "pending", createdAt: "2026-03-15" },
  { id: "disp-005", projectId: "proj-028", projectTitle: "Mobile App UI Design", clientId: "client-007", clientName: "James Foster", workerId: "worker-002", workerName: "Maria Garcia", description: "Refund requested — client cancelled after partial delivery", status: "resolved", createdAt: "2026-02-28" },
];

const mockTransactions = [
  { id: "txn-001", amount: 5000.00, date: "2026-03-20", type: "payment", status: "completed", projectId: "proj-001", description: "Website Redesign — escrow funded" },
  { id: "txn-002", amount: 4250.00, date: "2026-03-19", type: "payout", status: "completed", projectId: "proj-018", description: "Custom Software — milestone payout" },
  { id: "txn-003", amount: 312.50, date: "2026-03-19", type: "fee", status: "completed", projectId: "proj-018", description: "Platform fee 7.5%" },
  { id: "txn-004", amount: 15000.00, date: "2026-03-18", type: "payment", status: "completed", projectId: "proj-003", description: "Mobile App — escrow funded" },
  { id: "txn-005", amount: 350.00, date: "2026-03-17", type: "payment", status: "completed", projectId: "proj-002", description: "House Deep Cleaning — payment" },
  { id: "txn-006", amount: 320.75, date: "2026-03-17", type: "payout", status: "completed", projectId: "proj-002", description: "Worker payout" },
  { id: "txn-007", amount: 26.25, date: "2026-03-17", type: "fee", status: "completed", projectId: "proj-002", description: "Platform fee 7.5%" },
  { id: "txn-008", amount: 1200.00, date: "2026-03-16", type: "payment", status: "completed", projectId: "proj-012", description: "API Integration — Stripe milestone" },
  { id: "txn-009", amount: 800.00, date: "2026-03-15", type: "refund", status: "completed", projectId: "proj-028", description: "Partial refund — dispute resolved" },
  { id: "txn-010", amount: 2000.00, date: "2026-03-14", type: "payment", status: "completed", projectId: "proj-022", description: "Portfolio Site — milestone 2" },
  { id: "txn-011", amount: 1850.00, date: "2026-03-14", type: "payout", status: "completed", projectId: "proj-022", description: "Worker payout" },
  { id: "txn-012", amount: 150.00, date: "2026-03-14", type: "fee", status: "completed", projectId: "proj-022", description: "Platform fee 7.5%" },
  { id: "txn-013", amount: 4500.00, date: "2026-03-13", type: "payment", status: "pending", projectId: "proj-006", description: "Garden Landscaping — escrow pending" },
  { id: "txn-014", amount: 9000.00, date: "2026-03-12", type: "payment", status: "completed", projectId: "proj-C09", description: "ERP System — escrow funded" },
  { id: "txn-015", amount: 675.00, date: "2026-03-12", type: "fee", status: "completed", projectId: "proj-C09", description: "Platform fee 7.5%" },
];

const useAdminStore = create((set, get) => ({
  users: mockUsers,
  disputes: mockDisputes,
  transactions: mockTransactions,
  teams: mockTeams,

  setUsers: (users) => set({ users }),
  setDisputes: (disputes) => set({ disputes }),
  setTransactions: (transactions) => set({ transactions }),
  setTeams: (teams) => set({ teams }),

  getAdminStats: () => {
    const { users, disputes, transactions } = get();
    const totalUsers = users.length;
    const totalDisputes = disputes.length;
    const pendingDisputes = disputes.filter(d => d.status === "pending").length;
    const totalTransactionVolume = transactions
      .filter(t => t.type === "payment" && t.status === "completed")
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    return { totalUsers, totalDisputes, pendingDisputes, totalTransactionVolume };
  },
}));

export default useAdminStore;
