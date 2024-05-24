import { ArrowRight, BadgeInfo, Figma, Github, Globe } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

import { projects } from "@/@data/projects";
import { PageHeader } from "@/components/page-header";

import { Gallery } from "./components/gallery";
import { ProjectDetails } from "./interface";
import { strings } from "./strings";

const ProjectDetails = (props: Readonly<ProjectDetails>) => {
  const {
    params: { slug },
  } = props;

  const defaultThumbnailSize = {
    height: 285,
    width: 800,
  };

  const project = projects.filter(project => project.slug === slug).shift();

  if (!project) return;

  return (
    <main>
      <header>
        <Image
          src={project.image.src}
          className="mb-8 aspect-video w-full select-none rounded-md bg-tertiary object-cover sm:aspect-[16/5.68]"
          alt={project.title}
          height={defaultThumbnailSize.height}
          width={defaultThumbnailSize.width}
          quality={100}
          priority
        />

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

      <section className="mt-16 flex flex-col gap-8 sm:flex-row">
        <section className="flex-1">
          <header className="select-none">
            <h3 className="mb-6 select-none text-2xl font-semibold leading-tight text-primary">
              {strings.highlights}
            </h3>
          </header>

          <ul className="select-none list-disc ps-5">
            {project.highlights.map((highlight, index) => (
              <li key={index} className="leading-relaxed text-primary">
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex-1">
          <header className="mb-6 flex select-none items-center">
            <h3 className="text-2xl font-semibold leading-tight text-primary">
              {strings.technologies}
            </h3>

            <div className="group relative ms-2 inline-block" tabIndex={0}>
              <BadgeInfo className="inline-block text-blue-500" />
              <span className="after:content invisible absolute left-1/2 top-[calc(100%_+_12px)] w-[180px] -translate-x-1/2 rounded-md bg-tertiary px-3 py-2 text-center text-xs text-secondary opacity-0 transition-opacity after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-[transparent_transparent_#1E293B_transparent] group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100">
                {strings.wasNotIncludedMinorLibraries}
              </span>
            </div>
          </header>

          <ul className="select-none list-disc ps-5">
            {project.technologies.map((technologie, index) => {
              const [name, type] = technologie.split(" - ");

              return (
                <li key={index} className="leading-relaxed text-primary">
                  {name} <span className="text-secondary">- {type}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </section>

      <section className="mt-16">
        <header className="mb-6 flex select-none items-center">
          <h3 className="text-2xl font-semibold leading-tight text-primary">
            {strings.developmentProcess}
          </h3>
        </header>

        {project.process.map(phase => (
          <div key={phase.id} className="mb-6 select-none">
            <h4 className="mb-4 text-base text-secondary">{phase.title}</h4>

            <div className="no-scrollbar relative flex items-center overflow-auto">
              {phase.steps.map((step, stepIndex) => {
                const isNextArrowAvailable = stepIndex < phase.steps.length - 1;

                return (
                  <div key={stepIndex} className="flex items-center">
                    <span className="inline-block text-nowrap rounded-md bg-tertiary px-8 py-[10px] text-base text-primary">
                      {step}
                    </span>
                    {isNextArrowAvailable && (
                      <ArrowRight className="mx-3 text-2xl text-secondary" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <header className="mb-6 flex select-none items-center">
          <h3 className="text-2xl font-semibold leading-tight text-primary">
            {strings.images}
          </h3>
        </header>

        <Suspense fallback={"loading"}>
          <Gallery images={project.images} />
        </Suspense>
      </section>
    </main>
  );
};

export default ProjectDetails;
