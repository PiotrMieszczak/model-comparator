import { createTheme } from '@mui/material/styles';

// Extend the default theme to include custom color variants
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

// Custom spacing scale based on design system
const spacingScale = {
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
};

export const theme = createTheme({
  // Color Palette matching design system
  palette: {
    // Primary Colors (Blue Theme - Login)
    primary: {
      50: '#e6f1ff',
      100: '#cce3fd',
      200: '#99c7fb',
      300: '#66abf9',
      400: '#338ff7',
      500: '#006FEE', // Main blue
      600: '#005bc4', // Darker blue
      700: '#004493', // Darkest blue
      800: '#002d62',
      900: '#001631',
      main: '#006FEE',
      light: '#cce3fd',
      dark: '#004493',
      contrastText: '#ffffff',
    },

    // Success Colors (Green Theme - Signup)
    success: {
      50: '#f0fdf4',
      100: '#d1ead1',
      200: '#a3d5a3',
      300: '#75c075',
      400: '#47ab47',
      500: '#17c964', // Main green
      600: '#12a150', // Darker green
      700: '#0e793c', // Darkest green
      800: '#0a5128',
      900: '#062914',
      main: '#17c964',
      light: '#d1ead1',
      dark: '#0e793c',
      contrastText: '#ffffff',
    },

    // Warning Colors (Orange Theme - Password Recovery)
    warning: {
      50: '#fffbeb',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#f5a524', // Main orange
      600: '#d97706', // Darker orange
      700: '#a16207', // Darkest orange
      800: '#713f12',
      900: '#422006',
      main: '#f5a524',
      light: '#fef9c3',
      dark: '#a16207',
      contrastText: '#ffffff',
    },

    // Custom accent color for special elements
    accent: {
      main: '#8b5cf6',
      light: '#c4b5fd',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },

    // Neutral Colors (Custom Gray Scale)
    grey: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#121416',
    },

    // Background colors
    background: {
      default: '#f8f9fa', // gray-50
      paper: '#ffffff',
    },

    // Text colors
    text: {
      primary: '#343a40', // gray-700
      secondary: '#6c757d', // gray-500
      disabled: '#adb5bd', // gray-400
    },

    // Divider color
    divider: '#dee2e6', // gray-200
  },

  // Typography matching design system
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Headings
    h1: {
      fontFamily: 'Inter',
      fontSize: '30px',
      lineHeight: '36px',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: 'Inter',
      fontSize: '36px',
      lineHeight: '45px',
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontFamily: 'Inter',
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontFamily: 'Inter',
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontFamily: 'Inter',
      fontSize: '18px',
      lineHeight: '24px',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Inter',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: 600,
    },

    // Body Text
    body1: {
      fontFamily: 'Inter',
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    },
    
    // Additional text variants
    subtitle1: {
      fontFamily: 'Inter',
      fontSize: '20px',
      lineHeight: '32px',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Inter',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 500,
    },
    caption: {
      fontFamily: 'Inter',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
    },
    overline: {
      fontFamily: 'Inter',
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },

    // Button text
    button: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
  },

  // Spacing system (base unit: 4px)
  spacing: 4,

  // Shape (border radius)
  shape: {
    borderRadius: 12, // 12px default border radius
  },

  // Breakpoints (if needed for custom responsive behavior)
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  // Shadow system
  shadows: [
    'none',
    '0 1px 3px rgba(0, 0, 0, 0.1)',
    '0 4px 6px rgba(0, 0, 0, 0.1)',
    '0 10px 15px rgba(0, 0, 0, 0.1)',
    '0 20px 25px rgba(0, 0, 0, 0.1)',
    '0 25px 50px rgba(0, 0, 0, 0.15)', // Card shadow
    '0 35px 60px rgba(0, 0, 0, 0.2)',
    '0 40px 70px rgba(0, 0, 0, 0.25)',
    ...Array(16).fill('0 40px 70px rgba(0, 0, 0, 0.25)'), // Fill remaining slots
  ] as const,

  // Component style overrides
  components: {
    // Button overrides
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '16px',
          padding: '12px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        },
        sizeLarge: {
          height: 44,
          padding: '12px 24px',
        },
        sizeMedium: {
          height: 36,
          padding: '8px 20px',
        },
        sizeSmall: {
          height: 32,
          padding: '6px 16px',
          fontSize: '14px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #006FEE 0%, #005bc4 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #005bc4 0%, #004493 100%)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #17c964 0%, #12a150 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #12a150 0%, #0e793c 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },

    // TextField overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            height: 56,
            fontSize: '16px',
            '& fieldset': {
              borderWidth: '2px',
              borderColor: '#ced4da', // gray-300
            },
            '&:hover fieldset': {
              borderColor: '#adb5bd', // gray-400
            },
            '&.Mui-focused fieldset': {
              borderColor: '#006FEE', // primary-500
              borderWidth: '2px',
            },
            '& input': {
              padding: '16px',
              '&::placeholder': {
                color: '#adb5bd', // gray-400
                opacity: 1,
              },
            },
          },
        },
      },
    },

    // Input Label overrides
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          color: '#343a40', // gray-700
          transform: 'translate(0, -1.5px) scale(1)',
          '&.Mui-focused': {
            color: '#006FEE', // primary-500
          },
        },
      },
    },

    // Card overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          border: 'none',
          padding: 32,
        },
      },
    },

    // Paper overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        elevation2: {
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        },
        elevation3: {
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
        },
      },
    },

    // Avatar overrides
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
    },

    // Divider overrides
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#dee2e6', // gray-200
        },
      },
    },

    // Link overrides
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#006FEE', // primary-500
          textDecoration: 'none',
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

// Helper function to create gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #006FEE 0%, #005bc4 100%)',
  primaryHover: 'linear-gradient(135deg, #005bc4 0%, #004493 100%)',
  success: 'linear-gradient(135deg, #17c964 0%, #12a150 100%)',
  successHover: 'linear-gradient(135deg, #12a150 0%, #0e793c 100%)',
  warning: 'linear-gradient(135deg, #f5a524 0%, #d97706 100%)',
  warningHover: 'linear-gradient(135deg, #d97706 0%, #a16207 100%)',
};

// Helper object for custom spacing values
export const spacing = spacingScale;