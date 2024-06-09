export const ProjectsListSkeleton = () => {
  return (
    <div
      data-testid="projects"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
    >
      <div>
        <div className="mb-6 aspect-video w-full border-collapse animate-pulse rounded-md bg-tertiary"></div>
        <div className="mb-4 h-[24px] max-w-[174px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-[24px] animate-pulse rounded-md bg-tertiary"></div>
      </div>
      <div>
        <div className="mb-6 aspect-video w-full border-collapse animate-pulse rounded-md bg-tertiary"></div>
        <div className="mb-4 h-[24px] max-w-[174px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-[24px] animate-pulse rounded-md bg-tertiary"></div>
      </div>
      <div>
        <div className="mb-6 aspect-video w-full border-collapse animate-pulse rounded-md bg-tertiary"></div>
        <div className="mb-4 h-[24px] max-w-[174px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-[24px] animate-pulse rounded-md bg-tertiary"></div>
      </div>
      <div>
        <div className="mb-6 aspect-video w-full border-collapse animate-pulse rounded-md bg-tertiary"></div>
        <div className="mb-4 h-[24px] max-w-[174px] animate-pulse rounded-md bg-tertiary"></div>
        <div className="h-[24px] animate-pulse rounded-md bg-tertiary"></div>
      </div>
    </div>
  );
};
