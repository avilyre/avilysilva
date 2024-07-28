import { faker } from "@faker-js/faker";

import { CardProps } from "./interface";

export const cardMock: CardProps = {
  title: "devstore",
  description:
    "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
  tags: [
    {
      text: "custom tag",
      variant: "ocean",
    },
    {
      text: "another tag",
      variant: "secondary",
    },
  ],
  slug: "devstore",
  typeURL: "project",
  image: {
    src: faker.image.url(),
    alt: "devstore",
  },
};
