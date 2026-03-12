import DashboardNavigation from "../header/DashboardNavigation";

export default function ClientSectionLayout({ title, description, children }) {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{title}</h2>
            <p className="text">{description}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">{children}</div>
      </div>
    </div>
  );
}
