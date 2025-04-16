import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as React from 'react';

// Import the existing renderWithProviders utility
import { renderWithProviders } from './utils/test-utils';

import { server } from '../src/mocks/node'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

// Export the renderWithProviders utility to make it easily available to tests
export { renderWithProviders };

