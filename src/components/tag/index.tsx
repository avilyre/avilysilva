import { TagProps } from "./interface";

export const Tag = (props: TagProps) => {
  const { text, variant } = props;

  if (!text || !variant) return null;

  const variantClass: Record<TagProps["variant"], string> = {
    ocean: "text-ocean border-ocean bg-ocean/40",
    secondary: "text-secondary border-secondary bg-secondary/40",
  };

  return (
    <span
      data-testid="tag"
      className={`flex max-w-fit items-center justify-center rounded-full border px-4 py-1 text-xs font-normal ${variantClass[variant]}`}
    >
      {text}
    </span>
  );
};
