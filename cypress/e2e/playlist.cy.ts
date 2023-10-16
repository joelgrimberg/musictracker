describe('Playlist', () => {
  beforeEach(() => {
    cy.intercept('/api/playlists', cy.spy().as('getPlaylistReq')).as(
      'getPlaylists'
    )
    cy.visit('/')
  })

  it('should show an empty list of playlist', () => {
    // sometimes the request is called twice. This is a workaround
    cy.get('@getPlaylistReq').should('have.been.calledOn')
  })

  it.only('should be able to create a playlist', () => {
    cy.findByRole('menubar').within(() => {
      cy.findByRole('menuitem', { name: /file/i }).click()
    })

    cy.findByRole('menu', { name: /file/i }).within(() => {
      cy.findByRole('menuitem', { name: /new/i }).click()
    })
    cy.findByRole('menu', { name: /new/i }).within(() => {
      cy.findByRole('menuitem', { name: /playlist ⌘N/i }).click()
    })

    cy.findByRole('dialog').within(() => {
      cy.findByRole('textbox', { name: /playlist name/i }).type(
        'My Epic Playlist'
      )
      cy.findByRole('button', { name: /create playlist/i }).click()
    })
  })

  it('should be able to view a list of playlists')

  it('should be able to remove a playlist')
  it('should be able to add a song to a playlist')
  it('should be able to remove a song from a playlist')
  it('should be able to rename a playlist')
  it('should be able to reorder songs in a playlist')
  it('should be able to reorder playlists')
})
