import ClientSectionLayout from "./ClientSectionLayout";
import { inProgressTasks } from "@/data/clientDashboard";

export default function InProgressInfo() {
  return (
    <ClientSectionLayout
      title="In Progress"
      description="Monitor tasks currently being worked on."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">In Progress</h5>
        </div>
        {inProgressTasks.map((item, i) => (
          <div key={i} className="dashboard-timeline-label">
            <div className="timeline-item pb15">
              <div className="timeline-badge d-flex align-items-center">
                <i className="fas fa-genderless" />
              </div>
              <div className="ra_pcontent pl10">
                <span className="title">{item.task}</span>
                <br />
                <span className="subtitle">Freelancer: {item.freelancer} | ETA: {item.eta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
