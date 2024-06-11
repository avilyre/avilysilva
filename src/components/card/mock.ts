import { faker } from "@faker-js/faker";

import { Project } from "@/@types/project";

export const projectsMock: Project[] = [
  {
    id: 1,
    image: {
      src: faker.image.url(),
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
      github: faker.internet.url(),
      figma: faker.internet.url(),
      deploy: faker.internet.url(),
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
      {
        id: "1",
        src: faker.image.url(),
        alt: faker.company.catchPhrase(),
      },
      {
        id: "2",
        src: faker.image.url(),
        alt: faker.company.catchPhrase(),
      },
      {
        id: "3",
        src: faker.image.url(),
        alt: faker.company.catchPhrase(),
      },
    ],
  },
];
