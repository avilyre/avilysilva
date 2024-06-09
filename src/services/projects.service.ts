import { prismicClient } from "@/app/api/prismic-client";

export const getAllProjects = async () => {
  const projectsGraphQuery = `
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

  const projects = await prismicClient.getAllByType("project", {
    graphQuery: projectsGraphQuery,
  });
  return projects;
};

export const getProject = async (slug: string) => {
  const project = await prismicClient.getByUID("project", slug);
  return project;
};
