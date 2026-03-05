import ClientSectionLayout from "./ClientSectionLayout";
import { pendingEscrow } from "@/data/clientDashboard";

export default function PendingEscrowFundingInfo() {
  return (
    <ClientSectionLayout
      title="Pending Escrow Funding"
      description="Track tasks waiting for escrow funding."
    >
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title">Pending Escrow Funding</h5>
        </div>
        {pendingEscrow.map((item, i) => (
          <div key={i} className="mb15">
            <p className="dark-color mb-1 fw500">{item.task}</p>
            <p className="mb-0 fz14 text">Amount: {item.amount} | Due: {item.due}</p>
            {pendingEscrow.length !== i + 1 && <hr className="opacity-100 mt15 mb0" />}
          </div>
        ))}
      </div>
    </ClientSectionLayout>
  );
}
