import ClientSectionLayout from "./ClientSectionLayout";
import { notifications } from "@/data/clientDashboard";

export default function NotificationsInfo() {
  return (
    <ClientSectionLayout
      title="Notifications"
      description="Stay updated on task events and funding reminders."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Notifications</h5>
        </div>
        {notifications.map((item, i) => (
          <div key={i} className="d-flex justify-content-between align-items-center py10">
            <p className="mb-0 text">{item.text}</p>
            <span className="fz13 text-muted">{item.time}</span>
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
