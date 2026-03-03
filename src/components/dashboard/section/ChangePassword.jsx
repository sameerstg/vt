import Link from "next/link";

export default function ChangePassword() {
  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h5 className="list-title">Change password</h5>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <form className="form-style1">
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Old Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="mb20">
                    <label className="heading-color ff-heading fw500 mb10">
                      Confirm New Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="text-start">
                    <button 
                      type="button" 
                      className="flex items-center justify-center gap-2 px-8 h-12 rounded-lg font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-purple-100"
                      style={{ backgroundColor: '#2d0087' }}
                    >
                      <span className="text-base">Change Password</span>
                      <i className="fal fa-arrow-up-right font-light" style={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
