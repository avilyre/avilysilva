import { render, screen, within } from "@testing-library/react";

import About from "./page";
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
        name: strings.bio.image.alt,
      });
      expect(bioImageElement).toBeInTheDocument();
      expect(bioImageElement).toHaveAttribute("alt", strings.bio.image.alt);
    });

    it("Should be able to render the title element", async () => {
      const bioSection = await screen.findByTestId("bio-section");
      const headingElement = await within(bioSection).findByRole("heading", {
        name: strings.bio.title,
      });
      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toHaveTextContent(strings.bio.title);
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
