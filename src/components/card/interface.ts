export interface CardProps {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  typeURL: "post" | "project";
  slug: string;
}
