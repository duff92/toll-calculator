import { alpha } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'

// Define a new color palette
// Enhanced with accessibility considerations
const primaryColor = '#0056b3' // Darkened for better contrast
const secondaryColor = '#2e7d32' // Darkened green for better contrast
const errorColor = '#d32f2f' // Slightly darkened red for better contrast
const warningColor = '#ed6c02' // Darkened orange for better contrast
const infoColor = '#0288d1' // Darkened blue for better contrast
const successColor = '#2e7d32' // Same as secondary for consistency
const backgroundColor = '#f5f7fa' // Light grey-blue for background

// A custom theme for the toll calculator app with accessibility improvements
const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: alpha(primaryColor, 0.8),
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryColor,
      light: alpha(secondaryColor, 0.8),
      dark: '#2e7d32',
      contrastText: '#ffffff',
    },
    error: {
      main: errorColor,
      light: alpha(errorColor, 0.8),
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    warning: {
      main: warningColor,
      light: alpha(warningColor, 0.8),
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      main: infoColor,
      light: alpha(infoColor, 0.8),
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    success: {
      main: successColor,
      light: alpha(successColor, 0.8),
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    background: {
      default: backgroundColor,
      paper: '#ffffff',
    },
    text: {
      primary: '#202930', // Darkened for better contrast
      secondary: '#455a64', // Darkened for better contrast
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
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
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
          // Enhanced focus styles for keyboard navigation
          '&:focus-visible': {
            outline: `2px solid ${primaryColor}`,
            outlineOffset: '2px',
          },
          // Add minimum touch target size for mobile
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
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(0, 0, 0, 0.09)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
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
          },
          // Improved label contrast
          '& .MuiInputLabel-root': {
            color: '#455a64',
          },
          // Add a higher contrast for placeholder text
          '& .MuiInputBase-input::placeholder': {
            color: '#546e7a',
            opacity: 1,
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
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: 'hidden',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(primaryColor, 0.05),
          '& .MuiTableCell-head': {
            color: primaryColor,
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: alpha(backgroundColor, 0.5),
          },
          '&:hover': {
            backgroundColor: alpha(primaryColor, 0.05),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Improved text contrast in tables
          color: '#202930',
          padding: '16px', // Larger padding for better spacing
        },
        head: {
          fontWeight: 600, // Bold headers for better hierarchy
          color: '#202930', // Dark enough for contrast
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
          color: '#1b5e20', // Darker green for better contrast
          '&.MuiChip-outlined': {
            borderColor: secondaryColor,
          },
        },
        colorSuccess: {
          backgroundColor: alpha(successColor, 0.15),
          color: '#1b5e20', // Darker green for better contrast
          '&.MuiChip-outlined': {
            borderColor: successColor,
          },
        },
        // Better contrast for default chip text
        label: {
          color: '#202930',
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
          backgroundColor: alpha(infoColor, 0.15),
          color: '#01579b', // Darker for better contrast
        },
        standardSuccess: {
          backgroundColor: alpha(successColor, 0.15),
          color: '#1b5e20', // Darker for better contrast
        },
        standardWarning: {
          backgroundColor: alpha(warningColor, 0.15),
          color: '#e65100', // Darker for better contrast
        },
        standardError: {
          backgroundColor: alpha(errorColor, 0.15),
          color: '#b71c1c', // Darker for better contrast
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
            backgroundColor: alpha(primaryColor, 0.1),
            color: primaryColor,
            '& .MuiListItemIcon-root': {
              color: primaryColor,
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

export default theme
