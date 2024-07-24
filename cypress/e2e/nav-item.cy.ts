describe("Nav Item Component", () => {
  it("Should be able to render the NavItem component", () => {
    cy.visit("http://localhost:3000/about");
    const navItemElement = cy.get("[href='/about']");
    navItemElement.should("exist");
  });

  it("Should be able to render the NavItem component with active indication", () => {
    cy.visit("http://localhost:3000/about");
    const navItemElement = cy.get("[href='/about']");

    navItemElement.should("have.attr", "aria-current", "page");
  });
});
