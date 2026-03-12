const menus = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 6,
    name: "About",
    path: "/about-1",
  },
  {
    id: 2,
    name: "Browse Jobs",
    children: [
      {
        id: 1,
        name: "Services",
        path: "/service-1",
      },
      {
        id: 2,
        name: "Projects",
        path: "/project-1",
      },
      {
        id: 3,
        name: "Job View",
        path: "/job-1",
      },
    ],
  },
  // {
  //   id: 3,
  //   name: "Users",
  //   children: [
  //     {
  //       id: 1,
  //       name: "Dashboard",
  //       children: [
  //         { id: 1, name: "Dashboard", path: "/dashboard" },
  //         { id: 2, name: "Worker Dashboard", path: "/worker-dashboard" },
  //         { id: 3, name: "Contractor Dashboard", path: "/contractor-dashboard" },
  //         { id: 4, name: "Admin Dashboard", path: "/admin-dashboard" },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: "Employee",
  //       children: [
  //         { id: 1, name: "Employee V1", path: "/employee-1" },
  //         { id: 2, name: "Employee V2", path: "/employee-2" },
  //         {
  //           id: 3,
  //           name: "Employee Single",
  //           path: "/employee-single",
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: "Workers",
  //       children: [
  //         { id: 1, name: "Worker V1", path: "/worker-1" },
          
  //         {
  //           id: 4,
  //           name: "Worker Single v1",
  //           path: "/worker-single",
  //         },
          
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: "Become Worker",
  //       path: "/become-seller",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: "Pages",
  //   children: [
  //     {
  //       id: 4,
  //       name: "Contact",
  //       path: "/contact",
  //     },
  //     {
  //       id: 6,
  //       name: "Faq",
  //       path: "/faq",
  //     },
  //     {
  //       id: 7,
  //       name: "Help",
  //       path: "/help",
  //     },
  //     {
  //       id: 12,
  //       name: "Terms",
  //       path: "/terms",
  //     },
  //   ],
  // },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

export default menus;
