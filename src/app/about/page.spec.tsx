import { render, screen, within } from "@testing-library/react";

import { About } from "./page";
import { strings } from "./strings";

const bioAAmountParagraphs = 3;
const bioAmountLinks = 3;

describe("About Page Component", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("Should be able to render the About Page Component", async () => {
    const aboutPage = await screen.findByText(strings.title);
    expect(aboutPage).toBeInTheDocument();
  });

  describe("Bio Section", () => {
    it("Should be able to render the image element", async () => {
      const bioSection = await screen.findByTestId("bio-section");

      const bioImageElement = await within(bioSection).findByRole("img", {
        name: strings.bioAlt,
      });
      expect(bioImageElement).toBeInTheDocument();
      expect(bioImageElement).toHaveAttribute("alt", strings.bioAlt);
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
});
