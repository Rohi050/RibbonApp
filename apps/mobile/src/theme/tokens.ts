/**
 * Design tokens — single source of truth for the visual language.
 * NOTE: brand colours are provisional placeholders until the official
 * Tadawie brand guide (logo, palette, fonts) is supplied.
 */
export const palette = {
  brand900: '#0B3D3A',
  brand700: '#11635D',
  brand500: '#1E8C82',
  brand100: '#E3F2EF',
  blush: '#F6E7E1',
  gold: '#C8A76A',
  ink: '#16201F',
  slate: '#5B6866',
  mist: '#F7F8F7',
  white: '#FFFFFF',
} as const;

export const colors = {
  light: {
    background: palette.mist,
    surface: palette.white,
    text: palette.ink,
    textMuted: palette.slate,
    primary: palette.brand700,
    primaryText: palette.white,
    accent: palette.gold,
    tint: palette.brand100,
    border: '#E4E8E6',
  },
  dark: {
    background: '#0C1413',
    surface: '#142120',
    text: '#EEF3F1',
    textMuted: '#9FB0AC',
    primary: palette.brand500,
    primaryText: palette.white,
    accent: palette.gold,
    tint: '#18302D',
    border: '#22322F',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ThemeColors = { [K in keyof (typeof colors)['light']]: string };

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48 } as const;
export const radius = { sm: 8, md: 14, lg: 20, pill: 999 } as const;

export const typography = {
  display: { fontSize: 34, lineHeight: 42, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 30, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
} as const;
