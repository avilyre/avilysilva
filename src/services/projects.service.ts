import { FetchError } from "@/@data/errors/fetch-error";
import { AllDocumentTypes } from "@/@types/prismicio-types";
import { prismicClient } from "@/app/api/prismic-client";
import { sentry, SentryCaptureException } from "@/utility/sentry";

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

  try {
    const projects = await prismicClient.getAllByType("project", {
      graphQuery: projectsGraphQuery,
    });

    return projects;
  } catch {
    throw SentryCaptureException(
      new FetchError("Failed to fetch all projects"),
    );
  }
};

export const getFeaturedProjects = async () => {
  return await sentry<AllDocumentTypes[]>({
    options: {
      name: "Project",
      op: "Fetch Featured Projects",
    },
    callback: async () => {
      try {
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
      } catch {
        throw SentryCaptureException(
          new FetchError("Failed to fetch all featured projects"),
        );
      }
    },
  });
};

export const getProject = async (slug: string) => {
  return await sentry<AllDocumentTypes>({
    options: {
      name: "Project",
      op: "Fetch Project Details",
    },
    callback: async () => {
      try {
        const project = await prismicClient.getByUID("project", slug);
        return project;
      } catch {
        throw SentryCaptureException(
          new FetchError("Failed to fetch project details"),
        );
      }
    },
  });
};
