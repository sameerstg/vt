"use client";
import { projectProposal1 } from "@/data/product";
import ProjectProposalCard1 from "../card/ProjectProposalCard1";
import ServiceDetailExtra1 from "../element/ServiceDetailExtra1";
import Sticky from "react-stickynode";

import ProjectPriceWidget1 from "../element/ProjectPriceWidget1";
import ProjectContactWidget1 from "../element/ProjectContactWidget1";
import useScreen from "@/hook/useScreen";

const skills = [
  "SaaS",
  "Figma",
  "Software Design",
  "Sketch",
  "Prototyping",
  "HTML5",
  "Design",
  "Writing",
];

import { useEffect, useState } from "react";
import { getTaskById, getAllUsers, getAuthSession, saveProposal } from "@/utils/auth/mockAuth";
import { project1 } from "@/data/product";

export default function ProjectDetail1({ id }) {
  const isMatchedScreen = useScreen(1216);
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    // Find in static data first, then mock data
    let found = project1.find(p => String(p.id) === String(id));
    if (found) {
      setProject({
        title: found.title,
        description: found.brief,
        budget: `$${found.price.min} - $${found.price.max}`,
        category: found.category,
        location: found.location,
        budgetModel: found.projectType === "Fixed" ? "fixed" : "milestone",
        clientName: found.author || "Freeio Client"
      });
    } else {
      const task = getTaskById(id);
      if (task) {
        setProject(task);
        const users = getAllUsers();
        const foundClient = users.find(u => String(u.id) === String(task.clientId) || u.email === task.clientEmail);
        setClient(foundClient);
      }
    }
  }, [id]);

  if (!project) return <div className="p50 text-center">Loading Project...</div>;

  return (
    <>
      <section className="pt30">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="column">
                <div className="scrollbalance-inner">
                  <div className="row">
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-notification-1" />
                        </div>
                        <div className="details">
                           <h5 className="title">Seller Type</h5>
                           <p className="mb-0 text">{project.sellerType || "Individual / Company"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-dollar" />
                        </div>
                        <div className="details">
                          <h5 className="title">Project type</h5>
                          <p className="mb-0 text">{project.budgetModel === "fixed" ? "Fixed Price" : "Milestone Based"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-fifteen" />
                        </div>
                        <div className="details">
                          <h5 className="title">Project Deadline</h5>
                          <p className="mb-0 text">{project.deadline || "TBD"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-like-1" />
                        </div>
                        <div className="details">
                          <h5 className="title">Project Level</h5>
                          <p className="mb-0 text">{project.projectLevel || "Intermediate"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-translator" />
                        </div>
                        <div className="details">
                          <h5 className="title">Languages</h5>
                          <p className="mb-0 text">{project.languages || "English"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-goal" />
                        </div>
                        <div className="details">
                          <h5 className="title">English Level</h5>
                          <p className="mb-0 text">{project.englishLevel || "Professional"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="service-about">
                    <h4>Description</h4>
                    <p className="text mb30">
                      {project.description || "No description provided."}
                    </p>
                    <hr className="opacity-100 mb60 mt60" />
                    <h4 className="mb30">Attachments</h4>
                    <div className="row">
                      {project.attachments && project.attachments.length > 0 ? (
                        project.attachments.map((file, i) => (
                          <div key={i} className="col-6 col-lg-3">
                            <div className="project-attach">
                              <h6 className="title" style={{ 
                                whiteSpace: 'nowrap', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis' 
                              }} title={file}>
                                {file}
                              </h6>
                              <p>{file.split('.').pop().toUpperCase()}</p>
                              <span className="icon flaticon-page" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12">
                          <p className="text-muted fz14 italic">No attachments have been shared for this project.</p>
                        </div>
                      )}
                    </div>
                    <hr className="opacity-100 mb60 mt30" />
                    <h4 className="mb30">Skills Required</h4>
                    <div className="mb60">
                      {(project.skills && project.skills.length > 0 ? project.skills : skills).map((item, i) => (
                        <a
                          key={`skill-${i}`}
                          className={`tag list-inline-item mb-2 mb-xl-0 ${
                            String(item).length === 7 ? "mr0" : "mr10"
                          }`}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                    <div className="bsp_reveiw_wrt mt25">
                      <h4 className="mb30">Project Proposals ({project.proposals || 0}) sent</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" id="stikyContainer">
              <div className="column">
                {isMatchedScreen ? (
                  <Sticky bottomBoundary="#stikyContainer">
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ProjectPriceWidget1 price={project.budget} id={id} />
                        <ProjectContactWidget1 client={client} clientName={project.clientName} />
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ProjectPriceWidget1 price={project.budget} id={id} />
                      <ProjectContactWidget1 client={client} clientName={project.clientName} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
