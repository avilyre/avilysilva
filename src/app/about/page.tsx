import { PageHeader } from "@/components/page-header";

import { BioSection } from "./sections/bio-section";
import { CareerSection } from "./sections/career-section";
import { strings } from "./strings";

const About = () => {
  return (
    <main>
      <PageHeader title={strings.title} description={strings.description} />

      <BioSection />

      <div className="mt-16">
        <CareerSection />
      </div>
    </main>
  );
};

export default About;
