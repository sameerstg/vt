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
        path: "/client/manage-jobs",
    },
    {
        id: 3,
        name: "Review Offers",
        icon: "flaticon-document",
        path: "/client/proposal",
    },
    {
        id: 4,
        name: "Escrow",
        icon: "flaticon-dollar",
        path: "/client/payouts",
    },
    {
        id: 5,
        name: "Payments",
        icon: "flaticon-credit-card",
        path: "/client/invoice",
    },
    {
        id: 6,
        name: "Saved",
        icon: "flaticon-like",
        path: "/client/saved",
    },
    {
        id: 7,
        name: "Message",
        icon: "flaticon-chat",
        path: "/client/message",
    },
    {
        id: 8,
        name: "Reviews",
        icon: "flaticon-review-1",
        path: "/client/reviews",
    },
    {
        id: 9,
        name: "Manage Projects",
        icon: "flaticon-content",
        path: "/client/manage-projects",
    },
    {
        id: 10,
        name: "Create Project",
        icon: "flaticon-document",
        path: "/client/create-projects",
    },
    {
        id: 11,
        name: "Statements",
        icon: "flaticon-web",
        path: "/client/statements",
    },
    {
        id: 12,
        name: "My Profile",
        icon: "flaticon-photo",
        path: "/client/my-profile",
    },
    {
        id: 13,
        name: "Logout",
        icon: "flaticon-logout",
        path: "/login",
    },
];
