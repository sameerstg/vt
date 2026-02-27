export const workerSectionConfig = {
  available: {
    title: "Available Tasks",
    description: "Tasks you are eligible to apply for.",
    path: "/worker-dashboard/available-tasks",
  },
  applied: {
    title: "Applied Tasks",
    description: "Tasks where you already submitted an application.",
    path: "/worker-dashboard/applied-tasks",
  },
  assigned: {
    title: "Assigned Tasks",
    description: "Tasks assigned to you and ready to start.",
    path: "/worker-dashboard/assigned-tasks",
  },
  in_progress: {
    title: "In Progress",
    description: "Tasks currently being worked on.",
    path: "/worker-dashboard/in-progress",
  },
  completed: {
    title: "Completed",
    description: "Tasks delivered and approved.",
    path: "/worker-dashboard/completed-tasks",
  },
  payment_history: {
    title: "Payment History",
    description: "Completed payment and payout records.",
    path: "/worker-dashboard/payment-history",
  },
};

export const workerTasks = [
  {
    id: 1001,
    title: "Landing Page Redesign",
    client: "Orbit Labs",
    budget: "$450",
    deadline: "Mar 10, 2026",
    skills: ["Figma", "UI/UX"],
    status: "available",
    isEligible: true,
  },
  {
    id: 1002,
    title: "React Dashboard Widgets",
    client: "Cloudnova",
    budget: "$620",
    deadline: "Mar 13, 2026",
    skills: ["React", "Chart.js"],
    status: "available",
    isEligible: true,
  },
  {
    id: 1003,
    title: "SaaS Onboarding Flow",
    client: "Peakstack",
    budget: "$700",
    deadline: "Mar 16, 2026",
    skills: ["Product Design", "UX Writing"],
    status: "available",
    isEligible: false,
  },
  {
    id: 1004,
    title: "WordPress Bug Fixes",
    client: "Brixon Media",
    budget: "$180",
    deadline: "Mar 08, 2026",
    skills: ["WordPress", "PHP"],
    status: "applied",
    isEligible: true,
  },
  {
    id: 1005,
    title: "Mobile App QA Cycle",
    client: "HealthConnect",
    budget: "$320",
    deadline: "Mar 11, 2026",
    skills: ["QA", "Test Cases"],
    status: "applied",
    isEligible: true,
  },
  {
    id: 1006,
    title: "Email Template Build",
    client: "Adlytic",
    budget: "$240",
    deadline: "Mar 09, 2026",
    skills: ["HTML", "Responsive Email"],
    status: "assigned",
    isEligible: true,
  },
  {
    id: 1007,
    title: "API Integration Sprint",
    client: "Paymesh",
    budget: "$850",
    deadline: "Mar 18, 2026",
    skills: ["Node.js", "REST"],
    status: "assigned",
    isEligible: true,
  },
  {
    id: 1008,
    title: "Admin Portal Refactor",
    client: "Vertex Pro",
    budget: "$1,150",
    deadline: "Mar 22, 2026",
    skills: ["Next.js", "TypeScript"],
    status: "in_progress",
    isEligible: true,
  },
  {
    id: 1009,
    title: "Accessibility Compliance Pass",
    client: "Axion Global",
    budget: "$530",
    deadline: "Mar 15, 2026",
    skills: ["WCAG", "Audits"],
    status: "in_progress",
    isEligible: true,
  },
  {
    id: 1010,
    title: "Marketing Site Deployment",
    client: "Luma Studio",
    budget: "$390",
    deadline: "Feb 22, 2026",
    skills: ["Vercel", "CI/CD"],
    status: "completed",
    isEligible: true,
  },
  {
    id: 1011,
    title: "Feature Documentation Pack",
    client: "NexaFlow",
    budget: "$260",
    deadline: "Feb 26, 2026",
    skills: ["Docs", "Product"],
    status: "completed",
    isEligible: true,
  },
];

export const paymentHistory = [
  {
    id: 1,
    date: "Feb 25, 2026",
    task: "Marketing Site Deployment",
    amount: "$390",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 2,
    date: "Feb 26, 2026",
    task: "Feature Documentation Pack",
    amount: "$260",
    method: "Payoneer",
    status: "Paid",
  },
  {
    id: 3,
    date: "Feb 28, 2026",
    task: "Accessibility Compliance Pass",
    amount: "$265",
    method: "Pending Release",
    status: "Pending",
  },
];

export const getWorkerTasksBySection = (sectionKey) => {
  if (sectionKey === "available") {
    return workerTasks.filter((task) => task.status === "available" && task.isEligible);
  }

  return workerTasks.filter((task) => task.status === sectionKey);
};

