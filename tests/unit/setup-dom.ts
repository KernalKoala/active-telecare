import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Imported only by jsdom component tests; API tests keep native Node globals.
afterEach(() => {
  cleanup()
})
