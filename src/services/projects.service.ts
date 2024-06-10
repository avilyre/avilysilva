import { prismicClient } from "@/app/api/prismic-client";

export const getAllProjects = async (graphQuery?: string) => {
  const defaultGraphQuery = `
  {
    project {
      uid
      image
      title
      description
      slug
    }
  }
`;

  const projectsGraphQuery = graphQuery !== "" ? graphQuery : defaultGraphQuery;

  const projects = await prismicClient.getAllByType("project", {
    graphQuery: projectsGraphQuery,
  });
  return projects;
};

export const getFeaturedProjects = async () => {
  const projects = await prismicClient.getAllByType("project", {
    graphQuery: `
      {
        project {
          slug
          isfeatured
        }
      }
    `,
  });

  const featuredProjects = projects.filter(
    ({ data: project }) => project.isfeatured === true,
  );

  return featuredProjects;
};

export const getProject = async (slug: string) => {
  const project = await prismicClient.getByUID("project", slug);
  return project;
};
