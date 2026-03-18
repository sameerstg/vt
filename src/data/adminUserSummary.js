import mockUsers from "@/data/auth/mockUsers.json";

const normalizeRole = (role = "") => role.trim().toLowerCase();

export const getAdminUserSummary = () => {
  const roleCounts = mockUsers.reduce(
    (summary, user) => {
      const role = normalizeRole(user.role);

      if (role === "client") summary.clients += 1;
      if (role === "worker") summary.workers += 1;
      if (role === "contractor") summary.contractors += 1;
      if (role === "admin") summary.admins += 1;

      return summary;
    },
    {
      totalUsers: mockUsers.length,
      clients: 0,
      workers: 0,
      contractors: 0,
      admins: 0,
    },
  );

  return roleCounts;
};
