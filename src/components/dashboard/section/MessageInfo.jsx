import { msgList } from "@/data/message";
import DashboardNavigation from "../header/DashboardNavigation";
import UserChatList1 from "../card/UserChatList1";
import MessageBox from "../element/MessageBox";

export default function MessageInfo() {
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2 className="title" style={{ color: '#2d138f', fontSize: '30px', fontWeight: '700' }}>Messages</h2>
              <p className="text" style={{ color: '#5e6d82', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row mb40">
          <div className="col-lg-6 col-xl-5 col-xxl-4">
            <div className="message_container">
              <div className="inbox_user_list">
                <div className="iu_heading pr35">
                  <div className="chat_user_search">
                    <form className="d-flex align-items-center">
                      <button className="btn" type="button">
                        <span className="far fa-magnifying-glass" />
                      </button>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Serach"
                        aria-label="Search"
                      />
                    </form>
                  </div>
                </div>
                <div className="chat-member-list pr20">
                  {msgList.map((item,i) => (
                    <div key={i} className="list-item pt5">
                      <a>
                        <UserChatList1 data={item} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xl-7 col-xxl-8">
            <MessageBox />
          </div>
        </div>
      </div>
    </>
  );
}
