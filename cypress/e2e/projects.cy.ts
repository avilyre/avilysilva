describe("Projects Page", () => {
  it("should be able to render the page", () => {
    cy.visit("http://localhost:3000/projects");

    cy.fixture("projects.json").then(({ strings }) => {
      const projectsTitleElement = cy.get("h1");
      projectsTitleElement.should("exist");
      projectsTitleElement.contains(strings.knowMyProjects);
    });
  });

  it("should be able to render the projects list if it has projects", () => {
    cy.visit("http://localhost:3000/projects");

    cy.get("body").then(body => {
      if (body.find("[data-testid='card']").length > 0) {
        const projectCards = cy.get("[data-testid='card']");
        projectCards.should("exist");
        projectCards.should("have.length.greaterThan", 0);
      } else {
        const projectCardsPlaceholder = cy.get(
          "[data-testid='card-placeholder']",
        );
        projectCardsPlaceholder.should("have.length", 4);
      }
    });
  });

  it("should be able to render the projects placeholder", () => {
    cy.visit("http://localhost:3000/projects");

    const projectsPlaceholderCard = cy
      .get("[data-testid='card-placeholder']")
      .its("length");
    projectsPlaceholderCard.should("be.greaterThan", 0);
  });
});
