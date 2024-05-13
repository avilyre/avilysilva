import Image from "next/image";

import { companies } from "@/@data/companies";

import {
  companiesLinkMapElements,
  highlightTexts,
  hightlightTextElement,
} from "./constants";
import { strings } from "./strings";

export const BioSection = () => {
  const bioDefaultImageSize = {
    width: 176,
    height: 229,
  };

  const replaceAllCompaniesTextToLink = (text: string): string => {
    let replacedText = text;

    companiesLinkMapElements.map(([companyName, companyLinkTextElement]) => {
      const company = companies.find(company => company.name === companyName);

      if (!company) return;

      replacedText = replacedText
        .replaceAll(companyName, companyLinkTextElement)
        .replaceAll("href='#'", `href='${company.url}'`)
        .replace("[company-name]", company.name);
    });

    return replacedText;
  };

  const replaceHighlightTexts = (text: string): string => {
    let highlightedText = text;

    highlightTexts.forEach(highlightText => {
      highlightedText = highlightedText
        .replaceAll(highlightText, hightlightTextElement)
        .replace("[highlight-text]", highlightText);
    });

    return highlightedText;
  };

  const buildParagraph = (paragraph: string): string => {
    return replaceAllCompaniesTextToLink(replaceHighlightTexts(paragraph));
  };
  return (
    <section
      data-testid="bio-section"
      className="flex flex-col items-start gap-8 sm:flex-row"
    >
      <Image
        className="h-[150px] w-[150px] select-none rounded-lg object-cover grayscale sm:h-[229px] sm:w-[176px]"
        src={strings.image.url}
        width={bioDefaultImageSize.width}
        height={bioDefaultImageSize.height}
        alt={strings.image.alt}
      />
      <div>
        <h3 className="mb-4 select-none text-2xl font-semibold leading-tight text-primary">
          {strings.title}
        </h3>
        <div className="flex flex-col gap-8">
          {strings.content.map(paragraph => (
            <p
              key={paragraph}
              className="text-balance text-base leading-relaxed text-secondary"
              dangerouslySetInnerHTML={{ __html: buildParagraph(paragraph) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
