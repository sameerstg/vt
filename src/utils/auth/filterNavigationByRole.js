const DASHBOARD_PATHS_BY_ROLE = {
  client: "/dashboard",
  worker: "/worker-dashboard",
  contractor: "/contractor-dashboard",
  admin: "/admin-dashboard",
};

function filterDashboardChildren(children, role) {
  if (!Array.isArray(children) || !role) return children;

  const allowedPath = DASHBOARD_PATHS_BY_ROLE[role];
  if (!allowedPath) return children;

  return children.filter((child) => child.path === allowedPath);
}

function cloneAndFilterItem(item, role) {
  if (!item?.children) return item;

  const nextChildren = item.children.map((child) => {
    if (child?.name === "Dashboard" && Array.isArray(child.children)) {
      return {
        ...child,
        children: filterDashboardChildren(child.children, role),
      };
    }

    if (child?.children) {
      return cloneAndFilterItem(child, role);
    }

    return child;
  });

  return { ...item, children: nextChildren };
}

export default function filterNavigationByRole(navigation, role) {
  if (!Array.isArray(navigation)) return [];
  return navigation.map((item) => cloneAndFilterItem(item, role));
}
