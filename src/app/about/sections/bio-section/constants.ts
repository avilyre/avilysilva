import { Companies } from "@/@types/company";

export const highlightTexts = ["2020", "fullstack", "design engineer"];

export const hightlightTextElement = `<span class='text-highlight'>[highlight-text]</span>`;

const commonLinkClass =
  "text-primary underline hover:text-secondary transition-colors";

export const companiesLinkMapElements = [
  [
    Companies.MERITUM,
    `<a href='#' target='_blank' class='${commonLinkClass}'>[company-name]</a>`,
  ],
  [
    Companies.META,
    `<a href='#' target='_blank' class='${commonLinkClass}'>[company-name]</a>`,
  ],
  [
    Companies.OLIST,
    `<a href='#' target='_blank' class='${commonLinkClass}'>[company-name]</a>`,
  ],
  [
    Companies.GAZETA_DO_POVO,
    `<a href='#' target='_blank' class='${commonLinkClass}'>[company-name]</a>`,
  ],
];
