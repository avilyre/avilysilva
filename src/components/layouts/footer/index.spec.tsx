import { render, screen, within } from "@testing-library/react";

import { Footer } from ".";
import { strings } from "./strings";

describe("Footer Component", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("Should be able to render the footer", async () => {
    const footerComponent = await screen.findByTestId("footer");
    expect(footerComponent).toBeInTheDocument();
  });

  it("Should be able to render the LinkedIn link element", async () => {
    const footerElement = await screen.findByTestId("footer");
    const linkedInLinkElement = await within(footerElement).findByRole("link", {
      name: strings.linkedIn.title,
    });

    expect(linkedInLinkElement).toBeInTheDocument();
    expect(linkedInLinkElement).toHaveAttribute("href", strings.linkedIn.href);
    expect(linkedInLinkElement).toHaveAttribute("target", "_blank");
  });

  it("Should be able to render the Email link element", async () => {
    const footerElement = await screen.findByTestId("footer");

    const emailLinkElement = await within(footerElement).findByRole("link", {
      name: strings.email.title,
    });

    expect(emailLinkElement).toBeInTheDocument();
    expect(emailLinkElement).toHaveAttribute("href", strings.email.href);
    expect(emailLinkElement).toHaveAttribute("target", "_blank");
  });

  it("Should be able to render the Github link element", async () => {
    const footerElement = await screen.findByTestId("footer");

    const githubLinkElement = await within(footerElement).findByRole("link", {
      name: strings.github.title,
    });

    expect(githubLinkElement).toBeInTheDocument();
    expect(githubLinkElement).toHaveAttribute("href", strings.github.href);
    expect(githubLinkElement).toHaveAttribute("target", "_blank");
  });
});
