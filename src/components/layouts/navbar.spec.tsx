import { render, screen } from "@testing-library/react";

import { Navbar } from "./navbar";

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
      name: "a",
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/");
  });

  it("Should be able to render the About // Career page link element", async () => {
    const homeLinkElement = await screen.findByRole("link", {
      name: "sobre // carreira",
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/about");
  });

  it("Should be able to render the Projects link element", async () => {
    const homeLinkElement = await screen.findByRole("link", {
      name: "projetos",
    });
    expect(homeLinkElement).toBeInTheDocument();
    expect(homeLinkElement).toHaveAttribute("href", "/projects");
  });
});
