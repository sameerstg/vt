interface MenuItem {
  id: number;
  name: string;
  path?: string;
  children?: MenuItem[];
}

const menus: MenuItem[] = [
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
      { id: 1, name: "Services", path: "/service-1" },
      { id: 9, name: "Service Single", path: "/service-single" },
      { id: 2, name: "Projects", path: "/project-1" },
      { id: 3, name: "Project Single", path: "/project-single" },
      { id: 4, name: "Job list", path: "/job-1" },
      { id: 5, name: "Job Single", path: "/job-single" },
    ],
  },
  {
    id: 3,
    name: "Users",
    children: [
      { id: 1, name: "Dashboard", path: "/dashboard" },
      { id: 2, name: "Worker Dashboard", path: "/worker-dashboard" },
      { id: 3, name: "Contractor Dashboard", path: "/contractor-dashboard" },
      { id: 4, name: "Employee", path: "/employee-1" },
      { id: 5, name: "Employee Single", path: "/employee-single" },
      { id: 6, name: "Workers", path: "/worker-1" },
      { id: 7, name: "Worker Single", path: "/worker-single" },
      { id: 8, name: "Become Worker", path: "/become-seller" },
    ],
  },
  {
    id: 4,
    name: "Pages",
    children: [
      { id: 9, name: "Contact", path: "/contact" },
      { id: 10, name: "Faq", path: "/faq" },
      { id: 11, name: "Help", path: "/help" },
      { id: 12, name: "Terms", path: "/terms" },
    ],
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
  },
];

export default menus;
