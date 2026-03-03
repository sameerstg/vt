export const adminSidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    path: "/admin",
    icon: "flaticon-home",
    group: "start",
  },
  {
    id: 2,
    label: "User Management",
    path: "/admin/user-management",
    icon: "flaticon-user",
    group: "organize",
  },
  {
    id: 3,
    label: "Task Monitoring",
    path: "/admin/task-monitoring",
    icon: "flaticon-briefcase",
    group: "organize",
  },
  {
    id: 4,
    label: "Financial Overview",
    path: "/admin/financial-overview",
    icon: "flaticon-dollar",
    group: "organize",
  },
  {
    id: 5,
    label: "Settings",
    path: "/admin/settings",
    icon: "flaticon-web",
    group: "organize",
  },
  {
    id: 6,
    label: "Account",
    path: "/admin/account",
    icon: "flaticon-user",
    group: "account",
  },
  {
    id: 7,
    label: "Logout",
    path: "/login",
    icon: "flaticon-logout",
    group: "account",
  },
];

export const adminKpiCards = [
  {
    id: 1,
    title: "Total Users",
    value: "12,450",
    trend: "+5.2% vs last week",
  },
  {
    id: 2,
    title: "Active Tasks",
    value: "843",
    trend: "+12% vs last week",
  },
  // {
  //   id: 3,
  //   title: "Escrow Balance",
  //   value: "$145,200",
  //   trend: "+3.4% vs last month",
  // },
  {
    id: 4,
    title: "Revenue",
    value: "$23,400",
    trend: "+8.1% vs last month",
  },
  {
    id: 5,
    title: "Open Disputes",
    value: "12",
    trend: "-2.0% vs last week",
  },
  // {
  //   id: 6,
  //   title: "Suspended Accounts",
  //   value: "45",
  //   trend: "+1.5% vs last week",
  // },
];

export const adminQuickActions = [
  {
    id: "quick-1",
    label: "Add Category",
    helper: "Create new service group",
    path: "/admin/settings",
  },
   {
    id: "quick-2",
    label: "Add Sub Category",
    helper: "Create new service group",
    path: "/admin/settings",
  },

  {
    id: "quick-2",
    label: "Update Fee %",
    helper: "Adjust platform commission",
    path: "/admin/settings",
  },
  {
    id: "quick-3",
    label: "Escrow Settings",
    helper: "Manage release rules",
    path: "/admin/settings",
  },
  {
    id: "quick-4",
    label: "View Flags",
    helper: "Review risky tasks",
    path: "/admin/task-monitoring",
  },
  {
    id: "quick-5",
    label: "Pending Verify",
    helper: "Approve user KYC queue",
    path: "/admin/user-management/verification",
  },
];

export const adminRevenueSeries = [
  { month: "Jan", revenue: 520000 },
  { month: "Feb", revenue: 640000 },
  { month: "Mar", revenue: 560000 },
  { month: "Apr", revenue: 720000 },
  { month: "May", revenue: 860000 },
  { month: "Jun", revenue: 940000 },
  { month: "Jul", revenue: 810000 },
  { month: "Aug", revenue: 770000 },
  { month: "Sep", revenue: 910000 },
  { month: "Oct", revenue: 1020000 },
  { month: "Nov", revenue: 980000 },
  { month: "Dec", revenue: 1100000 },
];

export const taskStatusBreakdown = [
  { label: "In Progress", value: 42, color: "#2563eb" },
  { label: "Completed", value: 31, color: "#16a34a" },
  { label: "Pending", value: 17, color: "#d97706" },
  { label: "Disputed", value: 10, color: "#dc2626" },
];

