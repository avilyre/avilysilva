import { render, screen, within } from "@testing-library/react";

import { CareerSection } from ".";
import { strings } from "./strings";

const careerCardAmount = 3;

describe("Bio Section", () => {
  beforeEach(() => {
    render(<CareerSection />);
  });
  it("Should be able to render the career section", async () => {
    const careerSection = await screen.findByTestId("career-section");
    expect(careerSection).toBeInTheDocument();
  });

  it("Should be able to render the title element", async () => {
    const careerSection = await screen.findByTestId("career-section");
    const headingElement = await within(careerSection).findByRole("heading", {
      name: strings.title,
    });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent(strings.title);
  });

  it("Should be able to render the CareerCard components", async () => {
    const careerSection = await screen.findByTestId("career-section");
    const careerCardElements =
      await within(careerSection).findAllByTestId("career-card");
    expect(careerCardElements).toHaveLength(careerCardAmount);
  });
});
