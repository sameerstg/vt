"use client";
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

export default function ProjectDetail1() {
  const isMatchedScreen = useScreen(1216);

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
                          <p className="mb-0 text">Company</p>
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
                          <p className="mb-0 text">Hourly</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-fifteen" />
                        </div>
                        <div className="details">
                          <h5 className="title">Project Duration</h5>
                          <p className="mb-0 text">10-15 Hours</p>
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
                          <p className="mb-0 text">Expensive</p>
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
                          <p className="mb-0 text">20</p>
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
                          <p className="mb-0 text">Professional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="service-about">
                    <h4>Description</h4>
                    <p className="text mb30">
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page when looking
                      at its layout. The point of using Lorem Ipsum is that it
                      has a more-or-less normal distribution of letters, as
                      opposed to using 'Content here, content here', making it
                      look like readable English.{" "}
                    </p>
                    <p className="text mb30">
                      Many desktop publishing packages and web page editors now
                      use Lorem Ipsum as their default model text, and a search
                      for 'lorem ipsum' will uncover many web sites still in
                      their infancy. Various versions have evolved over the
                      years, sometimes by accident, sometimes on purpose
                      (injected humour and the like).
                    </p>
                    <hr className="opacity-100 mb60 mt60" />
                    <h4 className="mb30">Attachments</h4>
                    <div className="row">
                      <div className="col-6 col-lg-3">
                        <div className="project-attach">
                          <h6 className="title">Project Brief</h6>
                          <p>PDF</p>
                          <span className="icon flaticon-page" />
                        </div>
                      </div>
                      <div className="col-6 col-lg-3">
                        <div className="project-attach">
                          <h6 className="title">Project Brief</h6>
                          <p>PDF</p>
                          <span className="icon flaticon-page" />
                        </div>
                      </div>
                    </div>
                    <hr className="opacity-100 mb60 mt30" />
                    <h4 className="mb30">Skills Required</h4>
                    <div className="mb60">
                      {skills.map((item, i) => (
                        <a
                          key={i}
                          className={`tag list-inline-item mb-2 mb-xl-0 ${
                            Number(item.length) === 7 ? "mr0" : "mr10"
                          }`}
                        >
                          {item}
                        </a>
                      ))}
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
                        <ProjectPriceWidget1 />
                        <ProjectContactWidget1 />
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ProjectPriceWidget1 />
                      <ProjectContactWidget1 />
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