export const recentUsers = [
  {
    id: "USR-1024",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "Freelancer",
    date: "2 mins ago",
    joined: "Oct 24, 2023",
    status: "Active",
  },
  {
    id: "USR-1025",
    name: "Bob Smith",
    email: "bob.smith@design.co",
    role: "Client",
    date: "15 mins ago",
    joined: "Oct 22, 2023",
    status: "Pending",
  },
  {
    id: "USR-1026",
    name: "Charlie Brown",
    email: "charlie.b@freelance.net",
    role: "Freelancer",
    date: "1 hr ago",
    joined: "Sep 15, 2023",
    status: "Suspended",
  },
  {
    id: "USR-1027",
    name: "Diana Prince",
    email: "diana.p@agency.com",
    role: "Client",
    date: "2 hrs ago",
    joined: "Oct 10, 2023",
    status: "Active",
  },
  {
    id: "USR-1029",
    name: "Fiona Green",
    email: "fiona.g@market.ply",
    role: "Client",
    date: "4 hrs ago",
    joined: "Aug 05, 2023",
    status: "Banned",
  },
];

export const recentTransactions = [
  {
    id: "TX-92834",
    user: "John Doe",
    type: "Escrow Deposit",
    project: "Website Redesign",
    amount: "+$1,500",
    status: "Released",
    date: "10 mins ago",
  },
  {
    id: "TX-92833",
    user: "Alice Smith",
    type: "Payout Released",
    project: "Mobile App UI",
    amount: "-$850",
    status: "In Escrow",
    date: "45 mins ago",
  },
  {
    id: "TX-92832",
    user: "Mike K.",
    type: "Service Fee",
    project: "Platform Commission",
    amount: "+$125",
    status: "Pending",
    date: "1 hr ago",
  },
  {
    id: "TX-92831",
    user: "Sarah Jenkins",
    type: "Dispute Refund",
    project: "Logo Design",
    amount: "-$50",
    status: "On Hold",
    date: "2 hrs ago",
  },
  {
    id: "TX-92830",
    user: "Acme Corp.",
    type: "Milestone Release",
    project: "Corporate Website",
    amount: "+$1,125",
    status: "Released",
    date: "3 hrs ago",
  },
];

export const adminRecentActivity = [
  {
    id: "ACT-1",
    time: "08:42",
    title: "Purchase by Ali Price",
    detail: "Product noise evolve smartwatch",
  },
  {
    id: "ACT-2",
    time: "14:37",
    title: "Make deposit USD 700 to TFN",
    detail: "Wallet updated successfully",
  },
  {
    id: "ACT-3",
    time: "16:50",
    title: "Natasha Carey liked the products",
    detail: "Allow users to like products in WooCommerce store",
  },
  {
    id: "ACT-4",
    time: "18:10",
    title: "Escrow dispute opened",
    detail: "Task #8496 moved to review queue",
  },
];

export const userManagementUsers = [
  {
    id: "USR-1024",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "Freelancer",
    verification: "Verified",
    status: "Active",
    joined: "Oct 24, 2023",
  },
  {
    id: "USR-1025",
    name: "Bob Smith",
    email: "bob.smith@design.co",
    role: "Client",
    verification: "Pending",
    status: "Active",
    joined: "Oct 22, 2023",
  },
  {
    id: "USR-1026",
    name: "Charlie Brown",
    email: "charlie.b@freelance.net",
    role: "Freelancer",
    verification: "Verified",
    status: "Suspended",
    joined: "Sep 15, 2023",
  },
  {
    id: "USR-1027",
    name: "Diana Prince",
    email: "diana.p@agency.com",
    role: "Client",
    verification: "Verified",
    status: "Active",
    joined: "Oct 10, 2023",
  },
  {
    id: "USR-1029",
    name: "Fiona Green",
    email: "fiona.g@market.ply",
    role: "Client",
    verification: "Verified",
    status: "Banned",
    joined: "Aug 05, 2023",
  },
];

export const userDetailPanel = {
  profile: {
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "Freelancer",
  },
  uploadedId: "Government ID - Submitted on Oct 24, 2023",
  verificationStatus:
    "Pending manual review after document authenticity warning.",
};

