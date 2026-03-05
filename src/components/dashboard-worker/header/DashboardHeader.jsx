"use client";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";

export default function DashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);

  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link href="/" className="logo">
                      <Image
                        height={40}
                        width={133}
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className="fz20 ml90">
                    <a
                      onClick={toggle}
                      className="dashboard_sidebar_toggle_icon vam"
                    >
                      <Image
                        height={18}
                        width={20}
                        src="/images/dashboard-navicon.svg"
                        alt="navicon"
                      />
                    </a>
                  </div>
                  <a
                    className="login-info d-block d-xl-none ml40 vam"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                  >
                    <span className="flaticon-loupe" />
                  </a>
                  <div className="ml40 d-none d-xl-block">
                    <div className="search_area dashboard-style">
                      <input
                        type="text"
                        className="form-control border-0"
                        placeholder="What service are you looking for today?"
                      />
                      <label>
                        <span className="flaticon-loupe" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-notification" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt10 pb15">
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-1.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your resume</p>
                              <p className="text mb-0">updated!</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-2.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">You changed</p>
                              <p className="text mb-0">password</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-3.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your account has been</p>
                              <p className="text mb-0">created successfully</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-4.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">
                                You applied for a job{" "}
                              </p>
                              <p className="text mb-0">Front-end Developer</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-5.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your course uploaded</p>
                              <p className="text mb-0">successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-mail" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt20 pb15">
                          <div className="notif_list d-flex align-items-start bdrb1 pb25 mb10">
                            <Image
                              height={50}
                              width={50}
                              className="img-2"
                              src="/images/testimonials/testi-1.png"
                              alt="testimonials"
                            />
                            <div className="details ml15">
                              <p className="dark-color fw500 mb-2">Ali Tufan</p>
                              <p className="text mb-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing.
                              </p>
                              <p className="mb-0 text-thm">4 hours ago</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-start mb25">
                            <Image
                              height={50}
                              width={50}
                              className="img-2"
                              src="/images/testimonials/testi-2.png"
                              alt="testimonials"
                            />
                            <div className="details ml15">
                              <p className="dark-color fw500 mb-2">Ali Tufan</p>
                              <p className="text mb-2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing.
                              </p>
                              <p className="mb-0 text-thm">4 hours ago</p>
                            </div>
                          </div>
                          <div className="d-grid">
                            <Link
                              href="/message"
                              className="ud-btn btn-thm w-100"
                            >
                              View All Messages
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-like" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt10 pb15">
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-1.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your resume</p>
                              <p className="text mb-0">updated!</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-2.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">You changed</p>
                              <p className="text mb-0">password</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-3.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your account has been</p>
                              <p className="text mb-0">created successfully</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center bdrb1 pb15 mb10">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-4.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">
                                You applied for a job{" "}
                              </p>
                              <p className="text mb-0">Front-end Developer</p>
                            </div>
                          </div>
                          <div className="notif_list d-flex align-items-center">
                            <Image
                              height={40}
                              width={40}
                              src="/images/resource/notif-5.png"
                              alt="notif"
                            />
                            <div className="details ml10">
                              <p className="text mb-0">Your course uploaded</p>
                              <p className="text mb-0">successfully</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="user_setting">
                      <div className="dropdown">
                        <button
                          className="btn p-0 border-0 bg-transparent admin-profile-trigger"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <Image
                            className="admin-profile-trigger__avatar"
                            height={50}
                            width={50}
                            src="/images/testimonials/testi-1.png"
                            alt="user.png"
                          />
                          <span className="admin-profile-trigger__meta">
                            <span className="admin-profile-trigger__name">alex howl</span>
                            <span className="admin-profile-trigger__role">Agent</span>
                          </span>
                          <span className="admin-profile-trigger__chevron">
                            <i className="fal fa-angle-down" />
                          </span>
                        </button>
                        <div className="dropdown-menu user_profile_menu admin-profile-menu">
                          <Link className="dropdown-item" href="/worker-dashboard/my-profile">
                            My Profile
                          </Link>
                          <Link className="dropdown-item logout" href="/login">
                            Logout
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <style jsx>{`
        .admin-profile-trigger {
          align-items: center;
          display: inline-flex;
          gap: 10px;
          min-width: 185px;
          padding: 0;
        }

        .admin-profile-trigger__avatar {
          border-radius: 50%;
          display: block;
          flex-shrink: 0;
          height: 46px;
          object-fit: cover;
          width: 46px;
        }

        .admin-profile-trigger__meta {
          align-items: flex-start;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          text-align: left;
        }

        .admin-profile-trigger__name {
          color: var(--headings-color);
          font-family: var(--title-font-family);
          font-size: 16px;
          font-weight: 700;
          text-transform: none;
        }

        .admin-profile-trigger__role {
          color: #5b6d88;
          font-size: 14px;
          margin-top: 3px;
        }

        .admin-profile-trigger__chevron {
          align-items: center;
          border: 1px solid #d8dde8;
          border-radius: 999px;
          color: #64748b;
          display: inline-flex;
          font-size: 11px;
          height: 22px;
          justify-content: center;
          margin-left: auto;
          transition: transform 0.2s ease;
          width: 22px;
        }

        .admin-profile-trigger[aria-expanded="true"] .admin-profile-trigger__chevron {
          transform: rotate(180deg);
        }

        .user_setting .dropdown-menu.user_profile_menu.admin-profile-menu.show {
          border: 1px solid #e4e8f1;
          border-radius: 14px;
          box-shadow: 0 12px 34px rgba(15, 23, 42, 0.13);
          min-width: 180px;
          padding: 8px 0;
          transform: translate(-32px, 14px) !important;
        }

        .user_setting .dropdown-menu.user_profile_menu.admin-profile-menu .dropdown-item {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.4;
          padding: 10px 18px;
        }

        .user_setting
          .dropdown-menu.user_profile_menu.admin-profile-menu
          .dropdown-item.logout {
          color: #ff3838;
        }

        @media (max-width: 575px) {
          .admin-profile-trigger {
            min-width: 172px;
          }

          .user_setting .dropdown-menu.user_profile_menu.admin-profile-menu.show {
            transform: translate(-26px, 12px) !important;
          }
        }
      `}</style>
    </>
  );
}
