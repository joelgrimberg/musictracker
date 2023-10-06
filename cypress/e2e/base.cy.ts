describe('Base', () => {
  it('loads the MusicTracker ', () => {
    cy.visit('/')
    cy.contains('MusicTracker')
    cy.get('img[alt="Async Awakenings"]').should('be.visible')
  })
})