export const taskMonitoringTasks = [
  {
    id: "8492",
    title: "E-commerce Website Redesign",
    buyer: "@jdoe",
    seller: "@dev_mike",
    budget: "$1,200.00",
    status: "In Progress",
    category: "Design",
  },
  {
    id: "8493",
    title: "SEO Audit for Startup",
    buyer: "@market_pro",
    seller: "@seo_guru",
    budget: "$450.00",
    status: "Pending",
    category: "Marketing",
  },
  {
    id: "8496",
    title: "Corporate Logo Bundle",
    buyer: "@brand_new",
    seller: "@graphic_art",
    budget: "$300.00",
    status: "Disputed",
    category: "Branding",
  },
  {
    id: "8495",
    title: "Blog Post Series: AI Trends",
    buyer: "@content_king",
    seller: "@writer_jen",
    budget: "$150.00",
    status: "Completed",
    category: "Content",
  },
  {
    id: "8497",
    title: "iOS App MVP Build",
    buyer: "@startups_inc",
    seller: "@app_devs",
    budget: "$8,500.00",
    status: "Review",
    category: "Development",
  },
];

export const taskDetailPanel = {
  taskDetails: "Task #39482 - Website Redesign Project with 4 milestones.",
  buyerInfo: "Acme Corp Ltd - @acme_official - San Francisco, CA",
  sellerInfo: "Sarah Jenkins - Senior UI/UX Designer - London, UK",
  escrowStatus: "Milestone 3 funded and active. Milestone 4 is not funded yet.",
  forceStates: [
    "Set In Progress",
    "Set Completed",
    "Set Disputed",
    "Set Suspended",
  ],
};

export const financialSummary = [
  { id: 1, label: "Total Escrow Held", value: "$1,245,000", trend: "+12%" },
  {
    id: 2,
    label: "Total Released Funds",
    value: "$8,500,000",
    trend: "+8%",
  },
  { id: 3, label: "Platform Revenue", value: "$425,000", trend: "+15%" },
];

export const financialTransactions = [
  {
    id: "TX-92834",
    invoiceName: "App Services",
    purchaseDate: "April 9, 2023",
    taskId: "8492",
    buyer: "John Doe",
    seller: "Sarah Jenkins",
    amount: "$1,200.00",
    fee: "10%",
    status: "Released",
  },
  {
    id: "TX-92833",
    invoiceName: "Design Package",
    purchaseDate: "April 10, 2023",
    taskId: "8497",
    buyer: "Alice Smith",
    seller: "Mike K.",
    amount: "$3,500.00",
    fee: "10%",
    status: "In Escrow",
  },
  {
    id: "TX-92832",
    invoiceName: "Marketing Bundle",
    purchaseDate: "April 11, 2023",
    taskId: "8493",
    buyer: "Mike K.",
    seller: "SEO Guru",
    amount: "$850.00",
    fee: "15%",
    status: "Pending",
  },
  {
    id: "TX-92831",
    invoiceName: "Brand Identity",
    purchaseDate: "April 12, 2023",
    taskId: "8496",
    buyer: "Brand New",
    seller: "Graphic Art",
    amount: "$300.00",
    fee: "20%",
    status: "Disputed",
  },
  {
    id: "TX-92830",
    invoiceName: "Content Services",
    purchaseDate: "April 13, 2023",
    taskId: "8495",
    buyer: "Content King",
    seller: "Writer Jen",
    amount: "$150.00",
    fee: "10%",
    status: "Released",
  },
];

export const financialEscrowPanel = {
  activeEscrowAmount: "$845,200",
  pendingReleases: "$125,400",
  disputedFunds: "$45,800",
  autoReleaseTimer: "7 Days",
};

