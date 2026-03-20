interface DashboardClientNavigationItem {
  id: number;
  name: string;
  icon: string;
  path: string;
}

export const dasboardNavigation: DashboardClientNavigationItem[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: "flaticon-home",
    path: "/client/dashboard",
  },
  {
    id: 2,
    name: "My Tasks",
    icon: "flaticon-briefcase",
    path: "/manage-jobs",
  },
  {
    id: 3,
    name: "Review Offers",
    icon: "flaticon-document",
    path: "/proposal",
  },
  {
    id: 4,
    name: "Escrow",
    icon: "flaticon-dollar",
    path: "/payouts",
  },
  {
    id: 5,
    name: "Payments",
    icon: "flaticon-credit-card",
    path: "/invoice",
  },
  {
    id: 6,
    name: "Saved",
    icon: "flaticon-like",
    path: "/saved",
  },
  {
    id: 7,
    name: "Message",
    icon: "flaticon-chat",
    path: "/message",
  },
  {
    id: 8,
    name: "Reviews",
    icon: "flaticon-review-1",
    path: "/reviews",
  },
  {
    id: 9,
    name: "Manage Projects",
    icon: "flaticon-content",
    path: "/manage-projects",
  },
  {
    id: 10,
    name: "Create Project",
    icon: "flaticon-document",
    path: "/create-projects",
  },
  {
    id: 11,
    name: "Statements",
    icon: "flaticon-web",
    path: "/statements",
  },
  {
    id: 12,
    name: "My Profile",
    icon: "flaticon-photo",
    path: "/my-profile",
  },
  {
    id: 13,
    name: "Logout",
    icon: "flaticon-logout",
    path: "/login",
  },
];
