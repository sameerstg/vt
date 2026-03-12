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
        <div className="row pb40">
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>My Profile</h2>
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
            <ChangePassword />
          </div>
        </div>
      </div>
    </>
  );
}
