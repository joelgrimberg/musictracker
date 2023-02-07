describe("example tests", () => {
  it("open the application", () => {
    cy.visit("/");
    cy.get("h1").contains(/tabtracker/i);
  });
});
