import DashboardNavigation from "../header/DashboardNavigation";
import Award from "./Award";
import ChangePassword from "./ChangePassword";
import ConfirmPassword from "./ConfirmPassword";
import Education from "./Education";
import ProfileDetails from "./ProfileDetails";
import Skill from "./Skill";
import WorkExperience from "./WorkExperience";

export default function MyProfileInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40 pt-4">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>My Profile</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <ProfileDetails />
            <Skill />
            <Education />
            <WorkExperience />
            <Award />
            <div className="row">
              <div className="col-lg-6">
                <ChangePassword />
              </div>
              <div className="col-lg-6">
                <ConfirmPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
