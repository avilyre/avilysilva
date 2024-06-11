import { render, screen } from "@testing-library/react";

import NotFound from "./not-found";
import { strings } from "./not-found.strings";

describe("Not Found Page Component", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("Shoud be able to render the not found page", async () => {
    const notFoundPage = await screen.findByText(strings.errorCode);
    expect(notFoundPage).toBeInTheDocument();
  });

  it("Should be able to render the error code element", async () => {
    const errorCodeElement = await screen.findByText(strings.errorCode);
    expect(errorCodeElement).toBeInTheDocument();
  });

  it("Should be able to render the error message element", async () => {
    const errorMessageElement = await screen.findByText(strings.errorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });

  it("Should be able to render the go back link element", async () => {
    const goBackLinkElement = await screen.findByRole("link", {
      name: strings.backToHome,
    });
    expect(goBackLinkElement).toBeInTheDocument();
  });
});
