import { projects } from "@/@data/projects";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { generateSEO } from "@/utility/generate-seo";

import { strings } from "./strings";

export const metadata = generateSEO({
  title: strings.title.seo,
  description: strings.description,
});

const Projects = () => {
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {projects.map(project => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              slug={project.slug}
              typeURL="project"
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Projects;
