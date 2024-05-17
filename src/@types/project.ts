export interface Project {
  id: string | number;
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  slug: string;
  details: {
    role: string;
    developmentTime: string;
    type: string;
  };
  links?: {
    github: string;
    figma: string;
    deploy: string;
  };
  motivation: string;
  highlights: string[];
  technologies: string[];
  process: {
    id: string | number;
    title: string;
    steps: string[];
  }[];
  images: string[];
}
