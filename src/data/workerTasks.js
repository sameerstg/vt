export const workerSectionConfig = {
  available: {
    title: "Available Tasks",
    path: "/worker-dashboard/tasks?tab=available",
    description: "Browse and apply for new opportunities matching your profile."
  },
  applied: {
    title: "Applied Projects",
    path: "/worker-dashboard/tasks?tab=applied",
    description: "Track the status of proposals you've submitted to clients."
  },
  assigned: {
    title: "Projects",
    path: "/worker-dashboard/tasks?tab=assigned",
    description: "Review projects currently assigned to you and waiting for execution."
  },
  in_progress: {
    title: "In Progress Projects",
    path: "/worker-dashboard/tasks?tab=in_progress",
    description: "Manage milestones and work updates for your active projects."
  },
  completed: {
    title: "Completed Projects",
    path: "/worker-dashboard/tasks?tab=completed",
    description: "Review and access deliverables for your finished contracts."
  },
  payment_history: {
    title: "Payment History",
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
    category: "Design",
    location: "United States",
    taskType: "Fixed",
    budgetModel: "Milestone",
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
    category: "Development",
    location: "Remote",
    taskType: "Hourly",
    budgetModel: "Hourly",
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
    category: "Design",
    location: "Canada",
    taskType: "Fixed",
    budgetModel: "Milestone",
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
    category: "Development",
    location: "United Kingdom",
    taskType: "Fixed",
    budgetModel: "Fixed Price",
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
    category: "QA",
    location: "Remote",
    taskType: "Fixed",
    budgetModel: "Milestone",
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
    category: "Development",
    location: "United Arab Emirates",
    taskType: "Fixed",
    budgetModel: "Fixed Price",
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
    category: "Development",
    location: "United States",
    taskType: "Hourly",
    budgetModel: "Hourly",
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
    category: "Development",
    location: "Remote",
    taskType: "Fixed",
    budgetModel: "Milestone",
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
    category: "QA",
    location: "United Kingdom",
    taskType: "Hourly",
    budgetModel: "Hourly",
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
    category: "Development",
    location: "United States",
    taskType: "Fixed",
    budgetModel: "Fixed Price",
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
    category: "Writing",
    location: "Remote",
    taskType: "Fixed",
    budgetModel: "Milestone",
  },
  {
    id: 1012,
    title: "Brand Identity Refresh",
    client: "Folio Creative",
    budget: "$720",
    deadline: "Mar 20, 2026",
    skills: ["Branding", "Illustrator"],
    status: "in_review",
    isEligible: true,
    category: "Design & Creative",
    location: "United States",
    taskType: "Fixed",
    budgetModel: "Milestone",
  },
  {
    id: 1013,
    title: "Backend API Optimisation",
    client: "Streamline Tech",
    budget: "$980",
    deadline: "Mar 25, 2026",
    skills: ["Node.js", "PostgreSQL"],
    status: "in_review",
    isEligible: true,
    category: "Development & IT",
    location: "Remote",
    taskType: "Hourly",
    budgetModel: "Hourly",
  },
  {
    id: 1014,
    title: "E-commerce Checkout Revamp",
    client: "ShopNest",
    budget: "$1,100",
    deadline: "Mar 12, 2026",
    skills: ["React", "Stripe"],
    status: "in_dispute",
    isEligible: true,
    category: "Development & IT",
    location: "United Kingdom",
    taskType: "Fixed",
    budgetModel: "Fixed Price",
  },
  {
    id: 1015,
    title: "Social Media Content Pack",
    client: "BuzzReach",
    budget: "$340",
    deadline: "Mar 05, 2026",
    skills: ["Copywriting", "Canva"],
    status: "in_dispute",
    isEligible: true,
    category: "Digital Marketing",
    location: "Canada",
    taskType: "Fixed",
    budgetModel: "Milestone",
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

import { getMockUsers } from "@/utils/auth/mockAuth";

export const getWorkerTasksBySection = (sectionKey) => {
  const users = getMockUsers();
  const currentSession = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("vt_auth_session") || "null") : null;
  const normalizeTaskStatus = (status) => {
    if (status === "In Progress") return "in_progress";
    if (status === "Ongoing") return "available";
    if (status === "Work Submitted") return "in_review";
    if (status === "Disputed") return "in_dispute";
    if (status === "Completed") return "completed";
    return status;
  };

  // Resolve client info for all tasks in mockUsers.json
  const extraTasks = [];
  users.forEach(user => {
    if (user.createdTasks) {
      user.createdTasks.forEach(task => {
        const normalizedStatus = normalizeTaskStatus(task.status || "available");
        extraTasks.push({
          ...task,
          client: task.client || user.name,
          clientId: task.clientId || user.id,
          clientEmail: task.clientEmail || user.email,
          status: normalizedStatus,
          skills: Array.isArray(task.skills) ? task.skills : (task.skills ? [task.skills] : []),
          deadline: task.deadline ? (isNaN(task.deadline) ? task.deadline : `${task.deadline} Days`) : "TBD",
          budget: task.budget || `$${task.budgetAmount || 0}`,
          isEligible: task.assignedWorkerId
            ? String(task.assignedWorkerId) === String(currentSession?.id)
            : true,
        });
      });
    }
  });

  const allTasks = [...workerTasks, ...extraTasks];

  if (sectionKey === "available") {
    return allTasks.filter((task) => task.status === "available" && (task.isEligible !== false));
  }

  // If it's applied tasks, we should check proposals for the current worker
  if (sectionKey === "applied" && currentSession?.id) {
    const allProposals = [];
    users.forEach(u => {
      if (u.submittedProposals) allProposals.push(...u.submittedProposals);
    });

    // Also check localStorage for immediate proposals
    if (typeof window !== "undefined") {
      try {
        const localProposals = JSON.parse(window.localStorage.getItem("vt_submitted_proposals") || "[]");
        allProposals.push(...localProposals);
      } catch (e) {}
    }

    const workerProposals = allProposals.filter(p => String(p.workerId) === String(currentSession.id));
    const proposalTasks = workerProposals
      .filter((p) => p.status !== "accepted")
      .map(p => ({
      id: p.taskId || p.id,
      title: p.taskTitle,
      client: p.clientEmail || "Client",
      budget: `$${p.offerAmount}`,
      deadline: p.timeline ? `${p.timeline} Days` : "N/A",
      status: "applied"
    }));

    return [...allTasks.filter((task) => task.status === "applied"), ...proposalTasks];
  }

  if (sectionKey === "in_progress") {
    return allTasks.filter(
      (task) =>
        task.status === "in_progress" &&
        (!task.assignedWorkerId || String(task.assignedWorkerId) === String(currentSession?.id))
    );
  }

  if (sectionKey === "assigned") {
    return allTasks.filter(
      (task) =>
        task.status === "assigned" &&
        (!task.assignedWorkerId || String(task.assignedWorkerId) === String(currentSession?.id))
    );
  }

  return allTasks.filter(
    (task) =>
      task.status === sectionKey &&
      (!task.assignedWorkerId || String(task.assignedWorkerId) === String(currentSession?.id))
  );
};

