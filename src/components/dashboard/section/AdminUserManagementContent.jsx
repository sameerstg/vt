import Link from "next/link";
import { userDetailPanel, userManagementUsers } from "@/data/adminDashboard";

const verificationClass = {
  Verified: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
};

const statusClass = {
  Active: "bg-emerald-100 text-emerald-700",
  Suspended: "bg-rose-100 text-rose-700",
  Review: "bg-blue-100 text-blue-700",
  Banned: "bg-slate-200 text-slate-700",
};

export default function AdminUserManagementContent({ routeBase = "/admin" }) {
  const getVerificationPath = (userId) =>
    `${routeBase}/user-management/verification?user=${userId}`;

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb20 pt-2">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>User Management</h2>
            <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Manage and verify platform users, roles, and account statuses.</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
            <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2">Filter Bar</h4>
            <div className="row g-2 px-2 pb-2">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Search user..."
                  className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50/30"
                />
              </div>
              <div className="col-md-3">
                <select className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-500 outline-none bg-slate-50/30">
                  <option>Role Filter</option>
                  <option>Client</option>
                  <option>Freelancer</option>
                </select>
              </div>
              <div className="col-md-3">
                <select className="h-11 w-full rounded-md border border-slate-200 px-4 text-sm text-slate-500 outline-none bg-slate-50/30">
                  <option>Status Filter</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
              <div className="col-md-3">
                <button className="ud-btn btn-thm w-100 h-11" style={{ backgroundColor: '#2d138f', borderColor: '#2d138f' }}>
                  Search Users
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
            <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2">System Users</h4>
            <div className="packages_table table-responsive px-2">
              <table className="table-style3 table at-savesearch align-middle mb-0">
                <thead>
                  <tr className="border-bottom border-slate-100">
                    <th scope="col" className="px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">ID</th>
                    <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                    <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                    <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Verification Status</th>
                    <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th scope="col" className="text-end px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="t-body font-medium">
                  {userManagementUsers.map((user) => (
                    <tr key={user.id} className="border-bottom border-slate-50 last:border-0">
                      <td className="px-0 py-3 text-slate-900 font-bold fz13">#{user.id}</td>
                      <td className="py-3 text-slate-800 fz13">{user.name}</td>
                      <td className="py-3 text-slate-600 fz13">{user.email}</td>
                      <td className="py-3 text-slate-600 font-bold text-[10px] uppercase tracking-tighter">{user.role}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            user.verification === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}
                        >
                          {user.verification}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="text-end px-0 py-3">
                        <div className="d-flex justify-content-end gap-2">
                          <Link
                            href={getVerificationPath(user.id)}
                            className="ud-btn btn-light-thm btn-sm h-8 px-3 py-0 fz12 flex items-center gap-1 border-0"
                            style={{ backgroundColor: '#f0f3ff', color: '#5b44ff' }}
                          >
                            <i className="fas fa-eye fz10" />
                            View
                          </Link>
                          <button className="ud-btn btn-dark btn-sm h-8 px-3 py-0 fz12 flex items-center gap-1 border-0" style={{ backgroundColor: '#1a1a1a' }}>
                            <i className="fas fa-times-circle fz10" />
                            Suspend
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
