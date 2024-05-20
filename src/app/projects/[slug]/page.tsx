import { Figma, Github, Globe } from "lucide-react";

import { projects } from "@/@data/projects";
import { PageHeader } from "@/components/page-header";

import { ProjectDetails } from "./interface";
import { strings } from "./strings";

const ProjectDetails = (props: Readonly<ProjectDetails>) => {
  const {
    params: { slug },
  } = props;

  const project = projects.filter(project => project.slug === slug).shift();

  if (!project) return;

  return (
    <main>
      <header>
        <div className="mb-8 aspect-video w-full rounded-md bg-tertiary sm:aspect-[16/5.68]"></div>
        <div className="flex flex-col gap-8 sm:flex-row">
          <section className="max-w-[488px] flex-1">
            <PageHeader
              title={project.title}
              description={project.description}
            />

            <div className="flex items-center gap-8">
              <a
                href={project.links?.figma}
                target="_blank"
                title={strings.figma}
                className="inline-block rounded-md bg-tertiary p-3 text-secondary transition-colors hover:text-primary"
              >
                <Figma />
              </a>
              <a
                href={project.links?.deploy}
                target="_blank"
                title={strings.deploy}
                className="inline-block rounded-md bg-tertiary p-3 text-secondary transition-colors hover:text-primary"
              >
                <Globe />
              </a>
              <a
                href={project.links?.github}
                target="_blank"
                title={strings.github}
                className="inline-block rounded-md bg-tertiary p-3 text-secondary transition-colors hover:text-primary"
              >
                <Github />
              </a>
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <h5 className="select-none">
              <span className="block text-sm text-secondary">
                {strings.myRole}
              </span>
              <span className="text-base leading-tight text-primary">
                {project.details.role}
              </span>
            </h5>
            <h5 className="select-none">
              <span className="block text-sm text-secondary">
                {strings.developmentTime}
              </span>
              <span className="text-base leading-tight text-primary">
                {project.details.developmentTime}
              </span>
            </h5>
            <h5 className="select-none">
              <span className="block text-sm text-secondary">
                {strings.projectType}
              </span>
              <span className="text-base leading-tight text-primary">
                {project.details.type}
              </span>
            </h5>
          </section>
        </div>
      </header>

      <section className="mt-16 sm:mt-24">
        <header className="select-none">
          <h2 className="mb-11 select-none text-[2rem] font-semibold leading-tight text-primary">
            {strings.general}
          </h2>
        </header>

        <section>
          <header className="select-none">
            <h3 className="mb-6 select-none text-2xl font-semibold leading-tight text-primary">
              {strings.motivation}
            </h3>
          </header>

          <p className="select-none text-balance leading-relaxed text-secondary">
            {project.motivation}
          </p>
        </section>
      </section>
    </main>
  );
};

export default ProjectDetails;
