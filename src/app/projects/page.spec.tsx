import { render, screen } from "@testing-library/react";

import { projects } from "@/@data/projects";

import ProjectsPage from "./page";
import { strings } from "./strings";

const defaultPlaceQuantityWithoutProjects = 4;
const defaultPlaceholderQuantity = 3;
const placeholdersToBeRendered =
  projects.length > 0
    ? Math.round(defaultPlaceholderQuantity / projects.length)
    : defaultPlaceQuantityWithoutProjects;

describe("Projects Page Component", () => {
  beforeEach(() => {
    render(<ProjectsPage />);
  });

  it("Should be able to render the Projects Page Component", async () => {
    const titleElement = await screen.findByTestId("page-header");
    expect(titleElement).toBeInTheDocument();
  });

  it("Should be able to render the selected title element", async () => {
    const selectedTitleElement = await screen.findByRole("heading", {
      name: strings.selected,
      level: 2,
    });
    expect(selectedTitleElement).toBeInTheDocument();
  });

  it("Should be able to render the projects cards", () => {
    const projectsCards = screen.queryAllByTestId("card");
    expect(projectsCards).toHaveLength(projects.length);
  });

  it("Should be able to render the correct quantity of card placeholders", async () => {
    const cardPlaceholders = await screen.findAllByTestId("card-placeholder");
    expect(cardPlaceholders).toHaveLength(placeholdersToBeRendered);
  });
});
