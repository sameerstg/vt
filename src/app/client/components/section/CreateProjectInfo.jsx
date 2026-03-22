"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import BasicInformation2 from "./BasicInformation2";
import UploadAttachment from "./UploadAttachment";

export default function CreateProjectInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Create Project</h2>
              <p className="text">Fill in the details below to create your project.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <a className="ud-btn btn-dark">
                Post Project
                <i className="fal fa-arrow-right-long" />
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <BasicInformation2 />
            <UploadAttachment />
          </div>
        </div>
      </div>
    </>
  );
}
