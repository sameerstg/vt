import ProfileDetails from "@/app/worker/components/section/ProfileDetails";
import ChangePassword from "@/app/worker/components/section/ChangePassword";

export const metadata = {
  title: "VeriTask - Admin My Profile",
};

export default function AdminMyProfilePage() {
  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <ProfileDetails />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
