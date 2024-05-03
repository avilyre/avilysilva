import { render, screen } from "@testing-library/react";

import { Heading } from ".";

describe("Heading Component", () => {
  it("Should be able to render the Heading component", async () => {
    render(<Heading title="Custom Heading" variant="h1" />);
    const headingComponent = await screen.findByTestId("heading");
    expect(headingComponent).toBeInTheDocument();
  });

  it("Should be able to render with level 1 variant", async () => {
    render(<Heading title="Custom Heading" variant="h1" />);
    const headingComponent = await screen.findByRole("heading", {
      name: "Custom Heading",
      level: 1,
    });
    expect(headingComponent).toBeInTheDocument();
    expect(headingComponent).toHaveClass("text-5xl");
  });

  it("Should be able to render with level 2 variant", async () => {
    render(<Heading title="Custom Heading" variant="h2" />);
    const headingComponent = await screen.findByRole("heading", {
      name: "Custom Heading",
      level: 2,
    });
    expect(headingComponent).toBeInTheDocument();
    expect(headingComponent).toHaveClass("text-[2rem]");
  });

  it("Should be able to render with level 3 variant", async () => {
    render(<Heading title="Custom Heading" variant="h3" />);
    const headingComponent = await screen.findByRole("heading", {
      name: "Custom Heading",
      level: 3,
    });
    expect(headingComponent).toBeInTheDocument();
    expect(headingComponent).toHaveClass("text-2xl");
  });

  it("Should be able to render the with primary text color", async () => {
    render(<Heading title="Custom Heading" variant="h1" />);
    const headingComponent = await screen.findByTestId("heading");
    expect(headingComponent).toBeInTheDocument();
    expect(headingComponent).toHaveClass("text-primary");
  });

  it("Should be able to render the with secondary text color without primary text color", async () => {
    render(
      <Heading
        title="Custom Heading"
        variant="h1"
        className="text-secondary"
      />,
    );
    const headingComponent = await screen.findByTestId("heading");
    expect(headingComponent).toBeInTheDocument();
    expect(headingComponent).toHaveClass("text-secondary");
    expect(headingComponent).not.toHaveClass("text-primary");
  });
});
