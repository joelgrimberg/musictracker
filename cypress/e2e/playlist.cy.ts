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

  it('should be able to view a list of playlists')

  it('should be able to add a playlist')
  it('should be able to remove a playlist')
  it('should be able to add a song to a playlist')
  it('should be able to remove a song from a playlist')
  it('should be able to rename a playlist')
  it('should be able to reorder songs in a playlist')
  it('should be able to reorder playlists')
})
