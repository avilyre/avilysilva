import { PageHeader } from "@/components/page-header";

import { BioSection } from "./sections/bio-section";
import { CareerSection } from "./sections/career-section";
import { SoftSkillsSection } from "./sections/soft-skills-section";
import { strings } from "./strings";

const About = () => {
  return (
    <main>
      <PageHeader title={strings.title} description={strings.description} />

      <BioSection />

      <div className="mt-16 flex flex-col justify-between gap-16 sm:flex-row sm:gap-8">
        <CareerSection />
        <div className="max-w-[384px]">
          <SoftSkillsSection />
        </div>
      </div>
    </main>
  );
};

export default About;
