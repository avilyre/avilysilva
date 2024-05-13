import { render, within } from "@testing-library/react";

import About from "./page";
import { strings } from "./strings";

describe("About Page Component", () => {
  it("Should be able to render the About Page Component", async () => {
    const aboutPage = render(<About />);
    const titleElement = await within(aboutPage.container).findByRole(
      "heading",
      {
        name: strings.title,
      },
    );
    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the bio section", async () => {
    const aboutPage = render(<About />);
    const bioSection = await within(aboutPage.container).findByTestId(
      "bio-section",
    );
    expect(bioSection).toBeInTheDocument();
  });

  it("Shoud be able to render the career section", async () => {
    const aboutPage = render(<About />);
    const careerSection = await within(aboutPage.container).findByTestId(
      "career-section",
    );
    expect(careerSection).toBeInTheDocument();
  });
});
