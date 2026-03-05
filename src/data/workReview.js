import { project1, freelancer1 } from "./product";

export const workReviewItems = project1.slice(0, 3).map((job, index) => {
  const worker = freelancer1[index];
  const milestones = [
    {
      id: 1,
      title: "Planning & Requirements",
      status: "Approved",
      submittedOn: "Mar 03, 2026",
    },
    {
      id: 2,
      title: "Design / Implementation",
      status: index === 0 ? "Under Review" : "Submitted",
      submittedOn: "Mar 06, 2026",
    },
    {
      id: 3,
      title: "Final Handover",
      status: "Pending",
      submittedOn: "-",
    },
  ];

  return {
    id: String(job.id),
    jobTitle: job.title,
    jobId: `JOB-${1000 + job.id}`,
    workerId: worker.id,
    workerName: worker.name,
    workerImage: worker.img,
    workerProfilePath: `/employee-single/${worker.id}`,
    offerAmount: `$${job.price.max}`,
    submissionFiles: [
      {
        name: `${job.title.replace(/\s+/g, "-").toLowerCase()}-design-v1.fig`,
        type: "Figma File",
        size: "12.4 MB",
      },
      {
        name: `${job.title.replace(/\s+/g, "-").toLowerCase()}-handoff-notes.pdf`,
        type: "PDF",
        size: "1.1 MB",
      },
      {
        name: `${job.title.replace(/\s+/g, "-").toLowerCase()}-assets.zip`,
        type: "ZIP",
        size: "8.6 MB",
      },
    ],
    milestones,
  };
});

export const getWorkReviewById = (id) =>
  workReviewItems.find((item) => item.id === String(id));
