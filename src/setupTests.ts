import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

// Import the existing renderWithProviders utility
import { renderWithProviders } from './utils/test-utils'

import { server } from '../src/mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// Export the renderWithProviders utility to make it easily available to tests
export { renderWithProviders }
