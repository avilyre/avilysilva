import { render, screen } from "@testing-library/react";

import { Card } from ".";
import { cardMock } from "./mock";

describe("Card Component", () => {
  beforeEach(() => {
    render(<Card {...cardMock} />);
  });

  it("Should be able to render the Card component with props", async () => {
    const cardComponent = await screen.findByRole("article");
    expect(cardComponent).toBeInTheDocument();
    expect(cardComponent).toHaveAttribute("data-testid", "card");
  });

  it("Should be able to render the image element", async () => {
    const imageElement = await screen.findByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", cardMock.image.alt);
  });

  it("Should be able to render the title element", async () => {
    const titleElement = await screen.findByRole("heading", {
      name: cardMock.title,
      level: 3,
    });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveRole("heading");
  });

  it("Should be able to render the description element", async () => {
    const descriptionElement = await screen.findByRole("paragraph");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(cardMock.description);
  });

  it("Should be able to render the link element", async () => {
    const linkElement = await screen.findByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", `/projects/${cardMock.slug}`);
  });

  it("Should be able to render the tags element", async () => {
    const tagsElement = await screen.findAllByTestId("tag");
    expect(tagsElement).toHaveLength(cardMock.tags.length);
  });

  it("Should be able to render the tags element with the correct text", async () => {
    cardMock.tags.forEach((tag, index) => {
      const tagElement = screen.getAllByTestId("tag")[index];
      expect(tagElement).toHaveTextContent(tag.text);
    });
  });
});
