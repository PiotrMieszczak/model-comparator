// Design System Token Bridge
// This file exports design tokens for consumption by JavaScript frameworks like React/MUI
// Values are synchronized with SCSS tokens

// Color Tokens
export const colors = {
  // Primary Colors (Blue Theme)
  primary: {
    100: '#cce3fd',
    200: '#99c7fb', 
    500: '#006fee', // Main blue
    600: '#005bc4', // Darker blue
    700: '#004493', // Darkest blue
    main: '#006fee',
    light: '#cce3fd',
    dark: '#004493',
    contrastText: '#ffffff',
  },

  // Success Colors (Green Theme)
  success: {
    100: '#d1ead1',
    200: '#a3d5a3',
    500: '#17c964', // Main green
    600: '#12a150', // Darker green
    700: '#0e793c', // Darkest green
    main: '#17c964',
    light: '#d1ead1',
    dark: '#0e793c',
    contrastText: '#ffffff',
  },

  // Warning Colors (Orange Theme)
  warning: {
    100: '#fef9c3',
    200: '#fef08a',
    500: '#f5a524', // Main orange
    600: '#d97706', // Darker orange
    700: '#a16207', // Darkest orange
    main: '#f5a524',
    light: '#fef9c3',
    dark: '#a16207',
    contrastText: '#ffffff',
  },

  // Neutral Colors
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

  // Semantic Colors
  background: {
    default: '#f8f9fa', // grey-50
    paper: '#ffffff',
  },

  text: {
    primary: '#343a40', // grey-700
    secondary: '#6c757d', // grey-500
    disabled: '#adb5bd', // grey-400
  },

  divider: '#dee2e6', // grey-200
  white: '#ffffff',
} as const;

// Typography Tokens
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 'Source Code Pro', monospace",
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Heading scales
  h1: {
    fontSize: '30px',
    lineHeight: '36px',
    fontWeight: 700,
    letterSpacing: '-0.025em',
  },

  h2: {
    fontSize: '36px', 
    lineHeight: '45px',
    fontWeight: 700,
    letterSpacing: '-0.025em',
  },

  h3: {
    fontSize: '24px',
    lineHeight: '32px', 
    fontWeight: 600,
    letterSpacing: '-0.025em',
  },

  h4: {
    fontSize: '20px',
    lineHeight: '28px',
    fontWeight: 600,
    letterSpacing: '-0.025em',
  },

  h5: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 600,
  },

  h6: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 600,
  },

  // Body text
  body1: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },

  body2: {
    fontSize: '14px',
    lineHeight: '20px', 
    fontWeight: 400,
  },

  // Additional variants
  subtitle1: {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 400,
  },

  subtitle2: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
  },

  caption: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },

  overline: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.1em',
  },

  button: {
    fontSize: '16px',
    fontWeight: 600,
    textTransform: 'none' as const,
    letterSpacing: '0.025em',
  },
} as const;

// Spacing Tokens
export const spacing = {
  // Base unit
  base: 4,

  // Named scale
  xs: 4,   // 4px
  sm: 8,   // 8px  
  md: 16,  // 16px
  lg: 24,  // 24px
  xl: 32,  // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px

  // Component specific
  formFieldGap: 16,      // form-field-gap
  formSectionGap: 24,    // form-section-gap
  cardPadding: 32,       // card-padding
  buttonPaddingX: 24,    // button-padding-x
  buttonPaddingY: 12,    // button-padding-y
} as const;

// Border Radius Tokens
export const borderRadius = {
  sm: 8,
  md: 12,  // Default border radius
  lg: 16,  // Card border radius
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999, // Fully rounded
  default: 12, // Default
} as const;

// Shadow Tokens
export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)', // Card shadow
  '3xl': '0 35px 60px rgba(0, 0, 0, 0.2)',
} as const;

// Gradient Tokens
export const gradients = {
  primary: 'linear-gradient(135deg, #006fee 0%, #005bc4 100%)',
  primaryHover: 'linear-gradient(135deg, #005bc4 0%, #004493 100%)',
  success: 'linear-gradient(135deg, #17c964 0%, #12a150 100%)',
  successHover: 'linear-gradient(135deg, #12a150 0%, #0e793c 100%)',
  warning: 'linear-gradient(135deg, #f5a524 0%, #d97706 100%)',
  warningHover: 'linear-gradient(135deg, #d97706 0%, #a16207 100%)',
} as const;

// Breakpoints
export const breakpoints = {
  values: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

// Export all tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  gradients,
  breakpoints,
} as const;

// Type exports for TypeScript consumers
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Gradients = typeof gradients;
export type Breakpoints = typeof breakpoints;
export type DesignTokens = typeof designTokens;