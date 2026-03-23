const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const d = (daysAgo) => new Date(Date.now() - 86400000 * daysAgo).toISOString();
const dl = (daysAhead) => new Date(Date.now() + 86400000 * daysAhead).toISOString().slice(0, 10);

const assignments = new Map([
  // PENDING (5)
  ["asgn-p1", { id: "asgn-p1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: null, pay: 800, deadline: dl(14), status: "PENDING", note: "Handle the frontend module", createdAt: d(1) }],
  ["asgn-p1b", { id: "asgn-p1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Scheduling Module", pay: 700, deadline: dl(16), status: "PENDING", note: "Build appointment scheduling feature", createdAt: d(1) }],
  ["asgn-p1c", { id: "asgn-p1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Settings Page", pay: 500, deadline: dl(10), status: "PENDING", note: null, createdAt: d(2) }],
  ["asgn-p1d", { id: "asgn-p1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 1000, deadline: dl(21), status: "PENDING", note: "Shipping label generation", createdAt: d(1) }],
  ["asgn-p1e", { id: "asgn-p1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Data Analytics Team", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Dashboard Widgets", pay: 650, deadline: dl(11), status: "PENDING", note: null, createdAt: d(3) }],
  ["asgn-p2", { id: "asgn-p2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "UI Phase", pay: 650, deadline: dl(10), status: "PENDING", note: "Design the patient portal screens", createdAt: d(2) }],
  ["asgn-p3", { id: "asgn-p3", contractorId: "contractor-001", workerId: "worker-023", workerName: "James Wilson", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: null, pay: 1200, deadline: dl(20), status: "PENDING", note: "Backend API integration", createdAt: d(1) }],
  ["asgn-p4", { id: "asgn-p4", contractorId: "contractor-001", workerId: "worker-031", workerName: "Sofia Chen", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Mobile App", pay: 900, deadline: dl(18), status: "PENDING", note: null, createdAt: d(3) }],
  ["asgn-p5", { id: "asgn-p5", contractorId: "contractor-001", workerId: "worker-032", workerName: "Marcus Lee", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Android Client", pay: 750, deadline: dl(12), status: "PENDING", note: "Android client for ERP", createdAt: d(1) }],

  // ACCEPTED (5)
  ["asgn-a1", { id: "asgn-a1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: "ms-C11-1", milestoneTitle: "Design Phase", pay: 400, deadline: dl(7), status: "ACCEPTED", note: null, createdAt: d(5) }],
  ["asgn-a1b", { id: "asgn-a1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Module Config", pay: 600, deadline: dl(9), status: "ACCEPTED", note: "Configure user roles and permissions", createdAt: d(4) }],
  ["asgn-a1c", { id: "asgn-a1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Data Layer", pay: 750, deadline: dl(12), status: "ACCEPTED", note: null, createdAt: d(3) }],
  ["asgn-a1d", { id: "asgn-a1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(6), status: "ACCEPTED", note: "Inventory sync component", createdAt: d(6) }],
  ["asgn-a1e", { id: "asgn-a1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Product Team", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Auth Module", pay: 850, deadline: dl(14), status: "ACCEPTED", note: null, createdAt: d(2) }],
  ["asgn-a2", { id: "asgn-a2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 550, deadline: dl(9), status: "ACCEPTED", note: "Complete dashboard redesign", createdAt: d(4) }],
  ["asgn-a3", { id: "asgn-a3", contractorId: "contractor-001", workerId: "worker-041", workerName: "Derek Owens", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "QA Sprint 1", pay: 700, deadline: dl(5), status: "ACCEPTED", note: null, createdAt: d(6) }],
  ["asgn-a4", { id: "asgn-a4", contractorId: "contractor-001", workerId: "worker-051", workerName: "Nathan Brooks", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "DevOps Setup", pay: 850, deadline: dl(11), status: "ACCEPTED", note: "Set up CI/CD pipeline", createdAt: d(3) }],
  ["asgn-a5", { id: "asgn-a5", contractorId: "contractor-001", workerId: "worker-081", workerName: "Rachel Kim", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: null, pay: 950, deadline: dl(15), status: "ACCEPTED", note: "Analytics dashboard", createdAt: d(2) }],

  // IN_PROGRESS (5)
  ["asgn-i1", { id: "asgn-i1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Frontend Sprint", pay: 1100, deadline: dl(4), status: "IN_PROGRESS", note: null, createdAt: d(10) }],
  ["asgn-i1b", { id: "asgn-i1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Reporting Module", pay: 950, deadline: dl(5), status: "IN_PROGRESS", note: "Generate PDF reports for finance team", createdAt: d(8) }],
  ["asgn-i1c", { id: "asgn-i1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(3), status: "IN_PROGRESS", note: null, createdAt: d(9) }],
  ["asgn-i1d", { id: "asgn-i1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Scanner Integration", pay: 1200, deadline: dl(7), status: "IN_PROGRESS", note: "Barcode scanner API integration", createdAt: d(7) }],
  ["asgn-i1e", { id: "asgn-i1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Data Analytics Team", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Notification System", pay: 800, deadline: dl(6), status: "IN_PROGRESS", note: null, createdAt: d(6) }],
  ["asgn-i2", { id: "asgn-i2", contractorId: "contractor-001", workerId: "worker-023", workerName: "James Wilson", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "API Layer", pay: 1300, deadline: dl(6), status: "IN_PROGRESS", note: "Core REST API endpoints", createdAt: d(8) }],
  ["asgn-i3", { id: "asgn-i3", contractorId: "contractor-001", workerId: "worker-061", workerName: "Camille Dufour", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Brand Identity", pay: 600, deadline: dl(3), status: "IN_PROGRESS", note: null, createdAt: d(7) }],
  ["asgn-i4", { id: "asgn-i4", contractorId: "contractor-001", workerId: "worker-071", workerName: "Hassan Ali", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: "ms-C12-2", milestoneTitle: "Database Schema", pay: 800, deadline: dl(5), status: "IN_PROGRESS", note: "Schema design and migrations", createdAt: d(9) }],
  ["asgn-i5", { id: "asgn-i5", contractorId: "contractor-001", workerId: "worker-091", workerName: "Diana Wolf", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Security Audit", pay: 1500, deadline: dl(8), status: "IN_PROGRESS", note: "Pen test and security review", createdAt: d(6) }],

  // IN_REVIEW (5)
  ["asgn-r1", { id: "asgn-r1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: "ms-C11-1", milestoneTitle: "Design Phase", pay: 400, deadline: dl(-1), status: "IN_REVIEW", note: null, submissionDescription: "Completed all design phase deliverables including wireframes, component library, and responsive layouts. All screens reviewed internally before submission.", submissionFileName: "design-phase-deliverables.zip", submittedAt: d(1), createdAt: d(15) }],
  ["asgn-r1b", { id: "asgn-r1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Search Feature", pay: 650, deadline: dl(-2), status: "IN_REVIEW", note: "Full-text search with filters", submissionDescription: "Implemented full-text search with Elasticsearch integration. Supports filters by date, category, and status. Unit tests included.", submissionFileName: "search-feature-v2.zip", submittedAt: d(2), createdAt: d(13) }],
  ["asgn-r1c", { id: "asgn-r1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(0), status: "IN_REVIEW", note: null, submissionDescription: "Work completed as scoped. Please review the attached report for full test coverage and integration results.", submissionFileName: null, submittedAt: d(1), createdAt: d(12) }],
  ["asgn-r1d", { id: "asgn-r1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Export Module", pay: 750, deadline: dl(-3), status: "IN_REVIEW", note: "CSV and Excel export functionality", submissionDescription: "Export module complete. CSV and Excel export work for all data tables. Added column selection and date range filter before export.", submissionFileName: "export-module-final.zip", submittedAt: d(3), createdAt: d(14) }],
  ["asgn-r1e", { id: "asgn-r1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Product Team", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "User Onboarding", pay: 900, deadline: dl(-1), status: "IN_REVIEW", note: null, submissionDescription: "Onboarding flow built with 4-step wizard, email verification, and profile setup. Animations added per spec.", submissionFileName: "onboarding-flow.fig", submittedAt: d(1), createdAt: d(11) }],
  ["asgn-r2", { id: "asgn-r2", contractorId: "contractor-001", workerId: "worker-022", workerName: "Maria Garcia", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(-2), status: "IN_REVIEW", note: "UI components delivered", submissionDescription: "All UI components delivered as discussed. Storybook docs included for each component. Pixel-perfect match to Figma designs.", submissionFileName: "ui-components-v3.zip", submittedAt: d(2), createdAt: d(14) }],
  ["asgn-r3", { id: "asgn-r3", contractorId: "contractor-001", workerId: "worker-041", workerName: "Derek Owens", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "QA Report", pay: 600, deadline: dl(0), status: "IN_REVIEW", note: "Full QA report submitted", submissionDescription: "Full QA report submitted. 147 test cases executed, 3 minor bugs found and fixed. Regression suite added to CI pipeline.", submissionFileName: "qa-report-final.pdf", submittedAt: d(1), createdAt: d(12) }],
  ["asgn-r4", { id: "asgn-r4", contractorId: "contractor-001", workerId: "worker-071", workerName: "Hassan Ali", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "API Docs", pay: 450, deadline: dl(-3), status: "IN_REVIEW", note: null, submissionDescription: "API documentation written in OpenAPI 3.0 spec. Hosted on internal Swagger UI. All 42 endpoints covered with request/response examples.", submissionFileName: "api-docs-openapi.yaml", submittedAt: d(3), createdAt: d(13) }],
  ["asgn-r5", { id: "asgn-r5", contractorId: "contractor-001", workerId: "worker-081", workerName: "Rachel Kim", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Analytics Module", pay: 950, deadline: dl(-1), status: "IN_REVIEW", note: "Dashboard + export ready", submissionDescription: "Analytics dashboard with real-time charts, date range picker, and CSV export. Metrics include DAU, retention, and revenue. Mobile responsive.", submissionFileName: "analytics-module.zip", submittedAt: d(1), createdAt: d(11) }],

  // IN_DISPUTE (5)
  ["asgn-dis1", { id: "asgn-dis1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Frontend Sprint", pay: 1100, deadline: dl(-5), status: "IN_DISPUTE", note: "Deliverables not acknowledged after submission", createdAt: d(20) }],
  ["asgn-dis2", { id: "asgn-dis2", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Scanner Integration", pay: 1200, deadline: dl(-8), status: "IN_DISPUTE", note: "Scope was changed after work began", createdAt: d(18) }],
  ["asgn-dis3", { id: "asgn-dis3", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Search Feature", pay: 650, deadline: dl(-6), status: "IN_DISPUTE", note: null, createdAt: d(17) }],
  ["asgn-dis4", { id: "asgn-dis4", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Data Analytics Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 750, deadline: dl(-4), status: "IN_DISPUTE", note: "Payment not released after approval", createdAt: d(16) }],
  ["asgn-dis5", { id: "asgn-dis5", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Product Team", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "User Onboarding", pay: 900, deadline: dl(-7), status: "IN_DISPUTE", note: "Requirements were unclear, dispute raised", createdAt: d(15) }],

  // DECLINED (5)
  ["asgn-d1", { id: "asgn-d1", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Mobile Dev Squad", projectId: "proj-003", projectTitle: "Mobile App for Food Delivery", milestoneId: null, milestoneTitle: null, pay: 600, deadline: dl(30), status: "DECLINED", note: "Backend API integration work", createdAt: d(7) }],
  ["asgn-d1b", { id: "asgn-d1b", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Web Dev Team Alpha", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "Legacy Migration", pay: 1100, deadline: dl(20), status: "DECLINED", note: null, createdAt: d(9) }],
  ["asgn-d1c", { id: "asgn-d1c", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "QA & Testing Team", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: "Billing Module", pay: 800, deadline: dl(25), status: "DECLINED", note: "Out of scope for current sprint", createdAt: d(10) }],
  ["asgn-d1d", { id: "asgn-d1d", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Data Analytics Team", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: null, pay: 700, deadline: dl(18), status: "DECLINED", note: null, createdAt: d(8) }],
  ["asgn-d1e", { id: "asgn-d1e", contractorId: "contractor-001", workerId: "worker-021", workerName: "Alex Thompson", teamName: "Product Team", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Localization", pay: 950, deadline: dl(28), status: "DECLINED", note: "i18n and multi-language support", createdAt: d(6) }],
  ["asgn-d2", { id: "asgn-d2", contractorId: "contractor-001", workerId: "worker-033", workerName: "Priya Patel", projectId: "proj-C09", projectTitle: "Enterprise ERP System", milestoneId: null, milestoneTitle: "React Native", pay: 700, deadline: dl(25), status: "DECLINED", note: null, createdAt: d(10) }],
  ["asgn-d3", { id: "asgn-d3", contractorId: "contractor-001", workerId: "worker-042", workerName: "Aisha Nkosi", projectId: "proj-C10", projectTitle: "Hospital Management System", milestoneId: null, milestoneTitle: null, pay: 500, deadline: dl(20), status: "DECLINED", note: "Automation testing scope", createdAt: d(9) }],
  ["asgn-d4", { id: "asgn-d4", contractorId: "contractor-001", workerId: "worker-052", workerName: "Elena Russo", projectId: "proj-C12", projectTitle: "Warehouse Automation", milestoneId: null, milestoneTitle: "Cloud Migration", pay: 1400, deadline: dl(35), status: "DECLINED", note: null, createdAt: d(8) }],
  ["asgn-d5", { id: "asgn-d5", contractorId: "contractor-001", workerId: "worker-062", workerName: "Jordan Hayes", projectId: "proj-C11", projectTitle: "SaaS Platform Build", milestoneId: null, milestoneTitle: "Motion Design", pay: 550, deadline: dl(22), status: "DECLINED", note: "Motion design for onboarding", createdAt: d(6) }],

  // contractor-001 as worker — PENDING
  ["asgn-cp1", { id: "asgn-cp1", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-01", projectTitle: "Cloud Migration Platform", milestoneId: null, milestoneTitle: "Architecture Review", pay: 2500, deadline: dl(15), status: "PENDING", note: "Lead the architecture review phase", createdAt: d(1) }],
  ["asgn-cp2", { id: "asgn-cp2", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-02", projectTitle: "ERP Modernisation", milestoneId: null, milestoneTitle: null, pay: 3200, deadline: dl(20), status: "PENDING", note: "Migrate legacy ERP to microservices", createdAt: d(2) }],
  ["asgn-cp3", { id: "asgn-cp3", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-03", projectTitle: "Payment Gateway V2", milestoneId: null, milestoneTitle: "Integration Sprint", pay: 1800, deadline: dl(12), status: "PENDING", note: null, createdAt: d(1) }],
  ["asgn-cp4", { id: "asgn-cp4", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-04", projectTitle: "DevOps Pipeline Rebuild", milestoneId: null, milestoneTitle: "CI/CD Setup", pay: 2100, deadline: dl(18), status: "PENDING", note: "Rebuild CI/CD with GitHub Actions", createdAt: d(3) }],
  ["asgn-cp5", { id: "asgn-cp5", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-05", projectTitle: "Data Warehouse Build", milestoneId: null, milestoneTitle: null, pay: 2800, deadline: dl(25), status: "PENDING", note: null, createdAt: d(2) }],

  // contractor-001 as worker — ACCEPTED
  ["asgn-ca1", { id: "asgn-ca1", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-06", projectTitle: "Kubernetes Migration", milestoneId: null, milestoneTitle: "Cluster Setup", pay: 3000, deadline: dl(10), status: "ACCEPTED", note: "Set up multi-region k8s cluster", createdAt: d(5) }],
  ["asgn-ca2", { id: "asgn-ca2", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-07", projectTitle: "Fraud Detection System", milestoneId: null, milestoneTitle: null, pay: 4000, deadline: dl(14), status: "ACCEPTED", note: null, createdAt: d(4) }],
  ["asgn-ca3", { id: "asgn-ca3", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-08", projectTitle: "CRM Integration", milestoneId: null, milestoneTitle: "API Layer", pay: 2200, deadline: dl(8), status: "ACCEPTED", note: "Salesforce and HubSpot connectors", createdAt: d(6) }],
  ["asgn-ca4", { id: "asgn-ca4", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-09", projectTitle: "Monitoring Stack", milestoneId: null, milestoneTitle: "Prometheus Setup", pay: 1900, deadline: dl(11), status: "ACCEPTED", note: null, createdAt: d(3) }],
  ["asgn-ca5", { id: "asgn-ca5", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-10", projectTitle: "Wallet API", milestoneId: null, milestoneTitle: "Core Transactions", pay: 3500, deadline: dl(16), status: "ACCEPTED", note: "Handle deposit, withdraw, transfer", createdAt: d(2) }],

  // contractor-001 as worker — IN_PROGRESS
  ["asgn-ci1", { id: "asgn-ci1", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-11", projectTitle: "Auto-Scaling Infrastructure", milestoneId: null, milestoneTitle: "Load Testing", pay: 2700, deadline: dl(6), status: "IN_PROGRESS", note: "Load test and tune auto-scaling rules", createdAt: d(10) }],
  ["asgn-ci2", { id: "asgn-ci2", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-12", projectTitle: "Microservices Refactor", milestoneId: null, milestoneTitle: null, pay: 3800, deadline: dl(5), status: "IN_PROGRESS", note: null, createdAt: d(8) }],
  ["asgn-ci3", { id: "asgn-ci3", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-13", projectTitle: "PCI Compliance Audit", milestoneId: null, milestoneTitle: "Audit Report", pay: 4500, deadline: dl(4), status: "IN_PROGRESS", note: "PCI DSS Level 1 compliance audit", createdAt: d(9) }],
  ["asgn-ci4", { id: "asgn-ci4", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-14", projectTitle: "Log Aggregation System", milestoneId: null, milestoneTitle: "ELK Stack", pay: 2300, deadline: dl(7), status: "IN_PROGRESS", note: null, createdAt: d(7) }],
  ["asgn-ci5", { id: "asgn-ci5", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-15", projectTitle: "API Gateway Upgrade", milestoneId: null, milestoneTitle: "Rate Limiting", pay: 1700, deadline: dl(3), status: "IN_PROGRESS", note: "Implement rate limiting and auth middleware", createdAt: d(6) }],

  // contractor-001 as worker — IN_REVIEW
  ["asgn-cr1", { id: "asgn-cr1", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-16", projectTitle: "Disaster Recovery Plan", milestoneId: null, milestoneTitle: null, pay: 3100, deadline: dl(-1), status: "IN_REVIEW", submissionDescription: "Full DR plan documented with RTO/RPO targets. Failover runbooks and automated backup scripts included.", submissionFileName: "dr-plan-v2.pdf", submittedAt: d(1), createdAt: d(15) }],
  ["asgn-cr2", { id: "asgn-cr2", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-17", projectTitle: "Service Mesh Setup", milestoneId: null, milestoneTitle: "Istio Config", pay: 2900, deadline: dl(-2), status: "IN_REVIEW", submissionDescription: "Istio service mesh fully configured with mTLS, circuit breakers, and distributed tracing via Jaeger.", submissionFileName: "istio-config.zip", submittedAt: d(2), createdAt: d(13) }],
  ["asgn-cr3", { id: "asgn-cr3", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-18", projectTitle: "Transaction Reconciliation", milestoneId: null, milestoneTitle: null, pay: 3600, deadline: dl(0), status: "IN_REVIEW", submissionDescription: "Reconciliation engine handles 50K+ transactions/day with full audit trail and discrepancy alerts.", submissionFileName: null, submittedAt: d(1), createdAt: d(12) }],
  ["asgn-cr4", { id: "asgn-cr4", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-19", projectTitle: "Cost Optimisation Review", milestoneId: null, milestoneTitle: "AWS Audit", pay: 2000, deadline: dl(-3), status: "IN_REVIEW", submissionDescription: "AWS cost audit complete. Identified $12K/month savings via reserved instances and right-sizing. Full report attached.", submissionFileName: "aws-cost-audit.xlsx", submittedAt: d(3), createdAt: d(14) }],
  ["asgn-cr5", { id: "asgn-cr5", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-20", projectTitle: "Identity Provider Integration", milestoneId: null, milestoneTitle: "SSO Setup", pay: 2600, deadline: dl(-1), status: "IN_REVIEW", submissionDescription: "Okta SSO integrated with SAML 2.0 and SCIM provisioning. All 3 environments configured and tested.", submissionFileName: "sso-setup-docs.zip", submittedAt: d(1), createdAt: d(11) }],

  // contractor-001 as worker — DECLINED
  ["asgn-cde1", { id: "asgn-cde1", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-21", projectTitle: "Blockchain Audit", milestoneId: null, milestoneTitle: null, pay: 5000, deadline: dl(30), status: "DECLINED", note: "Outside current capability scope", createdAt: d(7) }],
  ["asgn-cde2", { id: "asgn-cde2", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-22", projectTitle: "On-Prem to Hybrid Cloud", milestoneId: null, milestoneTitle: "Phase 1", pay: 6000, deadline: dl(40), status: "DECLINED", note: null, createdAt: d(9) }],
  ["asgn-cde3", { id: "asgn-cde3", contractorId: "contractor-ext-2", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Enterprise Solutions Hub", projectId: "proj-ext-23", projectTitle: "IoT Data Pipeline", milestoneId: null, milestoneTitle: null, pay: 4200, deadline: dl(35), status: "DECLINED", note: "Timeline too aggressive", createdAt: d(10) }],
  ["asgn-cde4", { id: "asgn-cde4", contractorId: "contractor-ext-3", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "FinTech Builders", projectId: "proj-ext-24", projectTitle: "Regulatory Reporting Engine", milestoneId: null, milestoneTitle: null, pay: 3700, deadline: dl(28), status: "DECLINED", note: null, createdAt: d(8) }],
  ["asgn-cde5", { id: "asgn-cde5", contractorId: "contractor-ext-1", workerId: "contractor-001", workerName: "BuildRight Solutions", teamName: "Infrastructure Alliance", projectId: "proj-ext-25", projectTitle: "Zero Trust Network", milestoneId: null, milestoneTitle: "Policy Setup", pay: 4800, deadline: dl(45), status: "DECLINED", note: "Budget mismatch", createdAt: d(6) }],
]);

export async function GET(request) {
  await delay(200);
  const { searchParams } = new URL(request.url);
  const contractorId = searchParams.get("contractorId");
  const workerId = searchParams.get("workerId");

  if (!contractorId && !workerId) {
    return Response.json({ success: true, data: [] });
  }

  let result = Array.from(assignments.values());

  if (contractorId) result = result.filter(a => a.contractorId === contractorId);
  if (workerId) result = result.filter(a => a.workerId === workerId);

  return Response.json({ success: true, data: result });
}

export async function POST(request) {
  await delay(300);
  const body = await request.json();

  if (body.action !== "create") {
    return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
  }

  const { contractorId, workerId, workerName, projectId, projectTitle, pay, deadline } = body;
  if (!contractorId || !workerId || !workerName || !projectId || !projectTitle || !pay || !deadline) {
    return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const id = `asgn-${Date.now()}`;
  const record = {
    id,
    contractorId,
    workerId,
    workerName,
    projectId,
    projectTitle,
    milestoneId: body.milestoneId || null,
    milestoneTitle: body.milestoneTitle || null,
    pay: parseFloat(pay),
    deadline,
    status: "PENDING",
    note: body.note || null,
    createdAt: new Date().toISOString(),
  };

  assignments.set(id, record);
  return Response.json({ success: true, data: record });
}

export async function PUT(request) {
  await delay(200);
  const body = await request.json();

  if (body.action === "respond") {
    const { assignmentId, status } = body;
    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      return Response.json({ success: false, error: "Invalid status" }, { status: 400 });
    }
    const record = assignments.get(assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "PENDING") return Response.json({ success: false, error: "Assignment already responded to" }, { status: 400 });
    record.status = status;
    assignments.set(assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "start") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "ACCEPTED") return Response.json({ success: false, error: "Only ACCEPTED assignments can be started" }, { status: 400 });
    record.status = "IN_PROGRESS";
    assignments.set(body.assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "submit") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "IN_PROGRESS") return Response.json({ success: false, error: "Only IN_PROGRESS assignments can be submitted" }, { status: 400 });
    record.status = "IN_REVIEW";
    record.submissionDescription = body.description || null;
    record.submissionFileName = body.fileName || null;
    record.submittedAt = new Date().toISOString();
    assignments.set(body.assignmentId, record);
    return Response.json({ success: true, data: record });
  }

  if (body.action === "cancel") {
    const record = assignments.get(body.assignmentId);
    if (!record) return Response.json({ success: false, error: "Assignment not found" }, { status: 404 });
    if (record.status !== "PENDING") return Response.json({ success: false, error: "Cannot cancel a responded assignment" }, { status: 400 });
    assignments.delete(body.assignmentId);
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Invalid action" }, { status: 400 });
}
