import { render, within } from "@testing-library/react";

import { PageHeader } from ".";

const pageHeaderTitleMock = "something about me";
const pageHeaderDescriptionMock =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor";

describe("Page Header Component", () => {
  it("Should be able to render the Page Header component", async () => {
    const screen = render(
      <PageHeader
        title={pageHeaderTitleMock}
        description={pageHeaderDescriptionMock}
      />,
    );

    const pageHeaderComponent = await screen.findByTestId("page-header");
    expect(pageHeaderComponent).toBeInTheDocument();
  });

  it("Should NOT be able to render the Page Header component with empty properties", async () => {
    const screen = render(<PageHeader title="" description="" />);
    const pageHeaderComponent = screen.queryByTestId("page-header");
    expect(pageHeaderComponent).not.toBeInTheDocument();
  });

  it("Should be able to render the title element", async () => {
    const screen = render(
      <PageHeader
        title={pageHeaderTitleMock}
        description={pageHeaderDescriptionMock}
      />,
    );

    const titleElement = await within(screen.container).findByRole("heading", {
      name: pageHeaderTitleMock,
      level: 1,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the description element", async () => {
    const screen = render(
      <PageHeader
        title={pageHeaderTitleMock}
        description={pageHeaderDescriptionMock}
      />,
    );

    const descriptionElement = await within(screen.container).findByRole(
      "heading",
      {
        name: pageHeaderDescriptionMock,
        level: 2,
      },
    );
    expect(descriptionElement).toBeInTheDocument();
  });
});
