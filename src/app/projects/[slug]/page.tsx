import {
  ArrowRight,
  BadgeInfo,
  Figma,
  Github,
  Globe,
  MessageSquareText,
} from "lucide-react";
import Image from "next/image";
import * as uuid from "uuid";

import { PageHeader } from "@/components/page-header";
import { getDynamicPlaceholder } from "@/services/get-dynamic-placeholder.service";
import { getFeaturedProjects, getProject } from "@/services/projects.service";
import { generateSEO } from "@/utility/generate-seo";

import { Gallery } from "./components/gallery";
import type { ProjectDetails } from "./interface";
import { strings } from "./strings";

export const generateMetadata = async (props: Readonly<ProjectDetails>) => {
  const {
    params: { slug },
  } = props;

  const { data: project } = await getProject(slug);

  return generateSEO({
    title: project.title,
    description: project.description,
  });
};

export const generateStaticParams = async () => {
  const projects = await getFeaturedProjects();

  const staticProjectsPage = projects.map(({ data: project }) => ({
    slug: project.slug,
  }));

  return staticProjectsPage;
};

const ProjectDetails = async (props: Readonly<ProjectDetails>) => {
  const {
    params: { slug },
  } = props;

  const defaultThumbnailSize = {
    height: 285,
    width: 800,
  };

  const { data: project } = await getProject(slug);

  const { base64: imagePlaceholder } = await getDynamicPlaceholder(
    project.image.url as string,
  );

  const developmentProcess = project.process.map(({ phase }, phaseIndex) => {
    const steps: string[] = phase?.split(", ") || [];

    return {
      id: uuid.v4(),
      name: strings.phaseName[phaseIndex],
      steps,
    };
  });

  const galleryImages = project.images.map(({ content: image }) => ({
    id: uuid.v4(),
    src: image.url as string,
    alt: image.alt as string,
  }));

  return (
    <main>
      <header>
        <Image
          src={project.image.url as string}
          className="mb-8 aspect-video w-full select-none rounded-md bg-tertiary object-cover sm:aspect-[16/5.68]"
          alt={project.title as string}
          height={defaultThumbnailSize.height}
          width={defaultThumbnailSize.width}
          placeholder="blur"
          blurDataURL={imagePlaceholder}
          quality={100}
          priority
        />

        <div className="flex flex-col gap-8 sm:flex-row">
          <section className="max-w-[488px] flex-1">
            <PageHeader
              title={project.title as string}
              description={project.description as string}
            />

            <div className="flex items-center gap-8">
              <a
                href={project.figmaurl as string}
                target="_blank"
                title={strings.figma}
                className="inline-block rounded-md bg-tertiary p-3 text-secondary transition-colors hover:text-primary"
              >
                <Figma />
              </a>
              <a
                href={project.deployurl as string}
                target="_blank"
                title={strings.deploy}
                className="inline-block rounded-md bg-tertiary p-3 text-secondary transition-colors hover:text-primary"
              >
                <Globe />
              </a>
              <a
                href={project.githuburl as string}
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
                {project.role as string}
              </span>
            </h5>
            <h5 className="select-none">
              <span className="block text-sm text-secondary">
                {strings.developmentTime}
              </span>
              <span className="text-base leading-tight text-primary">
                {project.development_time as string}
              </span>
            </h5>
            <h5 className="select-none">
              <span className="block text-sm text-secondary">
                {strings.projectType}
              </span>
              <span className="text-base leading-tight text-primary">
                {project.type as string}
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
                {highlight.name}
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
              <span className="after:content invisible absolute bottom-1/2 right-[calc(100%_+_12px)] w-[180px] translate-y-1/2 rounded-md bg-tertiary px-3 py-2 text-center text-xs text-secondary opacity-0 transition-opacity after:absolute after:bottom-1/2 after:left-[calc(100%_+_5px)] after:-translate-x-1/2 after:translate-y-1/2 after:border-[6px] after:border-[transparent_transparent_transparent_#1E293B] group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 md:bottom-auto md:left-1/2 md:top-[calc(100%_+_12px)] md:-translate-x-1/2 md:translate-y-0 md:after:bottom-full md:after:left-1/2 md:after:translate-y-0 md:after:border-[transparent_transparent_#1E293B_transparent]">
                {strings.wasNotIncludedMinorLibraries}
              </span>
            </div>
          </header>

          <ul className="select-none list-disc ps-5">
            {project.technologies.map((technologie, index) => {
              if (!technologie.name) return null;

              const [name, type] = technologie.name.split(" - ");

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

        {developmentProcess.map(phase => {
          return (
            <div key={phase.id} className="mb-6 select-none">
              <h4 className="mb-4 text-base text-secondary">{phase.name}</h4>

              <div className="no-scrollbar relative flex items-center overflow-auto">
                {phase.steps.map((step, stepIndex) => {
                  const isNextArrowAvailable =
                    stepIndex < phase.steps.length - 1;

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
          );
        })}
      </section>

      <section className="mt-16">
        <header className="mb-6 flex select-none items-center">
          <h3 className="text-2xl font-semibold leading-tight text-primary">
            {strings.images}
          </h3>
        </header>

        <Gallery images={galleryImages} />
      </section>

      <section className="mt-24">
        <header className="mb-6 flex select-none items-center">
          <h3 className="text-2xl font-semibold leading-tight text-primary">
            {strings.didYouLikeThisProject}
          </h3>
        </header>
        <div className="flex gap-4">
          <MessageSquareText
            strokeWidth={1}
            className="h-[40px] w-[40px] select-none font-light text-primary sm:h-[62px] sm:w-[62px]"
          />
          <p className="max-w-[264px] select-none text-balance leading-relaxed text-primary">
            {strings.letsTalk.firstPart}{" "}
            <a
              href="#footer"
              className="underline transition-colors hover:text-secondary"
            >
              {strings.letsTalk.talk}
            </a>{" "}
            {strings.letsTalk.lastPart}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetails;
