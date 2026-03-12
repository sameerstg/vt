"use client";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailExtra1 from "../element/ServiceDetailExtra1";
import ServiceDetailFaq1 from "../element/ServiceDetailFaq1";
import ServiceDetailPrice1 from "../element/ServiceDetailPrice1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import ServiceDetailSlider1 from "../element/ServiceDetailSlider1";

import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";
import Sticky from "react-stickynode";

const milestoneColumns = [
  {
    amount: "$300",
    title: "Milestone 1",
    desc: "Wireframe and user flow approval",
    deliverables: "Wireframes, User journey map",
    revisions: "1",
    delivery: "2 Days",
    total: "$300",
  },
  {
    amount: "$500",
    title: "Milestone 2",
    desc: "High-fidelity UI for core screens",
    deliverables: "6 UI screens, Style guide",
    revisions: "2",
    delivery: "3 Days",
    total: "$500",
  },
  {
    amount: "$700",
    title: "Milestone 3",
    desc: "Responsive variants and handoff",
    deliverables: "Desktop + Mobile exports",
    revisions: "3",
    delivery: "4 Days",
    total: "$700",
  },
];

export default function ServiceDetail1({ milestoneMode = false, proposalPath = "" }) {
  const isMatchedScreen = useScreen(1216);

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="column">
                <ServiceDetailSlider1 />
                <div className="service-about">
                  <h4>About</h4>
                  <p className="text mb30">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English.
                  </p>
                  <p className="text mb-0">Services I provide:</p>
                  <p className="text mb-0">1) Website Design</p>
                  <p className="text mb-0">2) Mobile App Design</p>
                  <p className="text mb-0">3) Brochure Design</p>
                  <p className="text mb-0">4) Business Card Design</p>
                  <p className="text mb30">5) Flyer Design</p>
                  <p className="text mb30">
                    Many desktop publishing packages and web page editors now
                    use Lorem Ipsum as their default model text, and a search
                    for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years,
                    sometimes by accident, sometimes on purpose (injected humour
                    and the like).
                  </p>
                  <div className="d-flex align-items-start mb50">
                    <div className="list1">
                      <h6>App type</h6>
                      <p className="text mb-0">Business, Food &amp; drink,</p>
                      <p className="text">Graphics &amp; design</p>
                    </div>
                    <div className="list1 ml80">
                      <h6>Design tool</h6>
                      <p className="text mb-0">Adobe XD, Figma,</p>
                      <p className="text">Adobe Photoshop</p>
                    </div>
                    <div className="list1 ml80">
                      <h6>Device</h6>
                      <p className="text">Mobile, Desktop</p>
                    </div>
                  </div>
                  
                  <hr className="opacity-100 mb60" />
                  <h4>Frequently Asked Questions</h4>
                  <ServiceDetailFaq1 />
                  <hr className="opacity-100 mb60" />
                  <h4>Add Extra Services</h4>
                  <ServiceDetailExtra1 />
                  <hr className="opacity-100 mb15" />
                  <ServiceDetailReviewInfo1 />
                  <ServiceDetailComment1 />
                </div>
              </div>
            </div>
            <div className="col-lg-4" id="stikyContainer">
              <div className="column">
                {isMatchedScreen ? (
                  // <Sticky>
                  //   {({ style }) => (
                  <Sticky bottomBoundary="#stikyContainer">
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ServiceDetailPrice1
                          milestoneMode={milestoneMode}
                          proposalPath={proposalPath}
                        />
                        <ServiceContactWidget1 />
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  //   )}
                  // </Sticky>
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ServiceDetailPrice1
                        milestoneMode={milestoneMode}
                        proposalPath={proposalPath}
                      />
                      <ServiceContactWidget1 />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </StickyContainer> */}
    </>
  );
}
