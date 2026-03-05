import ClientSectionLayout from "./ClientSectionLayout";

const milestones = [
  { title: "Requirements Finalization", amount: 80, due: "Mar 04, 2026", status: "Completed" },
  { title: "Wireframe + UI Draft", amount: 120, due: "Mar 07, 2026", status: "Pending Funding" },
  { title: "Final Delivery + Handover", amount: 120, due: "Mar 10, 2026", status: "Pending Funding" },
];

export default function EscrowFundingInfo() {
  const taskBudget = 320;
  const platformFee = 16;
  const totalPayable = taskBudget + platformFee;

  return (
    <ClientSectionLayout
      title="Escrow Funding Page"
      description="Fund task escrow before start."
    >
      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Escrow Summary</h5>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <p className="mb8"><span className="fw500">Task:</span> Landing Page Redesign</p>
                <p className="mb8"><span className="fw500">Worker:</span> Hassan Riaz</p>
                <p className="mb8"><span className="fw500">Budget Model:</span> Milestone</p>
              </div>
              <div className="col-sm-6">
                <p className="mb8"><span className="fw500">Task Budget:</span> ${taskBudget}</p>
                <p className="mb8"><span className="fw500">Platform Fee:</span> ${platformFee}</p>
                <p className="mb8"><span className="fw500">Total Payable:</span> ${totalPayable}</p>
              </div>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Milestone Breakdown (if applicable)</h5>
            </div>
            <div className="table-style1 table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr>
                    <th>Milestone</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((item) => (
                    <tr key={item.title} className="bdrb1">
                      <td>{item.title}</td>
                      <td>${item.amount}</td>
                      <td>{item.due}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Platform Fee Display</h5>
            </div>
            <p className="mb10 text">A fixed platform fee is applied for escrow and payment protection.</p>
            <h4 className="mb0">${platformFee}</h4>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Confirm Payment</h5>
            </div>

            <div className="mb15">
              <label className="form-label fw500">Payment Method</label>
              <select className="form-select">
                <option>Bank Transfer</option>
                <option>Payoneer</option>
                <option>Credit/Debit Card</option>
              </select>
            </div>

            <div className="mb15">
              <label className="form-label fw500">Amount</label>
              <input type="number" className="form-control" defaultValue={totalPayable} />
            </div>

            <div className="form-check mb20">
              <input className="form-check-input" type="checkbox" id="escrowConfirm" />
              <label className="form-check-label" htmlFor="escrowConfirm">
                Confirmation: I confirm this escrow funding amount and payment method.
              </label>
            </div>

            <button type="button" className="ud-btn btn-thm w-100">
              Confirm Payment
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </ClientSectionLayout>
  );
}
