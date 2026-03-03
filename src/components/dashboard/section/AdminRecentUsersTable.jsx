import { recentUsers } from "@/data/adminDashboard";

const userStatusClasses = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Suspended: "bg-rose-100 text-rose-700",
  Banned: "bg-slate-200 text-slate-700",
};

export default function AdminRecentUsersTable() {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-lg font-semibold text-slate-900">Recent Users</h3>
      <p className="mb-4 text-sm text-slate-500">Latest account activity</p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 font-semibold text-slate-600">Name</th>
              <th className="px-3 py-2 font-semibold text-slate-600">Date</th>
              <th className="px-3 py-2 font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-3">
                  <div className="font-medium text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">
                    {user.role} - {user.id}
                  </div>
                </td>
                <td className="px-3 py-3 text-slate-600">{user.date}</td>
                <td className="px-3 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      userStatusClasses[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
