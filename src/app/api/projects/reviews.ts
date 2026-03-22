export interface Review {
  id: string;
  projectId: string;
  projectTitle: string;
  workerId: string;
  workerName: string;
  workerAvatar: string;
  clientId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const reviews: Review[] = [
  {
    id: "review-001",
    projectId: "proj-021",
    projectTitle: "Wedding Photography",
    workerId: "worker-011",
    workerName: "Michael Chen",
    workerAvatar: "/images/team/freelancer-1.png",
    clientId: "client-001",
    rating: 5,
    comment: "Absolutely amazing work! Michael captured every special moment at our wedding. The photos are stunning and the album is beautifully designed. Couldn't have asked for a better photographer. Highly recommended!",
    createdAt: new Date(Date.now() - 86400000 * 28).toISOString(),
  },
  {
    id: "review-002",
    projectId: "proj-022",
    projectTitle: "Website Development",
    workerId: "worker-012",
    workerName: "Sarah Johnson",
    workerAvatar: "/images/team/freelancer-2.png",
    clientId: "client-001",
    rating: 5,
    comment: "Sarah delivered an exceptional portfolio website that exceeded my expectations. Great communication throughout the project and always available for questions. The site loads fast and looks beautiful on all devices.",
    createdAt: new Date(Date.now() - 86400000 * 55).toISOString(),
  },
  {
    id: "review-003",
    projectId: "proj-023",
    projectTitle: "Lawn Mowing Service",
    workerId: "worker-013",
    workerName: "David Wilson",
    workerAvatar: "/images/team/freelancer-3.png",
    clientId: "client-001",
    rating: 4,
    comment: "Great service! The lawn looks fantastic after each visit. Always punctual and professional. Slight room for improvement on edge trimming but overall very satisfied.",
    createdAt: new Date(Date.now() - 86400000 * 40).toISOString(),
  },
  {
    id: "review-004",
    projectId: "proj-024",
    projectTitle: "Data Analysis Report",
    workerId: "worker-014",
    workerName: "Emily Martinez",
    workerAvatar: "/images/team/freelancer-4.png",
    clientId: "client-001",
    rating: 5,
    comment: "Incredible insights from the data analysis! Emily's report helped us identify key trends and make better business decisions. The visualizations were clear and easy to understand. Will definitely work with her again.",
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
  },
  {
    id: "review-005",
    projectId: "proj-025",
    projectTitle: "Home Renovation Planning",
    workerId: "worker-015",
    workerName: "Robert Taylor",
    workerAvatar: "/images/team/freelancer-5.png",
    clientId: "client-001",
    rating: 5,
    comment: "Robert did an outstanding job with our renovation planning. The 3D renderings helped us visualize everything perfectly. His contractor recommendations were spot-on and the project ran smoothly thanks to his coordination.",
    createdAt: new Date(Date.now() - 86400000 * 70).toISOString(),
  },
  {
    id: "review-006",
    projectId: "proj-026",
    projectTitle: "Translation Services",
    workerId: "worker-016",
    workerName: "Carlos Rodriguez",
    workerAvatar: "/images/team/freelancer-1.png",
    clientId: "client-001",
    rating: 5,
    comment: "Professional and accurate translation work. All 50 pages were completed ahead of schedule with proper certification. Very responsive to questions and made adjustments when requested.",
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: "review-007",
    projectId: "proj-027",
    projectTitle: "Dog Walking",
    workerId: "worker-017",
    workerName: "Jessica Brown",
    workerAvatar: "/images/team/freelancer-2.png",
    clientId: "client-001",
    rating: 4,
    comment: "Jessica took excellent care of our dogs while we were away. Sent daily updates and photos which we loved. Our dogs were happy and well-exercised. Would hire again for our next trip.",
    createdAt: new Date(Date.now() - 86400000 * 22).toISOString(),
  },
  {
    id: "review-008",
    projectId: "proj-028",
    projectTitle: "Mobile App UI Design",
    workerId: "worker-018",
    workerName: "Amanda Lee",
    workerAvatar: "/images/team/freelancer-3.png",
    clientId: "client-001",
    rating: 5,
    comment: "Amazing UI/UX design work! The wireframes and prototypes were exactly what we needed. Amanda really understood our target audience and created a design that users love. The dark mode implementation was a nice touch.",
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: "review-009",
    projectId: "proj-029",
    projectTitle: "Furniture Delivery",
    workerId: "worker-019",
    workerName: "Mark Johnson",
    workerAvatar: "/images/team/freelancer-4.png",
    clientId: "client-001",
    rating: 5,
    comment: "Super efficient and careful with our new furniture. Delivered and assembled everything perfectly. Even helped us arrange the pieces in the room. Great service!",
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
  },
  {
    id: "review-010",
    projectId: "proj-030",
    projectTitle: "Accounting Services",
    workerId: "worker-020",
    workerName: "Patricia Davis",
    workerAvatar: "/images/team/freelancer-5.png",
    clientId: "client-001",
    rating: 5,
    comment: "Patricia has been invaluable for our small business accounting. Organized our books, prepared our taxes, and provided useful financial advice. Very knowledgeable and professional.",
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

export function getReviewsByClientId(clientId: string): Review[] {
  return reviews.filter(r => r.clientId === clientId);
}

export function getReviewsByProjectId(projectId: string): Review[] {
  return reviews.filter(r => r.projectId === projectId);
}

export function getReviewById(id: string): Review | undefined {
  return reviews.find(r => r.id === id);
}

export function addReview(reviewData: Omit<Review, "id" | "createdAt">): Review {
  const review: Review = {
    ...reviewData,
    id: `review-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  reviews.push(review);
  return review;
}
