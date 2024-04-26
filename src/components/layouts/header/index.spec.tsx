import { render, within } from "@testing-library/react";

import { Header } from ".";

const headerTitleMock = "header title mock";
const descriptionTitleMock = "some description mock";

describe("Header Component", () => {
  it("Should be able to render the Header without props", async () => {
    const screen = render(<Header />);
    const headerComponent = await screen.findByTestId("header");
    expect(headerComponent).toBeInTheDocument();
  });

  it("Should be able to render the Navbar component", async () => {
    const screen = render(<Header />);
    const headerComponent = await screen.findByTestId("header");
    const navbarComponent =
      await within(headerComponent).findByTestId("navbar");

    expect(navbarComponent).toBeInTheDocument();
  });

  it("Should be able to render the Title element", async () => {
    const screen = render(
      <Header
        page={{ title: headerTitleMock, description: descriptionTitleMock }}
      />,
    );
    const headerComponent = await screen.findByTestId("header");
    const titleElement = await within(headerComponent).findByRole("heading", {
      name: headerTitleMock,
      level: 1,
    });

    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the Description element", async () => {
    const screen = render(
      <Header
        page={{ title: headerTitleMock, description: descriptionTitleMock }}
      />,
    );
    const headerComponent = await screen.findByTestId("header");
    const descriptionElement = await within(headerComponent).findByRole(
      "heading",
      {
        name: descriptionTitleMock,
        level: 2,
      },
    );

    expect(descriptionElement).toBeInTheDocument();
  });
});
