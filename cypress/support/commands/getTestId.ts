export const getDataTestId = (value: string) => {
  cy.get(`[data-testid=${value}]`)
}
