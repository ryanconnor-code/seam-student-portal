// Central design tokens for the SEAM portal.
// Every color, radius, and shadow used across the app lives here so the look
// stays consistent and is trivial to re-theme.

export const theme = {
  colors: {
    // Brand
    primary: "#BE185D", // SEAM magenta
    primaryDark: "#9D174D",
    primaryLight: "#F9A8D4",

    // Neutrals
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

    // App shell surfaces (opaque, for the logged-in portal)
    surface: "#FFFFFF",
    surfaceAlt: "#F9FAFB",
    border: "#E5E7EB",
    text: "#111827",
    textMuted: "#6B7280",
    sidebar: "#1B1230", // deep plum to complement the magenta brand
    sidebarHover: "#2A1B47",
    sidebarActive: "#BE185D",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
    pill: "999px",
  },
  shadow: {
    card: "0 10px 30px rgba(0, 0, 0, 0.25)",
    soft: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },
  font: {
    body: "'Segoe UI', system-ui, -apple-system, Roboto, Helvetica, Arial, sans-serif",
  },
} as const;

export type AppTheme = typeof theme;
