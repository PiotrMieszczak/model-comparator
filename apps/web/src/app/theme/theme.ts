import { createTheme } from '@mui/material/styles';
import { designTokens } from '@model-comparator/design-system';

// Extend the default theme to include custom color variants
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  // Color Palette from design system tokens
  palette: {
    // Primary Colors from design tokens
    primary: designTokens.colors.primary,

    // Success Colors from design tokens
    success: designTokens.colors.success,

    // Warning Colors from design tokens
    warning: designTokens.colors.warning,

    // Custom accent color for special elements
    accent: {
      main: '#8b5cf6',
      light: '#c4b5fd',
      dark: '#6d28d9',
      contrastText: '#ffffff',
    },

    // Neutral Colors from design tokens
    grey: designTokens.colors.grey,

    // Background colors from design tokens
    background: designTokens.colors.background,

    // Text colors from design tokens
    text: designTokens.colors.text,

    // Divider color from design tokens
    divider: designTokens.colors.divider,
  },

  // Typography from design system tokens
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    
    // Headings from design tokens
    h1: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h1,
    },
    h2: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h2,
    },
    h3: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h3,
    },
    h4: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h4,
    },
    h5: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h5,
    },
    h6: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.h6,
    },

    // Body Text from design tokens
    body1: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.body1,
    },
    body2: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.body2,
    },
    
    // Additional text variants from design tokens
    subtitle1: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.subtitle1,
    },
    subtitle2: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.subtitle2,
    },
    caption: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.caption,
    },
    overline: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.overline,
    },

    // Button text from design tokens
    button: {
      fontFamily: designTokens.typography.fontFamily.primary,
      ...designTokens.typography.button,
    },
  },

  // Spacing system from design tokens
  spacing: designTokens.spacing.base,

  // Shape from design tokens
  shape: {
    borderRadius: designTokens.borderRadius.default,
  },

  // Breakpoints from design tokens
  breakpoints: designTokens.breakpoints,

  // Shadow system from design tokens
  shadows: [
    'none',
    designTokens.shadows.sm,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows['2xl'],
    designTokens.shadows['3xl'],
    designTokens.shadows['3xl'],
    ...Array(16).fill(designTokens.shadows['3xl']), // Fill remaining slots
  ] as const,

  // Component style overrides
  components: {
    // Button overrides using design tokens
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.default,
          textTransform: designTokens.typography.button.textTransform,
          fontWeight: designTokens.typography.button.fontWeight,
          fontSize: designTokens.typography.button.fontSize,
          padding: `${designTokens.spacing.buttonPaddingY}px ${designTokens.spacing.buttonPaddingX}px`,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
        sizeLarge: {
          height: 44,
          padding: `${designTokens.spacing.buttonPaddingY}px ${designTokens.spacing.buttonPaddingX}px`,
        },
        sizeMedium: {
          height: 36,
          padding: `${designTokens.spacing.sm}px ${designTokens.spacing.lg - 4}px`,
        },
        sizeSmall: {
          height: 32,
          padding: `${designTokens.spacing.xs + 2}px ${designTokens.spacing.md}px`,
          fontSize: designTokens.typography.body2.fontSize,
        },
        containedPrimary: {
          background: designTokens.gradients.primary,
          '&:hover': {
            background: designTokens.gradients.primaryHover,
          },
        },
        containedSuccess: {
          background: designTokens.gradients.success,
          '&:hover': {
            background: designTokens.gradients.successHover,
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

    // TextField overrides using design tokens
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.default,
            height: 56,
            fontSize: designTokens.typography.body1.fontSize,
            '& fieldset': {
              borderWidth: '2px',
              borderColor: designTokens.colors.grey[300],
            },
            '&:hover fieldset': {
              borderColor: designTokens.colors.grey[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary.main,
              borderWidth: '2px',
            },
            '& input': {
              padding: `${designTokens.spacing.md}px`,
              '&::placeholder': {
                color: designTokens.colors.grey[400],
                opacity: 1,
              },
            },
          },
        },
      },
    },

    // Input Label overrides using design tokens
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: designTokens.typography.body2.fontSize,
          fontWeight: designTokens.typography.fontWeight.medium,
          color: designTokens.colors.text.primary,
          transform: 'translate(0, -1.5px) scale(1)',
          '&.Mui-focused': {
            color: designTokens.colors.primary.main,
          },
        },
      },
    },

    // Card overrides using design tokens
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows['2xl'],
          border: 'none',
          padding: designTokens.spacing.cardPadding,
        },
      },
    },

    // Paper overrides using design tokens
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: designTokens.shadows.md,
        },
        elevation2: {
          boxShadow: designTokens.shadows.lg,
        },
        elevation3: {
          boxShadow: designTokens.shadows.xl,
        },
      },
    },

    // Avatar overrides using design tokens
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          fontWeight: designTokens.typography.fontWeight.semibold,
        },
      },
    },

    // Divider overrides using design tokens
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: designTokens.colors.divider,
        },
      },
    },

    // Link overrides using design tokens
    MuiLink: {
      styleOverrides: {
        root: {
          color: designTokens.colors.primary.main,
          textDecoration: 'none',
          fontWeight: designTokens.typography.fontWeight.medium,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  },
});

// Export design tokens for direct use
export const gradients = designTokens.gradients;
export const spacing = designTokens.spacing;