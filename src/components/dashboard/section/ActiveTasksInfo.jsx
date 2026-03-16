import ClientSectionLayout from "./ClientSectionLayout";
import { activeTasks } from "@/data/clientDashboard";

export default function ActiveTasksInfo() {
  return (
    <ClientSectionLayout
      title="Active Task"
      description="Manage your posted tasks that are currently active."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Active Task</h5>
        </div>
        {activeTasks.map((item, i) => (
          <div key={i} className="mb15">
            <p className="dark-color mb-1 fw500">{item.title}</p>
            <p className="mb-0 fz14 text">
              Budget: {item.budget} | Proposals: {item.proposals} | {item.status}
            </p>
            {activeTasks.length !== i + 1 && <hr className="opacity-100 mt15 mb0" />}
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
