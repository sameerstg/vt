"use client";
import toggleStore from "@/store/toggleStore";
import BudgetOption1 from "../option/BudgetOption1";
import LocationOption1 from "../option/LocationOption1";
import ServiceCategoryOption1 from "../option/ServiceCategoryOption1";
import ServiceModeOption1 from "../option/ServiceModeOption1";
import ClearButton from "../button/ClearButton";

export default function ListingSidebarModal1() {
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  return (
    <>
      <div className="lefttside-hidden-bar">
        <div className="hsidebar-header bdrb1">
          <h4 className="list-title">All filters</h4>
          <div onClick={listingToggle} className="sidebar-close-icon">
            <span className="far fa-times" />
          </div>
        </div>
        <div className="hsidebar-content">
          <div className="widget-wrapper">
            <div className="sidebar-accordion">
              <div className="accordion" id="accordionExample2">
                <div className="card mb20 pb10 rounded-0">
                  <div className="card-header" id="headingZero">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseZero"
                        aria-expanded="false"
                        aria-controls="collapseZero"
                      >
                        Location
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseZero"
                    className="collapse show"
                    aria-labelledby="headingZero"
                    data-parent="#accordionExample"
                  >
                    <LocationOption1 />
                  </div>
                </div>
                <div className="card mb20 pb0 rounded-0">
                  <div className="card-header" id="headingOnes">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOnes"
                        aria-expanded="true"
                        aria-controls="collapseOnes"
                      >
                        Category
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseOnes"
                    className="collapse"
                    aria-labelledby="headingOnes"
                    data-parent="#accordionExample"
                  >
                    <ServiceCategoryOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5 rounded-0">
                  <div className="card-header" id="headingTwos">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwos"
                        aria-expanded="true"
                        aria-controls="collapseTwos"
                      >
                        Physical / Virtual
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseTwos"
                    className="collapse"
                    aria-labelledby="headingTwos"
                    data-parent="#accordionExample"
                  >
                    <ServiceModeOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5 rounded-0">
                  <div className="card-header" id="headingThrees">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThrees"
                        aria-expanded="true"
                        aria-controls="collapseThrees"
                      >
                        Budget
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseThrees"
                    className="collapse"
                    aria-labelledby="headingThrees"
                    data-parent="#accordionExample"
                  >
                    <BudgetOption1 />
                  </div>
                </div>
              </div>
              <ClearButton />
            </div>
          </div>
        </div>
      </div>
      <div onClick={listingToggle} className="hiddenbar-body-ovelay" />
    </>
  );
}