export const feeLedgerEntries = [
  {
    date: "2026-02-25",
    task: "Mobile App UI",
    gross: "$5,000",
    feePercent: "10%",
    feeCollected: "+$500",
  },
  {
    date: "2026-02-26",
    task: "Logo Design",
    gross: "$800",
    feePercent: "15%",
    feeCollected: "+$120",
  },
  {
    date: "2026-02-27",
    task: "SEO Audit",
    gross: "$1,500",
    feePercent: "10%",
    feeCollected: "+$150",
  },
  {
    date: "2026-02-28",
    task: "Copywriting",
    gross: "$450",
    feePercent: "20%",
    feeCollected: "+$90",
  },
  {
    date: "2026-03-01",
    task: "Wireframing",
    gross: "$950",
    feePercent: "12%",
    feeCollected: "+$114",
  },
];

export const platformSettings = {
  currentFeePercent: "10.00",
  lastUpdatedBy: "Admin on Oct 24, 2023",
  autoReleaseAfter: "7 Days",
  autoReleaseEnabled: true,
};

const settingsServiceTaxonomy = [
  {
    name: "Home Cleaning",
    children: [
      {
        name: "Standard Cleaning",
        children: [
          { name: "General house cleaning" },
          { name: "Apartment cleaning" },
          { name: "Room cleaning" },
        ],
      },
      {
        name: "Deep Cleaning",
        children: [
          { name: "Deep home cleaning" },
          { name: "Move-in / Move-out cleaning" },
          { name: "Post-renovation cleaning" },
        ],
      },
      {
        name: "Specialized Cleaning",
        children: [
          { name: "Carpet cleaning" },
          { name: "Window cleaning" },
          { name: "Sofa / upholstery cleaning" },
          { name: "Garage cleaning" },
          { name: "Basement cleaning" },
        ],
      },
    ],
  },
  {
    name: "Outdoor & Yard Work",
    children: [
      {
        name: "Lawn & Grass",
        children: [
          { name: "Grass cutting / mowing" },
          { name: "Lawn maintenance" },
          { name: "Weed removal" },
        ],
      },
      {
        name: "Garden Services",
        children: [
          { name: "Garden cleanup" },
          { name: "Tree trimming" },
          { name: "Hedge trimming" },
          { name: "Planting" },
        ],
      },
      {
        name: "Outdoor Maintenance",
        children: [
          { name: "Leaf removal" },
          { name: "Snow removal" },
          { name: "Pressure washing" },
        ],
      },
    ],
  },
  {
    name: "Home Repair & Handyman",
    children: [
      {
        name: "General Repairs",
        children: [
          { name: "Minor home repairs" },
          { name: "Fixture replacement" },
          { name: "Door / lock repair" },
          { name: "Wall patching" },
        ],
      },
      {
        name: "Assembly & Installation",
        children: [
          { name: "Furniture assembly" },
          { name: "TV mounting" },
          { name: "Shelf installation" },
          { name: "Curtain installation" },
        ],
      },
      {
        name: "Small Projects",
        children: [
          { name: "Drywall repair" },
          { name: "Caulking & sealing" },
          { name: "Minor carpentry" },
        ],
      },
    ],
  },
  {
    name: "Plumbing",
    children: [
      {
        name: "Basic Plumbing",
        children: [
          { name: "Faucet repair" },
          { name: "Leak repair" },
          { name: "Drain unclogging" },
          { name: "Toilet repair" },
        ],
      },
      {
        name: "Installations",
        children: [
          { name: "Sink installation" },
          { name: "Toilet installation" },
          { name: "Water heater installation" },
        ],
      },
      {
        name: "Advanced Plumbing",
        children: [
          { name: "Pipe replacement" },
          { name: "Sewer line repair" },
        ],
      },
    ],
  },
  {
    name: "Electrical",
    children: [
      {
        name: "Minor Electrical",
        children: [
          { name: "Light fixture installation" },
          { name: "Switch / outlet replacement" },
          { name: "Ceiling fan installation" },
        ],
      },
      {
        name: "Advanced Electrical",
        children: [
          { name: "Panel upgrades" },
          { name: "Wiring repair" },
          { name: "Generator installation" },
        ],
      },
    ],
  },
  {
    name: "Roofing",
    children: [
      {
        name: "Roof Repair",
        children: [
          { name: "Leak repair" },
          { name: "Shingle replacement" },
        ],
      },
      {
        name: "Roof Installation",
        children: [
          { name: "New roof installation" },
          { name: "Roof replacement" },
        ],
      },
      {
        name: "Roof Maintenance",
        children: [
          { name: "Roof inspection" },
          { name: "Gutter cleaning" },
          { name: "Gutter repair" },
        ],
      },
    ],
  },
  {
    name: "Automotive Services (On-site)",
    children: [
      {
        name: "Cleaning & Detailing",
        children: [
          { name: "Exterior wash" },
          { name: "Interior cleaning" },
          { name: "Full car detailing" },
        ],
      },
      {
        name: "Basic Maintenance",
        children: [
          { name: "Oil change" },
          { name: "Battery replacement" },
          { name: "Tire change" },
        ],
      },
      {
        name: "Diagnostics & Repair",
        children: [
          { name: "Brake repair" },
          { name: "Minor mechanical repair" },
        ],
      },
    ],
  },
  {
    name: "Moving & Hauling",
    children: [
      {
        name: "Moving Help",
        children: [
          { name: "Home moving" },
          { name: "Apartment moving" },
          { name: "Furniture moving" },
        ],
      },
      {
        name: "Pickup & Delivery",
        children: [
          { name: "Appliance pickup" },
          { name: "Store pickup" },
          { name: "Large item delivery" },
        ],
      },
      {
        name: "Junk Removal",
        children: [
          { name: "Trash removal" },
          { name: "Construction debris removal" },
          { name: "Furniture disposal" },
        ],
      },
    ],
  },
  {
    name: "Painting",
    children: [
      {
        name: "Interior Painting",
        children: [
          { name: "Room painting" },
          { name: "Wall repainting" },
          { name: "Trim painting" },
        ],
      },
      {
        name: "Exterior Painting",
        children: [
          { name: "Exterior house painting" },
          { name: "Fence painting" },
        ],
      },
    ],
  },
  {
    name: "Home Improvement",
    children: [
      {
        name: "Remodeling",
        children: [
          { name: "Bathroom renovation" },
          { name: "Kitchen renovation" },
        ],
      },
      {
        name: "Flooring",
        children: [
          { name: "Tile installation" },
          { name: "Laminate installation" },
          { name: "Hardwood flooring" },
        ],
      },
    ],
  },
  {
    name: "Appliance Services",
    children: [
      {
        name: "Installation",
        children: [
          { name: "Dishwasher installation" },
          { name: "Washing machine installation" },
          { name: "Refrigerator installation" },
        ],
      },
      {
        name: "Repair",
        children: [
          { name: "Appliance repair" },
          { name: "Troubleshooting" },
        ],
      },
    ],
  },
  {
    name: "Personal Assistance (Physical Errands)",
    children: [
      {
        name: "Errands",
        children: [
          { name: "Grocery pickup" },
          { name: "Prescription pickup" },
          { name: "Package drop-off" },
        ],
      },
      {
        name: "In-Person Help",
        children: [
          { name: "Waiting in line" },
          { name: "Event assistance" },
          { name: "Personal helper for a day" },
        ],
      },
    ],
  },
  {
    name: "Security & Smart Home",
    children: [
      {
        name: "Installation",
        children: [
          { name: "CCTV installation" },
          { name: "Smart lock installation" },
          { name: "Alarm system setup" },
        ],
      },
      {
        name: "Maintenance",
        children: [
          { name: "Camera repair" },
          { name: "System troubleshooting" },
        ],
      },
    ],
  },
  {
    name: "Pest Control",
    children: [
      { name: "Termite treatment" },
      { name: "Rodent removal" },
      { name: "General pest control" },
    ],
  },
  {
    name: "HVAC",
    children: [
      {
        name: "Maintenance",
        children: [
          { name: "AC servicing" },
          { name: "Furnace inspection" },
        ],
      },
      {
        name: "Installation",
        children: [
          { name: "AC installation" },
          { name: "Heating system installation" },
        ],
      },
    ],
  },
];

