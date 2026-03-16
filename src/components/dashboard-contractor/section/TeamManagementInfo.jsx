

"use client";
import React from "react";

export default function TeamManagementInfo({ activeTab = "overview" }) {
  // Placeholder team members with multiple projects
  const [teamMembers, setTeamMembers] = React.useState([
    { id: 1, name: "Ahsan Raza", email: "ahsan.raza@veritask.com", userId: "w-1001", projects: [{ name: "UI Fix Batch", milestones: [{ name: "Component Styling", price: 50, deadline: "2024-04-20", status: "working" }, { name: "Responsive Layout", price: 80, deadline: "2024-04-22", status: "submitted" }] }, { name: "QA Regression Pass", milestones: [] }] },
    { id: 2, name: "Sara Khan", email: "sara.khan@veritask.com", userId: "w-1002", projects: [{ name: "QA Regression Pass", milestones: [{ name: "Login Flow", price: 75, deadline: "2024-04-25", status: "working" }, { name: "Checkout Process", price: 100, deadline: "2024-04-30", status: "revision" }] }] },
    { id: 3, name: "Bilal Ahmed", email: "bilal.ahmed@veritask.com", userId: "w-1003", projects: [{ name: "Client Delivery Notes", milestones: [] }, { name: "UI Fix Batch", milestones: [{ name: "Icon Integration", price: 30, deadline: "2024-05-01", status: "completed" }] }] },
  ]);

  const [reviewModal, setReviewModal] = React.useState({ show: false, milestone: null, mode: "review" }); // mode: 'review' or 'concern'
  const [concernText, setConcernText] = React.useState("");
  const [monitorFilter, setMonitorFilter] = React.useState("all"); // all, submitted, revision, completed, working

  const updateMilestoneStatus = (memberId, projectName, milestoneName, newStatus) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          projects: m.projects.map(p => {
            if (p.name === projectName) {
              return {
                ...p,
                milestones: p.milestones.map(ms => ms.name === milestoneName ? { ...ms, status: newStatus } : ms)
              };
            }
            return p;
          })
        };
      }
      return m;
    }));
  };

  // Demo project list with milestones
  const projectMilestones = {
    "UI Fix Batch": ["Component Styling", "Responsive Layout", "Icon Integration"],
    "QA Regression Pass": ["Login Flow", "Checkout Process", "Profile Settings"],
    "Client Delivery Notes": ["PDF Generation", "Email Templates", "Signature Logic"],
    "Backend Refactor": ["Database Schema", "API Optimization", "Auth Middleware"],
    "API Integration": ["Stripe Webhooks", "AWS S3 Upload", "SendGrid Setup"],
    "Design Review": ["Color Palette", "Typography", "Prototyping"]
  };

  const projectList = Object.keys(projectMilestones);

  // Assign Project modal state
  const [assignModal, setAssignModal] = React.useState({ show: false, member: null });
  const [selectedProjects, setSelectedProjects] = React.useState([]);
  const [modalStep, setModalStep] = React.useState(1); // 1: Projects, 2: Milestones, 3: Deadlines, 4: Pricing
  const [detailsModal, setDetailsModal] = React.useState({ show: false, member: null });

  // Sync selected projects when modal opens
  React.useEffect(() => {
    if (assignModal.show && assignModal.member) {
      setSelectedProjects([...assignModal.member.projects]);
      setModalStep(1);
    }
  }, [assignModal.show, assignModal.member]);

  const toggleProject = (projectName) => {
    setSelectedProjects(prev => {
      const exists = prev.find(p => p.name === projectName);
      if (exists) {
        return prev.filter(p => p.name !== projectName);
      } else {
        return [...prev, { name: projectName, milestones: [] }];
      }
    });
  };

  const toggleMilestone = (projectName, milestoneName) => {
    setSelectedProjects(prev => prev.map(p => {
      if (p.name === projectName) {
        const mExistsIdx = p.milestones.findIndex(m => m.name === milestoneName);
        const newMilestones = mExistsIdx > -1
          ? p.milestones.filter((_, idx) => idx !== mExistsIdx)
          : [...p.milestones, { name: milestoneName, price: 0, deadline: "" }];
        return { ...p, milestones: newMilestones };
      }
      return p;
    }));
  };

  const updateMilestonePrice = (projectName, milestoneName, price) => {
    setSelectedProjects(prev => prev.map(p => {
      if (p.name === projectName) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.name === milestoneName ? { ...m, price: Number(price) } : m)
        };
      }
      return p;
    }));
  };

  const updateMilestoneDeadline = (projectName, milestoneName, deadline) => {
    setSelectedProjects(prev => prev.map(p => {
      if (p.name === projectName) {
        return {
          ...p,
          milestones: p.milestones.map(m => m.name === milestoneName ? { ...m, deadline } : m)
        };
      }
      return p;
    }));
  };

  // Mock worker database
  const workerDB = [
    { id: "w-1001", name: "Ahsan Raza", email: "ahsan.raza@veritask.com" },
    { id: "w-1002", name: "Sara Khan", email: "sara.khan@veritask.com" },
    { id: "w-1003", name: "Bilal Ahmed", email: "bilal.ahmed@veritask.com" },
    { id: "w-1004", name: "Maham Ali", email: "maham.ali@veritask.com" },
    { id: "w-1005", name: "Ali Usman", email: "ali.usman@veritask.com" },
  ];

  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [selectedWorker, setSelectedWorker] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);
  const [newMember, setNewMember] = React.useState({ name: "", email: "", userId: "" });
  const [error, setError] = React.useState({});

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!selectedWorker) return;
    setTeamMembers((prev) => [
      {
        id: Date.now(),
        name: selectedWorker.name,
        email: selectedWorker.email,
        userId: selectedWorker.id,
        projects: []
      },
      ...prev
    ]);
    setShowModal(false);
    setSearch("");
    setSearchResults([]);
    setSelectedWorker(null);
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="dashboard_title_area mb30">
        <h2>Team Management</h2>
      </div>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="d-sm-flex align-items-center justify-content-between mb25 pb10 border-bottom">
          <div className="flex-grow-1">
            <h5 className="mb0 ff-heading fw600">
              {activeTab === "overview" && "Team Roster"}
              {activeTab === "projects" && "Project Pipeline"}
              {activeTab === "milestones" && "Milestone Matrix"}
              {activeTab === "monitor" && "Delivery Monitor"}
            </h5>
            <div className="d-flex align-items-center gap-3 mt-1">
              <span className="text-muted fz13 fw500"><i className="fal fa-users me-1 text-thm"></i> {teamMembers.length} Members</span>
              <span className="text-muted fz13 fw500"><i className="fal fa-briefcase me-1 text-thm"></i> {teamMembers.reduce((acc, m) => acc + m.projects.length, 0)} Projects</span>
              <span className="text-muted fz13 fw500 ps-3 border-start"><i className="fal fa-tasks me-1 text-thm"></i> {teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.length, 0), 0)} Total Milestones</span>
              {activeTab === "monitor" && (
                <span className="text-warning fz13 fw600 ps-3 border-start">
                  <i className="fas fa-exclamation-triangle me-1"></i> 
                  {teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.filter(ms => ms.status === "submitted").length, 0), 0)} Awaiting Review
                </span>
              )}
            </div>
          </div>
          <div className="mt-3 mt-sm-0">
            <button className="ud-btn btn-thm bdrs12 cursor-pointer shadow-sm" onClick={() => setShowModal(true)}>
              <i className="fal fa-user-plus me-2"></i> Add Team Member
            </button>
          </div>
        </div>

        {activeTab === "monitor" && (
          <div className="row g-3 mb25">
            <div className="col-sm-6 col-lg-4">
              <div className="stats-card-mini bg-warning-light p20 bdrs12 border border-warning shadow-xs">
                <div className="d-flex align-items-center justify-content-between mb10">
                  <div className="bdrs50 bg-white text-warning d-flex align-items-center justify-content-center shadow-sm" style={{ width: 32, height: 32 }}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <span className="badge bg-warning text-white rounded-pill">Urgent</span>
                </div>
                <h3 className="mb0 ff-heading fw700 text-dark">
                  {teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.filter(ms => ms.status === "submitted").length, 0), 0)}
                </h3>
                <p className="text-muted fz13 mb0 fw500">Waitlisted for Review</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="stats-card-mini bgc-thm-light p20 bdrs12 border border-thm shadow-xs">
                <div className="d-flex align-items-center justify-content-between mb10">
                  <div className="bdrs50 bg-white text-thm d-flex align-items-center justify-content-center shadow-sm" style={{ width: 32, height: 32 }}>
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <span className="badge bgc-thm text-white rounded-pill">Budget</span>
                </div>
                <h3 className="mb0 ff-heading fw700 text-dark">
                  ${teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.reduce((mAcc, ms) => mAcc + ms.price, 0), 0), 0)}
                </h3>
                <p className="text-muted fz13 mb0 fw500">Total Pipeline Value</p>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <div className="stats-card-mini bg-success-light p20 bdrs12 border border-success shadow-xs">
                <div className="d-flex align-items-center justify-content-between mb10">
                  <div className="bdrs50 bg-white text-success d-flex align-items-center justify-content-center shadow-sm" style={{ width: 32, height: 32 }}>
                    <i className="fas fa-shield-check"></i>
                  </div>
                  <span className="badge bg-success text-white rounded-pill">Quality</span>
                </div>
                <h3 className="mb0 ff-heading fw700 text-dark">
                  {(() => {
                    const total = teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.length, 0), 0);
                    const done = teamMembers.reduce((acc, m) => acc + m.projects.reduce((pAcc, p) => pAcc + p.milestones.filter(ms => ms.status === "completed" || ms.status === "submitted_to_client").length, 0), 0);
                    return total > 0 ? Math.round((done / total) * 100) : 0;
                  })()}%
                </h3>
                <p className="text-muted fz13 mb0 fw500">Execution Velocity</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "monitor" && (
          <div className="d-flex align-items-center justify-content-between mb25 bg-light-subtle p-3 bdrs12 border border-dashed shadow-xs">
            <div className="d-flex gap-2 flex-wrap">
              {[
                { id: "all", label: "Global View", icon: "fa-layer-group", color: "thm" },
                { id: "submitted", label: "Review Required", icon: "fa-clock", color: "warning" },
                { id: "revision", label: "Needs Revision", icon: "fa-history", color: "danger" },
                { id: "working", label: "Development", icon: "fa-code", color: "thm" },
                { id: "completed", label: "Internal QC Passed", icon: "fa-clipboard-check", color: "success" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setMonitorFilter(f.id)}
                  className={`ud-btn btn-xs bdrs12 transition-all border-0 px-3 ${monitorFilter === f.id ? `bgc-${f.color || "thm"} text-white shadow-md fw600` : "bg-white text-muted hover-bgc-thm-light border"}`}
                >
                  <i className={`fal ${f.icon} me-2`}></i> {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="packages_table table-responsive">
          <table className="table-style3 table at-savesearch">
            <thead className="t-head">
              <tr>
                <th className="fz13 uppercase text-muted fw600 py-3">Team Member</th>
                {activeTab === "overview" && <th className="fz13 uppercase text-muted fw600 py-3">Contact Details</th>}
                {activeTab === "projects" && <th className="fz13 uppercase text-muted fw600 py-3">Workload Distribution</th>}
                {activeTab === "milestones" && <th className="fz13 uppercase text-muted fw600 py-3">Delivery Status</th>}
                {activeTab === "monitor" && (
                  <>
                    <th className="fz13 uppercase text-muted fw600 py-3">Project & Milestone</th>
                    <th className="fz13 uppercase text-muted fw600 py-3">Execution Progress</th>
                  </>
                )}
                <th className="fz13 uppercase text-muted fw600 py-3 text-end pe-4">Control Center</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="vam">
                    <div className="d-flex align-items-center">
                      <div className="member-initials me-3 d-flex align-items-center justify-content-center bgc-thm3 text-thm fw600 bdrs50 shadow-sm" style={{ width: 36, height: 36, fontSize: 12 }}>
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <span className="d-block fw600 text-dark fz14">{member.name}</span>
                        <span className="text-muted fz11">ID: {member.userId}</span>
                      </div>
                    </div>
                  </td>
                  {activeTab === "monitor" && (
                    <td className="vam" colSpan="3">
                      <div className="monitor-rows-container">
                        {(() => {
                          let allMs = member.projects.flatMap(p => p.milestones.map(ms => ({ ...ms, projName: p.name })));
                          if (monitorFilter !== "all") {
                            allMs = allMs.filter(ms => ms.status === monitorFilter);
                          }
                          
                          if (allMs.length === 0) {
                            return (
                              <div className="p20 text-center bg-light bdrs12 italic text-muted fz13 border border-dashed">
                                No milestones found matching "{monitorFilter}".
                              </div>
                            );
                          }

                          return allMs.map((ms, msIdx) => {
                            const isOverdue = ms.deadline && new Date(ms.deadline) < new Date() && ms.status !== "completed";
                            const isClose = ms.deadline && !isOverdue && (new Date(ms.deadline) - new Date()) < (3 * 24 * 60 * 60 * 1000); // 3 days

                            return (
                              <div key={msIdx} className={`d-flex align-items-center justify-content-between p15 mb10 bdrs12 border bg-white shadow-sm transition-all hover-shadow-md position-relative overflow-hidden ${isOverdue ? "border-danger-subtle" : ""}`}>
                                {isOverdue && <div className="position-absolute h-100 bg-danger" style={{ width: 4, left: 0, top: 0 }}></div>}
                                {isClose && <div className="position-absolute h-100 bg-warning" style={{ width: 4, left: 0, top: 0 }}></div>}
                                
                                <div style={{ width: "35%" }}>
                                  <span className="d-block text-muted fz10 uppercase fw700 mb1 tracking-wide" style={{ letterSpacing: "0.5px" }}>{ms.projName}</span>
                                  <h6 className="mb0 ff-heading fw600 fz15 d-flex align-items-center">
                                    {ms.name}
                                    {isOverdue && <span className="ms-2 badge bg-danger text-white fz10 fw400 bdrs4">OVERDUE</span>}
                                  </h6>
                                </div>

                                <div style={{ width: "25%" }} className="text-center">
                                  {ms.status === "working" && (
                                    <div className="d-flex flex-column align-items-center">
                                      <span className="badge bgc-thm-light text-thm py-2 px-3 bdrs20 fz11 fw600"><i className="fal fa-spinner fa-spin me-2"></i>In Progress</span>
                                      <div className="w-75 mt2 bg-light bdrs10 overflow-hidden" style={{ height: 4 }}>
                                        <div className="bgc-thm h-full" style={{ width: "65%" }}></div>
                                      </div>
                                    </div>
                                  )}
                                  {ms.status === "submitted" && (
                                    <span className="badge bg-warning-light text-warning py-2 px-3 bdrs20 fz11 fw600 border border-warning-subtle shadow-sm animate-pulse">
                                      <i className="fas fa-eye me-2"></i>Review Needed
                                    </span>
                                  )}
                                  {ms.status === "revision" && (
                                    <span className="badge bg-danger-light text-danger py-2 px-3 bdrs20 fz11 fw600 border border-danger-subtle">
                                      <i className="fal fa-history me-2"></i>Fixing Issues
                                    </span>
                                  )}
                                  {ms.status === "completed" && (
                                    <span className="badge bg-success-light text-success py-2 px-3 bdrs20 fz11 fw600 border border-success-subtle">
                                      <i className="fas fa-check-double me-2"></i>Approved by You
                                    </span>
                                  )}
                                  {ms.status === "submitted_to_client" && (
                                    <span className="badge bgc-thm text-white py-2 px-3 bdrs20 fz11 fw600 shadow-sm">
                                      <i className="fal fa-external-link-square me-2"></i>Awaiting Client
                                    </span>
                                  )}
                                </div>

                                <div style={{ width: "20%" }} className="text-end pe-4">
                                  <div className="fw700 text-dark fz16">${ms.price}</div>
                                  <div className={`fz12 fw500 ${isOverdue ? "text-danger" : isClose ? "text-warning" : "text-muted"}`}>
                                    <i className={`fal ${isOverdue ? "fa-exclamation-triangle" : "fa-calendar-alt"} me-1`}></i>
                                    {ms.deadline || "Flexible"}
                                  </div>
                                </div>

                                <div style={{ width: "20%" }} className="text-end pe-2">
                                  <div className="d-flex gap-2 justify-content-end">
                                    {ms.status === "submitted" && (
                                      <>
                                        <button 
                                          className="ud-btn btn-thm btn-xs bdrs12 shadow-sm py-1" 
                                          onClick={() => updateMilestoneStatus(member.id, ms.projName, ms.name, "completed")}
                                          title="Approve for Internal Review"
                                        >
                                          <i className="fal fa-check me-1"></i> Approve
                                        </button>
                                        <button className="ud-btn btn-light-danger btn-xs bdrs12 shadow-sm py-1 px-3" onClick={() => setReviewModal({ show: true, milestone: { ...ms, memberId: member.id }, mode: "concern" })}>
                                          <i className="fal fa-comment-alt-exclamation"></i>
                                        </button>
                                      </>
                                    )}
                                    {ms.status === "completed" && (
                                      <button 
                                        className="ud-btn btn-dark btn-xs bdrs12 shadow-sm py-1 flex-grow-1" 
                                        onClick={() => updateMilestoneStatus(member.id, ms.projName, ms.name, "submitted_to_client")}
                                      >
                                        <i className="fal fa-paper-plane me-1"></i> Submit to Client
                                      </button>
                                    )}
                                    {ms.status === "revision" && (
                                      <button className="ud-btn btn-light-thm btn-xs bdrs12 shadow-sm py-1" onClick={() => setReviewModal({ show: true, milestone: { ...ms, memberId: member.id }, mode: "review" })}>
                                        <i className="fal fa-info-circle me-1"></i> View Issues
                                      </button>
                                    )}
                                    {(ms.status === "working" || ms.status === "submitted_to_client") && (
                                      <button className="ud-btn btn-light btn-xs bdrs12 border shadow-sm py-1" onClick={() => setReviewModal({ show: true, milestone: { ...ms, memberId: member.id }, mode: "review" })}>
                                        <i className="fal fa-envelope me-1"></i> Chat
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </td>
                  )}
                  {activeTab === "overview" && (
                    <td className="vam">
                      <div className="fz13 text-muted">
                        <i className="fal fa-envelope me-2"></i>{member.email}<br />
                        <i className="fal fa-id-card me-2"></i>{member.userId}
                      </div>
                    </td>
                  )}
                  {activeTab === "projects" && (
                    <td className="vam">
                      <div className="d-flex flex-wrap gap-3">
                        {member.projects.length > 0 ? (
                          member.projects.map((proj, idx) => (
                            <div key={idx} className="project-mini-card d-flex align-items-center p10 bdrs8 border bgc-white shadow-sm" style={{ minWidth: 160 }}>
                              <div className="bdrs50 bgc-thm-light text-thm d-flex align-items-center justify-content-center me-3" style={{ width: 30, height: 30 }}>
                                <i className="fal fa-briefcase fz12"></i>
                              </div>
                              <div>
                                <span className="d-block fw500 text-dark fz13">{proj.name}</span>
                                <span className="text-muted fz11">{proj.milestones.length} Milestones</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span className="text-muted fz13 italic">No projects assigned</span>
                        )}
                      </div>
                    </td>
                  )}
                  {activeTab === "milestones" && (
                    <td className="vam">
                      <div className="d-flex align-items-center gap-3">
                        {member.projects.length > 0 ? (
                          <>
                            <div className="d-flex align-items-center">
                              <div className="bdrs50 bgc-thm-light text-thm d-flex align-items-center justify-content-center me-2" style={{ width: 32, height: 32 }}>
                                <i className="fal fa-project-diagram fz14"></i>
                              </div>
                              <div>
                                <span className="d-block fw500 text-dark fz14">{member.projects.length} Projects</span>
                                <span className="text-muted fz12">{member.projects.reduce((acc, p) => acc + p.milestones.length, 0)} Total Milestones</span>
                              </div>
                            </div>
                            <div className="border-start ps-3 ms-1">
                              <span className="d-block text-muted fz11 fw500 uppercase">Upcoming Deadline</span>
                              <span className="text-thm fw600 fz13">
                                {member.projects.flatMap(p => p.milestones).filter(m => m.deadline).sort((a, b) => new Date(a.deadline) - new Date(b.deadline))[0]?.deadline || "No deadline set"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-muted fz13 italic">No projects assigned</span>
                        )}
                      </div>
                    </td>
                  )}
                  {activeTab !== "monitor" && (
                    <td className="vam text-end pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        {activeTab === "milestones" && (
                          <button
                            className="ud-btn btn-light-thm btn-xs bdrs12 cursor-pointer shadow-sm"
                            onClick={() => setDetailsModal({ show: true, member })}
                            title="View Details"
                          >
                            <i className="fal fa-eye"></i> Details
                          </button>
                        )}
                        
                        {(activeTab === "projects" || activeTab === "milestones") && (
                          <button
                            className="ud-btn btn-thm btn-xs bdrs12 cursor-pointer shadow-sm"
                            onClick={() => {
                              setAssignModal({ show: true, member });
                            }}
                            title={activeTab === "projects" ? "Modify Projects" : "Assign Milestones"}
                          >
                            <i className={`fal ${activeTab === "projects" ? "fa-edit" : "fa-calendar-check"} me-1`}></i>
                            {activeTab === "projects" ? "Modify" : "Assign"}
                          </button>
                        )}

                        <button 
                          className="ud-btn btn-light-danger btn-xs bdrs12 cursor-pointer shadow-sm" 
                          onClick={() => {
                            if(confirm(`Are you sure you want to remove ${member.name} from the team?`)) {
                              setTeamMembers(prev => prev.filter(tm => tm.id !== member.id));
                            }
                          }}
                          title="Remove Member"
                        >
                          <i className="fal fa-trash-alt"></i> {activeTab === "overview" ? " Remove" : ""}
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          {showModal && (
            <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bdrs12 border-0 shadow-lg">
                  <div className="modal-header pb20">
                    <h4 className="modal-title ff-heading fw500 text-thm">Add Team Mate</h4>
                    <button type="button" className="btn-close shadow-none cursor-pointer" onClick={() => setShowModal(false)}></button>
                  </div>
                  <form onSubmit={handleAddMember}>
                    <div className="modal-body pt15">
                      <div className="mb20 position-relative">
                        <label className="heading-color ff-heading fw500 mb10">Search by Email or User ID</label>
                        <div className="position-relative">
                          <input
                            className="form-control h60 bdrs12 pl40"
                            value={search}
                            onChange={e => {
                              setSearch(e.target.value);
                              const val = e.target.value.trim().toLowerCase();
                              if (val.length === 0) {
                                setSearchResults([]);
                                setSelectedWorker(null);
                                return;
                              }
                              const results = workerDB.filter(
                                w => (w.email.toLowerCase().includes(val) || w.id.toLowerCase().includes(val)) &&
                                  !teamMembers.some(tm => tm.userId === w.id)
                              );
                              setSearchResults(results);
                              setSelectedWorker(null);
                            }}
                            placeholder="e.g. name@veritask.com"
                          />
                          <i className="fal fa-search position-absolute" style={{ left: 15, top: 22, color: "#6b7177" }}></i>
                          {search && (
                            <button
                              type="button"
                              className="position-absolute bg-transparent border-0"
                              style={{ right: 15, top: 20, fontSize: 18 }}
                              onClick={() => {
                                setSearch("");
                                setSearchResults([]);
                                setSelectedWorker(null);
                              }}
                            >
                              <i className="fal fa-times-circle text-muted"></i>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mb10">
                        {searchResults.length > 0 ? (
                          <>
                            <p className="ff-heading fw500 mb10 text-dark">Suggested Workers</p>
                            <div className="search-results-list" style={{ maxHeight: 240, overflowY: "auto" }}>
                              {searchResults.map(w => (
                                <button
                                  type="button"
                                  key={w.id}
                                  className={`w-100 text-start d-flex align-items-center justify-content-between p15 mb10 bdrs8 cursor-pointer transition-all border ${selectedWorker && selectedWorker.id === w.id ? "bgc-thm-light border-thm shadow-sm" : "bg-white border-light-subtle"}`}
                                  onClick={() => {
                                    setSelectedWorker(w);
                                    setSearch(w.email);
                                    setSearchResults([]);
                                  }}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="member-initials me-3 d-flex align-items-center justify-content-center bgc-thm3 text-thm fw600 bdrs50" style={{ width: 40, height: 40, flexShrink: 0 }}>
                                      {w.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div>
                                      <h6 className="mb0 ff-heading fw500">{w.name}</h6>
                                      <p className="mb0 text-muted fz13">{w.email} | {w.id}</p>
                                    </div>
                                  </div>
                                  {selectedWorker && selectedWorker.id === w.id && (
                                    <i className="fas fa-check-circle text-thm"></i>
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        ) : search ? (
                          <div className="text-center py20 bg-light bdrs12">
                            <i className="fal fa-user-slash fz30 text-muted mb10 d-block"></i>
                            <p className="mb0 text-muted fz14">No matching workers found.</p>
                            <small className="text-muted">They might already be in your team.</small>
                          </div>
                        ) : (
                          <div className="text-center py20">
                            <i className="fal fa-users fz30 text-muted mb10 d-block"></i>
                            <p className="mb0 text-muted fz14 italic">Start typing to find a colleague...</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer border-0 pt0 pb25 px25 gap-2">
                      <button type="button" className="ud-btn btn-light-dark bdrs12 flex-grow-1 cursor-pointer" onClick={() => setShowModal(false)}>Cancel</button>
                      <button type="submit" className="ud-btn btn-thm bdrs12 flex-grow-1 cursor-pointer" disabled={!selectedWorker}>
                        Add to Team
                        <i className="fal fa-plus-circle ms-2"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Assign Modal */}
          {assignModal.show && assignModal.member && (
            <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bdrs12 border-0 shadow-lg">
                  <div className="modal-header pb20">
                    <h4 className="modal-title ff-heading fw500 text-thm">
                      {activeTab === "projects" ? "Manage Project Assignments" : "Assign Milestones"}
                    </h4>
                    <button type="button" className="btn-close shadow-none cursor-pointer" onClick={() => setAssignModal({ show: false, member: null })}></button>
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      // Only finalize if we are on the final step (Price) OR if we are just managing projects and want to save
                      const isProjectsOnly = activeTab === "projects" && modalStep === 1;
                      const isComplete = modalStep === 4;

                      if (!isProjectsOnly && !isComplete) {
                        setModalStep(s => s + 1);
                        return;
                      }

                      setTeamMembers(prev => prev.map(tm => {
                        if (tm.id === assignModal.member.id) {
                          return { ...tm, projects: selectedProjects };
                        }
                        return tm;
                      }));
                      setAssignModal({ show: false, member: null });
                      setSelectedProjects([]);
                    }}
                  >
                    <div className="modal-body pt15">
                      <div className="d-flex align-items-center mb20 p15 bdrs8 bgc-thm-light border border-thm-light">
                        <div className="member-initials me-3 d-flex align-items-center justify-content-center bgc-thm3 text-thm fw600 bdrs50" style={{ width: 40, height: 40 }}>
                          {assignModal.member.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="mb0 text-muted fz13">Currently managing {activeTab === "projects" ? "projects" : "milestones"} for</p>
                          <h6 className="mb0 ff-heading fw500">{assignModal.member.name}</h6>
                        </div>
                      </div>

                      <div className="mb25 d-flex align-items-center justify-content-between px10">
                        {[
                          { step: 1, label: "Projects", icon: "fa-briefcase" },
                          { step: 2, label: "Milestones", icon: "fa-list-check" },
                          { step: 3, label: "Deadlines", icon: "fa-calendar-day" },
                          { step: 4, label: "Pricing", icon: "fa-dollar-sign" }
                        ].map((s, idx) => (
                          <React.Fragment key={s.step}>
                            <div className="d-flex flex-column align-items-center" style={{ opacity: modalStep >= s.step ? 1 : 0.4 }}>
                              <div className={`bdrs50 d-flex align-items-center justify-content-center mb5 ${modalStep >= s.step ? "bgc-thm text-white shadow-sm" : "bg-light text-muted"}`} style={{ width: 32, height: 32, fontSize: 13 }}>
                                <i className={`fal ${s.icon}`}></i>
                              </div>
                              <span className={`fz10 fw500 ${modalStep >= s.step ? "text-thm" : "text-muted"}`}>{s.label}</span>
                            </div>
                            {idx < 3 && <div className="flex-grow-1 mx-1 mb15 border-top border-2" style={{ borderColor: modalStep > s.step ? "var(--primary-color)" : "#e9e9e9" }}></div>}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb15">
                          {modalStep === 1 ? "Select Projects" : modalStep === 2 ? "Select Milestones" : modalStep === 3 ? "Set Target Deadlines" : "Finalize Milestone Pricing"}
                        </label>
                        <div className="search-results-list px-1" style={{ maxHeight: 350, overflowY: "auto" }}>
                          {modalStep === 1 ? (
                            <div className="row g-3">
                              {projectList.map(projName => {
                                const projectObj = selectedProjects.find(p => p.name === projName);
                                const isSelected = !!projectObj;
                                return (
                                  <div key={projName} className="col-md-6">
                                    <button 
                                      type="button"
                                      className={`w-100 text-start p15 bdrs12 border transition-all cursor-pointer h-100 ${isSelected ? "border-thm bgc-thm-light shadow-sm" : "border-light-subtle bg-white hover-bgc-color"}`}
                                      onClick={() => toggleProject(projName)}
                                    >
                                      <div className="d-flex align-items-start justify-content-between mb15">
                                        <div className={`bdrs50 d-flex align-items-center justify-content-center ${isSelected ? "bgc-thm text-white shadow" : "bg-light text-muted"}`} style={{ width: 40, height: 40 }}>
                                          <i className={`fal ${isSelected ? "fa-check-circle" : "fa-briefcase"}`}></i>
                                        </div>
                                        {isSelected && <span className="badge bgc-thm text-white fz10 shadow-sm">Assigned</span>}
                                      </div>
                                      <h6 className={`mb5 ff-heading ${isSelected ? "text-thm fw600" : "text-dark"}`}>{projName}</h6>
                                      <p className="mb0 text-muted fz12">
                                        <i className="fal fa-layer-group me-1"></i> {projectMilestones[projName].length} Available Milestones
                                      </p>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            selectedProjects.length > 0 ? (
                              selectedProjects.map(projectObj => {
                                const milestones = projectMilestones[projectObj.name];
                                return (
                                  <div key={projectObj.name} className="mb15 p15 bdrs12 border border-thm bgc-thm-light shadow-sm">
                                    <h6 className="mb10 ff-heading text-thm fw600">{projectObj.name}</h6>
                                    <div className="ps-2 border-start border-2 ms-1 py-1">
                                      <div className="d-flex flex-wrap gap-2">
                                        {milestones.map(ms => {
                                          const msObj = projectObj.milestones.find(m => m.name === ms);
                                          const isMsSelected = !!msObj;
                                          return (
                                            <div key={ms} className="w-100 mb-2">
                                              {modalStep === 2 && (
                                                <button
                                                  type="button"
                                                  className={`w-100 px15 py10 bdrs8 text-start cursor-pointer transition-all border d-flex align-items-center justify-content-between ${isMsSelected ? "bgc-thm text-white border-thm" : "bg-white text-muted border-light-subtle"}`}
                                                  onClick={() => toggleMilestone(projectObj.name, ms)}
                                                >
                                                  <div className="d-flex align-items-center">
                                                    <i className={`fas ${isMsSelected ? "fa-check-circle" : "fa-circle"} me-2`}></i>
                                                    <span className="fw500">{ms}</span>
                                                  </div>
                                                  {isMsSelected && <i className="fal fa-chevron-right fz12"></i>}
                                                </button>
                                              )}
                                              
                                              {modalStep === 3 && isMsSelected && (
                                                <div className="p12 bdrs8 bg-white border border-light-subtle d-flex align-items-center justify-content-between shadow-sm">
                                                  <div className="fw500 text-dark fz14">{ms}</div>
                                                  <div className="d-flex align-items-center gap-2">
                                                    <i className="fal fa-calendar-alt text-thm"></i>
                                                    <input 
                                                      type="date" 
                                                      className="form-control h-auto py-1 px-2 fz13 bdrs6" 
                                                      value={msObj.deadline}
                                                      onChange={(e) => updateMilestoneDeadline(projectObj.name, ms, e.target.value)}
                                                    />
                                                  </div>
                                                </div>
                                              )}

                                              {modalStep === 4 && isMsSelected && (
                                                <div className="p12 bdrs8 bg-white border border-light-subtle d-flex align-items-center justify-content-between shadow-sm">
                                                  <div>
                                                    <div className="fw500 text-dark fz14">{ms}</div>
                                                    <div className="text-muted fz11"><i className="fal fa-clock me-1"></i>Due: {msObj.deadline || "TBA"}</div>
                                                  </div>
                                                  <div className="d-flex align-items-center gap-2">
                                                    <span className="fz13 fw500">Rate:</span>
                                                    <div className="position-relative" style={{ width: 100 }}>
                                                      <span className="position-absolute" style={{ left: 10, top: 6, fontSize: 13, color: "#6b7177" }}>$</span>
                                                      <input
                                                        type="number"
                                                        className="form-control py-1 ps-4 pe-2 fz13 bdrs6 h-auto fw600"
                                                        value={msObj.price}
                                                        onChange={(e) => updateMilestonePrice(projectObj.name, ms, e.target.value)}
                                                        min="0"
                                                      />
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-center py30 bg-light bdrs12">
                                <i className="fal fa-project-diagram fz30 text-muted mb10 d-block"></i>
                                <p className="mb0 text-muted fz14">No projects assigned yet.</p>
                                <small className="text-muted">Select some projects in the first step above.</small>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mt10 text-center py10 bg-light-subtle bdrs8 border border-dashed border-muted">
                        <p className="mb0 text-muted fz13">
                          <strong>{selectedProjects.length}</strong> project(s) | <strong>{selectedProjects.reduce((acc, p) => acc + p.milestones.length, 0)}</strong> milestone(s)
                        </p>
                        {modalStep === 4 && (
                          <p className="mb0 text-thm fz15 fw600 mt-1">
                            Total Value: ${selectedProjects.reduce((acc, p) => acc + p.milestones.reduce((pAcc, m) => pAcc + (m.price || 0), 0), 0)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="modal-footer border-0 pt0 pb25 px25 gap-2">
                      {modalStep > 1 && (
                        <button type="button" className="ud-btn btn-light-dark bdrs12 cursor-pointer" onClick={() => setModalStep(s => s - 1)}>
                          <i className="fal fa-arrow-left me-2"></i> Back
                        </button>
                      )}
                      
                      {(activeTab === "milestones" && modalStep < 4) || (activeTab === "projects" && modalStep === 2) || (activeTab === "projects" && modalStep === 3) ? (
                        <button 
                          type="submit" 
                          className="ud-btn btn-thm bdrs12 flex-grow-1 cursor-pointer" 
                          disabled={selectedProjects.length === 0 || (modalStep === 2 && selectedProjects.reduce((acc, p) => acc + p.milestones.length, 0) === 0)}
                        >
                          Next: {modalStep === 1 ? "Milestones" : modalStep === 2 ? "Deadlines" : "Pricing"}
                          <i className="fal fa-arrow-right ms-2"></i>
                        </button>
                      ) : (
                        <button type="submit" className="ud-btn btn-thm bdrs12 flex-grow-1 cursor-pointer">
                          {activeTab === "projects" && modalStep === 1 ? "Update Projects" : "Finalize Assignment"}
                          <i className="fal fa-save ms-2"></i>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {detailsModal.show && detailsModal.member && (
            <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content bdrs12 border-0 shadow-lg">
                  <div className="modal-header pb20">
                    <h4 className="modal-title ff-heading fw500 text-thm">Milestone Assignment Details</h4>
                    <button type="button" className="btn-close shadow-none cursor-pointer" onClick={() => setDetailsModal({ show: false, member: null })}></button>
                  </div>
                  <div className="modal-body pt15" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                    <div className="d-flex align-items-center mb25 p20 bdrs12 bgc-thm-light border border-thm-light">
                      <div className="member-initials me-4 d-flex align-items-center justify-content-center bgc-thm3 text-thm fw600 bdrs50" style={{ width: 60, height: 60, fontSize: 20 }}>
                        {detailsModal.member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h5 className="mb0 ff-heading fw600">{detailsModal.member.name}</h5>
                        <p className="mb0 text-muted fz14">{detailsModal.member.email}</p>
                        <span className="badge bg-white text-thm border border-thm mt-2 fz12">Contractor ID: {detailsModal.member.userId}</span>
                      </div>
                    </div>

                    <div className="row g-4">
                      {detailsModal.member.projects.length > 0 ? (
                        detailsModal.member.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="col-12">
                            <div className="p20 bdrs12 border bg-white shadow-sm hover-bgc-thm-light transition-all">
                              <div className="d-flex align-items-center justify-content-between mb15 border-bottom pb-3">
                                <div className="d-flex align-items-center">
                                  <div className="bdrs50 bg-light text-muted d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
                                    <i className="fal fa-briefcase"></i>
                                  </div>
                                  <h6 className="mb0 ff-heading fw600 text-dark">{proj.name}</h6>
                                </div>
                                <span className="badge bgc-thm-light text-thm fz12 px-3 py-2 bdrs20">{proj.milestones.length} Milestones</span>
                              </div>
                              <div className="table-responsive">
                                <table className="table table-borderless mb-0">
                                  <thead className="bg-light bdrs8">
                                    <tr>
                                      <th className="fz12 text-muted uppercase fw500 ps-3">Milestone Name</th>
                                      <th className="fz12 text-muted uppercase fw500">Deadline</th>
                                      <th className="fz12 text-muted uppercase fw500 text-end pe-3">Payment</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {proj.milestones.length > 0 ? (
                                      proj.milestones.map((ms, msIdx) => (
                                        <tr key={msIdx} className="border-bottom-dark">
                                          <td className="ps-3 py-3">
                                            <div className="d-flex align-items-center">
                                              <i className="fas fa-check-circle text-thm me-2 fz14"></i>
                                              <span className="fw500 text-dark">{ms.name}</span>
                                            </div>
                                          </td>
                                          <td className="py-3">
                                            <span className="text-muted fz13">
                                              <i className="fal fa-calendar-alt me-2 text-thm"></i>
                                              {ms.deadline || "TBA"}
                                            </span>
                                          </td>
                                          <td className="py-3 text-end pe-3">
                                            <span className="fw600 text-thm fz15">${ms.price}</span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="3" className="text-center py-4 text-muted fz13 italic">No specific milestones tracked for this project.</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 text-center py40">
                          <i className="fal fa-clipboard-list fz40 text-muted mb15 d-block"></i>
                          <p className="text-muted">No assignments found for this team member.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer border-0 p25 pt0">
                    <div className="w-100 p15 bdrs12 bg-light d-flex align-items-center justify-content-between mb-3">
                      <span className="text-muted fw500">Total Contract Value:</span>
                      <span className="fz18 fw700 text-thm">
                        ${detailsModal.member.projects.reduce((acc, p) => acc + p.milestones.reduce((pAcc, m) => pAcc + (m.price || 0), 0), 0)}
                      </span>
                    </div>
                    <button type="button" className="ud-btn btn-thm w-100 bdrs12" onClick={() => setDetailsModal({ show: false, member: null })}>Close Details</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Review & Messaging Modal */}
          {reviewModal.show && reviewModal.milestone && (
            <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bdrs12 border-0 shadow-lg">
                  <div className="modal-header pb20 border-bottom">
                    <h4 className="modal-title ff-heading fw600 text-thm fz18">
                      {reviewModal.mode === "concern" ? "Raise Execution Concern" : "Communication Thread"}
                    </h4>
                    <button type="button" className="btn-close shadow-none cursor-pointer" onClick={() => {
                      setReviewModal({ show: false, milestone: null });
                      setConcernText("");
                    }}></button>
                  </div>
                  <div className="modal-body p25">
                    <div className="d-flex align-items-center mb20 p15 bdrs12 bgc-thm-light border border-thm-light">
                      <div className="bdrs50 bgc-thm text-white d-flex align-items-center justify-content-center me-3" style={{ width: 42, height: 42 }}>
                        <i className={`fal ${reviewModal.mode === "concern" ? "fa-exclamation-triangle" : "fa-comments-alt"}`}></i>
                      </div>
                      <div>
                        <span className="d-block text-muted fz11 uppercase fw600">{reviewModal.milestone.projName}</span>
                        <h6 className="mb0 ff-heading fw600 text-thm">{reviewModal.milestone.name}</h6>
                      </div>
                    </div>

                    <div className="mb15">
                      <label className="heading-color ff-heading fw600 mb10">
                        {reviewModal.mode === "concern" ? "Provide detailed feedback to the teammate" : "Project Messages"}
                      </label>
                      {reviewModal.mode === "review" && (
                        <div className="bgc-thm-light p20 bdrs12 mb20 border border-thm-light shadow-inner" style={{ maxHeight: 250, overflowY: "auto" }}>
                          <div className="mb20">
                            <div className="d-flex align-items-center mb-1">
                              <div className="bdrs50 bgc-white text-thm fz10 fw700 d-flex align-items-center justify-content-center border border-thm me-2" style={{ width: 24, height: 24 }}>CT</div>
                              <span className="fw600 fz12 text-thm">Contractor</span>
                            </div>
                            <div className="p15 bg-white bdrs12 bdrs-tl-0 shadow-sm fz13 border border-light-subtle position-relative ms-1">
                              Please ensure the mobile breakpoints are handled correctly and assets are optimized.
                            </div>
                            <small className="text-muted fz10 mt-1 d-block ms-1">Today, 10:45 AM</small>
                          </div>
                          
                          <div className="text-end mb20">
                            <div className="d-flex align-items-center justify-content-end mb-1">
                              <span className="fw600 fz12 text-dark me-2">Teammate</span>
                              <div className="bdrs50 bgc-thm text-white fz10 fw700 d-flex align-items-center justify-content-center" style={{ width: 24, height: 24 }}>AR</div>
                            </div>
                            <div className="p15 bgc-thm text-white bdrs12 bdrs-tr-0 shadow-sm fz13 text-start d-inline-block border border-thm-dark position-relative me-1" style={{ maxWidth: "85%" }}>
                              I've updated the figma files and optimized all SVG exports. Working on the CSS implementation now.
                            </div>
                            <small className="text-muted fz10 mt-1 d-block me-1">Today, 11:30 AM</small>
                          </div>
                        </div>
                      )}
                      <textarea
                        className="form-control bdrs12 p15 h120"
                        placeholder={reviewModal.mode === "concern" ? "Specify what needs to be changed..." : "Type your message here..."}
                        value={concernText}
                        onChange={(e) => setConcernText(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer border-0 p25 pt0 gap-2">
                    <button type="button" className="ud-btn btn-light-dark bdrs12 flex-grow-1" onClick={() => {
                        setReviewModal({ show: false, milestone: null });
                        setConcernText("");
                    }}>Discard</button>
                    {reviewModal.mode === "concern" ? (
                      <button type="button" className="ud-btn btn-danger bdrs12 flex-grow-1" disabled={!concernText.trim()} onClick={() => {
                        updateMilestoneStatus(reviewModal.milestone.memberId, reviewModal.milestone.projName, reviewModal.milestone.name, "revision");
                        setReviewModal({ show: false, milestone: null });
                        setConcernText("");
                      }}>Flag for Revision</button>
                    ) : (
                      <button type="button" className="ud-btn btn-thm bdrs12 flex-grow-1" disabled={!concernText.trim()} onClick={() => {
                        setReviewModal({ show: false, milestone: null });
                        setConcernText("");
                      }}>Send Message</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
}
