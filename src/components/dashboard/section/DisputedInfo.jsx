import ClientSectionLayout from "./ClientSectionLayout";
import { disputedTasks } from "@/data/clientDashboard";

export default function DisputedInfo() {
  return (
    <ClientSectionLayout
      title="Disputed"
      description="Track and resolve disputed tasks."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Disputed</h5>
        </div>
        {disputedTasks.map((item, i) => (
          <div key={i} className="mb10">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">Issue: {item.issue} | Status: {item.status}</p>
            {disputedTasks.length !== i + 1 && <hr className="opacity-100 mt15 mb0" />}
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
