import { render, screen } from "@testing-library/react";

import Home from "./page";
import { strings } from "./strings";

describe("Home Page Component", () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe("Heading Components", async () => {
    it("should be able to render the title element", async () => {
      const title = await screen.findByRole("heading", {
        name: strings.title,
        level: 1,
      });

      expect(title).toBeInTheDocument();
    });

    it("Should be able to render the description element", async () => {
      const description = await screen.findByRole("heading", {
        name: strings.description,
        level: 2,
      });

      expect(description).toBeInTheDocument();
    });
  });
});
