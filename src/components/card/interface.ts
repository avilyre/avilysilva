export interface CardProps {
  image: {
    src: string;
    alt: string;
    placeholderBlur?: string;
  };
  title: string;
  description: string;
  typeURL: "post" | "project";
  slug: string;
}
