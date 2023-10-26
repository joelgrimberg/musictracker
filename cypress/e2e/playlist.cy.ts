import { faker } from '@faker-js/faker'

describe('Playlist', () => {
  beforeEach(() => {
    cy.request('GET', '/api/playlists/remove-all')
      .its('body')
      .should('deep.equal', { success: true })

    cy.intercept('/api/playlists', cy.spy().as('getPlaylistReq')).as(
      'getPlaylists'
    )

    cy.visit('/')
  })

  it('should show an empty list of playlist', () => {
    // sometimes the request is called twice. This is a workaround
    cy.get('@getPlaylistReq').should('have.been.calledOn')
  })

  it('should be able to create a playlist', () => {
    const genre = faker.music.genre()

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
      cy.findByRole('textbox', { name: /playlist name/i }).type(genre)
      cy.findByRole('button', { name: /create playlist/i }).click()
    })

    cy.findByRole('link', { name: genre })
  })

  it('should be able to remove a playlist', () => {
    const playlistName = faker.music.genre()
    cy.request('POST', '/api/playlists/', { name: playlistName }).then(
      (res) => {
        expect(res.status).to.eq(201)
      }
    )
    cy.findByRole('link', { name: playlistName })

    cy.findByRole('button', { name: /open menu/i }).click()
    cy.findByRole('menuitem', { name: /remove/i }).click()

    cy.findByRole('link', { name: playlistName }).should('not.exist')
  })

  it('should be able to rename a playlist name', () => {
    const playlistName = faker.music.genre()
    const renamedPlaylistName = faker.music.genre() + ' unique'

    cy.log('playlistName:', playlistName)
    cy.log('renamedPlaylistName:', renamedPlaylistName)

    cy.request('POST', '/api/playlists/', { name: playlistName }).then(
      (res) => {
        expect(res.status).to.eq(201)
      }
    )
    cy.findByRole('link', { name: playlistName })

    cy.findByRole('button', { name: /open menu/i }).click()
    cy.findByRole('menuitem', { name: /rename/i }).click()

    cy.findByRole('dialog').within(() => {
      cy.findByRole('button', { name: /update/i }).should('be.visible')
      cy.findByRole('textbox', { name: /playlist name/i })
        .clear()
        .type(renamedPlaylistName)
      cy.findByRole('button', { name: /update/i }).click()

      // TODO: add this change of button contents to component test 👇. Because of the GET api/playlists request, the button containing 'updating' will switch back to 'update' 🤔
      //cy.findByRole('button', { name: /updating/i }).should('be.visible')
    })
    cy.findByRole('link', { name: playlistName }).should('not.exist')
    cy.findByRole('link', { name: renamedPlaylistName }).should('be.visible')
  })

  // TODO: move this test to component test 👇
  it('should not be able to insert empty playlist name', () => {})

  it('should be able to view a list of playlists')

  it('should be able to add a song to a playlist')

  it('should be able to remove a song from a playlist')

  it('should give a warning when removing an unknown song from a playlist')

  it('should be able to reorder songs in a playlist')

  it('should be able to reorder playlists')
})
