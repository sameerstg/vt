interface NavLink {
  id: number;
  name: string;
  path: string;
}

interface NavLinks {
  about: NavLink[];
  category: NavLink[];
  support: NavLink[];
}

export const about: NavLink[] = [
   { id: 5, name: "Terms of Service", path: "/terms-condition1" },
  { id: 4, name: "Privacy Policy", path: "/privacy-policy" },
 
];

export const category: NavLink[] = [
  { id: 1, name: "Graphics & Design", path: "/service-1" },
  { id: 2, name: "Digital Marketing", path: "/service-1" },
  { id: 3, name: "Writing & Translation", path: "/service-1" },
  { id: 4, name: "Video & Animation", path: "/service-1" },
  { id: 5, name: "Music & Audio", path: "/service-1" },
  { id: 6, name: "Programming & Tech", path: "/service-1" },
  { id: 7, name: "Data", path: "/service-1" },
  { id: 8, name: "Business", path: "/service-1" },
  { id: 9, name: "Lifestyle", path: "/service-1" },
];

export const support: NavLink[] = [
  { id: 1, name: "Help & Support", path: "/help" },
];

export const currency: string[] = ["US$ USD", "Euro", "Pound"];
export const languages: string[] = ["English", "French", "Italian", "Spanish", "Turkish"];

export const dashboardLinks: string[] = [
  "/dashboard",
  "/proposal",
  "/saved",
  "/message",
  "/reviews",
  "/invoice",
  "/payouts",
  "/statements",
  "/manage-services",
  "/manage-jobs",
  "/manage-projects",
  "/my-profile",
  "/add-services",
  "/create-projects",
];
