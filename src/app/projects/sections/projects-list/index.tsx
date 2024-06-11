import { Card } from "@/components/card";
import { CardPlaceholder } from "@/components/card-placeholder";
import { getDynamicPlaceholder } from "@/services/get-dynamic-placeholder.service";
import { getAllProjects } from "@/services/projects.service";

export const ProjectsList = async () => {
  const projects = await getAllProjects();

  const defaultPlaceQuantityWithoutProjects = 4;
  const defaultPlaceholderQuantity = 3;
  const placeholdersToBeRendered =
    projects.length > 0
      ? Math.round(defaultPlaceholderQuantity / projects.length)
      : defaultPlaceQuantityWithoutProjects;

  return (
    <div
      data-testid="projects"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      {projects.map(async ({ id, data: project }) => {
        const imagePlaceholder = await getDynamicPlaceholder(
          project.image.url as string,
        );

        return (
          <Card
            key={id}
            title={project.title as string}
            description={project.description as string}
            image={{
              src: project.image.url as string,
              alt: project.image.alt as string,
              placeholderBlur: imagePlaceholder.base64,
            }}
            slug={project.slug as string}
            typeURL="project"
          />
        );
      })}

      {[...Array(placeholdersToBeRendered)].map((_, index) => (
        <CardPlaceholder key={index} />
      ))}
    </div>
  );
};
