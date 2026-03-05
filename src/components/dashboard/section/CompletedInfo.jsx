import ClientSectionLayout from "./ClientSectionLayout";
import { completedTasks } from "@/data/clientDashboard";

export default function CompletedInfo() {
  return (
    <ClientSectionLayout
      title="Completed"
      description="Review tasks that have been completed and approved."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Completed</h5>
        </div>
        {completedTasks.map((item, i) => (
          <div key={i} className="mb15">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">
              Freelancer: {item.freelancer} | Completed: {item.completedOn}
            </p>
            {completedTasks.length !== i + 1 && <hr className="opacity-100 mt15 mb0" />}
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
