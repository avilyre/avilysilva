import { Suspense } from "react";

import { PageHeader } from "@/components/page-header";
import { generateSEO } from "@/utility/generate-seo";

import { ProjectsList } from "./sections/projects-list";
import { ProjectsListSkeleton } from "./sections/projects-list/skeleton";
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

        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList />
        </Suspense>
      </section>
    </main>
  );
};

export default Projects;