const toSlugToken = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildSettingsCategoryRows = (taxonomy) => {
  const rows = [];
  let counter = 1;

  const walk = (nodes, depth = 0, path = []) => {
    nodes.forEach((node) => {
      const chain = [...path, node.name];
      rows.push({
        id: String(counter).padStart(3, "0"),
        name: `${depth > 0 ? `${"> ".repeat(depth)}` : ""}${node.name}`,
        slug: chain.map((segment) => toSlugToken(segment)).join("-"),
        activeJobs: 0,
        status: depth === 0 ? "Active" : "Pending",
      });
      counter += 1;

      if (Array.isArray(node.children) && node.children.length > 0) {
        walk(node.children, depth + 1, chain);
      }
    });
  };

  walk(taxonomy);
  return rows;
};

export const settingsCategories = buildSettingsCategoryRows(
  settingsServiceTaxonomy,
);

export const adminAccountProfile = {
  fullName: "Alex Morgan",
  email: "alex.morgan@freelanceadmin.com",
  phone: "+1 (415) 555-0139",
  role: "Super Admin",
};

export const adminAccountSessions = [
  {
    device: "Chrome / Windows",
    ip: "39.45.22.11",
    lastActive: "2026-03-02 09:40",
    status: "Current",
  },
  {
    device: "Safari / iPhone",
    ip: "39.45.22.88",
    lastActive: "2026-03-01 20:12",
    status: "Revoke",
  },
  {
    device: "Edge / Windows",
    ip: "182.176.18.9",
    lastActive: "2026-02-28 13:05",
    status: "Revoke",
  },
];

