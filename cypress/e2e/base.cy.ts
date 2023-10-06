describe('Base', () => {
  it('loads the MusicTracker ', () => {
    cy.visit('/')
    cy.contains('MusicTracker')
  })
})
