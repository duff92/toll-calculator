import { alpha } from '@mui/material/styles'
import { createTheme, PaletteMode } from '@mui/material/styles'

// Define a function to create the theme based on mode
export const createAppTheme = (mode: PaletteMode) => {
  // Define shared colors
  const primaryColor = mode === 'light' ? '#0056b3' : '#64b5f6' // Lighter blue for dark mode
  const secondaryColor = mode === 'light' ? '#2e7d32' : '#81c784' // Lighter green for dark mode
  const errorColor = mode === 'light' ? '#d32f2f' : '#f44336'
  const warningColor = mode === 'light' ? '#ed6c02' : '#ffb74d'
  const infoColor = mode === 'light' ? '#0288d1' : '#4fc3f7'
  const successColor = mode === 'light' ? '#2e7d32' : '#81c784'

  // Define mode-specific colors
  const backgroundColor = mode === 'light' ? '#f5f7fa' : '#121212'
  const paperColor = mode === 'light' ? '#ffffff' : '#1e1e1e'
  const textPrimaryColor = mode === 'light' ? '#202930' : '#e0e0e0'
  const textSecondaryColor = mode === 'light' ? '#455a64' : '#b0bec5'

  // Create and return the theme
  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: alpha(primaryColor, 0.8),
        dark: mode === 'light' ? '#0d47a1' : '#1976d2',
        contrastText: '#ffffff',
      },
      secondary: {
        main: secondaryColor,
        light: alpha(secondaryColor, 0.8),
        dark: mode === 'light' ? '#2e7d32' : '#388e3c',
        contrastText: '#ffffff',
      },
      error: {
        main: errorColor,
        light: alpha(errorColor, 0.8),
        dark: mode === 'light' ? '#c62828' : '#d32f2f',
        contrastText: '#ffffff',
      },
      warning: {
        main: warningColor,
        light: alpha(warningColor, 0.8),
        dark: mode === 'light' ? '#e65100' : '#f57c00',
        contrastText: mode === 'light' ? '#ffffff' : '#000000',
      },
      info: {
        main: infoColor,
        light: alpha(infoColor, 0.8),
        dark: mode === 'light' ? '#01579b' : '#0277bd',
        contrastText: mode === 'light' ? '#ffffff' : '#000000',
      },
      success: {
        main: successColor,
        light: alpha(successColor, 0.8),
        dark: mode === 'light' ? '#1b5e20' : '#2e7d32',
        contrastText: '#ffffff',
      },
      background: {
        default: backgroundColor,
        paper: paperColor,
      },
      text: {
        primary: textPrimaryColor,
        secondary: textSecondaryColor,
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // Improved base font size for better readability
      fontSize: 16,
      h1: {
        fontWeight: 600, // Increased for better visibility
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 400,
      },
      subtitle2: {
        fontSize: '0.875rem',
        lineHeight: 1.57,
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem', // Increased from 0.875rem for better readability
        lineHeight: 1.57,
      },
      body2: {
        fontSize: '0.875rem', // Increased from 0.75rem for better readability
        lineHeight: 1.66,
      },
      button: {
        fontWeight: 500,
        fontSize: '0.875rem',
        textTransform: 'none', // Good for screen readers
      },
    },
    shape: {
      borderRadius: 8, // Rounded corners for a modern feel
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          // Add focus styling for keyboard navigation
          '& *:focus-visible': {
            outline: `2px solid ${primaryColor}`,
            outlineOffset: '2px',
          },
          // Apply correct background color to body
          body: {
            backgroundColor: backgroundColor,
            color: textPrimaryColor,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            backgroundColor: mode === 'light' ? primaryColor : '#1e1e1e',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
            '&:focus-visible': {
              outline: `2px solid ${primaryColor}`,
              outlineOffset: '2px',
            },
            // Enhanced focus styles for keyboard navigation
            // Add minimum touch target size for mobile
            minHeight: '44px',
            minWidth: '44px',
            // Remove gradient backgrounds for more consistent contrast
            containedPrimary: {
              backgroundColor: primaryColor,
            },
            containedSecondary: {
              backgroundColor: secondaryColor,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 600, // Enhanced for better visibility
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
            '&:focus-visible': {
              outline: `2px solid ${primaryColor}`,
              outlineOffset: '2px',
            },
            minHeight: '44px',
            minWidth: '44px',
          },
          // Remove gradient backgrounds for more consistent contrast
          containedPrimary: {
            backgroundColor: primaryColor,
          },
          containedSecondary: {
            backgroundColor: secondaryColor,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            borderRadius: 12,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow:
                mode === 'light'
                  ? '0 6px 25px rgba(0, 0, 0, 0.09)'
                  : '0 6px 25px rgba(0, 0, 0, 0.4)',
            },
            backgroundColor: paperColor,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow:
              mode === 'light'
                ? '0 4px 20px rgba(0, 0, 0, 0.05)'
                : '0 4px 20px rgba(0, 0, 0, 0.3)',
            backgroundColor: paperColor,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(primaryColor, 0.8),
              },
              '& .MuiOutlinedInput-input': {
                color: textPrimaryColor,
              },
            },
            // Improved label contrast
            '& .MuiInputLabel-root': {
              color: textSecondaryColor,
            },
            // Add a higher contrast for placeholder text
            '& .MuiInputBase-input::placeholder': {
              color: textSecondaryColor,
              opacity: 0.7,
            },
            // Better focus indicator
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderWidth: '2px',
              },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            // Ensure links have underlines by default for better accessibility
            textDecoration: 'underline',
            color: primaryColor,
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            overflow: 'hidden',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'light'
                ? alpha(primaryColor, 0.05)
                : alpha(primaryColor, 0.15),
            '& .MuiTableCell-head': {
              color: mode === 'light' ? primaryColor : '#64b5f6',
              fontWeight: 600,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(even)': {
              backgroundColor:
                mode === 'light'
                  ? alpha(backgroundColor, 0.5)
                  : alpha('#303030', 0.3),
            },
            '&:hover': {
              backgroundColor:
                mode === 'light'
                  ? alpha(primaryColor, 0.05)
                  : alpha(primaryColor, 0.15),
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: textPrimaryColor,
            // Improved text contrast in tables
            padding: '16px', // Larger padding for better spacing
          },
          head: {
            fontWeight: 600, // Bold headers for better hierarchy
            color: mode === 'light' ? '#202930' : '#e0e0e0',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
            // Minimum size for touch targets
            height: '32px',
          },
          // Improve contrast for status chips
          colorSecondary: {
            backgroundColor: alpha(secondaryColor, 0.15),
            color: mode === 'light' ? '#1b5e20' : '#a5d6a7',
            '&.MuiChip-outlined': {
              borderColor: secondaryColor,
            },
          },
          colorSuccess: {
            backgroundColor: alpha(successColor, 0.15),
            color: mode === 'light' ? '#1b5e20' : '#a5d6a7',
            '&.MuiChip-outlined': {
              borderColor: successColor,
            },
          },
          // Better contrast for default chip text
          label: {
            color: mode === 'light' ? '#202930' : '#e0e0e0',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            // Improved padding and font size
            padding: '16px',
            fontSize: '1rem',
          },
          // Improved contrast for alert backgrounds
          standardInfo: {
            backgroundColor: alpha(infoColor, mode === 'light' ? 0.15 : 0.2),
            color: mode === 'light' ? '#01579b' : '#81d4fa',
          },
          standardSuccess: {
            backgroundColor: alpha(successColor, mode === 'light' ? 0.15 : 0.2),
            color: mode === 'light' ? '#1b5e20' : '#a5d6a7',
          },
          standardWarning: {
            backgroundColor: alpha(warningColor, mode === 'light' ? 0.15 : 0.2),
            color: mode === 'light' ? '#e65100' : '#ffcc80',
          },
          standardError: {
            backgroundColor: alpha(errorColor, mode === 'light' ? 0.15 : 0.2),
            color: mode === 'light' ? '#b71c1c' : '#ef9a9a',
          },
          // Better icon contrast
          icon: {
            opacity: 0.9,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.active': {
              backgroundColor: alpha(
                primaryColor,
                mode === 'light' ? 0.1 : 0.2,
              ),
              color: mode === 'light' ? primaryColor : '#90caf9',
              '& .MuiListItemIcon-root': {
                color: mode === 'light' ? primaryColor : '#90caf9',
              },
            },
          },
        },
      },
      // Making sure form controls have adequate size
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '9px', // Creates a 44x44px touch target with the control
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            padding: '9px', // Creates a 44x44px touch target with the control
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: '58px', // Larger for better touch target
            height: '38px', // Larger for better touch target
          },
        },
      },
    },
  })
}

// Export the default light theme
export default createAppTheme('light')
