// after_style
interface Step {
  id: number;
  iconClass: string;
  title: string;
  description: string;
}

interface StepTwo {
  id: number;
  text: string;
}

interface StepThree {
  id: number;
  imgSrc: string;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    id: 1,

    iconClass: "flaticon-cv",
    title: "Post a job",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 1,

    iconClass: "flaticon-web-design",
    title: "Choose workers",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 1,

    iconClass: "flaticon-secure",
    title: "Pay safely",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 1,

    iconClass: "flaticon-customer-service",
    title: "We’re here to help",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
];

export const stepsTwo: StepTwo[] = [
  {
    id: 1,
    text: "Connect to workers with proven business experience",
  },
  {
    id: 2,
    text: "Get matched with the perfect talent by a customer success manager",
  },
  {
    id: 3,
    text: "Unmatched quality of remote, hybrid, and flexible jobs",
  },
];

export const stepsThree: StepThree[] = [
  {
    id: 1,
    imgSrc: "/images/about/home19-vector-1.png",
    title: "Post a job",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 2,
    imgSrc: "/images/about/home19-vector-2.png",
    title: "Choose workers",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 3,
    imgSrc: "/images/about/home19-vector-3.png",
    title: "Pay safely",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
  {
    id: 4,
    imgSrc: "/images/about/home19-vector-4.png",
    title: "We’re here to help",
    description:
      "It’s free and easy to post a job. Simply fill in a title, description.",
  },
];
