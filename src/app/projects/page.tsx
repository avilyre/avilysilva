import { Card } from "@/components/card";
import { CardPlaceholder } from "@/components/card-placeholder";
import { PageHeader } from "@/components/page-header";
import { getDynamicPlaceholder } from "@/services/get-dynamic-placeholder.service";
import { getAllProjects } from "@/services/projects.service";
import { generateSEO } from "@/utility/generate-seo";

import { strings } from "./strings";

export const metadata = generateSEO({
  title: strings.title.seo,
  description: strings.description,
});

const Projects = async () => {
  const projects = await getAllProjects();

  const defaultPlaceQuantityWithoutProjects = 4;
  const defaultPlaceholderQuantity = 3;
  const placeholdersToBeRendered =
    projects.length > 0
      ? Math.round(defaultPlaceholderQuantity / projects.length)
      : defaultPlaceQuantityWithoutProjects;

  return (
    <main>
      <PageHeader
        title={strings.title.page}
        description={strings.description}
      />

      <section>
        <h2 className="mb-6 select-none text-2xl font-semibold text-primary">
          {strings.selected}
        </h2>

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
      </section>
    </main>
  );
};

export default Projects;
