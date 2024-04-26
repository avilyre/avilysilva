import { render, screen } from "@testing-library/react";

import { Navbar } from ".";
import { strings } from "./strings";

describe("Navbar Component", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it("Should be able to render the navbar", async () => {
    const navbarComponent = await screen.findByTestId("navbar");
    expect(navbarComponent).toBeInTheDocument();
  });

  it("Should be able to render the Home page link element", async () => {
    const homeLinkElement = await screen.findByRole("link", {
      name: strings.logoLetter,
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/");
  });

  it("Should be able to render the About // Career page link element", async () => {
    const homeLinkElement = await screen.findByRole("link", {
      name: strings.about,
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/about");
  });

  it("Should be able to render the Projects link element", async () => {
    const homeLinkElement = await screen.findByRole("link", {
      name: strings.projects,
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/projects");
  });
});
