export const taskStats = [
  {
    title: "Active Tasks",
    value: 8,
    note: "Currently live and accepting proposals",
    icon: "flaticon-contract",
  },
  {
    title: "Pending Escrow Funding",
    value: 3,
    note: "Waiting for payment confirmation",
    icon: "flaticon-wallet",
  },
  {
    title: "In Progress",
    value: 5,
    note: "Work started by hired freelancers",
    icon: "flaticon-review",
  },
  {
    title: "Completed",
    value: 14,
    note: "Delivered and approved tasks",
    icon: "flaticon-success",
  },
  {
    title: "Disputed",
    value: 1,
    note: "Require resolution attention",
    icon: "flaticon-close",
  },
];

export const activeTasks = [
  { title: "Website UX Audit", budget: "$450", proposals: 9, status: "Active" },
  { title: "Mobile App QA Testing", budget: "$700", proposals: 5, status: "Active" },
  { title: "SEO Content Plan", budget: "$300", proposals: 11, status: "Active" },
];

export const pendingEscrow = [
  { task: "Landing Page Redesign", amount: "$320", due: "Today" },
  { task: "WordPress Speed Optimization", amount: "$260", due: "Tomorrow" },
  { task: "Social Ads Setup", amount: "$500", due: "Mar 05, 2026" },
];

export const inProgressTasks = [
  { task: "Flutter App UI", freelancer: "Hassan R.", eta: "4 days" },
  { task: "Backend API Integration", freelancer: "Areeba K.", eta: "6 days" },
  { task: "Brand Identity Kit", freelancer: "Umair Z.", eta: "2 days" },
];

export const completedTasks = [
  { task: "Shopify Fixes", freelancer: "Mariam S.", completedOn: "Feb 25, 2026" },
  { task: "Logo Animation", freelancer: "Bilal T.", completedOn: "Feb 22, 2026" },
  { task: "Product Upload", freelancer: "Faizan N.", completedOn: "Feb 18, 2026" },
];

export const disputedTasks = [
  { task: "CRM Data Migration", issue: "Scope mismatch", status: "Open" },
];

export const notifications = [
  { text: "3 new proposals received for Website UX Audit.", time: "5 min ago" },
  { text: "Escrow payment reminder for Landing Page Redesign.", time: "1 hour ago" },
  { text: "Backend API Integration milestone marked complete.", time: "3 hours ago" },
  { text: "Dispute response submitted by freelancer.", time: "Yesterday" },
];

export const notificationHistory = [
  {
    id: 1,
    date: "Mar 02, 2026",
    event: "3 new proposals received for Website UX Audit.",
    type: "Proposal",
    status: "New",
  },
  {
    id: 2,
    date: "Mar 02, 2026",
    event: "Escrow payment reminder for Landing Page Redesign.",
    type: "Funding",
    status: "Pending",
  },
  {
    id: 3,
    date: "Mar 01, 2026",
    event: "Backend API Integration milestone marked complete.",
    type: "Milestone",
    status: "Completed",
  },
  {
    id: 4,
    date: "Feb 28, 2026",
    event: "Dispute response submitted by freelancer.",
    type: "Dispute",
    status: "Open",
  },
];
