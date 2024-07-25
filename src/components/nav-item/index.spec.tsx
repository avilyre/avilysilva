import { render } from "@testing-library/react";

import { NavItem } from ".";

describe("NavItem Component", () => {
  it("Should be able to render the NavItem component", async () => {
    const screen = render(<NavItem href="/about">about</NavItem>);
    const navItem = await screen.findByRole("link");
    expect(navItem)
      .toHaveAttribute("href", "/about")
      .toHaveTextContent("about");
  });
});
