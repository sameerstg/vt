export const taskStats = [
  {
    title: "Active Project",
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

];

export const pendingEscrow = [
  { task: "Landing Page Redesign", amount: "$320", due: "Today" },
  { task: "WordPress Speed Optimization", amount: "$260", due: "Tomorrow" },
  { task: "Social Ads Setup", amount: "$500", due: "Mar 05, 2026" },
];

export const inProgressTasks = [
  { task: "Flutter App UI", freelancer: "James W.", eta: "4 days" },
  { task: "Backend API Integration", freelancer: "Olivia K.", eta: "6 days" },
  { task: "Brand Identity Kit", freelancer: "Oliver B.", eta: "2 days" },
];

export const completedTasks = [
  {
    id: 1,
    task: "Shopify Fixes",
    freelancer: "Emily S.",
    completedOn: "Feb 25, 2026",
    budget: "$420",
    submittedOn: "Feb 24, 2026",
    deliveryNote:
      "Theme bugs were resolved, checkout spacing was fixed, and responsive sections were polished for final handoff.",
    deliverables: [
      "updated-shopify-theme.zip",
      "checkout-fix-report.pdf",
      "responsive-qa-checklist.xlsx",
    ],
  },
  {
    id: 2,
    task: "Logo Animation",
    freelancer: "William T.",
    completedOn: "Feb 22, 2026",
    budget: "$560",
    submittedOn: "Feb 21, 2026",
    deliveryNote:
      "Final animated logo package includes social-ready exports, transparent backgrounds, and short brand reveal variations.",
    deliverables: [
      "logo-animation.mp4",
      "logo-animation-alpha.mov",
      "brand-handoff-guidelines.pdf",
    ],
  },
  {
    id: 3,
    task: "Product Upload",
    freelancer: "Charlotte N.",
    completedOn: "Feb 18, 2026",
    budget: "$310",
    submittedOn: "Feb 17, 2026",
    deliveryNote:
      "Product listings were uploaded with optimized titles, pricing structure, image ordering, and inventory validation.",
    deliverables: [
      "product-upload-summary.csv",
      "inventory-validation.pdf",
      "listing-image-map.zip",
    ],
  },
];

export const disputedTasks = [
  {
    id: "dispute-1",
    task: "CRM Data Migration",
    issue: "Scope mismatch",
    status: "Open",
    worker: "James Walker",
    openedOn: "Mar 12, 2026",
    budget: "$1,800",
    escrowStatus: "On Hold",
    reason:
      "Delivered migration package did not include the agreed field mapping validation and duplicate cleanup flow.",
    updates: [
      {
        id: "update-1",
        sender: "You",
        time: "Mar 12, 2026 10:15 AM",
        text: "The migrated CRM records still contain duplicate contacts and broken owner mapping.",
      },
      {
        id: "update-2",
        sender: "James Walker",
        time: "Mar 12, 2026 01:05 PM",
        text: "I have shared the migration logs and requested one more review cycle for the cleanup script.",
      },
      {
        id: "update-3",
        sender: "Support",
        time: "Mar 12, 2026 03:20 PM",
        text: "Dispute opened successfully. Escrow is on hold until both sides submit final evidence.",
      },
    ],
    evidence: [
      { id: "evidence-1", name: "crm-import-log.pdf", size: "1.2 MB" },
      { id: "evidence-2", name: "duplicate-records.xlsx", size: "420 KB" },
    ],
  },
];

export const closedTasks = [
  {
    id: "closed-1",
    task: "Escrow Refund Case",
    issue: "Refund settled after review",
    status: "Closed",
    closedOn: "Mar 14, 2026",
    worker: "Olivia Carter",
    budget: "$640",
    resolution: "Escrow refund approved after evidence review and final confirmation from both parties.",
    summary:
      "The worker accepted the revised terms and the refund request was processed from held escrow.",
  },
  {
    id: "closed-2",
    task: "Late Delivery Claim",
    issue: "Partial release completed",
    status: "Closed",
    closedOn: "Mar 10, 2026",
    worker: "James Walker",
    budget: "$980",
    resolution: "Client approved partial payout and closed the case after final files were received.",
    summary:
      "A delayed delivery dispute was reviewed, remaining scope was accepted, and the case was closed successfully.",
  },
  {
    id: "closed-3",
    task: "Scope Clarification Ticket",
    issue: "Both parties agreed to close",
    status: "Closed",
    closedOn: "Mar 06, 2026",
    worker: "William Scott",
    budget: "$520",
    resolution: "No refund required. Scope clarification resolved and project archived.",
    summary:
      "The disputed work item was re-scoped, documented, and both parties agreed to close the matter.",
  },
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
