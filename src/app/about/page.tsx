import { PageHeader } from "@/components/page-header";
import { fromArrayToText } from "@/utility/from-array-to-text";
import { generateSEO } from "@/utility/generate-seo";

import { BioSection } from "./sections/bio-section";
import { strings as bioStrings } from "./sections/bio-section/strings";
import { CareerSection } from "./sections/career-section";
import { SoftSkillsSection } from "./sections/soft-skills-section";
import { strings } from "./strings";

export const metadata = generateSEO({
  title: strings.title,
  description: fromArrayToText(bioStrings.content),
});

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
