// Central design tokens for the SEAM portal.
// Two palettes (light / dark) share the same shape so the whole app can
// re-theme by swapping which one is handed to styled-components.

const radius = {
  sm: "8px",
  md: "12px",
  lg: "20px",
  pill: "999px",
} as const;

const font = {
  body: "'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif",
} as const;

// Colors that stay constant across modes: brand, fixed neutrals used by the
// frosted public auth pages, and status colors.
const baseColors = {
  // Brand
  primary: "#BE185D",
  primaryDark: "#9D174D",
  primaryLight: "#F9A8D4",

  // Fixed neutrals (used by the always-dark auth cards + small UI chips)
  white: "#FFFFFF",
  light1: "#F3F4F6",
  light2: "#E5E7EB",
  dark1: "#1F2937",
  dark2: "#374151",
  dark3: "#4B5563",
  muted: "#9CA3AF",

  // Status
  danger: "#DC2626",
  success: "#16A34A",
  warning: "#D97706",
  info: "#2563EB",
} as const;

// Surface tokens are the only ones that differ between light and dark.
const lightSurfaces = {
  surface: "#FFFFFF",
  surfaceAlt: "#F9FAFB",
  border: "#E5E7EB",
  text: "#111827",
  textMuted: "#6B7280",
  sidebar: "#1B1230",
  sidebarHover: "#2A1B47",
  sidebarActive: "#BE185D",
} as const;

const darkSurfaces = {
  surface: "#211D33",
  surfaceAlt: "#15121F",
  border: "#352E4A",
  text: "#F5F3FB",
  textMuted: "#A79FBC",
  sidebar: "#120C21",
  sidebarHover: "#241733",
  sidebarActive: "#BE185D",
} as const;

export const lightTheme = {
  mode: "light",
  colors: { ...baseColors, ...lightSurfaces },
  radius,
  font,
  shadow: {
    card: "0 10px 30px rgba(0, 0, 0, 0.25)",
    soft: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
} as const;

export const darkTheme = {
  mode: "dark",
  colors: { ...baseColors, ...darkSurfaces },
  radius,
  font,
  shadow: {
    card: "0 10px 30px rgba(0, 0, 0, 0.5)",
    soft: "0 4px 14px rgba(0, 0, 0, 0.35)",
  },
} as const;

export type ThemeMode = "light" | "dark";

// Canonical theme shape. Colors are widened to `string` so both the light and
// dark palettes (whose literal hex values differ) satisfy it.
export type AppTheme = {
  mode: ThemeMode;
  colors: Record<keyof typeof lightTheme.colors, string>;
  radius: typeof radius;
  font: typeof font;
  shadow: { card: string; soft: string };
};
