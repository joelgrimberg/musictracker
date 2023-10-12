describe('Sidebar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to see the Sidebar Topics', () => {
    cy.getDataTestId('sidebar-discover')
      .contains('Discover')
      .should('be.visible')

    cy.getDataTestId('sidebar-library').contains('Library').should('be.visible')

    cy.getDataTestId('sidebar-playlists')
      .contains('Playlists')
      .should('be.visible')
  })

  context('Discover', () => {
    it('should be able to navigate to the Listen Now page', () => {
      cy.getDataTestId('sidebar-discover')
        .parent()
        .contains('Listen Now')
        .should('be.visible')
      cy.getDataTestId('sidebar-link-listen-now')
        .should('be.visible')
        .should('have.attr', 'href', '/')
        .click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    })

    it('should be able to navigate to the Browse page', () => {
      cy.getDataTestId('sidebar-discover')
        .parent()
        .contains('Browse')
        .should('be.visible')
      cy.getDataTestId('sidebar-link-browse')
        .should('be.visible')
        .should('have.attr', 'href', '/browse')
        .click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/browse`)
    })

    it('should be able to navigate to the Radio page')
  })

  context('Playlists', () => {
    it('should be able to use the Playlist section', () => {
      cy.contains('Loading playlists...').should('be.visible')
      cy.contains('No playlists yet...').should('be.visible')
    })
  })

  context('Library', () => {
    it('should be able to navigate to the Playlists page', () => {
      cy.getDataTestId('sidebar-library')
        .parent()
        .contains('Playlists')
        .should('be.visible')
    })
  })
})
