import { Tag } from "@/@types/tag";

export interface CardProps {
  image: {
    src: string;
    alt: string;
    placeholderBlur?: string;
  };
  title: string;
  description: string;
  tags?: Tag[];
  typeURL: "post" | "project";
  slug: string;
}
