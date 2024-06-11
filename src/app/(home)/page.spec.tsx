import { render, screen, within } from "@testing-library/react";

import Home from "./page";
import { strings } from "./strings";

describe("Home Page Component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe("Heading Components", async () => {
    it("should be able to render the title element", async () => {
      const title = screen.getByText(strings.title);
      const scribbleImage = await within(title).findByRole("img");

      expect(title).toBeInTheDocument();
      expect(scribbleImage).toHaveAttribute("alt", "scribble");
    });

    it("Should be able to render the role element", async () => {
      const description = await screen.findByRole("heading", {
        name: strings.role,
        level: 2,
      });
      expect(description).toBeInTheDocument();
    });

    it("Should be able to render the description element", async () => {
      const description = screen.getByText(strings.description);
      expect(description).toBeInTheDocument();
    });
  });
});
