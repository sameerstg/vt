import ClientSectionLayout from "./ClientSectionLayout";

const proposals = [
  {
    name: "Areeba Khan",
    quote: "$320",
    eta: "4 days",
    text: "I can deliver a modern, conversion-focused landing page with clean handoff.",
  },
  {
    name: "Bilal Tariq",
    quote: "$300",
    eta: "5 days",
    text: "Strong UI detail and responsive implementation with milestone updates.",
  },
  {
    name: "Mariam Siddique",
    quote: "$360",
    eta: "3 days",
    text: "Fast delivery with clear communication and revision support.",
  },
];

const milestones = [
  { title: "Requirements Finalization", amount: "$80", due: "Mar 04, 2026", status: "Completed" },
  { title: "Wireframe + UI Draft", amount: "$120", due: "Mar 07, 2026", status: "In Progress" },
  { title: "Final Delivery + Handover", amount: "$120", due: "Mar 10, 2026", status: "Pending" },
];

export default function TaskDetailsInfo() {
  const taskStatus = "In Progress";
  const isAssigned = true;
  const showDisputeButton = ["In Progress", "Completed", "Disputed"].includes(taskStatus);
  const messagingThread = [
    {
      sender: "Client",
      time: "Mar 02, 2026 - 10:10 AM",
      message: "Please prioritize hero section and mobile spacing in this revision.",
    },
    {
      sender: "Hassan Riaz",
      time: "Mar 02, 2026 - 10:24 AM",
      message: "Noted. I will share updated draft with revised spacing by evening.",
    },
    {
      sender: "Client",
      time: "Mar 02, 2026 - 11:05 AM",
      message: "Great, also include final CTA variant for A/B review.",
    },
  ];

  return (
    <ClientSectionLayout
      title="Task Details (Client View)"
      description="View task and manage lifecycle."
    >
      <div className="row">
        <div className="col-xl-8">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center">
              <h5 className="title mb-0">Task Summary</h5>
              <span className="badge bgc-thm4 text-dark">{taskStatus}</span>
            </div>
            <h4 className="mb10">Landing Page Redesign for Product Launch</h4>
            <p className="text mb20">
              Need a conversion-focused landing page with modern UI, mobile responsiveness,
              and CMS-ready sections.
            </p>
            <div className="row">
              <div className="col-sm-6">
                <p className="mb8"><span className="fw500">Category:</span> Design &amp; Creative</p>
                <p className="mb8"><span className="fw500">Task Type:</span> Contractor</p>
                <p className="mb8"><span className="fw500">Physical / Virtual:</span> Virtual</p>
              </div>
              <div className="col-sm-6">
                <p className="mb8"><span className="fw500">Budget Model:</span> Milestone</p>
                <p className="mb8"><span className="fw500">Total Budget:</span> $320</p>
                <p className="mb8"><span className="fw500">Deadline:</span> Mar 10, 2026</p>
              </div>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Proposals List</h5>
            </div>
            {proposals.map((item, index) => (
              <div key={item.name} className="mb15">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <h6 className="mb5">{item.name}</h6>
                    <p className="text mb0">{item.text}</p>
                  </div>
                  <div className="text-end">
                    <p className="mb0 fw500">{item.quote}</p>
                    <p className="mb0 text fz14">ETA: {item.eta}</p>
                  </div>
                </div>
                {index !== proposals.length - 1 && <hr className="opacity-100 mt15 mb0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="col-xl-4">
          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Assigned Worker/Contractor</h5>
            </div>
            <div className="d-flex align-items-center">
              <img
                src="/images/team/fl-1.png"
                alt="worker"
                width={56}
                height={56}
                className="rounded-circle me-3"
              />
              <div>
                <h6 className="mb5">Hassan Riaz</h6>
                <p className="text mb0">UI/UX Specialist</p>
              </div>
            </div>
            <div className="mt20">
              <p className="mb8"><span className="fw500">Assigned On:</span> Mar 02, 2026</p>
              <p className="mb8"><span className="fw500">Current Stage:</span> UI Draft Review</p>
              <p className="mb0"><span className="fw500">Contact:</span> hassan.r@veritask.com</p>
            </div>
          </div>

          <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
            <div className="bdrb1 pb15 mb20">
              <h5 className="title mb-0">Escrow Status</h5>
            </div>
            <p className="mb8"><span className="fw500">Funded:</span> $200 / $320</p>
            <div className="progress mb15" role="progressbar" aria-label="Escrow funded" aria-valuenow={62} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-bar bgc-thm" style={{ width: "62%" }} />
            </div>
            <p className="text mb0">Next funding release will trigger after milestone 2 approval.</p>
          </div>
        </div>
      </div>

      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb20">
          <h5 className="title mb-0">Milestones</h5>
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
                  <td>{item.amount}</td>
                  <td>{item.due}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAssigned && (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="bdrb1 pb15 mb20 d-flex justify-content-between align-items-center">
            <h5 className="title mb-0">Messaging Thread (post-assignment)</h5>
            <span className="fz14 text">Assigned Collaboration</span>
          </div>
          {messagingThread.map((item, index) => (
            <div key={index} className="mb15">
              <p className="mb5 fw500">{item.sender}</p>
              <p className="mb5 text">{item.message}</p>
              <p className="mb0 fz13 text">{item.time}</p>
              {index !== messagingThread.length - 1 && <hr className="opacity-100 mt15 mb0" />}
            </div>
          ))}
          <div className="mt20">
            <label className="form-label fw500">Add Message</label>
            <textarea className="form-control" rows={4} placeholder="Write message for assigned worker/contractor..." />
            <div className="mt15">
              <button type="button" className="ud-btn btn-thm">
                Send Message
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisputeButton && (
        <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h5 className="title mb5">Dispute Button (if applicable)</h5>
              <p className="text mb0">
                Raise a dispute only when milestone scope, quality, or timeline cannot be resolved via chat.
              </p>
            </div>
            <button type="button" className="ud-btn btn-danger">
              Open Dispute
              <i className="fal fa-circle-exclamation" />
            </button>
          </div>
        </div>
      )}
    </ClientSectionLayout>
  );
}
