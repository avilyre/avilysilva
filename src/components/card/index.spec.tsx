import { render, screen } from "@testing-library/react";

import { Project } from "@/@types/project";

import { Card } from ".";
import { projectsMock } from "./mock";

const projectMock = projectsMock.shift() as Project;

describe("Card Component", () => {
  beforeEach(() => {
    render(
      <Card
        title={projectMock.title}
        description={projectMock.description}
        image={projectMock.image}
        slug={projectMock.slug}
        typeURL="project"
      />,
    );
  });

  it("Should be able to render the Card component with props", async () => {
    const cardComponent = await screen.findByRole("article");
    expect(cardComponent).toBeInTheDocument();
    expect(cardComponent).toHaveAttribute("data-testid", "card");
  });

  it("Should be able to render the image element", async () => {
    const imageElement = await screen.findByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", projectMock.image.alt);
  });

  it("Should be able to render the title element", async () => {
    const titleElement = await screen.findByRole("heading", {
      name: projectMock.title,
      level: 3,
    });

    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the description element", async () => {
    const descriptionElement = await screen.findByRole("paragraph");
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(projectMock.description);
  });

  it("Should be able to render the link element", async () => {
    const linkElement = await screen.findByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      "href",
      `/projects/${projectMock.slug}`,
    );
  });
});
