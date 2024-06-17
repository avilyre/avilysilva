describe("Projects Page", () => {
  it("should be able to render the page", () => {
    cy.visit("http://localhost:3000/projects");

    cy.fixture("projects.json").then(({ strings }) => {
      const projectsTitleElement = cy.get("h1");
      projectsTitleElement.should("exist");
      projectsTitleElement.contains(strings.knowMyProjects);
    });
  });

  it("should be able to render the projects list", () => {
    cy.visit("http://localhost:3000/projects");

    const projectsCard = cy.get("[data-testid='card']").its("length");
    projectsCard.should("be.greaterThan", 0);
  });

  it("should be able to render the projects placeholder", () => {
    cy.visit("http://localhost:3000/projects");

    const projectsPlaceholderCard = cy
      .get("[data-testid='card-placeholder']")
      .its("length");
    projectsPlaceholderCard.should("be.greaterThan", 0);
  });
});