export const verificationWorkflow = {
  user: {
    id: "USR-2204",
    name: "Alex Johnson",
    role: "Freelance Graphic Designer",
    joined: "Oct 12, 2023",
    status: "Pending Review",
    trustScore: 85,
    avatar: "/images/team/fl-1.png",
  },
  contact: {
    email: "alex.johnson@designstudio.com",
    phone: "+1 (555) 012-3456",
    location: "San Francisco, CA, USA",
    emailVerified: true,
    phoneVerified: true,
  },
  documents: [
    {
      id: "doc-front",
      title: "Government ID (Front)",
      filename: "driving_license_front.jpg",
      size: "2.4 MB",
      image: "/images/testimonials/testi-1.png",
    },
    {
      id: "doc-back",
      title: "Government ID (Back)",
      filename: "driving_license_back.jpg",
      size: "2.1 MB",
      image: "/images/testimonials/testi-2.png",
    },
    {
      id: "doc-selfie",
      title: "Selfie with ID",
      filename: "verification_selfie.jpg",
      size: "3.5 MB",
      image: "/images/testimonials/testi-3.png",
    },
  ],
  checks: [
    {
      id: "check-1",
      name: "AML/Sanctions Screening",
      detail: "No matches found in global databases",
      status: "PASSED",
    },
    {
      id: "check-2",
      name: "Face Match Analysis",
      detail: "98.5% confidence match between selfie and ID",
      status: "PASSED",
    },
    {
      id: "check-3",
      name: "Document Authenticity",
      detail: "Minor watermark edge mismatch detected",
      status: "REVIEW NEEDED",
    },
  ],
  activity: [
    {
      id: "act-1",
      title: "Documents Uploaded",
      detail: "User uploaded 3 verification documents.",
      time: "Oct 12, 2023 08:42 AM",
    },
    {
      id: "act-2",
      title: "Email Verified",
      detail: "User clicked verification link sent to email.",
      time: "Oct 12, 2023 09:15 AM",
    },
    {
      id: "act-3",
      title: "Account Created",
      detail: "User registered via Google Auth.",
      time: "Oct 12, 2023 09:40 AM",
    },
  ],
};
