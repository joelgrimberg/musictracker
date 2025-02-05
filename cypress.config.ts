import { defineConfig } from 'cypress'

import replayPlugin from '@replayio/cypress'

export default defineConfig({
  e2e: {
    projectId: 'ux2g1h',
    viewportHeight: 1080,
    viewportWidth: 1920,
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      replayPlugin(on, config)

      return config
      // implement node event listeners here
    },
  },
})
