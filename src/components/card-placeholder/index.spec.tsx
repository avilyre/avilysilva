import { render, screen } from "@testing-library/react";

import { CardPlaceholder } from ".";

describe("Card Placeholder Component", () => {
  it("Should be able to render the card placeholder component", async () => {
    render(<CardPlaceholder />);
    const cardPlaceholder = await screen.findByTestId("card-placeholder");
    expect(cardPlaceholder).toBeInTheDocument();
  });
});
