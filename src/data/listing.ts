interface DeliveryTime {
  id: number;
  title: string;
  value: string;
  total: string;
}

interface Level {
  id: number;
  title: string;
  value: string;
  total: string;
}

interface Location {
  id: number;
  title: string;
  value: string;
  total: string;
}

interface BestSeller {
  id: number;
  title: string;
  value: string;
}

interface DesignTool {
  id: number;
  title: string;
  value: string;
  total: string;
}

interface Speaks {
  id: number;
  title: string;
  value: string;
  total: string;
}

interface Category {
  id: number;
  title: string;
  total: string;
}

interface ProjectType {
  id: number;
  title: string;
  total: string;
}

interface EnglishLevel {
  id: number;
  title: string;
  total: string;
}

interface JobType {
  id: number;
  title: string;
  total: string;
}

interface NoOfEmployee {
  id: number;
  totalEmployee: string;
  total: string;
}

export const deliveryTime: DeliveryTime[] = [
  { id: 1, title: "Express 24H", value: "24h", total: "1,945" },
  { id: 2, title: "Up to 3 days", value: "3d", total: "8,136" },
  { id: 3, title: "Up to 7 days", value: "7d", total: "917" },
  { id: 4, title: "Anytime", value: "anytime", total: "240" },
];

export const level: Level[] = [
  { id: 1, title: "Top Rated Seller", value: "top-rated", total: "1,945" },
  { id: 2, title: "Level Two", value: "lavel-2", total: "8,136" },
  { id: 3, title: "Level One", value: "lavel-1", total: "917" },
  { id: 4, title: "New Seller", value: "new", total: "240" },
];

export const location: Location[] = [
  { id: 1, title: "United States", value: "united-states", total: "1,945" },
  { id: 2, title: "United Kingdom", value: "united-kingdom", total: "8,136" },
  { id: 3, title: "Canada", value: "canada", total: "917" },
  { id: 4, title: "Germany", value: "germany", total: "240" },
  { id: 5, title: "Turkey", value: "turkey", total: "2,460" },
];

export const bestSeller: BestSeller[] = [
  { id: 1, title: "Best Seller", value: "best-seller" },
  { id: 2, title: "Recommended", value: "recommended" },
  { id: 3, title: "New Arrivals", value: "new-arrivals" },
];

export const designTools: DesignTool[] = [
  {
    id: 1,
    title: "Adobe Photoshop",
    value: "adobe-photoshop",
    total: "1,945",
  },
  {
    id: 2,
    title: "Figma",
    value: "figma",
    total: "8,15",
  },
  {
    id: 3,
    title: "Sketch",
    value: "sketch",
    total: "654",
  },
  {
    id: 4,
    title: "Adobe XD",
    value: "adobe-xd",
    total: "323",
  },
  {
    id: 5,
    title: "Balsamiq",
    value: "balsamiq",
    total: "2,455",
  },
];

export const speaks: Speaks[] = [
  {
    id: 1,
    title: "Turkish",
    value: "turkish",
    total: "1,945",
  },
  {
    id: 2,
    title: "English",
    value: "english",
    total: "8,15",
  },
  {
    id: 3,
    title: "Italian",
    value: "italian",
    total: "654",
  },
  {
    id: 4,
    title: "Spanish",
    value: "spanish",
    total: "323",
  },
];

export const category: Category[] = [
  { id: 1, title: "UX Designer", total: "1,945" },
  { id: 2, title: "Web Developers", total: "8,136" },
  { id: 3, title: "Illustrators", total: "917" },
  { id: 4, title: "Node.js", total: "240" },
  { id: 5, title: "Project Managers", total: "2,460" },
];

export const categor2: Category[] = [
  { id: 1, title: "Electronics", total: "1,945" },
  { id: 2, title: "Clothing", total: "8,136" },
  { id: 3, title: "Home and Kitchen", total: "917" },
  { id: 4, title: "Health and Beauty", total: "240" },
  { id: 5, title: "Sports and Outdoors", total: "2,460" },
];

export const projectType: ProjectType[] = [
  {
    id: 1,
    title: "Fixed",
    total: "1,945",
  },
  {
    id: 2,
    title: "Hourly",
    total: "8,136",
  },
];

export const englishLevel: EnglishLevel[] = [
  { id: 1, title: "Basic level", total: "1,945" },
  { id: 2, title: "Bilingual", total: "8,136" },
  { id: 3, title: "Fluent", total: "917" },
  { id: 4, title: "Native", total: "240" },
];

export const jobType: JobType[] = [
  {
    id: 1,
    title: "Freelance",
    total: "1,945",
  },
  {
    id: 2,
    title: "Full Time",
    total: "8,136",
  },
  {
    id: 3,
    title: "Part Time",
    total: "917",
  },
  {
    id: 4,
    title: "Internship",
    total: "240",
  },
];

export const noOfEmployee: NoOfEmployee[] = [
  {
    id: 1,
    totalEmployee: "1-10",
    total: "1,945",
  },
  {
    id: 2,
    totalEmployee: "11-20",
    total: "8,136",
  },
  {
    id: 3,
    totalEmployee: "21-30",
    total: "917",
  },
  {
    id: 4,
    totalEmployee: "Less then 50",
    total: "240",
  },
];
