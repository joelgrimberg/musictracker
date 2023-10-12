declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.getDataTestId('greeting')
     */
    getDataTestId(value: string): Chainable<Element>
  }
}
