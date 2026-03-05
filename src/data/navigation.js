const menus = [
  {
    id: 1,
    name: "Home",
    children: [
      { id: 1, name: "Home V1", path: "/" },

    ],
  },
  {
    id: 6,
    name: "About",
    children: [
      { id: 1, name: "About v1", path: "/about-1" },
      
    ],
  },
  {
    id: 2,
    name: "Browse Jobs",
    children: [
      {
        id: 1,
        name: "Services",

        children: [
          { id: 1, name: "Service v1", path: "/service-1" },
          { id: 2, name: "Service v2", path: "/service-2" },
          { id: 9, name: "Service Single v1", path: "/service-single" },
          { id: 10, name: "Service Single v2", path: "/service-single-v2" },
        ],
      },
      {
        id: 2,
        name: "Projects",
        children: [
          { id: 1, name: "Project v1", path: "/project-1" },
        
          { id: 2, name: "Project Single v1", path: "/project-single" },
          { id: 3, name: "Project Single v2", path: "/project-single-v2" },
          
        ],
      },
      {
        id: 3,
        name: "Job View",
        children: [
          { id: 1, name: "Job list v1", path: "/job-1" },
          { id: 2, name: "Job list v2", path: "/job-2" },
          { id: 3, name: "Job list v3", path: "/job-3" },
          { id: 4, name: "Job Single", path: "/job-single" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Users",
    children: [
      {
        id: 1,
        name: "Dashboard",
        children: [
          { id: 1, name: "Dashboard", path: "/dashboard" },
          { id: 2, name: "Worker Dashboard", path: "/worker-dashboard" },
          { id: 3, name: "Contractor Dashboard", path: "/contractor-dashboard" },
          { id: 4, name: "Admin Dashboard", path: "/admin-dashboard" },
        ],
      },
      {
        id: 2,
        name: "Employee",
        children: [
          { id: 1, name: "Employee V1", path: "/employee-1" },
          { id: 2, name: "Employee V2", path: "/employee-2" },
          {
            id: 3,
            name: "Employee Single",
            path: "/employee-single",
          },
        ],
      },
      {
        id: 3,
        name: "Workers",
        children: [
          { id: 1, name: "Worker V1", path: "/worker-1" },
          
          {
            id: 4,
            name: "Worker Single v1",
            path: "/worker-single",
          },
          
        ],
      },
      {
        id: 4,
        name: "Become Worker",
        path: "/become-seller",
      },
    ],
  },
  {
    id: 4,
    name: "Pages",
    children: [
      {
        id: 4,
        name: "Contact",
        path: "/contact",
      },
      {
        id: 6,
        name: "Faq",
        path: "/faq",
      },
      {
        id: 7,
        name: "Help",
        path: "/help",
      },
      {
        id: 12,
        name: "Terms",
        path: "/terms",
      },
    ],
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

export default menus;

