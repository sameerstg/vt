interface DashboardAdminNavigationItem {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export const dasboardNavigation: DashboardAdminNavigationItem[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: "flaticon-home",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    name: "Disputes",
    icon: "flaticon-support",
    path: "/disputes",
  },
  {
    id: 3,
    name: "Users",
    icon: "flaticon-user",
    path: "/users",
  },
  {
    id: 4,
    name: "Transactions",
    icon: "flaticon-exchange",
    path: "/transactions",
  },
  {
    id: 5,
    name: "Reports",
    icon: "flaticon-statistic",
    path: "/reports",
  },
  {
    id: 6,
    name: "Settings",
    icon: "flaticon-settings",
    path: "/settings",
  },
  {
    id: 7,
    name: "Logout",
    icon: "flaticon-logout",
    path: "/login",
  },
];