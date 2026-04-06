// ─── Sovereign Assets Platform — Design System Tokens ────
// Institutional capital-markets aesthetic: obsidian + gold

export const colors = {
  // ─── Core Palette ─────────────────────────────
  obsidian: {
    950: '#09090b',
    900: '#0c0c0f',
    850: '#111114',
    800: '#16161a',
    750: '#1c1c21',
    700: '#232329',
    600: '#2e2e36',
    500: '#3d3d47',
    400: '#52525e',
    300: '#71717f',
    200: '#a1a1af',
    100: '#d4d4dc',
    50:  '#f4f4f6',
  },
  gold: {
    950: '#2a1a00',
    900: '#4a2f00',
    800: '#6b4400',
    700: '#8c5a00',
    600: '#ad7100',
    500: '#c9850a',
    400: '#d4a033',
    300: '#e0bb5c',
    200: '#ebd48a',
    100: '#f5eab8',
    50:  '#fcf8e8',
  },
  // ─── Semantic ─────────────────────────────────
  success: {
    DEFAULT: '#10b981',
    light: '#34d399',
    dark: '#059669',
    muted: 'rgba(16, 185, 129, 0.12)',
  },
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    muted: 'rgba(245, 158, 11, 0.12)',
  },
  danger: {
    DEFAULT: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
    muted: 'rgba(239, 68, 68, 0.12)',
  },
  info: {
    DEFAULT: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
    muted: 'rgba(59, 130, 246, 0.12)',
  },
  // ─── Surface ──────────────────────────────────
  surface: {
    primary: '#09090b',       // main background
    secondary: '#111114',     // card background
    tertiary: '#16161a',      // elevated surface
    border: '#232329',        // subtle border
    borderLight: '#2e2e36',   // emphasized border
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
  // ─── Text ─────────────────────────────────────
  text: {
    primary: '#f4f4f6',
    secondary: '#a1a1af',
    tertiary: '#71717f',
    disabled: '#52525e',
    inverse: '#09090b',
    gold: '#d4a033',
  },
} as const;

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
} as const;

export const typography = {
  fonts: {
    heading: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
    body: '"Inter", "SF Pro Text", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "SF Mono", "Fira Code", monospace',
    display: '"Playfair Display", "Georgia", serif', // editorial headlines
  },
  sizes: {
    'xs':    { fontSize: '0.75rem',  lineHeight: '1rem' },
    'sm':    { fontSize: '0.875rem', lineHeight: '1.25rem' },
    'base':  { fontSize: '1rem',     lineHeight: '1.5rem' },
    'lg':    { fontSize: '1.125rem', lineHeight: '1.75rem' },
    'xl':    { fontSize: '1.25rem',  lineHeight: '1.75rem' },
    '2xl':   { fontSize: '1.5rem',   lineHeight: '2rem' },
    '3xl':   { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl':   { fontSize: '2.25rem',  lineHeight: '2.5rem' },
    '5xl':   { fontSize: '3rem',     lineHeight: '1' },
    '6xl':   { fontSize: '3.75rem',  lineHeight: '1' },
    'hero':  { fontSize: '4.5rem',   lineHeight: '1.05' },
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    caps: '0.15em', // for all-caps labels
  },
} as const;

export const radii = {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.4)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
  glow: '0 0 20px rgba(201, 133, 10, 0.15)', // gold glow
  'glow-strong': '0 0 40px rgba(201, 133, 10, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
  tooltip: 60,
} as const;

// ─── Badge Variants ─────────────────────────────────────

export const badgeVariants = {
  success: {
    bg: colors.success.muted,
    text: colors.success.light,
    border: colors.success.DEFAULT,
  },
  warning: {
    bg: colors.warning.muted,
    text: colors.warning.light,
    border: colors.warning.DEFAULT,
  },
  danger: {
    bg: colors.danger.muted,
    text: colors.danger.light,
    border: colors.danger.DEFAULT,
  },
  info: {
    bg: colors.info.muted,
    text: colors.info.light,
    border: colors.info.DEFAULT,
  },
  neutral: {
    bg: 'rgba(161, 161, 175, 0.12)',
    text: colors.text.secondary,
    border: colors.obsidian[400],
  },
  gold: {
    bg: 'rgba(201, 133, 10, 0.12)',
    text: colors.gold[300],
    border: colors.gold[500],
  },
} as const;

// ─── Attestation Badge Mapping ──────────────────────────

export const attestationBadges = {
  attested: {
    label: 'Independently Verified',
    variant: 'success' as const,
  },
  self_reported: {
    label: 'Issuer-Reported — Pending Verification',
    variant: 'warning' as const,
  },
  unverified: {
    label: 'Unverified Claim',
    variant: 'danger' as const,
  },
} as const;

// ─── Risk Level Mapping ─────────────────────────────────

export const riskBadges = {
  low: { label: 'Low Risk', variant: 'success' as const },
  medium: { label: 'Medium Risk', variant: 'warning' as const },
  high: { label: 'High Risk', variant: 'danger' as const },
  critical: { label: 'Critical Risk', variant: 'danger' as const },
} as const;
