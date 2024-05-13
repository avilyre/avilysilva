import { SkillCardProps } from "./interface";

export const SkillCard = (props: SkillCardProps) => {
  const { title, description } = props;

  return (
    <div data-testid="skill-card" className="flex flex-col gap-2">
      <h3 className="text-base font-medium text-primary">{title}</h3>
      <p className="text-balance text-base leading-relaxed text-secondary">
        {description}
      </p>
    </div>
  );
};
