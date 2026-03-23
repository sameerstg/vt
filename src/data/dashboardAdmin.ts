interface DashboardAdminNavigationItem {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export const dasboardNavigation: DashboardAdminNavigationItem[] = [
  // Start (indices 0–3)
  { id: 1, name: "Dashboard",    icon: "flaticon-home",      path: "/admin/dashboard" },
  { id: 2, name: "Disputes",     icon: "flaticon-support",   path: "/admin/disputes" },
  { id: 3, name: "Users",        icon: "flaticon-user",      path: "/admin/users" },
  { id: 4, name: "Transactions", icon: "flaticon-exchange",  path: "/admin/transactions" },
  // Manage (indices 4–7)
  { id: 5, name: "Teams",        icon: "flaticon-team",      path: "/admin/teams" },
  { id: 6, name: "Projects",     icon: "flaticon-contract",  path: "/admin/projects" },
  { id: 7, name: "Reports",      icon: "flaticon-statistic", path: "/admin/reports" },
  { id: 8, name: "Settings",     icon: "flaticon-settings",  path: "/admin/settings" },
  // Account (index 8)
  { id: 9, name: "Logout",       icon: "flaticon-logout",    path: "/login" },
];
