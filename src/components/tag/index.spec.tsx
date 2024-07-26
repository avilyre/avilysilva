import { render } from "@testing-library/react";
import { expect } from "vitest";

import { Tag } from ".";
import { TagProps } from "./interface";

describe("Tag Component", () => {
  it("Should be able to render the Tag Component with props", async () => {
    const tagProps: TagProps = {
      text: "text",
      variant: "ocean",
    };

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = await screen.findByTestId("tag");
    expect(tagComponent).toBeInTheDocument();
  });

  it("Should be able to render the Tag Component with ocean variant props", async () => {
    const tagProps: TagProps = {
      text: "text",
      variant: "ocean",
    };

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = await screen.findByTestId("tag");
    expect(tagComponent).toBeInTheDocument();
    expect(tagComponent).toHaveClass("text-ocean border-ocean bg-ocean/40");
    expect(tagComponent).toHaveTextContent("text");
  });

  it("Should be able to render the Tag Component with secondary variant props", async () => {
    const tagProps: TagProps = {
      text: "text",
      variant: "secondary",
    };

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = await screen.findByTestId("tag");
    expect(tagComponent).toBeInTheDocument();
    expect(tagComponent).toHaveClass(
      "text-secondary border-secondary bg-secondary/40",
    );
    expect(tagComponent).toHaveTextContent("text");
  });

  it("Should NOT be able to render the Tag Component without props ", () => {
    // @ts-expect-error that's necessary because this component is tested without some required properties
    const tagProps: TagProps = {};

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = screen.queryByTestId("tag");
    expect(tagComponent).not.toBeInTheDocument();
  });

  it("Should NOT be able to render the Tag Component with text props without variant", () => {
    // @ts-expect-error that's necessary because this component is tested without some required properties
    const tagProps: TagProps = {
      text: "text",
    };

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = screen.queryByTestId("tag");
    expect(tagComponent).not.toBeInTheDocument();
  });

  it("Should NOT be able to render the Tag Component with variant props without text", () => {
    // @ts-expect-error that's necessary because this component is tested without some required properties
    const tagProps: TagProps = {
      variant: "ocean",
    };

    const screen = render(<Tag {...tagProps} />);
    const tagComponent = screen.queryByTestId("tag");
    expect(tagComponent).not.toBeInTheDocument();
  });
});
