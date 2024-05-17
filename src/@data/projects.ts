import { Project } from "@/@types/project";

export const projects: Project[] = [
  {
    id: 1,
    image: {
      src: "/images/projects/devstore.png",
      alt: "devstore",
    },
    title: "devstore",
    description:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    slug: "devstore",
    details: {
      role: "design engineer",
      developmentTime: "30 dias",
      type: "ecommerce",
    },
    links: {
      github: "https://github.com/avilyre/devstore",
      deploy: "<empty-url>",
      figma: "<empty-url>",
    },
    motivation:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    highlights: ["fast loading", "acessible", "responsive", "original design"],
    technologies: [
      "nextjs",
      "typescript",
      "tailwindcss",
      "prisma",
      "postgresql",
    ],
    process: [
      {
        id: 1,
        title: "phase one",
        steps: ["analyse", "understand", "document", "board"],
      },
      {
        id: 2,
        title: "phase two",
        steps: ["repository", "rules", "base project"],
      },
      {
        id: 3,
        title: "phase three",
        steps: ["feature", "tests", "document", "deploy"],
      },
    ],
    images: [
      "/images/projects/devstore.png",
      "/images/projects/devstore.png",
      "/images/projects/devstore.png",
    ],
  },
];
