import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { verificationWorkflow } from "@/data/adminDashboard";
import Image from "next/image";

export const metadata = {
  title: "User Verification Details",
};

const checkStatusClasses = {
  PASSED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "REVIEW NEEDED": "bg-amber-100 text-amber-700 border-amber-200",
};

export default function VerificationPage() {
  const { user, contact, documents, checks, activity } = verificationWorkflow;

  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb20 pt-2">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <div className="mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                User Management <i className="fas fa-chevron-right mx-1 text-[7px]" /> Verification Details
              </div>
              <div className="row align-items-center">
                <div className="col-md-7">
                  <h2 className="title" style={{ color: '#2d138f', fontSize: '26px', fontWeight: '700' }}>User Verification Review</h2>
                  <p className="text" style={{ color: '#5e6d82', fontSize: '14px' }}>Carefully review user profile and identity documents to ensure platform compliance.</p>
                </div>
                <div className="col-md-5 text-md-end mt-2 mt-md-0">
                  <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                    <button
                      className="ud-btn btn-dark h-11 px-4 fz13 fw600 d-inline-flex align-items-center justify-content-center gap-2 border-0 text-decoration-none"
                      style={{ backgroundColor: "#1a1a1a", minWidth: "130px", lineHeight: 1 }}
                    >
                       <i className="fas fa-ban fz11" />
                      Suspend
                    </button>
                    <button
                      className="ud-btn btn-dark h-11 px-4 fz13 fw600 d-inline-flex align-items-center justify-content-center gap-2 border-0 text-decoration-none"
                      style={{ backgroundColor: "#333333", minWidth: "130px", lineHeight: 1 }}
                    >
                       <i className="fas fa-times fz11" />
                      Reject
                    </button>
                    <button
                      className="ud-btn btn-thm h-11 px-4 fz13 fw700 d-inline-flex align-items-center justify-content-center gap-2 text-decoration-none"
                      style={{ backgroundColor: "#2d138f", borderColor: "#2d138f", minWidth: "180px", lineHeight: 1 }}
                    >
                       <i className="fas fa-check-circle fz11" />
                      Approve User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3">
             <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20 overflow-hidden position-relative">
                <div className="mb-3 flex flex-column align-items-center">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover ring-2 ring-slate-100 mb-2"
                  />
                  <h3 className="text-lg font-bold text-slate-900 mb-0">{user.name}</h3>
                  <div className="text-blue-600 font-bold text-[10px] uppercase tracking-tighter">{user.role}</div>
                </div>
                
                <div className="space-y-3 pt-3 border-t border-slate-50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase">Joined</span>
                    <span className="font-bold text-slate-700">{user.joined}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase">Internal Status</span>
                    <span className="rounded-md bg-amber-100 px-2 py-0.5 font-bold text-amber-700">
                      {user.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase">Trust Score</span>
                    <div className="flex items-center gap-1 font-bold text-emerald-600">
                       <i className="fas fa-shield-check" />
                       {user.trustScore}%
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                   <h4 className="title text-xs font-bold text-[#6200ee] mb15 uppercase tracking-widest border-b border-light pb-2">Contact Info</h4>
                   <div className="space-y-3">
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Email Address</div>
                        <div className="text-[13px] text-slate-700 font-medium break-all">{contact.email}</div>
                        <div className="text-[9px] text-emerald-600 font-bold mt-0.5">
                          <i className="fas fa-check-circle mr-1" />
                          {contact.emailVerified ? "Verified" : "Pending"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Phone Number</div>
                        <div className="text-[13px] text-slate-700 font-medium">{contact.phone}</div>
                        <div className="text-[9px] text-emerald-600 font-bold mt-0.5">
                          <i className="fas fa-check-circle mr-1" />
                          {contact.phoneVerified ? "Verified" : "Pending"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Registry Location</div>
                        <div className="text-[13px] text-slate-700 font-medium">{contact.location}</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="col-xl-9">
             <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 mb20">
               <div className="d-flex justify-content-between align-items-center mb20 px-2 border-b border-light pb10">
                  <h4 className="title text-[18px] font-bold text-[#6200ee] mb-0">Compliance Documents</h4>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Uploaded: 2 Days Ago</span>
               </div>
               <div className="row g-3 px-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="col-md-6">
                       <div className="p-2 rounded-lg border border-slate-100 bg-slate-50/30">
                          <div className="text-[11px] font-bold text-slate-800 mb-2 flex items-center gap-2">
                             <i className="fas fa-id-card text-slate-400" />
                             {doc.title}
                          </div>
                          <div className="overflow-hidden rounded-lg border border-slate-200">
                            <Image
                              src={doc.image}
                              alt={doc.title}
                              width={420}
                              height={200}
                              className="h-40 w-full object-cover transition-transform hover:scale-105 duration-500"
                            />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[9px] font-bold text-slate-400">
                            <span>{doc.filename}</span>
                            <span>{doc.size}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
             </div>

             <div className="row g-3 mb20">
                <div className="col-md-6">
                  <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
                     <h4 className="title text-[16px] font-bold text-[#6200ee] mb15 px-2 border-b border-light pb10">Compliance Checks</h4>
                     <div className="space-y-2 px-2">
                        {checks.map((check) => (
                          <div key={check.id} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-50 bg-slate-50/30">
                            <div>
                               <div className="text-[13px] font-bold text-slate-800">{check.name}</div>
                               <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{check.detail}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${checkStatusClasses[check.status]}`}>
                               {check.status}
                            </span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="col-md-6">
                   <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20 h-100">
                      <h4 className="title text-[16px] font-bold text-[#6200ee] mb15 px-2 border-b border-light pb10">Audit History</h4>
                      <div className="space-y-3 px-2">
                        {activity.map((item) => (
                          <div key={item.id} className="ra_content relative pl-4 border-l-2 border-slate-100">
                             <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-blue-300" />
                             <div className="text-xs font-bold text-slate-800 leading-tight">{item.title}</div>
                             <div className="text-[10px] text-slate-500 font-medium my-0.5">{item.detail}</div>
                             <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.time}</div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="ps-widget bgc-white shadow-sm ring-1 ring-slate-100 rounded-xl p20">
               <h4 className="title text-[16px] font-bold text-[#6200ee] mb15 px-2 border-b border-light pb10">Final Administrative Verdict</h4>
               <div className="mb15 px-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Decision Commentary</label>
                  <textarea
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/30 p-3 text-[13px] text-slate-700 outline-none focus:ring-2 focus:ring-blue-50 transition min-h-[100px]"
                    placeholder="Document your findings and reasoning for the final decision here..."
                  />
               </div>
               <div className="text-end px-2">
                  <button
                    className="ud-btn btn-thm h-11 px-5 fz13 fw700 d-inline-flex align-items-center justify-content-center text-decoration-none"
                    style={{
                      backgroundColor: "#2d138f",
                      borderColor: "#2d138f",
                      minWidth: "235px",
                      lineHeight: 1,
                      letterSpacing: "0.2px",
                      textDecoration: "none",
                    }}
                  >
                     Commit Decision Record
                  </button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
