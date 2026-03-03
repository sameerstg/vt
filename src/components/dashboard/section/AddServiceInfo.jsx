import DashboardNavigation from "../header/DashboardNavigation";
import BasicInformation from "./BasicInformation";
import ExtraService from "./ExtraService";
import ServiceGallery from "./ServiceGallery";
import ServicePackage from "./ServicePackage";

export default function AddServiceInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>Add Services</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button className="btn-purple-arrow">
                Save & Publish
                <i className="fal fa-arrow-up-right" />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <BasicInformation />
            <ServicePackage />
            <ExtraService />
            <ServiceGallery />
          </div>
        </div>
      </div>
    </>
  );
}
