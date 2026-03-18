"use client";

import { useState, useMemo } from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import { adminDisputedProjects } from "@/data/adminProjects";
import Pagination1 from "@/components/section/Pagination1";

export default function ProjectMonitoringDisputedProjectsInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatProject, setSelectedChatProject] = useState(null);
  const [selectedDetailProject, setSelectedDetailProject] = useState(null);
  const pageSize = 5;

  const filteredProjects = useMemo(() => {
    let list = adminDisputedProjects;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.client.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.freelancer && p.freelancer.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        {!selectedChatProject && (
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Disputed Projects</h2>
              <p className="text">Manage projects that have an active conflict.</p>
            </div>
          </div>
        )}
      </div>

      {selectedChatProject ? (
        <div className="row">
          <div className="col-lg-4 col-xl-4 mb-4">
            <div className="bgc-white bdrs8 p30 d-flex flex-column h-100" style={{ border: "1px solid #E9ECEF" }}>
              <div className="d-flex align-items-center mb20 pb10 bdrb1">
                <button
                  type="button"
                  className="btn text-decoration-underline p-0 mr15"
                  onClick={() => setSelectedChatProject(null)}
                  style={{ color: "#390b79", fontWeight: "600", fontSize: "14px" }}
                >
                  <i className="fal fa-arrow-left mr5" /> Back
                </button>
                <h5 className="mb-0" style={{ color: "#390b79", fontWeight: "600" }}>Conversation Details</h5>
              </div>

              <div className="d-flex align-items-center p15 mb20 rounded" style={{ border: "1px solid #E9ECEF" }}>
                <div 
                  className="d-flex align-items-center justify-content-center text-white" 
                  style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5d35ff", fontSize: "16px", fontWeight: "600" }}
                >
                  {selectedChatProject.freelancer.charAt(0)}
                </div>
                <div className="ml15">
                  <h6 className="mb-0">{selectedChatProject.freelancer}</h6>
                  <p className="text mb-0" style={{ fontSize: "13px" }}>Assigned freelancer</p>
                </div>
              </div>

              <div className="p15 mb20 rounded" style={{ border: "1px solid #E9ECEF" }}>
                <p className="text mb-1" style={{ fontSize: "12px", color: "#8E98A8" }}>Project</p>
                <h6 className="mb-0 text-dark">{selectedChatProject.title}</h6>
              </div>

              <div className="p15 mb20 rounded" style={{ border: "1px solid #E9ECEF" }}>
                <p className="text mb-1" style={{ fontSize: "12px", color: "#8E98A8" }}>Freelancer</p>
                <h6 className="mb-0 text-dark">{selectedChatProject.freelancer}</h6>
              </div>

              <div className="p15 mb20 rounded" style={{ border: "1px solid #E9ECEF" }}>
                <p className="text mb-1" style={{ fontSize: "12px", color: "#8E98A8" }}>ETA</p>
                <h6 className="mb-0 text-dark">{selectedChatProject.eta}</h6>
              </div>

              <div className="p15 mb20 rounded" style={{ border: "1px solid #E9ECEF" }}>
                <p className="text mb-1" style={{ fontSize: "12px", color: "#8E98A8" }}>Status</p>
                <h6 className="mb-0 text-dark">{selectedChatProject.status}</h6>
              </div>

              <div className="p15 rounded mt-auto" style={{ background: "#f8f5ff", border: "1px solid #efe8ff" }}>
                <h6 className="mb-1" style={{ color: "#390b79" }}>Project Note</h6>
                <p className="text mb-0" style={{ fontSize: "13px", color: "#4f5561" }}>
                  Use this thread for milestone updates, questions, file coordination, and delivery clarifications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-8 col-xl-8 mb-4">
            <div className="bgc-white bdrs8 p30 d-flex flex-column h-100" style={{ border: "1px solid #E9ECEF" }}>
              <div className="d-flex justify-content-between align-items-center mb20 pb10 bdrb1">
                <div>
                  <h5 className="mb-1 text-dark" style={{ fontWeight: "700" }}>{selectedChatProject.title}</h5>
                  <p className="text mb-0">Direct chat with {selectedChatProject.freelancer}</p>
                </div>
                <div>
                  <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1", padding: "6px 14px", borderRadius: "20px" }}>
                    {selectedChatProject.status}
                  </span>
                </div>
              </div>

              <div className="chat-messages-area p20 rounded mb20" style={{ border: "1px solid #F1F2F4", background: "#f9fafc", flex: "1 1 auto", minHeight: "350px", display: "flex", flexDirection: "column" }}>
                
                {/* Left Bubble */}
                <div className="d-flex flex-column align-items-start mb20">
                  <span style={{ fontSize: "11px", color: "#64748b", marginBottom: "5px", marginLeft: "2px" }}>
                    {selectedChatProject.freelancer} &nbsp;10:18 AM
                  </span>
                  <div className="p15" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", borderTopLeftRadius: "2px", maxWidth: "80%", color: "#334155" }}>
                    Hi, I have started working on {selectedChatProject.title} and the initial setup is complete.
                  </div>
                </div>

                {/* Right Bubble */}
                <div className="d-flex flex-column align-items-end mb20">
                  <span style={{ fontSize: "11px", color: "#64748b", marginBottom: "5px", marginRight: "2px" }}>
                    You &nbsp;10:24 AM
                  </span>
                  <div className="p15" style={{ background: "#f8f5ff", border: "1px solid #efe8ff", borderRadius: "10px", borderTopRightRadius: "2px", maxWidth: "80%", color: "#334155" }}>
                    Good. Please keep me posted on the milestone progress and share blockers early.
                  </div>
                </div>

                {/* Left Bubble */}
                <div className="d-flex flex-column align-items-start mb20">
                  <span style={{ fontSize: "11px", color: "#64748b", marginBottom: "5px", marginLeft: "2px" }}>
                    {selectedChatProject.freelancer} &nbsp;10:31 AM
                  </span>
                  <div className="p15" style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", borderTopLeftRadius: "2px", maxWidth: "80%", color: "#334155" }}>
                    Understood. I will send the next update with screenshots before end of day.
                  </div>
                </div>

              </div>

              <div className="d-flex mt-auto gap-2">
                <input 
                  type="text" 
                  className="form-control flex-grow-1" 
                  placeholder={`Write a message to ${selectedChatProject.freelancer}...`}
                  style={{ height: "48px", border: "1px solid #E9ECEF" }}
                />
                <button 
                  type="button" 
                  className="ud-btn" 
                  style={{ height: "48px", background: "#390b79", color: "#fff", padding: "0 25px", border: "none", borderRadius: "4px" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              
              <div className="d-flex align-items-center mb30">
                <div className="position-relative w-100" style={{ maxWidth: "400px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by project name or client name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: "40px", height: "50px", borderRadius: "8px" }}
                  />
                  <i className="flaticon-loupe position-absolute" style={{ left: "15px", top: "15px", color: "#888" }} />
                </div>
              </div>

              <div className="packages_table table-responsive">
                <table className="table-style3 table align-middle mb-0">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Dispute ID</th>
                      <th scope="col">Dispute Reason / Project</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {paginatedProjects.length > 0 ? (
                      paginatedProjects.map((project) => (
                        <tr key={project.id}>
                          <td>{project.id}</td>
                          <td className="fw500">{project.title}</td>
                          <td>{project.client}</td>
                          <td>{project.budget}</td>
                          <td>
                            <span className="badge bg-warning text-dark px-3 py-2 rounded">
                              {project.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button 
                                className="ud-btn px-3 py-2 text-white" 
                                style={{ background: "#390b79", borderRadius: "6px", fontSize: "14px", lineHeight: "1" }}
                                onClick={() => setSelectedChatProject(project)}
                              >
                                Chat
                              </button>
                              <button 
                                className="ud-btn px-3 py-2 text-white" 
                                style={{ background: "#390b79", borderRadius: "6px", fontSize: "14px", lineHeight: "1" }}
                                onClick={() => setSelectedDetailProject(project)}
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No disputed projects found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredProjects.length > 0 && (
                <div className="mt30">
                  <Pagination1
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredProjects.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    countLabel="disputes"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedDetailProject && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px"
        }}>
          <div className="bgc-white bdrs8 p30 position-relative" style={{ width: "100%", maxWidth: "500px", border: "1px solid #E9ECEF", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <button 
              onClick={() => setSelectedDetailProject(null)}
              className="position-absolute"
              style={{ top: "20px", right: "20px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888" }}
            >
              <i className="fal fa-times"></i>
            </button>
            <h4 className="mb-4" style={{ color: "#390b79", fontWeight: "700" }}>Project Details</h4>
            
            <div className="mb-3 border-bottom pb-2 mt-4">
              <span className="text-muted" style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase" }}>Project Name</span>
              <h6 className="mb-0 mt-1 text-dark" style={{ fontSize: "16px" }}>{selectedDetailProject.title}</h6>
            </div>
            
            <div className="row mt-4">
              <div className="col-6 mb-3 border-bottom pb-2">
                <span className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Dispute ID</span>
                <h6 className="mb-0 mt-1">{selectedDetailProject.id}</h6>
              </div>
              <div className="col-6 mb-3 border-bottom pb-2">
                <span className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Status</span>
                <h6 className="mb-0 mt-1" style={{ color: "#b45309" }}>{selectedDetailProject.status}</h6>
              </div>
              <div className="col-6 mb-3 border-bottom pb-2">
                <span className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Client</span>
                <h6 className="mb-0 mt-1">{selectedDetailProject.client}</h6>
              </div>
              <div className="col-6 mb-3 border-bottom pb-2">
                <span className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Amount</span>
                <h6 className="mb-0 mt-1">{selectedDetailProject.budget}</h6>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-muted" style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: "600" }}>Short Description</span>
              <p className="text-dark mt-2" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                This dispute was opened securely on pending date <strong>{selectedDetailProject.date}</strong>. The client and freelancer are currently negotiating terms via the chat module regarding the deliverables for this phase map. Admin monitoring controls remain active.
              </p>
            </div>
            
            <div className="d-flex justify-content-end mt-4 pt-2">
               <button 
                 className="ud-btn px-4 py-2 text-white" 
                 style={{ background: "#390b79", borderRadius: "6px", fontSize: "14px" }}
                 onClick={() => setSelectedDetailProject(null)}
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
