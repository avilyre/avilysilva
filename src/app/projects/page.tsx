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

      <h2 className="select-none text-2xl font-semibold text-primary">
        {strings.selected}
      </h2>
    </main>
  );
};

export default Projects;
