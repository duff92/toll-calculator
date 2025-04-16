import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { setupStore } from './store/store'
import { createAppTheme } from './theme'
import { useThemeContext } from './context/ThemeContext'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// Initialize the Redux store
const store = setupStore()

// ThemeWrapper uses the theme context to create the appropriate MUI theme
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode } = useThemeContext()
  const theme = React.useMemo(() => createAppTheme(mode), [mode])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <ThemeWrapper>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeWrapper>
      </ThemeProvider>
    </React.StrictMode>,
  )
}

// Setup MSW mock server in development
async function prepareApp() {
  if (process.env.NODE_ENV === 'development') {
    try {
      // Dynamically import MSW to avoid issues in production
      const { worker } = await import('./mocks/browser')

      // Start the MSW worker and wait for it to be ready
      await worker.start({
        // Don't show the MSW logging in the console
        quiet: true,
        // Explicitly define the Service Worker URL
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        // Handle error if the Service Worker cannot be registered
        onUnhandledRequest: 'bypass',
      })

      console.log('[MSW] Mock Service Worker started successfully')
    } catch (error) {
      console.error('[MSW] Failed to initialize:', error)
    }
  }

  // Render the app after MSW is initialized (or skipped in production)
  renderApp()
}

prepareApp()
