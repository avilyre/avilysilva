import { PageHeaderProps } from "./interface";

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description } = props;

  if (!title || !description) return null;

  return (
    <header data-testid="page-header" className="mb-8 mt-8 lg:mb-16">
      <h1 className="select-none text-balance text-4xl font-semibold leading-tight text-primary lg:text-5xl">
        {title}
      </h1>
      <h2 className="mt-3 max-w-[384px] select-none text-balance text-base leading-relaxed text-secondary">
        {description}
      </h2>
    </header>
  );
};
