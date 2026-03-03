import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { adminAccountProfile, adminAccountSessions } from "@/data/adminDashboard";

export const metadata = {
  title: "Admin Account",
};

export default function AdminAccountPage() {
  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb20 pt-2">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>Admin Profile</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Manage your personal details, secure your account, and track active sessions.</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
               <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10">
                  Identity Details
               </h4>
              <form className="form-style1">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={adminAccountProfile.fullName}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        defaultValue={adminAccountProfile.email}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={adminAccountProfile.phone}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Role
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={adminAccountProfile.role}
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="text-start">
                      <button type="button" className="ud-btn btn-thm">
                        Save Profile
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-xl-6">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative h-100">
               <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10">
                  Security Credentials
               </h4>
              <form className="form-style1">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb20">
                      <label className="heading-color ff-heading fw500 mb10">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="text-start">
                      <button type="button" className="ud-btn btn-thm">
                        Update Password
                        <i className="fal fa-arrow-right-long" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative h-100">
               <h4 className="title text-[18px] font-bold text-[#6200ee] mb20 px-2 border-b border-light pb10">
                  Security Sessions
               </h4>
              <div className="table-style1">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="">
                      <tr className="border-bottom border-slate-100">
                        <th scope="col" className="px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Device</th>
                        <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">IP</th>
                        <th scope="col" className="py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Active</th>
                        <th scope="col" className="text-end px-0 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="t-body font-medium">
                      {adminAccountSessions.map((session) => (
                        <tr key={`${session.device}-${session.ip}`} className="border-bottom border-slate-50 last:border-0">
                          <td className="px-0 py-3 text-slate-800 font-bold fz13">{session.device}</td>
                          <td className="py-3 text-slate-600 fz13">{session.ip}</td>
                          <td className="py-3 text-slate-500 fz12">{session.lastActive}</td>
                          <td className="text-end px-0 py-3">
                            {session.status === "Current" ? (
                              <span className="inline-flex rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                                Current
                              </span>
                            ) : (
                              <button className="ud-btn btn-dark btn-sm h-7 fz11 py-0 px-3 border-0" style={{ backgroundColor: '#1a1a1a' }}>
                                Revoke
                              </button>
                            )}
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
      </div>
    </DashboardLayout>
  );
}
