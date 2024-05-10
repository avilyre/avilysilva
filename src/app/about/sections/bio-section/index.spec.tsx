import { render, screen, within } from "@testing-library/react";

import { BioSection } from ".";
import { strings } from "./strings";

const bioAAmountParagraphs = 3;
const bioAmountLinks = 3;

describe("Bio Section", () => {
  beforeEach(() => {
    render(<BioSection />);
  });
  it("Should be able to render the image element", async () => {
    const bioSection = await screen.findByTestId("bio-section");
    const bioImageElement = await within(bioSection).findByRole("img", {
      name: strings.image.alt,
    });
    expect(bioImageElement).toBeInTheDocument();
    expect(bioImageElement).toHaveAttribute("alt", strings.image.alt);
  });

  it("Should be able to render the title element", async () => {
    const bioSection = await screen.findByTestId("bio-section");
    const headingElement = await within(bioSection).findByRole("heading", {
      name: strings.title,
    });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(strings.title);
  });

  it("Should be able to render the paragraph elements", async () => {
    const bioSection = await screen.findByTestId("bio-section");
    const paragraphElements =
      await within(bioSection).findAllByRole("paragraph");
    expect(paragraphElements).toHaveLength(bioAAmountParagraphs);
  });

  it("Should be able to render the link elements", async () => {
    const bioSection = await screen.findByTestId("bio-section");
    const linkElements = await within(bioSection).findAllByRole("link");
    expect(linkElements).toHaveLength(bioAmountLinks);
  });
});
