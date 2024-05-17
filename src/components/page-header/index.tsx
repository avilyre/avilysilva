import { PageHeaderProps } from "./interface";

export const PageHeader = (props: PageHeaderProps) => {
  const { title, description, hasMarginTop = false } = props;

  if (!title || !description) return null;

  const marginTop = hasMarginTop ? "mt-8" : "";

  return (
    <header data-testid="page-header" className={`mb-16 ${marginTop}`}>
      <h1 className="select-none text-balance text-4xl font-semibold leading-tight text-primary lg:text-5xl">
        {title}
      </h1>
      <h2 className="mt-3 max-w-[384px] select-none text-balance text-base leading-relaxed text-secondary">
        {description}
      </h2>
    </header>
  );
};
