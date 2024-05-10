import { SkillCard } from "@/components/skill-card";

import { strings } from "./strings";

export const SoftSkillsSection = () => {
  return (
    <section className="flex-1">
      <h2 className="mb-8 select-none text-2xl font-semibold leading-tight text-primary">
        {strings.title}
      </h2>

      <div className="flex flex-col gap-10">
        {strings.skills.map(skill => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  );
};
