import React from 'react'
import { screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../src/utils/test-utils'
import App from '../src/App'

describe('App Component', () => {
  test('renders Toll Passages heading', async () => {
    // Render the App with our custom renderWithProviders utility
    renderWithProviders(<App />)

    // Check if the page title "Toll Passages" exists in the document
    const pageTitle = screen.getByRole('heading', { name: /toll passages/i })
    expect(pageTitle).toBeInTheDocument()
  })
})
