import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    projectId: 'ux2g1h',
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
