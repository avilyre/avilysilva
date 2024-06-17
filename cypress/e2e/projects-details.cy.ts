describe("Project Details Page", () => {
  it("should be able to render the page", () => {
    cy.visit("http://localhost:3000/projects");
    const projectCard = cy.get("[data-testid='card']").should("exist");
    projectCard.click();

    const projectDetailsMainElement = cy.get("[data-testid='project-details']");
    projectDetailsMainElement.should("exist");

    cy.fixture("project-details.json").then(({ strings }) => {
      const generalTitleSectionElement = cy.get("header h2");
      generalTitleSectionElement.should("exist");
      generalTitleSectionElement.contains(strings.general);
    });
  });
});
